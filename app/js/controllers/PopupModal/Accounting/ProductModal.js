
/**=========================================================
 * Module: AccProductModalController.js
 * Controller for input components
 =========================================================*/

App.controller('AccProductModalController', AccProductModalController);

function AccProductModalController($scope, $modalInstance,$rootScope,apiCall,apiPath,productIndex,companyId,validationMessage,apiResponse,getSetFactory) {
  'use strict';
  
  $scope.stockModel=[];
			
	var vm = this;
	$scope.addModelProduct = [];
	var formdata = new FormData();
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	$scope.measureUnitDrop = [
    'piece',
    'pair'
  ];
  
	$scope.defaultCompany = companyId;
	$scope.productIndex = productIndex;
	
	//Company Dropdown data
	$scope.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		$scope.companyDrop = responseCompanyDrop;
		$scope.disableCompany = true;
	});
	
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
	
	//Edit Product
	if(Object.keys(getSetFactory.get()).length){

		var editProductData = getSetFactory.get();
		getSetFactory.blank();
		
		$scope.addModelProduct.getSetProductId = editProductData.productId;
		
		$scope.addModelProduct.productName = editProductData.productName;
		$scope.addModelProduct.productDescription = editProductData.productDescription;
		$scope.addModelProduct.color = editProductData.color;
		$scope.addModelProduct.size = editProductData.size;
		
		$scope.addModelProduct.company = editProductData.company;
		$scope.disableCompany = true;
		
		var getAllBranch = apiPath.getOneBranch+editProductData.company.companyId;
		//console.log('here...'+getAllBranch);
		apiCall.getCall(getAllBranch).then(function(response4){
			
			$scope.branchDrop = response4;
			$scope.addModelProduct.branch = editProductData.branch;
			
		});
		
		$scope.addModelProduct.category = editProductData.productCategory;
		$scope.addModelProduct.group = editProductData.productGroup;
		
		$scope.addModelProduct.measureUnit = editProductData.measurementUnit;
		
		$scope.addModelProduct.purchasePrice = editProductData.purchasePrice;
		$scope.addModelProduct.wholesaleMarginFlat = editProductData.wholesaleMarginFlat;
		$scope.addModelProduct.wholesaleMargin = editProductData.wholesaleMargin;
		$scope.addModelProduct.semiWholesaleMargin = editProductData.semiWholesaleMargin;
		$scope.addModelProduct.vat = editProductData.vat;
		$scope.addModelProduct.mrp = editProductData.mrp;
		$scope.addModelProduct.additionalTax = editProductData.additionalTax;
		$scope.addModelProduct.marginFlat = editProductData.marginFlat;
		$scope.addModelProduct.margin = editProductData.margin;
		
		if(editProductData.hsn == null){
			$scope.addModelProduct.hsn = '';
		}
		else{
			$scope.addModelProduct.hsn = editProductData.hsn;
		}

		if(editProductData.igst == null){
			$scope.addModelProduct.igst = '';
		}
		else{
			$scope.addModelProduct.igst = editProductData.igst;
		}
		
		$scope.addModelProduct.minimumStockLevel = editProductData.minimumStockLevel;
		
	}
	else{
		
		apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
			$scope.companyDrop = responseCompanyDrop;
			$scope.addModelProduct.company = $scope.defaultCompany;
			formdata.delete('companyId');
			formdata.append('companyId',$scope.addModelProduct.company.companyId);
			
			$scope.disableCompany = true;
			
			$scope.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+$scope.defaultCompany.companyId;
			//Get Branch
			apiCall.getCall(getAllBranch).then(function(response4){
				
				$scope.branchDrop = response4;
				$scope.addModelProduct.branch = response4[0];
				formdata.delete('branchId');
				formdata.append('branchId',$scope.addModelProduct.branch.branchId);
				
			});
	
		});
		
		$scope.addModelProduct.measureUnit = 'piece';
		formdata.append('measurementUnit',$scope.addModelProduct.measureUnit);
	}
	
	$scope.changeCompany = function(state)
	{
		$scope.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+state;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			$scope.branchDrop = response4;
				
		});
	}
	
	
	$scope.displayParseFloat=function(val) {
		
		return isNaN(parseFloat(val)) ? 0: parseFloat(val);
	}
	
	$scope.changeMRP = function(){
		$scope.addModelProduct.mrp = $scope.addModelProduct.purchasePrice;
	}
	
	//Changed Data When Update
	$scope.changeInvProductData = function(Fname,value){
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		if(value != undefined && value != ''){
			formdata.append(Fname,value);
		}
	}
	
	$scope.clickSave = function(){
		
		if($scope.addModelProduct.getSetProductId){
			
			var productPath = apiPath.getAllProduct+'/'+$scope.addModelProduct.getSetProductId;
		}
		else{
			var productPath = apiPath.getAllProduct;
		}
		
		var filterArray = {};
		
		// formdata.append('companyId',$scope.addModelProduct.company.companyId);
		// formdata.append('branchId',$scope.addModelProduct.branch.branchId);
		// formdata.append('productName',$scope.addModelProduct.productName);
		// formdata.append('color',$scope.addModelProduct.color);
		// formdata.append('size',$scope.addModelProduct.size);
		// if($scope.addModelProduct.productDescription){
			
			// formdata.append('productDescription',$scope.addModelProduct.productDescription);
		// }
		
		// formdata.append('productCategoryId',$scope.addModelProduct.category.productCategoryId);
		// formdata.append('productGroupId',$scope.addModelProduct.group.productGroupId);
		// formdata.append('measurementUnit',$scope.addModelProduct.measureUnit);
		// formdata.append('purchasePrice',$scope.addModelProduct.purchasePrice);
		
		// if($scope.addModelProduct.wholesaleMarginFlat){
			// formdata.append('wholesaleMarginFlat',$scope.addModelProduct.wholesaleMarginFlat);
		// }
		
		// if($scope.addModelProduct.wholesaleMargin){
			// formdata.append('wholesaleMargin',$scope.addModelProduct.wholesaleMargin);
		// }
		// if($scope.addModelProduct.semiWholesaleMargin){
			// formdata.append('semiWholesaleMargin',$scope.addModelProduct.semiWholesaleMargin);
		// }
		
		// if($scope.addModelProduct.vat){
			// formdata.append('vat',$scope.addModelProduct.vat);
		// }
		// if($scope.addModelProduct.additionalTax){
			// formdata.append('additionalTax',$scope.addModelProduct.additionalTax);
		// }
		// if($scope.addModelProduct.marginFlat){
			// formdata.append('marginFlat',$scope.addModelProduct.marginFlat);
		// }
		// if($scope.addModelProduct.margin){
			// formdata.append('margin',$scope.addModelProduct.margin);
		// }
		// if($scope.addModelProduct.mrp){
			// formdata.append('mrp',$scope.addModelProduct.mrp);
		// }
		
		// if($scope.addModelProduct.minimumStockLevel){
			// formdata.append('minimumStockLevel',$scope.addModelProduct.minimumStockLevel);
		// }
		
		// if($scope.addModelProduct.hsn){
			// formdata.append('hsn',$scope.addModelProduct.hsn);
		// }
		
		// if($scope.addModelProduct.igst){
			// formdata.append('igst',$scope.addModelProduct.igst);
		// }
		
		// $scope.addModelProduct.purchaseCgst ? formdata.append('purchaseCgst',$scope.addModelProduct.purchaseCgst) : 0;
		// $scope.addModelProduct.purchaseSgst ? formdata.append('purchaseSgst',$scope.addModelProduct.purchaseSgst) : 0;
		// $scope.addModelProduct.purchaseIgst ? formdata.append('purchaseIgst',$scope.addModelProduct.purchaseIgst) : 0;
		
		// formdata.append('isDisplay','yes');
		apiCall.postCall(productPath,formdata).then(function(response5){
		
			if(apiResponse.ok == response5)
			{
				if($scope.addModelProduct.getSetProductId){
					filterArray.productId = $scope.addModelProduct.getSetProductId;
				}
			
				filterArray.index = $scope.productIndex;
				filterArray.companyId = $scope.addModelProduct.company.companyId;
				filterArray.productName = $scope.addModelProduct.productName;
				filterArray.color = $scope.addModelProduct.color;
				filterArray.size = $scope.addModelProduct.size;
				
				$modalInstance.close(filterArray);
			}
			else{
				
				alert(response5);
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
		
		$scope.addModelProduct.measureUnit = 'piece';
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
AccProductModalController.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath","productIndex","companyId","validationMessage","apiResponse","getSetFactory"];