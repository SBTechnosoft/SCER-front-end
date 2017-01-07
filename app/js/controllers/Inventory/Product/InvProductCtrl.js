
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvProductController', InvProductController);

function InvProductController($scope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
 
 
 
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

  // var data = [
      // {name: "Product1",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product2",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product3",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product4",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product5",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product6",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product7",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product8",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product9",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product10",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product11",  category: "Glass", group: "Cup", measure: "Inch" },
	  // {name: "Product12",  category: "Glass", group: "Cup", measure: "Inch" }
      
  // ];
  var data = [];
  apiCall.getCall(apiPath.getAllProduct).then(function(response){
		data = response;
		for (var i = 0; i < data.length; i++) {
		  data[i].productCategoryName = ""; //initialization of new property 
		  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
		  data[i].productGroupName = ""; //initialization of new property 
		  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
		}
		 $scope.TableData();
	});

	 $scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  name: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			 
			  // if()
			  // {
				  // alert('yes');
			  // }
			  // else{
				  // alert('no');
			  // }
			  // use build-in angular filter
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.measurementUnit) != "undefined" && params.$params.filter.measurementUnit != "") ))
			  {
					 var orderedData = params.filter() ?
					 $filter('filter')(data, params.filter()) :
					 data;

					  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  params.total(orderedData.length); // set total for recalc pagination
					  $defer.resolve(vm.users);
			  

			  }
			else
			{
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
  
  $scope.editProduct = function(id)
  {
	  $location.path('app/AddInvProduct/'+id);
  }
  
  $scope.deleteProduct = function(id)
  {
		//alert(id);
	  
		apiCall.deleteCall(apiPath.getAllProduct+'/'+id).then(function(response){
		
			console.log(response);
			
			if(apiResponse.ok == response){
				
				toaster.pop('success', 'Title', 'Delete SuccessFully');
				vm.tableParams.reload();
				
			}
			else{

				toaster.pop('warning', 'Opps!!', response);
			}

		});
  }

}
InvProductController.$inject = ["$scope", "$filter", "ngTableParams","apiCall","apiPath","$location","apiResponse","toaster"];