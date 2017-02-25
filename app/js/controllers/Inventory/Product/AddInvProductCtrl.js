
/**=========================================================
 * Module: AddBranchController.js
 * Controller for input components
 =========================================================*/

App.controller('AddInvProductController', AddInvProductController);

function AddInvProductController($scope,toaster,apiCall,apiPath,$stateParams,$location,apiResponse,validationMessage,getSetFactory) {
  'use strict';
  var vm = this;
  $scope.addInvProduct = [];
  var formdata = new FormData();
  

	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
  // Chosen data
  // ----------------------------------- 
		
  this.measureUnitDrop = [
    'kilo',
    'litre'
  ];

	$scope.defaultCompany  = function(){
			
		//Set default Company
		apiCall.getDefaultCompany().then(function(response){
		
			$scope.addInvProduct.company = response;
			
			vm.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+response.companyId;
			//Get Branch
			apiCall.getCall(getAllBranch).then(function(response4){
				
				vm.branchDrop = response4;
					
			});
			
			formdata.append('companyId',$scope.addInvProduct.company.companyId);
			
		});
	}
		
	//Company Dropdown data
	vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
		
	
	});
	
	//Category Dropdown data
	vm.categoryDrop = [];
	
	apiCall.getCall(apiPath.getAllCategory).then(function(responseDrop){
		
		vm.categoryDrop = responseDrop;
	
	});
	
	//Group Dropdown data
	vm.groupDrop = [];
	
	apiCall.getCall(apiPath.getAllGroup).then(function(responseDrop){
		
		vm.groupDrop = responseDrop;
	
	});
	
	//Edit Product
	if(Object.keys(getSetFactory.get()).length){
		
		$scope.addInvProduct.getSetProductId = getSetFactory.get();
		getSetFactory.blank();
		
		
		var editProduct = apiPath.getAllProduct+'/'+$scope.addInvProduct.getSetProductId;
	
		apiCall.getCall(editProduct).then(function(res){
			
			$scope.addInvProduct.name = res.productName;
			$scope.addInvProduct.productDescription = res.productDescription;
			$scope.addInvProduct.color = res.color;
			$scope.addInvProduct.size = res.size;
			
			
			
			$scope.addInvProduct.company = res.company;
			
			//Get Branch
			vm.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+res.company.companyId;
			console.log('here...'+getAllBranch);
			apiCall.getCall(getAllBranch).then(function(response4){
				
				vm.branchDrop = response4;
				$scope.addInvProduct.branch = res.branch;
				
			});
			
			$scope.addInvProduct.category = res.productCategory;
			$scope.addInvProduct.group = res.productGroup;
			
			
			//Measure DropDown Selection
			
				$scope.addInvProduct.measureUnit = res.measurementUnit;
			
			
			$scope.addInvProduct.purchasePrice = res.purchasePrice;
			$scope.addInvProduct.wholesaleMarginFlat = res.wholesaleMarginFlat;
			$scope.addInvProduct.wholesaleMargin = res.wholesaleMargin;
			$scope.addInvProduct.semiWholesaleMargin = res.semiWholesaleMargin;
			$scope.addInvProduct.vat = res.vat;
			$scope.addInvProduct.mrp = res.mrp;
			$scope.addInvProduct.additionalTax = res.additionalTax;
			$scope.addInvProduct.marginFlat = res.marginFlat;
			$scope.addInvProduct.margin = res.margin;
			
		});
	}
	else{
		
		$scope.defaultCompany();
	}

  // Datepicker
  // ----------------------------------- 

  this.today = function() {
    this.dt = new Date();
  };
  this.today();

  this.clear = function () {
    this.dt = null;
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
  this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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
  
  $scope.changeCompany = function(Fname,state)
  {
	  vm.branchDrop = [];
	var getAllBranch = apiPath.getOneBranch+state;
	//Get Branch
	apiCall.getCall(getAllBranch).then(function(response4){
		vm.branchDrop = response4;
			
	});
	if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,state);
  }
  
	//Changed Data When Update
	$scope.changeInvProductData = function(Fname,value){
		//console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}

	$scope.displayParseFloat=function(val) {
		
		return isNaN(parseFloat(val)) ? 0: parseFloat(val);
	}

	$scope.pop = function() {
	
		if($scope.addInvProduct.getSetProductId){
			
			//formdata.append('branchId',1);
			formdata.append('isDisplay','yes');
			var editProduct = apiPath.getAllProduct+'/'+$scope.addInvProduct.getSetProductId;
			apiCall.postCall(editProduct,formdata).then(function(response5){
			
				//console.log(response5);
				if(apiResponse.ok == response5){
					
					$location.path('app/InvProduct');
					toaster.pop('success', 'Title', 'SuccessFull');
				}
				else{
					formdata.delete('isDisplay');
					toaster.pop('warning', 'Opps!!', response5);
				}
			
			});
		}
		else{
			
			//formdata.append('branchId',1);
			// if(!formdata.has('companyId')){
				
				// formdata.append('companyId',$scope.addInvProduct.company.companyId);
			// }
			formdata.append('isDisplay','yes');
			apiCall.postCall(apiPath.getAllProduct,formdata).then(function(response5){
			
				//console.log(response5);
				if(apiResponse.ok == response5){
					
					toaster.pop('success', 'Title', 'SuccessFull');
					
					$location.path('app/InvProduct');
				}
				else{
					formdata.delete('isDisplay');
					toaster.pop('warning', 'Opps!!', response5);
				}
				
			});
		}
		//$scope.addInvProduct = [];
		
	};
  
  $scope.cancel = function() {
	  
		$scope.addInvProduct = [];
		
		
		// Delete formdata  keys
		// for (var key of formdata.keys()) {
		   // formdata.delete(key); 
		// }
		  var formdata = new FormData();
		
		$scope.defaultCompany();
		
		toaster.pop('info', 'Form Reset', 'Message');
  };
  
  
}
AddInvProductController.$inject = ["$scope","toaster","apiCall","apiPath","$stateParams","$location","apiResponse","validationMessage","getSetFactory"];