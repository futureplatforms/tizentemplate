REM Tizen Wearable build script
REM Requires node, bower and grunt, and the Tizen IDE installed in C:\
REM Install node then execute:
REM     npm install -g bower
REM     npm install -g grunt-cli
REM ===========================================

set TIZEN_HOME=C:\tizen-wearable-sdk\tools\ide\bin
set TIZEN_HOME_DATA=C:\tizen-wearable-sdk-data

REM Include TIZEN_HOME in the path so we can see the relevant build tools
set PATH=%PATH%;%TIZEN_HOME%

REM Define BUILD_NUMBER if not already defined
set buildnum=%BUILD_NUMBER%
if "%buildnum%"=="" (set BUILD_NUMBER=LOCAL)

REM Build variables
set PRODUCT_NAME=TizenApp
set SIGNING_PROFILE_NAME=default
set SIGNING_PROFILE_FILENAME=profiles

REM Delete build artifacts from last time
rmdir /s /q bin
rmdir /s /q dist 

call npm install
call bower install

REM Grunt verifies and minifies the JS and sticks the relevant goodies in dist/app.  It also runs the unit tests.
call grunt

REM check if the unit tests all passed
if %ERRORLEVEL% GEQ 1 EXIT 1

cd dist\app

ren config.buildscript.xml config.xml

REM *** [STEP 1] Building tizen wearable app
call web-build . ^
			-e "node_modules\*" ^
			-e "Gruntfile.js" ^
			-e "test\*" ^
			-e "*.md" ^
			-e "bower_components\qunit\*" 	
if %ERRORLEVEL% GEQ 1 EXIT 1

cd .buildResult

REM *** [STEP 2] Signing tizen wearable app with profile: %SIGNING_PROFILE_NAME%:%SIGNING_PROFILE_FILENAME%.xml
call web-signing -n -profile %SIGNING_PROFILE_NAME%:%TIZEN_HOME_DATA%\%SIGNING_PROFILE_FILENAME%.xml 
if %ERRORLEVEL% GEQ 1 EXIT 1

REM *** [STEP 3] Packaging tizen wearable app as: %PRODUCT_NAME%.wgt
mkdir ..\..\..\bin
call web-packaging -n ..\..\..\bin\%PRODUCT_NAME%_%BUILD_NUMBER%.wgt
if %ERRORLEVEL% GEQ 1 EXIT 1

cd ..\..\..
rmdir /s /q dist 
