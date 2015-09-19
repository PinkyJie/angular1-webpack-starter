import mainLayoutHtml from './main.layout.jade';
import {headerHtml, HeaderController} from '../header';
import {footerHtml, FooterController} from '../footer';
import {sidebarHtml, SidebarController} from '../sidebar';
import {breadcrumbHtml, BreadcrumbController} from '../breadcrumb';

appLayoutRun.$inject = ['RouterHelper'];
function appLayoutRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root',
            config: {
                abstract: true,
                url: '',
                template: mainLayoutHtml
            }
        },
        {
            state: 'root.layout',
            config: {
                abstract: true,
                url: '',
                views: {
                    header: {
                        template: headerHtml,
                        controller: `${HeaderController.name} as vm`
                    },
                    sidebar: {
                        template: sidebarHtml,
                        controller: `${SidebarController.name} as vm`
                    },
                    breadcrumb: {
                        template: breadcrumbHtml,
                        controller: `${BreadcrumbController.name} as vm`
                    },
                    footer: {
                        template: footerHtml,
                        controller: `${FooterController.name} as vm`
                    }
                }
            }
        }
    ];
}

export default appLayoutRun;
