class PhoneSerivce {
    constructor ($http, $q, AjaxError) {
        this.$http = $http;
        this.$q = $q;
        this.AjaxError = AjaxError;
    }
    getPhones () {
        const self = this;
        return this.$http.get('api/phones')
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.phones;
            }
            return self.$q.reject(data.message);
        }
    }
    getPhoneDetail (id) {
        const self = this;
        return this.$http.get(`api/phones/${id}`)
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.phone;
            }
            return self.$q.reject(data.message);
        }
    }
    addNewPhone (phone) {
        const self = this;
        const req = {
            phone
        };
        return this.$http.post('api/phones', req)
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.phone;
            }
            return self.$q.reject(data.message);
        }
    }
    updatePhone (id, phone) {
        const req = {
            phone
        };
        return this.$http.put(`api/phones/${id}`, req)
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.phone;
            }
            return self.$q.reject(data.message);
        }
    }
    removePhone (id) {
        const self = this;
        return this.$http.delete(`api/phones/${id}`)
            .then(_success)
            .catch(this.AjaxError.catcher);

        function _success (response) {
            const data = response.data;
            if (response.status === 200 && data.code === 0) {
                return data.result.phone;
            }
            return self.$q.reject(data.message);
        }
    }
}

PhoneSerivce.$inject = ['$http', '$q', 'AjaxErrorHandler'];

export default PhoneSerivce;
