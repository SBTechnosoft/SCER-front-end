
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('BranchController', BranchController);

function BranchController($scope, $filter, ngTableParams) {
  'use strict';
  var vm = this;

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

  // SORTING
  // ----------------------------------- 

  var data = [
      {name: "Branch1",  address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395001", city: "Surat", money: -10.0   },
      {name: "Branch2", address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395002", city: "Surat", money: 120.5   },
      {name: "Branch3",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395003", city: "Surat", money: 5.5   },
      {name: "Branch4",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395004", city: "Surat", money: -54.0   },
      {name: "Branch5",    address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395005", city: "Surat", money: 110.1   },
	  {name: "Branch78",  address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395001", city: "Surat", money: -10.0   },
      {name: "Branch243", address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395002", city: "Surat", money: 120.5   },
      {name: "Branch3",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395003", city: "Surat", money: 5.5   },
      {name: "Branch4",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395004", city: "Surat", money: -54.0   },
      {name: "Branch5",    address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395005", city: "Surat", money: 110.1   },
	  {name: "Branch7",  address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395001", city: "Surat", money: -10.0   },
      {name: "Branch2434", address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395002", city: "Surat", money: 120.5   },
      {name: "Branch3",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395003", city: "Surat", money: 5.5   },
      {name: "Branch4",   address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395004", city: "Surat", money: -54.0   },
      {name: "Branch544",    address: "1/3227 , GokulDham Society", address2: "B/H Police Station , Chowk", pincode: "395005", city: "Surat", money: 110.1   }
  ];

  vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
          name: 'asc'     // initial sorting
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
		  
		  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.name) != "undefined" && params.$params.filter.name != "")  || (typeof(params.$params.filter.address) != "undefined" && params.$params.filter.address != "") || (typeof(params.$params.filter.address2) != "undefined" && params.$params.filter.address2 != "") || (typeof(params.$params.filter.pincode) != "undefined" && params.$params.filter.pincode != "") || (typeof(params.$params.filter.city) != "undefined" && params.$params.filter.city != "")))
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

  // FILTERS
  // ----------------------------------- 

  vm.tableParams2 = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      filter: {
          name: '',
          age: ''
          // name: 'M'       // initial filter
      }
  }, {
      total: data.length, // length of data
      getData: function($defer, params) {
          // use build-in angular filter
          var orderedData = params.filter() ?
                 $filter('filter')(data, params.filter()) :
                 data;

          vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(vm.users);
      }
  });

  // SELECT ROWS
  // ----------------------------------- 

  vm.data = data;

  vm.tableParams3 = new ngTableParams({
      page: 1,            // show first page
      count: 10          // count per page
  }, {
      total: data.length, // length of data
      getData: function ($defer, params) {
          // use build-in angular filter
          var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                  data;
          var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) :
                  data;

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });

  vm.changeSelection = function(user) {
      // console.info(user);
  };

  // EXPORT CSV
  // -----------------------------------  

  var data4 = [{name: "Moroni", age: 50},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34},
      {name: "Tiancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34}];

  vm.tableParams4 = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
  }, {
      total: data4.length, // length of data4
      getData: function($defer, params) {
          $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
  });
  
  $scope.edit_comp = function()
  {
	  alert('Edit');
  }
  
  $scope.delete_comp = function()
  {
	  alert('Delete');
  }

}
BranchController.$inject = ["$scope", "$filter", "ngTableParams"];