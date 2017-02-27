
/**=========================================================
 * Module: InvStockCtrl.js
 * Controller for ngTables
 =========================================================*/
	
App.controller('PriceListRetailSalesController', PriceListRetailSalesController);

function PriceListRetailSalesController($rootScope,$scope, $filter, ngTableParams,getSetFactory,apiCall,apiPath,saleType,$window,productArrayFactory,toaster,apiResponse) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	 var erpPath = $rootScope.erpPath; //Erp Path
	 
	$scope.saleType = saleType;
	
 var data = [];
 
	var getData = getSetFactory.get();
	console.log(getData);
	// return false;
	
	//var getData = { "Content-Type": undefined, "fromDate": "14-01-2017", "toDate": "30-03-2017", "companyId": "46", "productId": "908" };
	//var CompanyID = getData.companyId;
	
	
	
	var CompanyID = getData.companyId;
	
	var noOfDecimalPoints = parseInt(getData.noOfDecimalPoints);
	
	delete getData.companyId;
	delete getData.noOfDecimalPoints;
	
	
	/*****  Tree Data  *****/
	
	
	var tree;
	
	
	var rawTreeData2=[{"categoryId":"","productParentCategoryId":"","categoryName":"","productName":"","groupName":"","price":"","vat":"","amount":""}];

        var myTreeData = getTree(rawTreeData2, 'categoryId', 'productParentCategoryId');
		$scope.tree_data = myTreeData;
        $scope.my_tree = tree = {};
		
	 $scope.expanding_property = {
            field: "categoryName",
            displayName: "Category Name",
            sortable: false,
            filterable: false,
            cellTemplate: "<i>{{row.branch[expandingProperty.field]}}</i>"
        };
		
        $scope.col_defs = [
			{
                field: "groupName",
				displayName: "Group Name"
            },
			{
                field: "price",
				displayName: "Price"
            },
			{
                field: "vat",
				displayName: "Vat"
            },
			{
                field: "amount",
				displayName: "Amount"
            }
        ];
	
	/*****  End   *****/
	
	
	
	var treeArrayData = [];
	
	apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID,getData).then(function(responseDrop){
		
		
		console.log(responseDrop);
		if(apiResponse.notFound == responseDrop){
				
			toaster.pop('info', 'Message', 'No Data Found Go To Search');
		
		}
		else{

			$scope.displayCompany = responseDrop[0].company.companyName;
			
			var cnt= responseDrop.length;
			var categoryArray = [];
			var csvArray = [];
			
			for(var i=0;i<cnt;i++){
				
				var objectData = {};
				var flag=0;
				var apiData = responseDrop[i];
				
				if($scope.saleType == "retail_sales"){
						
					var purchaseprice =  $filter('setDecimal')(productArrayFactory.calculate(apiData.purchasePrice,0,apiData.margin) + parseFloat(apiData.marginFlat),noOfDecimalPoints);
					
					if(purchaseprice == 0){
			
						purchaseprice =  $filter('setDecimal')(productArrayFactory.calculate(apiData.mrp,0,apiData.margin) + parseFloat(apiData.marginFlat),noOfDecimalPoints);
					}
					
					var vat =  $filter('setDecimal')(productArrayFactory.calculateTax(purchaseprice,apiData.vat,0),noOfDecimalPoints);
					
					var finalAmount =  $filter('setDecimal')(productArrayFactory.calculate(purchaseprice,apiData.vat,0),noOfDecimalPoints);
					
				}
				else if($scope.saleType == "whole_sales"){
					
					var purchaseprice = $filter('setDecimal')(productArrayFactory.calculate(apiData.purchasePrice,0,apiData.wholesaleMargin) + parseFloat(apiData.wholesaleMarginFlat),noOfDecimalPoints);
					
					//var vat =0;
					var vat =  $filter('setDecimal')(productArrayFactory.calculateTax(purchaseprice,apiData.vat,0),noOfDecimalPoints);
					
					var finalAmount =  $filter('setDecimal')(productArrayFactory.calculate(purchaseprice,apiData.vat,0),noOfDecimalPoints);
				}
					
				
				for(var arrayData=0;arrayData<categoryArray.length;arrayData++)
				{
					
					
					
					if(apiData.productCategory.productCategoryId == categoryArray[arrayData])
					{
						flag=1;
						
						objectData.categoryId = Math.random();
						objectData.productParentCategoryId = apiData.productCategory.productCategoryId;
						objectData.categoryName =  apiData.productName;
						
						objectData.groupName = apiData.productGroup.productGroupName;
						
						objectData.price = purchaseprice;
						objectData.vat = vat;
						objectData.amount = finalAmount;
						
						treeArrayData.push(objectData);
					
						break;
					}
				}
				if(flag==0)
				{
					categoryArray.push(apiData.productCategory.productCategoryId);
					
					
					
					
					var demo = {};
					demo.categoryId = apiData.productCategory.productCategoryId;
					demo.categoryName = apiData.productCategory.productCategoryName;
					demo.productParentCategoryId = apiData.productCategory.productParentCategoryId;
					treeArrayData.push(demo);
					
					objectData.categoryId = Math.random();
					objectData.productParentCategoryId = apiData.productCategory.productCategoryId;
					objectData.categoryName = apiData.productName;
					
					objectData.groupName = apiData.productGroup.productGroupName;
					
					objectData.price = purchaseprice;
					objectData.vat = vat;
					objectData.amount = finalAmount;
					
					treeArrayData.push(objectData);
				}
				
				/** CSV Data **/
				
				var csvObject = {};
				
				
				
				csvObject.productName = apiData.productName;
				csvObject.categoryName = apiData.productCategory.productCategoryName;
				csvObject.groupName = apiData.productGroup.productGroupName;
				
				csvObject.price = purchaseprice;
				csvObject.vat = vat;
				csvObject.amount = finalAmount;
				
				csvArray.push(csvObject);
				
				/** End **/
			
			}
			
			// console.log(categoryArray);
			console.log(treeArrayData);
			
			$scope.getArray = csvArray;
			
			var myTreeData2 = getTree(treeArrayData, 'categoryId', 'productParentCategoryId');
					$scope.tree_data = myTreeData2;
			
			
				
				
			//data = responseDrop;
			
			//$scope.TableData();
		}
	});
	
	getSetFactory.blank();
 
	

  // SORTING
  // ----------------------------------- 

  // var data = [
      // {name: "Product1",  category: "Glass", group: "Cup"  },
	  // {name: "Product2",  category: "Glass", group: "Cup" },
	  // {name: "Product3",  category: "Glass", group: "Cup" },
	  // {name: "Product4",  category: "Glass", group: "Cup" },
	  // {name: "Product5",  category: "Glass", group: "Cup" },
	  // {name: "Product6",  category: "Glass", group: "Cup" },
	  // {name: "Product7",  category: "Glass", group: "Cup"},
	  // {name: "Product8",  category: "Glass", group: "Cup"},
	  // {name: "Product9",  category: "Glass", group: "Cup" },
	  // {name: "Product10",  category: "Glass", group: "Cup" },
	  // {name: "Product11",  category: "Glass", group: "Cup" },
	  // {name: "Product12",  category: "Glass", group: "Cup" }
      
  // ];
  
	$scope.TableData = function(){
	
		vm.tableParams = new ngTableParams({
			  page: 1,            // show first page
			  count: 10,          // count per page
			  sorting: {
				  productName: 'asc'     // initial sorting
			  }
		  },{
			  total: data.length, // length of data
			  getData: function($defer, params) {
				 
				  if(!$.isEmptyObject(params.$params.filter) && ((typeof(params.$params.filter.productName) != "undefined" && params.$params.filter.productName != "")  || (typeof(params.$params.filter.retailPrice) != "undefined" && params.$params.filter.retailPrice != "") || (typeof(params.$params.filter.vat) != "undefined" && params.$params.filter.vat != "") || (typeof(params.$params.filter.finalAmount) != "undefined" && params.$params.filter.finalAmount != "") ))
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
  
	$scope.generatePdf = function(){
	 
		getData.operation = 'pdf';
		getData.salesType = $scope.saleType;
		
		apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID+'/priceList',getData).then(function(responseDrop){
		
			console.log(responseDrop);
			
			if(angular.isObject(responseDrop)){
				
				var pdfPath = erpPath+responseDrop.documentPath;
				$window.open(pdfPath, '_blank');
			}
			else{
				
				alert('Something Wrong');
			}
		
		});
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
PriceListRetailSalesController.$inject = ["$rootScope","$scope", "$filter", "ngTableParams","getSetFactory","apiCall","apiPath","saleType","$window","productArrayFactory","toaster","apiResponse"];