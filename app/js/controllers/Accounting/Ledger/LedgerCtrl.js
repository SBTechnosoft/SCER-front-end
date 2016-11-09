
/**=========================================================
 * Module: AddStaffController.js
 * Controller for input components
 =========================================================*/

App.controller('AccLedgerController', AccLedgerController);

function AccLedgerController($scope,$filter, ngTableParams,apiCall,apiPath,$location,toaster) {
  'use strict';
 var vm = this;
 $scope.ledgerForm = [];
  var formdata = new FormData();
	
	$scope.trueData = false;
	$scope.alertData = true;
	$scope.showInput = function()
	{
		
		$scope.trueData = true;
		$scope.alertData = false;
	}
	
	$scope.clickSave = function()
	{
		
		$scope.trueData = false;
		$scope.alertData = true;
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

  this.states = [
    '1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10'
  ];
  this.invAffectDrop = [
	'yes',
	'no'
  ]
	//Get State
	vm.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		vm.statesDrop = response3;
	
	});
	
	$scope.setPcode = function(Fname,value) {
  		//console.log(name+'..'+value);
		if(formdata.get(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
  	}
	
	$scope.ChangeState = function(Fname,state)
	 {
		
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
	
  
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		console.log(Fname+'..'+value);
		if(formdata.get(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
	$scope.addUpLedger = function()
	{
		formdata.append('companyId',10);
		//formdata.append('companyId',10);
		apiCall.postCall(apiPath.getAllLedger,formdata).then(function(response5){
		
			//console.log(response5);
			
			$location.path('app/AccLedger');
			toaster.pop('success', 'Title', 'Message');
			//formdata.removeAll();
			$scope.ledgerForm = [];
			//console.log(formdata.get('ledgerName'));
		
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
AccLedgerController.$inject = ["$scope","$filter", "ngTableParams","apiCall","apiPath","$location","toaster"];