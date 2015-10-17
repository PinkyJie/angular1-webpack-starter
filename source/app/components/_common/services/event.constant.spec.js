import EventConstant from './event.constant';

// for service, we can directly unit test the class without Angular
describe('Event Constant', () => {
    it('should get correct event string with a known event', () => {
        expect(EventConstant.AUTH_LOGIN).toBe('auth_login_event');
    });

    it('should get undefined with unknown event', () => {
        expect(EventConstant.aaa).not.toBeDefined();
    });
});
