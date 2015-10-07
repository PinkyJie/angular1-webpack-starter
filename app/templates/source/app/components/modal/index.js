import angular from 'angular';

import './modal.styl';
import ModalService from './modal.service';

const modal = angular.module('app.components.modal', [])
    .service('Modal', ModalService);

export default modal;
