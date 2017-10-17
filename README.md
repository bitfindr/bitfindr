# Bit Wallet Manager

This app is aimed at helping people that deal with cryptocurrency transactions, like lending money to friends, making small payments, etc. Initially its focus is to behave like a "contact address" app, that you can save and share contacts with their wallet addresses and qr codes. 

## Setup

Requirements to use this project:

##### Node.js (https://nodejs.org/download/)

##### npm (Node Package Manager, it comes with node.js installation)
In case you're not with the latest version of npm:
```sh
$ sudo npm install npm -g
```

##### Cordova & Ionic Cli
To install both of them on your system just launch this command:
```sh
$ sudo npm install cordova ionic -g
```

## Install NPM Dependencies
Once you clone this repository, run this command on your terminal to install all needed dependencies:
```sh
$ npm install
```
 
## Launching the App
After installing the needed dependencies you are done, launch your app with a simple
```sh
$ ionic serve
```

Then, to run it on a device/emulator, run:

```bash
$ ionic cordova platform add android
$ ionic cordova run android
```

or, for ios:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

