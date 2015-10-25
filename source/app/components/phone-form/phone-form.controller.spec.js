import PhoneFormController from './phone-form.controller';

describe('PhoneForm Controller', () => {
    let controller;
    let $q;
    let $rootScope;

    beforeEach(() => {
        angular.mock.inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;
            controller = new PhoneFormController();
        });
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(controller.allOS).toEqual(['Android', 'iOS', 'Windows Phone']);
        });
    });

    describe('submitForm function', () => {
        let deferred;
        let phone;
        beforeEach(() => {
            phone = {phone: 'phone'};
            deferred = $q.defer();
            controller.phoneForm = {};
            controller.phone = {};
            controller.submit = jasmine.createSpy('submit');
            controller.submit.and.returnValue(deferred.promise);
        });

        describe('form is invalid', () => {
            it('should do nothing if form is invalid', () => {
                controller.phoneForm.$invalid = true;
                controller.submitForm(phone.phone);
                expect(controller.isRequest).not.toBeDefined();
                expect(controller.submit).not.toHaveBeenCalled();
            });

            it('should do nothing if releaseDate is not set', () => {
                controller.phoneForm.$invalid = false;
                controller.phone.releaseDate = null;
                controller.submitForm(phone.phone);
                expect(controller.isRequest).not.toBeDefined();
                expect(controller.submit).not.toHaveBeenCalled();
            });
        });

        describe('form is valid', () => {
            beforeEach(() => {
                phone = {phone: 'phone'};
                controller.phoneForm.$invalid = false;
                controller.phone.releaseDate = new Date();
                spyOn(controller, '_endRequest');
                controller.phoneForm.$setPristine = jasmine.createSpy('setPristine');
            });

            it('should set form pristine if submit is resolved', () => {
                deferred.resolve();
                controller.submitForm(phone.phone);
                expect(controller.isRequest).toBe(true);
                expect(controller.submit).toHaveBeenCalledWith(phone);
                $rootScope.$digest();
                expect(controller._endRequest).toHaveBeenCalled();
                expect(controller.phoneForm.$setPristine).toHaveBeenCalled();
            });

            it('should not set form pristine if submit is rejected', () => {
                deferred.reject();
                controller.submitForm(phone.phone);
                expect(controller.isRequest).toBe(true);
                expect(controller.submit).toHaveBeenCalledWith(phone);
                $rootScope.$digest();
                expect(controller._endRequest).toHaveBeenCalled();
                expect(controller.phoneForm.$setPristine).not.toHaveBeenCalled();
            });
        });
    });

    describe('_endRequest function', () => {
        it('should end request as expected', () => {
            controller._endRequest();
            expect(controller.isRequest).toBe(false);
        });
    });
});
