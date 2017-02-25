
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
//$.getScript('app/vendor/ng-table/ng-table.min.js');
//$.getScript('app/vendor/ng-table/ng-table.min.css');


App.controller('previewBillModalController',previewBillModalController);

function previewBillModalController($scope, $modalInstance,$rootScope,$http,apiCall,apiPath,$timeout,$state,companyId,apiResponse,$sce,billData,inventoryData,taxData,total,totalTax,grandTotal,advance,balance,entryDate,$filter,productArrayFactory,buttonValidation,insertOrUpdate) {
  'use strict';
  
	 var data = [];
	 var vm = this;
	
	 $scope.companyData = companyId;
	 $scope.noOfDecimalPoints = parseInt($scope.companyData.noOfDecimalPoints);
	 $scope.billData = billData;
	 $scope.inventoryData = inventoryData;
	 $scope.taxData = taxData;
	 $scope.total = total;
	 $scope.totalTax = totalTax;
	 $scope.advance = advance;
	 $scope.balance = balance;
	 
	 /** Button Validation **/
		
		$scope.buttonValidation = buttonValidation;
		$scope.insertOrUpdate = insertOrUpdate;
	 /** End **/
	 
	 console.log( $scope.inventoryData);
	$scope.TemplateDisplay;
	
	var tags = ['Company','ClientName','INVID','CLIENTADD','OrderDate','Mobile','Description','Total','TotalInWord','TotalQty','TotalTax','REMAINAMT'];
	
	
	
	//$scope.billData.splice("clientName",1);
	
	
	
		$scope.stockModel=[];
 
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.ok = function (msg) {
      $modalInstance.close(msg);
    };
	
	$scope.closeButton = function () {

		$modalInstance.dismiss();
    };
	
    $scope.cancel = function () {
	
		if($scope.stockModel)
		 {
			$rootScope.ArraystockModel=[];
			$rootScope.ArraystockModel.state=$scope.stockModel.state;
			$rootScope.ArraystockModel.state2=$scope.stockModel.state2;
			$rootScope.ArraystockModel.state3=$scope.stockModel.state3;
		 }
		$modalInstance.dismiss();
    };
	
	// var obj = {name: 'misko', gender: 'male'};
	// var log = [];
	// angular.forEach(obj, function(value, key) {
	  // console.log(key + ': ' + value);
	// });
	
	var inventoryCount = $scope.inventoryData.length;
	var output = "";
	var totalQty = 0;
	
	for(var productArray=0;productArray<inventoryCount;productArray++){
		
		var productData = $scope.inventoryData[productArray];
		
		if(productData.productId != ""){
			
			var trClose = "</td></tr>";
			if(productArray==0)
			{
			 output = output+trClose;
			}
			if(productData.discountType == 'percentage'){
				
				var mainPrice = parseFloat(productData.price)*parseInt(productData.qty);
				
				var discount = $filter('setDecimal')(productArrayFactory.calculateTax(mainPrice,productData.discount,0),$scope.noOfDecimalPoints);
			}
			else{
				
				var discount = productData.discount;
			}
			
			output = output+
			 "<tr class='trhw' style='font-family: Calibri; text-align: left; height: 25px; background-color: transparent;'><td class='tg-m36b thsrno' style='font-size: 12px; height: 25px; text-align:center; padding:0 0 0 0;'>"+ productArray+1 +"</td><td class='tg-m36b theqp' style='font-size: 12px;  height: 25px; padding:0 0 0 0;'>"+ productData.productName +"</td><td class='tg-ullm thsrno' style='font-size: 12px;  height: 25px; padding:0 0 0 0;'>"+ productData.color +"</td><td class='tg-ullm thsrno' style='font-size: 12px;  height: 25px; padding:0 0 0 0;'>"+ productData.frameNo +"</td><td class='tg-ullm thsrno' style='font-size: 12px;   height: 25px; text-align: center; padding:0 0 0 0;'>"+ productData.qty +"</td><td class='tg-ullm thsrno' style='font-size: 12px; height: 25px; text-align: center; padding:0 0 0 0;'>"+ productData.price +"</td><td class='tg-ullm thsrno' style='font-size: 12px;  height: 25px; text-align: center; padding:0 0 0 0;'>"+ discount +"</td><td class='tg-ullm thamt' style='font-size: 12px;  height: 25px; text-align: center; padding:0 0 0 0;'>"+ $scope.taxData[productArray].tax +"%</td><td class='tg-ullm thamt' style='font-size: 12px; height: 25px; text-align: center; padding:0 0 0 0;'>"+  $filter('setDecimal')(productArrayFactory.calculateTax(productData.amount,$scope.taxData[productArray].tax,0),$scope.noOfDecimalPoints) +"</td><td class='tg-ullm thamt' style='font-size: 12px;  height: 25px; text-align: center; padding:0 0 0 0;'>"+ $scope.taxData[productArray].additionalTax  +"%</td><td class='tg-ullm thamt' style='font-size: 12px;   height: 25px; text-align: center; padding:0 0 0 0;'>"+ $filter('setDecimal')(productArrayFactory.calculateTax(productData.amount,$scope.taxData[productArray].additionalTax,0),$scope.noOfDecimalPoints)+"</td><td class='tg-ullm thamt' style='font-size: 12px;  height: 25px; text-align: center; padding:0 0 0 0;'>"+ productData.amount;
			   
			if(productArray != inventoryCount-1)
			{
				output = output+trClose;
			}
			
			totalQty = totalQty + parseInt(productData.qty);
		}
	}
	
	
	var  date = new Date(entryDate);
	var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			
	var billArrayTag = {};
	
	billArrayTag.Company = $scope.companyData.companyName;
	billArrayTag.ClientName = $scope.billData.clientName;
	billArrayTag.INVID = $scope.billData.invoiceNumber;
	billArrayTag.CLIENTADD = $scope.billData.fisrtAddress+','+$scope.billData.secondAddress;
	billArrayTag.OrderDate = fdate;
	billArrayTag.Mobile = $scope.billData.BillContact;
	billArrayTag.Total = $scope.total;
	billArrayTag.TotalTax = $scope.billData.tax;
	billArrayTag.TotalQty = totalQty;
	billArrayTag.TotalInWord = "Five Thousand";
	billArrayTag.REMAINAMT = $scope.balance;
	billArrayTag.Description = output;
	
	
	
	apiCall.getCall(apiPath.getTemplateByCompany+$scope.companyData.companyId).then(function(responseTemp){
		
		//$scope.TemplateDisplay = $sce.trustAsHtml(responseTemp[0].templateBody);
		var countData = responseTemp.length;
		for(var j=0;j<countData;j++){
			
			var TemplateData = responseTemp[j];
			if(TemplateData.templateType == 'invoice'){
				
				var tempData = TemplateData.templateBody;
				
				 angular.forEach(billArrayTag,function(value,key){
					
					//var check = "/\[["+key+"\]]+\]/g";
					tempData = tempData.replace("["+key+"]",value,"g");
				});
	
				 
				
				$scope.TemplateDisplay = $sce.trustAsHtml(tempData);
			
			}
			
		
		}
		
		
	
	});
	
}

previewBillModalController.$inject = ["$scope", "$modalInstance","$rootScope","$http","apiCall","apiPath","$timeout","$state","companyId","apiResponse","$sce","billData","inventoryData","taxData","total","totalTax","grandTotal","advance","balance","entryDate","$filter","productArrayFactory","buttonValidation","insertOrUpdate"];
