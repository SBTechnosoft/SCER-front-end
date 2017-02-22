
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('loginController', loginController);

function loginController($rootScope,$scope,$http,apiPath,$state,apiResponse) {
  'use strict';
  var vm = this;
 
	$scope.loginData = [];
	$scope.notMatch = false; // True when Email or password will Be Wrong.
	
	$scope.login = function(){
		 var formdata = new FormData();
		formdata.append('emailId',$scope.loginData.emailId);
		formdata.append('password',$scope.loginData.password);
		
		$http({
			url: apiPath.loginAuth,
			method: 'post',
			processData: false,
		   headers: {'Content-Type': undefined},
			data:formdata
		}).success(function(response, status, headers, config) {
			
			console.log(response);
			//$rootScope.authenticate.authToken = response.authenticationToken;
			
			//console.log(response.authenticationToken);
			
			
			//if($rootScope.$storage.authToken){
			if(angular.isObject(response)){
				
				//$rootScope.$storage.authToken = response.authenticationToken;
				$rootScope.$storage.authToken = response.token;
				$rootScope.$storage.authUser = response.user;
				//$rootScope.loggedUser = $rootScope.$storage.authUser;
				console.log($rootScope.loggedUser);
				$state.go("app.Company");
			}
			else{
				
				$scope.notMatch = true;
			}
		
		});
		
		
	}
	
  


}
loginController.$inject = ["$rootScope","$scope","$http","apiPath","$state","apiResponse"];