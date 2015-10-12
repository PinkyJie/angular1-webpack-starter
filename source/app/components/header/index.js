import angular from 'angular';

import HeaderController from './header.controller';
import headerHtml from './header.jade';
import common from '../_common';

const header = angular.module('app.components.header', [common.name])
    .controller(HeaderController.name, HeaderController);

export {header, headerHtml, HeaderController};
