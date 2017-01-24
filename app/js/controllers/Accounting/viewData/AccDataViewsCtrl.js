
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccViewDataController', AccViewDataController);

function AccViewDataController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,flotOptions, colors,$timeout,getSetFactory,$state,headerType) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  
  
  // An array of boolean to tell the directive which series we want to show
  $scope.areaSeries = [true, true];
  vm.chartAreaFlotChart  = flotOptions['area'];
  
   vm.chartPieFlotChart  = flotOptions['pie'];
  
	$scope.headerType = headerType;
	
	//alert(headerType);
	
	if($scope.headerType == 'sales'){
		
		var getJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':$rootScope.accView.salesType};
	}
	else if($scope.headerType == 'Wholesales'){
		
		var getJrnlPath = apiPath.getBill+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'salestype':'whole_sales'};
	}
	else if($scope.headerType == 'Retailsales'){
		
		var getJrnlPath = apiPath.getBill+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'salestype':'retail_sales'};
	}
	else if($scope.headerType == 'purchase'){
		
		var getJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':'purchase'};
	}
	else if($scope.headerType == 'payment'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		 var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
	else if($scope.headerType == 'receipt'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		// var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':'sales'};
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
	else if($scope.headerType == 'specialJournal'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
  
	  console.log($rootScope.accView.companyId);
	  console.log($rootScope.accView.fromDate);
	  console.log($rootScope.accView.toDate);
	  
		apiCall.getCallHeader(getJrnlPath,headerData).then(function(response){
			
			console.log(response);
			data = response;
			
			if($scope.headerType == 'Wholesales' || $scope.headerType == 'Retailsales'){
				
				$scope.saleTableData();
			}
			else{
				
			
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
						 
				$scope.TableData();
				// for (var i = 0; i < data.length; i++) {
				  // data[i].cityName = ""; //initialization of new property 
				  // data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
				// }
			}
			 
		 
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

	
	$scope.saleTableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  entryDate: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.entryDate) != "undefined" && params.$params.filter.entryDate != "")  || (typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "") || (typeof(params.$params.filter.companyName) != "undefined" && params.$params.filter.companyName != "")))
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
  
	$scope.editDataView= function(id)
	{
		getSetFactory.set(id);
	  
		if($scope.headerType == 'sales'){
			
			$state.go("app.AccSales");
			
		}
		else if($scope.headerType == 'purchase'){
			
			$state.go("app.AccPurchase");
		}
		else if($scope.headerType == 'payment'){
			
			$state.go("app.AccPayment");
		}
		else if($scope.headerType == 'receipt'){
			
			$state.go("app.AccReceipt");
		}
		else if($scope.headerType == 'specialJournal'){
			
			$state.go("app.AccSpecialJrnl");
		}
	
	}
	
	$scope.editDataViewSales = function(id){
		
		alert(id);
		
	}
  
  $scope.deleteDataView = function(id)
  {
	
	// var deletePath = apiPath.getAllBranch+'/'+parseInt(branch_id);
	  
	// apiCall.deleteCall(deletePath).then(function(deleteres){
		
		// console.log(deleteres);
	 
	// });
  }
	
	
}
AccViewDataController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","flotOptions","colors","$timeout","getSetFactory","$state","headerType"];