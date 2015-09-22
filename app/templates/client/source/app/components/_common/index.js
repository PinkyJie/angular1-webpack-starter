import angular from 'angular';

// services
import EVENT from './services/event.constant';
import AjaxErrorHandler from './services/ajax-error-handler.service';
import Error from './services/error.service';
import Logger from './services/logger.service';
import Resolve from './services/resolve.service';
import RouterHelperProvider from './services/router-helper.provider';
import User from './services/user.service';
import Util from './services/util.service';
// directives
import FocusMe from './directives/focus-me.directive';
import LoadingButton from './directives/loading-button.directive';
import ValidateNumber from './directives/validate-number.directive';
// config
import appConfig from './config';
// production
import {ExceptionHandlerProvider, exceptionHandlerConfig} from './production/exception-handler.provider';
import appProductionConfig from './production/production.config';

const common = angular.module('app.common', []);

common
    .constant('Event', EVENT)
    .service('AjaxErrorHandler', AjaxErrorHandler)
    .service('Error', Error)
    .service('Logger', Logger)
    .service('Resolve', Resolve)
    .provider('RouterHelper', RouterHelperProvider)
    .service('UserAPI', User)
    .service('Util', Util)
    .directive('aioFocusMe', FocusMe)
    .directive('aioLoadingButton', LoadingButton)
    .directive('aioValidateNumber', ValidateNumber)
    .config(appConfig);

if (__BUILD__) { // eslint-disable-line no-undef
    common
        .provider('ExceptionHandler', ExceptionHandlerProvider)
        .config(exceptionHandlerConfig)
        .config(appProductionConfig);
}

export default common;
