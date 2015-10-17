import angular from 'angular';

// services
import EventConstant from './services/event.constant';
import AjaxErrorHandlerService from './services/ajax-error-handler.service';
import ErrorService from './services/error.service';
import LoggerService from './services/logger.service';
import ResolveService from './services/resolve.service';
import RouterHelperProvider from './services/router-helper.provider';
import UserService from './services/user.service';
import UtilService from './services/util.service';
// directives
import FocusMeDirective from './directives/focus-me.directive';
import LoadingButtonDirective from './directives/loading-button.directive';
import ValidateNumberDirective from './directives/validate-number.directive';
import DropdownInitDirective from './directives/dropdown-init.directive';
import TooltipInitDirective from './directives/tooltip-init.directive';
import SelectInitDirective from './directives/select-init.directive';
import DatepickerInitDirective from './directives/datepicker-init.directive';
// config
import appConfig from './config';
// production
import {appProductionConfig, exceptionHandlerConfig} from './production/production.config';

const common = angular.module('app.common', []);

common
    .constant('Event', EventConstant)
    .service('AjaxErrorHandler', AjaxErrorHandlerService)
    .service('Error', ErrorService)
    .service('Logger', LoggerService)
    .service('Resolve', ResolveService)
    .provider('RouterHelper', RouterHelperProvider)
    .service('UserAPI', UserService)
    .service('Util', UtilService)
    .directive('aioFocusMe', FocusMeDirective)
    .directive('aioLoadingButton', LoadingButtonDirective)
    .directive('aioValidateNumber', ValidateNumberDirective)
    .directive('aioDropdownInit', DropdownInitDirective)
    .directive('aioTooltipInit', TooltipInitDirective)
    .directive('aioSelectInit', SelectInitDirective)
    .directive('aioDatepickerInit', DatepickerInitDirective)
    .config(appConfig);

if (__BUILD__) { // eslint-disable-line no-undef
    common
        .config(exceptionHandlerConfig)
        .config(appProductionConfig);
}

export default common;
