
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvProductController', InvProductController);

function InvProductController($scope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,getSetFactory,$modal,productFactory,fetchArrayService) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";

  var data = [];
	var flag = 0;
	 var Modalopened = false;
	 
	$scope.showProduct = function(){
		
		if($scope.stateCheck){
			flag = 1;
			$scope.getProduct($scope.stateCheck.companyId);
		}
		else{
			
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
				toaster.clear();
				if(angular.isArray(response)){
					data = response;
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
					//console.log('one');
					 vm.tableParams.reload();
					 vm.tableParams.page(1);
				}
				
			});
			
		// apiCall.getCall(apiPath.getProductByCompany+id+'/branch').then(function(response){
			
		// });
	}
	
	$scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
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
					$scope.showProduct();
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
}
InvProductController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","getSetFactory","$modal","productFactory","fetchArrayService"];