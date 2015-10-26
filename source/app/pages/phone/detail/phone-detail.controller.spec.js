import PhoneDetailController from './phone-detail.controller';

describe('PhoneDetail Controller', () => {
    let controller;
    let PhoneAPI;
    let $stateParams;
    let $q;
    let Modal;
    let $rootScope;
    let getPhoneDetailDefer;
    let updatePhoneDefer;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            PhoneAPI = jasmine.createSpyObj('PhoneAPI', ['getPhoneDetail', 'updatePhone']);
            $stateParams = {id: 1};
            Modal = jasmine.createSpyObj('Modal', ['open']);
            getPhoneDetailDefer = $q.defer();
            PhoneAPI.getPhoneDetail.and.returnValue(getPhoneDetailDefer.promise);
        });
    });

    describe('constructor function', () => {
        function assertCommon () {
            expect(controller.PhoneAPI).toBe(PhoneAPI);
            expect(controller.$stateParams).toBe($stateParams);
            expect(controller.$q).toBe($q);
            expect(controller.Modal).toBe(Modal);
            expect(controller.state).toEqual('view');
        }

        it('should init successfully with phone id', () => {
            $stateParams = {id: 1};
            controller = new PhoneDetailController(PhoneAPI, $stateParams, $q, Modal);
            assertCommon();
            expect(PhoneAPI.getPhoneDetail).toHaveBeenCalledWith(1);
        });

        it('should init successfully without phone id', () => {
            $stateParams = {};
            controller = new PhoneDetailController(PhoneAPI, $stateParams, $q, Modal);
            assertCommon();
            expect(PhoneAPI.getPhoneDetail).not.toHaveBeenCalled();
        });
    });

    describe('_getPhoneDetail function', () => {
        beforeEach(() => {
            $stateParams = {id: 1};
            controller = new PhoneDetailController(PhoneAPI, $stateParams, $q, Modal);
        });

        it('should set phone data if API resolves', () => {
            getPhoneDetailDefer.resolve('phone');
            $rootScope.$digest();
            expect(controller.phone).toEqual('phone');
        });

        it('should not set phone data if API rejects', () => {
            getPhoneDetailDefer.reject();
            $rootScope.$digest();
            expect(controller.phone).not.toBeDefined();
        });
    });

    describe('beginEdit/cancelUpdate function', () => {
        beforeEach(() => {
            controller = new PhoneDetailController(PhoneAPI, $stateParams, $q, Modal);
        });

        it('should set form to correct state', () => {
            controller.phone = {id: 1};
            controller.beginEdit();
            expect(controller.state).toEqual('edit');
            controller.phone = {id: 3};
            controller.cancelUpdate(controller);
            expect(controller.state).toEqual('view');
            expect(controller.phone).toEqual({id: 1});
        });
    });

    describe('updatePhone function', () => {
        let originalPhone;
        let updatedPhone;

        beforeEach(() => {
            controller = new PhoneDetailController(PhoneAPI, $stateParams, $q, Modal);
            updatePhoneDefer = $q.defer();
            PhoneAPI.updatePhone.and.returnValue(updatePhoneDefer.promise);
            originalPhone = {id: 1, model: 'model1', price: 1111};
            updatedPhone = {id: 1, model: 'model2', price: 2222};
        });

        it('should update phone successfully if API resolves', () => {
            updatePhoneDefer.resolve(updatedPhone);
            controller.updatePhone(controller, originalPhone);
            expect(PhoneAPI.updatePhone).toHaveBeenCalledWith(1, originalPhone);
            $rootScope.$digest();
            expect(controller.state).toEqual('view');
            expect(controller.phone).toEqual(updatedPhone);
        });

        it('should not update phone if API rejects', () => {
            updatePhoneDefer.reject({text: 'error'});
            spyOn($q, 'reject');
            controller.updatePhone(controller, originalPhone);
            expect(PhoneAPI.updatePhone).toHaveBeenCalledWith(1, originalPhone);
            $rootScope.$digest();
            expect(controller.phone).not.toBeDefined();
            expect(Modal.open).toHaveBeenCalled();
            expect($q.reject).toHaveBeenCalled();
            const args = Modal.open.calls.argsFor(0);
            expect(args[0]).toEqual('Update phone error');
            expect(args[1]).toEqual('error');
            expect(args[2]).toEqual({ok: 'OK'});
            const callback = args[3];
            spyOn(controller, 'cancelUpdate');
            callback();
            expect(controller.cancelUpdate).toHaveBeenCalled();
        });
    });
});
