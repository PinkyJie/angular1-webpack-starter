class ResolveService {
    login (UserAPI, $q) {
        if (UserAPI.isLoggedIn() !== true) {
            return UserAPI.checkLoggedInStatus()
                .catch(_error);
        }

        function _error () {
            return $q.reject('requireLogin');
        }
    }
}

ResolveService.prototype.login.$inject = ['UserAPI', '$q'];

export default ResolveService;
