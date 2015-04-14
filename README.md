# tizentemplate
A basic Tizen Wearable app which can build from command line or IDE.

This is a skeleton Tizen Wearable app which can run from the IDE, and it includes build scripts which can be run from your continuous integration server.

The build script minifies your Javascript and generates a signed `.wgt` in the `bin` folder ready to install to a device.

The project is set up to use JSHint, RequireJS and QUnit for unit tests.

## How to use

### IDE

Import the project into Tizen IDE for Wearable and rename as appropriate.  The app contains a fictitious package ID, change this to something unique.

The project can then be run or debugged on device from the IDE.

### Build script

The build script requires Node Bower and Grunt.  Once you've installed Node, run

    npm install -g bower
    npm install -g grunt-cli
    
Build scripts are included for Mac and Windows.  On Mac, it assumes the Tizen Wearable IDE is installed in `~`, and on Windows it needs to be installed in `C:\`.

### Signing

The build script expects to find `profiles.xml` in `~/tizen-wearable-sdk-data` (`C:\tizen-wearable-sdk-data` for Windows).  Additionally, `profiles.xml` needs to point to valid `author.p12` and `distributor.p12` files.  Please see "Tizen Signing - The Definitive Guide" for more information.
