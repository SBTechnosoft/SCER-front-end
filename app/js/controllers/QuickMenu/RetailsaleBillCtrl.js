
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.initiate.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.config.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Scripts/script.js');

App.controller('RetailsaleBillController', RetailsaleBillController);

function RetailsaleBillController($rootScope,$scope,apiCall,apiPath,$http,$window,$modal,validationMessage,saleType,productArrayFactory,getSetFactory,toaster,apiResponse,$anchorScroll,maxImageSize,$sce,$templateCache,getLatestNumber,productFactory,stateCityFactory,$filter,$state,clientFactory) {
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
	$scope.quickBill.balanceTable;
	
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
		
		if($scope.saleType == 'QuotationPrint'){
			
			var getLatestInvoice = apiPath.getLatestQuotation+id+apiPath.getLatestInvoice2;
		}
		else{
			
			var getLatestInvoice = apiPath.getLatestInvoice1+id+apiPath.getLatestInvoice2;
		}
		//Get Invoice#
		apiCall.getCall(getLatestInvoice).then(function(response4){
			
			$scope.getInitStateCity();
			if($scope.saleType == 'QuotationPrint'){
				
				$scope.quickBill.invoiceNumber = getLatestNumber.getQuotation(response4[0]);
				
			}
			else{
				$scope.quickBill.invoiceNumber = getLatestNumber.getInvoice(response4);
			}
		});
			
		
	}
	
	//Default Company Function
	$scope.defaultComapny = function(){
		
		toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
			
		vm.loadData = true;
		
		//Set default Company
		var companyIndex = vm.companyDrop.findIndex(x => x.isDefault=='ok');
			
		var  response2= vm.companyDrop[companyIndex];
		var id = response2.companyId;
		
		$scope.quickBill.companyDropDown = response2;
		
		formdata.delete('companyId');
		formdata.set('companyId',response2.companyId);
		
		$scope.noOfDecimalPoints = parseInt(response2.noOfDecimalPoints);
		
		$scope.getInvoiceAndJobcardNumber(id); // Invoice#
		//Auto Suggest Product Dropdown data
		vm.productNameDrop = [];
		
		productFactory.getProductByCompany(id).then(function(data){
			
			vm.productNameDrop = data;
			vm.loadData = false;
		});
		
		$scope.printButtonType = response2.printType == '' ? 'print':response2.printType;
	}
	
	$scope.ReloadAfterSave = function(response2){
		
		$scope.quickBill.companyDropDown = response2;
			
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
		clientFactory.getClient().then(function(responseDrop){
			vm.clientSuggest = responseDrop;
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
	
	
	$scope.getInitStateCity = function(){
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
		varTax.igst = 0;
		
		vm.productTax.splice(plusOne, 0, varTax);
		
		$scope.changeProductArray = true;
		
    };
	vm.productHsn = [];
	$scope.setProductData = function(item,index)
	{
		
		 //console.log(item);
		// console.log(index);
		vm.AccBillTable[index].productId = item.productId;
		vm.productHsn[index] = item.hsn;
		
		var grandPrice;
		var tax;
		
		if($scope.saleType == 'WholesaleBill'){
			//console.log(item);
			
			grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.wholesaleMargin) + parseFloat(item.wholesaleMarginFlat);
			//console.log(grandPrice);
			//tax = productArrayFactory.calculateTax(item.purchasePrice,0,item.margin);
			vm.productTax[index].tax = item.vat;
			//vm.productTax[index].margin = item.wholesaleMargin;
		}
		else if($scope.saleType == 'RetailsaleBill' ||$scope.saleType == 'QuotationPrint' ){
			
			grandPrice = productArrayFactory.calculate(item.purchasePrice,0,item.margin) + parseFloat(item.marginFlat);
			
					//tax = productArrayFactory.calculateTax(item.purchasePrice,item.vat,item.margin);
			
			vm.productTax[index].tax = item.vat;
			//vm.productTax[index].margin = item.margin;
			
			if(item.purchasePrice == 0 || grandPrice == 0){
				
				grandPrice = productArrayFactory.calculate(item.mrp,0,item.margin)  + parseFloat(item.marginFlat);
			}
		}
		
		vm.productTax[index].additionalTax = parseFloat(item.additionalTax); // Additional Tax
		vm.productTax[index].igst = parseFloat(item.igst); // Additional Tax
		
		vm.AccBillTable[index].cgstPercentage = checkGSTValue(item.vat);
		vm.AccBillTable[index].sgstPercentage = checkGSTValue(item.additionalTax);
		vm.AccBillTable[index].igstPercentage = checkGSTValue(item.igst);
		vm.AccBillTable[index].price = grandPrice;
		
		/** Color/Size **/
		vm.AccBillTable[index].color = item.color;
		vm.AccBillTable[index].size = item.size;
		/** End **/
		//vm.productTax[index].tax = tax; //Product Tax
		
		//console.log(vm.AccBillTable);
		
		$scope.calculateTaxReverse(vm.AccBillTable[index],vm.productTax[index].tax,vm.productTax[index].additionalTax,vm.productTax[index].igst);
		
		$scope.changeProductArray = true;
		
		if(!$scope.quickBill.EditBillData){
			$scope.advanceValueUpdate();
		}
		
		
		// $scope.advanceValueUpdate();
	}
	
	
	
	$scope.removeRow = function (idx) {
		vm.AccBillTable.splice(idx,1);
		vm.productTax.splice(idx, 1);
		
		vm.productHsn.splice(idx,1);
		
		$scope.changeProductArray = true;
		
		$scope.advanceValueUpdate();
	};
	
	// End Table 
	
	function checkGSTValue(value){
		
		if(angular.isUndefined(value) || value == ''){
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
			
		if(isNaN($scope.quickBill.overallDiscount) || $scope.quickBill.overallDiscount === '' || $scope.quickBill.overallDiscount == 0){
			return total;
		}	
		
		if($scope.quickBill.overallDiscountType == 'flat') {
			return $filter('setDecimal')(total - $scope.quickBill.overallDiscount,$scope.noOfDecimalPoints);
		}
		else{
			var discount = $filter('setDecimal')(total*$scope.quickBill.overallDiscount/100,$scope.noOfDecimalPoints);
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
			$scope.quickBill.advance = $filter('setDecimal')($scope.totalTable,2);
			$scope.$apply();
		 }, 1000);
	}
	
	/** Check Update Or Insert Bill **/
	
	$scope.EditAddBill = function(copyData = ""){
	
		//if(Object.keys(getSetFactory.get()).length){
		if(Object.keys(getSetFactory.get()).length){
			formdata = undefined;
			formdata = new FormData();
			$scope.quickBill.EditBillData = getSetFactory.get();
			
			//console.log($scope.quickBill.EditBillData);
			getSetFactory.blank();
			
			var jsonProduct = angular.fromJson($scope.quickBill.EditBillData.productArray);
			
			vm.disableCompany = false;
			var setCompanyData = $scope.quickBill.EditBillData.company;
			var setDecimalPoint = parseInt($scope.quickBill.EditBillData.company.noOfDecimalPoints);
			//get Company
			vm.companyDrop=[];
			apiCall.getCall(apiPath.getAllCompany).then(function(response2){
					//console.log(response2);
					
					vm.companyDrop = response2;
					$scope.quickBill.companyDropDown =  setCompanyData;		//Company
					if(copyData != 'copy'){
						
						vm.disableCompany = true;
					}
			});
			
			var clientDataIndex = vm.clientSuggest.findIndex(x => x.clientId==$scope.quickBill.EditBillData.client.clientId);
			// var clientDataIndex = vm.clientSuggest.findIndex(x => x.clientId==$scope.quickBill.EditBillData.client.clientId);
			// var clientAllData = vm.clientSuggest;
			// var clientDataIndex = clientAllData.filter(function(options){
					// return options.clientId == $scope.quickBill.EditBillData.client.clientId;
				// });
			
			
			if($scope.saleType == 'RetailsaleBill' || $scope.saleType == 'WholesaleBill'){
				
				$scope.quickBill.EditBillData.lastPdf = {};
				if($scope.quickBill.EditBillData.file[0].documentId != '' && $scope.quickBill.EditBillData.file[0].documentId != 0){
					var articleWithMaxNumber = $scope.quickBill.EditBillData.file.filter(function(options){
						return options.documentFormat == "pdf";
					}).reduce(function(max, x) {
						
						return x.documentId > max.documentId ? x : max;
						
					});
					$scope.quickBill.EditBillData.lastPdf = articleWithMaxNumber || {};
				}
				
				setTimeout(function(){ 
				
					var clientUpdateData = vm.clientSuggest[clientDataIndex];
					angular.element("input[type='file']").val(null);
					angular.element(".fileAttachLabel").html('');
					formdata.delete('file[]');
					//$scope.quickBill.documentData = $scope.quickBill.EditBillData.file;
					if(!angular.isUndefined(clientUpdateData)){
						if(clientUpdateData.hasOwnProperty('file')){
							if(clientUpdateData.file[0].clientId != '' && clientUpdateData.clientId != null){
								$scope.quickBill.documentData = clientUpdateData.file;
							}
						}
					}
					
				}, 1000);
				
				$scope.quickBill.paymentMode = $scope.quickBill.EditBillData.paymentMode;
				if($scope.quickBill.paymentMode == 'bank'){
					
					$scope.quickBill.chequeNo = $scope.quickBill.EditBillData.checkNumber;
					$scope.quickBill.BankName = $scope.quickBill.EditBillData.bankName;
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
			
			$scope.quickBill.BillContact = $scope.quickBill.EditBillData.client.contactNo;
			//$scope.quickBill.WorkNo = $scope.quickBill.EditBillData.client.workNo;
			//$scope.quickBill.companyName = $scope.quickBill.EditBillData.client.companyName;
			$scope.quickBill.clientName = $scope.quickBill.EditBillData.client.clientName;
			$scope.quickBill.emailId = $scope.quickBill.EditBillData.client.emailId;
			$scope.quickBill.fisrtAddress = $scope.quickBill.EditBillData.client.address1;
			//$scope.quickBill.secondAddress = $scope.quickBill.EditBillData.client.address2;
			// $scope.quickBill.stateAbb = $scope.quickBill.EditBillData.client.stateAbb;
			// $scope.quickBill.cityId = $scope.quickBill.EditBillData.client.cityId;
			
			if($scope.quickBill.EditBillData.client.hasOwnProperty('professionId')  && $scope.quickBill.EditBillData.client.professionId != '' && $scope.quickBill.EditBillData.client.professionId != null && parseInt($scope.quickBill.EditBillData.client.professionId) != 0){
				
				clientFactory.getSingleProfession($scope.quickBill.EditBillData.client.professionId).then(function(response){
					$scope.quickBill.professionDropDown = response;
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
			
			$scope.quickBill.overallDiscountType = $scope.quickBill.EditBillData.totalDiscounttype;
			$scope.quickBill.overallDiscount = parseFloat($scope.quickBill.EditBillData.totalDiscount) > 0 ? $scope.quickBill.EditBillData.totalDiscount : 0;
			
			vm.AccBillTable = angular.copy(jsonProduct.inventory);
			
			//console.log(vm.AccBillTable);
			var EditProducArray = angular.copy(jsonProduct.inventory);
			var count = EditProducArray.length;
			for(var w=0;w<count;w++){
				
				var d = 0;
				var setData = EditProducArray[w];
				
				//apiCall.getCall(apiPath.getAllProduct+'/'+setData.productId).then(function(resData){
				productFactory.getSingleProduct(setData.productId).then(function(resData){
					
					/** Tax **/
					//console.log(resData);
					vm.AccBillTable[d].productName = resData.productName;
					vm.productHsn[d] = resData.hsn;
					if(!EditProducArray[d].hasOwnProperty('cgstPercentage')){
						vm.AccBillTable[d].cgstPercentage = parseFloat(resData.vat);
						vm.AccBillTable[d].sgstPercentage = parseFloat(resData.additionalTax); // Additional Tax
						$scope.calculateTaxReverse(vm.AccBillTable[d],parseFloat(resData.vat),parseFloat(resData.additionalTax),0);
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
			vm.productTax = [{"tax":0,"additionalTax":0}];
			vm.productHsn = [];
			
			$scope.quickBill.overallDiscountType = 'flat';
			
		}
	}	
	/** End **/
	
	$scope.EditAddBill();
  
  
	
	//Change in Product Table
	$scope.changeProductTable = function(){
		
		$scope.changeProductArray = true;
		$scope.changeProductAdvancePrice = true;
		
		// $scope.quickBill.advance = $filter('setDecimal')(($scope.totalTable) + ($scope.quickBill.extraCharge ? $scope.quickBill.extraCharge*1 : 0),$scope.noOfDecimalPoints);
		
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
		formdata.set(Fname,fdate);
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
			formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('emailId');
			formdata.delete('address1');
			formdata.delete('address2');
			formdata.delete('professionId');
			formdata.delete('stateAbb');
			formdata.delete('cityId');
			
			$scope.quickBill.WorkNo = '';
			$scope.quickBill.companyName = ''
			$scope.quickBill.clientId = null;
			$scope.quickBill.clientName = '';
			$scope.quickBill.emailId = '';
			$scope.quickBill.fisrtAddress = '';
			$scope.quickBill.secondAddress = '';
			$scope.quickBill.professionDropDown = {};
			$scope.quickBill.documentData = '';
			
			formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
			formdata.set('cityId',$scope.quickBill.cityId.cityId);
			
			$scope.clientSaveButton = true;
		}
		
		if($scope.quickBill.EditBillData){
			if(Fname == 'clientName' || Fname == 'address1' || Fname == 'stateAbb' || Fname == 'cityId' || Fname == 'emailId' || Fname == 'professionId'){
				$scope.changeInClientData = true;
			}
		}
  	}
	
	/** Insert Client **/
	
		$scope.insertClientData = function(){
			
			if($scope.quickBill.BillContact == undefined || $scope.quickBill.clientName == undefined || $scope.quickBill.emailId == undefined || $scope.quickBill.fisrtAddress == undefined || $scope.quickBill.BillContact == '' || $scope.quickBill.clientName == ''){
				toaster.clear();
				toaster.pop('warning','Enter Proper Data');
				return false;
			}
			
			var clientFormdata = new FormData();
			
			clientFormdata.set('contactNo',$scope.quickBill.BillContact);
			clientFormdata.set('clientName',$scope.quickBill.clientName);
			clientFormdata.set('emailId',$scope.quickBill.emailId);
			clientFormdata.set('address1',$scope.quickBill.fisrtAddress);
			clientFormdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
			clientFormdata.set('cityId',$scope.quickBill.cityId.cityId);
			
			if($scope.quickBill.professionDropDown.professionId){
				clientFormdata.set('professionId',$scope.quickBill.professionDropDown.professionId);
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
			
			$scope.quickBill.BankName = "";
			$scope.quickBill.chequeNo = "";
			
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
		// console.log('Update Innnnn');
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
			vm.productTax = [{"tax":0,"additionalTax":0}];
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
			if($scope.saleType == 'QuotationPrint'){
				var BillPath = apiPath.postQuotationBill+'/'+$scope.quickBill.EditBillData.quotationBillId;
			}
			else{
				var BillPath = apiPath.postBill+'/'+$scope.quickBill.EditBillData.saleId;
				 if($scope.changeProductArray){
					
					formdata.set('balance',$scope.quickBill.balanceTable);
					formdata.set('grandTotal',$scope.grandTotalTable);
					$scope.quickBill.advance ? formdata.set('advance',$scope.quickBill.advance):formdata.set('advance',0);
				 }
			}
			
			
				if($scope.changeProductArray){
				 
					formdata.set('total',$scope.totalTable);
					 formdata.set('tax',$scope.quickBill.tax);
					
					formdata.delete('extraCharge');
					
					$scope.quickBill.extraCharge ? formdata.set('extraCharge',$scope.quickBill.extraCharge) : formdata.set('extraCharge',0);
				
					formdata.delete('totalDiscounttype');
					formdata.delete('totalDiscount');
			
					$scope.quickBill.overallDiscountType ? formdata.set('totalDiscounttype',$scope.quickBill.overallDiscountType):formdata.set('totalDiscounttype','flat');
					$scope.quickBill.overallDiscount ? formdata.set('totalDiscount',$scope.quickBill.overallDiscount):formdata.set('totalDiscount',0);
					
				}
				
			if($scope.changeInClientData === true){
				formdata.set('contactNo',$scope.quickBill.BillContact);
				formdata.set('clientName',$scope.quickBill.clientName);
				formdata.set('address1',$scope.quickBill.fisrtAddress);
				formdata.set('stateAbb',$scope.quickBill.stateAbb.stateAbb);
				formdata.set('cityId',$scope.quickBill.cityId.cityId);
				formdata.set('emailId',$scope.quickBill.emailId);
				if($scope.quickBill.professionDropDown){
					formdata.set('professionId',$scope.quickBill.professionDropDown.professionId);
				}
			}
		}
		else{
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Inserting....',600000);
			
			var  date = new Date(vm.dt1);
			var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
				
			if(!formdata.has('companyId')){

				formdata.set('companyId',$scope.quickBill.companyDropDown.companyId);
			}
			
			if(!formdata.has('entryDate')){

				formdata.set('entryDate',fdate);
			}
			
			 formdata.set('transactionDate',fdate);
			 
			 /** Client Data **/
			 
				if(!formdata.has('contactNo')){
					if($scope.quickBill.BillContact == undefined){
						formdata.set('contactNo','');
					}
					else{
						formdata.delete('contactNo');
						formdata.set('contactNo',$scope.quickBill.BillContact);
					}
				}
				

				formdata.delete('clientName');
				formdata.delete('emailId');
				formdata.delete('address1');
				
				
				  formdata.set('clientName',$scope.quickBill.clientName);
				  
				 if($scope.quickBill.emailId){
					 
				  formdata.set('emailId',$scope.quickBill.emailId);
				 }
				  
				  if($scope.quickBill.fisrtAddress){
					 
					 formdata.set('address1',$scope.quickBill.fisrtAddress);
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
				
				formdata.set('balance',$scope.quickBill.balanceTable);
				
				var BillPath = apiPath.postBill;
			}
			
			
			formdata.set('total',$scope.totalTable);
			formdata.set('tax',$scope.quickBill.tax);
			
			formdata.delete('totalDiscounttype');
			formdata.delete('totalDiscount');
			
			$scope.quickBill.overallDiscountType ? formdata.set('totalDiscounttype',$scope.quickBill.overallDiscountType):formdata.set('totalDiscounttype','flat');
			$scope.quickBill.overallDiscount ? formdata.set('totalDiscount',$scope.quickBill.overallDiscount):formdata.set('totalDiscount',0);
			
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
		if($scope.saleType == 'QuotationPrint'){
			
			var headerData = {'Content-Type': undefined};
		}
		else{
			var headerData = {'Content-Type': undefined,'salesType':$scope.salesTypeHeader};
		}
	}
	   
			
		apiCall.postCallHeader(BillPath,headerData,formdata).then(function(data){
			
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
			
			if(!$scope.quickBill.EditBillData){
				
				formdata.delete('entryDate');
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
				
				/** Client Upadte **/
					var contactNo = $scope.quickBill.BillContact;
					var pushIt;
	
					clientFactory.getClient().then(function(response){
						var indexClient = response.findIndex(function(o){
							 return o.contactNo == contactNo;
						});
						
						indexClient !== -1 ? pushIt = false : pushIt = true;
						
						clientFactory.getSetNewClientByContact(contactNo,pushIt).then(function(response){
							$scope.clientGetAllFunction();
						});
					});		
					
				/** Client Upadte **/
				
				$scope.quickBill = [];
				vm.dt1 = new Date();
				vm.AccBillTable = [{"productId":"","productName":"","color":"","frameNo":"","discountType":"flat","price":0,"discount":"","qty":1,"amount":"","size":""}];
				vm.productTax = [{"tax":0,"additionalTax":0}];
				vm.productHsn = [];
				//vm.cityDrop = [];
				
				$scope.changeProductArray = false;
				$scope.changeProductAdvancePrice = false;
				vm.disableCompany = false; 
				$scope.changeInClientData = false; //Client Data Give All in Update
				// $scope.defaultComapny();
				$scope.ReloadAfterSave(companyObject);
				
			//	$scope.getInitStateCity(); //get Default State and City
				
				//$scope.stateAndCityDefault(defStateData,defCityData); 
				
				$scope.quickBill.paymentMode = 'cash';
				$scope.quickBill.overallDiscountType = 'flat';
				
				$anchorScroll();
				$("#contactNoSelect").focus();
			
			}
			else{
				toaster.clear();
				if(apiResponse.noContent == data){
					
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
			 // err
			 if (reason.status === 500) {
				// do something
				
				console.log('Encountered server error');
			 }
		});
  }
 
	
	$scope.cancel = function(copyData = ""){
		
		var CopyBillData = $scope.quickBill.EditBillData;
		
		$scope.quickBill = [];
		
		$scope.disableButton = false; 
		$scope.changeInClientData = false; //Client Data Give All in Update
		
		angular.element("input[type='file']").val(null);
		angular.element(".fileAttachLabel").html('');
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
		vm.productHsn = [];
		
		$scope.quickBill.overallDiscountType = 'flat';
		
		vm.cityDrop = [];
		
		$scope.changeProductArray = false;
		$scope.changeProductAdvancePrice = false;
		vm.disableCompany = false;
		
		$scope.clientGetAllFunction();
		
		if(copyData == 'copy'){
			
			getSetFactory.set(CopyBillData);
			
			$scope.EditAddBill('copy');
		}
		else{
			
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
	
	
	$scope.setClientSuggest = function(Fname,data){
		
		$scope.clientSaveButton = false; //Save Button
		
		// $scope.quickBill.cityId = {};
		// $scope.quickBill.stateAbb = {};
		
		//$scope.quickBill.WorkNo = data.workNo;
		//$scope.quickBill.companyName = data.companyName;
		$scope.quickBill.clientId = data.clientId;
		$scope.quickBill.clientName = data.clientName;
		$scope.quickBill.emailId = data.emailId;
		
		$scope.quickBill.fisrtAddress = data.address1;
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
			
			$scope.quickBill.professionDropDown = data.profession;
			formdata.set('professionId',$scope.quickBill.professionDropDown.professionId);
			
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
			formdata.set(Fname,$scope.quickBill.BillContact);
			
			//formdata.delete('workNo');
			//formdata.delete('companyName');
			formdata.delete('clientName');
			formdata.delete('invoiceNumber');
			formdata.delete('emailId');
			formdata.delete('address1');
			//formdata.delete('address2');
			
			  formdata.set('clientName',$scope.quickBill.clientName);
			  
			 if($scope.quickBill.emailId){
				 
			  formdata.set('emailId',$scope.quickBill.emailId);
			 }
			  
			  if($scope.quickBill.fisrtAddress){
				 
				 formdata.set('address1',$scope.quickBill.fisrtAddress);
			  }
			/** End **/
	}
	
	
	
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
				if($scope.quickBill.companyDropDown){
					
					//Code Start
						toaster.pop('wait', 'Please Wait', 'Data Loading....',600000);
						
						formdata = new FormData();
						// Delete formdata  keys
						for (var key of formdata.keys()) {
						   formdata.delete(key); 
						}
						for (var [key, value] of formdata.entries()) { 
						   formdata.delete(key); 
						}
					
						var preHeaderData = {'Content-Type': undefined,'companyId':$scope.quickBill.companyDropDown.companyId};
						
						if($scope.saleType == 'RetailsaleBill'){
				 
							preHeaderData.salesType = 'retail_sales';
							var Path = apiPath.postBill;
						 }
						 else if($scope.saleType == 'WholesaleBill'){
							 
							preHeaderData.salesType = 'whole_sales';
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
									
									if($scope.saleType == 'WholesaleBill'){
							 
										preHeaderData.nextSaleId = $scope.quickBill.EditBillData.saleId;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.nextQuotationId = $scope.quickBill.EditBillData.quotationBillId;
										
									}
								
								}
								else{
									
									if($scope.saleType == 'WholesaleBill'){
							 
										preHeaderData.previousSaleId = $scope.quickBill.EditBillData.saleId;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.previousQuotationId = $scope.quickBill.EditBillData.quotationBillId;
										
									}
								}
								
							}
							else{
								
								if(nextPre == 'next'){
									
									if($scope.saleType == 'WholesaleBill'){
							 
										preHeaderData.nextSaleId = 0;

									}
									else if($scope.saleType == 'QuotationPrint'){
									
										preHeaderData.nextQuotationId = 0;
									}
									
								}
								else{
									
									if($scope.saleType == 'WholesaleBill'){
							 
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
				 
					var deletePath = apiPath.postBill+'/'+id;
				  
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
			 
			if($scope.quickBill.companyDropDown){
		
			var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/QuickMenu/PreviewBillModal.html',
			  controller: previewBillModalController,
			  size: size,
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
					  
					 return $scope.quickBill.balanceTable;
				  },
				  remark: function(){
					  
					 return $scope.quickBill.remark;
				  },
				  saleType: function(){
					  
					 return $scope.saleType;
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
			
			if($scope.saleType == 'RetailsaleBill'){
				
				var BillPath = apiPath.getBill+$scope.quickBill.companyDropDown.companyId;
				var preHeaderData = {'Content-Type': undefined,'invoiceNumber':$scope.quickBill.searchInvoiceNumber};
				preHeaderData.salesType = 'retail_sales';
				
			 }
			 else if($scope.saleType == 'WholesaleBill'){
				
				var BillPath = apiPath.getBill+$scope.quickBill.companyDropDown.companyId;
				var preHeaderData = {'Content-Type': undefined,'invoiceNumber':$scope.quickBill.searchInvoiceNumber};
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
				var productName = data.productId;
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
			
			//console.log(event.target.value.length);
			$scope.SetBarcodData(event.target.value);
	 }
}
	
	 $scope.DWT_AcquireImage= function(){
			
			var DWObject = $window.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
			
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
		
		$scope.openBillHistoryModal = function (size,responseData) {

           // console.log(responseData);
			if (Modalopened) return;
			
				toaster.clear();
				toaster.pop('wait', 'Please Wait', 'Modal Data Loading....',60000);
				
				var modalInstance = $modal.open({
				  templateUrl: 'app/views/PopupModal/QuickMenu/myHistorySalesBillModalContent.html',
				  controller: historySalesBillModaleCtrl,
				  size: size,
				  resolve:{
					  responseData: function(){
						 
						return responseData;
					  }
				  }
				});

			   Modalopened = true;
			   
				modalInstance.result.then(function (singleData) {
				 
					toaster.clear();
					
					Modalopened = false;
					
					//$scope.quickBill = [];
						
					getSetFactory.set(singleData);
				
					$scope.EditAddBill();
					
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
		
         // $("canvas").WebCodeCamJQuery(arg).data().plugin_WebCodeCamJQuery.play();
			
			// $scope.getClass = function (path) {
  // return ($location.path().substr(0, path.length) === path) ? 'active' : '';
// }
}
RetailsaleBillController.$inject = ["$rootScope","$scope","apiCall","apiPath","$http","$window","$modal","validationMessage","saleType","productArrayFactory","getSetFactory","toaster","apiResponse","$anchorScroll","maxImageSize","$sce","$templateCache","getLatestNumber","productFactory","stateCityFactory","$filter","$state","clientFactory"];