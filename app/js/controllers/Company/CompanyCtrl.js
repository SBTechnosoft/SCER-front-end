
/**=========================================================
 * Module: CompanyController.js
 * Controller for ngTables
 =========================================================*/

App.controller('CompanyController', CompanyController);

function CompanyController($rootScope,$scope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster,$modal,getSetFactory) {
  'use strict';
  var vm = this;
   var formdata = new FormData();
   
   $scope.companyradio='ok';
	 var Modalopened = false;
	 
	 $scope.erpPath = $rootScope.erpPath; // Erp Path
	 
  //Go To AddCompany
	$scope.GoToAddCompany = function(){
	  
	 $rootScope.AddCompanyModify = false;
	 $location.path('app/AddCompany'); 
	 
	}
	
	
	
	var data = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(response){
		
		if(apiResponse.noContent == response || apiResponse.notFound == response){
				
			data = [];
			 toaster.pop('info', '', 'Data Not Available');
		}
		else{
			
			data = response;
			for (var i = 0; i < data.length; i++) {
			  data[i].cityName = ""; //initialization of new property 
			  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
			}
			
		}
		$scope.TableData();
	});
	
	//ajaxCall.abort();
 
 
	$scope.getAllCompanyFunction = function(){
		
		apiCall.getCall(apiPath.getAllCompany).then(function(response){
			
			if(apiResponse.noContent == response || apiResponse.notFound == response){
				
				data = [];
				toaster.pop('info', '', 'Data Not Available');
			}
			else{
				
				data = [];
				data = response;
				for (var i = 0; i < data.length; i++) {
				  data[i].cityName = ""; //initialization of new property 
				  data[i].cityName = data[i].city.cityName;  //set the data from nested obj into new property
				}
				
			}			
			
			vm.tableParams.reload();
		});
	}
	
	$scope.TableData = function()
	{
		
		
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  companyName: 'asc'     // initial sorting
		  }
	  }, {
		   counts: [],
		  total: data.length, // length of data
		  getData: function($defer, params) {
			  
			  // use build-in angular filter
			   if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.companyName) != "undefined" && params.$params.filter.companyName != "")  || (typeof(params.$params.filter.address1) != "undefined" && params.$params.filter.address1 != "") || (typeof(params.$params.filter.address2) != "undefined" && params.$params.filter.address2 != "") || (typeof(params.$params.filter.pincode) != "undefined" && params.$params.filter.pincode != "") || (typeof(params.$params.filter.cityName) != "undefined" && params.$params.filter.cityName != "")))
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
			$scope.totalData = data.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
		  }
	  });
	}

  
  $scope.isDefault_comp = function(id,companyStatus)
  {
	
	  toaster.clear();
	  
	  if(companyStatus == 'not'){
		  
	 
			formdata.append('isDefault','ok');
			var editCompany2 = apiPath.getAllCompany+'/'+id;
			
			apiCall.postCall(editCompany2,formdata).then(function(response5){
			
				console.log(response5);
				
				//$location.path('app/Company');
				if(apiResponse.ok == response5){
					
					toaster.pop('success', '', 'Default Company Successfully Changed');
					
					$scope.getAllCompanyFunction();
				}
				else{
					
					toaster.pop('warning', 'Opps!!', response5);
				}
				
				formdata.delete('isDefault');
				
			});
	  }
	  else{
		  
		  toaster.pop('info', '', 'Company Already Seleted');
	  }
  }
  
  $scope.edit_comp = function(id)
  {
	  getSetFactory.set(id);
	  $location.path('app/AddCompany');
	  $rootScope.AddCompanyModify = true;
  }
  
  $scope.delete_comp = function(size,id)
  {
	  //alert(id);
	  if (Modalopened) return;
	  //return false;
	  
		var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/Delete/deleteDataModal.html',
			  controller: deleteDataModalController,
			  size: size
			});

		 Modalopened = true;
		 
		modalInstance.result.then(function () {
		 
		
		 toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Company Deleting....',60000);
		// return false;
		 /**Delete Code **/
			var deletePath = apiPath.getAllCompany+'/'+id;
	  
			apiCall.deleteCall(deletePath).then(function(deleteres){
				
				 toaster.clear();
				if(apiResponse.ok == deleteres){
						
					toaster.pop('success', 'Title', 'Delete Successfully');
					
					$scope.getAllCompanyFunction();
				}
				else{
					
					toaster.pop('warning', 'Opps!!', deleteres);
				}
			 
			});
		 /** End **/
			 Modalopened = false;
			 
		}, function () {
			
			console.log('Cancel');	
			toaster.clear();
		    Modalopened = false;
			
		});
		
	
  }

}
CompanyController.$inject = ["$rootScope","$scope", "$filter","ngTableParams","apiCall","apiPath","$location","apiResponse","toaster","$modal","getSetFactory"];