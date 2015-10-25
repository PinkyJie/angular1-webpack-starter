import PhoneController from './phone.controller';

describe('Phone Controller', () => {
    let controller;
    let PhoneAPI;
    let $state;
    let Modal;
    let $q;
    let $rootScope;
    let getPhonesDefer;
    let removePhoneDefer;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            PhoneAPI = jasmine.createSpyObj('PhoneAPI', ['getPhones', 'removePhone']);
            $state = jasmine.createSpyObj('$state', ['go']);
            Modal = jasmine.createSpyObj('Modal', ['open']);
            getPhonesDefer = $q.defer();
            PhoneAPI.getPhones.and.returnValue(getPhonesDefer.promise);
            removePhoneDefer = $q.defer();
            PhoneAPI.removePhone.and.returnValue(removePhoneDefer.promise);
            controller = new PhoneController(PhoneAPI, $state, Modal);
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.PhoneAPI).toBe(PhoneAPI);
            expect(controller.$state).toBe($state);
            expect(controller.Modal).toBe(Modal);
        });
    });

    describe('_getPhoneList function', () => {
        it('should set phone data if API resolves', () => {
            getPhonesDefer.resolve('phone');
            controller._getPhoneList();
            $rootScope.$digest();
            expect(controller.phones).toEqual('phone');
        });

        it('should not set phone data if API rejects', () => {
            getPhonesDefer.reject();
            controller._getPhoneList();
            $rootScope.$digest();
            expect(controller.phones).not.toBeDefined();
        });
    });

    describe('gotoPhoneDetail function', () => {
        it('should go to correct state', () => {
            controller.gotoPhoneDetail(controller, {id: 1});
            expect($state.go).toHaveBeenCalledWith('root.layout.phone.detail', {id: 1});
        });
    });

    describe('deletePhone function', () => {
        beforeEach(() => {
            spyOn(controller, '_doDelete');
        });

        it('should show error modal before deleting', () => {
            controller.deletePhone(controller, {
                id: 1,
                model: 'model'
            });
            expect(Modal.open).toHaveBeenCalled();
            const args = Modal.open.calls.argsFor(0);
            expect(args[0]).toEqual('Are your sure?');
            expect(args[1]).toEqual('All information about [model] will be REMOVED!');
            expect(args[2]).toEqual({ok: 'delete', cancel: 'cancel'});
            const callback = args[3];
            callback(true);
            expect(controller._doDelete).toHaveBeenCalledWith(1);
            controller._doDelete.calls.reset();
            callback(false);
            expect(controller._doDelete).not.toHaveBeenCalled();
        });
    });

    describe('_doDelete function', () => {
        beforeEach(() => {
            spyOn(controller, '_getPhoneList');
        });

        it('should refresh phone list after removing successfully', () => {
            removePhoneDefer.resolve();
            controller._doDelete(1);
            expect(PhoneAPI.removePhone).toHaveBeenCalledWith(1);
            $rootScope.$digest();
            expect(controller._getPhoneList).toHaveBeenCalled();
            expect(Modal.open).not.toHaveBeenCalled();
        });

        it('should show error modal after removing failed', () => {
            removePhoneDefer.reject({text: 'error'});
            controller._doDelete(1);
            expect(PhoneAPI.removePhone).toHaveBeenCalledWith(1);
            $rootScope.$digest();
            expect(Modal.open).toHaveBeenCalled();
            const args = Modal.open.calls.argsFor(0);
            expect(args[0]).toEqual('Delete phone error');
            expect(args[1]).toEqual('error');
            expect(args[2]).toEqual({ok: 'OK'});
            const callback = args[3];
            callback(true);
            expect(controller._getPhoneList).toHaveBeenCalled();
            controller._getPhoneList.calls.reset();
            callback(false);
            expect(controller._getPhoneList).not.toHaveBeenCalled();
        });
    });
});
