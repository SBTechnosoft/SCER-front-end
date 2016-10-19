
/**=========================================================
 * Module: AddStaffController.js
 * Controller for input components
 =========================================================*/

App.controller('AccLedgerController', AccLedgerController);

function AccLedgerController($scope,$filter, ngTableParams) {
  'use strict';
 var vm = this;
 

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
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
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
}
AccLedgerController.$inject = ["$scope","$filter", "ngTableParams"];