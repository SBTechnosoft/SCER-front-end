

App.controller('CrmClientHistoryController', CrmClientHistoryController);

function CrmClientHistoryController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,$timeout,getSetFactory,$state,$modal,$window,toaster,apiResponse) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  $scope.billData = [];
  
  var Modalopened = false;
  
	$scope.erpPath = $rootScope.erpPath; //Erp Path
	
	$scope.dateFormat =  $rootScope.dateFormats; //Date Format
   
	$scope.clientName = "Jugal";
	/** Display Company and date **/
		apiCall.getCall(apiPath.getAllClient+'/66').then(function(res){
			
			$scope.ClientData = res;
			
			toaster.clear();
			//toaster.pop('wait', 'Please Wait', 'Data Loading....',30000);
			
		});
		// $scope.displayCompany = $rootScope.accView.companyId;
		  $scope.displayfromDate = $rootScope.accView.fromDate;
		  $scope.displaytoDate = $rootScope.accView.toDate;
	/** End **/
  // An array of boolean to tell the directive which series we want to show
 
  
	  // console.log($rootScope.accView.companyId);
	  // console.log($rootScope.accView.fromDate);
	  // console.log($rootScope.accView.toDate);
	 
	
	
  $scope.TableData = function(){
	

	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  ledgerName: 'asc'     // initial sorting
		  }
	  }, {
		  counts: [],
		  total: data.length, // length of data
		  getData: function($defer, params) {
			
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

	//Date Convert
	$scope.dateConvert = function(entryDate){
		
		var entDate = entryDate.split("-").reverse().join("-");
		return entDate; 
	}
	
	$scope.sortComment = function(comment) {
		
		var getResdate = comment.entryDate;
		var splitedate = getResdate.split("-").reverse().join("-");
		var date = new Date(splitedate);
		return date;
		
	};
	
}
CrmClientHistoryController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","$timeout","getSetFactory","$state","$modal","$window","toaster","apiResponse"];