
/**=========================================================
 * Module: InvStockCtrl.js
 * Controller for ngTables
 =========================================================*/


App.controller('InvStockController', InvStockController);

function InvStockController($rootScope,$scope, $filter, ngTableParams,getSetFactory,apiCall,apiPath,$window,apiResponse,toaster) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	 var erpPath = $rootScope.erpPath; //Erp Path
	 var flag = 0;
	 $scope.AllTransactionData;
	 vm.tableParams;
	$scope.getArray;
	var data = [];
	var getData = getSetFactory.get();
	//console.log(getData);
	//return false;
	
	//var getData = { "Content-Type": undefined, "fromDate": "1-02-2017", "toDate": "25-02-2017", "companyId": "45", "productId": "1108" };
	// var getData = { "Content-Type": undefined, "fromDate": "1-02-2017", "toDate": "25-02-2017", "companyId": "45"};
	//var CompanyID = getData.companyId;
	
	$scope.displayFromDate = getData.fromDate;
	$scope.displayToDate = getData.toDate;
	
	var CompanyID = getData.companyId;
	
	delete getData.companyId;
	
	
	var dataSet = angular.copy(getData);
	vm.states = [];
	
	if(dataSet.productId){
		
		var Path = apiPath.getAllProduct+'/'+dataSet.productId;
		
		apiCall.getCall(Path).then(function(response){
			
		//console.log(response);
		vm.states.push(response);
		$scope.allProductModel = response;
		console.log(vm.states);
		$scope.displayCompany = response.company.companyName;
			
		});
	}
	else{
		
		var Path = apiPath.getProductByCompany+CompanyID;
		
		apiCall.getCallHeader(Path,dataSet).then(function(response){
			
		console.log(response);
			vm.states = response;
			
			$scope.allProductModel = response[0];
			
			console.log(vm.states);
			$scope.displayCompany = response[0].company.companyName;
			
		});
	}
	 
	 
	$scope.showProduct = function(){
		
		toaster.clear();
		
		
		var subFlag = 0;
		//alert($scope.allProductModel.productId);
		data = [];
		var productLength = $scope.AllTransactionData.length;
		for(var allProductIndex=0;allProductIndex<productLength;allProductIndex++){
			
			var singleProductArray = $scope.AllTransactionData[allProductIndex];
			
		
			if(singleProductArray.length != 0){
				
				if(singleProductArray[0].product.productId == $scope.allProductModel.productId)
				{
					subFlag = 1;
					var singleTransactionDataDrop = singleProductArray;
					
					//$scope.allProductModel = singleProductArray[0].product;
					
					//console.log(singleTransactionData);
					$scope.calculation(singleTransactionDataDrop);
					
					break;
					
				}
			}
			
		}
		
		if(subFlag == 0){
			
			toaster.pop('info', 'Message', 'No Data Found');
			vm.tableParams.reload();
			vm.tableParams.total(data.length);
			 vm.tableParams.page(1);
			
		}
		
	}
	
	
	
	
	apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID+'/transaction',getData).then(function(responseDrop){
		
		console.log(responseDrop);
			
			if(apiResponse.noContent == responseDrop || responseDrop == ""){
				
				toaster.pop('info', 'Message', 'No Data Found');
			
			}
			else if(apiResponse.contentNotProper == responseDrop){
				
				toaster.pop('info', 'Message', 'Please Fill Go to Search');
				
			}
			else{
				
				$scope.AllTransactionData = responseDrop;
				
				if(responseDrop[0].length != 0){
					
					var singleTransactionData = responseDrop[0];
					$scope.calculation(singleTransactionData);
					
				}
				else{
					
					toaster.pop('info', 'Message', 'No Data Found');
				}
				
				
				
				
			}
		
	});
	
	getSetFactory.blank();
 
	$scope.calculation = function(responseDrop){
		
		console.log('in');
		var balance = [];
		var balanceArray = [];
		
		for(var i=0;i<responseDrop.length;i++)
		{
			var inward = {};
			var outward = {};
			
		
			var transData = responseDrop[i];
			
			if(transData.transactionType == 'Inward'){
				
				if(balanceArray.length == 0){
					
					
				
				
					inward.qty = parseInt(transData.qty);
					inward.price = transData.price * transData.qty;
					inward.date = transData.transactionDate;
					
					balanceArray.push(inward);
				}
				else{
					 
					if(balanceArray[0].qty < 0)
					{	
						var outward1 = {};
						outward1.qty = 0;  //4
						outward1.date = transData.transactionDate;
				
						inward.qty = parseInt(transData.qty);
						
						var balanceLength = balanceArray.length;
						var index=0;
						for(var j=0;j<balanceLength;j++)
						{
							var diff = inward.qty + balanceArray[index].qty;
							
							if(diff==0 || diff>0)
							{
								inward.qty = diff;
								
								if(j == (balanceLength - 1) && inward.qty > 0)
								{
									balanceArray[0] = inward;
								}
								else{
									
									balanceArray.splice(index,1);
								
								}
								
							}
							else if(diff<0)
							{
								//var purchasePrice=balanceArray[index].price/balanceArray[index].qty;
								outward1.qty = balanceArray[index].qty + inward.qty;
								outward1.price = 1000;
								var demo = {};
								demo = angular.copy(outward1);
								balanceArray[index] = demo;
								inward.qty = 0;
								index++;
							}
							else
							{
								
							}
							
						}
					}
					else{
						
						inward.qty = parseInt(transData.qty);
						inward.price = transData.price * transData.qty;
						inward.date = transData.transactionDate;
						
						balanceArray.push(inward);
					}
				}
				
			}
			else if(transData.transactionType == 'Outward')
			{	
				var outward1 = {};
				outward1.qty = 0;  //4
				outward1.price = transData.price;
				outward1.date = transData.transactionDate;
				
				//console.log(transData.qty);
				//console.log(balanceArray);
				
				outward.qty = parseInt(transData.qty);  //4
				outward.price = transData.price;
				outward.date = transData.transactionDate;
				
				//console.log(balanceArray);
				if(balanceArray.length == 0){
					
					
					var minusObject = {};
					minusObject.qty = -Math.abs(transData.qty);  //4
					minusObject.price = transData.price;
					minusObject.date = transData.transactionDate;
				
					balanceArray.push(minusObject);
				
				}
				else{
					
				
					if(balanceArray[0].qty > outward.qty)
					{
						var purchasePrice=balanceArray[0].price/balanceArray[0].qty;
						outward.qty = balanceArray[0].qty - outward.qty;
						outward.price = outward.qty * purchasePrice;
						balanceArray[0] = outward;
					}
					else if(balanceArray[0].qty == outward.qty)
					{
						balanceArray.splice(0,1);
					}
					else if(balanceArray[0].qty < outward.qty)
					{
						
						if(balanceArray[0].qty < 0){
							
							var minusObject = {};
							minusObject.qty = -Math.abs(outward.qty);  //4
							minusObject.price = outward.price;
							minusObject.date = outward.transactionDate;
						
							balanceArray.push(minusObject);
							
						}
						else{
							
							var balanceLength = balanceArray.length;
							var index=0;
							for(var j=0;j<balanceLength;j++)
							{
						
								var diff = outward.qty - balanceArray[index].qty;
								if(diff==0 || diff>0)
								{
									outward.qty = diff;
									
									if(j == (balanceLength - 1) && outward.qty > 0)
									{
											outward1.qty =  -Math.abs(outward.qty);
										balanceArray[0] = outward1;
									}
									else{
										
										balanceArray.splice(index,1);
									
									}
								
								}
								else if(diff<0)
								{
									var purchasePrice=balanceArray[index].price/balanceArray[index].qty;
									outward1.qty = balanceArray[index].qty - outward.qty;
									outward1.price = outward1.qty * purchasePrice;
									var demo = {};
									demo = angular.copy(outward1);
									balanceArray[index] = demo;
									outward.qty = 0;
									index++;
								}
								else
								{
									
								}
							}
						}
						
					}
				}
				 
			}
	
			 balance[i] = balanceArray.slice(0);
			
			 responseDrop[i]["balance"] = balance[i];
		}
		
		
		
		
		if(flag == 0){
			
			$scope.contents = responseDrop;
			
			$scope.contents.sort(function(a, b){
				
				var entDate = a.transactionDate.split("-").reverse().join("-");
							var toDate = b.transactionDate.split("-").reverse().join("-");
							var dateA=new Date(entDate), dateB=new Date(toDate);
							
				//var dateA=new Date(a.transactionDate), dateB=new Date(b.transactionDate);
				return dateB-dateA; 
			});
			
			data= $scope.contents;
			
			console.log('if');
			$scope.TableData();
			flag = 1;
		}
		else{
			
			data= responseDrop;
			console.log('else');
			vm.tableParams.reload();
			vm.tableParams.total(data.length);
			 vm.tableParams.page(1);
		}
		
		//$scope.getArray = $scope.contents; // CSV Export
		
		//$scope.getArray = data;
	}
 
 
