
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.initiate.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.config.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Scripts/script.js');
 
App.controller('RetailsaleBillController', RetailsaleBillController);

function RetailsaleBillController($rootScope,$scope,apiCall,apiPath,$http,$window,$modal,$log,validationMessage,saleType,productArrayFactory,getSetFactory,toaster,apiResponse,$anchorScroll,$location,maxImageSize,$sce,$templateCache,getLatestNumber,productFactory,stateCityFactory,$filter) {
  'use strict';
 
	var vm = this;
	var formdata = new FormData();
	
	 $scope.erpPath = $rootScope.erpPath; //Erp Path
	 var dateFormats = $rootScope.dateFormats; //Date Format
	 
	$scope.quickBill = [];
	
	vm.disableCompany = false;
	var Modalopened = false;
	
	$scope.saleType = saleType;
	
	vm.AccBillTable = [];
	vm.productTax = [];
			
	var defStateData = {};
	var AllDefCityData = [];
	var defCityData = {};
	
	$scope.noOfDecimalPoints; // decimalPoints For Price,Tax Etc.....
	
	$scope.productArrayFactory = productArrayFactory;
	
	$scope.changeProductArray = false; // Change When Update in Product Table Array
	$scope.changeProductAdvancePrice = false;  // Change Advance Price of Product
	
	$scope.quickBill.tax = 0; //Tax
	
	$scope.totalTable;
	$scope.grandTotalTable;
	$scope.balanceTable;
	
	//Invoice Number 
	$scope.quickBill.invoiceNumber;
	$scope.quickBill.invoiceEndAt;
	$scope.quickBill.invoiceId;
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	vm.paymentModeDrop =['cash','bank','card'];
	
	$scope.quickBill.paymentMode = 'cash';
	
	$scope.getInvoiceAndJobcardNumber = function(id){
		
		var getLatestInvoice = apiPath.getLatestInvoice1+id+apiPath.getLatestInvoice2;
		//Get Invoice#
		apiCall.getCall(getLatestInvoice).then(function(response4){
			
			$scope.getInitStateCity();
			$scope.quickBill.invoiceNumber = getLatestNumber.getInvoice(response4);
		});
			
		
	}
	
	//Default Company Function
	$scope.defaultComapny = function(){
		
		vm.loadData = true;
		
		//Set default Company
		apiCall.getDefaultCompany().then(function(response2){
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
				
			$scope.quickBill.companyDropDown = response2;
			
			formdata.delete('companyId');
			
			formdata.append('companyId',response2.companyId);
			
			//console.log('default');
			
			$scope.noOfDecimalPoints = parseInt(response2.noOfDecimalPoints);
			
			var id = response2.companyId;
			
			//Auto Suggest Product Dropdown data
			vm.productNameDrop = [];
			
			//apiCall.getCall(apiPath.getProductByCompany+id+'/branch').then(function(responseDrop){
				
				//console.log(responseDrop);
				//vm.productNameDrop = responseDrop;
				//console.log(productFactory.getProductByCompany(id));
				//vm.productNameDrop = productFactory.getProductByCompany(id);
			productFactory.getProductByCompany(id).then(function(data){
				
				$scope.getInvoiceAndJobcardNumber(id); // Invoice#
				vm.productNameDrop = data;
				vm.loadData = false;
			});
			
			
			//});
			
		});
	}
	
	$scope.ReloadAfterSave = function(response2){
		
		$scope.quickBill.companyDropDown = response2;
			
			formdata.delete('companyId');
			
			
			formdata.append('companyId',response2.companyId);
			
			//console.log('default');
			
			$scope.noOfDecimalPoints = parseInt(response2.noOfDecimalPoints);
			
			//toaster.clear();
			//toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
			var id = response2.companyId;
			$scope.getInvoiceAndJobcardNumber(id);
			
	}
	//Auto Suggest Client Contact Dropdown data
	$scope.clientGetAllFunction = function(){
		
		vm.clientSuggest = [];
	
		apiCall.getCall(apiPath.getAllClient).then(function(responseDrop){
			
			vm.clientSuggest = responseDrop;
			
		
		});
	
	}
	
	$scope.clientGetAllFunction();
	
	
	// vm.statesDrop=[];
	// apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		// vm.statesDrop = response3;
		
	// });
	
	
	$scope.getInitStateCity = function(){
		
		
			
		vm.statesDrop=[];
		vm.cityDrop = [];
		
		stateCityFactory.getState().then(function(response){
			toaster.clear();
			vm.statesDrop = response;
			$scope.quickBill.stateAbb = stateCityFactory.getDefaultState($rootScope.defaultState);
				
				
			vm.cityDrop = stateCityFactory.getDefaultStateCities($rootScope.defaultState);
			$scope.quickBill.cityId = stateCityFactory.getDefaultCity($rootScope.defaultCity);
				
				console.log('state Inn');
		});
	}
	
	
	
	//$scope.getInitStateCity();
	
	
	//get Bank
	vm.bankDrop=[];
	apiCall.getCall(apiPath.getAllBank).then(function(response2){
			//console.log(response2);
			for(var p=0;p<response2.length;p++){
				
				vm.bankDrop.push(response2[p].bankName);
			}
			
			
	});
	
	
	/* Table */
	
	$scope.addRow = function(index){
		
		//console.log('Row Added..'+index);
		
		var plusOne = index+1;
		
		var data = {};	
		data.productId = '';
		data.productName ='';
		data.color ='';
		data.frameNo ='';
		data.discountType ='flat';
		data.discount ='';
		data.price = 0;
		data.qty =1;
		data.amount = '';
		data.size = '';
		//vm.AccBillTable.push(data);
		vm.AccBillTable.splice(plusOne,0,data);
		
		var varTax = {};
		varTax.tax = 0;
		varTax.additionalTax = 0;
		
		vm.productTax.splice(plusOne, 0, varTax);
		
		$scope.changeProductArray = true;
		
    };
	
	$scope.setProductData = function(item,index)
	{
		
		 //console.log(item);
		// console.log(index);
		vm.AccBillTable[index].productId = item.productId;
	
		var grandPrice;
		var tax;
		
		if($scope.saleType == 'WholesaleBill'){
			
			
			grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.wholesaleMargin) + parseFloat(item.wholesaleMarginFlat);
			//tax = productArrayFactory.calculateTax(item.purchasePrice,0,item.margin);
			vm.productTax[index].tax = item.vat;
			//vm.productTax[index].margin = item.wholesaleMargin;
		}
		else if($scope.saleType == 'RetailsaleBill'){
			
			grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.margin) + parseFloat(item.marginFlat);
			
					//tax = productArrayFactory.calculateTax(item.purchasePrice,item.vat,item.margin);
			
			vm.productTax[index].tax = item.vat;
			//vm.productTax[index].margin = item.margin;
			
			if(item.purchasePrice == 0 || grandPrice == 0){
				
				
				grandPrice = productArrayFactory.calculate(item.mrp,0,item.margin)  + parseFloat(item.marginFlat);
			}
		}
		
		vm.productTax[index].additionalTax = parseFloat(item.additionalTax); // Additional Tax
		
		vm.AccBillTable[index].price = grandPrice;
		
		/** Color/Size **/
		vm.AccBillTable[index].color = item.color;
		vm.AccBillTable[index].size = item.size;
		/** End **/
		//vm.productTax[index].tax = tax; //Product Tax
		
		//console.log(vm.AccBillTable);
		
		$scope.changeProductArray = true;
	}
	
	$scope.removeRow = function (idx) {
		vm.AccBillTable.splice(idx,1);
		vm.productTax.splice(idx, 1);
		
		$scope.changeProductArray = true;
	};
	
	// End Table 
	
	//Total Tax For Product Table
	$scope.getTotalTax = function(){
		
		var total = 0;
		for(var i = 0; i < vm.AccBillTable.length; i++){
			var product = vm.AccBillTable[i];
			var vartax = vm.productTax[i];
			var totaltax = parseFloat(vartax.tax) + parseFloat(vartax.additionalTax);
			if(product.discountType == 'flat') {
				
				var getAmount = $filter('setDecimal')((product.price*product.qty) - product.discount,$scope.noOfDecimalPoints);
				
			}
			else{
				var getAmount  =  $filter('setDecimal')((product.price*product.qty)-((product.price*product.qty)*product.discount/100),$scope.noOfDecimalPoints);
			}
			total += productArrayFactory.calculateTax(getAmount,totaltax,0);
		}
		return total;
	}
	
	$scope.getTotal = function(){
		
		var total = 0;
		for(var i = 0; i < vm.AccBillTable.length; i++){
			var product = vm.AccBillTable[i];
			total += parseFloat(product.amount);
		}
		return total;
		
	}
	
	/** Tax Calculation **/
	
		$scope.calculateTaxReverse = function(item,cgst,sgst){
			
			var getCgst = cgst;
			var getSgst = sgst;
			
			if(item.discountType == 'flat') {
				//item.amount = ((item.price*item.qty) - item.discount | setDecimal: noOfDecimalPoints);
				
				var amount =  $filter('setDecimal')((item.price*item.qty) - item.discount,$scope.noOfDecimalPoints);
				var cgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);
				var sgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);
				
				item.amount = amount+cgstAmount+sgstAmount;
				
			}
			else{
				//item.amount = ((item.price*item.qty)-((item.price*item.qty)*item.discount/100) | setDecimal: noOfDecimalPoints);
				var amount  =  $filter('setDecimal')((item.price*item.qty)-((item.price*item.qty)*item.discount/100),$scope.noOfDecimalPoints);
				var cgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);
				var sgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);
				
				item.amount = amount+cgstAmount+sgstAmount;
			}
		}
		
	/** END **/
	
	
	/** Tax Calculation **/
	
		$scope.calculateTaxReverseTwo = function(item,cgst,sgst,index){
			
			var getCgst = parseFloat(cgst);
			var getSgst = parseFloat(sgst);
			var TaxSum = getCgst+getSgst;
			
			//console.log(TaxSum);
			// console.log(item.amount);
			
			vm.AccBillTable[index].price = $filter('setDecimal')(item.amount/ (1+(TaxSum/100)),$scope.noOfDecimalPoints);
			
			var Price = item.amount/ (1+(TaxSum/100));
			
		}
		
	/** END **/
	
	
	/** Check Update Or Insert Bill **/
	
	$scope.EditAddBill = function(){
	
		//if(Object.keys(getSetFactory.get()).length){
		if(Object.keys(getSetFactory.get()).length){
			
			var formdata = new FormData();
			
			$scope.quickBill.EditBillData = getSetFactory.get();
			
			console.log($scope.quickBill.EditBillData);
			getSetFactory.blank();
			
			var jsonProduct = angular.fromJson($scope.quickBill.EditBillData.productArray);
			
			vm.disableCompany = false;
			//get Company
			vm.companyDrop=[];
			apiCall.getCall(apiPath.getAllCompany).then(function(response2){
					//console.log(response2);
					
					vm.companyDrop = response2;
					$scope.quickBill.companyDropDown =  $scope.quickBill.EditBillData.company;		//Company
					
					vm.disableCompany = true;
			});
	
	
			//var demo = angular.fromJson(jsonProduct);
			
			//console.log(jsonProduct.inventory);
			//console.log($scope.quickBill.EditBillData);
			$scope.quickBill.documentData = $scope.quickBill.EditBillData.file;
			
			
			/** Company Wise Product **/
			
				//Auto Suggest Product Dropdown data
				vm.productNameDrop = [];
				
				// apiCall.getCall(apiPath.getProductByCompany+$scope.quickBill.EditBillData.company.companyId+'/branch').then(function(responseDrop){
					
					// vm.productNameDrop = responseDrop;
				
				// });
				productFactory.getProductByCompany($scope.quickBill.EditBillData.company.companyId).then(function(data){
					
					vm.productNameDrop = data;
					
				});
			
			/** End **/
			
			//console.log($scope.quickBill.documentData);
			
			$scope.quickBill.invoiceNumber = $scope.quickBill.EditBillData.invoiceNumber;  //Invoice Number
			
			
			
			$scope.noOfDecimalPoints = parseInt($scope.quickBill.EditBillData.company.noOfDecimalPoints);//decimal points
			
			//Set Date
			var getResdate =  $scope.quickBill.EditBillData.entryDate;
			var splitedate = getResdate.split("-").reverse().join("-");
			vm.dt1 = new Date(splitedate);
			
			$scope.quickBill.BillContact = $scope.quickBill.EditBillData.client.contactNo;
			$scope.quickBill.WorkNo = $scope.quickBill.EditBillData.client.workNo;
			$scope.quickBill.companyName = $scope.quickBill.EditBillData.client.companyName;
			$scope.quickBill.clientName = $scope.quickBill.EditBillData.client.clientName;
			$scope.quickBill.emailId = $scope.quickBill.EditBillData.client.emailId;
			$scope.quickBill.fisrtAddress = $scope.quickBill.EditBillData.client.address1;
			$scope.quickBill.secondAddress = $scope.quickBill.EditBillData.client.address2;
			// $scope.quickBill.stateAbb = $scope.quickBill.EditBillData.client.stateAbb;
			// $scope.quickBill.cityId = $scope.quickBill.EditBillData.client.cityId;
			
			$scope.quickBill.advance = $scope.quickBill.EditBillData.advance; //Advance
			
			
			/** Set State & City **/
				//State DropDown Selection
				vm.statesDrop=[];
				vm.cityDrop=[];
				stateCityFactory.getState().then(function(response){
					
					vm.statesDrop = response;
					  $scope.quickBill.stateAbb =  stateCityFactory.getDefaultState($scope.quickBill.EditBillData.client.stateAbb);
					vm.cityDrop = stateCityFactory.getDefaultStateCities($scope.quickBill.EditBillData.client.stateAbb);
					$scope.quickBill.cityId = stateCityFactory.getDefaultCity($scope.quickBill.EditBillData.client.cityId);
				});
			
				
			/** End  **/
			
			$scope.quickBill.paymentMode = $scope.quickBill.EditBillData.paymentMode;
			if($scope.quickBill.paymentMode == 'bank'){
				
				$scope.quickBill.chequeNo = $scope.quickBill.EditBillData.checkNumber;
				$scope.quickBill.BankName = $scope.quickBill.EditBillData.bankName;
			}
			
			//console.log('If');
			
		vm.AccBillTable = jsonProduct.inventory;
			
			
			//console.log(vm.AccBillTable);
			var EditProducArray = jsonProduct.inventory;
			var count = EditProducArray.length;
			for(var w=0;w<count;w++){
				
				var d = 0;
				var setData = EditProducArray[w];
				
				var taxObject = {};
				taxObject.tax = 0;
				taxObject.additionalTax = 0;
				
				vm.productTax.push(taxObject);
				
				//apiCall.getCall(apiPath.getAllProduct+'/'+setData.productId).then(function(resData){
				productFactory.getSingleProduct(setData.productId).then(function(resData){
					
					/** Tax **/
					//console.log(resData);
					vm.AccBillTable[d].productName = resData.productName;
					
					vm.productTax[d].tax = parseFloat(resData.vat);
					vm.productTax[d].additionalTax = parseFloat(resData.additionalTax); // Additional Tax
					
					d++;
					/** End **/
					
				});
			}
			
			
			
			//console.log('true');
			toaster.clear();
			//vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":1000,"discount":"","qty":3,"amount":""}];
			
		}
		else{
			vm.disableCompany = false;
			
			//get Company
			vm.companyDrop=[];
			apiCall.getCall(apiPath.getAllCompany).then(function(response2){
				
				toaster.clear();
				toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
					//console.log(response2);
					vm.companyDrop = response2;
					
					$scope.defaultComapny();
			});
			
			//console.log('Else');
			//vm.AccBillTable = [];
			vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
			vm.productTax = [{"tax":0,"additionalTax":0}];
			
		}
	}	
	/** End **/
	
	$scope.EditAddBill();
  
  
	
	//Change in Product Table
	$scope.changeProductTable = function(){
		
		$scope.changeProductArray = true;
		$scope.changeProductAdvancePrice = true;
		
		
	}
	
	//Change in Product Advance
	$scope.changeProductAdvance = function(){
		
		$scope.changeProductAdvancePrice = true;
		
	}
	
	//Changed date
	$scope.changeBillDate = function(Fname){
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		var  date = new Date(vm.dt1);
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		//console.log(Fname+'..'+fdate);
		formdata.append(Fname,fdate);
	}
	
	$scope.changeInBill = function(Fname,value) {
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		if(value != "" && value != undefined){
			
			formdata.append(Fname,value);
		}
		
		
		if(Fname == 'contactNo')
		{
			//console.log(Fname+'..'+value);
			formdata.delete('workNo');
			formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('emailId');
			formdata.delete('address1');
			formdata.delete('address2');
			// formdata.delete('stateAbb');
			// formdata.delete('cityId');
			
			$scope.quickBill.WorkNo = '';
			$scope.quickBill.companyName = ''
			$scope.quickBill.clientName = '';
			$scope.quickBill.emailId = '';
			$scope.quickBill.fisrtAddress = '';
			$scope.quickBill.secondAddress = '';
			//$scope.quickBill.cityId = {};
			//$scope.quickBill.stateAbb = {};
			
		}
  	}
	
	$scope.changePaymentInBill = function(Fname,value) {
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		
		if(value != 'bank'){
			
			formdata.delete('bankName');
			formdata.delete('checkNumber');
			
			$scope.quickBill.BankName = "";
			$scope.quickBill.chequeNo = "";
			
		}
		formdata.append(Fname,value);
		
		//console.log(Fname+'..'+value);
  	}
	
	//Total Tax For Product Table
	// $scope.getTotalAmount = function(){
		
		// var total = 0;
		// for(var i = 0; i < vm.AccBillTable.length; i++){
			// var product = vm.AccBillTable[i];
			// var varMargin= vm.productTax[i];
			// var finalAmount = product.price * product.qty;
			// console.log(finalAmount);
			// total += productArrayFactory.calculate(finalAmount,0,varMargin.margin);
		// }
		// return total;
	// }
	
	
	
	
	
	$scope.ChangeState = function(Fname,state)
	 {
		vm.cityDrop = stateCityFactory.getDefaultStateCities(state);
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		
		formdata.append(Fname,state);
	}
	
  /* End */
  
	
  
	//Change Invoice Number When Company Changed
	$scope.changeCompany = function(item)
	 {
		vm.loadData = true;
		toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
		
		$scope.noOfDecimalPoints = parseInt(item.noOfDecimalPoints);
	
		//Auto Suggest Product Dropdown data
		vm.productNameDrop = [];
		
		//apiCall.getCall(apiPath.getProductByCompany+item.companyId+'/branch').then(function(responseDrop){
			
			//vm.productNameDrop = responseDrop;
			//vm.productNameDrop = productFactory.getProductByCompany(item.companyId);
		productFactory.getProductByCompany(item.companyId).then(function(data){
			console.log(data);
			vm.productNameDrop = data;
			
			$scope.getInvoiceAndJobcardNumber(item.companyId); // Invoice#
			
			vm.loadData = false;
		});
			
		
		//});
		
		vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
		vm.productTax = [{"tax":0,"additionalTax":0}];
		$scope.quickBill.advance = 0;
		
		// if(formdata.has('companyId')){
	
			formdata.delete('companyId');
			
		//}
		formdata.append('companyId',item.companyId);
	}
  
  
  $scope.disableButton = false;

	//alert($scope.getTotal());

	$scope.pop = function(generate)
	{
		//alert(generate);
		$scope.disableButton = true;
		
		
							
		 //$scope.disableButton = true;
	
		if($scope.quickBill.EditBillData){
			
			formdata.delete('companyId');
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Updating....',600000);
			
			var BillPath = apiPath.postBill+'/'+$scope.quickBill.EditBillData.saleId;
			
			 if($scope.changeProductArray){
				 
				formdata.append('total',$scope.totalTable);
				 formdata.append('tax',$scope.quickBill.tax);
				 formdata.append('grandTotal',$scope.grandTotalTable);
				 if($scope.quickBill.advance){
					
					 formdata.append('advance',$scope.quickBill.advance);
				 }
				 else{
					 formdata.append('advance',0);
				 }
				
				if($scope.quickBill.extraCharge){
					formdata.delete('extraCharge');
					formdata.append('extraCharge',$scope.quickBill.extraCharge);
				}
				else{
					formdata.delete('extraCharge');
					formdata.append('extraCharge',0);
				}
					
				 formdata.append('balance',$scope.balanceTable);
				 
			}
			
			// if($scope.changeProductAdvancePrice){
				
				 // if($scope.quickBill.advance){
					
					 // formdata.append('advance',$scope.quickBill.advance);
				 // }
				 // else{
					 // formdata.append('advance',0);
				 // }
				 
			// }
			 
			
		}
		else{
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Inserting....',600000);
			
			var  date = new Date(vm.dt1);
			var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
				
			if(!formdata.has('entryDate')){
				
				
		
				formdata.append('entryDate',fdate);
			}
			
			 formdata.append('transactionDate',fdate);
			 
			if(!formdata.has('contactNo')){
				formdata.append('contactNo','');
			}
			 
			 if(!formdata.has('stateAbb'))
			{
				formdata.append('stateAbb',$scope.quickBill.stateAbb.stateAbb);
			}
			
			 if(!formdata.has('cityId'))
			{
				formdata.append('cityId',$scope.quickBill.cityId.cityId);
			}
			
		
				
			formdata.append('invoiceNumber',$scope.quickBill.invoiceNumber);
			if(!formdata.has('paymentMode')){
				
				formdata.append('paymentMode',$scope.quickBill.paymentMode);
			}
			
			
			
			formdata.append('total',$scope.totalTable);
			 formdata.append('tax',$scope.quickBill.tax);
			 formdata.append('grandTotal',$scope.grandTotalTable);
			 if($scope.quickBill.advance){
				
				 formdata.append('advance',$scope.quickBill.advance);
			 }
			 else{
				 formdata.append('advance',0);
			 }
			
			if($scope.quickBill.extraCharge){
				
				formdata.delete('extraCharge');
				formdata.append('extraCharge',$scope.quickBill.extraCharge);
			}
			else{
				formdata.delete('extraCharge');
				formdata.append('extraCharge',0);
			}
				
			 formdata.append('balance',$scope.balanceTable);
			
			formdata.append('isDisplay','yes');
			
			var BillPath = apiPath.postBill;
		}
	 
	  
	  
	 if($scope.changeProductArray){
		 
		 var  date = new Date();
		var tdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		
			if(!formdata.has('transactionDate')){
				
				formdata.append('transactionDate',tdate);
				
			}
		  
		   
		 //Inventory
		  var json2 = angular.copy(vm.AccBillTable);
		 
		 for(var i=0;i<json2.length;i++){
			 
			angular.forEach(json2[i], function (value,key) {
				
				formdata.append('inventory['+i+']['+key+']',value);
			});
					
		 }
	 
	 }
	 
	 
	 if($scope.saleType == 'RetailsaleBill'){
		 
		$scope.salesTypeHeader = 'retail_sales';
		
	 }
	 else if($scope.saleType == 'WholesaleBill'){
		 
		$scope.salesTypeHeader = 'whole_sales';

	 }
	 
	// alert($scope.salesTypeHeader);
	 if(generate == 'preprint'){
					
		var headerData = {'Content-Type': undefined,'salesType':$scope.salesTypeHeader,'operation':'preprint'};
		
	}
	else{
		var headerData = {'Content-Type': undefined,'salesType':$scope.salesTypeHeader};
	}
	   
			
		apiCall.postCallHeader(BillPath,headerData,formdata).then(function(data){
			
			toaster.clear();
			
			//console.log(data);
			
			
			// Delete formdata  keys
			// for (var key of formdata.keys()) {
			   // formdata.delete(key); 
			// }
			
			//Delete Inventory Data From Formdata Object
			var json3 = angular.copy(vm.AccBillTable);
			 
			for(var i=0;i<json3.length;i++){
				 
				angular.forEach(json3[i], function (value,key) {
					
					formdata.delete('inventory['+i+']['+key+']');
				});
					
			}
			
			// formdata.delete('inventory[1][productName]');
			// formdata.delete('inventory[1][frameNo]');
			// formdata.delete('inventory[1][discount]');
			// formdata.delete('inventory[1][qty]');
			
			
			formdata.delete('entryDate');
			formdata.delete('invoiceNumber');
			formdata.delete('transactionDate');
			formdata.delete('total');
			formdata.delete('tax');
			formdata.delete('grandTotal');
			formdata.delete('advance');
			formdata.delete('balance');
			formdata.delete('labourCharge');
			
			//formdata.delete('inventory');
			formdata.delete('isDisplay');
			
			
			if(angular.isObject(data) && data.hasOwnProperty('documentPath')){
				
				if($scope.quickBill.EditBillData){
					
					toaster.pop('success', 'Title', 'Update Successfully');
				}
				else{
					
					toaster.pop('success', 'Title', 'Insert Successfully');
				}
				
				$scope.disableButton = false;
				
				// apiCall.postCall(apiPath.getAllInvoice+'/'+$scope.quickBill.invoiceId,formdataNew).then(function(response3){
			
					// console.log(response3);
					// formdataNew.delete('endAt');
		
				// });
				angular.element("input[type='file']").val(null);
				formdata.delete('file[]');
				
				
				
				formdata.delete('companyId');
				formdata.delete('contactNo');
				formdata.delete('workNo');
				formdata.delete('companyName');
				formdata.delete('clientName');
				
				formdata.delete('emailId');
				formdata.delete('address1');
				formdata.delete('address2');
				formdata.delete('stateAbb');
				formdata.delete('cityId');
				formdata.delete('paymentMode');
				formdata.delete('bankName');
				formdata.delete('checkNumber');
				formdata.delete('remark');
				
				$scope.clearScannedResult();
				
				
				if(generate == 'generate'){
					
					var pdfPath = $scope.erpPath+data.documentPath;
					// var printwWindow = $window.open(pdfPath, '_blank');
					// printwWindow.print();
					$scope.directPrintPdf(pdfPath);
				}
				else if(generate == 'preprint'){
					
					var pdfPath = $scope.erpPath+data.preprintDocumentPath;
					// var printwWindow = $window.open(pdfPath, '_blank');
					// printwWindow.print();
					$scope.directPrintPdf(pdfPath);
				}
				else{
					//console.log('Not');
				}
			
				var companyObject = $scope.quickBill.companyDropDown;
				$scope.quickBill = [];
				vm.dt1 = new Date();
				vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
				vm.productTax = [{"tax":0,"additionalTax":0}];
				//vm.cityDrop = [];
				
				$scope.changeProductArray = false;
				$scope.changeProductAdvancePrice = false;
				vm.disableCompany = false; 
				
				// $scope.defaultComapny();
				$scope.ReloadAfterSave(companyObject);
				
				$scope.clientGetAllFunction();
				
			//	$scope.getInitStateCity(); //get Default State and City
				
				//$scope.stateAndCityDefault(defStateData,defCityData); 
				
				$scope.quickBill.paymentMode = 'cash';
				
				$anchorScroll();
				$("#contactNoSelect").focus();
			
			}
			else{
				toaster.clear();
				if(apiResponse.noContent == data){
					
					toaster.pop('warning', 'Opps!!', 'Field Not Change');
				}
				else if(data.status == 500){
					toaster.pop('warning', 'Something Wrong', data.statusText);
				}
				else{
					toaster.pop('warning', 'Something Wrong', data);
				}
				
				 $scope.disableButton = false;
			}
			
			
			
	
		}).catch(function (reason) {
			 // err
			 if (reason.status === 500) {
				// do something
				
				console.log('Encountered server error');
			 }
		});
  }
 
	
	$scope.cancel = function(){
		
		$scope.quickBill = [];
		
		$scope.disableButton = false; 
		
		angular.element("input[type='file']").val(null);
		formdata.delete('file[]');
		
	
		//Delete Inventory Data From Formdata Object
		var json3 = angular.copy(vm.AccBillTable);
		 
		for(var i=0;i<json3.length;i++){
			 
			angular.forEach(json3[i], function (value,key) {
				
				formdata.delete('inventory['+i+']['+key+']');
			});
				
		}
		
		formdata.delete('entryDate');
		formdata.delete('invoiceNumber');
		formdata.delete('transactionDate');
		formdata.delete('total');
		formdata.delete('tax');
		formdata.delete('grandTotal');
		formdata.delete('advance');
		formdata.delete('balance');
		formdata.delete('labourCharge');
		
		//formdata.delete('inventory');
		formdata.delete('isDisplay');
		
		formdata.delete('companyId');
		formdata.delete('contactNo');
		formdata.delete('workNo');
		formdata.delete('companyName');
		formdata.delete('clientName');
		
		formdata.delete('emailId');
		formdata.delete('address1');
		formdata.delete('address2');
		formdata.delete('stateAbb');
		formdata.delete('cityId');
		formdata.delete('paymentMode');
		formdata.delete('bankName');
		formdata.delete('checkNumber');
		formdata.delete('remark');
		
		$scope.clearScannedResult();
				
		vm.dt1 = new Date();
		vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
		vm.productTax = [{"tax":0,"additionalTax":0}];
		vm.cityDrop = [];
		
		$scope.changeProductArray = false;
		$scope.changeProductAdvancePrice = false;
		vm.disableCompany = false;
		
		$scope.defaultComapny();
		
		$scope.clientGetAllFunction();
		
		$scope.quickBill.paymentMode = 'cash';
		
		$("#contactNoSelect").focus();

		$anchorScroll();
		
		
	}
		
	$scope.directPrintPdf = function(pdfUrlPath){
		
		/** Print **/
		 $http({
			url : pdfUrlPath,
			method : 'GET',
			headers : {
				'Content-type' : 'application/pdf'
			},
			responseType : 'arraybuffer'
		}).success(function(data, status, headers, config) {
			var pdfFile = new Blob([ data ], {
				type : 'application/pdf'
			});
			var pdfUrl = URL.createObjectURL(pdfFile);
			$scope.content = $sce.trustAsResourceUrl(pdfUrl);
			
			 // var el = document.getElementById("report");
			// el.focus();
			// el.print();
			var printwWindow = $window.open(pdfUrl);
			printwWindow.print();
		}).error(function(data, status, headers, config) {
			alert('Sorry, something went wrong')
		});
		/** End **/
					
	}
	
	
	$scope.scannedImageSaveToFormData = function(url,callback){
		
		
		var xhr = new XMLHttpRequest();
		  xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
			  callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		  };
		  xhr.open('GET', url);
		  xhr.responseType = 'blob';
		  xhr.send();

		  /** Print **/
			 // $http({
				// url : url,
				// method : 'GET',
				// headers : {
					// 'Content-type' : undefined
				// }
			// }).success(function(data, status, headers, config) {
				
				  // var pdfFile = new Blob([data], {
					// type : 'image/png'
				// });

				
				// formdata.append("file[]",pdfFile);
				
			// }).error(function(data, status, headers, config) {
				// alert('Sorry, something went wrong')
			// });
		/** End **/
		
					
	}
	
	
	$scope.setClientSuggest = function(Fname,data){
		
		console.log(data);
		$scope.quickBill.cityId = {};
		$scope.quickBill.stateAbb = {};
		
		//$scope.quickBill.WorkNo = data.workNo;
		//$scope.quickBill.companyName = data.companyName;
		$scope.quickBill.clientName = data.clientName;
		$scope.quickBill.emailId = data.emailId;
		
		$scope.quickBill.fisrtAddress = data.address1;
		//$scope.quickBill.secondAddress = data.address2;
		
		
		//State DropDown Selection
		// vm.statesDrop=[];
		// vm.cityDrop=[];
		// stateCityFactory.getState().then(function(response){
			
			// vm.statesDrop = response;
			  // $scope.quickBill.stateAbb =  stateCityFactory.getDefaultState($scope.quickBill.EditBillData.client.stateAbb);
			// vm.cityDrop = stateCityFactory.getDefaultStateCities($scope.quickBill.EditBillData.client.stateAbb);
			// $scope.quickBill.cityId = stateCityFactory.getDefaultCity($scope.quickBill.EditBillData.client.cityId);
		// });
			
		
		$scope.quickBill.stateAbb = data.state;		
		formdata.delete('stateAbb');
		formdata.append('stateAbb',$scope.quickBill.stateAbb.stateAbb);
				
		vm.cityDrop = stateCityFactory.getDefaultStateCities(data.state.stateAbb);
		$scope.quickBill.cityId = data.city;
		formdata.delete('cityId');
		formdata.append('cityId',$scope.quickBill.cityId.cityId);
		
		/** Set Data In Form **/
			if(formdata.has(Fname)){
				
				formdata.delete(Fname);
			}
			formdata.append(Fname,$scope.quickBill.BillContact);
			
			//formdata.delete('workNo');
			//formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('invoiceNumber');
			formdata.delete('emailId');
			formdata.delete('address1');
			//formdata.delete('address2');
			
			  formdata.append('clientName',$scope.quickBill.clientName);
			  
			 if($scope.quickBill.emailId){
				 
			  formdata.append('emailId',$scope.quickBill.emailId);
			 }
			  
			  if($scope.quickBill.fisrtAddress){
				 
				 formdata.append('address1',$scope.quickBill.fisrtAddress);
			  }
			/** End **/
	}
	
	
	
	//Set Multiple File In Formdata On Change
	$scope.uploadFile = function(files) {
		
		//console.log(files);
		//formdata.append("file[]", files[0]);
		var flag = 0;
		
		for(var m=0;m<files.length;m++){
			
			if(parseInt(files[m].size) > maxImageSize){
				
				flag = 1;
				toaster.clear();
				//toaster.pop('alert','Image Size is Too Long','');
				toaster.pop('alert', 'Opps!!', 'Image Size is Too Long');
				formdata.delete('file[]');
				angular.element("input[type='file']").val(null);
				break;
			}
			
		}
		
		if(flag == 0){
			
			formdata.delete('file[]');
			
			angular.forEach(files, function (value,key) {
				formdata.append('file[]',value);
			});
		}

	};

	
	/** Next Previews **/
	
		$scope.goToNextPrevious = function(nextPre){
			
				toaster.clear();
				if($scope.quickBill.companyDropDown){
					
					//Code Start
						toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
				
						var formdata = new FormData();
						
						
						
						var preHeaderData = {'Content-Type': undefined,'companyId':$scope.quickBill.companyDropDown.companyId};
						
						if($scope.saleType == 'RetailsaleBill'){
				 
							preHeaderData.salesType = 'retail_sales';
							
						 }
						 else if($scope.saleType == 'WholesaleBill'){
							 
							preHeaderData.salesType = 'whole_sales';

						 }
						
						if(nextPre == "first" || nextPre == "last"){
							preHeaderData.operation = nextPre;
						}
						else{
							
							if($scope.quickBill.EditBillData){
							
								if(nextPre == 'next'){
								
								preHeaderData.nextSaleId = $scope.quickBill.EditBillData.saleId;
								
								}
								else{
									preHeaderData.previousSaleId = $scope.quickBill.EditBillData.saleId;
								}
								
							}
							else{
								
								if(nextPre == 'next'){
								
								preHeaderData.nextSaleId = 0;
								
								}
								else{
									preHeaderData.previousSaleId = 0;
								}
								
							}
						
						}
						
						
					
						//var preHeaderData = {'Content-Type': undefined,'sale_id':sale_id,'salesType':$scope.saleType};
						
						apiCall.getCallHeader(apiPath.postBill,preHeaderData).then(function(response){
							
							//console.log(response);
							if(angular.isArray(response)){
								$scope.quickBill = [];
								getSetFactory.set(response[0]);
								
								$scope.EditAddBill();
								
								$anchorScroll();
								
							}
							else{
								
								if(apiResponse.noContent == response){
									toaster.clear();
									toaster.pop('warning', 'Opps!!', 'Data Not Available');
								}
								else if(response.status == 500){
									toaster.clear();
									toaster.pop('warning', 'Something Wrong', response.statusText);
								}
								else{
									toaster.clear();
									toaster.pop('warning', 'Something Wrong', response);
								}
								
							}
							
							
							//$scope.quickBill.companyDropDown = response[0].company;
						})
						
					//End
				}
				else{
					
					toaster.pop('info', 'please Select Company', '');
				}
			
			
		}
	
	/** End **/
	
	/** Preview Bill **/
	
		$scope.previewBill = function(size){
		
			toaster.clear();
			
			if (Modalopened) return;
			
			 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
			 
			if($scope.quickBill.companyDropDown){
		
			var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/QuickMenu/PreviewBillModal.html',
			  controller: previewBillModalController,
			  resolve:{
				  companyId: function(){
					 
					return $scope.quickBill.companyDropDown;
				  },
				  entryDate: function(){
					 
					return vm.dt1;
				  },
				  billData: function(){
					 
					return $scope.quickBill;
				  },
				  inventoryData: function(){
					  
					 return vm.AccBillTable;
				  },
				  taxData: function(){
					  
					  return vm.productTax;
				  },
				  total: function(){
					  
					 return $scope.totalTable;
				  },
				  totalTax: function(){
					  
					 return $scope.quickBill.tax;
				  },
				  grandTotal: function(){
					  
					 return $scope.grandTotalTable;
				  },
				  advance: function(){
					  
					 return $scope.quickBill.advance;
				  },
				  balance: function(){
					  
					 return $scope.balanceTable;
				  },
				  remark: function(){
					  
					 return $scope.quickBill.remark;
				  },
				  buttonValidation: function(){
					  
					 return $scope.formBill.$invalid;
				  },
				  insertOrUpdate: function(){
					  
					  if($scope.quickBill.EditBillData){
						 
						 return 'update';
					  }
					  else{
						  
						 return 'insert';
					  }
				  }
			  }
			});

			Modalopened = true;
		   
			modalInstance.opened.then(function() {
				toaster.clear();
			});
		
				modalInstance.result.then(function (data) {
				
					$scope.pop(data);
					Modalopened = false;
					
				}, function () {
				  console.log('Cancel');
					Modalopened = false;
				});
			}
			else{
				
				toaster.pop('info', 'please Select Company', '');
			}
			
		}
		
	/** End **/
	
  // Datepicker
  // ----------------------------------- 
	this.minStart = new Date();

  this.today = function() {
    this.dt1 = new Date();
  };
  
	if(!$scope.quickBill.EditBillData){
		  
		this.today();
	}

  this.clear = function () {
    //this.dt1 = null;
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
  // this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = dateFormats;

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
    //this.mytime = null;
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
  Product Model Start
  **/
  $scope.openProduct = function (size,index) {
	
	
	if (Modalopened) return;
	
	toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
	
	if($scope.quickBill.companyDropDown){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/productModal.html',
		  controller: AccProductModalController,
		  size: size,
		  resolve:{
			  productIndex: function(){
				  return index;
			  },
			  companyId: function(){
				 
				return $scope.quickBill.companyDropDown;
			  }
		  }
		});

		Modalopened = true;
		
		modalInstance.opened.then(function() {
			toaster.clear();
		});

		modalInstance.result.then(function (data) {
		 
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
			//console.log(data);
			 var UrlPath = apiPath.getProductByCompany+data.companyId;
			
			// apiCall.getCall(UrlPath+'/branch').then(function(responseDrop){
			
				// vm.productNameDrop = responseDrop;
		
			// });
			productFactory.blankProduct();
			productFactory.getProductByCompany(data.companyId).then(function(response){
				
				vm.productNameDrop = response;
				toaster.clear();
			});
			
			
			var headerSearch = {'Content-Type': undefined,'productName':data.productName,'color':data.color,'size':data.size};
			
			apiCall.getCallHeader(UrlPath,headerSearch).then(function(response){
				
				//console.log(response);
				vm.AccBillTable[data.index].productName = response[0].productName;
				//vm.AccBillTable[data.index].productId = response.productId;
				
				$scope.setProductData(response[0],data.index);
				
			});
			
			Modalopened = false;
		
		}, function () {
		  console.log('Cancel');	
		  Modalopened = false;
		});
	}
	else{
		alert('Please Select Company');
	}
  };
  /**
  Product Model End
  **/
			
			$scope.countScannedDocumet = 0;
			$scope.clearScannedResult = function(){
				
				if($scope.countScannedDocumet > 0){
					
					var scanCount = $scope.countScannedDocumet;
					for(var delIndex = 0;delIndex < scanCount;delIndex++){
					
						formdata.delete('scanFile['+delIndex+']');
					}
					
					$scope.countScannedDocumet = 0;
				}
		
			}
			
	$scope.openScanPopup = function(imageUrl){
		
		$templateCache.remove('http://'+window.location.host+'/front-end/app/views/QuickMenu/DocumentScan/DWT_Upload_Download_Demo.html');
		 //$(".modal-body").html("");
		 
		 console.log('http://'+window.location.host+'/front-end/app/views/QuickMenu/DocumentScan/DWT_Upload_Download_Demo.html');
		 
		 if (Modalopened) return;
		 
		 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
		 
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/QuickMenu/DocumentScan/DWT_Upload_Download_Demo.html?buster='+Math.random(),
		  controller: documentScanController,
		  size: 'lg',
		  resolve:{
			  imageUrl: function(){
				  return imageUrl;
			  }
		  }
		 // preserveScope: true
		});
		
		Modalopened = true;
		
		modalInstance.opened.then(function() {
			toaster.clear();
		});
		
		modalInstance.result.then(function (data) {
		 
		console.log('ok');
		
		if(data.length > 0){
		
			  $scope.countScannedDocumet = data.length;
			  
			  var CountImg = data.length;
			  var srNo = 0;
			  
			  for(var ImgIndex = 0;ImgIndex < CountImg;ImgIndex++){
				  
				   var noIndex = ImgIndex;
				  
				  
				  // var convertToFile = $scope.scannedImageSaveToFormData;
				  // $scope.scannedImageSaveToFormData(data[ImgIndex]);
				  // convertToFile(data[noIndex], function(base64Img) {
					  // console.log(base64Img);
					
					  var ImgResponse = data[noIndex];
					  
					  formdata.append("scanFile["+srNo+"]",ImgResponse);
					  srNo++;
					  
					// });
					
			  }
			toaster.pop('success',data.length+' Document Scanned','');
				
		}
			  
			Modalopened = false;
			
		}, function (data) {
		  console.log('Cancel');	
	
	
			if(data == "clear"){
				
				$scope.clearScannedResult();
				toaster.pop('info','Documents Clear','');
				
			}
		  
			 Modalopened = false; 
			
			
		 // $scope.imageTwainImg = data;
		 // console.log(length);	
		});
		
	}		
			
  $scope.focusbarcode = function(){

	//$("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.stop();
	//console.log('done');
	 // console.log(arg.resultFunction());
  }
  
  $scope.SetBarcodData = function(Bcode){
	  
	
					
					//console.log('Code 128');
					
					//var proBarcode = result.code;
					var proBarcode = Bcode;
					
					//Api
						
						var headerSearch = {'Content-Type': undefined,'productCode':proBarcode};
				
						apiCall.getCallHeader(apiPath.getAllProduct,headerSearch).then(function(response){
							
							var companyId = $scope.quickBill.companyDropDown.companyId;
							
							/** Inner Loop **/
								/** Check Product is Already in Array or not **/
								var checkFlag = 0;
									var cnt = vm.AccBillTable.length;
									for(var m=0;m<cnt;m++){
										
										var arrayData = vm.AccBillTable[m];
										
										if(companyId == response.company.companyId){
											
											if(arrayData.productId == response.productId){
												
												
												toaster.clear();
												toaster.pop('info', 'Product Already Selected', '');
								
												checkFlag = 1;
												//console.log(arrayData);
												break;
											}
										}
										else{
											
											toaster.clear();
											toaster.pop('info', 'Product has Diffrent Company', '');
											checkFlag = 1;
											break;
										}
										
									}
								/** End Check Product **/
								if(checkFlag == 0){
									
									var barcodeflag = 0;
									var checkCnt = vm.AccBillTable.length;
										for(var cVar=0;cVar<checkCnt;cVar++){
											
											var arrayData = vm.AccBillTable[cVar];
											
											if(arrayData.productId == ""){
												
												vm.AccBillTable[cVar].productName = response.productName;
												//vm.AccBillTable[data.index].productId = response.productId;
												
												$scope.setProductData(response,cVar);
												toaster.clear();
												toaster.pop('success', 'Barcode Scanned', '');
								
												barcodeflag = 1;
												//console.log(arrayData);
												break;
											}

											
										}
										
										var nextindex = parseInt(cnt)-1;
										if(barcodeflag == 0){
											
											$scope.addRow(nextindex);
											
											var fatIndex = nextindex+1;
											
											//console.log(response);
											vm.AccBillTable[fatIndex].productName = response.productName;
											//vm.AccBillTable[data.index].productId = response.productId;
											
											$scope.setProductData(response,fatIndex);
											//$scope.$apply();
											toaster.clear();
											toaster.pop('success', 'Barcode Scanned', '');	
											
											$scope.$apply();
										}
								}
							/** End loop **/
							
						});
								
					//End Api
					
					
				
  }
  
