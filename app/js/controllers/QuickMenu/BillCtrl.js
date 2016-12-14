
/**=========================================================
 * Module: AddStaffController.js
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
App.controller('BillController', BillController);

function BillController($scope,apiCall,apiPath,$http,$window,$modal,$log,$rootScope) {
  'use strict';
 
	var vm = this;
	var formdata = new FormData();
	$scope.quickBill = [];
	//Invoice Number 
	$scope.quickBill.invoiceNumber;
	$scope.quickBill.invoiceEndAt;
	$scope.quickBill.invoiceId;
	
	vm.paymentModeDrop =['cash','credit','bank','card'];
  
  /* Table */
	vm.AccBillTable = [];
	vm.AccBillTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":"1","amount":""}];
	
	$scope.addRow = function(){
		 
		var data = {};	
		data.productId = '';
		data.productName ='';
		data.discountType ='flat';
		data.discount ='';
		data.price = '500';
		data.qty ='1';
		data.amount = '';
		vm.AccBillTable.push(data);
		
    };
	
	$scope.setProductData = function(item,index)
	{
		vm.AccBillTable[index].productId = item.productId;
		console.log(vm.AccBillTable);
	}
	
	$scope.removeRow = function (idx) {
		vm.AccBillTable.splice(idx,1);
	};
	
	//Auto Suggest Product Dropdown data
	vm.productNameDrop = [];
	
	apiCall.getCall(apiPath.getAllProduct).then(function(responseDrop){
		
		vm.productNameDrop = responseDrop;
	
	});
	
	//Get State
	vm.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		vm.statesDrop = response3;
	
	});
	
	$scope.ChangeState = function(Fname,state)
	 {
		
		var getonecity = apiPath.getAllCity+state;
		
		//Get City
		apiCall.getCall(getonecity).then(function(response4){
			vm.cityDrop = response4;
				
		});
			// if(formdata.get(Fname))
			// {
				// formdata.delete(Fname);
			// }
			
			// formdata.append(Fname,state);
	}
	
  /* End */
  
	//get Company
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			//console.log(response2);
			vm.companyDrop = response2;
			
			for(var i=0;i<response2.length;i++){
				
				if(response2[i].isDefault == 'ok')
				{
					$scope.quickBill.companyDropDown = response2[i];
					var id = response2[i].companyId;
					var getLatest = apiPath.getLatestInvoice1+id+apiPath.getLatestInvoice2;
		
					//Get City
					apiCall.getCall(getLatest).then(function(response4){
						console.log(response4);
						var label = response4.invoiceLabel;
						$scope.quickBill.invoiceEndAt = response4.endAt;
						$scope.quickBill.invoiceId = response4.invoiceId;
						
						if(response4.invoiceType=='postfix'){
							
							$scope.quickBill.invoiceNumber = label+$scope.quickBill.invoiceEndAt;
							//console.log($scope.quickBill.invoiceNumber);
						}
						else{
							$scope.quickBill.invoiceNumber = $scope.quickBill.invoiceEndAt+label;
							//console.log($scope.quickBill.invoiceNumber);
						}
							
					});
				}
			}
			
	});
	
	
	//Change Invoice Number When Company Changed
	$scope.changeCompany = function(id)
	 {
		
		var getLatest = apiPath.getLatestInvoice1+id+apiPath.getLatestInvoice2;
		
		//Get City
		apiCall.getCall(getLatest).then(function(response4){
			var label = response4.invoiceLabel;
			$scope.quickBill.invoiceEndAt = response4.endAt;
			$scope.quickBill.invoiceId = response4.invoiceId;
			
			
			if(response4.invoiceType=='postfix'){
				console.log('postfix');
				$scope.quickBill.invoiceNumber = label+$scope.quickBill.invoiceEndAt;
				//console.log($scope.quickBill.invoiceNumber);
			}
			else{
				console.log('Prefix');
				$scope.quickBill.invoiceNumber = $scope.quickBill.invoiceEndAt+label ;
				//console.log($scope.quickBill.invoiceNumber);
			}
				
		});
		
	}
  
  
  $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < vm.AccBillTable.length; i++){
        var product = vm.AccBillTable[i];
        total += product.amount;
    }
    return total;
}
	$scope.totalTable;
	$scope.grandTotalTable;
	$scope.balanceTable;
	//alert($scope.getTotal());

  $scope.pop = function(generate)
  {
		//alert(generate);
		var  date = new Date(vm.dt1);
		var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		
	  // console.log($scope.quickBill.companyDropDown.companyId);
	   
	   // console.log(fdate);
	  // console.log($scope.quickBill.BillContact);
	  // console.log($scope.quickBill.WorkNo);
	  // console.log($scope.quickBill.companyName);
	  // console.log($scope.quickBill.clientName);
	  // console.log($scope.quickBill.emailId);
	  // console.log($scope.quickBill.fisrtAddress);
	  // console.log($scope.quickBill.secondAddress);
	  // console.log($scope.quickBill.stateAbb.stateAbb);
	  // console.log($scope.quickBill.cityId.cityId);
	   // console.log($scope.quickBill.invoiceNumber);	
	   // console.log(fdate); // transactionDate
	    // console.log($scope.totalTable);
		// console.log($scope.quickBill.tax);
		// console.log($scope.grandTotalTable);
		 // console.log($scope.quickBill.advance);
		  // console.log($scope.balanceTable);
	  // console.log($scope.quickBill.paymentMode);
	  // console.log($scope.quickBill.BankName.bankId);
	  // console.log($scope.quickBill.chequeNo);
	  // console.log($scope.quickBill.remark);
	  // console.log(vm.AccBillTable);
	  
	  //Inventory
	  var json2 = angular.copy(vm.AccBillTable);
	 
	 for(var i=0;i<json2.length;i++){
		 
		angular.forEach(json2[i], function (value,key) {
			
			formdata.append('inventory['+i+']['+key+']',value);
		});
				
	 }
	  
	  //formdata.append();
	  
	  formdata.append('companyId',$scope.quickBill.companyDropDown.companyId);
	  formdata.append('entryDate',fdate);
	  formdata.append('contactNo',$scope.quickBill.BillContact);
	  formdata.append('workNo',$scope.quickBill.WorkNo);
	  formdata.append('companyName',$scope.quickBill.companyName);
	  formdata.append('clientName',$scope.quickBill.clientName);
	  formdata.append('invoiceNumber',$scope.quickBill.invoiceNumber);
	  formdata.append('emailId',$scope.quickBill.emailId);
	  formdata.append('address1',$scope.quickBill.fisrtAddress);
	  formdata.append('address2',$scope.quickBill.secondAddress);
	  formdata.append('stateAbb',$scope.quickBill.stateAbb.stateAbb);
	  formdata.append('cityId',$scope.quickBill.cityId.cityId);
	  formdata.append('transactionDate',fdate);
	  formdata.append('total',$scope.totalTable);
	 formdata.append('tax',$scope.quickBill.tax);
	 formdata.append('grandTotal',$scope.grandTotalTable);
	 formdata.append('advance',$scope.quickBill.advance);
	 formdata.append('balance',$scope.balanceTable);
	  formdata.append('paymentMode',$scope.quickBill.paymentMode);
	 formdata.append('bankName',$scope.quickBill.BankName.bankName);
	  formdata.append('checkNumber',$scope.quickBill.chequeNo);
	  formdata.append('remark',$scope.quickBill.remark);
	 
	 formdata.append('billNumber','');
	 formdata.append('isDisplay','yes');
	 
	 
	  $http({
			url: apiPath.postBill,
			 method: 'post',
			processData: false,
			 crossDomain: true,
			 //dataType: 'jsonp',
			 headers: {'Content-Type': undefined,'type':'sales'},
			data:formdata
		}).success(function(data, status, headers, config) {
			//var formdataNew = new FormData();
			 //var newEndAt = parseInt($scope.quickBill.invoiceEndAt)+1;
			//formdataNew.append('endAt',newEndAt);
			console.log(data);
			angular.element("input[type='file']").val(null);
			formdata.delete('file');
			// apiCall.postCall(apiPath.getAllInvoice+'/'+$scope.quickBill.invoiceId,formdataNew).then(function(response3){
		
				// console.log(response3);
				// formdataNew.delete('endAt');
	
			// });
			
			if(generate == 'generate'){
				console.log('generate');
				console.log(data.documentPath);
				var pdfPath = 'http://api.siliconbrain.co.in/'+data.documentPath;
				$window.open(pdfPath, '_blank');
			}
			else{
				console.log('Not');
			}
			
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
			//Delete Inventory Data From Formdata Object
			var json3 = angular.copy(vm.AccBillTable);
			 
			for(var i=0;i<json3.length;i++){
				 
				angular.forEach(json3[i], function (value,key) {
					
					formdata.delete('inventory['+i+']['+key+']',value);
				});
					
			}
			
			$scope.quickBill = [];
			vm.dt1 = new Date();
			vm.AccBillTable = [{"productId":"","productName":"","discountType":"flat","price":"1000","discount":"","qty":"1","amount":""}];
			
			
			// formdata.delete('companyId');
			// formdata.delete('entryDate');
			// formdata.delete('contactNo');
			// formdata.delete('workNo');
			// formdata.delete('companyName');
			// formdata.delete('clientName');
			// formdata.delete('invoiceNumber');
			// formdata.delete('emailId');
			// formdata.delete('address1');
			// formdata.delete('address2');
			// formdata.delete('stateAbb');
			// formdata.delete('cityId');
			// formdata.delete('transactionDate');
			// formdata.delete('total');
			// formdata.delete('tax');
			// formdata.delete('grandTotal');
			// formdata.delete('advance');
			// formdata.delete('balance');
			// formdata.delete('paymentMode');
			// formdata.delete('bankName');
			// formdata.delete('checkNumber');
			// formdata.delete('remark');
			// formdata.delete('inventory');
			
	
		}).error(function(data, status, headers, config) {
			
		});
  }
 
	$scope.popGenerate = function(){
		
		$window.open('https://www.google.com', '_blank');
	}
		
	//Auto Suggest Client Contact Dropdown data
	vm.clientSuggest = [];
	
	apiCall.getCall(apiPath.getAllClient).then(function(responseDrop){
		
		vm.clientSuggest = responseDrop;
	
	});
	
	$scope.setClientSuggest = function(Fname,data){
		
		console.log(data.contactNo);
	}
	
	//get Company
	vm.bankDrop=[];
	apiCall.getCall(apiPath.getAllBank).then(function(response2){
			//console.log(response2);
			vm.bankDrop = response2;
			
	});
	
	//Set Multiple File In Formdata On Change
	$scope.uploadFile = function(files) {
		
		//console.log(files);
		//formdata.append("file[]", files[0]);
		angular.forEach(files, function (value,key) {
			//console.log(value);
			formdata.append('file[]',value);
		});

	};

  // Datepicker
  // ----------------------------------- 
	this.minStart = new Date();

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
BillController.$inject = ["$scope","apiCall","apiPath","$http","$window","$modal", "$log","$rootScope"];