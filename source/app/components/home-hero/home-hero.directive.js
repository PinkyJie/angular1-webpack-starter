import homeHeroHtml from './home-hero.jade';

function HomeHeroDirective () {
    return {
        restrict: 'AE',
        scope: {
            getStartedLink: '@'
        },
        template: homeHeroHtml
    };
}

HomeHeroDirective.$inject = [];

export default HomeHeroDirective;
