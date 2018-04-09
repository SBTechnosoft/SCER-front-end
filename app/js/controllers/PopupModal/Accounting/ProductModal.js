
/**=========================================================
 * Module: AccProductModalController.js
 * Controller for input components
 =========================================================*/

App.controller('AccProductModalController', AccProductModalController);

function AccProductModalController($scope,toaster, $modalInstance,$rootScope,apiCall,apiPath,productIndex,companyId,validationMessage,apiResponse,getSetFactory,maxImageSize) {
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

  $scope.productTypeDrop = [
    'product',
    'accessories',
    'service'
  ];
  $scope.bestBeforeDrop = [
    'day',
    'month',
    'year'
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
		console.log('modal p',editProductData);

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

		$scope.addModelProduct.productType = editProductData.productType;
		$scope.addModelProduct.productMenu = editProductData.productMenu;
		$scope.addModelProduct.bestBeforeType = editProductData.bestBeforeType;
		$scope.addModelProduct.bestBeforeTime = editProductData.bestBeforeTime;
		$scope.addModelProduct.cessFlat = editProductData.cessFlat;
		$scope.addModelProduct.cessPercentage = editProductData.cessPercentage;
		$scope.addModelProduct.maxSaleQty = editProductData.maxSaleQty;
		$scope.addModelProduct.opening = editProductData.opening;
		$scope.addModelProduct.commission = editProductData.commission;
		$scope.addModelProduct.remark = editProductData.remark;
		$scope.addModelProduct.notForSale = editProductData.notForSale=="true"?true : false;
		
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
		$scope.addModelProduct.productType ='accessories';
		$scope.addModelProduct.bestBeforeType ='day';
		$scope.addModelProduct.productMenu = 'not';
		$scope.addModelProduct.notForSale = 'false';
		$scope.addModelProduct.bestBeforeTime=0;
	}
	
	$scope.enableDisableColor = true;
	$scope.addDiv=false;
	$scope.enableDisableSize = true;
	$scope.enableDisableBestBefore = true;
	//get setting data
	$scope.getOptionSettingData = function(){
		apiCall.getCall(apiPath.settingOption).then(function(response){
			var responseLength = response.length;
			console.log(response);
			for(var arrayData=0;arrayData<responseLength;arrayData++)
			{
				if(angular.isObject(response) || angular.isArray(response))
				{
					if(response[arrayData].settingType=="product")
					{
						var arrayData1 = response[arrayData];
						$scope.enableDisableColor = arrayData1.productColorStatus=="enable" ? true : false;
						$scope.addDiv = $scope.enableDisableColor==false? true :false;
						$scope.enableDisableSize = arrayData1.productSizeStatus=="enable" ? true : false;
						$scope.enableDisableBestBefore = arrayData1.productBestBeforeStatus=="enable" ? true : false;
					}
				}
			}
		});
	}
	$scope.getOptionSettingData();

	//single image cover-image validation and add it to formdata
	$scope.uploadFile = function(files) {
	  	if(parseInt(files[0].size) <= maxImageSize){
			
			angular.element("img.showImg").css("display","block");
			
			console.log('Small File');
			formdata.delete('coverImage[]');
			
			formdata.append("coverImage[]", files[0]);
			
			var reader = new FileReader();
			reader.onload = function(event) {
				$scope.image_source = event.target.result
				$scope.$digest();

			}
			// console.log('Small File vv');
			// when the file is read it triggers the onload event above.
			reader.readAsDataURL(files[0]);
			// console.log('Small File aa');
		
		}
		else{
			
			formdata.delete('coverImage[]');
			toaster.clear();
			//toaster.pop('alert','Image Size is Too Long','');
			toaster.pop('alert', 'Opps!!', 'Image Size is Too Long');
			
			angular.element("input[type='file']").val(null);
			angular.element("img.showImg").css("display","none");
			$scope.$digest();
		}
	};

	//multiple images validation and add it to formdata
	$scope.uploadMultipleFile = function(files) {
		toaster.clear();
		var flag = 0;
		
		for(var m=0;m<files.length;m++){
			
			if(parseInt(files[m].size) > maxImageSize){
				
				flag = 1;
				formdata.delete('file[]');
				angular.element("input[type='file']").val(null);
				angular.element(".multipleFileAttachLabel").html('');
				break;
			}
			
		}
		
		if(flag == 0){
			
			formdata.delete('file[]');
			
			angular.forEach(files, function (value,key) {
				formdata.append('file[]',value);
			});
		}
		else{
			toaster.pop('alert', 'Opps!!', 'Image Size is Too Long');
		}
	};
	

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
		console.log(Fname,value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}

		if(Fname == 'notForSale'){
			formdata.set(Fname,value);
		}

		if(value != undefined && value != ''){
			console.log('form append');
			formdata.set(Fname,value);
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
					//console.log("innnn");
					filterArray.productId = $scope.addModelProduct.getSetProductId;
				}
				//console.log("hhhh");
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
AccProductModalController.$inject = ["$scope","toaster","$modalInstance","$rootScope","apiCall","apiPath","productIndex","companyId","validationMessage","apiResponse","getSetFactory","maxImageSize"];