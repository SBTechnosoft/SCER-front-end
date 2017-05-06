
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('AccViewDataController', AccViewDataController);

function AccViewDataController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,flotOptions, colors,$timeout,getSetFactory,$state,headerType,$modal,$window,toaster,apiResponse) {
  'use strict';
  var vm = this;
  var data = [];
  var formdata = new FormData();
  $scope.billData = [];
  
  var Modalopened = false;
  
	$scope.erpPath = $rootScope.erpPath; //Erp Path
	
	$scope.dateFormat =  $rootScope.dateFormats; //Date Format
   
	/** Display Company and date **/
		apiCall.getCall(apiPath.getAllCompany+'/'+$rootScope.accView.companyId).then(function(res){
			
			$scope.displayCompany = res.companyName;
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',30000);
			
		});
		// $scope.displayCompany = $rootScope.accView.companyId;
		  $scope.displayfromDate = $rootScope.accView.fromDate;
		  $scope.displaytoDate = $rootScope.accView.toDate;
	/** End **/
  // An array of boolean to tell the directive which series we want to show
  $scope.areaSeries = [true, true];
  vm.chartAreaFlotChart  = flotOptions['area'];
  
   vm.chartPieFlotChart  = flotOptions['pie'];
  
	$scope.headerType = headerType;
	
	//alert(headerType);
	
	if($scope.headerType == 'sales'){
		
		var getJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':$rootScope.accView.salesType};
	}
	else if($scope.headerType == 'Wholesales'){
		
		var getJrnlPath = apiPath.getBill+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'salestype':'whole_sales'};
	}
	else if($scope.headerType == 'Retailsales'){
		
		var getJrnlPath = apiPath.getBill+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'salestype':'retail_sales'};
	}
	else if($scope.headerType == 'purchase'){
		
		var getJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':'purchase'};
	}
	else if($scope.headerType == 'payment'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		 var headerData = {'Content-Type': undefined,'journalType':'payment','fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
	else if($scope.headerType == 'receipt'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		// var headerData = {'Content-Type': undefined,'fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate,'type':'sales'};
		var headerData = {'Content-Type': undefined,'journalType':'receipt','fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
	else if($scope.headerType == 'specialJournal'){
		
		var getJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		//console.log(getJrnlPath);
		var headerData = {'Content-Type': undefined,'journalType':'special_journal','fromDate':$rootScope.accView.fromDate,'toDate':$rootScope.accView.toDate};
	}
  
	  // console.log($rootScope.accView.companyId);
	  // console.log($rootScope.accView.fromDate);
	  // console.log($rootScope.accView.toDate);
	  
		apiCall.getCallHeader(getJrnlPath,headerData).then(function(response){
			
			//console.log(response);
			
			toaster.clear();
			
			if(apiResponse.notFound == response){
				
				//data = [];
				
				toaster.pop('alert', 'Opps!!', 'No Data Found');
			}
			else{
				
				data = response;
			
				if($scope.headerType == 'Wholesales' || $scope.headerType == 'Retailsales'){
					
					$scope.billData = response;
					
					var cnt = data.length;
					for(var p=0;p<cnt;p++){
						
						data[p].repeatIcon = false;
						data[p].imageIcon = false;
						data[p].pdfIcon = false;
						data[p].singlePdfIcon = false;
						
						var fileCnt = data[p].file.length;
						
						var flag = 0;
						var imageFlag = 0;
						
						for(var k=0;k<fileCnt;k++){
						
							if(data[p].file[k].documentFormat == 'pdf' && data[p].file[k].documentType == 'bill')
							{
								flag++;
							}
							
							if(data[p].file[k].documentFormat == 'jpg' || data[p].file[k].documentFormat == 'jpeg' || data[p].file[k].documentFormat == 'png'){
								
								imageFlag = 1;
							}
						}
						
						if(flag == 0){
							
							data[p].repeatIcon = true;
							
						}
						else if(flag == 1){
							
							data[p].singlePdfIcon = true;
						}
						else{
							
							data[p].pdfIcon = true;
						}
						
						if(imageFlag == 1){
							
							
							data[p].imageIcon = true;
							
						}

						
					}
					
					$scope.contents = data;
					
					
					$scope.contents.sort(function(a, b){
						var entDate = a.entryDate.split("-").reverse().join("-");
						var toDate = b.entryDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
						return dateB-dateA; 
					});
					
					data= $scope.contents;
					//data.slice().reverse();
			
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
						  
							vm.pieChartData[0]["data"] = parseInt(vm.pieChartData[0]["data"]) + parseFloat(data[i].amount);
							var date = data[i].entryDate;
							var splitedate = date.split("-").reverse().join("-");
							var getdate = new Date(splitedate);
							var month = getdate.getMonth();
							
								vm.pieFlotCharts[0]["data"][month][1] = parseInt(vm.pieFlotCharts[0]["data"][month][1]) + parseFloat(data[i].amount);
								
							//console.log(vm.pieFlotCharts[0]["data"][0][1] = parseInt(vm.pieFlotCharts[0]["data"][0][1]) + parseInt(data[i].amount));
						
						}
						else{
							vm.pieChartData[1]["data"] = parseInt(vm.pieChartData[1]["data"]) + parseFloat(data[i].amount);
							
							var date = data[i].entryDate;
							var splitedate = date.split("-").reverse().join("-");
							var getdate = new Date(splitedate);
							var month = getdate.getMonth();
							
								vm.pieFlotCharts[1]["data"][month][1] = parseInt(vm.pieFlotCharts[1]["data"][month][1]) + parseFloat(data[i].amount);
							   
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
					// for (var i = 0; i < data.length; i++) {
					  // data[i].cityName = ""; //initialization of new property 
					  // data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
					// }
				}
			 
			}
		}).catch(function (reason) {
			 // err
			 if (reason.status === 500) {
				// do something
				
				alert('Encountered server error');
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
		  counts: [],
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  /** NgTable **/
			  // if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.ledgerName) != "undefined" && params.$params.filter.ledgerName != "")  || (typeof(params.$params.filter.entryDate) != "undefined" && params.$params.filter.entryDate != "") || (typeof(params.$params.filter.amount) != "undefined" && params.$params.filter.amount != "")|| (typeof(params.$params.filter.amountTypeCredit) != "undefined" && params.$params.filter.amountTypeCredit != "")|| (typeof(params.$params.filter.amountTypeDebit) != "undefined" && params.$params.filter.amountTypeDebit != "")))
			  // {
					 // var orderedData = params.filter() ?
					 // $filter('filter')(data, params.filter()) :
					 // data;

					  // vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  // params.total(orderedData.length); // set total for recalc pagination
					  // $defer.resolve(vm.users);
			  

			  // }
			  // else{
				  
				   // params.total(data.length);
				  
			  // }
			 
			 // if(!$.isEmptyObject(params.$params.sorting))
			  // {
				
				  // var orderedData = params.sorting() ?
						  // $filter('orderBy')(data, params.orderBy()) :
						  // data;
		  
				  // $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			  // }
			  
			// $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			/** ngTable **/
			
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

	
	$scope.saleTableData = function(){
	
		

	  vm.tableParams = new ngTableParams({
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
					
        
			  /** NgTable **/
				  // if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.entryDate) != "undefined" && params.$params.filter.entryDate != "")  || (typeof(params.$params.filter.clientName) != "undefined" && params.$params.filter.clientName != "") || (typeof(params.$params.filter.companyName) != "undefined" && params.$params.filter.companyName != "") || (typeof(params.$params.filter.total) != "undefined" && params.$params.filter.total != "") || (typeof(params.$params.filter.advance) != "undefined" && params.$params.filter.advace != "") || (typeof(params.$params.filter.balance) != "undefined" && params.$params.filter.balance != "")))
				  // {
						 // var orderedData = params.filter() ?
						 // $filter('filter')(data, params.filter()) :
						 // data;

						  // vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

						  // params.total(orderedData.length); // set total for recalc pagination
						  // $defer.resolve(vm.users);
				  

				  // }
				  // else{
					  
					   // params.total(data.length);
					  
				  // }
				 
				 // if(!$.isEmptyObject(params.$params.sorting))
				  // {
					
					  // var orderedData = params.sorting() ?
							  // $filter('orderBy')(data, params.orderBy()) :
							  // data;
			  
					  // $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				  // }
			/** End **/
		  }
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
	
	/** Edit Bill **/
	
	if($scope.headerType == 'Wholesales' || $scope.headerType == 'Retailsales'){
		
		$scope.editDataViewSales = function(id){
			
			//alert(id);
			
			// $scope.singleBillData = $scope.returnSingleData(id);
			
			// console.log($scope.singleBillData);
			
			getSetFactory.set($scope.returnSingleData(id));
			
			//console.log(getSetFactory.get());
			
			if($scope.headerType == 'Retailsales'){
			
				$state.go("app.RetailsaleBill");
			
			}
			else if($scope.headerType == 'Wholesales'){
				
				$state.go("app.WholesaleBill");
			}
			
			//getSetFactory.blank();
			
		}
	}
	/** End Edit Bill **/
	
  $scope.deleteDataView = function(id)
  {
	
	// var deletePath = apiPath.getAllBranch+'/'+parseInt(branch_id);
	  
	// apiCall.deleteCall(deletePath).then(function(deleteres){
		
		// console.log(deleteres);
	 
	// });
  }
  
	$scope.deleteBill = function(size,id)
	{
		
		toaster.clear();
		if (Modalopened) return;
		
		var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
			  controller: deleteDataModalController,
			  size: size
			});

		Modalopened = true;
		
		modalInstance.result.then(function () {
		 
		 console.log('ok');
		 
		// return false;
		 /**Delete Code **/
			var deletePath = apiPath.postBill+'/'+id;
		  
			apiCall.deleteCall(deletePath).then(function(deleteres){
				
				//console.log(deleteres);
				if(apiResponse.ok == deleteres){
					
					$scope.reLoadPdfData();
				
					toaster.pop('success', 'Title', 'Data Successfully Deleted');
				}
				else{
					toaster.pop('warning', '', deleteres);
				}
			 
			});
		 /** End **/
		 
		 Modalopened = false;
		
		}, function () {
			
		  console.log('Cancel');	
		  Modalopened = false;
		  
		});
		
		
	}
  
	
	$scope.returnSingleData = function(saleId){
		
		var tempObject = {};
		
		for(var i=0;i<$scope.billData.length;i++){
			
			var billdata = $scope.billData[i];
			if(billdata.saleId == saleId){
				
				tempObject = billdata;
			}
			
		}
		
		return tempObject;
	}
	
	//Date Convert
	
	$scope.dateConvert = function(entryDate){
		
		var entDate = entryDate.split("-").reverse().join("-");
		
		return entDate; 
	}
	
	/** Reload Load Data **/
		$scope.reLoadPdfData = function(){
			
			apiCall.getCallHeader(getJrnlPath,headerData).then(function(response){
				
				console.log('in Success');
				//console.log(response);
				if(apiResponse.notFound != response){
					
				
				data = response;
				
				$scope.billData = response;
				
				var cnt = data.length;
				for(var p=0;p<cnt;p++){
					
					data[p].repeatIcon = false;
					data[p].imageIcon = false;
					data[p].pdfIcon = false;
					data[p].singlePdfIcon = false;
					
					var fileCnt = data[p].file.length;
					
					var flag = 0;
					var imageFlag = 0;
					
					for(var k=0;k<fileCnt;k++){
					
						if(data[p].file[k].documentFormat == 'pdf' && data[p].file[k].documentType == 'bill')
						{
							flag++;
						}
						
						if(data[p].file[k].documentFormat == 'jpg' || data[p].file[k].documentFormat == 'jpeg' || data[p].file[k].documentFormat == 'png'){
							
							imageFlag = 1;
						}
					}
					
					if(flag == 0){
						
						data[p].repeatIcon = true;
						
					}
					else if(flag == 1){
						
						data[p].singlePdfIcon = true;
					}
					else{
						
						data[p].pdfIcon = true;
					}
					
					if(imageFlag == 1){
						
						
						data[p].imageIcon = true;
						
					}

					
				}
				
			}
			else{
				
				data = [];
				
				toaster.pop('alert', 'Opps!!', 'No Data Found');
			}
				vm.tableParams.reload();
				vm.tableParams.page(1);
				
		
			});
		}
	/** End Reaload Pdf Data **/
	
	/** Regenerate Pdf **/
		
		$scope.reGeneratePdf = function(sId){
			
			//alert(sId);
			var reFormData = new FormData();
			reFormData.append('saleId',sId);
			
			apiCall.postCall(apiPath.reGeneratePdf,reFormData).then(function(response){
			
				//console.log(response);
				
				if(angular.isObject(response)){
					
					toaster.pop('success', 'Title', 'Generate Pdf Successfully');
					
					var pdfPath = $scope.erpPath+response.documentPath;
					$window.open(pdfPath, '_blank');
					
					$scope.reLoadPdfData();
				}
				else{
					
					alert(response);
				}
				
			});
			
		}
		
	/** End Regenerate Pdf **/
	
	/**
	Image Gallery  Modal 
	**/
	
	$scope.openImageGallery = function (size,saleId) {

		if (Modalopened) return;
		
		$scope.singleBillData = $scope.returnSingleData(saleId);
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/imageGalleryModal/imageGalleryModalContent.html',
		  controller: imageGalleryModalCtrl,
		  size: size,
		  resolve:{
			  billData: function(){
				 
				return $scope.singleBillData;
			  },
			  formatType: function(){
				  
				 return 'image';
			  },
			  transType: function(){
				  
				  return 'none';
			  }
		  }
		});
	
		Modalopened = true;
	   
		modalInstance.result.then(function () {
		 
			Modalopened = false;
			
		}, function () {
			
			console.log('Cancel');	
			Modalopened = false;
		  
		});
		
	
	};
	
	/**
	End Image Gallery  Modal 
	**/
	
	/**
	Pdf  Modal 
	**/
	
	$scope.openPdf = function (size,saleId) {

		if (Modalopened) return;
		
		$scope.singleBillData = $scope.returnSingleData(saleId);
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/imageGalleryModal/imageGalleryModalContent.html',
		  controller: imageGalleryModalCtrl,
		  size: size,
		  resolve:{
			  billData: function(){
				 
				return $scope.singleBillData;
			  },
			  formatType: function(){
				  
				 return 'pdf';
			  },
			  transType: function(){
				  
				  return 'none';
			  }
		  }
		});

	   Modalopened = true;
	   
		modalInstance.result.then(function () {
		 
			Modalopened = false;
		
		}, function () {
			
		  console.log('Cancel');	
		  Modalopened = false;
		  
		});
		
	
	};
	
	/**
	End Pdf  Modal 
	**/
	
	
	/**
	Payment  Modal 
	**/
	
	$scope.openPayment = function (size,saleId,transaction) {

		if (Modalopened) return;
		
		$scope.singleBillData = $scope.returnSingleData(saleId);
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/imageGalleryModal/imageGalleryModalContent.html',
		  controller: 'imageGalleryModalCtrl as fromData',
		  size: size,
		  resolve:{
			  billData: function(){
				 
				return $scope.singleBillData;
			  },
			  formatType: function(){
				  
				 return 'payment';
			  },
			  transType: function(){
				  
				  return transaction;
			  }
		  }
		});

	   Modalopened = true;
	   
		modalInstance.result.then(function (msg) {
		 
			if(msg == 'payment'){
				
				msg = 'Payment';
			}
			else{
				msg = 'Refund';
			}
			
			toaster.pop('success', 'Title', msg+' Successfully Done');
			/** Reload Load Data **/
				$scope.reLoadPdfData();
			/** End **/
			
			console.log('success');
			Modalopened = false;
			
		}, function () {
			
			console.log('Cancel');
			Modalopened = false;
			
		});
		
	
	};
	
	/**
	End Payment  Modal 
	**/
	
	$scope.sortComment = function(comment) {
		var getResdate = comment.entryDate;
			var splitedate = getResdate.split("-").reverse().join("-");
    var date = new Date(splitedate);
    return date;
};
	
}
AccViewDataController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","apiCall","apiPath","flotOptions","colors","$timeout","getSetFactory","$state","headerType","$modal","$window","toaster","apiResponse"];