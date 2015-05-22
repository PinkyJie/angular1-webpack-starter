// API mock for phone.service.js
(function () {
    'use strict';

    angular
        .module('appTest')
        .run(phoneServiceMock);

    phoneServiceMock.$inject = ['mockData', '$httpBackend'];
    /* @ngInject */
    function phoneServiceMock (mockData, $httpBackend) {
        $httpBackend.whenGET('api/phone').respond(getPhonesHanlder);

        function getPhonesHanlder () {
            return [200, {code: 0, message: null, result: {
                phones: mockData.phones
            }}];
        }

    }

})();
