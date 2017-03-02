
/**=========================================================
 * Module: StaffCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('StaffController', StaffController);

function StaffController($scope,$rootScope, $filter, ngTableParams,apiCall,apiPath,$state,apiResponse,toaster,getSetFactory,$modal) {
  'use strict';
  var vm = this;
	var data = [];
	$scope.showStaff = [];
	//vm.tableParams;
	$scope.allowedAdd = $rootScope.$storage.authUser.userType;
	$scope.allowedId = $rootScope.$storage.authUser.userId;
	
	var flag = 0;
	
	vm.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response2){
		
		
		vm.companyDrop = response2;
		
		//Set default Company
		apiCall.getDefaultCompany().then(function(response){
			
			$scope.showStaff.companyDropDown = response;
			
			var headerDataOnLoad = {'Content-Type': undefined,'companyId':response.companyId};
			
			apiCall.getCallHeader(apiPath.getAllStaff,headerDataOnLoad).then(function(response){
		
				console.log(response);
				if(apiResponse.noContent == response){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Staff Available');
					// vm.tableParams.reload();
					  // vm.tableParams.page(1);
					
				}
				else{
					
					data = response;
				
					for (var i = 0; i < data.length; i++) {
					  data[i].cityName = ""; //initialization of new property 
					  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
					}
					
					 
					 
					 
				}
				flag = 1;
				$scope.TableData();
				
			});
	
	
			vm.branchDrop = [];
			var getAllBranch = apiPath.getOneBranch+response.companyId;
			//Get Branch
			apiCall.getCall(getAllBranch).then(function(response4){
				
				vm.branchDrop = response4;
					
			});
		});
		
		
	});
	
	//Change Branch On Select Company
	$scope.changeCompany = function(state)
	{
		 vm.branchDrop = [];
		var getAllBranch = apiPath.getOneBranch+state;
		//Get Branch
		apiCall.getCall(getAllBranch).then(function(response4){
			vm.branchDrop = response4;
				
		});
	}
	
	$scope.showFilterStaff = function(){
		
		var headerData = {'Content-Type': undefined};
		
		if($scope.showStaff.companyDropDown){
			
			headerData.companyId = $scope.showStaff.companyDropDown.companyId;
			
		}
		
		
		if($scope.showStaff.branchDropDown){
			
			headerData.branchId = $scope.showStaff.branchDropDown.branchId;
		}
	
		
			
			apiCall.getCallHeader(apiPath.getAllStaff,headerData).then(function(response){
		
				console.log(response);
				if(apiResponse.noContent == response){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Staff Available');
				}
				else{
					
					
					data = response;
			
					for (var i = 0; i < data.length; i++) {
					  data[i].cityName = ""; //initialization of new property 
					  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
					}
					
					
				}
				
				if(flag == 0){
					
					$scope.TableData();
					
					flag = 1;
				}
				else{
					
					vm.tableParams.reload();
					  vm.tableParams.page(1);
				}
				
				
			});
	
		
	}
  
  // SORTING
  // ----------------------------------- 
	$scope.branchF = [
	  {pop: "Branch1" },
	  {pop: "Branch2" }
	];
  
 
	
  
  //alert(branchF);
	$scope.TableData = function(){
		
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  userName: 'asc'     // initial sorting
		  }
	  }, {
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  
			  // use build-in angular filter
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.userType) != "undefined" && params.$params.filter.userName != "") || (typeof(params.$params.filter.userType) != "undefined" && params.$params.filter.userName != "") || (typeof(params.$params.filter.emailId) != "undefined" && params.$params.filter.emailId != "") || (typeof(params.$params.filter.address) != "undefined" && params.$params.filter.address != "") || (typeof(params.$params.filter.contactNo) != "undefined" && params.$params.filter.contactNo != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "")))
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
	}

  
  
	$scope.editStaff= function(id)
	{
		getSetFactory.set(id);
		$state.go("app.AddStaff");
	}
	  
	 $scope.deleteStaff = function(size,id)
	 {
		
		toaster.clear();
	
	var modalInstance = $modal.open({
		  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
		  controller: deleteDataModalController,
		  size: size
		});

	   
		modalInstance.result.then(function () {
		 
		 console.log('ok');
		 
		// return false;
		 /**Delete Code **/
			var deletePath = apiPath.getAllStaff+'/'+parseInt(id);
		  
		apiCall.deleteCall(deletePath).then(function(deleteres){
			
			console.log(deleteres);
			
			if(apiResponse.ok == deleteres){
					
				toaster.pop('success', 'Title', 'Delete Successfully');
				
				$scope.showFilterStaff();
			}
			else{
				
				toaster.pop('warning', 'Opps!!', deleteres);
			}
		 
		});
		 /** End **/
		
		}, function () {
		  console.log('Cancel');	
		});
		
		
	}

}
StaffController.$inject = ["$scope","$rootScope","$filter", "ngTableParams","apiCall","apiPath","$state","apiResponse","toaster","getSetFactory","$modal"];