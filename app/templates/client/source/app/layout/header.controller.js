(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state', 'User'];
    /* @ngInject */
    function HeaderController($state, User) {
        var vm = this;

        vm.go = $state.go;
    }
})();
