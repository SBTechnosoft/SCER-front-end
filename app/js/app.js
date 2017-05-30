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



var App = angular.module('singular', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ui.utils','ngMessages','ngTableToCsv',"ngSanitize", "ngCsv","vcRecaptcha","uiCropper"])
    .run(["$rootScope", "$state", "$stateParams", '$localStorage','$templateCache','$http','hostUrl','googleSiteKey','hostFrontUrl', function ($rootScope, $state, $stateParams, $localStorage,$templateCache,$http,hostUrl,googleSiteKey,hostFrontUrl) {
		
		
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
      tableAnimation: 'ng-fadeInDown',
      layout: {
        isFixed: true,
        isBoxed: false,
        isRTL: false
      },
      sidebar: {
        isCollapsed: false,
        slide: false
      },
	   topbar: {
        isCollapsed: false
      },
      themeId: 7,
      theme: {
        sidebar: 'bg-white br',
        brand:   'bg-primary',
        topbar:  'my-Topbar-Color'
      }
    };
    // User information
    $rootScope.user = {
      name:     'Jimmie Stevens-7016944320',
      job:      'Developer',
      picture:  'app/img/user/08.jpg'
    };
	
	$rootScope.googleSiteKey = googleSiteKey;
	
	$rootScope.erpPath = hostUrl.siliconbrain;
	// $rootScope.erpPath = hostUrl.swaminarayan;
	// $rootScope.erpPath = hostUrl.v2erpKey;

	var hostFrontUrls = hostFrontUrl;

	$rootScope.templateCompanyLogo = "<img src='"+hostFrontUrls.siliconbrain+"app/img/aksLogo.png' height='100%' width='100%' />";
	//$rootScope.templateCompanyLogo = "<img src='"+hostFrontUrls.swaminarayan+"app/img/aksLogo.png' height='100%' width='100%' />";
	//$rootScope.templateCompanyLogo = "<img src='"+hostFrontUrls.v2erpKey+"app/img/aksLogo.png' height='100%' width='100%' />";
	
	
	/** Silicon **/
	$rootScope.defaultState = "IN-GJ";
	$rootScope.defaultCity = 31;
	
	
	/** Swaminarayan & v2erp **/
	//$rootScope.defaultState = "IN-GJ";
	//$rootScope.defaultCity = 856;
	
	/** date Format **/
		 // $rootScope.dateFormats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		 $rootScope.dateFormats = 'dd-MMM-yyyy';
		 // $rootScope.dateFormats = 'yyyy/MM/dd';
	/** End **/
	
	/** Authentication Token & UserName **/
		
		//$rootScope.loggedUser = [];
		
		
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


