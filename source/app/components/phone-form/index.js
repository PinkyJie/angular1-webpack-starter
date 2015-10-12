import angular from 'angular';

import PhoneFormController from './phone-form.controller';
import PhoneFromDirective from './phone-form.directive';

const phoneForm = angular.module('app.components.phoneForm', [])
    .controller(PhoneFormController.name, PhoneFormController)
    .directive(`aioPhoneForm`, PhoneFromDirective);

export default phoneForm;
