import angular from 'angular';

import BreadcrumbController from './breadcrumb.controller';
import breadcrumbHtml from './breadcrumb.jade';
import common from '../_common';

const breadcrumb = angular.module('app.components.breadcrumb', [common.name])
    .controller(BreadcrumbController.name, BreadcrumbController);

export {breadcrumb, breadcrumbHtml, BreadcrumbController};
