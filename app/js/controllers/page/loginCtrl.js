
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('loginController', loginController);

function loginController($rootScope,$scope,$http,apiPath,$state,apiResponse,vcRecaptchaService) {
  'use strict';
  var vm = this;
 
	$scope.disableValue = false;
	
	$scope.loginData = [];
	$scope.notMatch = false; // True when Email or password will Be Wrong.
		$scope.errorCaptcha = false;
	
	vm.localSiteKey = "6Ld6HSYTAAAAADSDPt5td0Te37OIgB2R10JvAgQg";
	vm.siliconSiteKey = "6LchHRoUAAAAAIZHW5kSReJ6ZLRJ1gmT4D36Kdhv";
	vm.swaminarayanSiteKey = "6LetFRoUAAAAAESKewnFkYr88sVgYCSPxugTgo7C";
	
	$scope.createCallback = function(widgetId){
      $scope.widgetId = widgetId;
    };
	$scope.rightCaptcha = false;
	
	$scope.checkCaptcha = function(response){
		//console.log(response);
		//$scope.successCaptcha = response;
		if(response === ""){ //if string is empty
			//alert("Please resolve the captcha and submit!");
			
			$scope.rightCaptcha = false;
			//console.log('fail');
			
        }else {
			
			$scope.rightCaptcha = true;
			$scope.errorCaptcha = false;
			//console.log('suceess');
		}
	}
	
	$scope.login = function(){
		
		//console.log(vcRecaptchaService.getResponse($scope.widgetId));
		//return false;
			
			if($scope.rightCaptcha){
				
				/**Login Code **/
					$scope.disableValue = true;
		
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
						
						//console.log(response);
						//$rootScope.authenticate.authToken = response.authenticationToken;
						
						//console.log(response.authenticationToken);
						
						
						
						//if($rootScope.$storage.authToken){
						if(angular.isObject(response)){
							
							//$rootScope.$storage.authToken = response.authenticationToken;
							$rootScope.$storage.authToken = response.token;
							$rootScope.$storage.authUser = response.user;
							//$rootScope.loggedUser = $rootScope.$storage.authUser;
							//console.log($rootScope.loggedUser);
							// $state.go("app.Company");
							$state.go("app.dashboard");
							
						}
						else{
							
							$scope.disableValue = false;
							$scope.notMatch = true;
						}
					
					});
			/** End **/
			}
			else{
				
				$scope.errorCaptcha = true;
			}
			
               
        }
	
	
	$scope.changeIt = function(){
		
		$scope.notMatch = false;
	}


}
loginController.$inject = ["$rootScope","$scope","$http","apiPath","$state","apiResponse","vcRecaptchaService"];