// API mock for phone.service.js
phoneServiceMock.$inject = ['MockData', '$httpBackend'];
function phoneServiceMock (MockData, $httpBackend) {
    $httpBackend.whenGET('api/phones').respond(getPhonesHandler);
    $httpBackend.whenGET(/api\/phones\/\d+/).respond(getPhoneDetailHandler);
    $httpBackend.whenPOST('api/phones').respond(addNewPhoneHandler);
    $httpBackend.whenPUT(/api\/phones\/\d+/).respond(updatePhoneDetailHandler);
    $httpBackend.whenDELETE(/api\/phones\/\d+/).respond(removePhoneHandler);

    function getPhonesHandler () {
        return [200, {code: 0, message: null, result: {
            phones: MockData.phones
        }}];
    }

    function getPhoneDetailHandler (method, url) {
        const matches = url.match(/^api\/phones\/(\d+)/);
        let id;
        let targetPhone;
        if (matches.length === 2) {
            id = matches[1];
            targetPhone = _getPhoneById(id);
            if (targetPhone.length > 0) {
                return [200, {code: 0, message: null, result: {
                    phone: targetPhone[0]
                }}];
            }
        }
        return [200, {code: 1, message: 'PHONE_QUERY_NOT_FOUND', result: null}];
    }

    function addNewPhoneHandler (method, url, data) {
        const req = JSON.parse(data);
        const currentCount = MockData.phones.length;
        req.phone.id = String(currentCount + 1);
        MockData.phones.push(req.phone);
        return [200, {code: 0, message: null, result: {
            phone: req.phone
        }}];
    }

    function updatePhoneDetailHandler (method, url, data) {
        const req = JSON.parse(data);
        const matches = url.match(/^api\/phones\/(\d+)/);
        let id;
        let targetPhone;
        let index;
        if (matches.length === 2) {
            id = matches[1];
            targetPhone = _getPhoneById(id);
            if (targetPhone.length > 0) {
                MockData.phones.forEach((phone, idx) => {
                    if (phone.id === id) {
                        index = idx;
                    }
                });
                req.phone.id = id;
                MockData.phones[index] = req.phone;
                return [200, {code: 0, message: null, result: {
                    phone: req.phone
                }}];
            }
        }
        return [200, {code: 1, message: 'PHONE_UPDATE_NOT_FOUND', result: null}];
    }

    function removePhoneHandler (method, url) {
        const matches = url.match(/^api\/phones\/(\d+)/);
        let id;
        let targetPhone;
        let index;
        if (matches.length === 2) {
            id = matches[1];
            targetPhone = _getPhoneById(id);
            if (targetPhone.length > 0) {
                MockData.phones.forEach((phone, idx) => {
                    if (phone.id === id) {
                        index = idx;
                    }
                });
                MockData.phones.splice(index, 1);
                return [200, {code: 0, message: null, result: {
                    phone: targetPhone[0]
                }}];
            }
        }
        return [200, {code: 1, message: 'PHONE_DELETE_NOT_FOUND', result: null}];
    }

    function _getPhoneById (id) {
        return MockData.phones.filter((phone) => {
            return phone.id === id;
        });
    }
}

export default phoneServiceMock;
