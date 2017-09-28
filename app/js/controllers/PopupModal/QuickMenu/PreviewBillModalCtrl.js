
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
//$.getScript('app/vendor/ng-table/ng-table.min.js');
//$.getScript('app/vendor/ng-table/ng-table.min.css');


App.controller('previewBillModalController',previewBillModalController);

function previewBillModalController($scope, $modalInstance,$rootScope,$http,apiCall,apiPath,$timeout,$state,companyId,apiResponse,$sce,billData,inventoryData,taxData,total,totalTax,grandTotal,advance,balance,remark,entryDate,$filter,productArrayFactory,buttonValidation,insertOrUpdate,saleType,productFactory) {
  'use strict';
  
	 var data = [];
	 var vm = this;
	
	 $scope.companyData = companyId;
	 $scope.noOfDecimalPoints = parseInt($scope.companyData.noOfDecimalPoints);
	 $scope.billData = billData;
	 $scope.inventoryData = inventoryData;
	 $scope.taxData = taxData;
	 $scope.total = total;
	 $scope.grandTotal = grandTotal;
	 $scope.totalTax = totalTax;
	 $scope.advance = advance;
	 $scope.balance = balance;
	 $scope.remark = remark;
	 $scope.companyLogo = $rootScope.templateCompanyLogo;
	 /** Button Validation **/
		
		$scope.buttonValidation = buttonValidation;
		$scope.insertOrUpdate = insertOrUpdate;
	 /** End **/
	 $scope.saleType = saleType;
	 
	if($scope.saleType == 'QuotationPrint'){
		$scope.useTemplate = 'quotation';
	}
	else{
		$scope.useTemplate = 'invoice';
	}
	 //console.log( $scope.inventoryData);
	$scope.TemplateDisplay;
	
	var tags = ['Company','ClientName','INVID','CLIENTADD','OrderDate','Mobile','Description','Total','TotalInWord','TotalQty','TotalTax','REMAINAMT'];
	
	
	/** Digit to Words **/
		function test_value(secondNum) {
    var junkVal= secondNum;
    junkVal  = Math.floor(junkVal);
    var obStr = new String(junkVal);
	var numReversed= obStr.split("");
    var actnumber=numReversed.reverse();
    if(Number(junkVal) >=0){
        //do nothing
    }
    else{
        alert('wrong Number cannot be converted');
        return false;
    }
    if(Number(junkVal)==0){
        return obStr+''+'Rupees Zero Only';
        return false;
    }
    if(actnumber.length>9){
        alert('Oops!!!! the Number is too big to covertes');
        return false;
    }
    var iWords=["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
    var ePlace=['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
    var tensPlace=['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety' ];
    var iWordsLength=numReversed.length;
    var totalWords="";
    var inWords=new Array();
    var finalWord="";
   var j=0;
    for(var i=0; i<iWordsLength; i++){
        switch(i)
        {
        case 0:
            if(actnumber[i]==0 || actnumber[i+1]==1 ) {
                inWords[j]='';
            }
            else {
                inWords[j]=iWords[actnumber[i]];
            }
            inWords[j]=inWords[j];
            break;
        case 1:
            tens_complication();
            break;
        case 2:
            if(actnumber[i]==0) {
                inWords[j]='';
            }
            else if(actnumber[i-1]!=0 && actnumber[i-2]!=0) {
                inWords[j]=iWords[actnumber[i]]+' Hundred and';
            }
            else {
                inWords[j]=iWords[actnumber[i]]+' Hundred';
            }
            break;
        case 3:
            if(actnumber[i]==0 || actnumber[i+1]==1) {
                inWords[j]='';
            }
            else {
                inWords[j]=iWords[actnumber[i]];
            }
            if(actnumber[i+1] != 0 || actnumber[i] > 0){
                inWords[j]=inWords[j]+" Thousand";
            }
            break;
        case 4:
            tens_complication();
            break;
        case 5:
            if(actnumber[i]==0 || actnumber[i+1]==1 ) {
                inWords[j]='';
            }
            else {
                inWords[j]=iWords[actnumber[i]];
            }
            inWords[j]=inWords[j]+" Lakh";
            break;
        case 6:
            tens_complication();
            break;
        case 7:
            if(actnumber[i]==0 || actnumber[i+1]==1 ){
                inWords[j]='';
            }
            else {
                inWords[j]=iWords[actnumber[i]];
            }
            inWords[j]=inWords[j]+" Crore";
            break;
        case 8:
            tens_complication();
            break;
        default:
            break;
        }
        j++;
    }
    function tens_complication() {
        if(actnumber[i]==0) {
            inWords[j]='';
        }
        else if(actnumber[i]==1) {
            inWords[j]=ePlace[actnumber[i-1]];
        }
        else {
            inWords[j]=tensPlace[actnumber[i]];
        }
    }
    inWords.reverse();
    for(var i=0; i<inWords.length; i++) {
        finalWord+=inWords[i];
    }
        return finalWord;
}

	    function convert_amount_into_rupees_paisa(numbers){
			var secondNUm = numbers;
            var finalWord1 = test_value(secondNUm);
            var finalWord2 = "";
            var val = numbers.toString();
            var actual_val  = numbers; 
           // document.getElementById('rupees').value = val;
            if(val.indexOf('.')!=-1)
           {
                  val = val.substring(val.indexOf('.')+1,val.length);
                  if(val.length==0){
        finalWord2 = "";
       // document.getElementById('container').innerHTML=finalWord1 +" Rupees Only"+finalWord2;
        return finalWord1 +" Rupees Only"+finalWord2;
                  }
                  else{
                      //document.getElementById('rupees').value = val;
                      if(val != '00'){                      
                          finalWord2 = test_value(val) + " paisa only";
                         // document.getElementById('container').innerHTML=finalWord1 +" Rupees and "+finalWord2;
                          return finalWord1 +" Rupees and "+finalWord2;
                      }else{           
                          finalWord2 = "";
                         // document.getElementById('container').innerHTML=finalWord1 +" Rupees only"+finalWord2;
                          return finalWord1 +" Rupees only"+finalWord2;
                      }
                  }
           }
           else{
                 //finalWord2 =  " Zero paisa only";
                 //document.getElementById('container').innerHTML=finalWord1 +" Rupees Only";
                 return finalWord1 +" Rupees Only";
           }
       // document.getElementById('rupees').value = actual_val;   
    }
	/** End **/
	
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
	var descTotalCM = 10.4;
	var output = "";
	var totalQty = 0;
	var totalDiscount = 0;
	var srNumber = 1;
	
	for(var productArray=0;productArray<inventoryCount;productArray++){
		
		var productData = $scope.inventoryData[productArray];
		var allProductMst = productFactory.getSingleProduct(productData.productId).then(function(response){
				console.log(response);
				return response;
		});
		console.log(allProductMst);

		if(productData.productId != ""){
			
			var trClose = "</td></tr>";
			if(productArray==0)
			{
			 output = output+trClose;
			}
			
			var mainPrice = parseFloat(productData.price)*parseInt(productData.qty);
			//productData.amount
			var vat = $filter('setDecimal')(productArrayFactory.calculateTax(mainPrice,$scope.taxData[productArray].tax,0),$scope.noOfDecimalPoints);
			
			var aTax = $filter('setDecimal')(productArrayFactory.calculateTax(mainPrice,$scope.taxData[productArray].additionalTax,0),$scope.noOfDecimalPoints);
			
			if(productData.discountType == 'percentage'){
				
				var discount = $filter('setDecimal')(productArrayFactory.calculateTax(mainPrice,productData.discount,0),$scope.noOfDecimalPoints);
				totalDiscount = totalDiscount + discount;
				// var productTotal = (mainPrice - discount) + vat + aTax;
				var productTotal = $filter('setDecimal')((mainPrice - discount) + vat + aTax,$scope.noOfDecimalPoints);
				
			}
			else{
				
				var discount =  $filter('setDecimal')(productData.discount,$scope.noOfDecimalPoints);
				totalDiscount = totalDiscount + discount;
				// var productTotal = (mainPrice - discount) + vat + aTax;
				var productTotal = $filter('setDecimal')((mainPrice - discount) + vat + aTax,$scope.noOfDecimalPoints);
				
				
			}

			if(angular.isUndefined(productData.hsn)){
				var hsnNo = 'No';
			}
			else{
				var hsnNo = productData.hsn;
			}
			
			if($scope.saleType == "QuotationPrint"){
				
				output = output+"<tr class='trhw' style='font-family: Calibri; text-align: left; height: 0.7cm; background-color: transparent;'><td class='tg-m36b thsrno' style='font-size: 12px; height: 0.7cm; text-align:center; padding:0 0 0 0;'>"+ srNumber +"</td><td class='tg-m36b theqp' style='font-size: 12px;  height: 0.7cm; padding:0 0 0 0;' colspan='3'>"+ productData.productName +"</td><td class='tg-ullm thsrno' style='font-size: 12px;  height: 0.7cm; padding:0 0 0 0;' colspan='2'>"+ productData.color +"|"+ productData.size +"</td><td class='tg-ullm thsrno' style='font-size: 12px;  height: 0.7cm; padding:0 0 0 0;'>"+ productData.frameNo +"</td><td class='tg-ullm thsrno' style='font-size: 12px;   height: 0.7cm; text-align: center; padding:0 0 0 0;'>"+ productData.qty +"</td><td class='tg-ullm thsrno' style='font-size: 12px; height: 0.7cm; text-align: right; padding:0 0 0 0;' colspan='2' >"+ productData.price +"</td><td class='tg-ullm thamt' style='font-size: 12px;   height: 0.7cm; text-align: right; padding:0 0 0 0;'>PCS</td><td class='tg-ullm thamt' style='font-size: 12px;  height: 0.7cm; text-align: right; padding:0 0 0 0;'>"+ productTotal;
			 
			}
			else{
				output = output+"<tr class='trhw' style='font-family: Calibri; text-align: left; height:  0.7cm; background-color: transparent;'><td class='tg-m36b thsrno' style='font-size: 14px; height: 0.7cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;'>"+ srNumber +"</td><td class='tg-m36b theqp' style='font-size: 14px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid black;' colspan='3'>"+ productData.productName +"</td><td class='tg-ullm thsrno' style='font-size: 14px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid black;text-align:center'>"+ hsnNo +"</td><td class='tg-ullm thsrno' style='font-size: 14px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid black;'>"+ productData.qty +"</td><td class='tg-ullm thsrno' style='font-size: 14px;   height:  0.7cm; text-align: center; padding:0 0 0 0;border-right: 1px solid black;'>"+ productData.price +"</td><td class='tg-ullm thsrno' style='font-size: 14px; height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid black;'>"+ $scope.taxData[productArray].tax +"%</td><td class='tg-ullm thamt' style='font-size: 14px;  height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid black;'>"+ vat +"</td><td class='tg-ullm thamt' style='font-size: 14px;  height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid black;'>"+ $scope.taxData[productArray].additionalTax  +"%</td><td class='tg-ullm thamt' style='font-size: 14px; height: 0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid black;'>"+ aTax +"</td><td class='tg-ullm thamt' style='font-size: 14px;  height: 0.7cm; text-align: right; padding:0 5px 0 0;'>"+ productTotal;
			}
			   
			
			   
			if(productArray != inventoryCount-1)
			{
				output = output+trClose;
			}
			
			if(productArray == inventoryCount-1)
			{
				var totalProductSpace = parseInt(srNumber)*0.7;
				var finalProductBlankSpace = parseFloat(descTotalCM) - parseFloat(totalProductSpace);
				
				output = output + "<tr class='trhw' style='font-family: Calibri; text-align: left; height:"+finalProductBlankSpace+"cm; background-color: transparent;'><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' colspan='3' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td><td class='tg-m36b thsrno' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid black;' ></td></tr>";
			}
			 srNumber++;
			totalQty = totalQty + parseInt(productData.qty);
			
		}
		
		
	}
	
	
	var  date = new Date(entryDate);
	var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	date.setMonth(date.getMonth() + 1);
	var Lastdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			
	//OverAll Discount
	var overAllDiscount = 0;
		if($scope.billData.overallDiscountType == 'percentage'){
			overAllDiscount = $filter('setDecimal')(productArrayFactory.calculateTax($scope.total,$scope.billData.overallDiscount,0),$scope.noOfDecimalPoints);
			totalDiscount = totalDiscount + overAllDiscount;
		}
		else{
			overAllDiscount =  $filter('setDecimal')($scope.billData.overallDiscount,$scope.noOfDecimalPoints);
			totalDiscount = totalDiscount + overAllDiscount;
		}
	
	$scope.RoundTotal = Math.round($scope.total);
	$scope.RoundFigure =  $filter('setDecimal')($scope.RoundTotal - $scope.total,$scope.noOfDecimalPoints);
			
	var billArrayTag = {};
	
	billArrayTag.CMPLOGO = $scope.companyLogo;
	billArrayTag.Company = $scope.companyData.companyName;
	billArrayTag.CompanyAdd = $scope.companyData.address1 == 'undefined' ? '' : $scope.companyData.address1 +' '+ $scope.companyData.address2 == 'undefined' ? '' : ', '+$scope.companyData.address2;
	billArrayTag.CreditCashMemo = "CASH";
	billArrayTag.RetailOrTax = "RETAIL";
	billArrayTag.ClientName = $scope.billData.clientName;
	billArrayTag.INVID = $scope.billData.invoiceNumber;
	billArrayTag.ChallanNo = " ";
	billArrayTag.ChallanDate = " ";
	billArrayTag.CLIENTADD = $scope.billData.fisrtAddress+','+$scope.billData.secondAddress;
	billArrayTag.OrderDate = fdate;
	billArrayTag.Mobile = $scope.billData.BillContact;
	//billArrayTag.Total = $scope.grandTotal;
	billArrayTag.Total = $scope.total;
	billArrayTag.RoundTotal = $scope.RoundTotal;
	billArrayTag.RoundFigure = $scope.RoundFigure;
	billArrayTag.TotalTax = $scope.billData.tax;
	billArrayTag.TotalDiscount = totalDiscount;
	billArrayTag.TotalQty = totalQty;
	billArrayTag.TotalInWord = convert_amount_into_rupees_paisa($scope.total);
	billArrayTag.REMAINAMT = $scope.balance;
	billArrayTag.REMARK = angular.isUndefined($scope.remark) ? '': $scope.remark;
	billArrayTag.Description = output;
	billArrayTag.ExpireDate = Lastdate;
	billArrayTag.CompanySGST = $scope.companyData.sgst;
	billArrayTag.CompanyCGST = $scope.companyData.cgst;
	billArrayTag.CLIENTTINNO = " ";
	
	
	apiCall.getCall(apiPath.getTemplateByCompany+$scope.companyData.companyId).then(function(responseTemp){
		
		//$scope.TemplateDisplay = $sce.trustAsHtml(responseTemp[0].templateBody);
		var countData = responseTemp.length;
		for(var j=0;j<countData;j++){
			
			var TemplateData = responseTemp[j];
			if(TemplateData.templateType == $scope.useTemplate){
				
				var tempData = TemplateData.templateBody;
				
				 angular.forEach(billArrayTag,function(value,key){
					
					//var check = "/\[["+key+"\]]+\]/g";
					tempData = tempData.replace("["+key+"]",value,"g");
				});
	
				 
				tempData = tempData.replace("[Total]",$scope.total,"g");
				tempData = tempData.replace("[Company]",$scope.companyData.companyName,"g");
				
				$scope.TemplateDisplay = $sce.trustAsHtml(tempData);
			
			}
			
		
		}
		
		
	
	});
	
}

previewBillModalController.$inject = ["$scope", "$modalInstance","$rootScope","$http","apiCall","apiPath","$timeout","$state","companyId","apiResponse","$sce","billData","inventoryData","taxData","total","totalTax","grandTotal","advance","balance","remark","entryDate","$filter","productArrayFactory","buttonValidation","insertOrUpdate","saleType","productFactory"];
