import PhoneTableController from './phone-table.controller';
import phoneTableHtml from './phone-table.jade';

function PhoneTableDirective () {
    return {
        restrict: 'AE',
        scope: {},
        controller: PhoneTableController.name,
        controllerAs: 'table',
        bindToController: {
            phones: '=',
            firstButtonClick: '&',
            secondButtonClick: '&'
        },
        template: phoneTableHtml
    };
}

PhoneTableDirective.$inject = [];

export default PhoneTableDirective;
