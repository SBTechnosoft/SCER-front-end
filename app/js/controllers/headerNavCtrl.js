
/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

App.controller('HeaderNavController', ['$scope','$rootScope','$http','$templateCache','$state','apiPath','apiCall','apiResponse','$modal', function($scope,$rootScope,$http,$templateCache,$state,apiPath,apiCall,apiResponse,$modal) {
  'use strict';
  
  $scope.userName = $rootScope.$storage.authUser.userName;
  
  $scope.headerMenuCollapsed = false;
	
	$scope.myClass = $rootScope.app.theme.sidebar;
	
	  $scope.toggleHeaderMenu = function() {
		$scope.headerMenuCollapsed = !$scope.headerMenuCollapsed;
	  };
	  
	  $scope.accountSelected;
	  $scope.invetorySelected;
	  $scope.stockSummarySelected;
	  $scope.priceListSelected;
	  $scope.analyzerSelected;
	  $scope.crmSelected;
 
	$scope.getClass = function(){
	
		return 'active';
	 }
  
  $scope.getsidebar = function(){
	  
	  // $templateCache.removeAll();
	   // $templateCache.remove('/front-end/#/app/form-inputs');
	    //$templateCache.removeAll();
		 //location.reload();
		$scope.accountSelected = true;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = false;
	   $scope.analyzerSelected = false;
	   $scope.crmSelected = false;
	   
	var menuJson = 'server/sidebar/Accounting.json',
      menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
	
      $http.get(menuURL)
        .success(function(items) {
			//$rootScope.menuItems=[];
           $rootScope.menuItems = items;
		   //alert('done');
		  
		  
        })
        .error(function(data, status, headers, config) {

          alert('Failure loading menu');

        });
		
		 //$scope.toggleHeaderMenu();
		$scope.headerMenuCollapsed = false;
  };
  
  $scope.configuration = function(){
	  // $templateCache.removeAll();
	   // $templateCache.remove('/front-end/#/app/form-inputs');
	    //$templateCache.removeAll();
		 //location.reload();
		$scope.accountSelected = false;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = false;
	   $scope.analyzerSelected = false;
	   $scope.crmSelected = false;
	   
	var menuJson = 'server/sidebar/sidebar-items.json',
      menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
	
      $http.get(menuURL)
        .success(function(items) {
			//$rootScope.menuItems=[];
           $rootScope.menuItems = items;
		   //alert('done');
		   console.log(items);
		   
		  
        })
        .error(function(data, status, headers, config) {

          alert('Failure loading menu');

        });
		
	 //$scope.toggleHeaderMenu();
   $scope.headerMenuCollapsed = false;
		
  };
  
	  // GET Inventory Sidebar
	  $scope.getInventory = function(){
		 
		 $scope.accountSelected = false;
	  $scope.invetorySelected = true;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = false;
	   $scope.analyzerSelected = false;
	   $scope.crmSelected = false;
	  
		var menuJson = 'server/sidebar/Inventory.json',
		  menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
		
		  $http.get(menuURL)
			.success(function(items) {
				//$rootScope.menuItems=[];
			   $rootScope.menuItems = items;
			   
			})
			.error(function(data, status, headers, config) {
			  alert('Failure loading menu');
			});
			
			 //$scope.toggleHeaderMenu();
			  $scope.headerMenuCollapsed = false;
	  };
	  
	  // GET Price List Sidebar
	  $scope.getPriceList = function(){
		 
		 
		 $scope.accountSelected = false;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = true;
	  $scope.analyzerSelected = false;
	  $scope.crmSelected = false;
	  
		var menuJson = 'server/sidebar/PriceList.json',
		  menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
		
		  $http.get(menuURL)
			.success(function(items) {
				//$rootScope.menuItems=[];
			   $rootScope.menuItems = items;
			   
			})
			.error(function(data, status, headers, config) {
			  alert('Failure loading menu');
			});
			
			// $scope.toggleHeaderMenu();
			 $scope.headerMenuCollapsed = false;
	  };
  
	// GET Reports Sidebar
	  $scope.getAnalyzer = function(){
		 
		 $scope.accountSelected = false;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = false;
	  $scope.analyzerSelected = true;
	  $scope.crmSelected = false;
	  
		var menuJson = 'server/sidebar/Analyzer.json',
		  menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
		
		  $http.get(menuURL)
			.success(function(items) {
				//$rootScope.menuItems=[];
			   $rootScope.menuItems = items;
			   
			})
			.error(function(data, status, headers, config) {
			  alert('Failure loading menu');
			});
			
			// $scope.toggleHeaderMenu();
			 $scope.headerMenuCollapsed = false;
	  };
	  
	  
	  // GET Stock Summary
	  $scope.getStockSummary = function(){
		 
		 $scope.accountSelected = false;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = true;
	  $scope.priceListSelected = false;
	  $scope.analyzerSelected = false;
	  $scope.crmSelected = false;
			
			var menuJson = 'server/sidebar/Inventory.json',
		  menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
		
		  $http.get(menuURL)
			.success(function(items) {
				//$rootScope.menuItems=[];
			   $rootScope.menuItems = items;
			   
			})
			.error(function(data, status, headers, config) {
			  alert('Failure loading menu');
			});
			
			// $scope.toggleHeaderMenu();
			 $scope.headerMenuCollapsed = false;
	  };
	  
	  // GET CRM
	  $scope.getCRM = function(){
		 
		 $scope.accountSelected = false;
	  $scope.invetorySelected = false;
	  $scope.stockSummarySelected = false;
	  $scope.priceListSelected = false;
	  $scope.analyzerSelected = false;
	  $scope.crmSelected = true;
			
			var menuJson = 'server/sidebar/CRM.json',
		  menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
		
		  $http.get(menuURL)
			.success(function(items) {
				//$rootScope.menuItems=[];
			   $rootScope.menuItems = items;
			   
			})
			.error(function(data, status, headers, config) {
			  alert('Failure loading menu');
			});
			
			// $scope.toggleHeaderMenu();
			 $scope.headerMenuCollapsed = false;
	  };
	  
	  
	  
	  
	  var Modalopened = false;
	  
	   /**
	  Calculator Model Start
	  **/
	  $scope.openCalculator = function (size) {
		
		$templateCache.remove('http://'+window.location.host+'/front-end/app/views/PopupModal/TopBar/calcuatorModal.html');
		$templateCache.remove('http://'+window.location.host+'/front-end/app/views/PopupModal/TopBar/CalcSS3.js');
		//$templateCache.remove('http://'+window.location.host+'/front-end/app/views/PopupModal/TopBar/calcuatorModal.html');
		
		if (Modalopened) return;
		
		//toaster.pop('wait', 'Please Wait', 'Calculator opening....',600000);
			
			var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/TopBar/calcuatorModal.html?buster='+Math.random(),
			  controller: calculatorController,
			  size: size,
			  cache: false
			});

			Modalopened = true;
			
			modalInstance.opened.then(function() {
				//toaster.clear();
			});

			modalInstance.result.then(function (data) {
			 
				
				
				Modalopened = false;
			
			}, function () {
			  console.log('Cancel');	
			  Modalopened = false;
			});
		
	  };
	  /**
	  Calculator Model End
	  **/
  
	  $scope.logout = function(){
		  
		//alert('in');2e7719b36240c051e694a88cc511d4a6  d29ac73b666a3be3fc463448fdc5d9fc
		
		    
		apiCall.deleteCall(apiPath.deleteToken+$rootScope.$storage.authUser.userId).then(function(deleteres){
			
			if(apiResponse.ok == deleteres){
				
				$rootScope.$storage.$reset();
				$state.go("page.login");
				
			}
			else{
				
				alert('Opps!, Problem Occure');
			}
		 
		});
		
		$state.go("page.login");
		  
	  }
	  
	  

}]);