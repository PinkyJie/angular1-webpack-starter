import angular from 'angular';

import homeHeroHtml from './home-hero.jade';

const homeHero = angular.module('app.components.homeHero', []);

export {homeHero, homeHeroHtml};
