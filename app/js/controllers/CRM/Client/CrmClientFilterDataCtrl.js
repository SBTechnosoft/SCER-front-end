
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
	
	$scope.sticker = [];
	$scope.filteredItems;
	
  var data = [];
	var flag = 0;
	
	//$scope.filterCompanyId = $rootScope.accView.companyId;
	$scope.clientContact = $rootScope.accView.clientContact;
	$scope.clientName = $rootScope.accView.clientName;
	$scope.professionId = $rootScope.accView.professionId;
	
	$scope.clientEmailId = $rootScope.accView.emailId;
	$scope.clientAddress = $rootScope.accView.address;
	
	$scope.invoiceNumber = $rootScope.accView.invoiceNumber;
	$scope.jobCardNumber = $rootScope.accView.jobCardNumber;
	
	$scope.displayfromDate = $rootScope.accView.fromDate;
	$scope.displaytoDate = $rootScope.accView.toDate;
	$scope.displayJobCardFromDate = $rootScope.accView.jobCardFromDate;  // Jobcard
	$scope.displayJobCardToDate = $rootScope.accView.jobCardToDate;		// Jobcard
	
	
	// console.log('Contact: '+$rootScope.accView.clientContact);
	// console.log('Name: '+$rootScope.accView.clientName);
	// console.log('Email: '+$rootScope.accView.emailId);
	// console.log('Address: '+$rootScope.accView.address);
	// console.log('Invoice: '+$rootScope.accView.invoiceNumber);
	// console.log('Jobcard: '+$rootScope.accView.jobCardNumber);
	// console.log('fromdate: '+$rootScope.accView.fromDate);
	// console.log('todate: '+$rootScope.accView.toDate);
	// console.log('JobacrdFrom: '+$rootScope.accView.jobCardFromDate);
	// console.log('JobcardTo: '+$rootScope.accView.jobCardToDate);
	
	
	/** Display Company and date **/
		function getClientFilterData(){
			
			var headerData = {'Content-Type': undefined};
			
			if($scope.displayfromDate != '1-1-1970'){
				headerData.invoiceFromDate = $scope.displayfromDate;
			}
			
			if($scope.displaytoDate != '1-1-1970'){
				headerData.invoiceToDate = $scope.displaytoDate;
			}
			
			if($scope.displayJobCardFromDate != '1-1-1970'){
				headerData.jobCardFromDate = $scope.displayJobCardFromDate;
			}
			
			if($scope.displayJobCardToDate != '1-1-1970'){
				headerData.jobCardToDate = $scope.displayJobCardToDate;
			}
			
			if($scope.clientContact != undefined && $scope.clientContact != ''){
				headerData.contactNo = $scope.clientContact;
			}
			
			if($scope.clientName != undefined && $scope.clientName != ''){
				headerData.clientName = $scope.clientName;
			}
			
			if($scope.professionId != undefined && $scope.professionId != ''){
				headerData.professionId = $scope.professionId;
			}
			
			if($scope.clientEmailId != undefined && $scope.clientEmailId != ''){
				headerData.emailId = $scope.clientEmailId;
			}
			
			if($scope.clientAddress != undefined && $scope.clientAddress != ''){
				headerData.address = $scope.clientAddress;
			}
			
			if($scope.invoiceNumber != undefined && $scope.invoiceNumber != ''){
				headerData.invoiceNumber = $scope.invoiceNumber;
			}
			
			if($scope.jobCardNumber != undefined && $scope.jobCardNumber != ''){
				headerData.jobCardNumber = $scope.jobCardNumber;
			}
			
			loadingStart();
			
			apiCall.getCallHeader(apiPath.getAllClient,headerData).then(function(res){
			
				toaster.clear();
				//console.log(res);
				
				if(angular.isArray(res)){
					
					data = res;
					var cnt = res.length;
					
					for(var i=0;i<cnt;i++){
						
						data[i].selected = false;
						data[i].stateAbb = "";
						data[i].stateAbb = res[i].state.stateName;
						data[i].cityName = "";
						data[i].cityName = res[i].city.cityName;
						data[i].professionName = "";
						data[i].professionName = res[i].profession.professionName;
					}
					
				}
				else{
					if(res == ''){
						toaster.pop('info', 'No Response From Server');
					}
					else{
						toaster.pop('info', res);
					}
				}
				
				TableData();
				
			});
		}
		
	getClientFilterData();
	/** End **/
	
	function loadingStart(){
		toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
	}
	// console.log($scope.filterCompanyId);
	// console.log($scope.displayfromDate);
	// console.log($scope.displaytoDate);
	
	//return false;
	$scope.checkAllArray = [];
	/** Api Call And NgTable **/
		
		function TableData(){
			 
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
				 
				  // use build-in angular filter
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "")  || (typeof(params.$params.filter.contactNo) != "undefined" && params.$params.filter.contactNo != "") || (typeof(params.$params.filter.stateAbb) != "undefined" && params.$params.filter.stateAbb != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "") || (typeof(params.$params.filter.address1) != "undefined" && params.$params.filter.address1 != "") || (typeof(params.$params.filter.professionName) != "undefined" && params.$params.filter.professionName != "") || (typeof(params.$params.filter.emailId) != "undefined" && params.$params.filter.emailId != "")))
				  {
						 var orderedData = params.filter() ?
						 $filter('filter')(data, params.filter()) :
						 data;
						$scope.filteredItems = orderedData;
						
						  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

						  params.total(orderedData.length); // set total for recalc pagination
						  $defer.resolve(vm.users);
				  

				  }
				else
				{
					   params.total(data.length);
					 $scope.filteredItems = data;
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
		if($scope.selectedBoxArray.length < 1){
			$scope.sticker.multiQty = 0;
		}
	}
  
	$scope.changeAllBox = function(box){
		
		if(box == false){
			$scope.clientFlag=0;
			$scope.selectedBoxArray = [];
			var cnt  = data.length;
			for(var k=0;k<cnt;k++){
				data[k].selected = false;
			}
		}
		else{
			$scope.clientFlag=1;
			$scope.selectedBoxArray = [];
			$scope.selectedBoxArray = $scope.filteredItems;
			var cnt  = $scope.selectedBoxArray.length;
			for(var k=0;k<cnt;k++){
				$scope.selectedBoxArray[k].selected = true;
			}
		}
	}
	
	/** Sticker Single **/
		$scope.singleStickerPrint = function(pData){
	
		var qty  = pData.qty;
		
		var mywindow = window.open('', 'PRINT', 'height=850,width=850');

		 var is_chrome = Boolean(mywindow.chrome);

		var clientAddress = pData.address1 ? pData.address1:'----------';
		var clientContactNo= pData.contactNo ? pData.contactNo:'0000000000';
		var clientEmailId = pData.emailId ? pData.emailId:'@@@@@@@@@@';
		
		var textContactNo = '',textAddress = '',textEmail = '';
		
		if(clientContactNo != ''){
			textContactNo = "<br /><span style='font-size:12px'><b style='font-size:18px; vertical-align:middle'>&#128241; </b>&nbsp;&nbsp;"+clientContactNo+"</span>";
		}
		if(clientAddress != ''){
			textAddress = "<br /><span style='font-size:13px'><b style='font-size:18px;vertical-align:middle'>&#127968; </b>"+clientAddress+"</span>";
		}
		if(clientEmailId != ''){
			textEmail = "<br /><span style='font-size:12px'><b style='font-size:18px; vertical-align:middle'>&#x2709; </b>&nbsp;"+clientEmailId+"</span>";
		}
		
		for(var n=0;n<qty;n++){
			console.log('in');
			mywindow.document.write('<html><!--head><title>' + document.title  + '</title>');
		
			mywindow.document.write("</head--> <style type='text/css' media='print'>@page {size: auto;margin: 0mm;} @media print {html, body {width: 7.4cm;height: 3.8cm;  }</style><body>");
			mywindow.document.write('<!--center> <h1> Barcode of Company </h1> </center-->');
			mywindow.document.write("<table><tr>");
		
			mywindow.document.write("<td style='display:inline-block;padding-top:0px;padding-bottom:5px;'> ");
			
			mywindow.document.write("<span style='font-size:14px'><b>"+pData.clientName +"</b></span>"+textAddress+textContactNo+textEmail+"</td>");
				
			mywindow.document.write("</tr></table>");
			mywindow.document.write('</body></html>');
			
			if(n == qty-1){
				/** Next Code **/
						console.log('End');
					if (is_chrome) {
						
					   setTimeout(function () { // wait until all resources loaded 
							mywindow.focus(); // necessary for IE >= 10
							mywindow.print();  // change window to mywindow
							mywindow.close();// change window to mywindow
						 }, 2000);
					}
					else {
						mywindow.document.close(); // necessary for IE >= 10
						mywindow.focus(); // necessary for IE >= 10
						mywindow.print();
						mywindow.close();
					}
					return true;
				/** End **/
			}
			else{
				mywindow.document.write("</td>");
			}
		}
	}
	
	
	$scope.multiStickerPrint = function(){
		
		if($scope.clientFlag == 1){
			var dataArrayLength = $scope.filteredItems.length;
		}
		else{
			var dataArrayLength = $scope.selectedBoxArray.length;
		}
		
		var mywindow = window.open('', 'PRINT', 'height=850,width=850');
	
		 var is_chrome = Boolean(mywindow.chrome);

		for(var dataIndex=0;dataIndex<dataArrayLength;dataIndex++){
			
			if($scope.clientFlag == 1){
				
				var arrayProductData = $scope.filteredItems[dataIndex];
			}
			else{
				var arrayProductData = $scope.selectedBoxArray[dataIndex];
			 }
			
			if($scope.sticker.multiQty > 0){
				
				var qtyLength = $scope.sticker.multiQty;
			}
			else{
				var qtyLength = arrayProductData.qty;
			}
			
			//Client Data
			var clientAddress = arrayProductData.address1 ? arrayProductData.address1:'----------';
			var clientContactNo= arrayProductData.contactNo ? arrayProductData.contactNo:'0000000000';
			var clientEmailId = arrayProductData.emailId ? arrayProductData.emailId:'@@@@@@@@@@';
			
			var textContactNo = '',textAddress = '',textEmail = '';
			
			if(clientContactNo != ''){
				textContactNo = "<br /><span style='font-size:12px'><b style='font-size:18px; vertical-align:middle'>&#128241; </b>&nbsp;&nbsp;"+clientContactNo+"</span>";
			}
			if(clientAddress != ''){
				textAddress = "<br /><span style='font-size:13px'><b style='font-size:18px;vertical-align:middle'>&#127968; </b>"+clientAddress+"</span>";
			}
			if(clientEmailId != ''){
				textEmail = "<br /><span style='font-size:12px'><b style='font-size:18px; vertical-align:middle'>&#x2709; </b>&nbsp;"+clientEmailId+"</span>";
			}
			//End Client Data
			
			for(var qtyIndex=0;qtyIndex<qtyLength;qtyIndex++){
				
				mywindow.document.write('<html>');
		
				mywindow.document.write("<style type='text/css' media='print'>@page {size: auto;margin: 0mm;} @media print {html, body {width: 7.4cm;height: 3.8cm;  }</style><body>");
				mywindow.document.write('<!--center> <h1> Barcode of Company </h1> </center-->');
				mywindow.document.write("<table><tr>");
		
				mywindow.document.write("<td style='display:inline-block;padding-top:5px;padding-bottom:5px;'> ");
				
				mywindow.document.write("<span style='font-size:14px'><b>"+arrayProductData.clientName +"</b></span>"+textAddress+textContactNo+textEmail+"</td>");
				
				mywindow.document.write("</tr></table>");
				mywindow.document.write('</body></html>');
	
			}
			
			if(dataIndex == dataArrayLength-1)
			{
				if (is_chrome) {
				   setTimeout(function () { // wait until all resources loaded 
						mywindow.focus(); // necessary for IE >= 10
						mywindow.print();  // change window to mywindow
						mywindow.close();// change window to mywindow
					 }, 2000);
				}
				else {
					mywindow.document.close(); // necessary for IE >= 10
					mywindow.focus(); // necessary for IE >= 10
					mywindow.print();
					mywindow.close();
				}
			
				// mywindow.focus(); // necessary for IE >= 10*/
				// mywindow.print();
				// mywindow.close();

				return true;
			}
		}
	}
	/** End **/
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
					toaster.clear();
					if(data == 'emailSuccess'){
						toaster.pop('success','Email Successfully Send');
					}
					else if(data == 'smsSuccess'){
						toaster.pop('success','SMS Successfully Send');
					}
				}, function () {
				  console.log('Cancel');
					Modalopened = false;
				});
			
			
		}
		
	/** End **/
	
	
	/** Client Update Modal **/
		$scope.editClientData = function(size,userData){
		
			toaster.clear();
			
			if (Modalopened) return;
			
			 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
		
			var modalInstance = $modal.open({
				templateUrl: 'app/views/PopupModal/CRM/clientForm.html',
				controller: 'clientFormModalController as form',
				resolve:{
					clientEditData: function(){
						return userData;
					}
				}
			});

			Modalopened = true;
		   
			modalInstance.opened.then(function() {
				toaster.clear();
			});
		
				modalInstance.result.then(function (data) {
					Modalopened = false;
					if(data == 'success'){
						toaster.pop('success','Updated Successfully');
					}
					
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