import 'angular';
import 'angular-mocks';
import 'materialize-css/dist/js/materialize.js';

const testsContext = require.context('../../app', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
