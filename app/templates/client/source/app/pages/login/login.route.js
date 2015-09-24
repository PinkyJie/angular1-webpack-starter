import loginHtml from './login.jade';
import LoginController from './login.controller';

appLoginRun.$inject = ['RouterHelper'];
function appLoginRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.login',
            config: {
                url: '/login?action',
                views: {
                    'main@root': {
                        template: loginHtml,
                        controller: `${LoginController.name} as vm`
                    },
                    'breadcrumb@root': {},
                    'sidebar@root': {}
                },
                data: {
                    title: 'Login',
                    _class: 'login'
                }
            }
        }
    ];
}

export default appLoginRun;
