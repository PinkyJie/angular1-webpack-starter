# angular1-webpack-starter
[![Travis](https://img.shields.io/travis/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()
[![Codecov](https://img.shields.io/codecov/c/github/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()

[![David](https://img.shields.io/david/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()
[![node](https://img.shields.io/node/v/angular1-webpack-starter.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/angular1-webpack-starter.svg?style=flat-square)]()

[![Github All Releases](https://img.shields.io/github/downloads/PinkyJie/angular1-webpack-starter/total.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()
[![GitHub license](https://img.shields.io/github/license/PinkyJie/angular1-webpack-starter.svg?style=flat-square)]()

A starter project using Angular 1.x with Webpack. A Webpack + ES6 re-implementation of the  [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

Still wanna use **Gulp + ES5**? Check the [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

> Pure front-end implementation, all API interaction are mocked using [angular-mocks](https://docs.angularjs.org/api/ngMock).

## Preview

Check out the [demo site](http://pinkyjie.com/angular1-webpack-starter/#/).
You can also check the unit test coverage report [here](http://pinkyjie.com/angular1-webpack-starter/converage).

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

## Building

```bash
npm run build
```
The optimized files will be generated in `build` folder.

## License

MIT
