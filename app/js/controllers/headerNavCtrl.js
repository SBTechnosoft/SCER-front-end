
/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

App.controller('HeaderNavController', ['$scope','$rootScope','$http','$templateCache','$state','apiPath','apiCall','apiResponse', function($scope,$rootScope,$http,$templateCache,$state,apiPath,apiCall,apiResponse) {
  'use strict';
  
  $scope.userName = $rootScope.$storage.authUser.userName;
  
  $scope.headerMenuCollapsed = false;
	

  $scope.toggleHeaderMenu = function() {
    $scope.headerMenuCollapsed = !$scope.headerMenuCollapsed;
  };
  
  $scope.getsidebar = function(){
	  // $templateCache.removeAll();
	   // $templateCache.remove('/front-end/#/app/form-inputs');
	    //$templateCache.removeAll();
		 //location.reload();
		
	   
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
    
  
		
  };
  
  $scope.configuration = function(){
	  // $templateCache.removeAll();
	   // $templateCache.remove('/front-end/#/app/form-inputs');
	    //$templateCache.removeAll();
		 //location.reload();
		
	   
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
    
  
		
  };
  
	  // GET Inventory Sidebar
	  $scope.getInventory = function(){
		 
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
	  };
	  
	  // GET Price List Sidebar
	  $scope.getPriceList = function(){
		 
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
	  };
  
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