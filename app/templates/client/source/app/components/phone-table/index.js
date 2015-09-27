import angular from 'angular';

import PhoneTableController from './phone-table.controller';
import PhoneTableDirective from './phone-table.directive';

const phoneTable = angular.module('app.components.phoneTable', [])
    .controller(PhoneTableController.name, PhoneTableController)
    .directive(`aioPhoneTable`, PhoneTableDirective);

export default phoneTable;
