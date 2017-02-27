
/**=========================================================
 * Module: StaffCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvCategoryController', InvCategoryController);

function InvCategoryController($scope,$filter,$timeout,$templateCache,ngTableParams,apiCall,apiPath,$interval,$anchorScroll,apiResponse,toaster,validationMessage) {
	
  'use strict';
  var vm = this;
	
	$scope.invCategoryData = [];
	var formdata = new FormData();
	$scope.invCategoryID = [];
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	var tree;
	//var myTreeData;

        var rawTreeData = [
            {
                "DemographicId": 1,
                "ParentId": null,
                "Name": "United States of America",
                "Description": "United States of America",
                "Area": 9826675,
                "Population": 918212000,
                "TimeZone": "UTC -5 to -10"
            },
            {
                "DemographicId": 2,
                "ParentId": 1,
                "Name": "California",
                "Description": "The Tech State",
                "Area": 423970,
                "Population": 38340000,
                "TimeZone": "Pacific Time"
            },
            {
                "DemographicId": 3,
                "ParentId": 2,
                "Name": "San Francisco",
                "Description": "The happening city",
                "Area": 231,
                "Population": 837442,
                "TimeZone": "PST"
            },
            {
                "DemographicId": 4,
                "ParentId": 2,
                "Name": "Los Angeles",
                "Description": "Disco city",
                "Area": 503,
                "Population": 3904657,
                "TimeZone": "PST"
            },
            {
                "DemographicId": 5,
                "ParentId": 1,
                "Name": "Illinois",
                "Description": "Not so cool",
                "Area": 57914,
                "Population": 12882135,
                "TimeZone": "Central Time Zone"
            },
            {
                "DemographicId": 6,
                "ParentId": 5,
                "Name": "Chicago",
                "Description": "Financial City",
                "Area": 234,
                "Population": 2695598,
                "TimeZone": "CST"
            },
            {
                "DemographicId": 7,
                "ParentId": 1,
                "Name": "Texas",
                "Description": "Rances, Oil & Gas",
                "Area": 268581,
                "Population": 26448193,
                "TimeZone": "Mountain"
            },
            {
                "DemographicId": 8,
                "ParentId": 1,
                "Name": "New York",
                "Description": "The largest diverse city",
                "Area": 141300,
                "Population": 19651127,
                "TimeZone": "Eastern Time Zone"
            },
            {
                "DemographicId": 14,
                "ParentId": 8,
                "Name": "Manhattan",
                "Description": "Time Square is the place",
                "Area": 269.403,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "DemographicId": 15,
                "ParentId": 14,
                "Name": "Manhattan City",
                "Description": "Manhattan island",
                "Area": 33.77,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "DemographicId": 16,
                "ParentId": 14,
                "Name": "Time Square",
                "Description": "Time Square for new year",
                "Area": 269.40,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "DemographicId": 17,
                "ParentId": 8,
                "Name": "Niagra water fall",
                "Description": "Close to Canada",
                "Area": 65.7,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "DemographicId": 18,
                "ParentId": 8,
                "Name": "Long Island",
                "Description": "Harbour to Atlantic",
                "Area": 362.9,
                "Population": 0,
                "TimeZone": "EST"
            },
            {
                "DemographicId": 51,
                "ParentId": 1,
                "Name": "All_Other",
                "Description": "All_Other demographics",
                "Area": 0,
                "Population": 0,
                "TimeZone": 0
            },
            {
                "DemographicId": 201,
                "ParentId": null,
                "Name": "India",
                "Description": "Hydrabad tech city",
                "Area": 5566.9,
                "Population": 718212000,
                "TimeZone": "IST"
            },
            {
                "DemographicId": 301,
                "ParentId": null,
                "Name": "Bangladesh",
                "Description": "Country of love",
                "Area": 5566.78,
                "Population": 718212004,
                "TimeZone": "BST"
            }
        ];
	//Get Category Data
	var rawTreeData2=[{"productCategoryName":"","productCategoryId":"","productCategoryDescription":"","isDisplay":"","createdAt":"","updatedAt":"","productParentCategoryId":""}];
	

        var myTreeData = getTree(rawTreeData2, 'productCategoryId', 'productParentCategoryId');
		$scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};

        $scope.expanding_property = {
            field: "productCategoryName",
            displayName: "Brand Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        };
		
        $scope.col_defs = [
            {
                field: "productCategoryDescription",
				displayName: "Description"
            },
			{
			field: "productCategoryId",
			displayName: "Action",
			cellTemplate: "<i ui-sref=\"\" ng-click=\"cellTemplateScope.editCat(row.branch[col.field])\" class=\"fa fa-edit\" style=\"font-size:17px;color:#10709f\"></i>&nbsp; &nbsp;<i ui-sref=\"\" ng-click=\"cellTemplateScope.deleteCat(row.branch[col.field])\" class=\"fa fa-times-circle\" style=\"font-size:17px;color:red\"></i>",
			cellTemplateScope: {
				deleteCat: function(data) {         // this works too: $scope.someMethod;
					console.log(data);
					apiCall.deleteCall(apiPath.getAllCategory+'/'+data).then(function(response){
						
						console.log(response);
						
						if(apiResponse.ok == response){
							
							toaster.pop('success', 'Title', 'Delete SuccessFully');
							vm.categoryDrop = [];
							apiCall.getCall(apiPath.getAllCategory).then(function(response){
							
								vm.categoryDrop = response;
								var myTreeData2 = getTree(response, 'productCategoryId', 'productParentCategoryId');
								$scope.tree_data = myTreeData2;
							
							});
							
						}
						else{
				
							toaster.pop('warning', 'Opps!!', response);
						}
			
					});
				},
				editCat: function(data){
					
					$scope.invCategoryID.id = data;
					apiCall.getCall(apiPath.getAllCategory+'/'+data).then(function(response){
						
						$scope.invCategoryData.categoryName = response.productCategoryName;
						$scope.invCategoryData.categoryDesc = response.productCategoryDescription;
						//console.log(response);
						if(response.productParentCategoryId==''){
							//console.log('yes');
						}
						else{
							
							apiCall.getCall(apiPath.getAllCategory+'/'+response.productParentCategoryId).then(function(response){
								$scope.invCategoryData.categoryDropDown = response;
							});
						}
						
					
					});
					
					$anchorScroll();
				}
			}
			}
        ];
		
        $scope.my_tree_handler = function (branch) {
            console.log('you clicked on', branch);
        }
		$scope.deleteData = function(){
			alert('Delete');
			//console.log('Here',branch);
		}
		
		vm.categoryDrop = [];
		apiCall.getCall(apiPath.getAllCategory).then(function(response){
			
			console.log(response);
			vm.categoryDrop = response;
			var myTreeData2 = getTree(response, 'productCategoryId', 'productParentCategoryId');
			$scope.tree_data = myTreeData2;
			
		});
		
     $scope.addUpCategory = function(){
		 
		 
		if($scope.invCategoryData.categoryDropDown)
		{
			formdata.append('productCategoryName',$scope.invCategoryData.categoryName);
			
			if($scope.invCategoryData.categoryDesc){
				formdata.append('productCategoryDescription',$scope.invCategoryData.categoryDesc);
			}
			
			formdata.append('productParentCategoryId',$scope.invCategoryData.categoryDropDown.productCategoryId);
			formdata.append('isDisplay','yes');
			
		}
		else{
			
			formdata.append('productCategoryName',$scope.invCategoryData.categoryName);
			
			if($scope.invCategoryData.categoryDesc){
				formdata.append('productCategoryDescription',$scope.invCategoryData.categoryDesc);
			}
			
			formdata.append('productParentCategoryId','');
			formdata.append('isDisplay','yes');
		}
		
		if($scope.invCategoryID.id){
			
			var categoryPath = apiPath.getAllCategory+'/'+$scope.invCategoryID.id;
			$scope.invCategoryID = [];
		}
		else{
			var categoryPath = apiPath.getAllCategory;
		}
		apiCall.postCall(categoryPath,formdata).then(function(response){
			
			
			formdata.delete('productCategoryName');
			formdata.delete('productCategoryDescription');
			formdata.delete('productParentCategoryId');
			formdata.delete('isDisplay');
			
			if(apiResponse.ok == response){
				
				toaster.pop('success', 'Title', 'SuccessFull');
				
				$scope.invCategoryData = [];
				apiCall.getCall(apiPath.getAllCategory).then(function(response){
				
					vm.categoryDrop = response;
					var myTreeData2 = getTree(response, 'productCategoryId', 'productParentCategoryId');
					$scope.tree_data = myTreeData2;
				
				});
			}
			else{
				
				toaster.pop('warning', 'Opps!!', response);
			}
			
		});
		
	 }
 
	$scope.cancel = function(){
		
		$scope.invCategoryData = [];
		
		apiCall.getCall(apiPath.getAllCategory).then(function(response){
				
			vm.categoryDrop = response;
			var myTreeData2 = getTree(response, 'productCategoryId', 'productParentCategoryId');
			$scope.tree_data = myTreeData2;
		
		});
		
		var formdata = new FormData();
	}
 

  // SORTING
  // ----------------------------------- 
$scope.branchF = [
      {pop: "Branch1" },
      {pop: "Branch2" }
  ];
  
  var data = [
      {name: "Staff1",  address: "1/3227 , GokulDham Society", mobile: "9564587458", city: "Surat"  },
      {name: "Staff2", address: "1/3227 , GokulDham Society", mobile: "857456987", city: "Surat"  },
      {name: "Staff3",   address: "1/3227 , GokulDham Society", mobile: "9996587221", city: "Surat"  },
      {name: "Staff4",   address: "1/3227 , GokulDham Society", mobile: "9745222222", city: "Surat"  },
      {name: "Staff5",    address: "1/3227 , GokulDham Society", mobile: "8885964754", city: "Surat" }
  ];
  
 
  
  //alert(branchF);

  vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
          name: 'asc'     // initial sorting
      }
  }, {
      total: data.length, // length of data
      getData: function($defer, params) {
		  console.log(params.$params);
		  // if()
		  // {
			  // alert('yes');
		  // }
		  // else{
			  // alert('no');
		  // }
          // use build-in angular filter
		  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.name) != "undefined" && params.$params.filter.name != "")  || (typeof(params.$params.filter.address) != "undefined" && params.$params.filter.address != "") || (typeof(params.$params.filter.mobile) != "undefined" && params.$params.filter.mobile != "") || (typeof(params.$params.filter.city) != "undefined" && params.$params.filter.city != "")))
		  {
				 var orderedData = params.filter() ?
                 $filter('filter')(data, params.filter()) :
                 data;

				  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

				  params.total(orderedData.length); // set total for recalc pagination
				  $defer.resolve(vm.users);
		  

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
  
  

        function getTree(data, primaryIdName, parentIdName) {
            if (!data || data.length == 0 || !primaryIdName || !parentIdName)
                return [];

            var tree = [],
                rootIds = [],
                item = data[0],
                primaryKey = item[primaryIdName],
                treeObjs = {},
                parentId,
                parent,
                len = data.length,
                i = 0;

            while (i < len) {
                item = data[i++];
                primaryKey = item[primaryIdName];
                treeObjs[primaryKey] = item;
                parentId = item[parentIdName];

                if (parentId) {
                    parent = treeObjs[parentId];

                    if (parent.children) {
                        parent.children.push(item);
                    } else {
                        parent.children = [item];
                    }
                } else {
                    rootIds.push(primaryKey);
                }
            }

            for (var i = 0; i < rootIds.length; i++) {
                tree.push(treeObjs[rootIds[i]]);
            }
            ;

            return tree;
        }
  

}
InvCategoryController.$inject = ["$scope", "$filter","$timeout","$templateCache","ngTableParams","apiCall","apiPath","$interval","$anchorScroll","apiResponse","toaster","validationMessage"];