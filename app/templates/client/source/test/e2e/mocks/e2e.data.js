// all data used by e2e mock service is here
(function () {
    'use strict';

    angular
        .module('appTest')
        .factory('mockData', mockData);

    function mockData () {
        var _loginStatus = false;
        var service = {
            loginStatus: _loginStatus,
            userInfo: _userInfo,
            userProducts: _userProducts,
            phones: _phones
        };

        return service;
    }

    var _userInfo = {
        'name': 'PinkyJie'
    };

    var _userProducts = [
        {
            'name': 'phone',
            'count': 5
        }
    ];

    var _phones = [
        {
            'id': 1,
            'model': 'iPhone 6',
            'os': 'iOS',
            'price': 6000,
            'manufacturer': 'Apple',
            'releaseDate': '2014.06.10'
        },
        {
            'id': 2,
            'model': 'iPhone 6 Plus',
            'os': 'iOS',
            'price': 6000,
            'manufacturer': 'Apple',
            'releaseDate': '2014.06.10'
        },
        {
            'id': 2,
            'model': 'Nexus 6',
            'os': 'Andoird',
            'price': 6000,
            'manufacturer': 'Apple',
            'releaseDate': '2014.06.10'
        },
        {
            'id': 4,
            'model': 'Galaxy S6',
            'os': 'Android',
            'price': 6000,
            'manufacturer': 'Samsung',
            'releaseDate': '2014.06.10'
        },
        {
            'id': 5,
            'model': 'Mi 4',
            'os': 'Andoird',
            'price': 6000,
            'manufacturer': 'Xiaomi',
            'releaseDate': '2014.06.10'
        }
    ];

})();
