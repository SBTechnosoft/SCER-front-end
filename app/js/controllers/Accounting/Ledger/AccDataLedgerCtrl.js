
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccDataLedgerController', AccDataLedgerController);

function AccDataLedgerController($rootScope,$scope, $filter, ngTableParams,$http,apiCall,apiPath,$location,getSetFactory,flotOptions, colors,$timeout,toaster) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  
   var ledgerId = getSetFactory.get();
   
   getSetFactory.blank(); // Empty It
   
  //vm.pieChartData = [];
  vm.headingName;
  
	
	
  apiCall.getCall(apiPath.getAllLedger+'/'+ledgerId).then(function(responseDrop){
	  
		toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
		
		vm.headingName = responseDrop.ledgerName;
	
	});
  
  //Chart Config
	// An array of boolean to tell the directive which series we want to show
	 $scope.areaSeries = [true, true];
	vm.chartAreaFlotChart = flotOptions['area'];
  
   vm.chartPieFlotChart = flotOptions['pie'];
	//vm.chartSplineFlotChart = flotOptions['spline'];
   

  var GetTransationPath = apiPath.getAllLedger+'/'+ledgerId+'/transactions';
  
	apiCall.getCall(GetTransationPath).then(function(response){
		console.log(response);
		toaster.clear();
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
				
					console.log(vm.pieFlotCharts[0]["data"][month]);
					vm.pieFlotCharts[0]["data"][month][1] = parseInt(vm.pieFlotCharts[0]["data"][month][1]) + parseInt(data[i].amount);
					
				console.log(vm.pieFlotCharts);
			
			}
			else{
				
				//console.log(data);
				vm.pieChartData[1]["data"] = parseInt(vm.pieChartData[1]["data"]) + parseInt(data[i].amount);
				
				var date = data[i].entryDate;
				var splitedate = date.split("-").reverse().join("-");
				var getdate = new Date(splitedate);
				var month = getdate.getMonth();
				
				// console.log(month);
				// console.log(vm.pieFlotCharts[1]["data"][month]);
					vm.pieFlotCharts[1]["data"][month][1] = parseInt(vm.pieFlotCharts[1]["data"][month][1]) + parseInt(data[i].amount);
				   
				//vm.pieFlotCharts[1]["data"] = parseInt(vm.pieFlotCharts[1]["data"]) + parseInt(data[i].amount);
			}
		}
		//console.log(vm.pieFlotCharts);
		
		$scope.contents = data;
					
					
		$scope.contents.sort(function(a, b){
			var entDate = a.entryDate.split("-").reverse().join("-");
			var toDate = b.entryDate.split("-").reverse().join("-");
			var dateA=new Date(entDate), dateB=new Date(toDate);
			return dateB-dateA; 
		});
		
		data= $scope.contents;
					
		$scope.TableData();
	});
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  date: 'desc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  /** Table **/
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.date) != "undefined" && params.$params.filter.date != "")  || (typeof(params.$params.filter.amountType) != "undefined" && params.$params.filter.amountType != "") || (typeof(params.$params.filter.amount) != "undefined" && params.$params.filter.amount != "")))
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
			  /** End Table **/
			   var orderedData;

			if(params.sorting().date === 'asc'){

			  data.sort(function (a, b) {
				  
				  var entDate = a.entryDate.split("-").reverse().join("-");
						var toDate = b.entryDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
						
				//var dateA = new Date(a.date), dateB = new Date(b.date);
				return dateA - dateB; //sort by date descending
			  });
			  orderedData = data;

			} else if(params.sorting().date === 'desc') {

			  data.sort(function (a, b) {
				  var entDate = a.entryDate.split("-").reverse().join("-");
						var toDate = b.entryDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
						
				//var dateA = new Date(a.date), dateB = new Date(b.date);
				return dateB - dateA; //sort by date descending
			  });
			  orderedData = data;

			} else if(!params.sorting().date){

			  if (params.filter().term) {
				orderedData = params.filter() ? $filter('filter')(data, params.filter().term) : data;
			  } else {
				orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
			  }
			  
			}

			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			
			  $scope.totalData = data.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
			
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
AccDataLedgerController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","$http","apiCall","apiPath","$location","getSetFactory","flotOptions","colors","$timeout","toaster"];