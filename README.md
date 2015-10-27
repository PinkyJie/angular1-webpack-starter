# angular1-webpack-starter

A starter project using Angular 1.x with Webpack. A Webpack + ES6 re-implementation of the  [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

Still wanna use **Gulp + ES5**? Check the [generator-aio-angular](https://github.com/PinkyJie/generator-aio-angular) project.

> Pure front-end implementation, all API interaction are mocked using [angular-mocks](https://docs.angularjs.org/api/ngMock).

## Preview

<del>Check out the [demo site](/#).</del>

> The dome site is a pure front-end implementation, so you can use any email/password to login, see [mock file](/#) for detail. It is hosted on Github pages, no back-end support, so we use `#` style URL.

## Features

* ES6
* Component based structure proposed in https://github.com/fouber/blog/issues/10
* Material Design using [MaterializeCSS](http://materializecss.com/)
* Flex Layout
* Responsive Design
   * Support multiple devices with different screen size.
   * Easy responsive implementation, very convenient to support small screen devices. (see [responsive.styl](source/app/components/_common/styles/responsive.styl))
* Animation
   * Using [animate.css](https://daneden.github.io/animate.css/).
   * All the animation defined by `animate.css` can be used directly as keyframe animation. (see [content.styl](source/app/components/_common/styles/animation.styl))
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
* E2E Test: `npm run test:e2e` (may need to run `npm run webdriver-update` first)

## <del>Building</del>

```bash
npm run build
```

## License

MIT
