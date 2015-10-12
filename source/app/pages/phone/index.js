import angular from 'angular';

import layout from '../../components/_layout';
import PhoneController from './phone.controller';
import PhoneAddController from './add/phone-add.controller';
import PhoneDetailController from './detail/phone-detail.controller';
import PhoneSerivce from './phone.service';
import appPhoneRun from './phone.route';

import phoneForm from '../../components/phone-form';
import phoneTable from '../../components/phone-table';

export default angular.module('app.pages.phone', [
    layout.name,
    phoneForm.name,
    phoneTable.name
])
    .controller(PhoneController.name, PhoneController)
    .controller(PhoneAddController.name, PhoneAddController)
    .controller(PhoneDetailController.name, PhoneDetailController)
    .service('PhoneAPI', PhoneSerivce)
    .run(appPhoneRun);
