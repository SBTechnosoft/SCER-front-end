
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('BranchController', BranchController);

function BranchController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,$location,$state,apiResponse,toaster) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  
  //Go To AddBranch
  $scope.GoToAddBranch = function(){
	  
	 $rootScope.AddBranchModify = false;
	 $location.path('app/AddBranch/');
	// $state.go('app.AddBranch'); 
  }
  
	$scope.showBranches = function(){
		
		if($scope.stateCheck){
			
			apiCall.getCall(apiPath.getOneBranch+$scope.stateCheck.companyId).then(function(response){
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
			
			
			
			apiCall.getCall(apiPath.getAllBranch).then(function(response){
				
				//console.log(response);
				data = response;
				
				for (var i = 0; i < data.length; i++) {
				  data[i].cityName = ""; //initialization of new property 
				  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
				}
				
				 vm.tableParams.reload();

			});
		}
		
		
	}
	
	//Company
	$scope.init = function (){
			
		vm.states=[];
		apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			
			vm.states = response2;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.stateCheck = response;
				
				$scope.getBranch(response.companyId);
				
			});
		 
		});
		 
	}
	$scope.init();
	
	//End
  
	$scope.getBranch = function(id){
		
	
		apiCall.getCall(apiPath.getOneBranch+id).then(function(response){
			//console.log(response);
			data = response;
			
			for (var i = 0; i < data.length; i++) {
			  data[i].cityName = ""; //initialization of new property 
			  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
			}
			
			
			 $scope.TableData();
			

		});
		
		// vm.tableParams.reload();
		
	}
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  branchName: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  //console.log(params.$params);
			  // if()
			  // {
				  // alert('yes');
			  // }
			  // else{
				  // alert('no');
			  // }
			  // use build-in angular filter
			 // console.log("Length: .."+params.$params.filter.city);
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.branchName) != "undefined" && params.$params.filter.branchName != "")  || (typeof(params.$params.filter.address1) != "undefined" && params.$params.filter.address1 != "") || (typeof(params.$params.filter.address2) != "undefined" && params.$params.filter.address2 != "") || (typeof(params.$params.filter.pincode) != "undefined" && params.$params.filter.pincode != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "")))
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
  
  $scope.editBranch= function(branch_id)
  {
	  
	  //$location.path('app/AddBranch/'+branch_id);
	   $state.go("app.AddBranch", { id: branch_id });
  }
  
  $scope.deleteBranch = function(branch_id)
  {
	
	var deletePath = apiPath.getAllBranch+'/'+parseInt(branch_id);
	  
	apiCall.deleteCall(deletePath).then(function(deleteres){
		
		console.log(deleteres);
		
		if(apiResponse.ok == deleteres){
				
			toaster.pop('success', 'Title', 'Delete Successfully');
			
			apiCall.getCall(apiPath.getAllBranch).then(function(response){
				
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
BranchController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","$location","$state","apiResponse","toaster"];