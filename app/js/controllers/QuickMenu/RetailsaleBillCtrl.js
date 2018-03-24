
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.initiate.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.config.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Scripts/script.js');

var taxInvoice = angular.module('taxInvoice',[]);
taxInvoice.directive('stateList',function(){
	return{
		required:'E',
		scope:{
			dataSet:'=dataSet',
			selectedState:'@',
			changeFunction: '&'
		},
		template:'<select chosen="" data-ng-model="selectedState" data-ng-options="s.stateName for s in dataSet track by s.stateAbb" ng-change="changeFunction" class="form-control input-sm chosen-select" ng-required="true" ></select>'
	}
});

taxInvoice.controller('RetailsaleBillController', RetailsaleBillController);

function RetailsaleBillController($rootScope,$scope,apiCall,apiPath,$http,$window,$modal,validationMessage,saleType,productArrayFactory,getSetFactory,toaster,apiResponse,$anchorScroll,maxImageSize,$sce,$templateCache,getLatestNumber,productFactory,stateCityFactory,$filter,$state,clientFactory,fetchArrayService,bankFactory) {
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
	vm.AccExpense = [];
	//vm.productTax = [];
			
	var defStateData = {};
	var AllDefCityData = [];
	var defCityData = {};
	
	$scope.noOfDecimalPoints; // decimalPoints For Price,Tax Etc.....
	
	$scope.productArrayFactory = productArrayFactory;
	
	$scope.changeProductArray = false; // Change When Update in Product Table Array
	$scope.changeProductAdvancePrice = false;  // Change Advance Price of Product
	
	$scope.quickBill.tax = 0; //Tax
	
	$scope.total_without_expense;
	$scope.total;
	$scope.grandTotalTable;
	$scope.quickBill.balance;
	
	//Invoice Number 
	$scope.quickBill.invoiceNumber;
	$scope.quickBill.invoiceEndAt;
	$scope.quickBill.invoiceId;
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	vm.paymentModeDrop =['cash','bank','card','credit','neft','rtgs','imps','nach','ach'];

	$scope.quickBill.paymentMode = 'cash';
	vm.serviceDate;
	var arrayData1=[];

	//get settings date for set service-date
	apiCall.getCall(apiPath.settingOption).then(function(response2){
		if(angular.isObject(response2) || angular.isArray(response2))
		{
			var responseLength = response2.length;
			for(var arrayData=0;arrayData<responseLength;arrayData++)
			{
				if(response2[arrayData].hasOwnProperty("servicedateNoOfDays"))
				{
					arrayData1 = response2[arrayData];
					if(arrayData1.settingType == "servicedate")
					{
						setTimeout(function() {
							$scope.changeBillDate('entryDate');	
						}, 1000);
					}
				}
				else
				{
					vm.serviceDate=vm.dt1.getDate();
				}
			}
		}
	});

	$scope.enableDisableColor = false;
	$scope.enableDisableSize = false;
	$scope.enableDisableFrameNo = false;
	$scope.divTag = false;
	$scope.colspanValue = '6';
	$scope.colspanAdvanceValue = '7';
	$scope.totalTd = '13';
	//get setting data
	$scope.getOptionSettingData = function(){
		toaster.clear();
		apiCall.getCall(apiPath.settingOption).then(function(response){
			var responseLength = response.length;
			console.log("setting response",response);
			for(var arrayData=0;arrayData<responseLength;arrayData++)
			{
				if(angular.isObject(response) || angular.isArray(response))
				{
					if(response[arrayData].settingType=="product")
					{
						var arrayData1 = response[arrayData];
						$scope.enableDisableColor = arrayData1.productColorStatus=="enable" ? true : false;
						$scope.enableDisableSize = arrayData1.productSizeStatus=="enable" ? true : false;
						$scope.enableDisableFrameNo = arrayData1.productFrameNoStatus=="enable" ? true : false;
						$scope.divTag = $scope.enableDisableColor == false && $scope.enableDisableSize == false ? false : true;
						$scope.colspanValue = $scope.divTag==false ? '5' : '6';
						$scope.totalTd = $scope.divTag==false ? '12' : '13';
						$scope.colspanAdvanceValue = $scope.divTag==false ? '6' : '7';
					}
				}
			}
		});
	}
	$scope.getOptionSettingData();

	$scope.getInvoiceAndJobcardNumber = function(id){
		
		if($scope.saleType == 'QuotationPrint'){
			
			var getLatestInvoice = apiPath.getLatestQuotation+id+apiPath.getLatestInvoice2;
		}
		else{
			
			var getLatestInvoice = apiPath.getLatestInvoice1+id+apiPath.getLatestInvoice2;
		}
		//Get Invoice#
		apiCall.getCall(getLatestInvoice).then(function(response4){
			
			if($scope.saleType == 'QuotationPrint'){
				
				$scope.quickBill.invoiceNumber = getLatestNumber.getQuotation(response4[0]);
				
			}
			else{
				$scope.quickBill.invoiceNumber = getLatestNumber.getInvoice(response4);
			}
		});
			
		getInitStateCity();
	}
	
	$scope.expenseAmount=[];
	$scope.getExpenseValue = function(index)
	{
		// console.log("length = ",vm.AccExpense.length);
		var expenseType = vm.AccExpense[index].expenseType;
		var expenseValue = vm.AccExpense[index].expenseValue;
		// var expenseValue = vm.AccExpense[index].expenseOperation;
		var totalData=0;
		if(index==0)
		{
			totalData = parseFloat($scope.total_without_expense);
		}
		else
		{
			totalData = parseFloat($scope.expenseAmount[index-1]);
		}
		if(vm.AccExpense[index].expenseOperation=="plus")
		{
			var totalExpense = expenseType=="flat" ? parseFloat(expenseValue)+ parseFloat(totalData) : (((parseFloat(expenseValue)/100)*parseFloat($scope.total_without_expense)) + parseFloat(totalData));
		}
		else
		{
			var totalExpense = expenseType=="flat" ? parseFloat(totalData) - parseFloat(expenseValue)  : (  parseFloat(totalData) - ((parseFloat(expenseValue)/100)*parseFloat($scope.total_without_expense)));
		}
		
		$scope.total = $scope.expenseAmount[$scope.expenseAmount.length-1];
		return totalExpense;
		
	}

	$scope.openExpenseRawData=false;
	//open expense raw
	$scope.openExpenseRaw = function()
	{
		$scope.openExpenseRawData=true;
		$scope.addExpenseRow(-1);
	}

	//Default Company Function
	$scope.defaultComapny = function(){
		
		toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
		vm.loadData = true;
		
		//Set default Company
		var  response2 = fetchArrayService.myIndexOfObject(vm.companyDrop,'ok','isDefault');
		var id = response2.companyId;
		
		$scope.quickBill.companyId = response2;
		
		formdata.delete('companyId');
		formdata.set('companyId',response2.companyId);
		
		$scope.noOfDecimalPoints = parseInt(response2.noOfDecimalPoints);
		
		$scope.getInvoiceAndJobcardNumber(id); // Invoice#
		//Auto Suggest Product Dropdown data
		vm.productNameDrop = [];
		
		productFactory.getProductByCompany(id).then(function(data){
			
			vm.productNameDrop = data;
			vm.loadData = false;
			//insertvalTime();
		});
		
		$scope.printButtonType = response2.printType == '' ? 'print':response2.printType;
	}
	
	$scope.ReloadAfterSave = function(response2){
		
		$scope.quickBill.companyId = response2;
			
			formdata.delete('companyId');
			
			
			formdata.set('companyId',response2.companyId);
			
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
		vm.clientWorkSuggestion = [];
		clientFactory.getClient().then(function(responseDrop){
			vm.clientSuggest = responseDrop;
			// console.log(responseDrop);
			var responseLength = responseDrop.length;
			for(var arrayData=0;arrayData<responseLength;arrayData++)
			{
				if(responseDrop[arrayData].contactNo1 !='' && responseDrop[arrayData].contactNo1 !='null' && responseDrop[arrayData].contactNo1 !=null)
				{
					vm.clientWorkSuggestion.push(responseDrop[arrayData]);	
				}
			}
			
		});
		
		vm.professionDrop = [];
		clientFactory.getProfession().then(function(responseDrop){
			vm.professionDrop = responseDrop;
		});
	}
	
	
	$scope.clientGetAllFunction();
	
	
	// vm.statesDrop=[];
	// apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		// vm.statesDrop = response3;
		
	// });
	
	
	function getInitStateCity(){
		vm.statesDrop=[];
		vm.cityDrop = [];
		
		stateCityFactory.getState().then(function(response){
			toaster.clear();
			vm.statesDrop = response;
			$scope.quickBill.stateAbb = stateCityFactory.getDefaultState($rootScope.defaultState);
				
				
			vm.cityDrop = stateCityFactory.getDefaultStateCities($rootScope.defaultState);
			$scope.quickBill.cityId = stateCityFactory.getDefaultCity($rootScope.defaultCity);
				
				//console.log('state Inn');
		});
	}
	
	//$scope.getInitStateCity();
	
	//get Bank
	vm.bankDrop=[];
	bankFactory.getBank().then(function(response){
		var count = response.length;
		while(count--){
			vm.bankDrop.push(response[count].bankName);
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
		
		/*var varTax = {};
		varTax.tax = 0;
		varTax.additionalTax = 0;
		varTax.igst = 0;
		
		vm.productTax.splice(plusOne, 0, varTax); */
		
		$scope.changeProductArray = true;

		
    };


	$scope.removeRow = function (idx) {
		vm.AccBillTable.splice(idx,1);
		//vm.productTax.splice(idx, 1);
		
		vm.productHsn.splice(idx,1);
		
		$scope.changeProductArray = true;
		
		$scope.advanceValueUpdate();
	};
	
	$scope.addExpenseRow = function(index){
		
		var plusOne = index+1;
		
		var data = {};
		data.expenseType = 'flat';
		data.expenseOperation = 'plus';

		//vm.AccBillTable.push(data);
		vm.AccExpense.splice(plusOne,0,data);
		$scope.changeProductArray = true;
    };


	$scope.removeExpenseRow = function (idx) {
		vm.AccExpense.splice(idx,1);
		$scope.expenseAmount.splice(idx,1);
		$scope.changeProductArray = true;

		//vm.productTax.splice(idx, 1);
		
		// vm.productHsn.splice(idx,1);
		
		// $scope.changeProductArray = true;
		
		 $scope.advanceValueUpdate();
	};
	var expenseGetApiPath = apiPath.settingExpense;
	$scope.expenseData=[];
	// Get All Expense Call 
	apiCall.getCall(expenseGetApiPath).then(function(response){
		// console.log(response);
		$scope.expenseData = response;
		console.log($scope.expenseData);
	});

	//save expense-name in expense-data
	$scope.setExpenseData = function(item,index)
	{
		vm.AccExpense[index].expenseName = item.expenseName;
		vm.AccExpense[index].expenseId = item.expenseId;
		vm.AccExpense[index].expenseValue = item.expenseValue;
		vm.AccExpense[index].expenseType = item.expenseType;
		vm.AccExpense[index].expenseOperation = 'plus';
		$scope.changeProductArray = true;
	}

	vm.productHsn = [];
	$scope.setProductData = function(item,index)
	{
		vm.AccBillTable[index].productId = item.productId;
		vm.productHsn[index] = item.hsn;
		
		var grandPrice;
		var tempCgst = checkGSTValue(item.vat);
		var tempSgst = checkGSTValue(item.additionalTax);
		var tempIgst = checkGSTValue(item.igst);

		grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.wholesaleMargin) + parseFloat(item.wholesaleMarginFlat);
		
		if(item.purchasePrice == 0 || grandPrice == 0){
			grandPrice = productArrayFactory.calculate(item.mrp,0,item.wholesaleMargin)  + parseFloat(item.wholesaleMarginFlat);
		}
		
		vm.AccBillTable[index].cgstPercentage = tempCgst;
		vm.AccBillTable[index].sgstPercentage = tempSgst;
		vm.AccBillTable[index].igstPercentage = tempIgst;
		vm.AccBillTable[index].price = grandPrice;
		
		/** Color/Size **/
		vm.AccBillTable[index].color = item.color;
		vm.AccBillTable[index].size = item.size;
		/** End **/
		//vm.productTax[index].tax = tax; //Product Tax
		
		//console.log(vm.AccBillTable);
		
		$scope.calculateTaxReverse(vm.AccBillTable[index],tempCgst,tempSgst,tempIgst);
		
		$scope.changeProductArray = true;
		
		if(!$scope.quickBill.EditBillData){
			$scope.advanceValueUpdate();
		}
		
		
		// $scope.advanceValueUpdate();
	}
	
	
	// End Table 
	
	function checkGSTValue(value){
		
		if(angular.isUndefined(value) || value == '' || isNaN(value)){
			return 0;
		}
		else{
			return parseFloat(value);
		}
	}
	
	//Total Tax For Product Table
	$scope.getTotalTax = function(){
		
		var total = 0;
		var count = vm.AccBillTable.length;
		for(var i = 0; i < count; i++){
			var product = vm.AccBillTable[i];
			// var vartax = vm.productTax[i];
			var totaltax = checkGSTValue(product.cgstPercentage) + checkGSTValue(product.sgstPercentage) + checkGSTValue(product.igstPercentage);
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
		var count = vm.AccBillTable.length;
		for(var i = 0; i < count; i++){
			var product = vm.AccBillTable[i];
			total += parseFloat(product.amount);
		}
		
		if(!isNaN($scope.quickBill.extraCharge) && $scope.quickBill.extraCharge != ''){
			total+=parseFloat($scope.quickBill.extraCharge);
		}
			
		if(isNaN($scope.quickBill.totalDiscount) || $scope.quickBill.totalDiscount === '' || $scope.quickBill.totalDiscount == 0){
			return total;
		}	
		
		if($scope.quickBill.totalDiscounttype == 'flat') {
			return $filter('setDecimal')(total - $scope.quickBill.totalDiscount,$scope.noOfDecimalPoints);
		}
		else{
			var discount = $filter('setDecimal')(total*$scope.quickBill.totalDiscount/100,$scope.noOfDecimalPoints);
			return total-discount;
		}
			
		//return total;
		
	}
	
	/** Tax Calculation **/
	
		$scope.calculateTaxReverse = function(item,cgst,sgst,igst){
			
			var getCgst = checkGSTValue(cgst);
			var getSgst = checkGSTValue(sgst);
			var getIgst = checkGSTValue(igst);

			if(item.discountType == 'flat') {
				
				var amount =  $filter('setDecimal')((item.price*item.qty) - item.discount,$scope.noOfDecimalPoints);
				item.cgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);
				item.sgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);
				item.igstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getIgst,0),$scope.noOfDecimalPoints);
				
				item.amount = $filter('setDecimal')(amount+item.cgstAmount+item.sgstAmount+item.igstAmount,$scope.noOfDecimalPoints);
			}
			else{
				//item.amount = ((item.price*item.qty)-((item.price*item.qty)*item.discount/100) | setDecimal: noOfDecimalPoints);
				var amount  =  $filter('setDecimal')((item.price*item.qty)-((item.price*item.qty)*item.discount/100),$scope.noOfDecimalPoints);
				item.cgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getCgst,0),$scope.noOfDecimalPoints);
				item.sgstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getSgst,0),$scope.noOfDecimalPoints);
				item.igstAmount =  $filter('setDecimal')(productArrayFactory.calculateTax(amount,getIgst,0),$scope.noOfDecimalPoints);
				
				item.amount = $filter('setDecimal')(amount+item.cgstAmount+item.sgstAmount+item.igstAmount,$scope.noOfDecimalPoints);
			}
			if(!$scope.quickBill.EditBillData){
				$scope.advanceValueUpdate();
			}
		}
		
	/** END **/
	
	
	/** Tax Calculation **/
	
		$scope.calculateTaxReverseTwo = function(item,cgst,sgst,igst,index){
		
			var getCgst = checkGSTValue(cgst);
			var getSgst = checkGSTValue(sgst);
			var getIgst = checkGSTValue(igst);
			var TaxSum = getCgst+getSgst+getIgst;
		
			vm.AccBillTable[index].price = $filter('setDecimal')((item.amount/ (1+(TaxSum/100))) / parseInt(item.qty),$scope.noOfDecimalPoints);
			
			vm.AccBillTable[index].cgstAmount = $filter('setDecimal')(vm.AccBillTable[index].price * getCgst/100,$scope.noOfDecimalPoints);
			vm.AccBillTable[index].sgstAmount = $filter('setDecimal')(vm.AccBillTable[index].price * getSgst/100,$scope.noOfDecimalPoints);
			vm.AccBillTable[index].igstAmount = $filter('setDecimal')(vm.AccBillTable[index].price * getIgst/100,$scope.noOfDecimalPoints);
			
			if(!$scope.quickBill.EditBillData){
				$scope.advanceValueUpdate();
			}
			// $scope.advanceValueUpdate();
		}
		
	/** END **/
	
	
	$scope.advanceValueUpdate = function(){
		
		setTimeout(function () { // wait until all resources loaded 
			var expenseData;
			if($scope.openExpenseRawData)
			{
				expenseData = $scope.expenseAmount[$scope.expenseAmount.length-1];
			}
			else
			{
				expenseData = $scope.total_without_expense;
			}
			$scope.quickBill.advance = $filter('setDecimal')(expenseData,2);
			$scope.$digest();
		 }, 1000);
	}
	
	/** Check Update Or Insert Bill **/
	
	$scope.EditAddBill = function(copyData = "",draft = null){
	
		//if(Object.keys(getSetFactory.get()).length){
		if(Object.keys(getSetFactory.get()).length){
			formdata = undefined;
			formdata = new FormData();
			$scope.quickBill.EditBillData = getSetFactory.get();
			
			console.log("billll === ",$scope.quickBill.EditBillData);
			getSetFactory.blank();
			
			draft == 'draft' ? formdata.set('isDraft',$scope.quickBill.EditBillData.saleId) : '';
			draft == 'SalesOrder' ? formdata.set('isSalesOrderUpdate','ok') : '';
			
			var jsonProduct = angular.fromJson($scope.quickBill.EditBillData.productArray);
			var jsonExpense = angular.fromJson($scope.quickBill.EditBillData.expense);
			// console.log("jsonExpense ",jsonExpense);
			vm.disableCompany = false;
			var setCompanyData = $scope.quickBill.EditBillData.company;
			var setDecimalPoint = parseInt($scope.quickBill.EditBillData.company.noOfDecimalPoints);
			//get Company
			vm.companyDrop=[];
			apiCall.getCall(apiPath.getAllCompany).then(function(response2){
					//console.log(response2);
					vm.companyDrop = response2;
					$scope.quickBill.companyId =  setCompanyData;		//Company
					if(copyData != 'copy'){
						
						vm.disableCompany = true;
					}
			});

			var clientDataIndex;
			clientFactory.getSingleClient($scope.quickBill.EditBillData.client.clientId).then(function(docData){
					console.log("client document ",docData);
					clientDataIndex = docData;
			});
			//console.log(clientDataIndex);
			// var clientDataIndex = vm.clientSuggest.findIndex(x => x.clientId==$scope.quickBill.EditBillData.client.clientId);
			// var clientAllData = vm.clientSuggest;
			// var clientDataIndex = clientAllData.filter(function(options){
					// return options.clientId == $scope.quickBill.EditBillData.client.clientId;
				// });
			
			
			if($scope.saleType == 'RetailsaleBill' || $scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
				
				//Set PO Number
				if($scope.quickBill.EditBillData.hasOwnProperty('poNumber')){
					$scope.quickBill.poNumber = $scope.quickBill.EditBillData.poNumber=="" || $scope.quickBill.EditBillData.poNumber==null || $scope.quickBill.EditBillData.poNumber==undefined ? "" : $scope.quickBill.EditBillData.poNumber;
				}
				
				$scope.quickBill.EditBillData.lastPdf = {};
				if($scope.quickBill.EditBillData.hasOwnProperty('file')){
					if($scope.quickBill.EditBillData.file[0].documentId != '' && $scope.quickBill.EditBillData.file[0].documentId != 0){
						var articleWithMaxNumber = $scope.quickBill.EditBillData.file.filter(function(options){
							return options.documentFormat == "pdf";
						}).reduce(function(max, x) {
							return x.documentId > max.documentId ? x : max;
						});
						$scope.quickBill.EditBillData.lastPdf = articleWithMaxNumber || {};
					}
				}

				setTimeout(function(){ 
				
					var clientUpdateData = clientDataIndex;
					angular.element("input[type='file']").val(null);
					angular.element(".fileAttachLabel").html('');
					//$scope.quickBill.documentData = $scope.quickBill.EditBillData.file;
					if(!angular.isUndefined(clientUpdateData)){
						if(clientUpdateData.hasOwnProperty('file')){
							if(clientUpdateData.file[0].clientId != '' && clientUpdateData.clientId != null){
								$scope.quickBill.documentData = angular.copy(clientUpdateData.file);
								console.log("document == ",$scope.quickBill.documentData);
							}
						}
					}
					
				}, 1000);
				
				$scope.quickBill.paymentMode = $scope.quickBill.EditBillData.paymentMode;
				if($scope.quickBill.paymentMode == 'bank' || $scope.quickBill.paymentMode=='neft' || $scope.quickBill.paymentMode=='rtgs' || $scope.quickBill.paymentMode=='imps' || $scope.quickBill.paymentMode=='nach' || $scope.quickBill.paymentMode=='ach'){
					
					$scope.quickBill.checkNumber = $scope.quickBill.EditBillData.checkNumber;
					$scope.quickBill.bankName = $scope.quickBill.EditBillData.bankName;
				}
				
				if(copyData == 'copy'){
				
					var getLatestInvoice = apiPath.getLatestInvoice1+$scope.quickBill.EditBillData.company.companyId+apiPath.getLatestInvoice2;
					//Get Invoice#
					apiCall.getCall(getLatestInvoice).then(function(response4){
			
						$scope.quickBill.invoiceNumber = getLatestNumber.getInvoice(response4);
					});
				}
				else{
					
					$scope.quickBill.invoiceNumber = $scope.quickBill.EditBillData.invoiceNumber;  //Invoice Number
					
				}
				
				$scope.quickBill.extraCharge = $filter('setDecimal')($scope.quickBill.EditBillData.extraCharge,setDecimalPoint); //Advance
				$scope.quickBill.advance = $filter('setDecimal')($scope.quickBill.EditBillData.advance,setDecimalPoint); //Advance
				var getServicedate =  $scope.quickBill.EditBillData.serviceDate;
				var spliteServicedate = getServicedate.split("-").reverse().join("-");
				// console.log("entry-date",splitedate);
				// console.log("service-date",spliteServicedate);
				// setTimeout(function() {
					vm.serviceDate = new Date(spliteServicedate);
			}
			else if($scope.saleType == 'QuotationPrint'){
				
				if(copyData == 'copy'){
						
					var getLatestInvoice = apiPath.getLatestQuotation+$scope.quickBill.EditBillData.company.companyId+apiPath.getLatestInvoice2;
					//Get Quotation#
					apiCall.getCall(getLatestInvoice).then(function(response4){
						
						$scope.quickBill.invoiceNumber = getLatestNumber.getQuotation(response4[0]);
						
					});
					
				}
				else{
					
					$scope.quickBill.invoiceNumber = $scope.quickBill.EditBillData.quotationNumber;  //Quotation Number
					
				}
				
				
			}
			
			/** Company Wise Product **/
			
				//Auto Suggest Product Dropdown data
				vm.productNameDrop = [];
				productFactory.getProductByCompany($scope.quickBill.EditBillData.company.companyId).then(function(data){
					
					vm.productNameDrop = data;
					
				});
			
			/** End **/
			
			//console.log($scope.quickBill.documentData);
			
			$scope.noOfDecimalPoints = parseInt($scope.quickBill.EditBillData.company.noOfDecimalPoints);//decimal points
			
			//Set Date
			var getResdate =  $scope.quickBill.EditBillData.entryDate;
			var splitedate = getResdate.split("-").reverse().join("-");
			vm.dt1 = new Date(splitedate);

			
			// }, 5000);
			
			// console.log("date",vm.dt1);
			// console.log("ddd",vm.serviceDate);
			clientFactory.getSingleClient($scope.quickBill.EditBillData.client.clientId).then(function(clientSingleResponse){
				vm.clientEditData = clientSingleResponse;
			});
			$scope.quickBill.clientId = $scope.quickBill.EditBillData.client.clientId;
			$scope.quickBill.contactNo = $scope.quickBill.EditBillData.client.contactNo;
			$scope.quickBill.contactNo1 = $scope.quickBill.EditBillData.client.contactNo1;
			//$scope.quickBill.WorkNo = $scope.quickBill.EditBillData.client.workNo;
			//$scope.quickBill.companyName = $scope.quickBill.EditBillData.client.companyName;
			$scope.quickBill.clientName = $scope.quickBill.EditBillData.client.clientName;
			$scope.quickBill.emailId = $scope.quickBill.EditBillData.client.emailId;
			$scope.quickBill.gst = $scope.quickBill.EditBillData.client.gst;
			$scope.quickBill.address1 = $scope.quickBill.EditBillData.client.address1;
			//$scope.quickBill.secondAddress = $scope.quickBill.EditBillData.client.address2;
			// $scope.quickBill.stateAbb = $scope.quickBill.EditBillData.client.stateAbb;
			// $scope.quickBill.cityId = $scope.quickBill.EditBillData.client.cityId;
			
			if($scope.quickBill.EditBillData.client.hasOwnProperty('professionId')  && $scope.quickBill.EditBillData.client.professionId != '' && $scope.quickBill.EditBillData.client.professionId != null && parseInt($scope.quickBill.EditBillData.client.professionId) != 0){
				
				clientFactory.getSingleProfession($scope.quickBill.EditBillData.client.professionId).then(function(response){
					$scope.quickBill.professionId = response;
				});
			}
			
			
			/** Set State & City **/
				var editStateAbb = $scope.quickBill.EditBillData.client.stateAbb;
				var editCityId = $scope.quickBill.EditBillData.client.cityId;
				
				//State DropDown Selection
				vm.statesDrop=[];
				vm.cityDrop=[];
				stateCityFactory.getState().then(function(response){
					
					vm.statesDrop = response;	
					  $scope.quickBill.stateAbb =  stateCityFactory.getDefaultState(editStateAbb);
					vm.cityDrop = stateCityFactory.getDefaultStateCities(editStateAbb);
					$scope.quickBill.cityId = stateCityFactory.getDefaultCity(editCityId);
				});
			
				
			/** End  **/
			
			$scope.quickBill.totalDiscounttype = $scope.quickBill.EditBillData.totalDiscounttype;
			$scope.quickBill.totalDiscount = parseFloat($scope.quickBill.EditBillData.totalDiscount) > 0 ? $scope.quickBill.EditBillData.totalDiscount : 0;
			$scope.expenseAmount=[];
			if('expense' in $scope.quickBill.EditBillData)
			{
				if(Array.isArray(jsonExpense))
				{
					if(jsonExpense.length>0)
					{
						$scope.openExpenseRawData=true;
						vm.AccExpense = angular.copy(jsonExpense);
					}
				}		
			}
			else
			{
				$scope.openExpenseRawData=false;
				vm.AccExpense = [];
			}
			vm.AccBillTable = angular.copy(jsonProduct.inventory);
			
			
			//inventory
			var EditProducArray = angular.copy(jsonProduct.inventory);
			var count = EditProducArray.length;
			for(var w=0;w<count;w++){
				
				var d = 0;
				var setData = EditProducArray[w];
				
				//apiCall.getCall(apiPath.getAllProduct+'/'+setData.productId).then(function(resData){
				productFactory.getSingleProduct(setData.productId).then(function(resData){
					
					/** Tax **/
					// console.log("single product = ",resData);
					vm.AccBillTable[d].productName = resData.productName;
					vm.productHsn[d] = resData.hsn;
					if(!EditProducArray[d].hasOwnProperty('cgstPercentage')){
						vm.AccBillTable[d].cgstPercentage = parseFloat(resData.vat);
						vm.AccBillTable[d].sgstPercentage = parseFloat(resData.additionalTax); // Additional Tax
						$scope.calculateTaxReverse(vm.AccBillTable[d],parseFloat(resData.vat),parseFloat(resData.additionalTax),0);
					}
					else{
						vm.AccBillTable[d].cgstPercentage = checkGSTValue(EditProducArray[d].cgstPercentage);
						vm.AccBillTable[d].sgstPercentage = checkGSTValue(EditProducArray[d].sgstPercentage);
						vm.AccBillTable[d].igstPercentage = checkGSTValue(EditProducArray[d].igstPercentage);
					}
					vm.AccBillTable[d].amount = EditProducArray[d].amount; // For Amount (Reverse Calculation) not be Incorrect
					d++;
					/** End **/
				});
			}
			
			
			
			//console.log('true');
			toaster.clear();
			if(copyData == 'copy'){
				
				$scope.quickBill.EditBillData = undefined;
				$scope.changeProductArray = true;
				$scope.changeProductAdvancePrice = true;
			}
			
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
			vm.AccExpense = [];
			// vm.AccExpense = [{"expenseName":"hii"}];
			//vm.productTax = [{"tax":0,"additionalTax":0}];
			vm.productHsn = [];
			
			$scope.quickBill.totalDiscounttype = 'flat';
		}
	}	
	/** End **/
	
	$scope.EditAddBill();
  
  
	
	//Change in Product Table
	$scope.changeProductTable = function(){
		
		$scope.changeProductArray = true;
		$scope.changeProductAdvancePrice = true;
		
		// $scope.quickBill.advance = $filter('setDecimal')(($scope.total) + ($scope.quickBill.extraCharge ? $scope.quickBill.extraCharge*1 : 0),$scope.noOfDecimalPoints);
		
	}
	
	//Change in Product Advance
	$scope.changeProductAdvance = function(){
		
		$scope.changeProductAdvancePrice = true;
		
	}
	
	//Changed date
	$scope.changeBillDate = function(Fname){
		// console.log('inn');
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		var  date = new Date(vm.dt1);
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();

		var new_date = moment(fdate, "DD-MM-YYYY").add('days', arrayData1.servicedateNoOfDays);
		var day = new_date.format('DD');
		var month = new_date.format('MM');
		var year = new_date.format('YYYY');
		vm.serviceDate = new Date(year,month-1,day);
		
		var  serviceDate = new Date(vm.serviceDate);
		var fServicedate  = serviceDate.getDate()+'-'+(serviceDate.getMonth()+1)+'-'+serviceDate.getFullYear();
		
		formdata.set(Fname,fdate);
		formdata.set('serviceDate',fServicedate);
	}
	$scope.serviceDateChange = function(){
		var  serviceDate = new Date(vm.serviceDate);
		var fServicedate  = serviceDate.getDate()+'-'+(serviceDate.getMonth()+1)+'-'+serviceDate.getFullYear();
		formdata.set('serviceDate',fServicedate);	
	}
	$scope.changeInClientData = false;
	
	$scope.changeInBill = function(Fname,value) {
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		if(value != "" && value != undefined){
			formdata.set(Fname,value);
		}
		
		if(Fname == 'contactNo')
		{

			// console.log(Fname+'..'+value);
			formdata.delete('workNo');
			formdata.delete('contactNo1');
			formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('gst');
			formdata.delete('emailId');
			formdata.delete('address1');
			formdata.delete('address2');
			formdata.delete('professionId');
			formdata.delete('stateAbb');
			formdata.delete('cityId');
			
			$scope.quickBill.WorkNo = '';
			$scope.quickBill.contactNo1 = '';
			$scope.quickBill.companyName = ''
			$scope.quickBill.clientId = null;
			$scope.quickBill.clientName = '';
			$scope.quickBill.gst = '';
			$scope.quickBill.emailId = '';
			$scope.quickBill.address1 = '';
			$scope.quickBill.secondAddress = '';
			$scope.quickBill.professionId = {};
			$scope.quickBill.documentData = '';
			vm.clientEditData = {};
			formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
			formdata.set('cityId',$scope.quickBill.cityId.cityId);
			
			$scope.clientSaveButton = true;
		}
		
		if($scope.quickBill.EditBillData){
			if(Fname == 'clientName' || Fname == 'address1' || Fname == 'stateAbb' || Fname == 'cityId' || Fname == 'emailId' || Fname == 'professionId' || Fname == 'contactNo1' || Fname == 'gst'){
				$scope.changeInClientData = true;
			}
		}
  	}
	
	/** Insert Client **/
	
		$scope.insertClientData = function(){
			
			if($scope.quickBill.contactNo == undefined || $scope.quickBill.contactNo1 == undefined || $scope.quickBill.clientName == undefined || $scope.quickBill.emailId == undefined || $scope.quickBill.address1 == undefined || $scope.quickBill.contactNo == '' || $scope.quickBill.clientName == '' || $scope.quickBill.gst == undefined){
				toaster.clear();
				toaster.pop('warning','Enter Proper Data');
				return false;
			}
			
			var clientFormdata = new FormData();
			
			clientFormdata.set('contactNo',$scope.quickBill.contactNo);
			clientFormdata.set('contactNo1',$scope.quickBill.contactNo1);
			clientFormdata.set('clientName',$scope.quickBill.clientName);
			clientFormdata.set('emailId',$scope.quickBill.emailId);
			clientFormdata.set('gst',$scope.quickBill.gst);
			clientFormdata.set('address1',$scope.quickBill.address1);
			clientFormdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
			clientFormdata.set('cityId',$scope.quickBill.cityId.cityId);
			
			if($scope.quickBill.professionId.professionId){
				clientFormdata.set('professionId',$scope.quickBill.professionId.professionId);
			}
			
			
			clientFactory.insertAndSetNewClient(clientFormdata).then(function(data){
				//console.log(data);
				if(angular.isObject(data)){
					$scope.setClientSuggest('contactNo',data);
					toaster.pop('success','Client Saved');
				}
				else{
					if(data == apiResponse.contentNotProper){
						toaster.pop('info','Client Already Saved');
					}
					else{
						toaster.pop('warning',data);
					}
				}
			});
		}
		
	/** End **/
	
	$scope.changePaymentInBill = function(Fname,value) {
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		
		if(value != 'bank'){
			
			formdata.delete('bankName');
			formdata.delete('checkNumber');
			
			$scope.quickBill.bankName = "";
			$scope.quickBill.checkNumber = "";
			
		}
		formdata.set(Fname,value);
		
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
		
		formdata.set(Fname,state);
	}
	
  /* End */
  
	
  
	//Change Invoice Number When Company Changed
	$scope.changeCompany = function(item)
	 {
		//console.log(item);
		 // if ($scope.formBill.companyDropDown.$touched) {
			  // console.log('INNN');
			  // console.log(item);
		if(angular.isObject(item)){
			
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
				//console.log(data);
				vm.productNameDrop = data;
				
				$scope.getInvoiceAndJobcardNumber(item.companyId); // Invoice#
				
				vm.loadData = false;
			});
			
			
			//});
			
			vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
			//vm.productTax = [{"tax":0,"additionalTax":0}];
			vm.productHsn = [];
			$scope.quickBill.advance = 0;
			
			$scope.printButtonType = item.printType == '' ? 'print':item.printType;
			
			// if(formdata.has('companyId')){
		
				formdata.delete('companyId');
				
			//}
			formdata.set('companyId',item.companyId);
		 // }
		 // else{
			  // console.log('ELLSSEEE');
		 // }
		 }
	}
  	
  	function insertvalTime(){
  		setInterval(function(){
			console.log('here');
			if($scope.quickBill.companyId)
			{
				var id = $scope.quickBill.companyId.companyId;
				productFactory.getProductByCompany(id).then(function(data){
					if(angular.isArray(data)){
						vm.productNameDrop = data;
					}
				});
				$scope.getInvoiceAndJobcardNumber(id); // Invoice#
			}
			
		},5000);
  	}
  	
  $scope.disableButton = false;

	//alert($scope.getTotal());

	$scope.pop = function(generate)
	{
		$scope.disableButton = true;
						// console.log("lllllllllllllllllllll");
		 //$scope.disableButton = true;
	
		if($scope.quickBill.EditBillData){
			
			formdata.delete('companyId');
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Updating....',600000);
			if($scope.saleType == 'QuotationPrint'){
				var BillPath = apiPath.postQuotationBill+'/'+$scope.quickBill.EditBillData.quotationBillId;
			}
			else{
				var rootUrl =  apiPath.postBill;
				var BillPath = rootUrl+'/'+$scope.quickBill.EditBillData.saleId;
				 if($scope.changeProductArray){
					
					formdata.set('balance',$scope.quickBill.balance);
					formdata.set('grandTotal',$scope.grandTotalTable);
					$scope.quickBill.advance ? formdata.set('advance',$scope.quickBill.advance):formdata.set('advance',0);
				 }
			}
			
			
				if($scope.changeProductArray){
				 
					formdata.set('total',$scope.total);
					 formdata.set('tax',$scope.quickBill.tax);
					
					formdata.delete('extraCharge');
					
					$scope.quickBill.extraCharge ? formdata.set('extraCharge',$scope.quickBill.extraCharge) : formdata.set('extraCharge',0);
				
					formdata.delete('totalDiscounttype');
					formdata.delete('totalDiscount');
			
					$scope.quickBill.totalDiscounttype ? formdata.set('totalDiscounttype',$scope.quickBill.totalDiscounttype):formdata.set('totalDiscounttype','flat');
					$scope.quickBill.totalDiscount ? formdata.set('totalDiscount',$scope.quickBill.totalDiscount):formdata.set('totalDiscount',0);
					
				}
				
			if($scope.changeInClientData === true){
				formdata.set('contactNo',$scope.quickBill.contactNo);
				formdata.set('contactNo1',$scope.quickBill.contactNo1);
				formdata.set('clientName',$scope.quickBill.clientName);
				formdata.set('address1',$scope.quickBill.address1);
				formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
				formdata.set('cityId',$scope.quickBill.cityId.cityId);
				formdata.set('emailId',$scope.quickBill.emailId);
				formdata.set('gst',$scope.quickBill.gst);
				if($scope.quickBill.professionId){
					formdata.set('professionId',$scope.quickBill.professionId.professionId);
				}
			}
			//Po Number
			//$scope.quickBill.poNumber != '' || $scope.quickBill.poNumber != undefined ? formdata.set('poNumber',$scope.quickBill.poNumber) : '';
		}
		else{
			// console.log("elsse");
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Inserting....',600000);
			
			var  date = new Date(vm.dt1);
			var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();

			var  serviceDate = new Date(vm.serviceDate);
			var fServiceDate  = serviceDate.getDate()+'-'+(serviceDate.getMonth()+1)+'-'+serviceDate.getFullYear();
				
			if(!formdata.has('companyId')){

				formdata.set('companyId',$scope.quickBill.companyId.companyId);
			}
			
			if(!formdata.has('entryDate')){

				formdata.set('entryDate',fdate);
			}

			if(!formdata.has('serviceDate')){

				formdata.set('serviceDate',fServiceDate);
			}
			
			 formdata.set('transactionDate',fdate);
			
			 /** Client Data **/
			 
				if(!formdata.has('contactNo')){
					if($scope.quickBill.contactNo == undefined){
						formdata.set('contactNo','');
					}
					else{
						formdata.delete('contactNo');
						formdata.set('contactNo',$scope.quickBill.contactNo);
					}
				}
				

				formdata.delete('clientName');
				formdata.delete('emailId');
				formdata.delete('address1');
				formdata.delete('contactNo1');
				formdata.delete('gst');
				
				
				  formdata.set('clientName',$scope.quickBill.clientName);
				  
				 if($scope.quickBill.contactNo1){
					 
				  formdata.set('contactNo1',$scope.quickBill.contactNo1);
				 }
				 if($scope.quickBill.emailId){
					 
				  formdata.set('emailId',$scope.quickBill.emailId);
				 }
				 if($scope.quickBill.gst){
					 
				  formdata.set('gst',$scope.quickBill.gst);
				 }
				  
				  if($scope.quickBill.address1){
					 
					 formdata.set('address1',$scope.quickBill.address1);
				  }
				  
				 
				 if(!formdata.has('stateAbb'))
				{
					formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
				}
				
				 if(!formdata.has('cityId'))
				{
					formdata.set('cityId',$scope.quickBill.cityId.cityId);
				}
				
			/** End **/
		
			if($scope.saleType == 'QuotationPrint'){
				
				formdata.set('quotationNumber',$scope.quickBill.invoiceNumber);
				
				var BillPath = apiPath.postQuotationBill;
				
			}
			else{
				formdata.set('invoiceNumber',$scope.quickBill.invoiceNumber);
				
				if(!formdata.has('paymentMode')){
				
					formdata.set('paymentMode',$scope.quickBill.paymentMode);
				}
				
				 formdata.set('grandTotal',$scope.grandTotalTable);
				 	// console.log($scope.quickBill.advance);
				if($scope.quickBill.advance){
				
					formdata.set('advance',$scope.quickBill.advance);
				}
				else{
					
					formdata.set('advance',0);
				}
				
				formdata.set('balance',$scope.quickBill.balance);
				
				var BillPath = apiPath.postBill;
			}
			// console.log("kkkkkkkkk");
			
			formdata.set('total',$scope.total);
			formdata.set('tax',$scope.quickBill.tax);
			
			formdata.delete('totalDiscounttype');
			formdata.delete('totalDiscount');
			
			$scope.quickBill.totalDiscounttype ? formdata.set('totalDiscounttype',$scope.quickBill.totalDiscounttype):formdata.set('totalDiscounttype','flat');
			$scope.quickBill.totalDiscount ? formdata.set('totalDiscount',$scope.quickBill.totalDiscount):formdata.set('totalDiscount',0);
			
			if($scope.quickBill.extraCharge){
				
				formdata.delete('extraCharge');
				formdata.set('extraCharge',$scope.quickBill.extraCharge);
			}
			else{
				formdata.delete('extraCharge');
				formdata.set('extraCharge',0);
			}
				
			formdata.set('isDisplay','yes');
			
			
		}
	 
	  
	  
	 if($scope.changeProductArray){
		 
		 var  date = new Date();
		var tdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		
			if(!formdata.has('transactionDate')){
				
				formdata.set('transactionDate',tdate);
				
			}
		  
		   
		 //Inventory
		  var json2 = angular.copy(vm.AccBillTable);
		 
		 for(var i=0;i<json2.length;i++){
			 
			angular.forEach(json2[i], function (value,key) {
				
				formdata.set('inventory['+i+']['+key+']',value);
			});
					
		 }
		if(vm.AccExpense.length>0)
		{
			if(vm.AccExpense[0].expenseValue!=0)
			{
				  var json3 = angular.copy(vm.AccExpense);
					
				 for(var i=0;i<json3.length;i++){
					 
					angular.forEach(json3[i], function (value,key) {
						
						formdata.set('expense['+i+']['+key+']',value);
					});
							
				 }
			}
		 }
	 }
	 
		var headerData = {'Content-Type': undefined};
	
		if($scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
			if(generate == 'preprint'){
				headerData.operation = 'preprint';
			}
			if($scope.saleType == 'SalesOrder'){
				headerData.isSalesOrder = 'ok';
				//headerData.isSalesOrderUpdate = 'ok';
			}
			else if($scope.saleType == 'WholesaleBill' && formdata.has('isSalesOrderUpdate')){
				headerData.isSalesOrderUpdate = 'ok';
				formdata.delete('isSalesOrderUpdate');
			}
			else if($scope.saleType == 'WholesaleBill'){
				headerData.salesType = 'whole_sales';
			}
		}
		
		apiCall.postCallHeader(BillPath,headerData,formdata).then(function(data){
			// console.log("ccccccccccccccccccccccc");
			toaster.clear();
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

			var json4 = angular.copy(vm.AccExpense);

			for(var i=0;i<json4.length;i++){
					angular.forEach(json4[i], function (value,key) {
					formdata.delete('expense['+i+']['+key+']');
				});
			}
			

			if(!$scope.quickBill.EditBillData){
				
				formdata.delete('entryDate');
				formdata.delete('serviceDate');
			}
			formdata.delete('invoiceNumber');
			formdata.delete('quotationNumber');
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
				angular.element(".fileAttachLabel").html('');
				formdata.delete('file[]');
				
				formdata.delete('companyId');
				formdata.delete('contactNo');
				formdata.delete('contactNo1');
				formdata.delete('workNo');
				formdata.delete('companyName');
				formdata.delete('clientName');
				formdata.delete('gst');
				
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
				console.log("pdf data ",data);
				if(generate == 'generate'){
					var pdfPath = $scope.erpPath+data.documentPath;
					$scope.directPrintPdf(pdfPath);
				}
				else if(generate == 'preprint'){
					var pdfPath = $scope.erpPath+data.preprintDocumentPath;
					$scope.directPrintPdf(pdfPath);
				}
				else{
					//console.log('Not');
				}
			
				var companyObject = $scope.quickBill.companyId;
				
				/** Client Upadte **/
					var contactNo = $scope.quickBill.contactNo;
					var pushIt;
	
					clientFactory.getClient().then(function(response){
						var indexClient = fetchArrayService.myIndexOf(response,contactNo,'contactNo');
						
						indexClient !== -1 ? pushIt = false : pushIt = true;
						
						clientFactory.getSetNewClientByContact(contactNo,pushIt).then(function(response){
							$scope.clientGetAllFunction();
						});
					});		
					
				/** Client Upadte **/
				
				$scope.quickBill = [];
				vm.dt1 = new Date();
				$scope.changeBillDate('entryDate');
				vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
				$scope.openExpenseRawData=false;
				vm.AccExpense = [];
				vm.productHsn = [];
				
				$scope.changeProductArray = false;
				$scope.changeProductAdvancePrice = false;
				vm.disableCompany = false; 
				$scope.changeInClientData = false; //Client Data Give All in Update
				// $scope.defaultComapny();
				$scope.ReloadAfterSave(companyObject);
				
			//	$scope.getInitStateCity(); //get Default State and City
				
				//$scope.stateAndCityDefault(defStateData,defCityData); 
				
				$scope.quickBill.paymentMode = 'cash';
				$scope.quickBill.totalDiscounttype = 'flat';
				
				$anchorScroll();
				$("#contactNoSelect").focus();
			
			}
			else{
				console.log("fail");
				toaster.clear();
				if(apiResponse.noContent == data){
					console.log($scope.quickBill.EditBillData.lastPdf);
					if(angular.equals($scope.quickBill.EditBillData.lastPdf,{}) || generate == 'not'){
						toaster.pop('info', 'Plz Change Your Data');
					}
					else{
						//toaster.pop('wait', 'Printing...');
						var pdfPath = $scope.erpPath+$scope.quickBill.EditBillData.lastPdf.documentUrl+$scope.quickBill.EditBillData.lastPdf.documentName;
						$scope.directPrintPdf(pdfPath);
					}
				}
				else if(data.status == 500){
					toaster.pop('warning', 'Something Wrong', data.statusText);
				}
				else if(data.status == 0){
					toaster.pop('info', 'Check Your Internet Connection');
				}
				else{
					toaster.pop('warning', 'Something Wrong', data);
				}
				
				 $scope.disableButton = false;
			}
		}).catch(function (reason) {
			 if (reason.status === 500) {
				console.log('Encountered server error');
			 }
		});
  }
 
	$scope.cancel = function(copyData = ""){
		
		var CopyBillData = $scope.quickBill.EditBillData;
		
		$scope.quickBill = [];
		
		$scope.disableButton = false; 
		$scope.changeInClientData = false; //Client Data Give All in Update
		$scope.openExpenseRawData=false;
		angular.element("input[type='file']").val(null);
		angular.element(".fileAttachLabel").html('');
		var formdata = undefined;
		formdata = new FormData();
		
		$scope.clearScannedResult();
				
		vm.dt1 = new Date();
		$scope.changeBillDate('entryDate');
		vm.AccExpense=[];
		vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
		
		//vm.productTax = [{"tax":0,"additionalTax":0}];
		vm.productHsn = [];
		
		$scope.quickBill.totalDiscounttype = 'flat';
		
		vm.cityDrop = [];
		
		$scope.changeProductArray = false;
		$scope.changeProductAdvancePrice = false;
		vm.disableCompany = false;
		
		$scope.clientGetAllFunction();
		
		if(copyData == 'copy'){
			console.log("dataaaaa = ",CopyBillData);
			getSetFactory.set(CopyBillData);
			$scope.EditAddBill('copy');
		}
		else{
			vm.AccExpense = [];
			$scope.defaultComapny();
			$scope.quickBill.paymentMode = 'cash';
		}
		
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
	
	vm.clientEditData = {};

	$scope.setClientSuggest = function(Fname,data){
		
		$scope.clientSaveButton = false; //Save Button
		vm.clientEditData = data;
		// $scope.quickBill.cityId = {};
		// $scope.quickBill.stateAbb = {};
		
		//$scope.quickBill.WorkNo = data.workNo;
		//$scope.quickBill.companyName = data.companyName;
		$scope.quickBill.clientId = data.clientId;
		$scope.quickBill.clientName = data.clientName;
		$scope.quickBill.gst = data.gst;
		$scope.quickBill.contactNo1 = data.contactNo1;
		$scope.quickBill.emailId = data.emailId;
		
		$scope.quickBill.address1 = data.address1;
		//$scope.quickBill.secondAddress = data.address2;
		
		$scope.quickBill.stateAbb = data.state;		
		formdata.delete('stateAbb');
		formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
				
		vm.cityDrop = stateCityFactory.getDefaultStateCities(data.state.stateAbb);
		$scope.quickBill.cityId = data.city;
		formdata.delete('cityId');
		formdata.set('cityId',$scope.quickBill.cityId.cityId);
		
		
		//Profession
		formdata.delete('professionId');
		if(data.profession.professionId != '' || data.profession.professionId != 0){
			
			$scope.quickBill.professionId = data.profession;
			formdata.set('professionId',$scope.quickBill.professionId.professionId);
			
		}
		
		//Set Document Data
		if(data.hasOwnProperty('document')){
			if(data.document.length > 0){
				if(data.document[0].clientId != '' && data.document[0].clientId != null){
					$scope.quickBill.documentData = data.document;
				}
			}
		}
		else if(data.hasOwnProperty('file')){
			if(data.file.length > 0){
				if(data.file[0].clientId != '' && data.file[0].clientId != null){
					$scope.quickBill.documentData = data.file;
				}
			}
		}
		
		
		/** Set Data In Form **/
			if(formdata.has(Fname)){
				
				formdata.delete(Fname);
			}
			formdata.set(Fname,$scope.quickBill.contactNo);
			
			//formdata.delete('workNo');
			//formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('invoiceNumber');
			formdata.delete('emailId');
			formdata.delete('address1');
			formdata.delete('contactNo1');
			formdata.delete('gst');
			//formdata.delete('address2');
			
			  formdata.set('clientName',$scope.quickBill.clientName);
			  
			 if($scope.quickBill.emailId){
				 
			  formdata.set('emailId',$scope.quickBill.emailId);
			 }
			  if($scope.quickBill.gst){
				 
			  formdata.set('gst',$scope.quickBill.gst);
			 }
			  
			  if($scope.quickBill.contactNo1){
				 
				 formdata.set('contactNo1',$scope.quickBill.contactNo1);
			  }
			   if($scope.quickBill.address1){
				 
				 formdata.set('address1',$scope.quickBill.address1);
			  }
			/** End **/
	}
	
	/** Client Update Modal **/
		$scope.editClientData = function(size){
			
			toaster.clear();

			if(angular.equals(vm.clientEditData,{})){
				toaster.pop('info','Plz Select Client');
				return;
			}

			if (Modalopened) return;
			
			 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
		
			var modalInstance = $modal.open({
				templateUrl: 'app/views/PopupModal/CRM/clientForm.html',
				controller: 'clientFormModalController as form',
				resolve:{
					clientEditData: function(){
						return vm.clientEditData;
					}
				}
			});

			Modalopened = true;
		   
			modalInstance.opened.then(function() {
				toaster.clear();
			});
		
				modalInstance.result.then(function (returnModalData) {
					Modalopened = false;
					if(angular.isObject(returnModalData)){
						$scope.setClientSuggest('contactNo',returnModalData);
						toaster.pop('success','Updated Successfully');
						clientFactory.getClient().then(function(response){ 
							console.log(response);
							vm.clientSuggest = response;
						});
					}
					
				}, function () {
				  console.log('Cancel');
					Modalopened = false;
				});
		}
	/** End **/
	
	//Set Multiple File In Formdata On Change
	$scope.uploadFile = function(files) {
		
		toaster.clear();
		var flag = 0;
		
		for(var m=0;m<files.length;m++){
			
			if(parseInt(files[m].size) > maxImageSize){
				
				flag = 1;
				formdata.delete('file[]');
				angular.element("input[type='file']").val(null);
				angular.element(".fileAttachLabel").html('');
				break;
			}
			
		}
		
		if(flag == 0){
			
			formdata.delete('file[]');
			
			angular.forEach(files, function (value,key) {
				formdata.append('file[]',value);
			});
		}
		else{
			toaster.pop('alert', 'Opps!!', 'Image Size is Too Long');
		}
	};

	/** Next Previews **/
		$scope.goToNextPrevious = function(nextPre){
			formdata= undefined;
				
				toaster.clear();
				if($scope.quickBill.companyId){
					
					//Code Start
						toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
						
						formdata = new FormData();
						
						var preHeaderData = {'Content-Type': undefined,'companyId':$scope.quickBill.companyId.companyId};
						
						if($scope.saleType == 'SalesOrder' || $scope.saleType == 'WholesaleBill'){
				 			if($scope.saleType == 'SalesOrder'){
						 		preHeaderData.isSalesOrder = 'ok';
						 	}
						 	preHeaderData.salesType ='whole_sales';
						 	
							var Path = apiPath.postBill;
						 }
						 else if($scope.saleType == 'QuotationPrint'){
							var Path = apiPath.postQuotationBill;
						 }
						
						if(nextPre == "first" || nextPre == "last"){
							preHeaderData.operation = nextPre;
						}
						else{
							
							if($scope.quickBill.EditBillData){
							
								if(nextPre == 'next'){
									
									if($scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
							 
										preHeaderData.nextSaleId = $scope.quickBill.EditBillData.saleId;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.nextQuotationId = $scope.quickBill.EditBillData.quotationBillId;
										
									}
								
								}
								else{
									
									if($scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
							 
										preHeaderData.previousSaleId = $scope.quickBill.EditBillData.saleId;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.previousQuotationId = $scope.quickBill.EditBillData.quotationBillId;
										
									}
								}
								
							}
							else{
								
								if(nextPre == 'next'){
									
									if($scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
							 
										preHeaderData.nextSaleId = 0;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.nextQuotationId = 0;
									}
									
								}
								else{
									
									if($scope.saleType == 'WholesaleBill' || $scope.saleType == 'SalesOrder'){
							 
										preHeaderData.previousSaleId = 0;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.previousQuotationId = 0;
									}
								}
							}
						}
						//var preHeaderData = {'Content-Type': undefined,'sale_id':sale_id,'salesType':$scope.saleType};
						
						apiCall.getCallHeader(Path,preHeaderData).then(function(response){
							
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
							//$scope.quickBill.companyId = response[0].company;
						})
						
					//End
				}
				else{
					
					toaster.pop('info', 'please Select Company');
				}
		}
	
	/** End **/
	
	/** Delete Bill **/
	
	$scope.deleteBill = function(size)
		{
			//alert(id);
			toaster.clear();
			if (Modalopened) return;
			
			var modalInstance = $modal.open({
				  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
				  controller: deleteDataModalController,
				  size: size
				});
			
				Modalopened = true;
				
				modalInstance.result.then(function () {
				 
				 // console.log('ok');
				 
				 var id = $scope.quickBill.EditBillData.saleId;
			
				 /**Delete Code **/
				 	var rootUrl = $scope.saleType == 'WholesaleBill' ? apiPath.postBill : apiPath.postQuotationBill;
					var deletePath = rootUrl+'/'+id;
				  
					apiCall.deleteCall(deletePath).then(function(deleteres){
						
						//console.log(deleteres);
						if(apiResponse.ok == deleteres){
							
							$scope.cancel();
						
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
  
	/** End Delete Bill **/
	
	/** Preview Bill **/
	
		$scope.previewBill = function(size){
		
			toaster.clear();
			
			if (Modalopened) return;
			
			 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
			 
			if($scope.quickBill.companyId){
		
			var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/QuickMenu/PreviewBillModal.html',
			  controller: previewBillModalController,
			  size: size,
			  resolve:{
				  entryDate: function(){
					 
					return vm.dt1;
				  },
				  billData: function(){
					 
					return $scope.quickBill;
				  },
				  inventoryData: function(){
					  
					 return vm.AccBillTable;
				  },
				  total: function(){
					  
					 return $scope.total;
				  },
				  grandTotal: function(){
					  
					 return $scope.grandTotalTable;
				  },
				  saleType: function(){
					  
					 return $scope.saleType;
				  },
				  buttonValidation: function(){
					  
					 return $scope.formBill.$invalid;
				  },
				  productHsn: function(){
					  
					 return vm.productHsn;
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
				
					//$scope.pop(data);
					Modalopened = false;
					
				}, function () {
				 // console.log('Cancel');
					Modalopened = false;
				});
			}
			else{
				
				toaster.pop('info', 'please Select Company', '');
			}
			
		}
		
	/** End **/
	
	/** Invoice **/
		$scope.goInvoiceNumber = function(){
			
			toaster.clear();
			if($scope.quickBill.searchInvoiceNumber == '' || angular.isUndefined($scope.quickBill.searchInvoiceNumber)){
				toaster.pop('error', 'Search Box in Blank');
				return false;
			}
			toaster.pop('wait', 'Please Wait', 'Searching...',600000);
			
			if($scope.saleType == 'SalesOrder' || $scope.saleType == 'WholesaleBill'){
				
				var BillPath = apiPath.getBill+$scope.quickBill.companyId.companyId;
				var preHeaderData = {'Content-Type': undefined,'invoiceNumber':$scope.quickBill.searchInvoiceNumber};
				if($scope.saleType == 'SalesOrder'){
					preHeaderData.isSalesOrder = 'ok';
				}
				preHeaderData.salesType = 'whole_sales';
			 }
			 else if($scope.saleType == 'QuotationPrint'){
				 
				var BillPath = apiPath.postQuotationBill;
				var preHeaderData = {'Content-Type': undefined,'quotationNumber':$scope.quickBill.searchInvoiceNumber};
				//preHeaderData.salesType = 'QuotationPrint';
			 }
						 
			apiCall.getCallHeader(BillPath,preHeaderData).then(function(response){
				
				// console.log('starting');
				// console.log(response);
				toaster.clear();
				if(angular.isArray(response)){
					
					if(response.length > 1){
						
						//console.log('Multiple');
						$scope.openBillHistoryModal('lg',response);
  
					}
					else{
						
						$scope.quickBill = [];
						
						getSetFactory.set(response[0]);
					
						$scope.EditAddBill();
						
						$anchorScroll();
					
					}
					
					
				}
				else{
					
					if(apiResponse.noContent == response || apiResponse.notFound == response){
						toaster.clear();
						toaster.pop('info', 'Opps!!', 'Data Not Available');
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
				
			});
		
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

  this.openStartServiceDate = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStartServiceDate = true;
  };
  
  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  this.dateOptions2 = {
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
  Product Redirect Edit Start
  **/
	$scope.editProductWithRedirect = function(index){
		
		getSetFactory.blank();
		var  id = vm.AccBillTable[index].productId;
		
		productFactory.getSingleProduct(id).then(function(response){
			getSetFactory.set(response);
			$scope.openProduct('lg',index);
		});
	}
  /**
	Product Redirect Edit
  **/
  
  /**
  Product Model Start
  **/
  $scope.openProduct = function (size,index) {

	if (Modalopened) return;
	
	toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
	
	if($scope.quickBill.companyId){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/productModal.html',
		  controller: AccProductModalController,
		  size: size,
		  resolve:{
			  productIndex: function(){
				  return index;
			  },
			  companyId: function(){
				 
				return $scope.quickBill.companyId;
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
			
			var companyID = data.companyId;
			var productIndex = data.index;
			
			if(data.hasOwnProperty('productId')){
				var productID = data.productId;
				
				productFactory.setUpdatedProduct(productID).then(function(response){
					if(angular.isObject(response)){
						productFactory.getProductByCompany(companyID).then(function(responseCompayWise){
							vm.productNameDrop = responseCompayWise;
							vm.AccBillTable[data.index].productName = response.productName;
							$scope.setProductData(response,productIndex);
							toaster.clear();
						});
					}
					else{
						toaster.pop('warning', response);
					}
				});
			}
			else{
				var productName = data.productName;
				var color = data.color;
				var size = data.size;
				
				productFactory.setNewProduct(companyID,productName,color,size).then(function(response){
					if(angular.isObject(response)){
						productFactory.getProductByCompany(companyID).then(function(responseCompayWise){
							vm.productNameDrop = responseCompayWise;
							vm.AccBillTable[data.index].productName = response.productName;
							$scope.setProductData(response,productIndex);
							toaster.clear();
						});
					}
					else{
						toaster.pop('warning', response);
					}
				});
			}
			Modalopened = false;
		
		}, function () {
		 // console.log('Cancel');	
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

  /**
  Product Model Start
  **/
  $scope.openProductList = function (size,index) {

	if (Modalopened) return;
	
	toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
	
	if($scope.quickBill.companyId){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/QuickMenu/productListModal.html',
		  controller: 'AccProductListModalController as table',
		  size: size,
		  resolve:{
			  companyId: function(){
				 
				return $scope.quickBill.companyId;
			  }
		  }
		});

		Modalopened = true;
		
		modalInstance.opened.then(function() {
			toaster.clear();
		});

		modalInstance.result.then(function (data) {
		 
			toaster.clear();
			// toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			// console.log('daaaaaata',data[0]);	
			// console.log('account product-array data = ',vm.AccBillTable);	
			var dataLength = data.length;
			var productLength = vm.AccBillTable.length;
			// console.log(vm.AccBillTable);

			if(dataLength!=0)
			{
				var arrayLength = productLength-1;
				for(var arrayData=0;arrayData<dataLength;arrayData++)
				{
					if(arrayData!=0)
					{
						$scope.addRow(arrayLength);
					}
					if(vm.AccBillTable[arrayLength].productId!="" && vm.AccBillTable[arrayLength].productId!=null && vm.AccBillTable[arrayLength].productId!=0)
					{
						//append blank array
						$scope.addRow(arrayLength+1);
						vm.AccBillTable[arrayLength+1].productName =  data[arrayData].productName;
						$scope.setProductData(data[arrayData],arrayLength+1);
					}
					else
					{
						vm.AccBillTable[arrayLength].productName =  data[arrayData].productName;
						$scope.setProductData(data[arrayData],arrayLength);
					}
					arrayLength++;
				}
			}
			Modalopened = false;
		
		}, function () {
		 // console.log('Cancel');	
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
		 
		 //console.log('http://'+window.location.host+'/front-end/app/views/QuickMenu/DocumentScan/DWT_Upload_Download_Demo.html');
		 
		 if (Modalopened) return;
		 
		 toaster.pop('wait', 'Please Wait', 'popup opening....',600000);
		 
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/QuickMenu/DocumentScan/DWT_Upload_Download_Demo.html?buster='+Math.random(),
		  controller: documentScanController,
		  size: 'flg',
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
		 
		//console.log('ok');
		
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
		  //console.log('Cancel');	
	
	
			if(data == "clear"){
				
				$scope.clearScannedResult();
				toaster.pop('info','Documents Clear','');
				 DWObject.RemoveAllImages();
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
							
							var companyId = $scope.quickBill.companyId.companyId;
							
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
											//$scope.$digest();
											toaster.clear();
											toaster.pop('success', 'Barcode Scanned', '');	
											console.log('barcode Code');
											$scope.$digest();
										}
								}
							/** End loop **/
						});
					//End Api
  }
  
$scope.presssuburb = function(event){
	
	 if(event.target.value.length == 14){
			
			//console.log(event.target.value.length);
			$scope.SetBarcodData(event.target.value);
	 }
}
	$('#myTwain').hide();
	var DWObject;
	 $scope.DWT_AcquireImage= function(){
			
			//var DWObject = Dynamsoft.WebTwainEnv.CreateDWTObject('dwtcontrolContainer');
			DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
				 DWObject.RemoveAllImages();
             // var DWObject = Dynamsoft.WebTwainEnv;
			//DWObject.IfDisableSourceAfterAcquire = true; 
			   var bSelected = DWObject.SelectSource();
				
				if(bSelected){
						DWObject.OpenSource();
						DWObject.IfShowUI = false;
						// DWObject.IfFeederEnabled = true;
						// DWObject.IfAutoFeed = true;
					 DWObject.XferCount = -1;
					//DWObject.PageSize = EnumDWT_CapSupportedSizes.TWSS_USLEGAL;
					// DWObject.Unit = EnumDWT_UnitType.TWUN_INCHES;
					//DWObject.SetImageLayout(0, 0, 5, 5);
					DWObject.Resolution = 200;
					 DWObject.AcquireImage(); //using ADF  for scanning

						DWObject.IfShowFileDialog = false;

						 if (DWObject.ErrorCode != 0) {
							 alert (DWObject.ErrorString);
						 }
						 
						DWObject.RegisterEvent("OnPostAllTransfers", function () {
							var imageUrl = DWObject.GetImageURL(0);
							if(imageUrl != ''){
								$scope.openScanPopup(imageUrl);
							}
							//console.log(imageUrl);
						 });
				}
    }
	 /**
		History Modal 
		**/
		
		$scope.openBillHistoryModal = function (size,responseData,draftOrSalesOrder) {

			toaster.clear();
           // console.log(responseData);
			if (Modalopened) return;

				toaster.pop('wait', 'Please Wait', 'Modal Data Loading....',60000);
				
				var modalInstance = $modal.open({
				  templateUrl: 'app/views/PopupModal/QuickMenu/myHistorySalesBillModalContent.html',
				  controller: historySalesBillModaleCtrl,
				  size: size,
				  resolve:{
					  responseData: function(){
						return responseData;
					  },
					  draftOrSalesOrder: function(){
						return draftOrSalesOrder;
					  }
				  }
				});

			   Modalopened = true;
			   
			   modalInstance.opened.then(function() {
					toaster.clear();
				});

				modalInstance.result.then(function () {
				 //console.log('OK');
					toaster.clear();
					Modalopened = false;
					draftOrSalesOrder == undefined || draftOrSalesOrder == 'SalesOrder' ? $scope.EditAddBill('','SalesOrder') : $scope.EditAddBill('copy','draft');
					$anchorScroll();
				}, function () {
					//console.log('Cancel');
					toaster.clear();
					Modalopened = false;
				});
		};
		
		/**
		End History Modal 
		**/
  
		/** Docuemnt Delete **/
		$scope.openInNextTab = function(url){
			$window.open(url,'_blank');
		}
		
		$scope.documentDelete = function(item){
			item.ShowConfirm == true ? item.ShowConfirm = false : item.ShowConfirm = true;
		}
		
		$scope.documentDeleteConfirm = function(item,index){
			
			var documentID = item.documentId;
			
			if(documentID == '' || documentID == null || documentID == undefined)
			{
				toaster.pop('error','Document Not Found');
				return false;
			}
			
			var headerData = {'Content-Type': undefined,'type':'sale-bill'};
			
			apiCall.deleteCallHeader(apiPath.documentDelete+documentID,headerData).then(function(response){
				if(response == apiResponse.ok){
					toaster.pop('success','Document Successfully Deleted');
					$scope.quickBill.documentData.splice(index,1);
				}
				else{
					toaster.pop('warning',response);
				}
			});
		}
		/** End **/
		
		/** Resend Email **/
			vm.resendEmail = function(){
				
				if($scope.quickBill.EditBillData){
					var emailFormData = new FormData();
					emailFormData.set('companyId',$scope.quickBill.EditBillData.company.companyId);
					// apiCall.postCall(apiPath.getAllClient+'/'+$scope.quickBill.EditBillData.client.clientId).then(function(reponsoe){
						var salesId = $scope.quickBill.EditBillData.saleId;
						var headerData = {'Content-Type': undefined,'saleId':salesId};
						
						apiCall.postCallHeader(apiPath.sendEmail,headerData,emailFormData).then(function(response){
							if(response == apiResponse.ok){
								toaster.pop('success','Email Send Successfully');
								emailFormData.delete('companyId');
							}
							else{
								toaster.pop('warning',response);
							}
						});
					// });
				}	
			}
		/** End **/
		
		function convertDate(cDate){
			var  date = new Date(cDate);
			var convertedDate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			return convertedDate;
		}

        /** Get Set Draft **/
        	vm.setInDraft = function(){

        		if($scope.quickBill.clientId == null){
        			toaster.pop('info','Please Select Client');
        			return false;
        		}

        		if(vm.AccBillTable.length == 1 && vm.AccBillTable[0].productId==''){
        			toaster.pop('info','Enter at least 1 Product');
        			return false;
        		}

        		//Intialize Formdata
        		var draftForm = undefined;
        		draftForm = new FormData();

        		if(vm.dt1 != undefined){
        			draftForm.set('entryDate',convertDate(vm.dt1));
        		}
        		if(vm.serviceDate != undefined){
        			draftForm.set('serviceDate',convertDate(vm.serviceDate));
        		}

        		//Set data to FormData object
        		var  getFormData = $scope.quickBill;
        		for (var key in getFormData){
        			var singleData = getFormData[key];
        			if(angular.isObject(singleData)){
        				if(singleData.hasOwnProperty(key)){
        					draftForm.set(key,singleData[key]);
        				}
        			}
        			else if(angular.isString(singleData) && singleData!=''){
        				draftForm.set(key,singleData);
        			}
        			else if(angular.isNumber(singleData)){
        				draftForm.set(key,singleData);
        			}
        		}

        		 //Inventory
		  		var productJson = angular.copy(vm.AccBillTable);
			 
				 for(var jsonIndex=0;jsonIndex<productJson.length;jsonIndex++){
				 	var breakForeach = true;
					angular.forEach(productJson[jsonIndex], function (value,key) {
						if(breakForeach){
							if(key == 'productId' && value==''){
								breakForeach = false;
							}
							if(breakForeach){
								if(value == undefined){
									value = 0;
								}
								draftForm.set('inventory['+jsonIndex+']['+key+']',value);
							}
						}
					});
				 }
				 
				 //Expense
				 var expenseJson = angular.copy(vm.AccExpense);
				 
				 for(var jsonIndex=0;jsonIndex<expenseJson.length;jsonIndex++){
				 	var breakForeach = true;
				 	
					angular.forEach(expenseJson[jsonIndex], function (value,key) {
						if(breakForeach){
							if(key == 'expenseId' && value==''){
								breakForeach = false;
							}
							if(breakForeach){
								if(value == undefined){
									value = 0;
								}
								draftForm.set('expense['+jsonIndex+']['+key+']',value);
							}
						}
					});
				 }
				 var headerDraftData = {};
				 if(formdata.has('isDraft')){
				 	headerDraftData.saleId = formdata.get('isDraft');
				 }
				apiCall.postCallHeader(apiPath.getSetDraft,headerDraftData,draftForm).then(function(response){
					if(apiResponse.ok == response){
						toaster.pop('success','Save in Draft Successfully');
						$scope.cancel();
					}
					else{
						toaster.pop('warning',response);
					}
				});

        	}

        	vm.getFromDraft = function(){
        		apiCall.getCall(apiPath.getSetDraft+'/'+$scope.quickBill.companyId.companyId).then(function(response){
					if(angular.isArray(response)){
						$scope.openBillHistoryModal('lg',response,'draft');
					}
					else{
						if(apiResponse.noContent == response){
							toaster.pop('info','No Data in Draft');
						}
						else{
							toaster.pop('warning','No Response From Server');
						}
					}
				});
        	}
        /** End **/

        /** Sales Order **/
        	vm.getFromSalesOrder = function(){
        		var header = {};
        		header.companyId = $scope.quickBill.companyId.companyId;
        		header.isSalesOrder = 'ok';
        		apiCall.getCallHeader(apiPath.postBill,header).then(function(response){
					if(angular.isArray(response)){
						$scope.openBillHistoryModal('lg',response,'SalesOrder');
					}
					else{
						if(apiResponse.noContent == response){
							toaster.pop('info','No Data in Draft');
						}
						else{
							toaster.pop('warning','No Response From Server');
						}
					}
				});
        	}
    /** END **/
    $scope.goBack = function()
	{
		$window.history.back();
	}
}
RetailsaleBillController.$inject = ["$rootScope","$scope","apiCall","apiPath","$http","$window","$modal","validationMessage","saleType","productArrayFactory","getSetFactory","toaster","apiResponse","$anchorScroll","maxImageSize","$sce","$templateCache","getLatestNumber","productFactory","stateCityFactory","$filter","$state","clientFactory","fetchArrayService","bankFactory"];