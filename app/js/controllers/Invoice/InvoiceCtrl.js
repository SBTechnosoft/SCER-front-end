
/**=========================================================
 * Module: AddStaffController.js
 * Controller for input components
 =========================================================*/

App.controller('InvoiceController', InvoiceController);

function InvoiceController($scope,$filter,ngTableParams,apiCall,apiPath,$location) {
  'use strict';
 var vm = this;
 var data = [];
 $scope.addInvoice = [];
 //Table
	
	// Get All Invoice Call 
	apiCall.getCall(apiPath.getAllInvoice).then(function(response){
		console.log(response);
		data = response;
		for (var i = 0; i < data.length; i++) {
		  data[i].companyName = ""; //initialization of new property 
		  data[i].companyName = data[i].company.companyName;  //set the data from nested obj into new property
		}
		 $scope.TableData();
	});
	
	$scope.TableData = function(){
  
 	 vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  companyName: 'asc'     // initial sorting
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
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.companyName) != "undefined" && params.$params.filter.companyName != "")  || (typeof(params.$params.filter.invoiceLabel) != "undefined" && params.$params.filter.invoiceLabel != "") || (typeof(params.$params.filter.invoiceType) != "undefined" && params.$params.filter.invoiceType != "") || (typeof(params.$params.filter.startAt) != "undefined" && params.$params.filter.startAt != "")))
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
	}
	  
	  
	  
 //End Table
  // Chosen data
  // ----------------------------------- 
	vm.invoiceCompanyDrop= [];
	// Get All Invoice Call 
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.invoiceCompanyDrop = responseCompanyDrop;
	
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
  
  //Insert Invoice
  $scope.insertInvoiceData = function(addInvoice)
  {
	  var formdata = new FormData();
	 //console.log(addInvoice);
	 
	 formdata.append('companyId',addInvoice.companyDrop.companyId);
	 formdata.append('invoiceLabel',addInvoice.invoiceLabel);
	 formdata.append('startAt',addInvoice.startAt);
	 formdata.append('invoiceType',addInvoice.invoiceType);
	 
	 apiCall.postCall(apiPath.getAllInvoice,formdata).then(function(response5){
		
			//console.log(response5);
			//$location.path('app/Invoice');
			apiCall.getCall(apiPath.getAllInvoice).then(function(response){
				data = response;
				$scope.TableData();
			});
			//toaster.pop('success', 'Title', 'Message');
		
	});
	
	$scope.addInvoice.companyDrop.companyId='';
	$scope.addInvoice.invoiceLabel = '';
	$scope.addInvoice.startAt = '';
	$scope.addInvoice.invoiceType = 'prefix';
	
  }
}
InvoiceController.$inject = ["$scope","$filter","ngTableParams","apiCall","apiPath","$location"];