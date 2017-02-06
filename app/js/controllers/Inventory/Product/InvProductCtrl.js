
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvProductController', InvProductController);

function InvProductController($scope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster,getSetFactory) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";

  var data = [];
  apiCall.getCall(apiPath.getAllProduct).then(function(response){
		data = response;
		for (var i = 0; i < data.length; i++) {
		  data[i].productCategoryName = ""; //initialization of new property 
		  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
		  data[i].productGroupName = ""; //initialization of new property 
		  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
		}
		 $scope.TableData();
	});

	 $scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  name: 'asc'     // initial sorting
		  }
	  }, {
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
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.measurementUnit) != "undefined" && params.$params.filter.measurementUnit != "") ))
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
			
		  }
	  });
	}


  $scope.editProduct = function(id)
  {
	getSetFactory.set(id);
	 $location.path('app/AddInvProduct');
  }
  
  $scope.deleteProduct = function(id)
  {
		//alert(id);
	  
		apiCall.deleteCall(apiPath.getAllProduct+'/'+id).then(function(response){
		
			console.log(response);
			
			if(apiResponse.ok == response){
				
				toaster.pop('success', 'Title', 'Delete SuccessFully');
				vm.tableParams.reload();
				
			}
			else{

				toaster.pop('warning', 'Opps!!', response);
			}

		});
  }

}
InvProductController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$location","apiResponse","toaster","getSetFactory"];