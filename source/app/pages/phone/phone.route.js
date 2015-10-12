import phoneHtml from './phone.jade';
import PhoneController from './phone.controller';
import phoneAddHtml from './add/phone-add.jade';
import PhoneAddController from './add/phone-add.controller';
import phoneDetailHtml from './detail/phone-detail.jade';
import PhoneDetailController from './detail/phone-detail.controller';

appPhoneRun.$inject = ['RouterHelper'];
function appPhoneRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.phone',
            config: {
                url: '/phone',
                views: {
                    'main@root': {
                        template: phoneHtml,
                        controller: `${PhoneController.name} as vm`
                    }
                },
                data: {
                    title: 'Phone',
                    _class: 'phone',
                    requireLogin: true
                },
                sidebar: {
                    icon: 'mdi-hardware-phone-android',
                    text: 'Phones'
                },
                breadcrumb: 'Phone List'
            }
        },
        {
            state: 'root.layout.phone.add',
            config: {
                url: '/add',
                views: {
                    'main@root': {
                        template: phoneAddHtml,
                        controller: `${PhoneAddController.name} as vm`
                    }
                },
                breadcrumb: 'Add Phone'
            }
        },
        {
            state: 'root.layout.phone.detail',
            config: {
                url: '/:id',
                views: {
                    'main@root': {
                        template: phoneDetailHtml,
                        controller: `${PhoneDetailController.name} as vm`
                    }
                },
                breadcrumb: 'Phone Detail'
            }
        }
    ];
}

export default appPhoneRun;
