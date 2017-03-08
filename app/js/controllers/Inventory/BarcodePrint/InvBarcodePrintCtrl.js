
/**=========================================================
 * Module: BranchCtrl.js
 * Controller for ngTables
 =========================================================*/

App.controller('InvBarcodePrintController', InvBarcodePrintController);

function InvBarcodePrintController($scope,$rootScope, $filter, ngTableParams,apiCall,apiPath,$location,apiResponse,toaster,getSetFactory,$modal) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";

  var data = [];
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
			
			apiCall.getCall(apiPath.getAllProduct).then(function(response){
				
				if(apiResponse.noContent == response){
					
					data = [];
					toaster.pop('alert', 'Opps!!', 'No Product Available');
					
				}
				else{
					
					data = response;
					for (var i = 0; i < data.length; i++) {
					  data[i].productCategoryName = ""; //initialization of new property 
					  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
					  data[i].productGroupName = ""; //initialization of new property 
					  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
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
		toaster.pop('wait', 'Please Wait', 'Data Loading....');
			
		apiCall.getCall(apiPath.getProductByCompany+id+'/branch').then(function(response){
			
			toaster.clear();
			
			if(apiResponse.noContent == response){
					
				data = [];
				toaster.pop('alert', 'Opps!!', 'No Product Available');
				
			}
			else{
				//console.log('else');
				data = response;
				for (var i = 0; i < data.length; i++) {
				  data[i].productCategoryName = ""; //initialization of new property 
				  data[i].productCategoryName = data[i].productCategory.productCategoryName;  //set the data from nested obj into new property
				  data[i].productGroupName = ""; //initialization of new property 
				  data[i].productGroupName = data[i].productGroup.productGroupName;  //set the data from nested obj into new property
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
	
	$scope.TableData = function(){
		 
	  vm.tableParams = new ngTableParams({
		  page: 1,            // show first page
		  count: 10,          // count per page
		  sorting: {
			  productCategoryName: 'asc'     // initial sorting
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
			  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.productCategoryName) != "undefined" && params.$params.filter.productCategoryName != "") || (typeof(params.$params.filter.productGroupName) != "undefined" && params.$params.filter.productGroupName != "") || (typeof(params.$params.filter.color) != "undefined" && params.$params.filter.color != "") || (typeof(params.$params.filter.size) != "undefined" && params.$params.filter.size != "") ))
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
			
			$scope.totalData = data.length;
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
		
		console.log(box+'...'+pData);
		if(box == true){
			
			$scope.selectedBoxArray.push(pData);
			
		}
		else{
			
			var index = $scope.selectedBoxArray.indexOf(pData);
			$scope.selectedBoxArray.splice(index,1);
		}
	
		console.log($scope.selectedBoxArray);
	}
	
	$scope.changeAllBox = function(box){
		
		if(box == false){
			
			var count = data.length;
			$scope.barcodeFlag=0;
			
			for(var sat=0;sat<count;sat++){
				
				var dataSet = data[sat];
				
				dataSet.selected = false;
				
			}
			
			$scope.selectedBoxArray = [];
			
		}
		else{
			
			$scope.barcodeFlag=1;
			
		}
		
	}
	
	$scope.singleBarcodePrint = function(qty,pData){
		
		console.log(pData);
		
		var mywindow = window.open('', 'PRINT', 'height=1200,width=800');


        mywindow.document.write('<html><head><title>' + document.title  + '</title>');

        mywindow.document.write("</head><body style='height:29.7cm;width:21cm;'>");
		mywindow.document.write('<h1>' + document.title  + '</h1>');
		mywindow.document.write("<div style='width:100%;'><center>");
		
		for(var n=0;n<qty;n++){

			mywindow.document.write("<div style='position:relative;float:left; width: 50%;'> ");
			mywindow.document.write($scope.stateCheck.companyName+"<br /><embed type='image/svg+xml' src='"+$scope.erpPath+"Storage/Barcode/"+pData.documentName+"' />");
			mywindow.document.write("</div>");
		}
		
		mywindow.document.write("</div>");
		
		 mywindow.document.write('</body></html>');

      // mywindow.document.close(); // necessary for IE >= 10
		
       // mywindow.focus(); // necessary for IE >= 10*/
      // mywindow.print();
   //  mywindow.close();

        return true;
	  
	}
	
	$scope.multipleBarcodePrint = function(){
		
		
		console.log($scope.selectedBoxArray);
	
		
		var mywindow = window.open('', 'PRINT', 'height=1200,width=800');


        mywindow.document.write('<html><head><title>' + document.title  + '</title>');

        mywindow.document.write("</head><body style='height:29.7cm;width:21cm;'>");
		mywindow.document.write('<center> <h1> Barcode of ' +  $scope.selectedBoxArray[0].company.companyName + ' Company </h1> </center>');
		
		
		var dataArrayLength = $scope.selectedBoxArray.length;
		
		for(var dataIndex=0;dataIndex<dataArrayLength;dataIndex++){
			
			mywindow.document.write("<table style='width:100%;margin: 0 auto;'>");
			
			var arrayProductData = $scope.selectedBoxArray[dataIndex];
			mywindow.document.write("<tr><td colspan='2' style='text-align:center;'><h2><h2>" + arrayProductData.productName +' ('+ arrayProductData.color +' | '+ arrayProductData.size + ") </h2> </h2> </td></tr> 	<tr>");
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
		}
		
		
		
		 mywindow.document.write('</body></html>');

		  mywindow.document.close(); // necessary for IE >= 10
			
		    mywindow.focus(); // necessary for IE >= 10*/
		  mywindow.print();
	    mywindow.close();

        return true;
		
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
		
		console.log($scope.hideQtyArray);
	}
  
  /** Barcode **/
  
	$scope.barcodePopup = function(size,id,pName,pColor,pSize)
	{
		//alert(id);
		
		//return false;
		toaster.clear();
		
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

		   
		modalInstance.result.then(function () {
		 
		 console.log('ok');
		
		}, function () {
		  console.log('Cancel');	
		});
			
			
	}
  
  /** End **/

}
InvBarcodePrintController.$inject = ["$scope","$rootScope","$filter", "ngTableParams","apiCall","apiPath","$location","apiResponse","toaster","getSetFactory","$modal"];