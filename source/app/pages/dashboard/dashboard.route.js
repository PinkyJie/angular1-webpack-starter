import dashboardHtml from './dashboard.jade';
import DashboardController from './dashboard.controller';

appDashboardRun.$inject = ['RouterHelper'];
function appDashboardRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.dashboard',
            config: {
                url: '/dashboard',
                views: {
                    'main@root': {
                        template: dashboardHtml,
                        controller: `${DashboardController.name} as vm`
                    }
                },
                data: {
                    title: 'Dashboard',
                    _class: 'dashboard',
                    requireLogin: true
                },
                sidebar: {
                    icon: 'mdi-action-dashboard',
                    text: 'Dashboard'
                },
                breadcrumb: 'Dashboard'
            }
        }
    ];
}

export default appDashboardRun;
