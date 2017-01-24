
/**=========================================================
 * Module: AccSalesController.js
 * Controller for input components
 =========================================================*/


App.controller('AccSalesController', AccSalesController);

function AccSalesController($scope,apiCall,apiPath,$modal,$rootScope,getSetFactory,toaster,apiResponse,validationMessage,productArrayFactory) {
  'use strict';
  
 // $templateCache.remove($state.current.templateUrl);
   //alert($state.current.templateUrl);
  var vm = this;   
  $scope.accSales = [];
  var formdata = new FormData();
  $scope.totalTable;
  $scope.grandTotalTable;
 $scope.accSales.demotax;
 $scope.accSales.tax = 0;
  
  $scope.totalDebit; // sum of Debit Amount
  $scope.totalCredit;  // sum of Credit Amount
  
  $scope.productArrayFactory = productArrayFactory;
  
  $scope.accSales.jfid; // JFID
  
  vm.AccClientMultiTable = []; // Journal Table Array
  vm.multiCurrentBalance = []; // Current Balance Array For Journal Table
  $scope.changeJrnlArray = false; // Change When Update in Journal Table Array
  
  vm.AccSalesTable = []; // Product Table Array
  vm.productTax = []; //product Tax
  $scope.changeProductArray = false; // Change When Update in Product Table Array
  
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
  
  /**
	Jsuggest Debit/Credit
	**/
	
	//Auto suggest Client Name For Debit
	vm.clientNameDropDr=[];
	var headerDr = {'Content-Type': undefined,'ledgerGroup':[9,12,32,16,17]};
	// var headerDr = {'Content-Type': undefined};
	
	//Auto suggest Client Name For Credit
	vm.clientNameDropCr=[];
	var headerCr = {'Content-Type': undefined,'ledgerGroup':[28]};
	// var headerCr = {'Content-Type': undefined};
	
	/**
		End
		**/
  
  //Company dropDown
	vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
	
	});
	
	$scope.defaultCompany = function(){
		
		//Set default Company
		apiCall.getDefaultCompany().then(function(response){
		
			$scope.accSales.companyDropDown = response;
			
			if(formdata.has('companyId')){
				
				formdata.delete('companyId');
			}
			
			formdata.append('companyId',response.companyId);
			
			vm.clientNameDropDr=[];
			vm.clientNameDropCr=[];
			
			//Auto suggest Client Name For Debit
			var jsuggestPath = apiPath.getLedgerJrnl+response.companyId;
			
			apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){
				
				console.log(response3);
				if(response3 != apiResponse.notFound){
					
					for(var t=0;t<response3.length;t++){
						
						for(var k=0;k<response3[t].length;k++){
							
							vm.clientNameDropDr.push(response3[t][k]);
						}
						
					}
					
				}
			
			});
			
			apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){
				
				if(response3 != apiResponse.notFound){
					
					for(var t=0;t<response3.length;t++){
						
						for(var k=0;k<response3[t].length;k++){
							
							vm.clientNameDropCr.push(response3[t][k]);
						}
						
					}
				}
			
			});
			
			//Auto Suggest Product Dropdown data
			vm.productNameDrop = [];
			
			apiCall.getCall(apiPath.getProductByCompany+response.companyId+'/branch').then(function(responseDrop){
				
				vm.productNameDrop = responseDrop;
			
			});
		
		});
		
	}
	
	// Datepicker
  // ----------------------------------- 
	this.minStart = new Date();
	this.maxStart = new Date();
  this.today = function() {
    this.dt1 = new Date();
  };
  this.today();

  this.clear = function () {
    this.dt1 = null;
  };

  // Disable weekend selection
  this.disabled = function(date, mode) {
    return false; //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  this.toggleMin = function() {
    this.minDate = this.minDate ? null : new Date();
  };
  this.toggleMin();

  this.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.opened = true;
  };
  
  this.openStart = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStart = true;
  };

  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  this.initDate = new Date('2016-15-20');
  this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = this.formats[0];
  
  //DatePicker End

  //Update Set
  if(Object.keys(getSetFactory.get()).length){
		
		$scope.accSales.getSetJrnlId = getSetFactory.get();
		//$scope.accSales.jfid = $scope.accSales.getSetJrnlId;
		//console.log($scope.accSales.getSetJrnlId);
		getSetFactory.blank();
		
		//var getOneJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
		var getOneJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
		console.log(getOneJrnlPath);
		
		var headerDataEdit = {'Content-Type': undefined,'type':'sales','jfId':parseInt($scope.accSales.getSetJrnlId)};
	   
			
		apiCall.getCallHeader(getOneJrnlPath,headerDataEdit).then(function(data){
		
			console.log(data);
			
			
			//Set JFID
			$scope.accSales.jfid = data.journal[0].jfId;
			//console.log('JFID...'+$scope.accSales.jfid);
			
			//Set Invoice Number
			$scope.accSales.invoiceNo = data.productTransaction[0].invoiceNumber;
			//console.log('invoiceNo...'+$scope.accSales.invoiceNo);
			
			//console.log('Company...'+data.journal[0].company.companyId);
			//console.log('Company Name...'+data.journal[0].company.companyName);
			
			//Company DropDown Selection
			var companyDropPath = apiPath.getAllCompany+'/'+data.journal[0].company.companyId;
			apiCall.getCall(companyDropPath).then(function(res2){
			
				$scope.accSales.companyDropDown = res2;
			});
			
			/** 
				Jsuggest OF Credit/Debit
			**/
				//Auto suggest Client Name For Debit
				var jsuggestPathEdit = apiPath.getLedgerJrnl+data.journal[0].company.companyId;
				
				apiCall.getCallHeader(jsuggestPathEdit,headerDr).then(function(response3){
					
					for(var t=0;t<response3.length;t++){
						
						for(var k=0;k<response3[t].length;k++){
							
							vm.clientNameDropDr.push(response3[t][k]);
						}
						
					}
				
				});
				
				apiCall.getCallHeader(jsuggestPathEdit,headerCr).then(function(response3){
					
					for(var t=0;t<response3.length;t++){
						
						for(var k=0;k<response3[t].length;k++){
							
							vm.clientNameDropCr.push(response3[t][k]);
						}
						
					}
				
				});
				
			//Auto Suggest Product Dropdown data
			vm.productNameDrop = [];
			
			apiCall.getCall(apiPath.getProductByCompany+data.journal[0].company.companyId+'/branch').then(function(responseDrop){
				
				vm.productNameDrop = responseDrop;
			
			});
			/**
				End
			**/
			
			//Set Date
			var getResdate = data.journal[0].entryDate;
			var splitedate = getResdate.split("-").reverse().join("-");
			vm.dt1 = new Date(splitedate);
			vm.minStart = new Date(splitedate);
			vm.maxStart = new Date(splitedate);
			
			//Set Table Array
			for(var i=0;i<data.journal.length;i++){
				
				 var tempData = {};
				tempData.amountType = data.journal[i].amountType;
				tempData.ledgerId= data.journal[i].ledger.ledgerId;
				tempData.ledgerName = data.journal[i].ledger.ledgerName;
				tempData.amount = parseInt(data.journal[i].amount);
				
				vm.AccClientMultiTable.push(tempData);
				
				//Set Current Balance 
				var tempBalanceData = {};
				
				tempBalanceData.currentBalance = data.journal[i].ledger.currentBalance;
				tempBalanceData.amountType = data.journal[i].ledger.currentBalanceType;
				
				vm.multiCurrentBalance.push(tempBalanceData);
				
			}
			
			//Set Product Array
			for(var j=0;j<data.productTransaction.length;j++){
				
				 var tempProData = {};
				tempProData.productId = data.productTransaction[j].product.productId;
				tempProData.productName= data.productTransaction[j].product.productName;
				tempProData.discountType = data.productTransaction[j].discountType;
				tempProData.price = parseInt(data.productTransaction[j].price);
				tempProData.discount = parseInt(data.productTransaction[j].discount);
				tempProData.qty = parseInt(data.productTransaction[j].qty);
				//tempProData.amount = parseInt(data.productTransaction[j].amount);
				
				vm.AccSalesTable.push(tempProData);
				
				var varTax = {};
				varTax.tax = data.productTransaction[j].product.vat;
				
				vm.productTax.push(varTax);
				//console.log();
			}
			
			//$scope.accSales.tax = parseInt(data.productTransaction[0].tax);
			//console.log(vm.AccClientMultiTable);
			//console.log(vm.AccSalesTable);
		});
		
	}
	else{
		
		//console.log('Not');
		apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
			$scope.accSales.jfid = response.nextValue;
	
		});
		
		$scope.defaultCompany();
		
		
		vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
		
		vm.AccSalesTable = [{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":""}];
		vm.productTax = [{"tax":0}];
		vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
		
		
	}
	//End Update Set
	
	
	
	
	
	/* Journal  Table */
		$scope.addClientRow = function(index){
			 
			var plusOne = index+1;
			//alert(plusOne);
			 var data = {};
			data.amountType ='debit';
			data.ledgerId='';
			data.ledgerName ='';
			data.amount ='';
			//vm.AccClientMultiTable.push(data);
			
			vm.AccClientMultiTable.splice(plusOne, 0, data);
			
			var balance = {};
			balance.currentBalance = '';
			balance.amountType = '';
			//vm.multiCurrentBalance.push(balance);
			vm.multiCurrentBalance.splice(plusOne, 0, balance);
			
			$scope.changeJrnlArray = true;

		};
		
		$scope.setMultiTable = function(item,index)
		{
			console.log(item);
			vm.multiCurrentBalance[index].currentBalance = item.currentBalance;
			vm.multiCurrentBalance[index].amountType = item.currentBalanceType;
			
			//console.log(vm.multiCurrentBalance);
			
			vm.AccClientMultiTable[index].ledgerId = item.ledgerId;
			$scope.changeJrnlArray = true;
			console.log(vm.AccClientMultiTable);
		}
		
		$scope.removeClientRow = function (idx) {
			
			$scope.changeJrnlArray = true;
			vm.AccClientMultiTable.splice(idx, 1);
			
			vm.multiCurrentBalance.splice(idx, 1);
			//console.log(vm.multiCurrentBalance);
		};
		
	
	/* End */
  
	/* Product  Table */
	
	$scope.addRow = function(index){
		  
		  var plusOne = index+1;
		 var data = {};	
		// console.log(this.AccSalesTable);
		data.productId='';
		data.productName ='';
		data.discountType ='flat';
		data.discount ='';
		data.price = 0;
		data.qty =1;
		data.amount = '';
		//vm.AccSalesTable.push(data);
		vm.AccSalesTable.splice(plusOne,0,data);
		
		var varTax = {};
		varTax.tax = 0;
		
		vm.productTax.splice(plusOne, 0, varTax);
			
		$scope.changeProductArray = true;
		

    };
	
	$scope.removeRow = function (idx) {
		vm.AccSalesTable.splice(idx, 1);
		vm.productTax.splice(idx, 1);
		$scope.changeProductArray = true;
	};
	
	$scope.settabledata = function(item,index)
	{
		vm.AccSalesTable[index].productId = item.productId;
		
		var grandPrice;

		grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.margin);
			
		if(grandPrice == 0){
			
			grandPrice = productArrayFactory.calculate(item.mrp,0,item.margin);
		}
		
		vm.AccSalesTable[index].price = grandPrice;
		
		//vm.productTax[index].tax = productArrayFactory.calculateTax(grandPrice,item.vat,0);
		vm.productTax[index].tax = parseFloat(item.vat);
		console.log(vm.productTax);
		//$scope.accSales.tax = $scope.accSales.tax + productArrayFactory.calculateTax(item.purchasePrice,item.vat,item.margin);
		
		
		$scope.changeProductArray = true;
		console.log(vm.AccSalesTable);
	}
	
	//Total For Product Table
	$scope.getTotal = function(){
		var total = 0;
		for(var i = 0; i < vm.AccSalesTable.length; i++){
			var product = vm.AccSalesTable[i];
			total += product.amount;
		}
		return total;
	}
	
	//Total Tax For Product Table
	$scope.getTotalTax = function(){
		
		var total = 0;
		for(var i = 0; i < vm.AccSalesTable.length; i++){
			var product = vm.AccSalesTable[i];
			var vartax = vm.productTax[i];
			total += productArrayFactory.calculateTax(product.amount,vartax.tax,0);
		}
		return total;
	}

	//Auto suggest Client Name
	// vm.clientNameDrop=[];
	// apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
		// vm.clientNameDrop = response3;
	
	// });
	
	//Auto Suggest Product Dropdown data
	// vm.productNameDrop = [];
	
	// apiCall.getCall(apiPath.getProductByCompany).then(function(responseDrop){
		
		// vm.productNameDrop = responseDrop;
	
	// });
	
	
	//Set JSuggest Data When Company
	$scope.changeCompany = function(Fname,value){
		
		vm.clientNameDropDr=[];
		vm.clientNameDropCr=[];
		
		//Auto suggest Client Name For Debit
		var jsuggestPath = apiPath.getLedgerJrnl+value;
		
		apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){
			
			for(var t=0;t<response3.length;t++){
				
				for(var k=0;k<response3[t].length;k++){
					
					vm.clientNameDropDr.push(response3[t][k]);
				}
				
			}
		
		});
		
		apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){
			
			for(var t=0;t<response3.length;t++){
				
				for(var k=0;k<response3[t].length;k++){
					
					vm.clientNameDropCr.push(response3[t][k]);
				}
				
			}
		
		});
		
		//Auto Suggest Product Dropdown data
		vm.productNameDrop = [];
		
		apiCall.getCall(apiPath.getProductByCompany+value+'/branch').then(function(responseDrop){
			
			vm.productNameDrop = responseDrop;
		
		});
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
		
		//For Model
		$rootScope.accView.companyId = value;
		
		//Clear Journal Array And Product Array When Company Change
		vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
		
		vm.AccSalesTable = [{"productId":"","productName":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":""}];
		vm.productTax = [{"tax":0}];
		vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
		
	}
	
	$scope.changeAccSales = function(Fname,value) {
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
  	}
	
	//Changed date
	$scope.changeSalesDate = function(Fname){
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		var  date = new Date(vm.dt1);
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		//console.log(Fname+'..'+fdate);
		formdata.append(Fname,fdate);
	}
	
	//Change in Journal Table
	$scope.changeAmountType = function(index){
		
		vm.AccClientMultiTable[index].ledgerId = '';
		vm.AccClientMultiTable[index].ledgerName = '';
		
		vm.multiCurrentBalance[index].currentBalance = '';
		vm.multiCurrentBalance[index].amountType = '';
			
		$scope.changeJrnlArray = true;
		
	}
	
	//Change in Journal Table
	$scope.changeJrnlTable = function(){
		
		$scope.changeJrnlArray = true;
		
	}
	
	//Change in Product Table
	$scope.changeProductTable = function(){
		
		$scope.changeProductArray = true;
		console.log($scope.changeInArray);
	}
	
  /* End */
	$scope.deleteArray = function(){
		//Delete Journal Data From formdata Object
		if($scope.changeJrnlArray){
			
			var jsonJrnlDelete = angular.copy(vm.AccClientMultiTable);
			
			for(var i=0;i<jsonJrnlDelete.length;i++){
				 
				angular.forEach(jsonJrnlDelete[i], function (value,key) {
					
					formdata.delete('data['+i+']['+key+']',value);
				});
				
			}
			
			
			
		}
		
		//Delete Product Data From formdata Object
		if($scope.changeProductArray){
			
			var jsonProductDelete = angular.copy(vm.AccSalesTable);
			
			for(var i=0;i<jsonProductDelete.length;i++){
				 
				angular.forEach(jsonProductDelete[i], function (value,key) {
					
					formdata.delete('inventory['+i+']['+key+']',value);
				});
				
			}
			
		}
	}
	
	
  $scope.pop = function()
  {
		 
	if($scope.totalDebit != $scope.totalCredit){
	
		toaster.pop('alert', 'Opps!!', 'Credit/Debit Amount is Not Equal');
		return false;
	}
		
	
	if($scope.accSales.getSetJrnlId){
		
		
		var accSalesPath = apiPath.postJrnl+'/'+$scope.accSales.jfid;
		
		if($scope.changeJrnlArray){
			
		
			var json = angular.copy(vm.AccClientMultiTable);
			 
			for(var i=0;i<json.length;i++){
				 
				angular.forEach(json[i], function (value,key) {
					
					formdata.append('data['+i+']['+key+']',value);
				});
				
			}
			
		}
		
		if($scope.changeProductArray){
			
		
			var jsonProduct = angular.copy(vm.AccSalesTable);
			 
			for(var i=0;i<jsonProduct.length;i++){
				 
				angular.forEach(jsonProduct[i], function (value,key) {
					
					formdata.append('inventory['+i+']['+key+']',value);
				});
				
			}
			
			if(formdata.has('tax')){
			
				formdata.delete('tax');
			}
			formdata.append('tax',$scope.accSales.tax);
			// formdata.append('transactionDate',$scope.totalTable);
			// formdata.append('transactionDate',$scope.grandTotalTable);
			
		}
		
		if(formdata.has('entryDate')){
			var  date = new Date(vm.dt1);
			//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
			var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			
			if(formdata.has('transactionDate')){
			
				formdata.delete('transactionDate');
			}
			formdata.append('transactionDate',fdate); // Inventory Change the date will be Change
		}
		
		
		if(formdata.get('tax') == '' || formdata.get('tax') == 0){
			
			formdata.delete('tax');
			
		}
		
	}
	else{
		
		formdata.append('jfId',$scope.accSales.jfid);
		
		var accSalesPath = apiPath.postJrnl;
		
		//data
		 var json = angular.copy(vm.AccClientMultiTable);
		 
		 for(var i=0;i<json.length;i++){
			 
			angular.forEach(json[i], function (value,key) {
				
				formdata.append('data['+i+']['+key+']',value);
			});
					
		 }
		 
		//Inventory
		  var json2 = angular.copy(vm.AccSalesTable);
		 
		 for(var i=0;i<json2.length;i++){
			 
			angular.forEach(json2[i], function (value,key) {
				
				formdata.append('inventory['+i+']['+key+']',value);
			});
					
		 }
		 
		var  date = new Date(vm.dt1);
		//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		
		if(!formdata.has('entryDate')){
			
			formdata.append('entryDate',fdate);
		}
		
		if(formdata.has('transactionDate')){
			
			formdata.delete('transactionDate');
		}
		
		formdata.append('transactionDate',fdate);
		
		if(!formdata.has('tax')){
			
			formdata.append('billNumber','');
		}
		
		formdata.append('tax',$scope.accSales.tax);
		
		if(!formdata.has('tax')){
			
			formdata.append('tax','');
		}
		
		// if(formdata.get('tax') == '' || formdata.get('tax') == 0){
			
			// formdata.delete('tax');
			
		// }
		
		$scope.changeJrnlArray = true; // For Delete Array In Journal FormData After Success
		$scope.changeProductArray = true; // For Delete Array In Product FormData After Success
		
		
	}
	
	var headerData = {'Content-Type': undefined,'type':'sales'};
	   
			
		apiCall.postCallHeader(accSalesPath,headerData,formdata).then(function(data){
			
			console.log(data);	
			
			
			//Display Toaster Message
			if($scope.accSales.getSetJrnlId){
				
				if(apiResponse.ok == data){
					
					toaster.pop('success', 'Title', 'Update Successfully');
				}
				else{
					
					$scope.deleteArray();
					toaster.pop('warning', 'Opps!!', data);
				}
				
			}
			else{
				
				if(apiResponse.ok == data){
					
					toaster.pop('success', 'Title', 'Insert Successfully');
				}
				else{
					
					// Delete formdata  keys
					// for (var key of formdata.keys()) {
					   // formdata.delete(key); 
					// }
					formdata.delete('tax');
					formdata.delete('jfId');
					$scope.deleteArray();
					toaster.pop('warning', 'Opps!!', data);
					
				}
				
			}
			
			if(apiResponse.ok == data){
				
				//Delete Journal Data From formdata Object
				if($scope.changeJrnlArray){
					
					var jsonJrnlDelete = angular.copy(vm.AccClientMultiTable);
					
					for(var i=0;i<jsonJrnlDelete.length;i++){
						 
						angular.forEach(jsonJrnlDelete[i], function (value,key) {
							
							formdata.delete('data['+i+']['+key+']',value);
						});
						
					}
					
					$scope.changeJrnlArray = false;
					
				}
				
				//Delete Product Data From formdata Object
				if($scope.changeProductArray){
					
					var jsonProductDelete = angular.copy(vm.AccSalesTable);
					
					for(var i=0;i<jsonProductDelete.length;i++){
						 
						angular.forEach(jsonProductDelete[i], function (value,key) {
							
							formdata.delete('inventory['+i+']['+key+']',value);
						});
						
					}
					
					$scope.changeProductArray = false;
					
				}
				
				// Delete formdata  keys
				for (var key of formdata.keys()) {
				   formdata.delete(key); 
				}
				formdata.delete('tax');
			
				vm.dt1 = new Date();
				vm.minStart = new Date();
				vm.maxStart = new Date();
				
				$scope.accSales = []; //Blank Data
				vm.clientNameDropDr=[]; //Blank Debit Jsuggest Legder Data 
				vm.clientNameDropCr=[]; //Blank Debit Jsuggest Legder Data 
				
				vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
				vm.productTax = [{"tax":0}];
				
				vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
			
				vm.AccSalesTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":1,"amount":""}];
			
				apiCall.getCall(apiPath.getJrnlNext).then(function(response){
			
					$scope.accSales.jfid = response.nextValue;
		
				});
				
				$scope.defaultCompany();
			}
	
		});
  }
  
	//Cancel Button 
	$scope.cancel = function () {
	   
	   vm.dt1 = new Date();
		vm.minStart = new Date();
		vm.maxStart = new Date();
		
		//Delete Journal Data From formdata Object
		if($scope.changeJrnlArray){
			
			var jsonJrnlDelete = angular.copy(vm.AccClientMultiTable);
			
			for(var i=0;i<jsonJrnlDelete.length;i++){
				 
				angular.forEach(jsonJrnlDelete[i], function (value,key) {
					
					formdata.delete('data['+i+']['+key+']',value);
				});
				
			}
			
			$scope.changeJrnlArray = false;
			
		}
		
		//Delete Product Data From formdata Object
		if($scope.changeProductArray){
			
			var jsonProductDelete = angular.copy(vm.AccSalesTable);
			
			for(var i=0;i<jsonProductDelete.length;i++){
				 
				angular.forEach(jsonProductDelete[i], function (value,key) {
					
					formdata.delete('inventory['+i+']['+key+']',value);
				});
				
			}
			
			$scope.changeProductArray = false;
			
		}
		
		// Delete formdata  keys
		for (var key of formdata.keys()) {
		   formdata.delete(key); 
		}
		
		
		$scope.accSales = []; //Blank Data
		vm.clientNameDropDr=[]; // Debit Jsuggest Blank
		vm.clientNameDropCr=[]; // Credit Jsuggest Blank
		
		vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
		vm.productTax = [{"tax":0}];
		
		vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
	
		vm.AccSalesTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":1,"amount":""}];
	
		apiCall.getCall(apiPath.getJrnlNext).then(function(response){
	
			$scope.accSales.jfid = response.nextValue;

		});
		
		$scope.defaultCompany();
	   
	}
  
 $scope.AddSales = function()
 {
	 alert('Add');
 }
  
	
 

  // Timepicker
  // ----------------------------------- 
  this.mytime = new Date();

  this.hstep = 1;
  this.mstep = 15;

  this.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  this.ismeridian = true;
  this.toggleMode = function() {
    this.ismeridian = ! this.ismeridian;
  };

  this.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    this.mytime = d;
  };

  this.changed = function () {
    console.log('Time changed to: ' + this.mytime);
  };

  this.clear = function() {
    this.mytime = null;
  };

  // Input mask
  // ----------------------------------- 

  this.testoption = {
        "mask": "99-9999999",
        "oncomplete": function () {
            console.log();
            console.log(arguments,"oncomplete!this log form controler");
        },
        "onKeyValidation": function () {
            console.log("onKeyValidation event happend! this log form controler");
        }
    };

  //default value
  this.test1 = new Date();

  this.dateFormatOption = {
      parser: function (viewValue) {
          return viewValue ? new Date(viewValue) : undefined;
      },
      formatter: function (modelValue) {
          if (!modelValue) {
              return "";
          }
          var date = new Date(modelValue);
          return (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()).replace(/\b(\d)\b/g, "0$1");
      },
      isEmpty: function (modelValue) {
          return !modelValue;
      }
  };

  this.mask = { regex: ["999.999", "aa-aa-aa"]};

  this.regexOption = {
      regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"
  };

  this.functionOption = {
   mask: function () {
      return ["[1-]AAA-999", "[1-]999-AAA"];
  }};

  // Bootstrap Wysiwyg
  // ----------------------------------- 
 
  this.editorFontFamilyList = [
    'Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact',
    'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
    'Times New Roman', 'Verdana'
  ];
  
  this.editorFontSizeList = [
    {value: 1, name: 'Small'},
    {value: 3, name: 'Normal'},
    {value: 5, name: 'Huge'}
  ];
  
  
  
  
  
  /**
  *
  Ledger Model Start
  *
  **/
	$scope.openLedger = function (size,index) {
	
	if($scope.accSales.companyDropDown){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/ledgerModal.html',
		  controller: AccLedgerModalController,
		  size: size,
		  resolve:{
			  ledgerIndex: function(){
				  return index;
			  },
			  companyId: function(){
				return $scope.accSales.companyDropDown;
			  }
		  }
		});

		var state = $('#modal-state');
		modalInstance.result.then(function (data) {
		  
			if($scope.accSales.companyDropDown){
				
				//Auto suggest Client Name For Debit
				var jsuggestPath = apiPath.getLedgerJrnl+$scope.accSales.companyDropDown.companyId;
				
				vm.clientNameDropDr =[];
				
				apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){
					
					for(var t=0;t<response3.length;t++){
						
						for(var k=0;k<response3[t].length;k++){
							
							vm.clientNameDropDr.push(response3[t][k]);
						}
						
					}
				
				});
				
				vm.clientNameDropCr = [];
				
				apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){
					
					for(var t2=0;t2<response3.length;t2++){
						
						for(var k2=0;k2<response3[t2].length;k2++){
							
							vm.clientNameDropCr.push(response3[t2][k2]);
						}
						
					}
					
					
				});
				
				//Set Last Inserted Ledger
				console.log(data);
				
				
				var headerSearch = {'Content-Type': undefined,'ledgerName':data.ledgerName};
				apiCall.getCallHeader(apiPath.getLedgerJrnl+data.companyId,headerSearch).then(function(response){
					
					console.log(response);
					vm.AccClientMultiTable[data.index].ledgerName = response.ledgerName;
					vm.AccClientMultiTable[data.index].ledgerId = response.ledgerId;
					
					vm.multiCurrentBalance[data.index].currentBalance = response.currentBalance;
					vm.multiCurrentBalance[data.index].amountType = response.currentBalanceType;
			
					
				});
				
			}
		
		}, function (data) {
			
			//alert(data);
		  
		});
	}
	else{
		
		alert('Please Select Company');
	}
  };

  
  /**
  *
  Ledger Model End
  *
  **/
  
  /**
  Product Model Start
  **/
  $scope.openProduct = function (size,index) {
	
	if($scope.accSales.companyDropDown){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/productModal.html',
		  controller: AccProductModalController,
		  size: size,
		  resolve:{
			  productIndex: function(){
				  return index;
			  },
			  companyId: function(){
				 
				return $scope.accSales.companyDropDown;
			  }
		  }
		});

	   
		modalInstance.result.then(function (data) {
		 
			console.log(data);
			
			apiCall.getCall(apiPath.getProductByCompany+data.companyId+'/branch').then(function(responseDrop){
			
				vm.productNameDrop = responseDrop;
		
			});
			
			var headerSearch = {'Content-Type': undefined,'productName':data.productName};
			
			apiCall.getCallHeader(apiPath.getProductByCompany+data.companyId,headerSearch).then(function(response){
				
				console.log(response);
				vm.AccSalesTable[data.index].productName = response[0].productName;
				//vm.AccSalesTable[data.index].productId = response.productId;
				
				$scope.settabledata(response[0],data.index);
				
			});
		
		}, function () {
		  console.log('Cancel');	
		});
	}
	else{
		alert('Please Select Company');
	}
  };
  /**
  Product Model End
  **/
  
  /**
	History Modal 
	**/
	
	$scope.openHistoryModal = function (size) {

		if($scope.accSales.companyDropDown){
			
			var modalInstance = $modal.open({
			  templateUrl: '/myHistorySalesModalContent.html',
			  controller: historySalesModaleCtrl,
			  size: size,
			  resolve:{
				  companyId: function(){
					 
					return $scope.accSales.companyDropDown;
				  }
			  }
			});

		   
			modalInstance.result.then(function () {
			 
			
			}, function () {
			  console.log('Cancel');	
			});
		}
		else{
			alert('Please Select Company');
		}
	
	};
	
	/**
	End History Modal 
	**/
  
}
AccSalesController.$inject = ["$scope","apiCall","apiPath","$modal","$rootScope","getSetFactory","toaster","apiResponse","validationMessage","productArrayFactory"];