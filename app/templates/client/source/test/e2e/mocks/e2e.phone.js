// API mock for phone.service.js
(function () {
    'use strict';

    angular
        .module('appTest')
        .run(phoneServiceMock);

    phoneServiceMock.$inject = ['mockData', '$httpBackend'];
    /* @ngInject */
    function phoneServiceMock (mockData, $httpBackend) {
        $httpBackend.whenGET('api/phones').respond(getPhonesHandler);
        $httpBackend.whenGET(/api\/phones\/\d+/).respond(getPhoneDetailHandler);
        $httpBackend.whenPOST('api/phones').respond(addNewPhoneHandler);
        $httpBackend.whenPUT(/api\/phones\/\d+/).respond(updatePhoneDetailHandler);
        $httpBackend.whenDELETE(/api\/phones\/\d+/).respond(removePhoneHandler);

        function getPhonesHandler () {
            return [200, {code: 0, message: null, result: {
                phones: mockData.phones
            }}];
        }

        function getPhoneDetailHandler (method, url) {
            var matches = url.match(/^api\/phones\/(\d+)/);
            var id;
            var targetPhone;
            if (matches.length === 2) {
                id = matches[1];
                targetPhone = _getPhoneById(id);
                if (targetPhone.length > 0) {
                    return [200, {code: 0, message: null, result: {
                        'phone': targetPhone[0]
                    }}];
                }
            }
            return [200, {code: 1, message: 'PHONE_QUERY_NOT_FOUND', result: null}];
        }

        function addNewPhoneHandler (method, url, data) {
            var req = JSON.parse(data);
            var currentCount = mockData.phones.length;
            req.phone.id = '' + (currentCount + 1);
            mockData.phones.push(req.phone);
            return [200, {code: 0, message: null, result: {
                'phone': req.phone
            }}];
        }

        function updatePhoneDetailHandler (method, url, data) {
            var req = JSON.parse(data);
            var matches = url.match(/^api\/phones\/(\d+)/);
            var id;
            var targetPhone;
            var index;
            if (matches.length === 2) {
                id = matches[1];
                targetPhone = _getPhoneById(id);
                if (targetPhone.length > 0) {
                    mockData.phones.forEach(function (phone, idx) {
                        if (phone.id === id) {
                            index = idx;
                        }
                    });
                    req.phone.id = id;
                    mockData.phones[index] = req.phone;
                    return [200, {code: 0, message: null, result: {
                        'phone': req.phone
                    }}];
                }
            }
            return [200, {code: 1, message: 'PHONE_UPDATE_NOT_FOUND', result: null}];
        }

        function removePhoneHandler (method, url) {
            var matches = url.match(/^api\/phones\/(\d+)/);
            var id;
            var targetPhone;
            var index;
            if (matches.length === 2) {
                id = matches[1];
                targetPhone = _getPhoneById(id);
                if (targetPhone.length > 0) {
                    mockData.phones.forEach(function (phone, idx) {
                        if (phone.id === id) {
                            index = idx;
                        }
                    });
                    mockData.phones.splice(index, 1);
                    return [200, {code: 0, message: null, result: {
                        'phone': targetPhone[0]
                    }}];
                }
            }
            return [200, {code: 1, message: 'PHONE_DELETE_NOT_FOUND', result: null}];
        }

        function _getPhoneById (id) {
            return mockData.phones.filter(function (phone) {
                return phone.id === id;
            });
        }

    }

})();
