
/**=========================================================
 * Module: AccLedgerModalController.js
 * Controller for input components
 =========================================================*/

App.controller('AccLedgerModalController', AccLedgerModalController);

function AccLedgerModalController($scope, $modalInstance,$rootScope,apiCall,apiPath,ledgerIndex,companyId,validationMessage) {
  'use strict';
  
	$scope.ledgerIndex = ledgerIndex;

	$scope.stockModel=[];
	var formdata = new FormData();
	$scope.ledgerForm = [];	
	  
	 $scope.defaultCompany = companyId;
	 
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	 
	//Get Company
	$scope.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response3){
		
		$scope.companyDrop = response3;
		$scope.ledgerForm.companyDropDown = $scope.defaultCompany;
		$scope.disableCompany = true;
	
	});
	
	//Get State
	$scope.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		$scope.statesDrop = response3;
	
	});
	
	$scope.ChangeState = function(Fname,state)
	 {
		
		var getonecity = apiPath.getAllCity+state;
		
		//Get City
		apiCall.getCall(getonecity).then(function(response4){
			$scope.cityDrop = response4;
				
		});
		console.log(Fname+'...'+state);
			if(formdata.has(Fname))
			{
				formdata.delete(Fname);
			}
			
			formdata.append(Fname,state);
	}
	
	 $scope.underWhat=[];
	apiCall.getCall(apiPath.getAllLedgerGroup).then(function(response3){
		
		$scope.underWhat = response3;
	
	});
	
	$scope.setPcode = function(Fname,value) {
  		//console.log(value.ledgerGroupId);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value.ledgerGroupId);
  	}
  
	  $scope.invAffectDrop = [
		'yes',
		'no'
	  ]
	  
	  $scope.amountTypeDrop = [
		'debit',
		'credit'
	  ];
	  
	  $scope.ledgerForm.amountType = 'debit';
	  $scope.ledgerForm.openingBal = 0;
	  
	  formdata.append('amountType',$scope.ledgerForm.amountType);
		formdata.append('amount',$scope.ledgerForm.openingBal);
		
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		//console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.clickSave = function () {
		
		var filterArray = {};
		
		formdata.append('balanceFlag','opening');
		formdata.append('companyId',$scope.ledgerForm.companyDropDown.companyId);
		apiCall.postCall(apiPath.getAllLedger,formdata).then(function(response5){
		
			console.log(response5);
			
			if(angular.isArray(response5)){
				
				//Delete formdata  keys
				for (var key of formdata.keys()) {
				   formdata.delete(key); 
				}
				
				filterArray.index = $scope.ledgerIndex;
				filterArray.companyId = $scope.ledgerForm.companyDropDown.companyId;
				filterArray.ledgerName = $scope.ledgerForm.ledgerName;
				
				$modalInstance.close(filterArray);
				
				$scope.ledgerForm = [];
			}
			else{
				
				formdata.delete('balanceFlag');
				formdata.delete('companyId');
		
				alert(response5);
			}
		});
		
    };

    $scope.cancel = function () {
	
		if($scope.stockModel)
		 {
			$rootScope.ArraystockModel=[];
			$rootScope.ArraystockModel.state=$scope.stockModel.state;
			$rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			$rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 }
		$modalInstance.dismiss('qwerty');
    };
	
  
}
AccLedgerModalController.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath","ledgerIndex","companyId","validationMessage"];