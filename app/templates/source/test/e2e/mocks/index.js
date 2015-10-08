import angular from 'angular';
import 'angular-mocks';

import app from '../../../app';

import MockData from './e2e.data';
import {appTestConfig, appTestRun} from './e2e.config';
import userServiceMock from './e2e.user';
import phoneServiceMock from './e2e.phone';

angular.module('appTest', [
    app.name,
    'ngMockE2E'
])
    .service(MockData.name, MockData)
    .config(appTestConfig)
    .run(appTestRun)
    .run(userServiceMock)
    .run(phoneServiceMock);
