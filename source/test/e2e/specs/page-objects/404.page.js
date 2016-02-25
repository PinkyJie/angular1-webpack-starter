// 404 page object
class NotFoundPage extends browser._BasePageObject {
    constructor () {
        super('404');
    }

    _getAllElements () {
        const $page = $('.not-found-view');
        return {
            text: $page.$('h2')
        };
    }
}

export default NotFoundPage;
