
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccDataLedgerController', AccDataLedgerController);

function AccDataLedgerController($rootScope,$scope, $filter, ngTableParams,$http,apiCall,apiPath,$location,getSetFactory) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  
  
  var ledgerId = getSetFactory.get();
  var GetTransationPath = apiPath.getAllLedger+'/'+ledgerId+'/transactions';
  
	apiCall.getCall(GetTransationPath).then(function(response){
		//console.log(response);
		data = response;
		
		// for (var i = 0; i < data.length; i++) {
		  // data[i].cityName = ""; //initialization of new property 
		  // data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
		// }
		
		 $scope.TableData();
	});
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  entryDate: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.entryDate) != "undefined" && params.$params.filter.entryDate != "")  || (typeof(params.$params.filter.amountType) != "undefined" && params.$params.filter.amountType != "")) || (typeof(params.$params.filter.amount) != "undefined" && params.$params.filter.amount != ""))
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
  
  $scope.isDefault_branch = function(id)
  {
	
	formdata.append('isDefault','ok');
	var editBranch2 = apiPath.getAllBranch+'/'+id;
		
		apiCall.postCall(editBranch2,formdata).then(function(response5){
		
			formdata.delete('isDefault');
		
			//$location.path('app/Branch');
			//toaster.pop('success', 'Title', 'Message');
		
		});
  }
  
  $scope.edit_comp = function(branch_id)
  {
	  
	  $location.path('app/AddBranch/'+branch_id);
  }
  
  $scope.delete_comp = function(branch_id)
  {
	
	var deletePath = apiPath.getAllBranch+'/'+parseInt(branch_id);
	  
	apiCall.deleteCall(deletePath).then(function(deleteres){
		
		console.log(deleteres);
	 
	});
  }

}
AccDataLedgerController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","$http","apiCall","apiPath","$location","getSetFactory"];