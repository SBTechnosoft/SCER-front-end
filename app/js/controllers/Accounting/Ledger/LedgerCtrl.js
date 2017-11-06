//Directive
App.directive('ledgerlist', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.template = '<table class="table  table-striped" >'
    					+ '<tr data-ng-repeat="item in ledgerdata | filter:query track by item.ledgerId" >'
						+ '<td >'
					 +'<span style="letter-spacing: .025em;font-weight: bold;cursor:pointer" ng-click="viewLedgerDetails(item.ledgerId)"> <i class="sidebar-item-icon icon-layers" ></i> {{::item.ledgerName}}</span>'
				+'</td>'
				+'<td>'
					+'<i  title="Edit" ng-click="editLedgerData(item.ledgerId)" class="fa fa-edit myCursorPointer" style="font-size:17px;color:#17A1E5"> </i>'
				+'</td>'
				+'<td>'
					+'<i  title="View" ng-click="viewReadOlny(item.ledgerId)" class="fa fa-list-alt myCursorPointer" style="font-size:17px;color:#17A1E5"></i>'
				+'</td>'
			+'</tr>'
		+'</table>';

	directive.scope = {
        ledgerdata : "=ledgerdata"
    }

    return directive;
});

//Controller
App.controller('AccLedgerController', AccLedgerController);

