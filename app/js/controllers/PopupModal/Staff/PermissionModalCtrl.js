
App.controller('permissionModalController', permissionModalController);

function permissionModalController($rootScope,$scope,$modalInstance,apiCall,apiPath,apiResponse,userData,toaster) {
  'use strict';
  
  var vm = this;
  
	var changeFlag = 0;
	
	var userData = userData;
	console.log(userData);
	$scope.permissionArray = [{"configuration":{},"accounting":{},"inventory":{},"crm":{},"analyzer":{},"pricelist":{},"quickMenu":{}}];
	if(userData.permissionArray != null && userData.permissionArray.length > 0){
		$scope.permissionArray[0].configuration = userData.permissionArray[0].configuration;
		$scope.permissionArray[0].accounting = userData.permissionArray[0].accounting;
		$scope.permissionArray[0].inventory = userData.permissionArray[0].inventory;
		$scope.permissionArray[0].crm = userData.permissionArray[0].crm;
		$scope.permissionArray[0].analyzer = userData.permissionArray[0].analyzer;
		$scope.permissionArray[0].pricelist = userData.permissionArray[0].pricelist;
		$scope.permissionArray[0].quickMenu = userData.permissionArray[0].quickMenu;
	}

	// $scope.permissionArray = $rootScope.$storage.permissionArray;

	$scope.clientForm = [];	
	 
	 var dateFormats = $rootScope.dateFormats; //Date Format


	/* Insert or Update Button*/
		$scope.clickSave = function(){
			var formdata = undefined;
			 	formdata = new FormData();

			angular.forEach($scope.permissionArray[0],function(value,key){
				angular.forEach(value,function(subValue,subKey){
					if(subValue == false){
						delete $scope.permissionArray[0][key][subKey];
					}
				});
			});

			formdata.set('permissionArray',angular.toJson($scope.permissionArray));

			apiCall.postCall(apiPath.getOneStaff+userData.userId,formdata).then(function(response){
				if(response==apiResponse.ok)
				{
					$modalInstance.close();
					
					
				}
				else
				{
					$modalInstance.dismiss();
					// toaster.clear();
					// toaster.pop('warning', response);
				}
				console.log(response);
				// }
			});
		}
	/* End */
	
    $scope.cancel = function () {
		$modalInstance.dismiss();
    };
	

  // Datepicker
  // ----------------------------------- 
	this.minStart = new Date('1990-01-01');

  this.today = function() {
    this.birthDate = new Date();
    this.anniversaryDate = new Date();
  };


  this.clear = function () {
    //this.birthDate = null;
  };

  // Disable weekend selection
  this.disabled = function(date, mode) {
    return false; //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  this.toggleMin = function() {
    this.minDate = this.minDate ? null : new Date();
  };
  this.toggleMin();

  this.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.opened = true;
  };
	
	this.openStartBirth = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStartBirth = true;
  };

  this.openStartAnivarSary = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStartAnivarSary = true;
  };
  
  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    initDate : new Date('1990-01-01')
  };

  // this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = dateFormats;

  
}
permissionModalController.$inject = ["$rootScope","$scope", "$modalInstance","apiCall","apiPath","apiResponse","userData","toaster"];