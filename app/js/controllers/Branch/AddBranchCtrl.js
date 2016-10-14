
/**=========================================================
 * Module: AddBranchController.js
 * Controller for input components
 =========================================================*/

App.controller('AddBranchController', AddBranchController);

function AddBranchController($scope,toaster,$http,apiCall,apiPath) {
  'use strict';
  var vm = this;
  $scope.addBranch=[];
  vm.cityDrop=[];
	//get Company
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			vm.companyDrop = response2;
			
		});
		
	//Get Branch
	vm.branchDrop=[];
	apiCall.getCall(apiPath.getAllBranch).then(function(response){
		vm.branchDrop = response;
			
	});
  
	//Get State
	vm.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		vm.statesDrop = response3;
			
	});
	
	
  
  
  
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
  
  $scope.ChangeCity = function(state)
  {
	//console.log(apiPath.getAllCity+state);
	var getonecity = apiPath.getAllCity+state;
	//Get City
	apiCall.getCall(getonecity).then(function(response4){
		vm.cityDrop = response4;
			
	});
  }
  
  //Insert Branch
var formdata = new FormData();
  $scope.pop = function(addBranch) {
	  
	formdata.append('branch_name',addBranch.branchName);
	formdata.append('address1',addBranch.fisrtAddress);
	formdata.append('address2',addBranch.secondAddress);
	formdata.append('pincode',addBranch.pincode);
	formdata.append('is_display','no');
	formdata.append('is_default','not');
	formdata.append('state_abb',addBranch.stateDropDown.state_abb);
	formdata.append('city_id',addBranch.cityDropDown.city_id);
	formdata.append('company_id',addBranch.companyDropDown2.company_id);
	
	apiCall.postCall(apiPath.getAllBranch,formdata).then(function(response5){
		
		console.log(response5);
		toaster.pop('success', 'Title', 'Message');
		
	});
  };
  
  $scope.cancel = function() {
    toaster.pop('info', 'Form Reset', 'Message');
  };
  
  
}
AddBranchController.$inject = ["$scope","toaster","$http","apiCall","apiPath"];