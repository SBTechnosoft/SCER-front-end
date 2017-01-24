
/**=========================================================
 * Module: InvStockCtrl.js
 * Controller for ngTables
 =========================================================*/
App.factory('tableCal', function() {
	
    return {
        calculate: function(index) {
			var row = {};
           
			
		
			return row;
        }
    };
});

App.controller('InvStockController', InvStockController);

function InvStockController($scope, $filter, ngTableParams,getSetFactory,apiCall,apiPath,tableCal) {
  'use strict';
  var vm = this;
	//$scope.brandradio="";
	
 var data = [];
	//var getData = getSetFactory.get();
	//console.log(getData);
	//return false;
	
	var getData = { "Content-Type": undefined, "fromDate": "14-01-2017", "toDate": "30-03-2017", "companyId": "46", "productId": "908" };
	//var CompanyID = getData.companyId;
	var CompanyID = getData.companyId;
	
	delete getData.companyId;
	
	
	
	apiCall.getCallHeader(apiPath.getProductByCompany+CompanyID+'/transaction',getData).then(function(responseDrop){
		
		
		$scope.calculation(responseDrop);
	
	});
	
	getSetFactory.blank();
 
	$scope.calculation = function(responseDrop){
		
		var finalData = [];
		var balance = [];
		var balanceArray = [];
		var array1 =[]
		
		for(var i=0;i<responseDrop.length;i++)
		{
			var inward = {};
			var outward = {};
			
		
			var transData = responseDrop[i];
			
			if(transData.transactionType == 'Inward'){
				
				
				inward.qty = parseInt(transData.qty);
				inward.price = transData.price * transData.qty;
				inward.date = transData.transactionDate;
				
				balanceArray.push(inward);
				
				
			}
			else if(transData.transactionType == 'Outward')
			{	
				var outward1 = {};
				outward1.qty = 0;  //4
				outward1.price = transData.price;
				outward1.date = transData.transactionDate;
				
				outward.qty = parseInt(transData.qty);  //4
				outward.price = transData.price;
				outward.date = transData.transactionDate;
				
				
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
					var balanceLength = balanceArray.length;
					var index=0;
					for(var j=0;j<balanceLength;j++)
					{
						var diff = outward.qty - balanceArray[index].qty;
						if(diff==0 || diff>0)
						{
							outward.qty = diff;
							balanceArray.splice(index,1);
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
	
			 balance[i] = balanceArray.slice(0);
			
			
			 responseDrop[i]["balance"] = balance[i];
		}
		
		
		$scope.contents = responseDrop;
		
		$scope.contents.sort(function(a, b){
			var dateA=new Date(a.transactionDate), dateB=new Date(b.transactionDate);
			return dateB-dateA; 
		});
		
		data= $scope.contents;
		$scope.TableData();
	}
 
 

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
          date: 'asc'     // initial sorting
      }
  }, {
      total: data.length,
      getData: function($defer, params) {
          
        var orderedData;

        if(params.sorting().date === 'asc'){

          data.sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB; //sort by date descending
          });
          orderedData = data;

        } else if(params.sorting().date === 'desc') {

          data.sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
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
        
      }
  });

}
	
	$scope.rowspan1;
	$scope.tableCal = tableCal;
	$scope.getRowspan = function(index){
		
		var row;
	
		if(index == 0){
			row = 1;
		}
		else{
			
			row = 2;
			
		}
		
		return row;
		
	}
	
	$scope.get = function(index){
		
		var row;
		
		if(index == 0){
			row = 1;
		}
		else{
			
			row = 2;
			
		}
		
		return row;
		
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
  
  $scope.edit_comp = function()
  {
	  alert('Edit');
  }
  
  $scope.delete_comp = function()
  {
	  alert('Delete');
  }

}
InvStockController.$inject = ["$scope", "$filter", "ngTableParams","getSetFactory","apiCall","apiPath","tableCal"];