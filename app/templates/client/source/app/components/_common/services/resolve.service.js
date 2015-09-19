class ResolveService {
    constructor (User, $q) {
        this.User = User;
        this.$q = $q;
    }

    login () {
        const self = this;
        return this.User.checkLoggedInStatus()
            .catch(error);

        function error () {
            return self.$q.reject('requireLogin');
        }
    }
}

ResolveService.$inject = ['UserAPI', '$q'];

export default ResolveService;
