// home page object
class HomePage extends browser._BasePageObject {
    constructor () {
        super('');
    }

    _getAllElements () {
        const $page = $('.home-view');
        return {
            mainTitle: $page.$('.title'),
            subTitle: $page.$('.subtitle'),
            getStartedBtn: $page.$('.btn-get-started')
        };
    }
}

export default HomePage;
