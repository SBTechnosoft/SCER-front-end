
/**=========================================================
 * Module: AccPurchaseController.js
 * Controller for input components
 =========================================================*/

App.controller('AccPurchaseController', AccPurchaseController);

function AccPurchaseController($scope,apiCall,apiPath,$http) {
  'use strict';
  
   var vm = this;
   $scope.accPurchase = [];
    var formdata = new FormData();
	$scope.totalTable;
	$scope.grandTotalTable;
	
	/* Table */
	vm.AccClientMultiTable = [];
	vm.AccClientMultiTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
	
	$scope.addClientRow = function(){
		 
		 var data = {};
		data.amountType ='debit';
		data.ledgerId='';
		data.ledgerName ='';
		data.amount ='';
		vm.AccClientMultiTable.push(data);

    };
	
	$scope.setAccPurchase = function(item,index)
	{
		vm.AccClientMultiTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccClientMultiTable);
	}
	
	$scope.removeClientRow = function (idx) {
		vm.AccClientMultiTable.splice(idx, 1);
	};
	/* End */
	
	/* Table */
	vm.AccPurchaseTable = [];
	vm.AccPurchaseTable = [{"productId":"","productName":"","discountType":"flat","discount":"","price":"1000","qty":"1","amount":""}];
	
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

    };
	
	$scope.settabledata = function(item,index)
	{
		vm.AccPurchaseTable[index].productId = item.productId;
		console.log(vm.AccPurchaseTable);
	}
	
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
	
	
	
	$scope.removeRow = function (idx) {
		vm.AccPurchaseTable.splice(idx, 1);
	};
	
  /* End */
  
  //Set Multiple File In Formdata On Change
	$scope.uploadFile = function(files) {
		//console.log(files);
		//formdata.append("file[]", files[0]);
		angular.forEach(files, function (value,key) {
			console.log(value);
			//formdata.append('file[]',value);
		});

	};
	//Set Last JfId In jfid variable
	var jfid;
	apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
		jfid = response.nextValue;
	
	});
	
  $scope.pop = function()
  {
	var formdata  = new FormData();
	console.log(jfid);
	console.log($scope.accPurchase.companyDropDown.companyId);
	var  date = new Date(vm.dt1);
	//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
	var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	console.log(fdate);
	console.log($scope.accPurchase.billNo);
	console.log(vm.AccClientMultiTable);
	console.log(vm.AccPurchaseTable);
   console.log($scope.accPurchase.remark);
   
   formdata.append('jfId',jfid);
	 formdata.append('companyId',$scope.accPurchase.companyDropDown.companyId);
	
	 formdata.append('entryDate',fdate);
	 formdata.append('transactionDate',fdate);
	 formdata.append('invoiceNumber','');
	 formdata.append('billNumber',$scope.accPurchase.billNo);
	
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
	   
	   $http({
			url: apiPath.postJrnl,
			 method: 'post',
			processData: false,
			 headers: {'Content-Type': undefined,'type':'purchase'},
			data:formdata
		}).success(function(data, status, headers, config) {
			console.log(data);	
			
			apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
				jfid = response.nextValue;
	
			});
	
		}).error(function(data, status, headers, config) {
			
		});
	  
  }
  // Chosen data
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
}
AccPurchaseController.$inject = ["$scope","apiCall","apiPath","$http"];