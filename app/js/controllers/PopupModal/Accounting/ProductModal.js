
/**=========================================================
 * Module: AccProductModalController.js
 * Controller for input components
 =========================================================*/

App.controller('AccProductModalController', AccProductModalController);

function AccProductModalController($scope, $modalInstance,$rootScope,apiCall,apiPath,productIndex,companyId,validationMessage,apiResponse) {
  'use strict';
  
  $scope.stockModel=[];
			
	var vm = this;
	$scope.addModelProduct = [];
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	$scope.defaultCompany = companyId;
	$scope.productIndex = productIndex;
	
	 //Company Dropdown data
	$scope.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		$scope.companyDrop = responseCompanyDrop;
		$scope.addModelProduct.company = $scope.defaultCompany;
		$scope.disableCompany = true;
		
		$scope.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+$scope.defaultCompany.companyId;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			
			$scope.branchDrop = response4;
		
		});
	
	});
	
	$scope.changeCompany = function(state)
	{
		$scope.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+state;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			$scope.branchDrop = response4;
				
		});
	}
	
	//Category Dropdown data
	$scope.categoryDrop = [];
	
	apiCall.getCall(apiPath.getAllCategory).then(function(responseDrop){
		
		$scope.categoryDrop = responseDrop;
	
	});
	
	//Group Dropdown data
	$scope.groupDrop = [];
	
	apiCall.getCall(apiPath.getAllGroup).then(function(responseDrop){
		
		$scope.groupDrop = responseDrop;
	
	});
	
	$scope.measureUnitDrop = [
    'kilo',
    'litre'
  ];
 
	$scope.displayParseFloat=function(val) {
		
		return isNaN(parseFloat(val)) ? 0: parseFloat(val);
	}
	
	$scope.clickSave = function(){
		
		var formdata = new FormData();
		
		var filterArray = {};
		
		formdata.append('companyId',$scope.addModelProduct.company.companyId);
		formdata.append('branchId',$scope.addModelProduct.branch.branchId);
		formdata.append('productName',$scope.addModelProduct.productName);
		formdata.append('productDescription',$scope.addModelProduct.productDescription);
		formdata.append('productCategoryId',$scope.addModelProduct.category.productCategoryId);
		formdata.append('productGroupId',$scope.addModelProduct.group.productGroupId);
		formdata.append('measurementUnit',$scope.addModelProduct.measureUnit);
		formdata.append('purchasePrice',$scope.addModelProduct.purchasePrice);
		
		if($scope.addModelProduct.wholesaleMarginFlat){
			formdata.append('wholesaleMarginFlat',$scope.addModelProduct.wholesaleMarginFlat);
		}
	
		// formdata.append('wholesaleMarginFlat',$scope.addModelProduct.wholesaleMarginFlat);
		if($scope.addModelProduct.wholesaleMargin){
			formdata.append('wholesaleMargin',$scope.addModelProduct.wholesaleMargin);
		}
		if($scope.addModelProduct.semiWholesaleMargin){
			formdata.append('semiWholesaleMargin',$scope.addModelProduct.semiWholesaleMargin);
		}
		
		if($scope.addModelProduct.vat){
			formdata.append('vat',$scope.addModelProduct.vat);
		}
		if($scope.addModelProduct.additionalTax){
			formdata.append('additionalTax',$scope.addModelProduct.additionalTax);
		}
		if($scope.addModelProduct.marginFlat){
			formdata.append('marginFlat',$scope.addModelProduct.marginFlat);
		}
		if($scope.addModelProduct.margin){
			formdata.append('margin',$scope.addModelProduct.margin);
		}
		if($scope.addModelProduct.mrp){
			formdata.append('mrp',$scope.addModelProduct.mrp);
		}
		// formdata.append('vat',$scope.addModelProduct.vat);
		// formdata.append('additionalTax',$scope.addModelProduct.additionalTax);
		// formdata.append('marginFlat',$scope.addModelProduct.marginFlat);
		// formdata.append('margin',$scope.addModelProduct.margin);
		// formdata.append('mrp',$scope.addModelProduct.mrp);
		
		//formdata.append('branchId',1);
		formdata.append('isDisplay','yes');
		apiCall.postCall(apiPath.getAllProduct,formdata).then(function(response5){
		
			console.log(response5);
			
			if(apiResponse.ok == response5)
			{
				
			
			filterArray.index = $scope.productIndex;
			filterArray.companyId = $scope.addModelProduct.company.companyId;
			filterArray.productName = $scope.addModelProduct.productName;
			
			$modalInstance.close(filterArray);
			}
			else{
				
				alert(response5);
			}
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
		});
		
		
	}
	
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
	
		$scope.addModelProduct = [];
		// if($scope.stockModel)
		 // {
			// $rootScope.ArraystockModel=[];
			// $rootScope.ArraystockModel.state=$scope.stockModel.state;
			// $rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			// $rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 // }
		//$modalInstance.dismiss();
    };
	
	$scope.closeButton = function () {

		$modalInstance.dismiss();
    };
  
}
AccProductModalController.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath","productIndex","companyId","validationMessage","apiResponse"];