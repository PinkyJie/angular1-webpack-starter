import ResolveService from './resolve.service';

// for service, we can directly unit test the class without Angular
describe('Logger Service', () => {
    let UserService;
    let $q;
    let Resolve;
    let $rootScope;

    beforeEach(() => {
        angular.module('test', [])
            .service('Resolve', ResolveService);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_, _Resolve_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            Resolve = _Resolve_;
            UserService = {
                isLoggedIn () {},
                checkLoggedInStatus () {}
            };
            spyOn($q, 'reject').and.callThrough();
        });
    });

    describe('login function', () => {
        describe('user has already logged in', () => {
            beforeEach(() => {
                spyOn(UserService, 'isLoggedIn').and.returnValue(true);
                Resolve.login(UserService, $q);
            });

            it('should not reject', () => {
                expect($q.reject).not.toHaveBeenCalled();
            });
        });

        describe('user has not logged in', () => {
            let deferred;
            beforeEach(() => {
                deferred = $q.defer();
                spyOn(UserService, 'isLoggedIn').and.returnValue(false);
                spyOn(UserService, 'checkLoggedInStatus').and.returnValue(deferred.promise);
                Resolve.login(UserService, $q);
            });
            it('should not reject if UserService\'s checkLoggedInStatus resolves', () => {
                deferred.resolve();
                $rootScope.$digest();
                expect($q.reject).not.toHaveBeenCalled();
            });

            it('should reject if UserService\'s checkLoggedInStatus rejects', () => {
                deferred.reject();
                $rootScope.$digest();
                expect($q.reject).toHaveBeenCalledWith('requireLogin');
            });
        });
    });
});
