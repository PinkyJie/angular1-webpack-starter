import bannerHtml from './banner.jade';

function BannerDirective () {
    return {
        restrict: 'AE',
        scope: {
            text: '='
        },
        template: bannerHtml
    };
}

BannerDirective.$inject = [];

export default BannerDirective;
