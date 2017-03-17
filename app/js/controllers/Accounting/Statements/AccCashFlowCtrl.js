
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccCashFlowController', AccCashFlowController);

function AccCashFlowController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,$window,getSetFactory) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  var flag = 0;
  $scope.noOfDecimalPoints;
  $scope.displayCompany;
  
  var erpPath = $rootScope.erpPath;
   $scope.displayDate = new Date();
  
	$scope.showBranches = function(){
		
		$scope.TotalofDebit = 0;
		$scope.TotalofCredit = 0;
		
		$scope.noOfDecimalPoints = parseInt($scope.stateCheck.noOfDecimalPoints);
	
		$scope.getBranch($scope.stateCheck.companyId);
		
		$scope.displayCompany = $scope.stateCheck.companyName;
		
		
		
		
	}
	
	//Company
	$scope.init = function (){
			
		vm.states=[];
		apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			
			vm.states = response2;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.stateCheck = response;
				
				$scope.displayCompany = response.companyName;
				
				$scope.noOfDecimalPoints = parseInt(response.noOfDecimalPoints);
				
				$scope.getBranch(response.companyId);
				
			});
		 
		});
		 
	}
	$scope.init();
	
	//End
	
	$scope.TotalofDebit = 0;
	$scope.TotalofCredit = 0;
  
	$scope.getBranch = function(id){
		
	toaster.pop('wait', 'Please Wait', 'Data Loading....');
	
		apiCall.getCall(apiPath.getCashFlow+id).then(function(response){
			
			console.log(response);
			//data = response;
			toaster.clear();
			
			var trialBalanceArray = [];
			var totaldebit = 0;
			var totalcredit = 0;
			var dataLength = response.length-1;
			
			for (var i = 0; i < response.length; i++) {
			  
			  var dataOfTrial = response[i];
			  
			  var trailObject = {};
			  trailObject.ledgerId = dataOfTrial.ledger.ledgerId;
			  trailObject.ledgerName = dataOfTrial.ledger.ledgerName;
				//  trailObject.amountType = data[i].amountType;
			  
			  if(dataOfTrial.amountType == 'debit'){
				 
				 
				 trailObject.debitAmount = dataOfTrial.amount;
				  trailObject.creditAmount = "-";
				totaldebit += parseFloat(dataOfTrial.amount);
			  }
			  else{
				   trailObject.debitAmount = "-";
				  trailObject.creditAmount = dataOfTrial.amount;
				 totalcredit += parseFloat(dataOfTrial.amount);
			  }
			  
			  trialBalanceArray.push(trailObject);
			  
				if(i==dataLength)
				{
					// var totalObject = {};
					// totalObject.ledgerName = "Total";
					// totalObject.debitAmount = totaldebit;
					// totalObject.creditAmount = totalcredit;
					
					// trialBalanceArray.push(totalObject);
					$scope.TotalofDebit = totaldebit;
					$scope.TotalofCredit = totalcredit;
				}
			}
			
			data = trialBalanceArray;
			
			if(flag == 0){
				$scope.TableData();
				flag =1;
			}
			else{
				
				vm.tableParams.reload();
			}
			
			

		});
		
		// vm.tableParams.reload();
		
	}
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10000,          // count per page
		  // noPager: true // hides pager
		  sorting: {
			   ledgerfName: 'asc'     // initial sorting
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
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.ledgerName) != "undefined" && params.$params.filter.ledgerName != "")  || (typeof(params.$params.filter.debitAmount) != "undefined" && params.$params.filter.debitAmount != "") || (typeof(params.$params.filter.creditAmount) != "undefined" && params.$params.filter.creditAmount != "")))
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
  
  
	$scope.goToLedgerTransaction = function(ledgerId){
		
		//alert(ledgerId);
		
		getSetFactory.set(ledgerId);
		
		$state.go("app.AccDataLedger");
		
	  
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
  
	/*** Pdf ***/
	
		$scope.generatePdf = function(){
		 
			
			
			apiCall.getCall(apiPath.getTrailBalance+$scope.stateCheck.companyId+'/export').then(function(responseDrop){
			
				console.log(responseDrop);
				
				if(angular.isObject(responseDrop)){
					
					var pdfPath = erpPath+responseDrop.documentPath;
					$window.open(pdfPath, '_blank');
				}
				else{
					
					alert('Something Wrong');
				}
			
			});
		}
	
	/*** End Pdf ***/
}
AccCashFlowController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","$window","getSetFactory"];