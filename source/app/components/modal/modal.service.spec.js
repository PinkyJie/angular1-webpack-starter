import ModalService from './modal.service';

describe('Modal Service', () => {
    let service;
    let $timeout;

    beforeEach(() => {
        $timeout = jasmine.createSpy('$timeout');
        service = new ModalService($timeout);
    });

    describe('constructor function', () => {
        it('should init successfully', () => {
            expect(service.$timeout).toBe($timeout);
        });
    });

    describe('open function', () => {
        beforeEach(() => {
            spyOn(service, '_buildHeaderAndContent');
            spyOn(service, '_buildFooter');
            spyOn($.fn, 'openModal');
        });

        it('should call open function of modal', () => {
            function callback () {}
            service.open('title', 'content', {ok: 'ok'}, callback);
            const body = angular.element('body');
            expect(body.find('.modal-view').length).toEqual(1);
            expect(body.find('.modal-view > .modal').length).toEqual(1);
            expect(service._buildHeaderAndContent).toHaveBeenCalledWith('title', 'content');
            expect(service._buildFooter).toHaveBeenCalledWith({ok: 'ok'}, callback);
            expect($timeout).toHaveBeenCalled();
            expect($timeout.calls.argsFor(0)[1]).toEqual(100);
            const callback1 = $timeout.calls.argsFor(0)[0];
            callback1();
            expect($.fn.openModal).toHaveBeenCalled();
        });
    });

    describe('_buildHeaderAndContent function', () => {
        it('should create header with title and content', () => {
            const header = service._buildHeaderAndContent('title', 'content');
            expect(header.attr('class')).toMatch(/modal-content/);
            expect(header.find('h4').text()).toEqual('title');
            expect(header.find('p').text()).toEqual('content');
        });
    });

    describe('_buildFooter function', () => {
        let callback;
        let footer;

        beforeEach(() => {
            callback = jasmine.createSpy('callback');
            spyOn(service, '_close');
        });

        function assertOKButton (hasCallback) {
            expect(footer.attr('class')).toMatch(/modal-footer/);
            const okButton = footer.find('.btn-ok');
            expect(okButton.attr('class')).toMatch(/modal-close/);
            expect(okButton.text()).toEqual('ok');
            okButton.click();
            if (hasCallback) {
                expect(callback).toHaveBeenCalledWith(true);
            } else {
                expect(callback).not.toHaveBeenCalled();
            }
            expect(service._close).toHaveBeenCalled();
        }

        function assertCancelButton (hasCallback) {
            expect(footer.attr('class')).toMatch(/modal-footer/);
            const cancelButton = footer.find('.btn-cancel');
            expect(cancelButton.attr('class')).toMatch(/modal-close/);
            expect(cancelButton.text()).toEqual('cancel');
            cancelButton.click();
            if (hasCallback) {
                expect(callback).toHaveBeenCalledWith(false);
            } else {
                expect(callback).not.toHaveBeenCalled();
            }
            expect(service._close).toHaveBeenCalled();
        }

        it('should work with OK/Cancel button and callback', () => {
            footer = service._buildFooter({
                ok: 'ok', cancel: 'cancel'
            }, callback);
            assertOKButton(true);
            assertCancelButton(true);
        });

        it('should work with OK button and callback', () => {
            footer = service._buildFooter({
                ok: 'ok'
            }, callback);
            assertOKButton(true);
            expect(footer.find('.btn-cancel').length).toEqual(0);
        });

        it('should work with OK/Cancel button without callback', () => {
            footer = service._buildFooter({
                ok: 'ok', cancel: 'cancel'
            });
            assertOKButton(false);
            assertCancelButton(false);
        });

        it('should work with OK button without callback', () => {
            footer = service._buildFooter({
                ok: 'ok'
            });
            assertOKButton(false);
            expect(footer.find('.btn-cancel').length).toEqual(0);
        });
    });

    describe('_close function', () => {
        it('should close modal correctly', () => {
            service._close();
            expect($timeout).toHaveBeenCalled();
            expect($timeout.calls.argsFor(0)[1]).toEqual(100);
            const callback = $timeout.calls.argsFor(0)[0];
            spyOn($.fn, 'remove');
            callback();
            expect($.fn.remove).toHaveBeenCalled();
        });
    });
});
