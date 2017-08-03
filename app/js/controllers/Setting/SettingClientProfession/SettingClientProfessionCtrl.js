
/**=========================================================
 * Module: SettingClientProfessionController.js
 * Controller for input components
 =========================================================*/

App.controller('SettingClientProfessionController', SettingClientProfessionController);

function SettingClientProfessionController($rootScope,$scope,$filter,ngTableParams,apiCall,apiPath,toaster,apiResponse,validationMessage) {
  'use strict';
 var vm = this;
 var data = [{'professionName': 'Doctor'},{'professionName': 'Engineer'}];
 $scope.clientProfessionForm = [];
 
 //var JobcardGetApiPath = apiPath.getJobcardNumber;
 
	
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	//$scope.validationPattern = validationPattern; //pattern
	
	/* VALIDATION END */
	
	// Get All Invoice Call 
	//apiCall.getCall(JobcardGetApiPath).then(function(response){
		//console.log(response);
		//data = response;
	//$scope.TableData();
	//});
	
	//$scope.TableData = function(){
		
	/* Tree */
	
		
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
		
		this.rawTreeDataNg = rawTreeData;
	//Get Category Data
	var rawTreeData2=[{"productCategoryName":"","productCategoryId":"","productCategoryDescription":"","isDisplay":"","createdAt":"","updatedAt":"","productParentCategoryId":""}];
	

        var myTreeData = getTree(rawTreeData, 'DemographicId', 'ParentId');
		$scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};

        $scope.expanding_property = {
            field: "Name",
            displayName: "Brand Name",
            sortable: true,
            filterable: true,
            cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        };
		
        $scope.col_defs = [
            {
                field: "Description",
				displayName: "Description"
            },
			{
			field: "DemographicId",
			displayName: "Action",
			cellTemplate: "<i ui-sref=\"\" ng-click=\"cellTemplateScope.editCat(row.branch[col.field])\" class=\"fa fa-edit\" style=\"font-size:17px;color:#10709f\"></i>&nbsp; &nbsp;<i ui-sref=\"\" ng-click=\"cellTemplateScope.deleteCat(\'sm\',row.branch[col.field])\" class=\"fa fa-times-circle\" style=\"font-size:17px;color:red\"></i>",
			cellTemplateScope: {
				deleteCat: function(size,data) {         // this works too: $scope.someMethod;
					//console.log(data);
					toaster.clear();
				if (Modalopened) return;
				
			var modalInstance = $modal.open({
				  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
				  controller: deleteDataModalController,
				  size: size
				});

			    Modalopened = true;
				
				modalInstance.result.then(function () {
				 
				 //console.log('ok');
				 toaster.clear();
				toaster.pop('wait', 'Please Wait', 'Data Deleting....',60000);
				// return false;
				 /**Delete Code **/
					apiCall.deleteCall(apiPath.getAllCategory+'/'+data).then(function(response){
						
						//console.log(response);
						toaster.clear();
						if(apiResponse.ok == response){
							
							toaster.pop('success', 'Title', 'Delete SuccessFully');
							// vm.categoryDrop = [];
							// apiCall.getCall(apiPath.getAllCategory).then(function(response){
							
								// vm.categoryDrop = response;
								// var myTreeData2 = getTree(response, 'productCategoryId', 'productParentCategoryId');
								// $scope.tree_data = myTreeData2;
							
							// });
							$scope.init();
							
						}
						else{
				
							toaster.pop('warning', 'Opps!!', response);
						}
			
					});
				 /** End **/
					 Modalopened = false;
					 
				}, function () {
				  console.log('Cancel');	
					 Modalopened = false;
				});
		
					
				},
				editCat: function(data){
					
					toaster.clear();
					toaster.pop('wait', 'Please Wait', 'Data Fetching....',60000);
					
					$scope.invCategoryID.id = data;
					apiCall.getCall(apiPath.getAllCategory+'/'+data).then(function(response){
						
						toaster.clear();
						
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
            //console.log('you clicked on', branch);
        }
		
	/* End Tree */
 	 vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  professionName: 'asc'     // initial sorting
		  }
	  }, {
		  counts: [],
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
			  
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.professionName) != "undefined" && params.$params.filter.professionName != "")))
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
				  var orderedData = params.sorting() ?
						  $filter('orderBy')(data, params.orderBy()) :
						  data;
		  
				  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			  }
			
			 $scope.totalData = data.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
			
		  }
	  });
	//}
	  
	
  //Insert Invoice
  $scope.insertProfessionData = function()
  {
	  var obj = {};
	  obj.professionName = $scope.clientProfessionForm.professionName;
	  
	  data.push(obj);
	  vm.tableParams.reload();
	  vm.tableParams.page(1);
	  
	  	$scope.clientProfessionForm = [];
	 // var formdata = new FormData();
	 //console.log(clientProfessionForm);
	 
		// if($scope.clientProfessionForm.professionName){
		
			// formdata.append('professionName',$scope.clientProfessionForm.professionName);
		// }
		// else{
			 // formdata.append('professionName','');
		// }
	 
	 //apiCall.postCall(JobcardGetApiPath,formdata).then(function(response5){
		
			//console.log(response5);
			//$location.path('app/Invoice');
			// if(apiResponse.ok == response5){
				
				// toaster.pop('success', 'Title', 'Successfull');
					
				// apiCall.getCall(JobcardGetApiPath).then(function(response){
					// data = response;
					// vm.tableParams.reload();
					  // vm.tableParams.page(1);
				// });
				
				// $scope.clientProfessionForm.professionName = '';
				
			// }
			// else{
			
				// toaster.pop('warning', 'Opps!!', response5);
			// }
			//toaster.pop('success', 'Title', 'Message');
			
			// formdata.delete('professionName');
		
		
	//});
  }
  
  $scope.delete_profession = function(index){
	  
	  data.splice(index,1);
	   vm.tableParams.reload();
	  vm.tableParams.page(1);
  }
  
	$scope.cancel = function(){
		
		$scope.clientProfessionForm = [];
	
		formdata.delete('professionName');
		
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
SettingClientProfessionController.$inject = ["$rootScope","$scope","$filter","ngTableParams","apiCall","apiPath","toaster","apiResponse","validationMessage"];