$scope.TableData = function(){
	

  vm.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
          date: 'asc'     // initial sorting
      }
  }, {
      total: data.length,
      getData: function($defer, params) {
          
        var orderedData;

        if(params.sorting().date === 'asc'){

          data.sort(function (a, b) {
			  var entDate = a.transactionDate.split("-").reverse().join("-");
						var toDate = b.transactionDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
         // var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB; //sort by date descending
          });
          orderedData = data;

        } else if(params.sorting().date === 'desc') {

          data.sort(function (a, b) {
			  var entDate = a.transactionDate.split("-").reverse().join("-");
						var toDate = b.transactionDate.split("-").reverse().join("-");
						var dateA=new Date(entDate), dateB=new Date(toDate);
          //var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA; //sort by date descending
          });
          orderedData = data;

        } else if(!params.sorting().date){

          if (params.filter().term) {
            orderedData = params.filter() ? $filter('filter')(data, params.filter().term) : data;
          } else {
            orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
          }
          
        }

        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		
		 $scope.totalData = data.length;
		$scope.pageNumber = params.page();
		$scope.itemsPerPage = params.count();
		$scope.totalPages = Math.ceil($scope.totalData/params.count());
        
      }
  });

  //$scope.getArray = data;
}

  
  
  $scope.edit_comp = function()
  {
	  alert('Edit');
  }
  
  $scope.delete_comp = function()
  {
	  alert('Delete');
  }
  
	$scope.generatePdf = function(){
	 
		getData.operation = 'pdf';
		delete getData.authenticationToken;
		
		getData.productId = $scope.allProductModel.productId;
		console.log(getData);
		//return false;
		apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID+'/transaction/details',getData).then(function(responseDrop){
		
			console.log(responseDrop);
			
			if(angular.isObject(responseDrop)){
				
				var pdfPath = erpPath+responseDrop.documentPath;
				$window.open(pdfPath, '_blank');
			}
			else{
				
				toaster.clear();
				toaster.pop('warning', 'Opps!!', responseDrop);
			}
		
		});
	}

}
InvStockController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","getSetFactory","apiCall","apiPath","$window","apiResponse","toaster"];