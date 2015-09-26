import angular from 'angular';

import SquareMenuDirective from './square-menu.directive';

const squareMenu = angular.module('app.components.squareMenu', [])
    .directive('aioSquareMenu', SquareMenuDirective);

export default squareMenu;
