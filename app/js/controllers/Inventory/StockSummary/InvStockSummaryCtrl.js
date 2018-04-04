
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvStockSummaryController', InvStockSummaryController);

function InvStockSummaryController($scope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster,getSetFactory,fetchArrayService) {
  'use strict';
  var vm = this;
  $scope.filteredItems=[];
	//$scope.brandradio="";
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
  var data = [];
	var flag = 0;
	
	function filterDataForTable(){
		//console.time();
		var count = data.length;
		var iIndex = 0;
		while(iIndex < count) {
		  	var index = fetchArrayService.myIndexOfObject(vm.productCategoryData,data[iIndex].product.productCategory.productCategoryId,'productCategoryId');
			// console.log("prrrrrrrrrrrrrroooooooooooooodcut = ",data[iIndex].product);
			data[iIndex].productCategoryName = ""; //initialization of new property 
			data[iIndex].productCategoryName =	index.productCategoryName;  //set the data from nested obj into new property
			
			var groupIndex = fetchArrayService.myIndexOfObject(vm.productGroupData,data[iIndex].product.productGroup.productGroupId,'productGroupId');
			
			data[iIndex].productGroupName = ""; //initialization of new property 
			data[iIndex].productGroupName = groupIndex.productGroupName;  //set the data from nested obj into new property
		  
			data[iIndex].productName = ""; //initialization of new property 
			data[iIndex].productName = data[iIndex].product.productName;  //set the data from nested obj into new property
			
			data[iIndex].color = ""; 
			data[iIndex].color = data[iIndex].product.color;
			data[iIndex].size = ""; 
			data[iIndex].size = data[iIndex].product.size;
			
			data[iIndex].qty = parseInt(data[iIndex].qty);
			// $scope.totalQty = $scope.totalQty+data[iIndex].qty;
			iIndex++;
		}
		//console.timeEnd();
	}

	$scope.totalQty=0;
	//calculate total qty
	$scope.calculateQty = function(){
		$scope.totalQty=0;

		// vm.eventChannel = new ngTableEventsChannel.onAfterDataFiltered(function(tableParams, filteredData){
		// 	console.log("innn");
  //           //DO SOMETHING
  //       });

		// console.log("daaaaaaaaaatadadatdadad = ",self.tableParams);
		var dataLength = data.length;
		for(var index=0;index<dataLength;index++)
		{
			$scope.totalQty = $scope.totalQty+data[index].qty;
		}
		return $scope.totalQty;
	}

	$scope.showProduct = function(){
		
		if($scope.stateCheck){
			$scope.getProduct($scope.stateCheck.companyId);
		}
		else{
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
			
			apiCall.getCall(apiPath.getAllProduct).then(function(response){
				
				toaster.clear();
				if(angular.isArray(response)){
					data = response;
					filterDataForTable();
				}
				else{
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
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
			$scope.stateCheck = fetchArrayService.myIndexOfObject(response2,'ok','isDefault');
			$scope.getProduct($scope.stateCheck.companyId);
		});
		
		vm.productCategoryData=[];
		apiCall.getCall(apiPath.getAllCategory).then(function(response2){
			vm.productCategoryData = response2;
		});
		
		vm.productGroupData=[];
		apiCall.getCall(apiPath.getAllGroup).then(function(response2){
			vm.productGroupData = response2;
		});
		
	}
	$scope.init();
	
	$scope.getProduct = function(id){
		
		toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
			
		apiCall.getCall(apiPath.stockSummary+id+apiPath.stockSummary2).then(function(response){
			
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
	}
	

	$scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  productName: 'asc'     // initial sorting
		  }
	  }, {
		  counts: [],
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  // use build-in angular filter
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.color) != "undefined" && params.$params.filter.color != "") || (typeof(params.$params.filter.size) != "undefined" && params.$params.filter.size != "") || (typeof(params.$params.filter.qty) != "undefined" && params.$params.filter.qty != "")))
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
		flag = 1;
	}
}
InvStockSummaryController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$location","apiResponse","toaster","getSetFactory","fetchArrayService"];