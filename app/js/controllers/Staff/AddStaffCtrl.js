
/**=========================================================
 * Module: AddStaffController.js
 * Controller for input components
 =========================================================*/

App.controller('AddStaffController', AddStaffController);

function AddStaffController($scope,$rootScope,toaster,apiCall,apiPath,$state,apiResponse,validationMessage,getSetFactory) {
  'use strict';
 
	var vm = this;
	$scope.addStaff = [];
	var formdata = new FormData();
	
	$scope.allowedType = $rootScope.$storage.authUser.userType; //Logged user Type (Admin/Staff)
	$scope.allowedId = $rootScope.$storage.authUser.userId; //Logged user Type (Admin/Staff)
	$scope.updatedId;
	/* VALIDATION */
	
		$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	
	
	//Get State
	vm.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		vm.statesDrop = response3;
	
	});
	
	//User Type 
	vm.userTypeDrop = ['admin','staff'];
	
	
	
	 //Update Set
	if(Object.keys(getSetFactory.get()).length){
		
		$scope.addStaff.getSetStaffId = getSetFactory.get();
		getSetFactory.blank();
		
		$scope.updatedId = $scope.addStaff.getSetStaffId;
		
		var getOneStaff = apiPath.getOneStaff+$scope.addStaff.getSetStaffId;
		
		apiCall.getCall(getOneStaff).then(function(response){
		
			//Company Dropdown data
			vm.companyDrop = [];
			
			apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
				
				vm.companyDrop = responseCompanyDrop;
			});
			
			$scope.addStaff.company = response.company;
			
			vm.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+response.company.companyId;
			//Get Branch
			apiCall.getCall(getAllBranch).then(function(response4){
				
				vm.branchDrop = response4;
				
				$scope.addStaff.branch = response.branch;
			
			});
			
			
			
			//Staff Name
			$scope.addStaff.name = response.userName;
			//Staff EmailID
			$scope.addStaff.emailId = response.emailId;
			//Staff Password
			$scope.addStaff.password = response.password;
			//Staff Contact
			$scope.addStaff.contact = response.contactNo;
			//Staff Address
			$scope.addStaff.address = response.address;
			//Staff Pincode
			$scope.addStaff.pincode = response.pincode;
			// user Type
			$scope.addStaff.userType = response.userType;
			
			$scope.addStaff.stateDropDown = response.state;
			
			//City DropDown
			var cityAllDropPath = apiPath.getAllCity+response.state.stateAbb;
			apiCall.getCall(cityAllDropPath).then(function(res5){
				
				vm.cityDrop = res5;
				
				$scope.addStaff.cityDropDown = response.city;
			});

			
		});
	}
	else{
		
		$scope.addStaff.userType = 'staff';
		formdata.append('userType','staff');
		
		//Company Dropdown data
		vm.companyDrop = [];
		
		apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
			
			vm.companyDrop = responseCompanyDrop;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.addStaff.company = response;
				
				formdata.append('companyId',response.companyId);
				
				vm.branchDrop = [];
				var getAllBranch = apiPath.getOneBranch+response.companyId;
				//Get Branch
				apiCall.getCall(getAllBranch).then(function(response4){
					
					vm.branchDrop = response4;
						
				});
			});
			
		
		});
	}
	
	  
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
	
	//Changed Data When Update
	$scope.changeStaffData = function(Fname,value){
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
 
	$scope.addUpStaff = function(){
		
		if($scope.addStaff.getSetStaffId){
			
			var addEditPath = apiPath.getOneStaff+$scope.addStaff.getSetStaffId;
			var popUp = "Update Successfully";
		}
		else{
			
			var addEditPath = apiPath.getAllStaff;
			var popUp = "Insert Successfully";
		}
		
		apiCall.postCall(addEditPath,formdata).then(function(response5){
		
			console.log(response5);
			
			if(apiResponse.ok == response5){
				
				$scope.addStaff = [];
				toaster.pop('success', 'Title', popUp);
				$state.go("app.Staff");
			}
			else{
				
				toaster.pop('warning', 'Opps!!', response5);
			}
		
		});
	}
	
	$scope.cancel = function(){
		
		$scope.addStaff = [];
		
		// Delete formdata  keys
		for (var key of formdata.keys()) {
		   formdata.delete(key); 
		}
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
}
AddStaffController.$inject = ["$scope","$rootScope","toaster","apiCall","apiPath","$state","apiResponse","validationMessage","getSetFactory"];