import 'angular';
import 'angular-mocks';
import 'phantomjs-polyfill';
import 'materialize-css/dist/js/materialize.js';

const testsContext = require.context('../../app', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
