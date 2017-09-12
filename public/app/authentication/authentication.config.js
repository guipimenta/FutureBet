(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .run(checkAuthentication);

    function checkAuthentication($rootScope, $location, Auth) {
        //watching the value of the currentUser variable.
        $rootScope.$watch('currentUser', function(currentUser) {
          // if no currentUser and on a page that requires authorization then try to update it
          // will trigger 401s if user does not have a valid session
          if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
            Auth.currentUser();
          }
        });

        // On catching 401 errors, redirect to the login page.
        $rootScope.$on('event:auth-loginRequired', function() {
          $location.path('/login');
          return false;
        });
    }
})();