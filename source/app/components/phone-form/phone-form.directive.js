import PhoneFormController from './phone-form.controller';
import phoneFormHtml from './phone-form.jade';

function PhoneFormDirective () {
    return {
        restrict: 'AE',
        scope: {},
        controller: PhoneFormController.name,
        controllerAs: 'form',
        bindToController: {
            phone: '=',
            state: '@',
            submit: '&',
            cancel: '&'
        },
        template: phoneFormHtml
    };
}

PhoneFormDirective.$inject = [];

export default PhoneFormDirective;
