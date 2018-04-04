
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvProductController', InvProductController);

function InvProductController($scope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,getSetFactory,$modal,productFactory,fetchArrayService) {
  'use strict';
  	var vm = this;
  	$scope.filteredItems;

	//$scope.brandradio="";
	
 	var data = [];
	var flag = 0;
	var Modalopened = false;
	 
	$scope.showProduct = function(){
		
		if($scope.stateCheck){
			// console.log("iff");
			flag = 1;
			$scope.getProduct($scope.stateCheck.companyId);
		}
		else{
			// console.log("else");
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
			//apiCall.getCall(apiPath.getAllProduct).then(function(response){
			productFactory.getProduct().then(function(response){
					
				toaster.clear();
				
				if(response.length <= 0){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
					
				}
				else{
					data = response;
					filterDataForTable();
				}
				
				vm.tableParams.reload();
				vm.tableParams.page(1);
				
			});
		}
	}
	
	function filterDataForTable(){
		var count = data.length;
		while(count--) {
			// console.log("dataaaa = ",data);
		 	data[count].productCategoryName = ""; //initialization of new property 
			data[count].productCategoryName = data[count].productCategory.productCategoryName;  //set the data from nested obj into new property
			data[count].productGroupName = ""; //initialization of new property 
			data[count].productGroupName = data[count].productGroup.productGroupName;  //set the data from nested obj into new property
		}
	}

	$scope.init = function (){
			
		vm.states=[];
		apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			
			vm.states = response2;
			$scope.stateCheck = fetchArrayService.getfilteredSingleObject(response2,'ok','isDefault');
			$scope.getProduct($scope.stateCheck.companyId);
		});
		 
	}
	$scope.init();
	
	$scope.getProduct = function(id){
		
		toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
			productFactory.getProductByCompany(id).then(function(response){
				 console.log("get updated data = ",response);
				toaster.clear();
				if(angular.isArray(response)){
					
					// $scope.$digest(function() {
						data=[];
						data = angular.copy(response);
				        // $scope.tableParams.reload();
				        // $scope.tableParams.reloadPages();
					   
					// });
					filterDataForTable();

				}
				else{
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
				}
				
				if(flag == 0){
						
					//console.log('zero');
					$scope.TableData();
				}
				else{
					 vm.tableParams.reload();
					vm.tableParams.page(1);

				}
				
			});
			
		// apiCall.getCall(apiPath.getProductByCompany+id+'/branch').then(function(response){
			
		// });
	}
	$scope.query = {
		productCategoryName: undefined,
		productGroupName: undefined,
		productName: undefined,
		color: undefined,
		size: undefined,
		hsn: undefined,
		vat:undefined,
		additionalTax:undefined,
		igst:undefined
	};
	$scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  filter: $scope.query,
		  sorting: {
			  productCategoryName: 'asc'     // initial sorting
		  }
	  }, {
		  counts: [],
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                  data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) :
                  data;

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			
			$scope.totalData = data.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
			
		  }
	  });
	}


	$scope.enableDisableColor = true;
	$scope.enableDisableSize = true;
	// $scope.enableDisableBestBefore = true;
	//get setting data
	$scope.getOptionSettingData = function(){
		toaster.clear();
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
						$scope.enableDisableSize = arrayData1.productSizeStatus=="enable" ? true : false;
						// $scope.enableDisableBestBefore = arrayData1.productBestBeforeStatus=="enable" ? true : false;
					}
				}
			}
		});
	}

	$scope.getOptionSettingData();

  $scope.editProduct = function(id)
  {
	getSetFactory.set(id);
	 $state.go('app.AddInvProduct');
  }
  
  $scope.deleteProduct = function(size,id)
  {
		//alert(id);
		toaster.clear();
		if (Modalopened) return;
		
	var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
		  controller: deleteDataModalController,
		  size: size
		});
	
	    Modalopened = true;
		
		modalInstance.result.then(function () {
		 /**Delete Code **/
			productFactory.deleteSingleProduct(id).then(function(response){
				if(apiResponse.ok == response){
					console.log("successccccccccccccccccc");
					$scope.showProduct();
					$state.go($state.current, {}, {reload: true});
					toaster.pop('success', 'Title', 'Delete SuccessFully');
				}
				else{
					toaster.pop('warning', 'Opps!!', response);
				}
			});
		 /** End **/
			 Modalopened = false;
			 
		}, function () {
		  console.log('Cancel');	
			 Modalopened = false;
		});
		
		
  }
  
   /** Batch **/
   
		$scope.openProductBatchModal = function(){
			
			if (Modalopened) return;
			var modalInstance = $modal.open({
				
				templateUrl: 'app/views/PopupModal/Inventory/InventoryBatchModal.html',
				controller: 'InventoryBatchModalController as vm',
				size: 'flg',
				resolve:{
					inventoryType: function(){
						
						return "Product";
					}
				}
			});
			
			 Modalopened = true;
			 
			modalInstance.result.then(function (data) {
			 
			  console.log('Ok');	
			  productFactory.blankProduct();
			  $scope.init();
			  Modalopened = false;
			
			}, function (data) {
			  console.log('Cancel');	
				Modalopened = false;
				
			});
		}
	
   /** End **/

   /** Batch Update**/
   
		$scope.openProductBatchUpdateModal = function(){
			
			if (Modalopened) return;
			// $scope.selectedBoxArray=[];
			// var checkboxes = document.getElementsByName('check');
 		// 	for (var i = 0; i < checkboxes.length; i++) 
 		// 	{
			//    if(checkboxes[i].checked == true)
			//    {
			//    		$scope.selectedBoxArray.push($scope.filteredItems[i]);
			//    }
			// }
			if($scope.selectedBoxArray.length==0)
			{
				toaster.pop('alert', 'Opps!!', 'No Product Selected');
				return false;
			}
			var modalInstance = $modal.open({
				
				templateUrl: 'app/views/PopupModal/Inventory/InventoryBatchUpdateModal.html',
				controller: 'InventoryBatchModalUpdateController as form',
				size: 'flg',
				resolve:{
					productData: function(){
						
						return $scope.selectedBoxArray;
					}
				}
			});
			
			 Modalopened = true;
			 
			modalInstance.result.then(function (data1) {
			  console.log('Ok');

			  // productFactory.blankProduct();
			  // $scope.showProduct();	
			  Modalopened = false;
			  console.log("state reload");
			  $state.go($state.current, {}, {reload: true});
			  
			 //  var count =   data.length;
				// $scope.productFlag=0;
				// for(var sat=0;sat<count;sat++){
				// 	var dataSet =   data[sat];	
				// 	dataSet.selected = false;	
				// }
				// $scope.parentCheckBox=false;
				// vm.tableParams.reload();
				// vm.tableParams.page(1);
			  $scope.init();
			  
			
			}, function (data1) {
			  console.log('Cancel');	
				Modalopened = false;
				
			});
		}
	
   /** End **/

    /*checkbox code*/
    $scope.parentCheckBox;
   	$scope.selectedBoxArray = [];
	$scope.productFlag = 0;
	$scope.changeBox = function(box1,pData){
		if(box1 == true)
		{
			$scope.selectedBoxArray.push(pData);
		}
		else
		{	
			console.log("else");
			var index = $scope.selectedBoxArray.indexOf(pData);
			$scope.selectedBoxArray.splice(index,1);
		}
		console.log("special console = ",$scope.selectedBoxArray);
	}
	$scope.changeAllBox = function(box)
	{		
		if(box == false){
			var count =   data.length;
			$scope.productFlag=0;
			for(var sat=0;sat<count;sat++){
				var dataSet =   data[sat];	
				dataSet.selected = false;	
			}
			$scope.selectedBoxArray = [];	
		}
		else{
			$scope.productFlag=1;
			// console.log("daaadtaa = ",data);
			var count =   data.length;
			// $scope.productFlag=0;
			for(var sat=0;sat<count;sat++){
				// console.log("data = ",data[sat]);
				var dataSet =   data[sat];	
				dataSet.selected = true;	
			}
			// console.log("filter array data =",$scope.filteredItems);
			// console.log(" data =",data);
			$scope.selectedBoxArray = data;
		}
		// console.log("rrr = ",$scope.selectedBoxArray);
	}
   /*End*/
}
InvProductController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","getSetFactory","$modal","productFactory","fetchArrayService"];