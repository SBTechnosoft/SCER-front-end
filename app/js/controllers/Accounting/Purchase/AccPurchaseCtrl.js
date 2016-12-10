
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
	$scope.changeJrnlArray = false; // Change When Update in Journal Table Array
	
	vm.AccPurchaseTable = [];
	$scope.changeProductArray = false; // Change When Update in Product Table Array
	
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
			
			var getOneJrnlPath = apiPath.getLedgerJrnl+$rootScope.accView.companyId;
			console.log(getOneJrnlPath);
		  
			$http({
			url: getOneJrnlPath,
			 method: 'get',
			processData: false,
			 headers: {'Content-Type': undefined,'type':'purchase','jfId':parseInt($scope.accPurchase.getSetJrnlId)}
			}).success(function(data, status, headers, config) {
				
				//Set JFID
				$scope.accPurchase.jfid = data.ledger[0].jfId;
				
				//Set Invoice Number
				$scope.accPurchase.billNo = data.productTransaction[0].billNumber;
				
				//Company DropDown Selection
				var companyDropPath = apiPath.getAllCompany+'/'+data.ledger[0].company.companyId;
				apiCall.getCall(companyDropPath).then(function(res2){
				
					$scope.accPurchase.companyDropDown = res2;
				});
				
				//Set Date
				var getResdate = data.ledger[0].entryDate;
				var splitedate = getResdate.split("-").reverse().join("-");
				vm.dt1 = new Date(splitedate);
				vm.minStart = new Date(splitedate);
				//vm.maxStart = new Date(splitedate);
				
				//Set Table Array
				for(var i=0;i<data.ledger.length;i++){
					
					 var tempData = {};
					tempData.amountType = data.ledger[i].amountType;
					tempData.ledgerId= data.ledger[i].ledger.ledgerId;
					tempData.ledgerName = data.ledger[i].ledger.ledgerName;
					tempData.amount = parseInt(data.ledger[i].amount);
					
					vm.AccClientMultiTable.push(tempData);
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
		$scope.changeJrnlArray = true;

    };
	
	$scope.setAccPurchase = function(item,index)
	{
		vm.AccClientMultiTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccClientMultiTable);
		$scope.changeJrnlArray = true;
	}
	
	$scope.removeClientRow = function (idx) {
		vm.AccClientMultiTable.splice(idx, 1);
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
	//Auto suggest Client Name
	vm.clientNameDrop=[];
	apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
		vm.clientNameDrop = response3;
	
	});
	
	//Auto Suggest Product Dropdown data
	vm.productNameDrop = [];
	
	apiCall.getCall(apiPath.getAllProduct).then(function(responseDrop){
		
		vm.productNameDrop = responseDrop;
	
	});
	
	
  /* End */
  
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
		
		if(!formdata.has('entryDate')){
			
			formdata.append('entryDate',fdate);
		}
		
		formdata.append('transactionDate',fdate);
		formdata.append('invoiceNumber','');
		
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
	   
	   $http({
			url: accPurchasePath,
			 method: 'post',
			processData: false,
			 headers: {'Content-Type': undefined,'type':'purchase'},
			data:formdata
		}).success(function(data, status, headers, config) {
			
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
		
		angular.element("input[type='file']").val(null);
		
		vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"credit","ledgerId":"","ledgerName":"","amount":""}];
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
	$scope.openLedger = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalLedgerCtrl,
      size: size
    });

    var state = $('#modal-state');
    modalInstance.result.then(function () {
      
		apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
			vm.clientNameDrop = response3;
	
		});
	
    }, function () {
      
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalLedgerCtrl = function ($scope, $modalInstance,$rootScope,apiCall,apiPath) {
	  
	$scope.stockModel=[];
	var formdata = new FormData();
	$scope.ledgerForm = [];	
	  
	//Get Company
	$scope.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response3){
		
		$scope.companyDrop = response3;
	
	});
	
	//Get State
	$scope.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		$scope.statesDrop = response3;
	
	});
	
	$scope.ChangeState = function(Fname,state)
	 {
		
		var getonecity = apiPath.getAllCity+state;
		
		//Get City
		apiCall.getCall(getonecity).then(function(response4){
			$scope.cityDrop = response4;
				
		});
		console.log(Fname+'...'+state);
			if(formdata.has(Fname))
			{
				formdata.delete(Fname);
			}
			
			formdata.append(Fname,state);
	}
	
	 $scope.underWhat=[];
	apiCall.getCall(apiPath.getAllLedgerGroup).then(function(response3){
		
		$scope.underWhat = response3;
	
	});
	
	$scope.setPcode = function(Fname,value) {
  		//console.log(value.ledgerGroupId);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value.ledgerGroupId);
  	}
  
	  $scope.invAffectDrop = [
		'yes',
		'no'
	  ]
	  
	  $scope.amountTypeDrop = [
		'debit',
		'credit'
	  ];
	  
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		//console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.clickSave = function () {
		
		
		formdata.append('balanceFlag','opening');
		apiCall.postCall(apiPath.getAllLedger,formdata).then(function(response5){
		
			console.log(response5);
			$scope.ledgerForm = [];
			
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
			$modalInstance.close('closed');
		});
		
    };

    $scope.cancel = function () {
	
		if($scope.stockModel)
		 {
			$rootScope.ArraystockModel=[];
			$rootScope.ArraystockModel.state=$scope.stockModel.state;
			$rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			$rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 }
		$modalInstance.dismiss();
    };
	
	
  };
  ModalLedgerCtrl.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath"];
  /**
  *
  Ledger Model End
  *
  **/
  
  
  /**
  Product Model Start
  **/
  $scope.openProduct = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myProductModalContent.html',
      controller: ModalInstanceCtrl,
      size: size
    });

   
    modalInstance.result.then(function () {
     
		apiCall.getCall(apiPath.getAllProduct).then(function(responseDrop){
		
			vm.productNameDrop = responseDrop;
	
		});
	
    }, function () {
      console.log('Cancel');	
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalInstanceCtrl = function ($scope, $modalInstance,$rootScope,apiCall,apiPath) {
	  
		$scope.stockModel=[];
			
	var vm = this;
	$scope.addModelProduct = [];
	
	 //Company Dropdown data
	$scope.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		$scope.companyDrop = responseCompanyDrop;
	
	});
	
	$scope.changeCompany = function(state)
	{
		$scope.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+state;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			$scope.branchDrop = response4;
				
		});
	}
	
	//Category Dropdown data
	$scope.categoryDrop = [];
	
	apiCall.getCall(apiPath.getAllCategory).then(function(responseDrop){
		
		$scope.categoryDrop = responseDrop;
	
	});
	
	//Group Dropdown data
	$scope.groupDrop = [];
	
	apiCall.getCall(apiPath.getAllGroup).then(function(responseDrop){
		
		$scope.groupDrop = responseDrop;
	
	});
	
	$scope.measureUnitDrop = [
    'kilo',
    'litre'
  ];
 
	$scope.clickSave = function(){
		
		var formdata = new FormData();
		
		formdata.append('companyId',$scope.addModelProduct.company.companyId);
		formdata.append('branchId',$scope.addModelProduct.branch.branchId);
		formdata.append('productName',$scope.addModelProduct.productName);
		formdata.append('productCategoryId',$scope.addModelProduct.category.productCategoryId);
		formdata.append('productGroupId',$scope.addModelProduct.group.productGroupId);
		formdata.append('measurementUnit',$scope.addModelProduct.measureUnit);
		
		//formdata.append('branchId',1);
		//formdata.append('isDisplay','yes');
		apiCall.postCall(apiPath.getAllProduct,formdata).then(function(response5){
		
			console.log(response5);
			$modalInstance.close('closed');
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
		
		});
		
		
	}
	
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.ok = function () {
      $modalInstance.close('closed');
    };

    $scope.cancel = function () {
	
		$scope.addModelProduct = [];
		// if($scope.stockModel)
		 // {
			// $rootScope.ArraystockModel=[];
			// $rootScope.ArraystockModel.state=$scope.stockModel.state;
			// $rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			// $rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 // }
		//$modalInstance.dismiss();
    };
	
	$scope.closeButton = function () {

		$modalInstance.dismiss();
    };
	
	
  };
  ModalInstanceCtrl.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath"];
  /**
  Product Model End
  **/
}
AccPurchaseController.$inject = ["$scope","apiCall","apiPath","$http","$modal", "$log","$rootScope","getSetFactory","toaster"];