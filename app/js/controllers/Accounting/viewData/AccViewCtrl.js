
/**=========================================================
 * Module: AddInvStockCtrl.js
 * Controller for input components
 =========================================================*/

App.controller('AccViewController', AccViewController);

function AccViewController($rootScope,$scope,apiCall,apiPath,$state,viewDataType) {
  'use strict';
  
  var vm = this; 
  $scope.accViewSales = [];
  
  $scope.viewDataTypePath = viewDataType;
  var dateFormats = $rootScope.dateFormats; //Date Format
 
	this.salesTypeDrop = [
	'All',
	'Retailsales',
	'Wholesales'
  ];
  
	$scope.accViewSales.salesType = 'All';
	
  //Company Dropdown data
	vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
		
		//Set default Company
		apiCall.getDefaultCompany().then(function(response){
			
			$scope.accViewSales.companyDropDown = response;
			
			//vm.branchDrop = [];
			//var getAllBranch = apiPath.getOneBranch+response.companyId;
			//Get Branch
			// apiCall.getCall(getAllBranch).then(function(response4){
				
				// vm.branchDrop = response4;
					
			// });
		});
	
	});
	
  //Get All Branch on Company Change
  $scope.changeCompany = function(id)
  {
	  // vm.branchDrop = [];
		// var getAllBranch = apiPath.getOneBranch+id;
		//Get Branch
		// apiCall.getCall(getAllBranch).then(function(response4){
			// vm.branchDrop = response4;
				
		// });
  }
	
	$scope.redirectToData = function(){
		
		//var viewDataTypePath = viewDataType;
		var  fromdate = new Date(vm.dt1);
		var modifyFromDate  = fromdate.getDate()+'-'+(fromdate.getMonth()+1)+'-'+fromdate.getFullYear();
		
		var  todate = new Date(vm.dt2);
		var modifyToDate  = todate.getDate()+'-'+(todate.getMonth()+1)+'-'+todate.getFullYear();
		
		$rootScope.accView.companyId = $scope.accViewSales.companyDropDown.companyId;
		$rootScope.accView.fromDate = modifyFromDate; // FromDate
		$rootScope.accView.toDate = modifyToDate; // TODate
		
		if($scope.viewDataTypePath == 'sales'){
			
			if($scope.accViewSales.salesType == 'Retailsales'){
				
				$rootScope.accView.salesType = 'retail_sales';
			}
			else if($scope.accViewSales.salesType == 'Wholesales'){
				
				$rootScope.accView.salesType = 'whole_sales';
			}
			else{
				
				$rootScope.accView.salesType = 'all';
			}
			
		}
		
		if($scope.viewDataTypePath == 'sales'){
			
			$state.go("app.AccDataSales");
			
		}
		else if($scope.viewDataTypePath == 'Retailsales'){
			
			$state.go("app.AccDataRetailSales");
		}
		else if($scope.viewDataTypePath == 'Wholesales'){
			
			$state.go("app.AccDataWholeSales");
		}
		else if($scope.viewDataTypePath == 'purchase'){
			
			$state.go("app.AccDataPurchase");
		}
		else if($scope.viewDataTypePath == 'payment'){
			
			$state.go("app.AccDataPayment");
		}
		else if($scope.viewDataTypePath == 'receipt'){
			
			$state.go("app.AccDataReceipt");
		}
		else if($scope.viewDataTypePath == 'specialJournal'){
			
			$state.go("app.AccDataSpecialJrnl");
		}
		 //$state.go("app.AccDataSales");
		
	}
	
  // Datepicker
  // ----------------------------------- 
	this.minStart = new Date(0,0,1);
	this.maxStart = new Date();
  this.today = function() {
    this.dt1 = new Date();
  };
  this.today();
  
  this.today2 = function() {
    this.dt2 = this.dt1;
  };
  this.today2();
	
	this.check = function()
  {
	  
	 this.dt2 = this.dt1;
  };
  
  this.clear = function () {
    this.dt1 = null;
  };

  // Disable weekend selection
  this.disabled = function(date, mode) {
	
    return false; //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  // this.toggleMin = function() {
    // this.minDate = this.minDate ? null : new Date();
  // };
  // this.toggleMin();

  this.openStart = function($event) {
	  
    $event.preventDefault();
    $event.stopPropagation();

    this.openedStart = true;
  };
  
  this.openEnd = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.openedEnd = true;
  };

  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  this.initDate = new Date('2016-15-20');
  // this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = dateFormats;

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
AccViewController.$inject = ["$rootScope","$scope","apiCall","apiPath","$state","viewDataType"];