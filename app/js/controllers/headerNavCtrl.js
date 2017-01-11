
/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

App.controller('HeaderNavController', ['$scope','$rootScope','$http','$templateCache','$state', function($scope,$rootScope,$http,$templateCache,$state) {
  'use strict';
  
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
  
	  $scope.logout = function(){
		  
		  //alert('in');
		  $rootScope.$storage.$reset();
		  
		  $state.go("page.login");
	  }

}]);