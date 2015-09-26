import squareMenuHtml from './square-menu.jade';

function SquareMenuDirective () {
    return {
        restrict: 'AE',
        scope: {
            menus: '=',
            colors: '='
        },
        template: squareMenuHtml
    };
}

SquareMenuDirective.$inject = [];

export default SquareMenuDirective;
