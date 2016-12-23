
/**=========================================================
 * Module: AccPurchaseController.js
 * Controller for input components
 =========================================================*/

App.controller('AccPurchaseController', AccPurchaseController);

function AccPurchaseController($scope,apiCall,apiPath,$http,$modal,$log,$rootScope,getSetFactory,toaster) {
  'use strict';
  
   var vm = this;
   $scope.accPurchase = [];
    var formdata = new FormData();
	$scope.totalTable;
	$scope.grandTotalTable;
	 $scope.accPurchase.jfid; // JFID
	 
	vm.AccClientMultiTable = [];
	vm.multiCurrentBalance = [];
	$scope.changeJrnlArray = false; // Change When Update in Journal Table Array
	
	vm.AccPurchaseTable = [];
	$scope.changeProductArray = false; // Change When Update in Product Table Array
	
	/**
		Jsuggest Debit/Credit
	**/
		//Auto suggest Client Name
		vm.clientNameDropDr=[];
		var headerDr = {'Content-Type': undefined,'ledgerGroup':[26]};
		
		vm.clientNameDropCr=[];
		var headerCr = {'Content-Type': undefined,'ledgerGroup':[9,12,31,18]};
	/**
		End
	**/
	
	// ----------------------------------- 

  vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
	
	});

  // Datepicker
  // ----------------------------------- 
	this.minStart = new Date();
	
	this.openStart = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStart = true;
  };
  
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

  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  this.initDate = new Date('2016-15-20');
  this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = this.formats[0];
	
	//Update Set
	  if(Object.keys(getSetFactory.get()).length){
			
			$scope.accPurchase.getSetJrnlId = getSetFactory.get();
			//$scope.accPurchase.jfid = $scope.accPurchase.getSetJrnlId;
			//console.log($scope.accPurchase.getSetJrnlId);
			getSetFactory.blank();
			
			var getOneJrnlPath = apiPath.getJrnlByCompany+$rootScope.accView.companyId;
			//console.log(getOneJrnlPath);
		  
			var headerDataEdit = {'Content-Type': undefined,'type':'purchase','jfId':parseInt($scope.accPurchase.getSetJrnlId)};
	   
			
			apiCall.getCallHeader(getOneJrnlPath,headerDataEdit).then(function(data){
				
				//Set JFID
				$scope.accPurchase.jfid = data.journal[0].jfId;
				
				//Set Invoice Number
				$scope.accPurchase.billNo = data.productTransaction[0].billNumber;
				
				//Company DropDown Selection
				var companyDropPath = apiPath.getAllCompany+'/'+data.journal[0].company.companyId;
				apiCall.getCall(companyDropPath).then(function(res2){
				
					$scope.accPurchase.companyDropDown = res2;
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
				/**
					End
				**/
				
				//Set Date
				var getResdate = data.journal[0].entryDate;
				var splitedate = getResdate.split("-").reverse().join("-");
				vm.dt1 = new Date(splitedate);
				vm.minStart = new Date(splitedate);
				//vm.maxStart = new Date(splitedate);
				
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
					
					vm.AccPurchaseTable.push(tempProData);
					//console.log();
				}
				//console.log(vm.AccClientMultiTable);
			});
			
		}
		else{
			
			//console.log('Not');
			apiCall.getCall(apiPath.getJrnlNext).then(function(response){
			
				$scope.accPurchase.jfid = response.nextValue;
		
			});
			
			vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
			
			vm.AccPurchaseTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":"1","amount":""}];
			
			vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
		}
		//End Update Set
	
	/* Table */
	
	
	$scope.addClientRow = function(){
		 
		 var data = {};
		data.amountType ='debit';
		data.ledgerId='';
		data.ledgerName ='';
		data.amount ='';
		vm.AccClientMultiTable.push(data);
		
		var balance = {};
		balance.currentBalance = '';
		balance.amountType = '';
		vm.multiCurrentBalance.push(balance);
		
		$scope.changeJrnlArray = true;

    };
	
	$scope.setAccPurchase = function(item,index)
	{
		vm.multiCurrentBalance[index].currentBalance =  item.currentBalance;
		vm.multiCurrentBalance[index].amountType = item.currentBalanceType;
		
		vm.AccClientMultiTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccClientMultiTable);
		$scope.changeJrnlArray = true;
	}
	
	$scope.removeClientRow = function (idx) {
		
		vm.AccClientMultiTable.splice(idx, 1);
		vm.multiCurrentBalance.splice(idx, 1);
		$scope.changeJrnlArray = true;
		
	};
	/* End */
	
	/* Product Table */
	
	$scope.addRow = function(){
		  console.log(vm.AccPurchaseTable);
		 var data = {};	
		// console.log(this.AccSalesTable);
		data.productId='';
		data.productName ='';
		data.discountType ='flat';
		data.price ='1000';
		data.discount ='';
		data.qty ='1';
		data.amount = '';
		vm.AccPurchaseTable.push(data);
		console.log(vm.AccPurchaseTable);
		$scope.changeProductArray = true;

    };
	
	$scope.settabledata = function(item,index)
	{
		vm.AccPurchaseTable[index].productId = item.productId;
		console.log(vm.AccPurchaseTable);
		$scope.changeProductArray = true;
	}
	
	$scope.removeRow = function (idx) {
		vm.AccPurchaseTable.splice(idx, 1);
		$scope.changeProductArray = true;
	};
	
	$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < vm.AccPurchaseTable.length; i++){
        var product = vm.AccPurchaseTable[i];
        total += product.amount;
    }
    return total;
}

	/* END */
	
	//Auto suggest Client Name
	// vm.clientNameDrop=[];
	// apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
		// vm.clientNameDrop = response3;
	
	// });
	
	//Auto Suggest Product Dropdown data
	vm.productNameDrop = [];
	
	apiCall.getCall(apiPath.getAllProduct).then(function(responseDrop){
		
		vm.productNameDrop = responseDrop;
	
	});
	
	//Set JSuggest Data When Company
	$scope.changeCompany = function(Fname,value){
		
		vm.clientNameDropDr=[];
		vm.clientNameDropCr=[];
		
		//Auto suggest Client Name
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
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
		
	}
  
  //Set Multiple File In Formdata On Change
	$scope.uploadFile = function(files) {
		//console.log(files);
		//formdata.append("file[]", files[0]);
		angular.forEach(files, function (value,key) {
			console.log(value);
			formdata.append('file[]',value);
		});

	};
	
	$scope.changeAccPurchase = function(Fname,value) {
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
  	}
	
	//Changed date
	$scope.changePurchaseDate = function(Fname){
		
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
		
		vm.multiCurrentBalance[index].currentBalance =  '';
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
	
	//Set Last JfId In jfid variable
	// var jfid;
	// apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
		// jfid = response.nextValue;
	
	// });
	
	
	
	
  $scope.pop = function()
  {
	  
	if($scope.accPurchase.getSetJrnlId){
		
		
		var accPurchasePath = apiPath.postJrnl+'/'+$scope.accPurchase.jfid;
		
		if($scope.changeJrnlArray){
			
		
			var json = angular.copy(vm.AccClientMultiTable);
			 
			for(var i=0;i<json.length;i++){
				 
				angular.forEach(json[i], function (value,key) {
					
					formdata.append('data['+i+']['+key+']',value);
				});
				
			}
			
		}
		
		if($scope.changeProductArray){
			
			var jsonProduct = angular.copy(vm.AccPurchaseTable);
			 
			for(var i=0;i<jsonProduct.length;i++){
				 
				angular.forEach(jsonProduct[i], function (value,key) {
					
					formdata.append('inventory['+i+']['+key+']',value);
				});
				
			}
			var  date = new Date();
			//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
			var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			
			if(formdata.has('transactionDate')){
			
				formdata.delete('transactionDate');
			}
			formdata.append('transactionDate',fdate); // Inventory Change the date will be Change
			// formdata.append('transactionDate',$scope.totalTable);
			// formdata.append('transactionDate',$scope.grandTotalTable);
			
		}
		
	}
	else{
		
		formdata.append('jfId',$scope.accPurchase.jfid);
		
		var accPurchasePath = apiPath.postJrnl;
		
		//data
		 var json = angular.copy(vm.AccClientMultiTable);
		 
		 for(var i=0;i<json.length;i++){
			 
			angular.forEach(json[i], function (value,key) {
				
				formdata.append('data['+i+']['+key+']',value);
			});
					
		 }
		 
		//Inventory
		  var json2 = angular.copy(vm.AccPurchaseTable);
		 
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
			
			formdata.delete('transactionDate',fdate);
		}
		
		formdata.append('transactionDate',fdate);
		//formdata.append('invoiceNumber','');
		
		$scope.changeJrnlArray = true; // For Delete Array In Journal FormData After Success
		$scope.changeProductArray = true; // For Delete Array In Product FormData After Success
		
		
	}
		 
	// var  date = new Date(vm.dt1);
	// var entrydate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	// var  date = new Date();
	// var transactionDate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	
	
   
	// formdata.append('jfId',jfid);
	 // formdata.append('companyId',$scope.accPurchase.companyDropDown.companyId);
	
	// formdata.append('entryDate',entrydate);
	// formdata.append('transactionDate',transactionDate);
	// formdata.append('invoiceNumber','');
	 //formdata.append('billNumber',$scope.accPurchase.billNo);
	   
			
	var headerData = {'Content-Type': undefined,'type':'purchase'};
	   
			
		apiCall.postCallHeader(accPurchasePath,headerData,formdata).then(function(data){
			
			console.log(data);
			vm.dt1 = new Date();
			vm.minStart = new Date();
			//vm.maxStart = new Date();
			
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
				
				var jsonProductDelete = angular.copy(vm.AccPurchaseTable);
				
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
			
			//Display Toaster Message
			if($scope.accPurchase.getSetJrnlId){
				toaster.pop('success', 'Title', 'Update Successfully');
				
			}
			else{
				toaster.pop('success', 'Title', 'Insert Successfully');
				
			}
			
			$scope.accPurchase = [];
			vm.clientNameDropDr=[]; // Debit Jsuggest Blank
			vm.clientNameDropCr=[]; // Credit Jsuggest Blank
			
			angular.element("input[type='file']").val(null);
			
			vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"credit","ledgerId":"","ledgerName":"","amount":""}];
			vm.AccPurchaseTable = [{"productId":"","productName":"","discountType":"flat","discount":"","price":"1000","qty":"1","amount":""}];
			
			apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
				$scope.accPurchase.jfid = response.nextValue;
	
			});
			
			
	
		}).error(function(data, status, headers, config) {
			
		});
	  
  }
  
	//Cancel Button 
	$scope.cancel = function () {
		
		vm.dt1 = new Date();
		vm.minStart = new Date();
		//vm.maxStart = new Date();
		
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
			
			var jsonProductDelete = angular.copy(vm.AccPurchaseTable);
			
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
		
		$scope.accPurchase = [];
		vm.clientNameDropDr=[]; // Debit Jsuggest Blank
		vm.clientNameDropCr=[]; // Credit Jsuggest Blank
		
		angular.element("input[type='file']").val(null);
		
		vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"credit","ledgerId":"","ledgerName":"","amount":""}];
		
		vm.multiCurrentBalance = [{"currentBalance":"","amountType":""},{"currentBalance":"","amountType":""}];
		
		vm.AccPurchaseTable = [{"productId":"","productName":"","discountType":"flat","discount":"","price":"1000","qty":"1","amount":""}];
		
		apiCall.getCall(apiPath.getJrnlNext).then(function(response){
	
			$scope.accPurchase.jfid = response.nextValue;

		});
			
			
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

	if($scope.accPurchase.companyDropDown){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/ledgerModal.html',
		  controller: AccLedgerModalController,
		  size: size,
			  resolve:{
				  ledgerIndex: function(){
					  return index;
				  },
				  companyId: function(){
					 
					return $scope.accPurchase.companyDropDown;
				  }
			  }
		});

		var state = $('#modal-state');
		modalInstance.result.then(function (data) {
		  
			
			
			if($scope.accPurchase.companyDropDown){
				
				//Auto suggest Client Name For Debit
				var jsuggestPath = apiPath.getLedgerJrnl+$scope.accPurchase.companyDropDown.companyId;
				
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
					vm.AccClientMultiTable[data.index].ledgerName = response.ledger_name;
					vm.AccClientMultiTable[data.index].ledgerId = response.ledger_id;
					
					vm.multiCurrentBalance[data.index].currentBalance =  response.currentBalance;
					vm.multiCurrentBalance[data.index].amountType = response.currentBalanceType;
		
				});
				
			}
		
		}, function () {
		  
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

	if($scope.accPurchase.companyDropDown){
		
		var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Accounting/productModal.html',
		  controller: AccProductModalController,
		  size: size,
		  resolve:{
			  productIndex: function(){
				  return index;
			  },
			  companyId: function(){
				 
				return $scope.accPurchase.companyDropDown;
			  }
		  }
		});

	   
		modalInstance.result.then(function (data) {
		 
			apiCall.getCall(apiPath.getAllProduct).then(function(responseDrop){
			
				vm.productNameDrop = responseDrop;
		
			});
			
			var headerSearch = {'Content-Type': undefined,'productName':data.productName};
			
			apiCall.getCallHeader(apiPath.getProductByCompany+data.companyId,headerSearch).then(function(response){
				
				console.log(response);
				vm.AccPurchaseTable[data.index].productName = response.productName;
				vm.AccPurchaseTable[data.index].productId = response.productId;
				
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

		var modalInstance = $modal.open({
		  templateUrl: '/myHistoryPurchaseModalContent.html',
		  controller: historyPurchaseModaleCtrl,
		  size: size
		});

	   
		modalInstance.result.then(function () {
		 
		
		}, function () {
		  console.log('Cancel');	
		});
	
	};
	
	/**
	End History Modal 
	**/
	
}
AccPurchaseController.$inject = ["$scope","apiCall","apiPath","$http","$modal", "$log","$rootScope","getSetFactory","toaster"];