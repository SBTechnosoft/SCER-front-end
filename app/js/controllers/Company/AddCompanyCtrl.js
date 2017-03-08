
/**=========================================================
 * Module: FormInputController.js
 * Controller for input components
 =========================================================*/

App.controller('AddCompanyController', AddCompanyController);

function AddCompanyController($rootScope,$scope,$filter,apiCall,apiPath,$state,$stateParams,toaster,apiResponse,validationMessage,validationPattern) {
  'use strict';
  var vm = this;
   var formdata = new FormData();
   vm.selectCompany;
   vm.selectCompany = true;
	vm.sdfg;
	$scope.addCompany = [];
	
	vm.disableDecimal = false; // disable decimal when Update
	
	//$rootScope.focusFunction('txtdata');
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	$scope.validationPattern = validationPattern; //pattern
	
	/* VALIDATION END */
	
	/* Hide/Show Company Panel */

	$scope.$on('$locationChangeStart', function (event) {
		
		$rootScope.AddCompanyModify = true;
		
	});
		
	/* End */
	
	//Edit Data On Change Company
	$scope.changeCompany = function()
	{
		
		vm.selectCompany = false;
		
	}
	
	$scope.gotoModify = function(){
		
		var id = $scope.addCompany.companyDropDown2.companyId;
		// $location.path('app/AddCompany/'+id);
		$state.go('app.AddCompany',{'id':id});
	}
	
	//get Company
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			//console.log(response2);
			vm.companyDrop = response2;
			
			if(!$stateParams.id){
				
				//Set default Company
				apiCall.getDefaultCompany().then(function(response){
					
					$scope.addCompany.companyDropDown2 = response;
					vm.selectCompany = false;
				});
			
			}
	});
		
	//Get State
	vm.statesDrop=[];
	vm.cityDrop = [];
	 
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		vm.statesDrop = response3;
	});
	
	$scope.ChangeState = function(Fname,state)
	{
		//console.log(apiPath.getAllCity+state);
		var getonecity = apiPath.getAllCity+state;
		//Get City
		apiCall.getCall(getonecity).then(function(response4){
			vm.cityDrop = response4;
				
		});
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,state);
	}
	
	//Set Data For Edit
		if($stateParams.id){
	  
		//Edit Branch
		var editCompany = apiPath.getAllCompany+'/'+$stateParams.id;
	
		apiCall.getCall(editCompany).then(function(res){
		
		console.log(res);
		vm.sdfg = res.companyId;
		
		$scope.addCompany.companyDropDown2 = res;
		
		//console.log(vm.sdfg);
		$scope.addCompany.Name = res.companyName;
		$scope.addCompany.displayName = res.companyDisplayName;
		$scope.addCompany.address1 = res.address1;
		$scope.addCompany.address2 = res.address2;
		$scope.addCompany.pincode = res.pincode;
		$scope.addCompany.pan = res.pan;
		$scope.addCompany.tin = res.tin;
		$scope.addCompany.vat = res.vatNo;
		$scope.addCompany.serviceTax = res.serviceTaxNo;
		$scope.addCompany.currency = res.basicCurrencySymbol;
		$scope.addCompany.formalName = res.formalName;
		
		$scope.addCompany.decimal = res.noOfDecimalPoints;
		vm.disableDecimal = true;
		$scope.addCompany.curSymbol = res.currencySymbol;
		
		if(res.logo.documentName){
			
			$scope.addCompany.documentUrl = res.logo.documentUrl;
			$scope.addCompany.documentName = res.logo.documentName;
		}
		
		$scope.addCompany.statesDropDown = res.state;
		
		
		//City DropDown
		var cityAllDropPath = apiPath.getAllCity+res.state.stateAbb;
		apiCall.getCall(cityAllDropPath).then(function(res5){
			
			vm.cityDrop = res5;
			
			$scope.addCompany.cityDropDown = res.city;
		});
		
	
	
	});
  
  }
  else{
	  
	  vm.disableDecimal = false;
	  console.log('Not');
  }
	//End
  // Chosen data
  // ----------------------------------- 

  this.states = [
    'INR',
    'USD',
	'SRV'
  ];
	
	this.states2 = [
    '1',
    '2',
    '3',
    '4',
    '5'
	];
	
	this.cursymbolDrop = [
    'prefix',
	'suffix'
	];
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

  
  
  $scope.uploadFile = function(files) {
	  
		//console.log(files);
		formdata.delete('file[]');
		
		formdata.append("file[]", files[0]);
		
		var reader = new FileReader();

		reader.onload = function(event) {
			$scope.image_source = event.target.result
			$scope.$apply()

		}
		// when the file is read it triggers the onload event above.
		reader.readAsDataURL(files[0]);

	};
	
	$scope.changeCompanyData = function(Fname,value){
		console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
  $scope.addCompanyForm = function(addCompany)
  {
	
	// formdata.append('companyName',addCompany.Name);
	// formdata.append('companyDisplayName',addCompany.displayName);
	// formdata.append('address1',addCompany.address1);
	// formdata.append('address2',addCompany.address2);
	// formdata.append('cityId',addCompany.cityDropDown.cityId);
	// formdata.append('stateAbb',addCompany.statesDropDown.stateAbb);
	// formdata.append('pincode',addCompany.pincode);
	// formdata.append('pan',addCompany.pan);
	// formdata.append('tin',addCompany.tin);
	// formdata.append('vatNo',addCompany.vat);
	// formdata.append('serviceTaxNo',addCompany.serviceTax);
	// formdata.append('basicCurrencySymbol',addCompany.currency);
	// formdata.append('formalName',addCompany.formalName);
	// formdata.append('noOfDecimalPoints',addCompany.decimal);
	// formdata.append('currencySymbol',addCompany.curSymbol);
	// formdata.append('isDefault','not');
	// formdata.append('isDisplay','no');
	
	
	if($stateParams.id)
	{
		var editCompany2 = apiPath.getAllCompany+'/'+$stateParams.id;
		
		apiCall.patchCall(editCompany2,formdata).then(function(response5){
		
			
			if(apiResponse.ok == response5){
				
				toaster.pop('success', 'Title', 'Insert Successfully');
				//$location.path('app/Company');
				$state.go('app.Company');
			}
			else{
				
				toaster.pop('warning', 'Opps!!', response5);
			}
		
		});
	}
	else
	{
		formdata.append('isDefault','not');
			formdata.append('isDisplay','no');
			
		apiCall.postCall(apiPath.getAllCompany,formdata).then(function(response5){
		
			//console.log(response5);
			if(apiResponse.ok == response5){
				
				toaster.pop('success', 'Title', 'Insert Successfully');
				//$location.path('app/Company');
				$state.go('app.Company');
			}
			else{
				
				toaster.pop('warning', 'Opps!!', response5);
			}
			
			formdata.delete('isDefault');
			formdata.delete('isDisplay');
		});
		
	}
	vm.disableDecimal = false;
  }
  
	$scope.cancel = function(){
	
		$scope.addCompany = [];
		 
		 vm.disableDecimal = false;
		 
		angular.element("input[type='file']").val(null);
		
		formdata.delete("file[]");
		 
		formdata.delete('isDefault');
		formdata.delete('isDisplay');
		 // Delete formdata  keys
		for (var key of formdata.keys()) {
		   formdata.delete(key); 
		}
		 //$scope.formCompany.$setPristine();
	}
  
}
AddCompanyController.$inject = ["$rootScope","$scope","$filter","apiCall","apiPath","$state","$stateParams","toaster","apiResponse","validationMessage","validationPattern"];