(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .factory('Login', Login);
    
    function Login ($resource) {
        return $resource('/login/');
    }
})();