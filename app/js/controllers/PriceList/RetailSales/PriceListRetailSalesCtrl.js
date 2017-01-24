
/**=========================================================
 * Module: InvStockCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('PriceListRetailSalesController', PriceListRetailSalesController);

function PriceListRetailSalesController($scope, $filter, ngTableParams,getSetFactory,apiCall,apiPath) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	
	 
 var data = [];
 
	var getData = getSetFactory.get();
	// console.log(getData);
	// return false;
	
	//var getData = { "Content-Type": undefined, "fromDate": "14-01-2017", "toDate": "30-03-2017", "companyId": "46", "productId": "908" };
	//var CompanyID = getData.companyId;
	var CompanyID = getData.companyId;
	
	delete getData.companyId;
	
	
	
	apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID+'/transaction',getData).then(function(responseDrop){
		
		data = responseDrop;
		$scope.TableData();
	
	});
	
	getSetFactory.blank();
 
	
 
 

  // SORTING
  // ----------------------------------- 

  // var data = [
      // {name: "Product1",  category: "Glass", group: "Cup"  },
	  // {name: "Product2",  category: "Glass", group: "Cup" },
	  // {name: "Product3",  category: "Glass", group: "Cup" },
	  // {name: "Product4",  category: "Glass", group: "Cup" },
	  // {name: "Product5",  category: "Glass", group: "Cup" },
	  // {name: "Product6",  category: "Glass", group: "Cup" },
	  // {name: "Product7",  category: "Glass", group: "Cup"},
	  // {name: "Product8",  category: "Glass", group: "Cup"},
	  // {name: "Product9",  category: "Glass", group: "Cup" },
	  // {name: "Product10",  category: "Glass", group: "Cup" },
	  // {name: "Product11",  category: "Glass", group: "Cup" },
	  // {name: "Product12",  category: "Glass", group: "Cup" }
      
  // ];
  
	$scope.TableData = function(){
	
		vm.tableParams = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  productName: 'asc'     // initial sorting
			  }
		  },{
			  total: data.length, // length of data
			  getData: function($defer, params) {
				 
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.retailPrice) != "undefined" && params.$params.filter.retailPrice != "") || (typeof(params.$params.filter.vat) != "undefined" && params.$params.filter.vat != "") || (typeof(params.$params.filter.finalAmount) != "undefined" && params.$params.filter.finalAmount != "") ))
				  {
						 var orderedData = params.filter() ?
						 $filter('filter')(data, params.filter()) :
						 data;

						  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

						  params.total(orderedData.length); // set total for recalc pagination
						  $defer.resolve(vm.users);
				  

				  }
				  else{
					  
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

  // FILTERS
  // ----------------------------------- 

  vm.tableParams2 = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      filter: {
          name: '',
          age: ''
          // name: 'M'       // initial filter
      }
  }, {
      total: data.length, // length of data
      getData: function($defer, params) {
          // use build-in angular filter
          var orderedData = params.filter() ?
                 $filter('filter')(data, params.filter()) :
                 data;

          vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(vm.users);
      }
  });

  // SELECT ROWS
  // ----------------------------------- 

  vm.data = data;

  vm.tableParams3 = new ngTableParams({
      page: 1,            // show first page
      count: 10          // count per page
  }, {
      total: data.length, // length of data
      getData: function ($defer, params) {
          // use build-in angular filter
          var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                  data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) :
                  data;

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });

  vm.changeSelection = function(user) {
      // console.info(user);
  };

  // EXPORT CSV
  // -----------------------------------  

  var data4 = [{name: "Moroni", age: 50},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34}];

  vm.tableParams4 = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
  }, {
      total: data4.length, // length of data4
      getData: function($defer, params) {
          $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });
  
  $scope.edit_comp = function()
  {
	  alert('Edit');
  }
  
  $scope.delete_comp = function()
  {
	  alert('Delete');
  }

}
PriceListRetailSalesController.$inject = ["$scope", "$filter", "ngTableParams","getSetFactory","apiCall","apiPath"];