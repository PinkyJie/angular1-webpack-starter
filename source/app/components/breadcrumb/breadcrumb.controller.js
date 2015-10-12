class BreadcrumbController {
    constructor (RouterHelper, $state, $rootScope) {
        this.RouterHelper = RouterHelper;
        this.$state = $state;
        this.$rootScope = $rootScope;

        this._applyNewBreadcrumb(this.$state.current, this.$state.params);
        this.$rootScope.$on('$stateChangeSuccess',
            (event, toState, toParams) => {
                this._applyNewBreadcrumb(toState, toParams);
            });
    }

    _applyNewBreadcrumb (state, params) {
        this.breadcrumbs = [];
        const curName = state.name;
        const parentStateNames = this._getAncestorStates(curName);
        parentStateNames.forEach((name) => {
            const stateConfig = this.$state.get(name);
            const breadcrumb = {
                link: name,
                text: stateConfig.breadcrumb
            };
            if (stateConfig.abstract) {
                return;
            }
            if (params) {
                breadcrumb.link = `${name}(${JSON.stringify(params)})`;
            }
            this.breadcrumbs.push(breadcrumb);
        });
    }

    _getAncestorStates (stateName) {
        const ancestors = [];
        const pieces = stateName.split('.');
        if (pieces.length > 1) {
            for (let i = 1; i < pieces.length; i++) {
                const name = pieces.slice(0, i + 1);
                ancestors.push(name.join('.'));
            }
        }
        return ancestors;
    }
}

BreadcrumbController.$inject = ['RouterHelper', '$state', '$rootScope'];

export default BreadcrumbController;
