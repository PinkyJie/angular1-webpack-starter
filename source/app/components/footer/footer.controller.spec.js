import FooterController from './footer.controller';

describe('Footer Controller', () => {
    let controller;
    beforeEach(() => {
        controller = new FooterController();
    });

    it('should have correct year', () => {
        expect(controller.year).toEqual(2016);
    });
});
