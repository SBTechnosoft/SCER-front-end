
App.controller('clientFormModalController', clientFormModalController);

function clientFormModalController($rootScope,$scope,$modalInstance,apiCall,apiPath,clientEditData,validationMessage,stateCityFactory,apiResponse,clientFactory) {
  'use strict';
  
  var vm = this;
  
	var clientEditData = clientEditData;
	var changeFlag = 0;
	
	var formdata = new FormData();
	$scope.clientForm = [];	
	 
	/* VALIDATION */
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	/* VALIDATION END */
	
	if(angular.isObject(clientEditData)){
		
		$scope.clientForm.clientContact = clientEditData.contactNo == null || clientEditData.contactNo == '' || clientEditData.contactNo == 'NULL' ? '': clientEditData.contactNo;
		$scope.clientForm.getSetClientId = clientEditData.clientId;  // Client ID
		$scope.clientForm.clientName = clientEditData.clientName;
		$scope.clientForm.emailId = clientEditData.emailId;
		$scope.clientForm.fisrtAddress = clientEditData.address1;
		
		clientFactory.getProfession().then(function(response){
			vm.professionDrop = response;
			$scope.clientForm.professionDropDown = clientEditData.profession;
		});
		
		/** State/City **/
		stateCityFactory.getState().then(function(response){
			vm.statesDrop = response;
			$scope.clientForm.stateDropDown = clientEditData.state;
			
			vm.cityDrop = stateCityFactory.getDefaultStateCities(clientEditData.state.stateAbb);
			$scope.clientForm.cityDrop = clientEditData.city;
		});
		/** End **/
	}
		
	$scope.getInitStateCity = function(){
		
		stateCityFactory.getState().then(function(response){
			$scope.statesDrop = response;
			$scope.clientForm.stateDropDown = stateCityFactory.getDefaultState($rootScope.defaultState);
			formdata.delete('stateAbb');
			formdata.set('stateAbb',$rootScope.defaultState);
			vm.cityDrop = stateCityFactory.getDefaultStateCities($rootScope.defaultState);
			$scope.clientForm.cityDrop = stateCityFactory.getDefaultCity($rootScope.defaultCity);
			formdata.delete('cityId');
			formdata.set('cityId',$rootScope.defaultCity);
		});
	}
	
	$scope.ChangeState = function(Fname,state)
	 {
		//Get City
		vm.cityDrop = stateCityFactory.getDefaultStateCities(state);
			if(formdata.has(Fname))
			{
				formdata.delete(Fname);
			}
			formdata.set(Fname,state);
	}
	
	//Changed Data When Update
	$scope.changeInClientData = function(Fname,value){
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.set(Fname,value);
		changeFlag = 1;
	}
	
    $scope.clickSave = function () {
	
		vm.buttonHidden = true;
		
		if(changeFlag == 0){
			
			vm.errorMsg = 'Plese Change Some Data Then Click Update';
			return false;
		}
		var clientId = null;
		
		if($scope.clientForm.getSetClientId){
			
			var clientId = $scope.clientForm.getSetClientId;
		}
		
		clientFactory.insertAndSetNewClient(formdata,clientId,false).then(function(response){
		
			//console.log(response5);
			if($scope.clientForm.getSetClientId){
				if(angular.isObject(response)){
					
					$modalInstance.close(response);
					
					$scope.clientForm = [];
				}
				else{
					vm.errorMsg = response;
				}
			}
			vm.buttonHidden = false;
		
		});
		
    };

    $scope.cancel = function () {
		$modalInstance.dismiss();
    };
	
  
}
clientFormModalController.$inject = ["$rootScope","$scope", "$modalInstance","apiCall","apiPath","clientEditData","validationMessage","stateCityFactory","apiResponse","clientFactory"];