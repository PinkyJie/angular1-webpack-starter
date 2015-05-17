// all data used by e2e mock service is here
(function () {
    'use strict';

    angular
        .module('appTest')
        .factory('MockData', MockData);

    function MockData () {
        var _loginStatus = false;
        var service = {
            loginStatus: _loginStatus,
            userInfo: _userInfo
        };

        return service;
    }

    var _userInfo = {
        'name': 'PinkyJie'
    };

})();
