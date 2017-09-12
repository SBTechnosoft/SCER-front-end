
/**=========================================================
 * Module: AccTaxationController.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccTaxationController', AccTaxationController);

function AccTaxationController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,apiResponse,toaster,getSetFactory,$window,headerType) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	
	var erpPath = $rootScope.erpPath;
	$scope.dateFormat =  $rootScope.dateFormats; //Date Format
	
  var data = [];
  var data2 = [];
	var flag = 0;
	
	$scope.headerType = headerType;
	
	$scope.filterCompanyId = $rootScope.accView.companyId;
	$scope.displayfromDate = $rootScope.accView.fromDate;
	$scope.displaytoDate = $rootScope.accView.toDate;
	
	/** Display Company and date **/
		apiCall.getCall(apiPath.getAllCompany+'/'+$scope.filterCompanyId).then(function(res){
			
			$scope.displayCompany = res.companyName;
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',30000);
			
		});
		
	/** End **/
	
	// console.log($scope.filterCompanyId);
	// console.log($scope.displayfromDate);
	// console.log($scope.displaytoDate);
	// console.log($scope.headerType);
	// return false;
	
	/** Api Call And NgTable **/
	
		$scope.getProduct = function(path,headerData,flag = 0){
		
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
				
			apiCall.getCallHeader(path,headerData).then(function(response){
				
				toaster.clear();
				
				if(angular.isArray(response)){
					flag == 1 ? data2=response : data=response;
					// console.log(data2);
					// console.log(data);
					$scope.exportPdfHidden = true;
				}
				else{
					if(apiResponse.noContent == response || apiResponse.notFound == response){
						flag == 1 ? data2=[] : data=[];
						toaster.pop('alert', 'Opps!!', 'No Data Available');
						$scope.exportPdfHidden = false;
					}
				}
				flag == 1 ? $scope.TableData2() : $scope.TableData();
				
			});
		}
		
		$scope.TableData = function(){
			 
		  vm.tableParams = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  invoiceNumber: 'desc'     // initial sorting
			  }
		  }, {
			  counts: [],
			  total: data.length, // length of data
			  getData: function($defer, params) {
				  // use build-in angular filter
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.invoiceNumber) != "undefined" && params.$params.filter.invoiceNumber != "")  || (typeof(params.$params.filter.salesType) != "undefined" && params.$params.filter.salesType != "") || (typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "") || (typeof(params.$params.filter.advance) != "undefined" && params.$params.filter.advance != "") || (typeof(params.$params.filter.balance) != "undefined" && params.$params.filter.balance != "") || (typeof(params.$params.filter.tax) != "undefined" && params.$params.filter.tax != "") || (typeof(params.$params.filter.grandTotal) != "undefined" && params.$params.filter.grandTotal != "")))
				  {
						 var orderedData = params.filter() ?
						 $filter('filter')(data, params.filter()) :
						 data;
						  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
						  params.total(orderedData.length); // set total for recalc pagination
						  $defer.resolve(vm.users);
				  }
				else
				{
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
		
		$scope.TableData2 = function(){
			 
		  vm.tableParams2 = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  billNumber: 'desc'     // initial sorting
			  }
		  }, {
			  counts: [],
			  total: data2.length, // length of data
			  getData: function($defer, params) {
				  // use build-in angular filter
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.billNumber) != "undefined" && params.$params.filter.billNumber != "")  || (typeof(params.$params.filter.salesType) != "undefined" && params.$params.filter.salesType != "") || (typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "") || (typeof(params.$params.filter.advance) != "undefined" && params.$params.filter.advance != "") || (typeof(params.$params.filter.balance) != "undefined" && params.$params.filter.balance != "") || (typeof(params.$params.filter.tax) != "undefined" && params.$params.filter.tax != "") || (typeof(params.$params.filter.grandTotal) != "undefined" && params.$params.filter.grandTotal != "") || (typeof(params.$params.filter.additionalTax) != "undefined" && params.$params.filter.additionalTax != "")))
				  {
						 var orderedData = params.filter() ?
						 $filter('filter')(data2, params.filter()) :
						 data2;
						  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
						  params.total(orderedData.length); // set total for recalc pagination
						  $defer.resolve(vm.users);
				  }
				else
				{
					params.total(data2.length);
				}
				 
				 if(!$.isEmptyObject(params.$params.sorting))
				  {
					  var orderedData = params.sorting() ?
							  $filter('orderBy')(data2, params.orderBy()) :
							  data2;
					  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				  }
				
				$scope.totalData2 = data2.length;
				$scope.pageNumber2 = params.page();
				$scope.itemsPerPage2 = params.count();
				$scope.totalPages2 = Math.ceil($scope.totalData2/params.count());
				  }
		  });
		}
		
	/** End **/
	var headerData = {'Content-Type': undefined,'fromDate':$scope.displayfromDate,'toDate':$scope.displaytoDate};
	var getJrnlPath;
	if($scope.headerType == 'salesTaxation'){
		
		getJrnlPath = apiPath.getSalesTax+$scope.filterCompanyId;
		$scope.getProduct(getJrnlPath,headerData);
	}
	else if($scope.headerType == 'purchaseTaxation'){
		
		getJrnlPath = apiPath.getPurchaseTax+$scope.filterCompanyId;
		$scope.getProduct(getJrnlPath,headerData);
	}
	else if($scope.headerType == 'purchaseDetailTaxation'){
		
		getJrnlPath = apiPath.getPurchaseDetail+$scope.filterCompanyId;
		$scope.getProduct(getJrnlPath,headerData);
	}
	else if($scope.headerType == 'GST Return'){
		
		getJrnlPath = apiPath.getGstReturn+$scope.filterCompanyId;
		
		var getJrnlPath2 = apiPath.getPurchaseTax+$scope.filterCompanyId;
		$scope.getProduct(getJrnlPath2,headerData,1);
		
		var getJrnlPath3 = apiPath.getSalesTax+$scope.filterCompanyId;
		$scope.getProduct(getJrnlPath3,headerData);
		
	}
  
	/** Demo **/
		apiCall.getCallHeader('accounting/taxation/stock-detail/company/'+$scope.filterCompanyId,headerData).then(function(res){
			
			console.log('Reema, Your Testing Response is Below :)');
			console.log(res);
			console.log('Your Testing Response is Finish');
			
		});
		
	/** End **/
	
	$scope.refreshTable = function(){
		
		vm.tableParams.reload();
		vm.tableParams2.reload();
		console.log(data2);
	}
	//Date Convert
	
	$scope.dateConvert = function(entryDate){
		if(entryDate === undefined){
            return false;
        }
		var entDate = entryDate.split("-").reverse().join("-");
		return entDate; 
	}
	
  /*** Pdf ***/
	
		$scope.generatePdf = function(operation){
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', operation.toUpperCase()+' Loading...');
			var getData = {"Content-Type": undefined,'fromDate':$scope.displayfromDate,'toDate':$scope.displaytoDate};
			getData.operation = operation;
			
			apiCall.getCallHeader(getJrnlPath,getData).then(function(responseDrop){
			
				//console.log(responseDrop);
				toaster.clear();
				
				if(angular.isObject(responseDrop)  && responseDrop.hasOwnProperty('documentPath')){
					var pdfPath = erpPath+responseDrop.documentPath;
					$window.open(pdfPath,"_self");
				}
				else{
					
					if(responseDrop.status == 500){
						toaster.pop('warning', 'Opps!', responseDrop.statusText);
					}
					else{
						toaster.pop('warning', 'Opps!', responseDrop);
					}
				}
			});
		}
	
	/*** End Pdf ***/

}
AccTaxationController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","apiResponse","toaster","getSetFactory","$window","headerType"];