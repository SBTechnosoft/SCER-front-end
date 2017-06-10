
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvProductController', InvProductController);

function InvProductController($scope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,getSetFactory,$modal,productFactory) {
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
					for (var i = 0; i < data.length; i++) {
					  data[i].productCategoryName = ""; //initialization of new property 
					  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
					  data[i].productGroupName = ""; //initialization of new property 
					  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
					}
					
					
				}
				
				vm.tableParams.reload();
				vm.tableParams.page(1);
				
			});
			
			
		}
		
		
	}
	
	$scope.init = function (){
			
		vm.states=[];
		apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			
			vm.states = response2;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.stateCheck = response;
				
				$scope.getProduct(response.companyId);
				
			});
		 
		});
		 
	}
	$scope.init();
	
	$scope.getProduct = function(id){
		
		toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
			productFactory.getProductByCompany(id).then(function(response){
				
				toaster.clear();
				//console.log(response.length);
				if(response.length <= 0){
						
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
					
				}
				else{
					//console.log('else');
					data = response;
					for (var i = 0; i < data.length; i++) {
					  data[i].productCategoryName = ""; //initialization of new property 
					  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
					  data[i].productGroupName = ""; //initialization of new property 
					  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
					}
					
					
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
			 
			  // if()
			  // {
				  // alert('yes');
			  // }
			  // else{
				  // alert('no');
			  // }
			  // use build-in angular filter
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.color) != "undefined" && params.$params.filter.color != "") || (typeof(params.$params.filter.size) != "undefined" && params.$params.filter.size != "") ))
			  {
					 var orderedData = params.filter() ?
					 $filter('filter')(data, params.filter()) :
					 data;

					  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  params.total(orderedData.length); // set total for recalc pagination
					  $defer.resolve(vm.users);
			  

			  }
			else
			{
				   params.total(data.length);
				  
			}
			 
			 if(!$.isEmptyObject(params.$params.sorting))
			  {
				
				 //alert('ggg');
				  var orderedData = params.sorting() ?
						  $filter('orderBy')(data, params.orderBy()) :
						  data;
		  
				  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			  }
			
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
		 
		 console.log('ok');
		 
		// return false;
		 /**Delete Code **/
			apiCall.deleteCall(apiPath.getAllProduct+'/'+id).then(function(response){
		
				//console.log(response);
				
				if(apiResponse.ok == response){
					
					 productFactory.blankProduct();
					$scope.showProduct();
					toaster.pop('success', 'Title', 'Delete SuccessFully');
					//vm.tableParams.reload();
					
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
   
   
  /** Barcode **/
  
	$scope.barcodePopup = function(size,id,pName,pColor,pSize)
	{
		//alert(id);
		
		// $('#allPro').print(2);
		
		// return false;
		toaster.clear();
		
		var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/Inventory/productBarcodeModal.html',
			  controller: productBarcodeModalCtrl,
			  size: size,
			  resolve:{
				  productId: function(){
					 
					return id;
				  },
				  productName: function(){
					 
					return pName;
				  },
				  productColor: function(){
					 
					return pColor;
				  },
				  productSize: function(){
					 
					return pSize;
				  }
				  
			  }
			});

		   
		modalInstance.result.then(function () {
		 
		 console.log('ok');
		
		}, function () {
		  console.log('Cancel');	
		});
			
			
	}
  
  /** End **/

}
InvProductController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","getSetFactory","$modal","productFactory"];