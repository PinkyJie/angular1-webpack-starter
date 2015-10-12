import notFoundHtml from './404.jade';

appRun.$inject = ['RouterHelper'];
export default function appRun (RouterHelper) {
    const otherwise = '/404';
    RouterHelper.configureStates(getStates(), otherwise);
}

function getStates () {
    return [
        {
            state: 'root.layout.notfound',
            config: {
                url: '/404',
                views: {
                    'main@root': {
                        template: notFoundHtml
                    },
                    'sidebar@root': {}
                },
                data: {
                    title: '404',
                    _class: 'notfound'
                },
                breadcrumb: '404'
            }
        }
    ];
}
