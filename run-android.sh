#!/bin/bash
## Tool to check if everything works OK with appium config. Works on any Android-capable dev machine
appium-doctor --android

## Uninstalls the app before running, in case we need to clean up data before testing
#adb uninstall com.bitfindr.bitfindrapp &&

## Needed in case the app is not built yet
ionic cordova build android &&

## You have to run the command appium in another terminal before
protractor protractor.android.conf.js --suite initial
