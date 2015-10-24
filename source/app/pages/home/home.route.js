import homeHtml from './home.jade';

appHomeRun.$inject = ['RouterHelper'];
function appHomeRun (routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.home',
            config: {
                url: '/',
                views: {
                    'main@root': {
                        template: homeHtml
                    },
                    'sidebar@root': {},
                    'breadcrumb@root': {}
                },
                data: {
                    title: 'Home',
                    _class: 'home'
                }
            }
        }
    ];
}

export default appHomeRun;
