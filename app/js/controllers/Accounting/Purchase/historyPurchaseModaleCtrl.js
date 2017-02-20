
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
$.getScript('app/vendor/ng-table/ng-table.min.js');
$.getScript('app/vendor/ng-table/ng-table.min.css');
// $.getScript('app/vendor/Flot/jquery.flot.js');
// $.getScript('app/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js');
// $.getScript('app/vendor/Flot/jquery.flot.resize.js');
// $.getScript('app/vendor/Flot/jquery.flot.pie.js');
// $.getScript('app/vendor/Flot/jquery.flot.time.js');
// $.getScript('app/vendor/Flot/jquery.flot.categories.js');
// $.getScript('app/vendor/flot-spline/js/jquery.flot.spline.min.js');

App.controller('historyPurchaseModaleCtrl',historyPurchaseModaleCtrl);

function historyPurchaseModaleCtrl($scope, $modalInstance,$rootScope, $filter, ngTableParams,$http,apiCall,apiPath,flotOptions, colors,$timeout,getSetFactory,$state,companyId) {
  'use strict';
  
	 var data = [];
	  $scope.CompanyID = companyId;
	  
	   $scope.displayCompany = $scope.CompanyID.companyName;
	  
		$scope.stockModel=[];
 
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.ok = function () {
      $modalInstance.close('closed');
    };
	
	$scope.closeButton = function () {

		$modalInstance.dismiss();
    };
	
    $scope.cancel = function () {
	
		if($scope.stockModel)
		 {
			$rootScope.ArraystockModel=[];
			$rootScope.ArraystockModel.state=$scope.stockModel.state;
			$rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			$rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 }
		$modalInstance.dismiss();
    };
	
	/**
		Page Code
	**/
	
		// An array of boolean to tell the directive which series we want to show
		// $scope.areaSeries = [true, true];
		// $scope.chartAreaFlotChart  = flotOptions['area'];
		// $scope.chartPieFlotChart  = flotOptions['pie'];
		
		 var getJrnlPath = apiPath.getLedgerJrnl+$scope.CompanyID.companyId;
	  
	  //console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'type':'purchase'};
	   
			
		apiCall.getCallHeader(getJrnlPath,headerData).then(function(response){
			
			console.log(response);
			data = response;
			
			// for (var i = 0; i < data.length; i++) {
			  // data[i].cityName = ""; //initialization of new property 
			  // data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
			// }
			
			 $scope.TableData();
		 
		});
	
	
  $scope.TableData = function(){
	

	  $scope.tableParams = new ngTableParams({
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

					  $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  params.total(orderedData.length); // set total for recalc pagination
					  $defer.resolve($scope.users);
			  

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
			  
			$scope.totalData = data.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
			
		  }
	  });
	  
  }
	/**
		End
	**/
}

historyPurchaseModaleCtrl.$inject = ["$scope", "$modalInstance","$rootScope", "$filter", "ngTableParams","$http","apiCall","apiPath","flotOptions","colors","$timeout","getSetFactory","$state","companyId"];
