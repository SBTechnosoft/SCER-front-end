
/**=========================================================
 * Module: CrmClientFilterDataController.js
 * Controller for ngTables
 =========================================================*/

App.controller('CrmClientFilterDataController', CrmClientFilterDataController);

function CrmClientFilterDataController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,apiResponse,toaster,getSetFactory,$window,$state,$modal) {
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
	
	$scope.clientEmailId = $rootScope.accView.emailId;
	$scope.clientAddress = $rootScope.accView.address;
	
	$scope.invoiceNumber = $rootScope.accView.invoiceNumber;
	$scope.jobCardNumber = $rootScope.accView.jobCardNumber;
	
	$scope.displayfromDate = $rootScope.accView.fromDate;
	$scope.displaytoDate = $rootScope.accView.toDate;
	$scope.displayJobCardFromDate = $rootScope.accView.jobCardFromDate;  // Jobcard
	$scope.displayJobCardToDate = $rootScope.accView.jobCardToDate;		// Jobcard
	
	
	console.log('Contact: '+$rootScope.accView.clientContact);
	console.log('Name: '+$rootScope.accView.clientName);
	console.log('Email: '+$rootScope.accView.emailId);
	console.log('Address: '+$rootScope.accView.address);
	console.log('Invoice: '+$rootScope.accView.invoiceNumber);
	console.log('Jobcard: '+$rootScope.accView.jobCardNumber);
	console.log('fromdate: '+$rootScope.accView.fromDate);
	console.log('todate: '+$rootScope.accView.toDate);
	console.log('JobacrdFrom: '+$rootScope.accView.jobCardFromDate);
	console.log('JobcardTo: '+$rootScope.accView.jobCardToDate);
	
	
	/** Display Company and date **/
		$scope.getClientFilterData = function(){
			
			var headerData = {'Content-Type': undefined};
			
			headerData.fromDate = $scope.displayfromDate;
			headerData.toDate = $scope.displaytoDate;
			
			headerData.jobCardFromDate = $scope.displayJobCardFromDate;
			headerData.jobCardToDate = $scope.displayJobCardToDate;
			
			if($scope.clientContact != undefined || $scope.clientContact != ''){
				headerData.contactNo = $scope.clientContact;
			}
			
			if($scope.clientName != undefined || $scope.clientName != ''){
				headerData.clientName = $scope.clientName;
			}
			
			if($scope.clientEmailId != undefined || $scope.clientEmailId != ''){
				headerData.emailId = $scope.clientEmailId;
			}
			
			if($scope.clientAddress != undefined || $scope.clientAddress != ''){
				headerData.address = $scope.clientAddress;
			}
			
			if($scope.invoiceNumber != undefined || $scope.invoiceNumber != ''){
				headerData.invoiceNumber = $scope.invoiceNumber;
			}
			
			if($scope.jobCardNumber != undefined || $scope.jobCardNumber != ''){
				headerData.jobCardNumber = $scope.jobCardNumber;
			}
			
			toaster.pop('wait', 'Please Wait', 'Data Loading....',30000);
			
			apiCall.getCallHeader(apiPath.getAllClient,headerData).then(function(res){
			
				toaster.clear();
				
				//console.log(res);
				
				if(angular.isArray(res)){
					
					data = res;
					var cnt = res.length;
					
					for(var i=0;i<cnt;i++){
						
						data[i].selected = false;
						data[i].stateAbb = "";
						data[i].stateAbb = res[i].state.stateAbb;
						data[i].cityName = "";
						data[i].cityName = res[i].city.cityName;
					}
					
				}
				else{
					toaster.pop('warning', res);
				}
				
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
		
		$scope.TableData = function(){
			 
		  vm.tableParams = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  clientName: 'asc'     // initial sorting
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
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "")  || (typeof(params.$params.filter.contactNo) != "undefined" && params.$params.filter.contactNo != "") || (typeof(params.$params.filter.stateAbb) != "undefined" && params.$params.filter.stateAbb != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "") || (typeof(params.$params.filter.address1) != "undefined" && params.$params.filter.address1 != "")))
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
	
	$scope.goToClientTransaction = function(id,tab = "",group=""){
		
		if(group == ""){
			getSetFactory.blank();
			var obj = {};
			obj.id = id;
			obj.tab = tab;
			getSetFactory.set(obj);
			
			if(tab == ""){
				$state.go('app.CrmClientHistory');
			}
			else{
				
				if(tab == 'email'){
					$state.go('app.CrmClientHistory.compose');
				}
				else{
					$state.go('app.CrmClientHistory.sms');
				}
			}
		}
		else{
			$scope.emailSmsPopup('lg',tab);
		}
		
	}
  
	$scope.selectedBoxArray = [];
	$scope.clientFlag=0;
	
	$scope.changeBox = function(box,pData){
		
		//console.log(box+'...'+pData);
		if(box == true){
			
			$scope.selectedBoxArray.push(pData);
			
		}
		else{
			
			var index = $scope.selectedBoxArray.indexOf(pData);
			$scope.selectedBoxArray.splice(index,1);
		}
	
		console.log($scope.selectedBoxArray);
	}
  
	$scope.changeAllBox = function(box){
		
		
		if(box == false){
			
			$scope.clientFlag=0;
			$scope.selectedBoxArray = [];
			
		}
		else{
			
			$scope.clientFlag=1;
			
		}
		
	}
	
	/** Email/SMS Popup **/
		var Modalopened = false;
		
		$scope.emailSmsPopup = function(size,tab){
		
			toaster.clear();
			
			if (Modalopened) return;
			
			 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
		
			var modalInstance = $modal.open({
				templateUrl: 'app/views/PopupModal/CRM/emailSms.html',
				controller: emailSmsModalController,
				resolve:{
					clientArrayData: function(){
						return $scope.selectedBoxArray;
					},
					emailSMS: function(){
					 
						return tab;
					}
				}
			});

			Modalopened = true;
		   
			modalInstance.opened.then(function() {
				toaster.clear();
			});
		
				modalInstance.result.then(function (data) {
				
					
					Modalopened = false;
					
				}, function () {
				  console.log('Cancel');
					Modalopened = false;
				});
			
			
		}
		
	/** End **/
	
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
CrmClientFilterDataController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","apiResponse","toaster","getSetFactory","$window","$state","$modal"];