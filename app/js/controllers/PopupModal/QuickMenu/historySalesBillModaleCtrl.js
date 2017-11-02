
App.controller('historySalesBillModaleCtrl',historySalesBillModaleCtrl);

function historySalesBillModaleCtrl($scope, $modalInstance,$rootScope, $filter, ngTableParams,$http,apiCall,apiPath,flotOptions, colors,$timeout,$state,responseData,toaster,getSetFactory,draftOrSalesOrder,apiResponse) {
  'use strict';
  
	 var data = [];
	 
	$scope.responseData = responseData;
	$scope.noOfDecimalPoints = parseInt($scope.responseData[0].company.noOfDecimalPoints);
	$scope.dateFormats = $rootScope.dateFormats;
	$scope.draftOrSalesOrder = draftOrSalesOrder;
	
		$scope.stockModel=[];
 
  // $scope.stockModel.state;

    $scope.ok = function () {
      $modalInstance.close('closed');
    };
	
	$scope.closeButton = function () {

		$modalInstance.dismiss();
    };
	
    $scope.cancel = function () {
	
		$modalInstance.dismiss();
    };
	
	/**
		Page Code
	**/
		data = $scope.responseData;
		toaster.clear();

	  $scope.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  date: 'desc'     // initial sorting
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
						
				return dateA - dateB; //sort by date descending
			  });
			  orderedData = data;

			} else if(params.sorting().date === 'desc') {

			  data.sort(function (a, b) {
				  
				 var entDate = a.entryDate.split("-").reverse().join("-");
						var toDate = b.entryDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
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
	  
 
	//Date Convert
	
	$scope.dateConvert = function(entryDate){
		
		var entDate = entryDate.split("-").reverse().join("-");
		return entDate; 
	}
	// Addition With parse
	$scope.parseFloatAddition = function(total,tax){
		
		return $filter('setDecimal')(parseFloat(total),$scope.noOfDecimalPoints);
	}
	
	$scope.editDataViewSales = function(singleData){
		getSetFactory.blank();
		getSetFactory.set(singleData);
		$modalInstance.close();
	}

	/**
		End
	**/

	/** Set No of Product **/
	$scope.setLength = function(userProductArray){
		var jsonProductArray = angular.fromJson(userProductArray);
		return jsonProductArray.inventory.length;
	}
	/** End **/

	$scope.deleteDraft = function(uData){

		apiCall.deleteCall(apiPath.getSetDraft+'/'+uData.saleId).then(function(resonse){
			if(resonse == apiResponse.ok){
				data.splice(uData,1);
				$scope.tableParams.reload();
			}
		});
	}
}

historySalesBillModaleCtrl.$inject = ["$scope", "$modalInstance","$rootScope", "$filter", "ngTableParams","$http","apiCall","apiPath","flotOptions","colors","$timeout","$state","responseData","toaster","getSetFactory","draftOrSalesOrder","apiResponse"];
