import angular from 'angular';

import SidebarController from './sidebar.controller';
import sidebarHtml from './sidebar.jade';
import common from '../_common';

const sidebar = angular.module('app.components.sidebar', [
    common.name
])
    .controller(SidebarController.name, SidebarController);

export default {sidebar, sidebarHtml, SidebarController};
