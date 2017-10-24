# Bitfindr
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/bitfindr/bitfindr.svg?branch=master)](https://travis-ci.org/bitfindr/bitfindr)
[![Coverage Status](https://coveralls.io/repos/github/bitfindr/bitfindr/badge.svg)](https://coveralls.io/github/bitfindr/bitfindr)

This app is aimed at helping people that deal with cryptocurrency transactions, like lending money to friends, making small payments, etc. Initially its focus is to behave like a bitcoin users catalog app, that you can save and share contacts with their wallet addresses and qr codes.

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

## Run Tests:
Run tests in watch mode:
```sh
$ npm test
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


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/20783450?v=4" width="100px;"/><br /><sub>Andre Luis Araujo Santos</sub>](https://github.com/andrelas1)<br />[💻](https://github.com/bitfindr/bitfindr/commits?author=andrelas1 "Code") [🤔](#ideas-andrelas1 "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/9358427?v=4" width="100px;"/><br /><sub>Paulo Gabriel</sub>](https://github.com/paulonotz0r)<br />[🔧](#tool-paulonotz0r "Tools") | [<img src="https://avatars2.githubusercontent.com/u/5252921?v=4" width="100px;"/><br /><sub>Mike Schwartz</sub>](https://github.com/mike8161990)<br />[📖](https://github.com/bitfindr/bitfindr/commits?author=mike8161990 "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/13604523?v=4" width="100px;"/><br /><sub>Gabriel da Silva Rosa</sub>](https://github.com/gdsrosa)<br />[📖](https://github.com/bitfindr/bitfindr/commits?author=gdsrosa "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/2960769?v=4" width="100px;"/><br /><sub>Khaled Shaaban</sub>](http://www.webjunto.com)<br />[💻](https://github.com/bitfindr/bitfindr/commits?author=kshaaban- "Code") [🤔](#ideas-kshaaban- "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/16075854?v=4" width="100px;"/><br /><sub>Luis Guilherme</sub>](https://github.com/luisguilhermemaia)<br />[💻](https://github.com/bitfindr/bitfindr/commits?author=luisguilhermemaia "Code") [🎨](#design-luisguilhermemaia "Design") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
