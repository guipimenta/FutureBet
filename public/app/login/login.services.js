(function() {
    'use strict';

    angular
        .module(APP_NAME)
        .factory('Auth', Auth);

    Auth.$inject = ['$location', '$rootScope', 'Login', '$cookieStore'];

    function Auth($location, $rootScope, Login, $cookieStore) {
        // $rootScope.currentUser = $cookieStore.get('user') || null;
        // $cookieStore.remove('user');

        return {
          login: function(provider, user, callback) {
            var cb = callback || angular.noop;
            Login.save({
              provider: provider,
              email: user.email,
              password: user.password,
              rememberMe: user.rememberMe
            }, function(user) {
              $rootScope.currentUser = user;
              return cb();
            }, function(err) {
              return cb(err.data);
            });
          },

          logout: function(callback) {
            var cb = callback || angular.noop;
            Login.delete(function(res) {
                $rootScope.currentUser = null;
                return cb();
              },
              function(err) {
                return cb(err.data);
              });
          },

          currentUser: function() {
            Login.get(function(user) {
              $rootScope.currentUser = user;
            });
          }
        };
      }
})();