
/**=========================================================
 * Module: AccPaymentController.js
 * Controller for input components
 =========================================================*/

App.controller('AccPaymentController', AccPaymentController);

function AccPaymentController($scope,apiCall,apiPath,$rootScope,toaster) {
  'use strict';
  
  var vm = this;
  $scope.accPayment = [];
  var formdata = new FormData();
  
  $scope.accPayment.totalAmount;
  $scope.accPayment.jfid; // JFID
  
  var account = {};
  account.amountType = 'credit';
  
  //Auto suggest Account
	vm.accountDrop=[];
	var headerCr = {'Content-Type': undefined,'ledgerGroup':[9,12]};
	 
	vm.tableNameDrop=[];
	var headerDr = {'Content-Type': undefined,'ledgerGroup':[31]};
  
 // console.log($rootScope.defaultCompany());
  
  /* Table */
  
	vm.AccPaymentTable = [];
	vm.AccPaymentTable = [{"ledgerId":"","ledgerName":"","amount":"","amountType":"debit"}];
	
	$scope.addRow = function(){
		var data = {};	
		data.ledgerId='';
		data.ledgerName ='';
		data.amount ='';
		data.amountType = 'debit';
		vm.AccPaymentTable.push(data);
		
    };
	
	$scope.settabledata = function(item,index)
	{
		vm.AccPaymentTable[index].ledgerId = item.ledgerId;
		
		console.log(vm.AccPaymentTable);
		
	}
	
	$scope.removeRow = function (idx) {
		vm.AccPaymentTable.splice(idx, 1);
	};
	
  /* End */
  
  // Chosen data
  // ----------------------------------- 
	vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
	
	});
	
	//Set JfId on Load 
	apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
			$scope.accPayment.jfid = response.nextValue;
	
	});
	
	//Set JSuggest Data When Company
	$scope.changeCompany = function(Fname,value){
		//Auto suggest Account
		vm.accountDrop=[];
		vm.tableNameDrop=[];
		
		//Auto suggest Client Name For Debit
		var jsuggestPath = apiPath.getLedgerJrnl+value;
		
		apiCall.getCallHeader(jsuggestPath,headerCr).then(function(response3){
			
			for(var t=0;t<response3.length;t++){
				
				for(var k=0;k<response3[t].length;k++){
					
					vm.accountDrop.push(response3[t][k]);
				}
				
			}
		
		});
		
		apiCall.getCallHeader(jsuggestPath,headerDr).then(function(response3){
			
			for(var t=0;t<response3.length;t++){
				
				for(var k=0;k<response3[t].length;k++){
					
					vm.tableNameDrop.push(response3[t][k]);
				}
				
			}
		
		});
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
		
		
	}
	
	$scope.setAccPayment = function(item) {
		
		//console.log(item);
		account.ledgerId = item.ledgerId;
		account.ledgerName = item.ledgerName;
		
  	}

	//Total For Array Table
	$scope.getTotal = function(){
		
		var total = 0;
		for(var i = 0; i < vm.AccPaymentTable.length; i++){
			
			var product = vm.AccPaymentTable[i];
			total += parseInt(product.amount);
			
		}
		return total;
	}
	
	
	$scope.addUpAccPayment = function()
	{
		vm.tempAccPaymentTable = [];
		account.amount = $scope.accPayment.totalAmount;
		
		vm.tempAccPaymentTable.push(account);
		
		var cnt = vm.AccPaymentTable.length;
		for(var i=0;i<cnt;i++){
			vm.tempAccPaymentTable.push(vm.AccPaymentTable[i]);
		}
		
		console.log(vm.tempAccPaymentTable);
		
		var json = angular.copy(vm.tempAccPaymentTable);
			 
			for(var j=0;j<json.length;j++){
				 
				angular.forEach(json[j], function (value,key) {
					
					formdata.append('data['+j+']['+key+']',value);
					
				});
				
			}
			
		var  date = new Date(vm.dt1);
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		console.log(fdate);
		
		if(formdata.has('entryDate')){
			
			formdata.delete('entryDate',fdate);
		}
		formdata.append('entryDate',fdate);
		formdata.append('jfId',$scope.accPayment.jfid);
		
		
		var accPaymentPath = apiPath.postJrnl;
		
		var headerData = {'Content-Type': undefined,'type':'payment'};
		
		apiCall.postCallHeader(accPaymentPath,headerData,formdata).then(function(data){
				
			console.log(data);
			vm.dt1 = new Date();
			vm.minStart = new Date();
			vm.maxStart = new Date();
		
			var jsonDel = angular.copy(vm.tempAccPaymentTable);
			 
			for(var j=0;j<jsonDel.length;j++){
				 
				angular.forEach(jsonDel[j], function (value,key) {
					
					formdata.delete('data['+j+']['+key+']',value);
					
				});
				
			}
			
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
			$scope.accPayment = [];
			$scope.accPayment.totalAmount;
			vm.tableNameDrop = [];
			vm.accountDrop = [];
			var account = {};
			account.amountType = 'credit';
  
			toaster.pop('success', 'Title', 'Insert Successfully');
			
			vm.AccPaymentTable = [{"ledgerId":"","ledgerName":"","amount":"","amountType":"debit"}];
			
			//Next JfId
			apiCall.getCall(apiPath.getJrnlNext).then(function(response){
	
				$scope.accPayment.jfid = response.nextValue;

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
AccPaymentController.$inject = ["$scope","apiCall","apiPath","$rootScope","toaster"];