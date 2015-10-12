import angular from 'angular';

import FooterController from './footer.controller';
import footerHtml from './footer.jade';
import common from '../_common';

const footer = angular.module('app.components.footer', [common.name])
    .controller(FooterController.name, FooterController);

export {footer, footerHtml, FooterController};
