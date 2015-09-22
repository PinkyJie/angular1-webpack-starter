import homeHtml from './home.jade';
import {homeHeroHtml} from '../../components/home-hero';

appHomeRun.$inject = ['RouterHelper'];
function appHomeRun (routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.home',
            config: {
                abstract: true,
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
        },
        {
            state: 'root.layout.home.all',
            config: {
                url: '',
                views: {
                    hero: {
                        template: homeHeroHtml
                    }
                }
            }
        }
    ];
}

export default appHomeRun;
