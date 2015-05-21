(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('LoadingController', LoadingController);

    LoadingController.$inject = ['util'];
    /* @ngInject */
    function LoadingController (util) {

        init();

        ///////////////

        function init () {
            util.preloadImage('static/images/layout/loading.gif');
        }
    }
})();
