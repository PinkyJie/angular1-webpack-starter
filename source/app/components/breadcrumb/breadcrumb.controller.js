class BreadcrumbController {
    constructor ($state, $rootScope) {
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
            if (stateConfig.abstract) {
                return;
            }
            const breadcrumb = {
                link: name,
                text: stateConfig.breadcrumb
            };
            this.breadcrumbs.push(breadcrumb);
        });
        const length = this.breadcrumbs.length;
        if (params && length > 0) {
            const lastBreadcrumb = this.breadcrumbs[length - 1];
            lastBreadcrumb.link = `${lastBreadcrumb.link}(${JSON.stringify(params)})`;
        }
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

BreadcrumbController.$inject = ['$state', '$rootScope'];

export default BreadcrumbController;
