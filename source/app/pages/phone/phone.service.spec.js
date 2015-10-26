import PhoneService from './phone.service';

describe('Phone Service', () => {
    let $httpBackend;
    let service;
    let $q;
    let AjaxErrorHandler;
    let $http;

    beforeEach(() => {
        angular.mock.inject((_$httpBackend_, _$q_, _$http_) => {
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            $http = _$http_;
            AjaxErrorHandler = jasmine.createSpyObj('AjaxErrorHandler', ['catcher']);
            service = new PhoneService($http, $q, AjaxErrorHandler);
            spyOn($q, 'reject').and.callThrough();
        });
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(service.$http).toBe($http);
            expect(service.$q).toBe($q);
            expect(service.AjaxError).toBe(AjaxErrorHandler);
        });
    });

    function assertSuccess (returnData) {
        return (data) => {
            expect(data).toEqual(returnData);
        };
    }

    function assertError (error) {
        return () => {
            expect($q.reject).toHaveBeenCalledWith(error);
            expect(AjaxErrorHandler.catcher).toHaveBeenCalledWith(error);
        };
    }

    describe('getPhones function', () => {
        let apiResponse;
        beforeEach(() => {
            apiResponse = $httpBackend.expectGET('api/phones');
        });

        it('should resolve with phone data when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {phones: 'phones'}});
            service.getPhones().then(assertSuccess('phones'));
            $httpBackend.flush();
        });

        it('should reject when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            service.getPhones().catch(assertError('error'));
            $httpBackend.flush();
        });

        it('should reject when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            service.getPhones().catch(assertError(null));
            $httpBackend.flush();
        });
    });

    describe('getPhoneDetail function', () => {
        let apiResponse;
        beforeEach(() => {
            apiResponse = $httpBackend.expectGET(/api\/phones\/\d+/);
        });

        it('should resolve with phone detail when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {phone: 'phone'}});
            service.getPhoneDetail(1).then(assertSuccess('phone'));
            $httpBackend.flush();
        });

        it('should reject when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            service.getPhoneDetail(1).catch(assertError('error'));
            $httpBackend.flush();
        });

        it('should reject when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            service.getPhoneDetail(1).catch(assertError(null));
            $httpBackend.flush();
        });
    });

    describe('addNewPhone function', () => {
        let apiResponse;
        let phone;
        beforeEach(() => {
            phone = {name: 'name'};
            apiResponse = $httpBackend.expectPOST('api/phones');
        });

        it('should resolve with new phone when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {phone: 'phone'}});
            service.addNewPhone(phone).then(assertSuccess('phone'));
            $httpBackend.flush();
        });

        it('should reject when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            service.addNewPhone(phone).catch(assertError('error'));
            $httpBackend.flush();
        });

        it('should reject when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            service.addNewPhone(phone).catch(assertError(null));
            $httpBackend.flush();
        });
    });

    describe('updatePhone function', () => {
        let apiResponse;
        let phone;
        beforeEach(() => {
            phone = {name: 'name'};
            apiResponse = $httpBackend.expectPUT(/api\/phones\/\d+/);
        });

        it('should resolve with updated phone when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {phone: 'phone'}});
            service.updatePhone(1, phone).then(assertSuccess('phone'));
            $httpBackend.flush();
        });

        it('should reject when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            service.updatePhone(1, phone).catch(assertError('error'));
            $httpBackend.flush();
        });

        it('should reject when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            service.updatePhone(1, phone).catch(assertError(null));
            $httpBackend.flush();
        });
    });

    describe('removePhone function', () => {
        let apiResponse;
        beforeEach(() => {
            apiResponse = $httpBackend.expectDELETE(/api\/phones\/\d+/);
        });

        it('should resolve with deleted phone when API returns successful result', () => {
            apiResponse.respond({code: 0, result: {phone: 'phone'}});
            service.removePhone(1).then(assertSuccess('phone'));
            $httpBackend.flush();
        });

        it('should reject when API returns error result', () => {
            apiResponse.respond({code: 1, message: 'error'});
            service.removePhone(1).catch(assertError('error'));
            $httpBackend.flush();
        });

        it('should reject when API returns 500', () => {
            apiResponse.respond(() => {
                return [500];
            });
            service.removePhone(1).catch(assertError(null));
            $httpBackend.flush();
        });
    });
});
