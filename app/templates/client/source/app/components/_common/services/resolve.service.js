class ResolveService {
    login (UserAPI, $q) {
        return UserAPI.checkLoggedInStatus()
            .catch(_error);

        function _error () {
            return $q.reject('requireLogin');
        }
    }
}

ResolveService.prototype.login.$inject = ['UserAPI', '$q'];

export default ResolveService;
