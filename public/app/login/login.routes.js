(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .config(LoginRoutes);

    function LoginRoutes($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'partials/login/login.html',
                controller: 'LoginController',
                controllerAs: 'Ctrl'
            });
        $locationProvider
          .html5Mode(true);
    }
})();