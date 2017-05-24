
/**=========================================================
 * Module: CrmClientFilterDataController.js
 * Controller for ngTables
 =========================================================*/

App.controller('CrmClientFilterDataController', CrmClientFilterDataController);

function CrmClientFilterDataController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,apiResponse,toaster,getSetFactory,$window,$state) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	
	var erpPath = $rootScope.erpPath;
	$scope.dateFormat =  $rootScope.dateFormats; //Date Format
	
  var data = [];
	var flag = 0;
	
	//$scope.filterCompanyId = $rootScope.accView.companyId;
	$scope.clientContact = $rootScope.accView.clientContact;
	$scope.clientName = $rootScope.accView.clientName;
	$scope.displayfromDate = $rootScope.accView.fromDate;
	$scope.displaytoDate = $rootScope.accView.toDate;
	
	
	
	/** Display Company and date **/
		$scope.getClientFilterData = function(){
			
			toaster.pop('wait', 'Please Wait', 'Data Loading....',30000);
			
			apiCall.getCall(apiPath.getAllClient).then(function(res){
			
				console.log(res);
				data = res;
				
				toaster.clear();
				
				$scope.TableData();
				
			});
		}
		
		$scope.getClientFilterData();
	/** End **/
	
	
	// console.log($scope.filterCompanyId);
	// console.log($scope.displayfromDate);
	// console.log($scope.displaytoDate);
	
	//return false;
	
	/** Api Call And NgTable **/
	
		$scope.getProduct = function(path,headerData){
		
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
				
			apiCall.getCallHeader(path,headerData).then(function(response){
				
				toaster.clear();
				console.log(response);
				if(apiResponse.noContent == response || apiResponse.notFound == response){
						
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Data Available');
					$scope.exportPdfHidden = false;
				}
				else{
					//console.log('else');
					data = response;
	
					$scope.exportPdfHidden = true;
				}
				
				$scope.TableData();
				
				 
			});
		}
		
		$scope.TableData = function(){
			 
		  vm.tableParams = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  invoiceNumber: 'asc'     // initial sorting
			  }
		  }, {
			  counts: [],
			  total: data.length, // length of data
			  getData: function($defer, params) {
				 
				  // if()
				  // {
					  // alert('yes');
				  // }
				  // else{
					  // alert('no');
				  // }
				  // use build-in angular filter
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.invoiceNumber) != "undefined" && params.$params.filter.invoiceNumber != "")  || (typeof(params.$params.filter.salesType) != "undefined" && params.$params.filter.salesType != "") || (typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "") || (typeof(params.$params.filter.advance) != "undefined" && params.$params.filter.advance != "") || (typeof(params.$params.filter.balance) != "undefined" && params.$params.filter.balance != "") || (typeof(params.$params.filter.tax) != "undefined" && params.$params.filter.tax != "") || (typeof(params.$params.filter.grandTotal) != "undefined" && params.$params.filter.grandTotal != "") || (typeof(params.$params.filter.additionalTax) != "undefined" && params.$params.filter.additionalTax != "")))
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
					
					 //alert('ggg');
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
		
	/** End **/
	
	$scope.goToClientTransaction = function(id){
		
		$state.go('app.CrmClientHistory');
	}
  
  
	//Date Convert
	
	$scope.dateConvert = function(entryDate){
		
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
					
					//alert('Something Wrong');
				}
			
			});
		}
	
	/*** End Pdf ***/

}
CrmClientFilterDataController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","apiResponse","toaster","getSetFactory","$window","$state"];