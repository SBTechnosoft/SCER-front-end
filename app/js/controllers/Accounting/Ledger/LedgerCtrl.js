
/**=========================================================
 * Module: AddStaffController.js
 * Controller for input components
 =========================================================*/

App.controller('AccLedgerController', AccLedgerController);

function AccLedgerController($scope,$filter, ngTableParams,apiCall,apiPath,toaster,getSetFactory,$state,apiResponse,validationMessage) {
  'use strict';
  
	var vm = this;
	$scope.ledgerForm = [];
	$scope.ledgerEditId = [];
	var formdata = new FormData();
	vm.disableValue = false;
	vm.disableCompanyValue = false;
  
	$scope.trueData = false;
	$scope.alertData = true;
	
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
		apiCall.getDefaultCompany().then(function(response){
			
			$scope.ledgerForm.companyDropDown = response;
			if(formdata.has('companyId')){
				
				formdata.delete('companyId');
			}
			formdata.append('companyId',response.companyId);
			
		});
		
		formdata.delete('amountType');
		formdata.delete('amount');
		
		$scope.ledgerForm.amountType = 'debit';
		$scope.ledgerForm.openingBal = 0;
		
		formdata.append('amountType',$scope.ledgerForm.amountType);
		formdata.appned('amount',$scope.ledgerForm.openingBal);
		
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
			$scope.ledgerForm.contact = response.contactNo;
			$scope.ledgerForm.address1 = response.address1;
			$scope.ledgerForm.address2 = response.address2;
			$scope.ledgerForm.tin = response.tin;
			$scope.ledgerForm.pan = response.pan;
			$scope.ledgerForm.gstNo = response.gstNo;
			
			$scope.ledgerForm.amountType = response.openingBalanceType;
			$scope.ledgerForm.openingBal = parseInt(response.openingBalance);
			
			$scope.ledgerForm.under = response.ledgerGroup;
			
			$scope.ledgerForm.companyDropDown = response.company;
			
			$scope.ledgerForm.stateDropDown = response.state;
			
			//City DropDown
			vm.cityDrop = [];
			var cityAllDropPath = apiPath.getAllCity+response.state.stateAbb;
			apiCall.getCall(cityAllDropPath).then(function(res5){
				vm.cityDrop = res5;
				
				$scope.ledgerForm.cityDrop = response.city;
				vm.disableValue = true;
				vm.disableCompanyValue = true;
				
			});
			
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
			$scope.ledgerForm.contact = response.contactNo;
			$scope.ledgerForm.address1 = response.address1;
			$scope.ledgerForm.address2 = response.address2;
			$scope.ledgerForm.tin = response.tin;
			$scope.ledgerForm.pan = response.pan;
			$scope.ledgerForm.gstNo = response.gstNo;
			
			$scope.ledgerForm.amountType = response.openingBalanceType;
			$scope.ledgerForm.openingBal = parseInt(response.openingBalance);
			
			$scope.ledgerForm.under = response.ledgerGroup;
			
			$scope.ledgerForm.companyDropDown = response.company;
			
			$scope.ledgerForm.stateDropDown = response.state;
			
			//City DropDown
			vm.cityDrop = [];
			var cityAllDropPath = apiPath.getAllCity+response.state.stateAbb;
			apiCall.getCall(cityAllDropPath).then(function(res5){
				vm.cityDrop = res5;
				$scope.ledgerForm.cityDrop = response.city;
			});
			
			
			
			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
			// $scope.ledgerForm.ledgerName = response.ledgerName;
		
		});
		
		
	}
	
	 //this.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	
 //Table
	var data = [
      {company_name: "Moroni",label:"dsf/1945/", fix:"Prefix", started_at: 2 },
      {company_name: "Tiancum",label:"dsf/1945/",fix:"Postfix", started_at: 6 },
      {company_name: "Jacob", label:"dsf/1945/", fix:"Prefix", started_at: 27  },
      {company_name: "Nephi",label:"dsf/1945/",  fix:"Prefix", started_at: 29   },
      {company_name: "Enos",  label:"dsf/1945/",fix:"Prefix",  started_at: 34 },
      {company_name: "Tiancum",label:"dsf/1945/",fix:"Postfix", started_at: 43 },
      {company_name: "Jacob",label:"dsf/1945/", fix:"Prefix",  started_at: 54  },
      {company_name: "Nephi", label:"dsf/1945/",fix:"Prefix",  started_at: 29  },
      {company_name: "Enos",  label:"dsf/1945/", fix:"Postfix", started_at: 34 },
      {company_name: "Tiancum",label:"dsf/1945/",fix:"Prefix", started_at: 10 },
      {company_name: "Jacob", label:"dsf/1945/",fix:"Prefix",  started_at: 27  },
      {company_name: "Nephi",  label:"dsf/1945/",fix:"Prefix", started_at: 29  },
      {company_name: "Enos",  label:"dsf/1945/", fix:"Postfix", started_at: 34 },
      {company_name: "Tiancum", label:"dsf/1945/",fix:"Prefix",started_at: 43 },
      {company_name: "Jacob", label:"dsf/1945/", fix:"Prefix", started_at: 27  },
      {company_name: "Nephi", label:"dsf/1945/", fix:"Postfix", started_at: 29 },
      {company_name: "Enos", label:"dsf/1945/",  fix:"Postfix", started_at: 34 }
  ];
  
  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  company_name: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  //console.log(params.$params);
			  // if()
			  // {
				  // alert('yes');
			  // }
			  // else{
				  // alert('no');
			  // }
			  // use build-in angular filter
			 // console.log("Length: .."+params.$params.filter.city);
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.company_name) != "undefined" && params.$params.filter.company_name != "")  || (typeof(params.$params.filter.label) != "undefined" && params.$params.filter.label != "") || (typeof(params.$params.filter.fix) != "undefined" && params.$params.filter.fix != "") || (typeof(params.$params.filter.started_at) != "undefined" && params.$params.filter.started_at != "")))
			  {
					 var orderedData = params.filter() ?
					 $filter('filter')(data, params.filter()) :
					 data;

					  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  params.total(orderedData.length); // set total for recalc pagination
					  $defer.resolve(vm.users);
			  

			  }
			  else{
				  
				   params.total(data.length);
				  
			  }
			 
			 if(!$.isEmptyObject(params.$params.sorting))
			  {
				
				 //alert('ggg');
				  var orderedData = params.sorting() ?
						  $filter('orderBy')(data, params.orderBy()) :
						  data;
		  
				  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			  }
			
		  }
	  });
	  
	  
	  
	  
 //End Table
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
  
  
	 
	//Get Company
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response3){
		
		vm.companyDrop = response3;
	
	});
	
	//Get State
	vm.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		vm.statesDrop = response3;
	
	});
	
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
	
	$scope.getLegderCompany = [];
	
	vm.allLedgerData = [];
	
	//Set default Company
	apiCall.getDefaultCompany().then(function(response){
	
		$scope.getLegderCompany.companyDropDown = response;
		$scope.ledgerForm.companyDropDown = response;
		
		//Auto suggest Client Name For Debit
		var jsuggestPath = apiPath.getLedgerJrnl+response.companyId;
		
		apiCall.getCall(jsuggestPath).then(function(response3){
			
			vm.allLedgerData = response3;
		
		});
		
	});
	
	//Get Data When Company Change
	$scope.changeCompanyToGetList = function(value){
		
		
		//Auto suggest Client Name For Debit
		var jsuggestPath = apiPath.getLedgerJrnl+value;
		
		apiCall.getCall(jsuggestPath).then(function(response3){
			
			//console.log(response3);
			
			if(apiResponse.noContent == response3){
				
				vm.allLedgerData = [];
			}
			else{
				
				vm.allLedgerData = response3;
			}
			
		});
	}
	
	$scope.addUpLedger = function()
	{
		
		//formdata.append('companyId',10);
		
		if($scope.ledgerEditId.id)
		{
			var ledgerPath = apiPath.getAllLedger+'/'+$scope.ledgerEditId.id;
			
			
		}
		else{
			
			var ledgerPath = apiPath.getAllLedger;
			formdata.append('balanceFlag','opening');
		}
		
		
		apiCall.postCall(ledgerPath,formdata).then(function(response5){
		
			//$location.path('app/AccLedger');
			console.log(response5);
			
				
					
				
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
AccLedgerController.$inject = ["$scope","$filter", "ngTableParams","apiCall","apiPath","toaster","getSetFactory","$state","apiResponse","validationMessage"];