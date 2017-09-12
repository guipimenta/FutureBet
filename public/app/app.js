var APP_NAME = 'FutureBet';

(function() {
	'use strict';
	angular
		.module(APP_NAME, [
			'ngRoute',
			'ngResource',
            'ngCookies',
            'http-auth-interceptor'
		]);
})();