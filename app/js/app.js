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



var App = angular.module('singular', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ui.utils','ngMessages'])
    .run(["$rootScope", "$state", "$stateParams", '$localStorage','$templateCache','$http','apiPath', function ($rootScope, $state, $stateParams, $localStorage,$templateCache,$http,apiPath) {
		
		
		//$templateCache.removeAll();
		 // $rootScope.$on('$viewContentLoading', function() {
			// $templateCache.reload();
		// });
   
		//$httpProvider.defaults.withCredentials = true;
		 //location.reload(true);
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $localStorage;

		
    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: 'ERP',
      description: 'Siliconbrain Technosoft LLP',
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
	
	/** Authentication Token & UserName **/
		
		$rootScope.authenticate = [];
		
	/** END **/
	
	//Branch Modify
	$rootScope.AddBranchModify = true;
	//Company Modify
	$rootScope.AddCompanyModify = true;
	
	//Accounting View Data 
	$rootScope.accView =[];
	
	var  accdate = new Date();
	var accModifyDate  = accdate.getDate()+'-'+(accdate.getMonth()+1)+'-'+accdate.getFullYear();
	
	$rootScope.accView.fromDate = accModifyDate; // FromDate
	$rootScope.accView.toDate = accModifyDate; // TODate
	
	// $http({
			// url: apiPath.getAllCompany,
			 // method: 'get',
			// processData: false,
			 // headers: {'Content-Type': undefined}
		// }).success(function(data, status, headers, config) {
			
			// for(var i=0;i<data.length;i++){
				
				// if(data[i].isDefault == 'ok')
				// {
					// $rootScope.accView.companyId = data[i].companyId; //Company ID
					
				// }
			// }
	
		// }).error(function(data, status, headers, config) {
			
		// });
		
	//Focus Textbox On Page Load
	// $rootScope.focusFunction = function(data){
		
		// alert(data);
	// }
	
	
  }
]);


