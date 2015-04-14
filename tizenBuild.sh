#!/bin/bash
#
# Tizen Wearable build script
# Requires node, bower and grunt, and the Tizen IDE installed in the user home folder
# Install node then execute:
#     npm install -g bower
#     npm install -g grunt-cli
# ===========================================

# Add /usr/local/bin so we can see things like npm and grunt
export PATH=/usr/local/bin:$PATH
export TIZEN_HOME=/Users/${USER}/tizen-wearable-sdk/tools/ide/bin
export TIZEN_HOME_DATA=/Users/${USER}/tizen-wearable-sdk-data

# Define BUILD_NUMBER if not already defined
BUILD_NUMBER=${BUILD_NUMBER-"LOCAL"}

# Build variables
PRODUCT_NAME="TizenApp"
SIGNING_PROFILE_NAME="default"
SIGNING_PROFILE_FILENAME="profiles"

# Delete build artifacts from last time
rm -rf bin
rm -rf dist 

npm install
bower install

# Grunt verifies and minifies the JS and sticks the relevant goodies in dist/app.  It also runs the unit tests.
grunt

# check if the unit tests all passed
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

cd dist/app

mv config.buildscript.xml config.xml

# *** [STEP 1] Building tizen wearable app: ${PRODUCT_NAME}
$TIZEN_HOME/web-build . \
			-e "node_modules/*" \
			-e "Gruntfile.js" \
			-e "test/*" \
			-e "*.md" \
			-e "bower_components/qunit/*" \
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi		

cd .buildResult

# *** [STEP 2] Signing tizen wearable app with profile: ${SIGNING_PROFILE_NAME}:${SIGNING_PROFILE_FILENAME}.xml
$TIZEN_HOME/web-signing -n -profile ${SIGNING_PROFILE_NAME}:${TIZEN_HOME_DATA}/${SIGNING_PROFILE_FILENAME}.xml 
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi

# *** [STEP 3] Packaging tizen wearable app as: ${PRODUCT_NAME}.wgt
$TIZEN_HOME/web-packaging -n ../../../bin/${PRODUCT_NAME}_${BUILD_NUMBER}.wgt
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
