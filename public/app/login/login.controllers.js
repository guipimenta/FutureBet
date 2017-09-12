(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', '$location'];
    function LoginController(Auth, $location) {
        var vm = this;

        vm.error = {};
        vm.user  = {};

        vm.login = login;

        function login() {
            Auth.login('password', {
                'username': vm.user.username,
                'password': vm.user.password
            }, function(err) {
                vm.errors = {};
                if(!err) {
                    $location.path('/');
                } else {
                    // figure something out about error
                    console.log(err);
                }
            });
        }
    }
})();