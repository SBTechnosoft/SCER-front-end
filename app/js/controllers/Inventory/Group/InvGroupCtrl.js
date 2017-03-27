
/**=========================================================
 * Module: InvGroupController.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvGroupController', InvGroupController);

function InvGroupController($scope,$filter,$timeout,$templateCache,ngTableParams,apiCall,apiPath,$anchorScroll,toaster,apiResponse,validationMessage,$modal) {
	
  'use strict';
  var vm = this;
	$scope.invGroupData = [];
	var formdata = new FormData();
	$scope.invGroupID = [];
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	// apiCall.deleteCall(apiPath.getAllGroup+'/'+62).then(function(response){
						
						// if(apiResponse.ok == response){
							
							// console.log(response);
							// toaster.pop('success', 'Title', 'Delete SuccessFully');
							
							// vm.groupDrop = [];
							// apiCall.getCall(apiPath.getAllGroup).then(function(response){
								
								// vm.groupDrop = response;
								// var myTreeData2 = getTree(response, 'productGroupId', 'productGroupParentId');
								// $scope.tree_data = myTreeData2;
								
							// });
						
						// }
						// else{
				
							// toaster.pop('warning', 'Opps!!', response);
						// }
			
					// });
	
	var tree;

       var rawTreeData=[{"productGroupName":"","productGroupId":"","productGroupDescription":"","isDisplay":"","createdAt":"","updatedAt":"","productGroupParentId":""}];

        var myTreeData = getTree(rawTreeData, 'productGroupId', 'productGroupParentId');
		$scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};

        $scope.expanding_property = {
            field: "productGroupName",
            displayName: "Category Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        };
        $scope.col_defs = [
            {
                field: "productGroupDescription",
                displayName: "Description"
            },
			{
			field: "productGroupId",
			displayName: "Action",
			cellTemplate: "<i ui-sref=\"\" ng-click=\"cellTemplateScope.editCat(row.branch[col.field])\" class=\"fa fa-edit\" style=\"font-size:17px;color:#10709f\"></i>&nbsp; &nbsp;<i ui-sref=\"\" ng-click=\"cellTemplateScope.deleteCat(\'sm\',row.branch[col.field])\" class=\"fa fa-times-circle\" style=\"font-size:17px;color:red\"></i>",
			cellTemplateScope: {
				deleteCat: function(size,data) {         // this works too: $scope.someMethod;
					console.log(data);
					toaster.clear();
	
					var modalInstance = $modal.open({
						  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
						  controller: deleteDataModalController,
						  size: size
						});

					   
						modalInstance.result.then(function () {
						 
						 console.log('ok');
						  toaster.clear();
						toaster.pop('wait', 'Please Wait', 'Data Deleting....',60000);
						// return false;
						 /**Delete Code **/
							apiCall.deleteCall(apiPath.getAllGroup+'/'+data).then(function(response){
								
								toaster.clear();
								if(apiResponse.ok == response){
									
									console.log(response);
									toaster.pop('success', 'Title', 'Delete SuccessFully');
									
									vm.groupDrop = [];
									// apiCall.getCall(apiPath.getAllGroup).then(function(response){
										
										// vm.groupDrop = response;
										// var myTreeData2 = getTree(response, 'productGroupId', 'productGroupParentId');
										// $scope.tree_data = myTreeData2;
										
									// });
									$scope.init();
								
								}
								else{
						
									toaster.pop('warning', 'Opps!!', response);
								}
					
							});
						 /** End **/
						
						}, function () {
						  console.log('Cancel');	
						});
		
					
				},
				editCat: function(data){
					 toaster.clear();
					toaster.pop('wait', 'Please Wait', 'Data Fetching....',60000);
						
					$scope.invGroupID.id = data;
					apiCall.getCall(apiPath.getAllGroup+'/'+data).then(function(response){
						
						toaster.clear();
						
						$scope.invGroupData.groupName = response.productGroupName;
						$scope.invGroupData.groupDesc = response.productGroupDescription;
						//console.log(response);
						if(response.productGroupParentId==''){
							//console.log('yes');
						}
						else{
							
							apiCall.getCall(apiPath.getAllGroup+'/'+response.productGroupParentId).then(function(response){
								$scope.invGroupData.groupDropDown = response;
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
		
		$scope.init = function(){
			
			vm.groupDrop = [];
			apiCall.getCall(apiPath.getAllGroup).then(function(response){
				
				console.log(response);
				vm.groupDrop = response;
				var myTreeData2 = getTree(response, 'productGroupId', 'productGroupParentId');
				$scope.tree_data = myTreeData2;
				
			});
		
		}
		$scope.init();
		
		$scope.addUpGroup = function(){
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Loading....',60000);
		 
			if($scope.invGroupData.groupDropDown)
			{
				console.log('yes');
				formdata.append('productGroupName',$scope.invGroupData.groupName);
				if($scope.invGroupData.groupDesc){
					formdata.append('productGroupDescription',$scope.invGroupData.groupDesc);
				}
				formdata.append('productGroupParentId',$scope.invGroupData.groupDropDown.productGroupId);
				formdata.append('isDisplay','yes');
				
			}
			else{
				console.log('no');
				formdata.append('productGroupName',$scope.invGroupData.groupName);
				if($scope.invGroupData.groupDesc){
					formdata.append('productGroupDescription',$scope.invGroupData.groupDesc);
				}
				
				formdata.append('productGroupParentId','');
				formdata.append('isDisplay','yes');
			}
			
			if($scope.invGroupID.id){
				
				var groupPath = apiPath.getAllGroup+'/'+$scope.invGroupID.id;
				$scope.invGroupID = [];
			}
			else{
				var groupPath = apiPath.getAllGroup;
			}
			apiCall.postCall(groupPath,formdata).then(function(response){
				
				formdata.delete('productGroupName');
				formdata.delete('productGroupDescription');
				formdata.delete('productGroupParentId');
				formdata.delete('isDisplay');
				toaster.clear();
				if(apiResponse.ok == response){
				
					toaster.pop('success', 'Title', 'SuccessFull');
				
					$scope.invGroupData = [];
					// apiCall.getCall(apiPath.getAllGroup).then(function(response){
					
						// vm.groupDrop = response;
						// var myTreeData2 = getTree(response, 'productGroupId', 'productGroupParentId');
						// $scope.tree_data = myTreeData2;
					
					// });
					$scope.init();
				}
				else{
					
					toaster.pop('warning', 'Opps!!', response);
				}
				
			});
		
	 }
	
	$scope.cancel = function(){
		
		$scope.invGroupData = [];
		
		// apiCall.getCall(apiPath.getAllGroup).then(function(response){
					
			// vm.groupDrop = response;
			// var myTreeData2 = getTree(response, 'productGroupId', 'productGroupParentId');
			// $scope.tree_data = myTreeData2;
		
		// });
			$scope.init();	
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
InvGroupController.$inject = ["$scope", "$filter","$timeout","$templateCache","ngTableParams","apiCall","apiPath","$anchorScroll","toaster","apiResponse","validationMessage","$modal"];