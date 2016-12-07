
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

function AccSalesController($scope,apiCall,apiPath,$http,$modal,$log,$rootScope) {
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
			if(formdata.get(Fname))
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
		if(formdata.get(Fname))
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
		'Debit',
		'Credit'
	  ];
	  
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		//console.log(Fname+'..'+value);
		if(formdata.get(Fname))
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
		
		apiCall.postCall(apiPath.getAllLedger,formdata).then(function(response5){
		
			
			console.log(response5);
			
			$scope.ledgerForm = [];
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
AccSalesController.$inject = ["$scope","apiCall","apiPath","$http","$modal", "$log","$rootScope"];