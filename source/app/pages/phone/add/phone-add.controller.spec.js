import PhoneAddController from './phone-add.controller';

describe('PhoneAdd Controller', () => {
    let controller;
    let PhoneAPI;
    let $state;
    let $q;
    let Modal;
    let $rootScope;

    beforeEach(() => {
        angular.mock.inject((_$rootScope_, _$q_) => {
            $rootScope = _$rootScope_;
            $q = _$q_;
            PhoneAPI = jasmine.createSpyObj('PhoneAPI', ['addNewPhone']);
            $state = jasmine.createSpyObj('$state', ['go']);
            Modal = jasmine.createSpyObj('Modal', ['open']);
            controller = new PhoneAddController(PhoneAPI, $state, $q, Modal);
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.PhoneAPI).toBe(PhoneAPI);
            expect(controller.$state).toBe($state);
            expect(controller.$q).toBe($q);
            expect(controller.Modal).toBe(Modal);
            expect(controller.phone).toEqual({});
            expect(controller.state).toEqual('add');
        });
    });

    describe('addNewPhone function', () => {
        let deferred;

        beforeEach(() => {
            deferred = $q.defer();
            PhoneAPI.addNewPhone.and.returnValue(deferred.promise);
            spyOn($q, 'reject');
        });

        it('should go to correct state if API resolves', () => {
            deferred.resolve();
            controller.addNewPhone({id: 1});
            expect(PhoneAPI.addNewPhone).toHaveBeenCalledWith({id: 1});
            $rootScope.$digest();
            expect($state.go).toHaveBeenCalledWith('root.layout.phone');
        });

        it('should show error modal if API rejects', () => {
            deferred.reject({text: 'error'});
            controller.addNewPhone({id: 1});
            expect(PhoneAPI.addNewPhone).toHaveBeenCalledWith({id: 1});
            $rootScope.$digest();
            expect(Modal.open).toHaveBeenCalledWith('Add phone error', 'error', {ok: 'OK'});
            expect($q.reject).toHaveBeenCalled();
        });
    });
});
