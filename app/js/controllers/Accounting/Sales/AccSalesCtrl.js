
/**=========================================================
 * Module: AccSalesController.js
 * Controller for input components
 =========================================================*/
App.filter('sumOfValue', function () {
    return function (data, key) {        
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;        
        var sum = 0;        
        angular.forEach(data,function(value){
            sum = sum + parseInt(value[key]);
        });        
        return sum;
    }
});
App.controller('AccSalesController', AccSalesController);

function AccSalesController($scope,apiCall,apiPath,$http) {
  'use strict';
  
  var vm = this;
  $scope.accSales = [];
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
	
	$scope.setMultiTable = function(item,index)
	{
		vm.AccClientMultiTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccClientMultiTable);
	}
	
	$scope.removeClientRow = function (idx) {
		vm.AccClientMultiTable.splice(idx, 1);
	};
	/* End */
  
	/* Table */
	vm.AccSalesTable = [];
	vm.AccSalesTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":"1","amount":""}];
	
	$scope.addRow = function(){
		  
		 var data = {};	
		// console.log(this.AccSalesTable);
		data.productId='';
		data.productName ='';
		data.discountType ='flat';
		data.discount ='';
		data.price ='1000';
		data.qty ='1';
		data.amount = '';
		vm.AccSalesTable.push(data);
		

    };
	
	$scope.removeRow = function (idx) {
		vm.AccSalesTable.splice(idx, 1);
	};
	
	$scope.settabledata = function(item,index)
	{
		vm.AccSalesTable[index].productId = item.productId;
		console.log(vm.AccSalesTable);
	}
	
	$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < vm.AccSalesTable.length; i++){
        var product = vm.AccSalesTable[i];
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
	
	// $scope.setAccSales = function(Fname,value) {
		// if(formdata.get(Fname))
		// {
			// formdata.delete(Fname);
		// }
		// formdata.append(Fname,value.ledgerId);
  	// }
	
	
	
  /* End */
  var jfid;
	 apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
		jfid = response.nextValue;
	
	});
  $scope.pop = function()
  {
	
	   var formdata  = new FormData();
	console.log(jfid);
	  console.log($scope.accSales.companyDropDown.companyId);
	 var  date = new Date(vm.dt1);
	//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
	var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	   console.log(fdate);
	   console.log($scope.accSales.invoiceNo);
	  console.log(vm.AccClientMultiTable);
	  console.log(vm.AccSalesTable);
	   //console.log($scope.accSales.remark);
	   
	  
	
	 formdata.append('jfId',jfid);
	 formdata.append('companyId',$scope.accSales.companyDropDown.companyId);
	
	 formdata.append('entryDate',fdate);
	 formdata.append('transactionDate',fdate);
	 formdata.append('invoiceNumber',$scope.accSales.invoiceNo);
	 formdata.append('billNumber','');
	
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
	   
	   $http({
			url: apiPath.postJrnl,
			 method: 'post',
			processData: false,
			//contentType: false,
			 crossDomain: true,
			// dataType: 'jsonp',
			 //mimeType:'multipart/form-data',
			//cache: false,
			 //async:true,
			 headers: {'Content-Type': undefined,'type':'sales'},
			data:formdata
		}).success(function(data, status, headers, config) {
			//console.log(headers);	
			
			apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
				jfid = response.nextValue;
	
			});
	
		}).error(function(data, status, headers, config) {
			
		});
  }
  
 $scope.AddSales = function()
 {
	 alert('Add');
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
AccSalesController.$inject = ["$scope","apiCall","apiPath","$http"];