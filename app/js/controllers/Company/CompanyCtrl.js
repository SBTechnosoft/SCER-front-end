
/**=========================================================
 * Module: AngularTableController.js
 * Controller for ngTables
 =========================================================*/

App.controller('CompanyController', CompanyController);

function CompanyController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster) {
  'use strict';
  var vm = this;
   var formdata = new FormData();
   
 
  //Go To AddCompany
	$scope.GoToAddCompany = function(){
	  
	 $rootScope.AddCompanyModify = false;
	 $location.path('app/AddCompany/'); 
	}
	
	
	
	var data = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(response){
		
		data = response;
		for (var i = 0; i < data.length; i++) {
		  data[i].cityName = ""; //initialization of new property 
		  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
		}
		$scope.TableData();
	});
 
	$scope.TableData = function()
	{
		
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  companyName: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  console.log(params.$params);
			  
			  // use build-in angular filter
			   if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.companyName) != "undefined" && params.$params.filter.companyName != "")  || (typeof(params.$params.filter.address1) != "undefined" && params.$params.filter.address1 != "") || (typeof(params.$params.filter.address2) != "undefined" && params.$params.filter.address2 != "") || (typeof(params.$params.filter.pincode) != "undefined" && params.$params.filter.pincode != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "")))
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
  
  $scope.isDefault_comp = function(id)
  {
	formdata.append('isDefault','ok');
	var editCompany2 = apiPath.getAllCompany+'/'+id;
		
		apiCall.postCall(editCompany2,formdata).then(function(response5){
		
			formdata.delete('isDefault');
			//$location.path('app/Company');
			//toaster.pop('success', 'Title', 'Message');
		
		});
  }
  
  $scope.edit_comp = function(id)
  {
	  
	  $location.path('app/AddCompany/'+id);
  }
  
  $scope.delete_comp = function(id)
  {
	  //alert(id);
	var deletePath = apiPath.getAllCompany+'/'+id;
	  
	apiCall.deleteCall(deletePath).then(function(deleteres){
		
		console.log(deleteres);
		
		if(apiResponse.ok == deleteres){
				
			toaster.pop('success', 'Title', 'Delete Successfully');
			
			apiCall.getCall(apiPath.getAllCompany).then(function(response){
				
				data = [];
				data = response;
				for (var i = 0; i < data.length; i++) {
				  data[i].cityName = ""; //initialization of new property 
				  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
				}
				vm.tableParams.reload();
			});
		}
		else{
			
			toaster.pop('warning', 'Opps!!', deleteres);
		}
	 
	});
  }

}
CompanyController.$inject = ["$rootScope","$scope", "$filter","ngTableParams","apiCall","apiPath","$location","apiResponse","toaster"];