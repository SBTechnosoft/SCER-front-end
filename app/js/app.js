/*!
 * 
 * Singular - Bootstrap Admin Theme + AngularJS
 * 
 * Author: @geedmo
 * Website: http://geedmo.com
 * License: http://themeforest.net/licenses/standard?license=regular
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }



var App = angular.module('singular', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ui.utils'])
    .run(["$rootScope", "$state", "$stateParams", '$localStorage','$templateCache', function ($rootScope, $state, $stateParams, $localStorage,$templateCache) {
		
		// $templateCache.removeAll();
		 //location.reload(true);
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $localStorage;

    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: 'CRM',
      description: 'Customer Relationship Management',
      year: ((new Date()).getFullYear()),
      viewAnimation: 'ng-fadeInLeft2',
      layout: {
        isFixed: true,
        isBoxed: false,
        isRTL: false
      },
      sidebar: {
        isCollapsed: false,
        slide: false
      },
      themeId: 7,
      theme: {
        sidebar: 'bg-white br',
        brand:   'bg-primary',
        topbar:  'bg-primary'
      }
    };
    
    // User information
    $rootScope.user = {
      name:     'Jimmie Stevens-7016944320',
      job:      'Developer',
      picture:  'app/img/user/08.jpg'
    };
	
	
	
	

  }
]);


