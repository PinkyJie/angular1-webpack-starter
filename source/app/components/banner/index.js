import angular from 'angular';

import BannerDirective from './banner.directive';

const banner = angular.module('app.components.banner', [])
    .directive(`aioBanner`, BannerDirective);

export default banner;
