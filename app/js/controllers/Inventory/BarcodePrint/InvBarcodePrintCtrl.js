
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvBarcodePrintController', InvBarcodePrintController);

function InvBarcodePrintController($scope,$rootScope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster,getSetFactory,$modal,productFactory) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	var Modalopened = false;

   $scope.completedQueries = [];
  $scope.erpPath = $rootScope.erpPath; // Erp Path
  
	var flag = 0;
	$scope.filteredItems;
	
	$scope.barcodePrintData = [];
	
	$scope.CheckBox = "<div data-toggle='tooltip' data-title='Check All' class='checkbox c-checkbox'><label><input type='checkbox' checked='true' /><span class='fa fa-check'></span></label></div>";
	
	$scope.showProduct = function(){
		
		$scope.selectedBoxArray = []; //Selected Checkbox Array Null
		
		if($scope.stateCheck){
			
			flag = 1;
			$scope.getProduct($scope.stateCheck.companyId);
			
			
		}
		else{
			
			toaster.clear();
			toaster.pop('wait', 'Please Wait', 'Data Loading....',10000);
		
			//apiCall.getCall(apiPath.getAllProduct).then(function(response){
			productFactory.getProduct().then(function(response){
				
				toaster.clear();
				
				if(apiResponse.noContent == response){
					
					  $scope.completedQueries = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
					
				}
				else{
					
					  $scope.completedQueries = response;
					for (var i = 0; i <$scope.completedQueries.length; i++) {
					    $scope.completedQueries[i].productCategoryName = ""; //initialization of new property 
					    $scope.completedQueries[i].productCategoryName =   $scope.completedQueries[i].productCategory.productCategoryName;  //set the   $scope.completedQueries from nested obj into new property
					    $scope.completedQueries[i].productGroupName = ""; //initialization of new property 
					    $scope.completedQueries[i].productGroupName =   $scope.completedQueries[i].productGroup.productGroupName;  //set the   $scope.completedQueries from nested obj into new property
					}
					
					
				}
				
				 vm.tableParams.reload();
				  vm.tableParams.page(1);
				
			});
			
			
		}
		
		
	}
	
	$scope.init = function (){
			
		vm.states=[];
		apiCall.getCall(apiPath.getAllCompany).then(function(response2){
			
			vm.states = response2;
			
			//Set default Company
			apiCall.getDefaultCompany().then(function(response){
				
				$scope.stateCheck = response;
				
				$scope.getProduct(response.companyId);
				
			});
		 
		});
		 
	}
	$scope.init();
	
	$scope.getProduct = function(id){
		
		toaster.clear();
		toaster.pop('wait', 'Please Wait', 'Data Loading....',10000);
			
		//apiCall.getCall(apiPath.getProductByCompany+id+'/branch').then(function(response){
		productFactory.getProductByCompany(id).then(function(response){
			
			toaster.clear();
			
			if(apiResponse.noContent == response){
					
				  $scope.completedQueries = [];
				toaster.pop('alert', 'Opps!!', 'No Product Available');
				
			}
			else{
				//console.log('else');
				  $scope.completedQueries = response;
				for (var i = 0; i <$scope.completedQueries.length; i++) {
				    $scope.completedQueries[i].productCategoryName = ""; //initialization of new property 
				    $scope.completedQueries[i].productCategoryName =   $scope.completedQueries[i].productCategory.productCategoryName;  //set the   $scope.completedQueries from nested obj into new property
				    $scope.completedQueries[i].productGroupName = ""; //initialization of new property 
				    $scope.completedQueries[i].productGroupName =   $scope.completedQueries[i].productGroup.productGroupName;  //set the data from nested obj into new property
				}
				
				
			}
			
			if(flag == 0){
					
				//console.log('zero');
				$scope.TableData();
			}
			else{
				//console.log('one');
				 vm.tableParams.reload();
				 vm.tableParams.page(1);
			}
			
			 
		});
	}
	
	$scope.query = {
			productCategoryName: undefined,
			productGroupName: undefined,
			productName: undefined,
			color: undefined,
			size: undefined
		};
	
	$scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  filter: $scope.query
		  // sorting: {
			  // productCategoryName: 'asc'     // initial sorting
		  // }
	  }, {
		  counts: [],
		  total:   $scope.completedQueries.length, // length of data
		  getData: function($defer, params) {
			 
			  // if()
			  // {
				  // alert('yes');
			  // }
			  // else{
				  // alert('no');
			  // }
			  // use build-in angular filter
			  // if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.color) != "undefined" && params.$params.filter.color != "") || (typeof(params.$params.filter.size) != "undefined" && params.$params.filter.size != "") ))
			  // {
					 // var orderedData = params.filter() ?
					 // $filter('filter')(data, params.filter()) :
					 // data;

					  // vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

					  // params.total(orderedData.length); // set total for recalc pagination
					  // $defer.resolve(vm.users);
			  

			  // }
			// else
			// {
				   // params.total(data.length);
				  
			// }
			 
			 // if(!$.isEmptyObject(params.$params.sorting))
			  // {
				
				// alert('ggg');
				  // var orderedData = params.sorting() ?
						  // $filter('orderBy')(data, params.orderBy()) :
						  // data;
		  
				  // $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			  // }
			
			var orderedData = params.sorting() ?
                    $filter('orderBy')($scope.completedQueries, params.orderBy()) :
                    data;
			orderedData	= $filter('filter')(orderedData, params.filter());
            
			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(),
					                                     params.page() * params.count()));
														 
			$scope.totalData =   $scope.completedQueries.length;
			$scope.pageNumber = params.page();
            $scope.itemsPerPage = params.count();
            $scope.totalPages = Math.ceil($scope.totalData/params.count());
			
		  }
	  });
	}
	$scope.parentCheckBox;
	$scope.selectedBoxArray = [];
	$scope.barcodeFlag = 0;
	
	$scope.changeBox = function(box,pData){
		
		//console.log(box+'...'+pData);
		if(box == true){
			
			$scope.selectedBoxArray.push(pData);
			
		}
		else{
			
			var index = $scope.selectedBoxArray.indexOf(pData);
			$scope.selectedBoxArray.splice(index,1);
		}
	
		//console.log($scope.selectedBoxArray);
	}
	
	$scope.changeAllBox = function(box){
		
		if(box == false){
			
			var count =   $scope.completedQueries.length;
			$scope.barcodeFlag=0;
			
			for(var sat=0;sat<count;sat++){
				
				var dataSet =   $scope.completedQueries[sat];
				
				dataSet.selected = false;
				
			}
			
			$scope.selectedBoxArray = [];
			
		}
		else{
			
			$scope.barcodeFlag=1;
			
		}
		
	}
	
	$scope.singleBarcodePrint = function(qty,pData){
	
		//console.log(pData);
		
		var mywindow = window.open('', 'PRINT', 'height=27cm,width=21cm');

		 var is_chrome = Boolean(mywindow.chrome);

        mywindow.document.write('<html><!--head><title>' + document.title  + '</title>');
		
        mywindow.document.write("</head--> <style type='text/css' media='print'>@page {size: auto;margin: 0mm;} body {background-color:#FFFFFF;margin: 0px; }</style><body>");
		mywindow.document.write('<!--center> <h1> Barcode of ' +  pData.company.companyName + ' Company </h1> </center-->');
		mywindow.document.write("<table style='width:100%;margin: 0 auto;'>");
		mywindow.document.write("<tr><td colspan='2' style='text-align:center;'><!--h2>" + pData.productName +' ('+ pData.color +' | '+ pData.size + ") </h2--> </td></tr> 	<tr>");
		
		if(qty%2==0){
				
			var space = "";
		}
		else{
			
			var space = "<td></td>";
		}
			
		for(var n=0;n<qty;n++){

			mywindow.document.write("<td style='position:relative;float:left; width: 100%;padding-top: 26px ;padding-left:35px;display: inline-block;'> ");
			mywindow.document.write("<embed type='image/svg+xml' src='"+$scope.erpPath+"Storage/Barcode/"+pData.documentName+"' /> <br /> <span style='margin-left:70px'>"+pData.productName +" ("+ pData.color +" | "+ pData.size + ")</span>");
			
			if(n == qty-1){
				
				
				mywindow.document.write("</td> "+ space );
				
				/** Next Code **/
				
					mywindow.document.write("</tr></table>");
		
					mywindow.document.write('</body></html>');

					//mywindow.document.close(); // necessary for IE >= 10
					
					// mywindow.focus(); // necessary for IE >= 10*/
					// mywindow.print();
					// mywindow.close();
					
					if (is_chrome) {
						
					   setTimeout(function () { // wait until all resources loaded 
							mywindow.focus(); // necessary for IE >= 10
							mywindow.print();  // change window to mywindow
							mywindow.close();// change window to mywindow
						 }, 2000);
					}
					else {
						mywindow.document.close(); // necessary for IE >= 10
						mywindow.focus(); // necessary for IE >= 10
						mywindow.print();
						mywindow.close();
					}
				
					// pData.selected = false;
					
					// $scope.selectedBoxArray = [];	
					// $scope.barcodeFlag = 0;
					return true;
		
				/** End **/
			}
			else{
				mywindow.document.write("</td>");
			}
			// mywindow.document.write("<div style='position:relative;float:left; width: 50%;'> ");
			// mywindow.document.write($scope.stateCheck.companyName+"<br /><embed type='image/svg+xml' src='"+$scope.erpPath+"Storage/Barcode/"+pData.documentName+"' />");
			// mywindow.document.write("</div>");
		}
		
		
	  
	}
	
	$scope.multipleBarcodePrint = function(){
		
		
		// console.log($scope.selectedBoxArray);
		//console.log($scope.filteredItems);
	
		if($scope.barcodeFlag == 1){
			
				var dataArrayLength = $scope.filteredItems.length;
				
				var CompanyNamePrint = $scope.filteredItems[0].company.companyName;
				
		}
		else{
			
			var dataArrayLength = $scope.selectedBoxArray.length;
			
			var CompanyNamePrint = $scope.selectedBoxArray[0].company.companyName;
		}
		
		
		var mywindow = window.open('', 'PRINT', 'height=137,width=284');
	
		 var is_chrome = Boolean(mywindow.chrome);

        mywindow.document.write('<html><head><title>' + document.title  + '</title>');

        mywindow.document.write("</head><body style='height:29.7cm;width:21cm;'>");
		mywindow.document.write('<center> <h1> Barcode of ' + CompanyNamePrint  + ' Company </h1> </center>');
		
		
		
		
		
		for(var dataIndex=0;dataIndex<dataArrayLength;dataIndex++){
			
			mywindow.document.write("<table style='width:100%;margin: 0 auto;'>");
			
			if($scope.barcodeFlag == 1){
				
				var arrayProductData = $scope.filteredItems[dataIndex];
			}
			else{
				var arrayProductData = $scope.selectedBoxArray[dataIndex];
			 }
			
			
			mywindow.document.write("<tr><td colspan='2' style='text-align:center;'><h2>" + arrayProductData.productName +' ('+ arrayProductData.color +' | '+ arrayProductData.size + ") </h2> </td></tr> 	<tr>");
			
			if($scope.barcodePrintData.multiQuantity > 0){
				
				var qtyLength = $scope.barcodePrintData.multiQuantity;
			}
			else{
				var qtyLength = arrayProductData.barcodeQuantity;
			}
			
			
			if(qtyLength%2==0){
				
				var space = "";
			}
			else{
				
				var space = "<td></td>";
			}
			
			
			for(var qtyIndex=0;qtyIndex<qtyLength;qtyIndex++){
				
				
				
				mywindow.document.write("<td style='position:relative;float:left; width: 48%;padding-bottom:5px;display: inline-block;'> ");
				mywindow.document.write(arrayProductData.productName +" ("+ arrayProductData.color +" | "+ arrayProductData.size + ") <br /><embed type='image/svg+xml' src='"+$scope.erpPath+"Storage/Barcode/"+arrayProductData.documentName+"' />");
				
				if(qtyIndex == qtyLength-1){
					
					
					mywindow.document.write("</td> "+ space );
				}
				else{
					mywindow.document.write("</td>");
				}
				
			
			}
			mywindow.document.write("</tr></table>");
			
			if(dataIndex == dataArrayLength-1)
			{
				 mywindow.document.write('</body></html>');

				 // mywindow.document.close(); // necessary for IE >= 10
					
					
					if (is_chrome) {
					   setTimeout(function () { // wait until all resources loaded 
							mywindow.focus(); // necessary for IE >= 10
							mywindow.print();  // change window to mywindow
							mywindow.close();// change window to mywindow
						 }, 5000);
					}
					else {
						mywindow.document.close(); // necessary for IE >= 10
						mywindow.focus(); // necessary for IE >= 10
						mywindow.print();
						mywindow.close();
					}
			
			
					// mywindow.focus(); // necessary for IE >= 10*/
				  // mywindow.print();
				// mywindow.close();

				return true;
			}
		}
		
		
		
		
		
	}
	
	
	$scope.hideQtyArray = [];
	
	$scope.hideMiltiQuantity = function(qty,pId){
		
		$scope.hideQtyFlag = 0;
		
		if(qty > 0){
			
			// $scope.hideQtyFlag = 1;
			angular.forEach($scope.hideQtyArray, function (value) {
				
				if(value == pId){
					$scope.hideQtyFlag=1;
				}
			});
			
			if($scope.hideQtyFlag==0)
			{
				$scope.hideQtyArray.push(pId);
			}
			
		}
		else{
			
			// $scope.hideQtyFlag = 0;
			var index = $scope.hideQtyArray.indexOf(pId);
			$scope.hideQtyArray.splice(index,1);
		}
		
		//console.log($scope.hideQtyArray);
	}
  
  /** Barcode **/
  
	$scope.barcodePopup = function(size,id,pName,pColor,pSize)
	{
		//alert(id);
		
		//return false;
		toaster.clear();
		if (Modalopened) return;
		
		var modalInstance = $modal.open({
			  templateUrl: 'app/views/PopupModal/Inventory/productBarcodeModal.html',
			  controller: productBarcodeModalCtrl,
			  size: size,
			  resolve:{
				  productId: function(){
					 
					return id;
				  },
				  productName: function(){
					 
					return pName;
				  },
				  productColor: function(){
					 
					return pColor;
				  },
				  productSize: function(){
					 
					return pSize;
				  }
				  
			  }
			});

		   Modalopened = true;
		   
		modalInstance.result.then(function () {
		 
		 console.log('ok');
		  Modalopened = false;
		  
		
		}, function () {
		  console.log('Cancel');	
		   Modalopened = false;
		});
			
			
	}
  
  /** End **/

}
InvBarcodePrintController.$inject = ["$scope","$rootScope","$filter", "ngTableParams","apiCall","apiPath","$location","apiResponse","toaster","getSetFactory","$modal","productFactory"];