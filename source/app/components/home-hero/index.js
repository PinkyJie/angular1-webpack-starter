import angular from 'angular';

import HomeHeroDirective from './home-hero.directive';

const homeHero = angular.module('app.components.homeHero', [])
    .directive('aioHomeHero', HomeHeroDirective);

export default homeHero;
