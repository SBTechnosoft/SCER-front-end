
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccDataSalesController', AccDataSalesController);

function AccDataSalesController($rootScope,$scope, $filter, ngTableParams,$http,apiCall,apiPath,$location,flotOptions, colors,$timeout) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  
  
  // An array of boolean to tell the directive which series we want to show
  $scope.areaSeries = [true, true];
  vm.chartAreaFlotChart  = flotOptions['area'];
  
   vm.chartPieFlotChart  = flotOptions['pie'];
  
  
  //Go To AddBranch
  $scope.GoToAddBranch = function(){
	  
	 $rootScope.AddBranchModify = false;
	 $location.path('app/AddBranch/'); 
  }
  
	  console.log($rootScope.accView.companyId);
	  console.log($rootScope.accView.fromDate);
	  console.log($rootScope.accView.toDate);
	  
	  var getJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
	  
	  console.log(getJrnlPath);
	  
	  $http({
			url: getJrnlPath,
			 method: 'get',
			processData: false,
			 headers: {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':'sales'}
		}).success(function(response, status, headers, config) {
			
			console.log(response);
			data = response;
			
			vm.pieChartData = [{ "color" : "#6cc539",
							"data" : "0",
							"label" : "Debit"
						  },
						  { "color" : "#00b4ff",
							"data" : "0",
							"label" : "Credit"
						  }];
			vm.pieFlotCharts = [{
						  "label": "Debit",
						  "color": "#6cc539",
						  "data": [
							["Jan", "0"],
							["Feb", "0"],
							["Mar", "0"],
							["Apr", "0"],
							["May", "0"],
							["Jun", "0"],
							["Jul", "0"],
							["Aug", "0"],
							["Sep", "0"],
							["Oct", "0"],
							["Nov", "0"],
							["Dec", "0"]
						  ]
						},{
						  "label": "Credit",
						  "color": "#00b4ff",
						  "data": [
							["Jan", "0"],
							["Feb", "0"],
							["Mar", "0"],
							["Apr", "0"],
							["May", "0"],
							["Jun", "0"],
							["Jul", "0"],
							["Aug", "0"],
							["Sep", "0"],
							["Oct", "0"],
							["Nov", "0"],
							["Dec", "0"]
						  ]
						}];
  
			for (var i = 0; i < data.length; i++) {
				
				if(data[i].amountType=='debit'){
				  
					vm.pieChartData[0]["data"] = parseInt(vm.pieChartData[0]["data"]) + parseInt(data[i].amount);
					var date = data[i].entryDate;
					var splitedate = date.split("-").reverse().join("-");
					var getdate = new Date(splitedate);
					var month = getdate.getMonth();
					
						vm.pieFlotCharts[0]["data"][month][1] = parseInt(vm.pieFlotCharts[0]["data"][month][1]) + parseInt(data[i].amount);
						
					//console.log(vm.pieFlotCharts[0]["data"][0][1] = parseInt(vm.pieFlotCharts[0]["data"][0][1]) + parseInt(data[i].amount));
				
				}
				else{
					vm.pieChartData[1]["data"] = parseInt(vm.pieChartData[1]["data"]) + parseInt(data[i].amount);
					
					var date = data[i].entryDate;
					var splitedate = date.split("-").reverse().join("-");
					var getdate = new Date(splitedate);
					var month = getdate.getMonth();
					
						vm.pieFlotCharts[1]["data"][month][1] = parseInt(vm.pieFlotCharts[1]["data"][month][1]) + parseInt(data[i].amount);
					   
					//vm.pieFlotCharts[1]["data"] = parseInt(vm.pieFlotCharts[1]["data"]) + parseInt(data[i].amount);
				}
			}
			console.log(vm.pieFlotCharts);
						  
			// for (var i = 0; i < data.length; i++) {
			  // data[i].cityName = ""; //initialization of new property 
			  // data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
			// }
			
			 $scope.TableData();
		 
		}).error(function(data, status, headers, config) {
			
		});
	
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  ledgerName: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.ledgerName) != "undefined" && params.$params.filter.ledgerName != "")  || (typeof(params.$params.filter.entryDate) != "undefined" && params.$params.filter.entryDate != "") || (typeof(params.$params.filter.amount) != "undefined" && params.$params.filter.amount != "")|| (typeof(params.$params.filter.amountTypeCredit) != "undefined" && params.$params.filter.amountTypeCredit != "")|| (typeof(params.$params.filter.amountTypeDebit) != "undefined" && params.$params.filter.amountTypeDebit != "")))
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
AccDataSalesController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","$http","apiCall","apiPath","$location","flotOptions","colors","$timeout"];