function AccLedgerController($rootScope,$scope,$filter, ngTableParams,apiCall,apiPath,toaster,getSetFactory,$state,apiResponse,validationMessage,stateCityFactory,fetchArrayService) {
  'use strict';
  
	var vm = this;
	$scope.ledgerForm = [];
	$scope.ledgerEditId = [];
	var formdata = new FormData();
	vm.disableValue = false;
	vm.disableCompanyValue = false;
  
	$scope.trueData = false;
	$scope.alertData = true;
	
	$scope.getLegderCompany = [];

	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	$scope.viewLedgerDetails = function(id){
		
		//alert(id);
		getSetFactory.set(id);
		//$location.path('app/AccDataLedger');
		$state.go("app.AccDataLedger");
		
	}
	
	$scope.showInput = function()
	{	
		vm.disableValue = false;
		vm.disableCompanyValue = false;
		$scope.ledgerForm = [];
		$scope.ledgerEditId = [];
		$scope.trueData = true;
		$scope.alertData = false;
		
		//Set default Company
		apiCall.getCall(apiPath.getAllCompany).then(function(response){
			
			$scope.ledgerForm.companyDropDown = fetchArrayService.getfilteredSingleObject(response,'ok','isDefault');
			if(formdata.has('companyId')){
				
				formdata.delete('companyId');
			}
			formdata.append('companyId',$scope.ledgerForm.companyDropDown.companyId);
			
		});
		
		$scope.ledgerForm.stateDropDown = stateCityFactory.getDefaultState($rootScope.defaultState);
		if(formdata.has('stateAbb')){
			
			formdata.delete('stateAbb');
		
		}
		formdata.append('stateAbb',$scope.ledgerForm.stateDropDown.stateAbb);
		
		vm.cityDrop = stateCityFactory.getDefaultStateCities($rootScope.defaultState);
		$scope.ledgerForm.cityDrop = stateCityFactory.getDefaultCity($rootScope.defaultCity);
		
		if(formdata.has('cityId')){
			formdata.delete('cityId');
		}
		formdata.append('cityId',$scope.ledgerForm.cityDrop.cityId);
		
		formdata.delete('amountType');
		formdata.delete('amount');
		formdata.delete('isDealer');
		
		$scope.ledgerForm.amountType = 'debit';
		$scope.ledgerForm.openingBal = 0;
		$scope.ledgerForm.isDealer = 'n';
		
		formdata.append('amountType',$scope.ledgerForm.amountType);
		formdata.append('amount',$scope.ledgerForm.openingBal);
		formdata.append('isDealer',$scope.ledgerForm.isDealer);
		
	}
	
	//View Single Ledger In Readonly Mode
	$scope.viewReadOlny = function(id)
	{	
		
		$scope.trueData = true;
		$scope.alertData = false;
		
		apiCall.getCall(apiPath.getAllLedger+'/'+id).then(function(response){
			
			$scope.ledgerForm.ledgerName = response.ledgerName;
			$scope.ledgerForm.emailId = response.emailId;
			$scope.ledgerForm.alias = response.alias;
			$scope.ledgerForm.invAffect = response.inventoryAffected;
			$scope.ledgerForm.contact = response.contactNo == 'NULL' || response.contactNo == undefined ? '':response.contactNo;
			$scope.ledgerForm.outstandingLimit = response.outstandingLimit;
			$scope.ledgerForm.address1 = response.address1;
			$scope.ledgerForm.address2 = response.address2;
			$scope.ledgerForm.tin = response.tin;
			$scope.ledgerForm.pan = response.pan;
			//$scope.ledgerForm.sgst = response.sgst;
			$scope.ledgerForm.cgst = response.cgst;
			
			$scope.ledgerForm.isDealer = response.isDealer;
			
			$scope.ledgerForm.amountType = response.openingBalanceType;
			$scope.ledgerForm.openingBal = parseInt(response.openingBalance);
			
			$scope.ledgerForm.under = response.ledgerGroup;
			
			$scope.ledgerForm.companyDropDown = response.company;
			
			/** State/City **/
				$scope.ledgerForm.stateDropDown = response.state;
				
				vm.cityDrop = stateCityFactory.getDefaultStateCities(response.state.stateAbb);
				$scope.ledgerForm.cityDrop = response.city;
				vm.disableValue = true;
				vm.disableCompanyValue = true;
			/** End **/
			
		});
		//vm.disableValue = true;
	}
	
	$scope.editLedgerData = function(id)
	{
		vm.disableValue = false;
		vm.disableCompanyValue = true;
		$scope.trueData = true;
		$scope.alertData = false;
		$scope.ledgerEditId.id = id;
		
		apiCall.getCall(apiPath.getAllLedger+'/'+id).then(function(response){
			
			$scope.ledgerForm.ledgerName = response.ledgerName;
			$scope.ledgerForm.emailId = response.emailId;
			$scope.ledgerForm.alias = response.alias;
			$scope.ledgerForm.invAffect = response.inventoryAffected;
			$scope.ledgerForm.contact = response.contactNo == 'NULL' || response.contactNo == undefined ? '':response.contactNo;
			$scope.ledgerForm.outstandingLimit = response.outstandingLimit;
			$scope.ledgerForm.address1 = response.address1;
			$scope.ledgerForm.address2 = response.address2;
			$scope.ledgerForm.tin = response.tin;
			$scope.ledgerForm.pan = response.pan;
			//$scope.ledgerForm.sgst = response.sgst;
			$scope.ledgerForm.cgst = response.cgst;
			
			$scope.ledgerForm.isDealer = response.isDealer;
			
			$scope.ledgerForm.amountType = response.openingBalanceType;
			$scope.ledgerForm.openingBal = parseInt(response.openingBalance);
			
			$scope.ledgerForm.under = response.ledgerGroup;
			
			$scope.ledgerForm.companyDropDown = response.company;
			
			$scope.ledgerForm.stateDropDown = response.state;
			
			vm.cityDrop = stateCityFactory.getDefaultStateCities(response.state.stateAbb);
			$scope.ledgerForm.cityDrop = response.city;

			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
		
		});
	}
	

  // Chosen data
  // ----------------------------------- 
	vm.underWhat=[];
	apiCall.getCall(apiPath.getAllLedgerGroup).then(function(response3){
		vm.underWhat = response3;
	});
  
  this.invAffectDrop = [
	'yes',
	'no'
  ];
  
  this.amountTypeDrop = [
	'debit',
	'credit'
  ];
  
	//Get State
	vm.statesDrop=[];
	//apiCall.getCall(apiPath.getAllState).then(function(response3){
	stateCityFactory.getState().then(function(response){
		
		vm.statesDrop = response;
		
	});

	//Get Banks
	vm.bankDrop=[];
	vm.bankBranchDrop=[];
	apiCall.getCall(apiPath.getAllBank).then(function(response){
		vm.bankDrop = response;
	});
	
	$scope.changeBank = function(key,value){
		formdata.set(key,value);
		apiCall.getCall(apiPath.getAllBankBranch+value).then(function(response){
			vm.bankBranchDrop=response;
		});
	}

	$scope.changeBankBranch = function(key,value){
		formdata.set(key,value.bankBranchId);
		$scope.ledgerForm.bankIfsc = value.ifsc;
	}

	$scope.setPcode = function(Fname,value) {
  		//console.log(value.ledgerGroupId);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value.ledgerGroupId);
  	}
	
	$scope.ChangeState = function(Fname,state)
	 {
		var getonecity = apiPath.getAllCity+state;
		//vm.cityDrop = [];
		vm.cityDrop = stateCityFactory.getDefaultStateCities(state);
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		
		formdata.append(Fname,state);
	}
	
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		
		//console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
		
		if(formdata.get(Fname) == 'undefined'){
			formdata.delete(Fname);
		}
	}
	
	
	//Set default Company
	vm.companyDrop = [];
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompany){
		
		toaster.clear();

		vm.companyDrop = responseCompany;
		toaster.pop('wait', 'Please Wait', 'Data Loading....',60000);
		
		var companyData = fetchArrayService.getfilteredSingleObject(responseCompany,'ok','isDefault');
		$scope.getLegderCompany.companyDropDown = companyData;
		$scope.ledgerForm.companyDropDown = companyData;
		getLedgerByCompany(companyData.companyId);
	});
	
	vm.allLedgerData = [];

	function getLedgerByCompany(id){
		//Auto suggest Client Name For Debit
		var jsuggestPath = apiPath.getLedgerJrnl+id;
		
		apiCall.getCall(jsuggestPath).then(function(response3){
			
			toaster.clear();
			
			if(angular.isArray(response3)){
				vm.allLedgerData = response3;
			}
			else{
				vm.allLedgerData = [];
				toaster.pop('info','No Data Available');
			}
		});
	}

	//Get Data When Company Change
	$scope.changeCompanyToGetList = function(value){
		toaster.pop('wait', 'Please Wait', 'Data Loading....',1000);
		getLedgerByCompany(value);
	}
	
	$scope.addUpLedger = function()
	{
		
		if($scope.ledgerEditId.id)
		{
			var ledgerPath = apiPath.getAllLedger+'/'+$scope.ledgerEditId.id;
		}
		else{
			var ledgerPath = apiPath.getAllLedger;
			formdata.append('balanceFlag','opening');
		}
		
		apiCall.postCall(ledgerPath,formdata).then(function(response5){
		
					if(angular.isArray(response5) || apiResponse.ok == response5){
						
						toaster.pop('success', 'Title', 'Successfull');
						
						$scope.changeCompanyToGetList($scope.getLegderCompany.companyDropDown.companyId);
					
						$scope.ledgerForm = [];
						
						// Delete formdata  keys
						for (var key of formdata.keys()) {
						   formdata.delete(key); 
						}
						
						formdata.delete('balanceFlag');
						formdata.delete('ledgerName');
						formdata.delete('alias');
						formdata.delete('emailId');
						formdata.delete('inventoryAffected');
						formdata.delete('amountType');
						formdata.delete('amount');
						formdata.delete('stateAbb');
						formdata.delete('cityId');
						formdata.delete('contactNo');
						formdata.delete('address1');
						formdata.delete('address2');
					
						formdata = undefined;
						formdata = new FormData();

						$scope.trueData = false;
						$scope.alertData = true;
						vm.disableCompanyValue = false;
						
						$scope.ledgerEditId = []; // update ID
					}
					else{
						
						formdata.delete('balanceFlag');
						
						toaster.pop('warning', 'Opps!!', response5);
					}
		});
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
AccLedgerController.$inject = ["$rootScope","$scope","$filter", "ngTableParams","apiCall","apiPath","toaster","getSetFactory","$state","apiResponse","validationMessage","stateCityFactory","fetchArrayService"];