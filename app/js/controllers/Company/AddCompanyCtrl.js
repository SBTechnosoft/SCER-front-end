
/**=========================================================
 * Module: FormInputController.js
 * Controller for input components
 =========================================================*/

App.controller('AddCompanyController', AddCompanyController);

function AddCompanyController($rootScope,$scope,$http,$filter,$window,apiCall,apiPath,$location,$stateParams,toaster,apiResponse) {
  'use strict';
  var vm = this;
   var formdata = new FormData();
   vm.selectCompany;
   vm.selectCompany = true;
	vm.sdfg;
	$scope.addCompany = [];
	
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
		 $location.path('app/AddCompany/'+id);
	}
	//get Company
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			//console.log(response2);
			vm.companyDrop = response2;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.addCompany.companyDropDown2 = response;
				vm.selectCompany = false;
			});
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
		
		if(formdata.get(Fname))
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
		
		vm.sdfg = res.companyId;
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
		$scope.addCompany.curSymbol = res.currencySymbol;
		$scope.addCompany.documentUrl = res.logo.documentUrl;
		$scope.addCompany.documentName = res.logo.documentName;
		
		//State DropDown Selection
		var stateDropPath = apiPath.getAllState+'/'+res.state.stateAbb;
		apiCall.getCall(stateDropPath).then(function(res3){
			$scope.addCompany.statesDropDown = res3;
		});
		
		//City DropDown
		var cityAllDropPath = apiPath.getAllCity+res.state.stateAbb;
		apiCall.getCall(cityAllDropPath).then(function(res5){
			vm.cityDrop = res5;
		});
		
		//City DropDown Selection
		var cityDropPath = apiPath.getOneCity+'/'+res.city.cityId;
		apiCall.getCall(cityDropPath).then(function(res4){
			$scope.addCompany.cityDropDown = res4;
		});
	
	});
  
  }
  else{
	  
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
  
  $scope.uploadFile = function(files) {
		//console.log(files);
		formdata.append("file[]", files[0]);

	};
	
	$scope.changeCompanyData = function(Fname,value){
		console.log(Fname+'..'+value);
		if(formdata.get(Fname))
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
		
		apiCall.postCall(editCompany2,formdata).then(function(response5){
		
			
			if(apiResponse.ok == response5){
				
				toaster.pop('success', 'Title', 'Insert Successfully');
				$location.path('app/Company');
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
				$location.path('app/Company');
			}
			else{
				
				toaster.pop('warning', 'Opps!!', response5);
			}
			
		});
	}
	
  }
  
}
AddCompanyController.$inject = ["$rootScope","$scope","$http","$filter","$window","apiCall","apiPath","$location","$stateParams","toaster","apiResponse"];