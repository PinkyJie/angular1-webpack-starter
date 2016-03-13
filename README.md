# angular1-webpack-starter
[![Travis](https://img.shields.io/travis/PinkyJie/angular1-webpack-starter.svg?style=flat-square)](https://travis-ci.org/PinkyJie/angular1-webpack-starter)
[![Codecov](https://img.shields.io/codecov/c/github/PinkyJie/angular1-webpack-starter.svg?style=flat-square)](https://codecov.io/github/PinkyJie/angular1-webpack-starter)
[![David](https://img.shields.io/david/PinkyJie/angular1-webpack-starter.svg?style=flat-square)](https://david-dm.org/pinkyjie/angular1-webpack-starter#info=dependencies&view=table)
[![David](https://img.shields.io/david/dev/PinkyJie/angular1-webpack-starter.svg?style=flat-square)](https://david-dm.org/pinkyjie/angular1-webpack-starter#info=devDependencies&view=table)
[![node](https://img.shields.io/node/v/angular1-webpack-starter.svg?style=flat-square)](https://nodejs.org)
[![npm](https://img.shields.io/npm/v/angular1-webpack-starter.svg?style=flat-square)](https://www.npmjs.com/package/angular1-webpack-starter)

A starter project using Angular 1.x with Webpack. A Webpack + ES6 re-implementation of the  [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

Still wanna use **Gulp + ES5**? Check the [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

> Pure front-end implementation, all API interaction are mocked using [angular-mocks](https://docs.angularjs.org/api/ngMock).

## Preview

Check out the [demo site](http://pinkyjie.com/angular1-webpack-starter/#/).

> The dome site is a pure front-end implementation, so you can use any email/password to login, see [mock file](source/test/e2e/mocks/e2e.user.js) for detail. It is hosted on Github pages, no back-end support, so we use `#` style URL.

## Features

* ES6
* Component based structure proposed in https://github.com/fouber/blog/issues/10
* Lazy load resources(js/css/images/templates...) for each page
* Material Design using [MaterializeCSS](http://materializecss.com/)
* Flex Layout
* Responsive Design
   * Support multiple devices with different screen size.
   * Easy responsive implementation, very convenient to support small screen devices. (see [responsive.styl](source/app/components/_common/styles/responsive.styl))
* Animation
   * Using [animate.css](https://daneden.github.io/animate.css/).
   * All the animation defined by `animate.css` can be used directly as keyframe animation. (see [animation.styl](source/app/components/_common/styles/animation.styl))
* More understandable router design
* Easy implementation for Sidebar Navigation and Breadcrumb

## Get Started

```bash
git clone https://github.com/PinkyJie/angular1-webpack-starter.git
cd angular1-webpack-starter
npm install
npm start
```

Then open your browser with URL `http://localhost:8080/webpack-dev-server/`.

## Tests

* Unit Test: `npm test`
* Unit Test with auto watch: `npm run test:watch`
* E2E Test: `npm run e2e`
    * run `npm run webdriver-update` first
    * make sure a local mock server is running

Check the [Unit test coverage report](http://pinkyjie.com/angular1-webpack-starter/coverage).

Check the E2E test report: [![Sauce Test Status](https://saucelabs.com/buildstatus/sd4399340)](https://saucelabs.com/u/sd4399340)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/sd4399340.svg)](https://saucelabs.com/u/sd4399340)


## Building

```bash
npm run build
```
The optimized files will be generated in `build` folder.

## CI
Proudly use [Travis](https://travis-ci.org/) to do Continuous Integration. 

Every push will trigger a build on Travis, it will automatically: 
- run unit test.
- run build script, deploy website and test coverage report to Github pages.
- run E2E test on different browsers using [Sauce Labs](https://saucelabs.com). 

Check [.travis.yml](.travis.yml) and [publish-to-gh-pages.sh](publish-to-gh-pages.sh) for detail implementation.

Check [Travis build log](https://travis-ci.org/PinkyJie/angular1-webpack-starter) for build results.

## Blog series

http://pinkyjie.com/tags/angular1-webpack-starter/

## License

MIT
