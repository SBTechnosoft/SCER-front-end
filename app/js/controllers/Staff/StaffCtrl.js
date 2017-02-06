
/**=========================================================
 * Module: StaffCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('StaffController', StaffController);

function StaffController($scope,$rootScope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,getSetFactory) {
  'use strict';
  var vm = this;
	var data = [];
	$scope.showStaff = [];
	vm.tableParams;
	$scope.allowedAdd = $rootScope.$storage.authUser.userType;
	$scope.allowedId = $rootScope.$storage.authUser.userId;
	
	var flag = 0;
	
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
		
		
		vm.companyDrop = response2;
		
		//Set default Company
		apiCall.getDefaultCompany().then(function(response){
			
			$scope.showStaff.companyDropDown = response;
			
			var headerDataOnLoad = {'Content-Type': undefined,'companyId':response.companyId};
			
			apiCall.getCallHeader(apiPath.getAllStaff,headerDataOnLoad).then(function(response){
		
				console.log(response);
				if(apiResponse.noContent == response){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Staff Available');
					
				}
				else{
					
					data = response;
				
					for (var i = 0; i < data.length; i++) {
					  data[i].cityName = ""; //initialization of new property 
					  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
					}
					
					 $scope.TableData();
					 
					 flag = 1;
				}
				
			});
	
	
			vm.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+response.companyId;
			//Get Branch
			apiCall.getCall(getAllBranch).then(function(response4){
				
				vm.branchDrop = response4;
					
			});
		});
		
		
	});
	
	//Change Branch On Select Company
	$scope.changeCompany = function(state)
	{
		 vm.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+state;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			vm.branchDrop = response4;
				
		});
	}
	
	$scope.showFilterStaff = function(){
		
		var headerData = {'Content-Type': undefined};
		
		if($scope.showStaff.companyDropDown){
			
			headerData.companyId = $scope.showStaff.companyDropDown.companyId;
			
		}
		
		
		if($scope.showStaff.branchDropDown){
			
			headerData.branchId = $scope.showStaff.branchDropDown.branchId;
		}
	
		
			
			apiCall.getCallHeader(apiPath.getAllStaff,headerData).then(function(response){
		
				console.log(response);
				if(apiResponse.noContent == response){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Staff Available');
				}
				else{
					
					
					data = response;
			
					for (var i = 0; i < data.length; i++) {
					  data[i].cityName = ""; //initialization of new property 
					  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
					}
					
					
				}
				
				if(flag == 0){
					
					$scope.TableData();
					
					flag = 1;
				}
				else{
					
					vm.tableParams.reload();
				}
				
				
			});
	
		
	}
  
  // SORTING
  // ----------------------------------- 
	$scope.branchF = [
	  {pop: "Branch1" },
	  {pop: "Branch2" }
	];
  
 
	
  
  //alert(branchF);
	$scope.TableData = function(){
		
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  userName: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  
			  // use build-in angular filter
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.userType) != "undefined" && params.$params.filter.userName != "") || (typeof(params.$params.filter.userType) != "undefined" && params.$params.filter.userName != "") || (typeof(params.$params.filter.emailId) != "undefined" && params.$params.filter.emailId != "") || (typeof(params.$params.filter.address) != "undefined" && params.$params.filter.address != "") || (typeof(params.$params.filter.contactNo) != "undefined" && params.$params.filter.contactNo != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "")))
			  {
					 var orderedData = params.filter() ?
					 $filter('filter')(data, params.filter()) :
					 data;

					  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  params.total(orderedData.length); // set total for recalc pagination
					  $defer.resolve(vm.users);
			  

			  }
			 
			 if(!$.isEmptyObject(params.$params.sorting))
			  {
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
  
	$scope.editStaff= function(id)
	{
		getSetFactory.set(id);
		$state.go("app.AddStaff");
	}
	  
	 $scope.deleteStaff = function(id)
	 {
		
		
		var deletePath = apiPath.getAllStaff+'/'+parseInt(id);
		  
		apiCall.deleteCall(deletePath).then(function(deleteres){
			
			console.log(deleteres);
			
			if(apiResponse.ok == deleteres){
					
				toaster.pop('success', 'Title', 'Delete Successfully');
				
				apiCall.getCall(apiPath.getAllStaff).then(function(response){
					
					//console.log(response);
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
StaffController.$inject = ["$scope","$rootScope","$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","getSetFactory"];