$scope.presssuburb = function(event){
	
	 if(event.target.value.length == 14){
			
			console.log(event.target.value.length);
			$scope.SetBarcodData(event.target.value);
	 }
}
	
	 $scope.DWT_AcquireImage= function(){
			
			var DWObject = $window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
				 
             // var DWObject = Dynamsoft.WebTwainEnv;
			//DWObject.IfDisableSourceAfterAcquire = true; 
             DWObject.SelectSource();
			DWObject.OpenSource();
			DWObject.IfShowUI = false;
			// DWObject.IfFeederEnabled = true;

			// DWObject.IfAutoFeed = true;

         DWObject.XferCount = -1;
		//DWObject.PageSize = EnumDWT_CapSupportedSizes.TWSS_USLEGAL;
		// DWObject.Unit = EnumDWT_UnitType.TWUN_INCHES;
        //DWObject.SetImageLayout(0, 0, 5, 5);
         DWObject.AcquireImage(); //using ADF  for scanning

		

		DWObject.IfShowFileDialog = false;

			 if (DWObject.ErrorCode != 0) {  

				 alert (DWObject.ErrorString);

			 }
			 
			DWObject.RegisterEvent("OnPostAllTransfers", function () {
				var imageUrl = DWObject.GetImageURL(0);
				$scope.openScanPopup(imageUrl);
				console.log(imageUrl);
			 });

    }

	
	
         // $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.play();
			
			// $scope.getClass = function (path) {
  // return ($location.path().substr(0, path.length) === path) ? 'active' : '';
// }
}
RetailsaleBillController.$inject = ["$rootScope","$scope","apiCall","apiPath","$http","$window","$modal", "$log","validationMessage","saleType","productArrayFactory","getSetFactory","toaster","apiResponse","$anchorScroll","$location","maxImageSize","$sce","$templateCache","getLatestNumber","productFactory","stateCityFactory","$filter"];