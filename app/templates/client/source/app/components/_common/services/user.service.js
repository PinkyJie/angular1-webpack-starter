const [isLoggedIn, userInfo] = [Symbol(), Symbol()];
class UserSerivce {
    constructor ($http, $q, $rootScope, Event, AjaxError) {
        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.Event = Event;
        this.AjaxError = AjaxError;
        // private variable
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }

    isLoggedIn () {
        return this[isLoggedIn];
    }

    checkLoggedInStatus () {
        return this.$http.get('api/user/loginstatus')
            .then(_success)
            .catch(_error);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                this._setUser(data.result.user);
                this.$rootScope.$broadcast(Event.AUTH_SESSION_VALID, data.result.user);
                return data.result.user;
            }
            return this.$q.reject(data.message);
        }

        function _error (reason) {
            this._clearUser();
            return this.AjaxError.catcher(reason);
        }
    }

    login (email, password) {
        const req = {
            email,
            password
        };
        return this.$http.post('api/user/login', req)
            .then(_success)
            .catch(_error);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                this._setUser(data.result.user);
                this.$rootScope.$broadcast(Event.AUTH_LOGIN, data.result.user);
                return data.result.user;
            }
            return this.$q.reject(data.message);
        }

        function _error (reason) {
            this._clearUser();
            return this.AjaxError.catcher(reason);
        }
    }

    logout () {
        return this.$http.post('api/user/logout')
            .then(_success)
            .catch(_error);

        function _success (response) {
            const data = response.data;
            this._clearUser();
            if (response.status === 200 && data.code === 0) {
                this.$rootScope.$broadcast(this.Event.AUTH_LOGOUT);
            } else {
                return this.$q.reject(data.message);
            }
        }

        function _error (reason) {
            this._clearUser();
            return this.AjaxError.catcher(reason);
        }
    }

    getUserInfo () {
        return this[userInfo];
    }

    getProductSummary () {
        return this.$http.get('api/user/products')
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.summary;
            }
            return this.$q.reject(data.message);
        }
    }

    _setUser (userData) {
        this[isLoggedIn] = true;
        this[userInfo] = userData;
    }

    _clearUser () {
        this[isLoggedIn] = false;
        this[userInfo] = null;
    }
}

UserSerivce.$inject = ['$http', '$q', '$rootScope', 'Event', 'AjaxErrorHandler'];

export default UserSerivce;
