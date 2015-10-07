import angular from 'angular';

import SidebarSmController from './sidebar-sm.controller';
import sidebarSmHtml from './sidebar-sm.jade';
import common from '../_common';

const sidebarSm = angular.module('app.components.sidebarSm', [
    common.name
])
    .controller(SidebarSmController.name, SidebarSmController);

export default {sidebarSm, sidebarSmHtml, SidebarSmController};
