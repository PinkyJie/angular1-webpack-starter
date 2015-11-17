import angular from 'angular';

import PhoneController from './phone.controller';
import PhoneAddController from './add/phone-add.controller';
import PhoneDetailController from './detail/phone-detail.controller';
import PhoneService from './phone.service';

import phoneForm from '../../components/phone-form';
import phoneTable from '../../components/phone-table';

export default angular.module('app.pages.phone', [
    phoneForm.name,
    phoneTable.name
])
    .controller(PhoneController.name, PhoneController)
    .controller(PhoneAddController.name, PhoneAddController)
    .controller(PhoneDetailController.name, PhoneDetailController)
    .service('PhoneAPI', PhoneService);
