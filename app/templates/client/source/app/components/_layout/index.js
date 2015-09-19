import angular from 'angular';

import common from '../_common';
import appLayoutRun from './layout.route';
import {header} from '../header';
import {footer} from '../footer';
import {sidebar} from '../sidebar';
import {breadcrumb} from '../breadcrumb';

export default angular.module('app.layout', [
    common.name,
    header.name,
    footer.name,
    sidebar.name,
    breadcrumb.name
]).run(appLayoutRun);
