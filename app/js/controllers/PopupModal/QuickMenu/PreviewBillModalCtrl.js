
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

App.controller('previewBillModalController',previewBillModalController);

function previewBillModalController($scope, $modalInstance,$rootScope,apiCall,apiPath,$timeout,$state,apiResponse,$sce,billData,inventoryData,total,grandTotal,entryDate,$filter,productArrayFactory,buttonValidation,insertOrUpdate,saleType,productFactory,productHsn) {
  'use strict';
  
	 var data = [];
	 var vm = this;
	
	 $scope.billData = billData;
	 $scope.companyData = $scope.billData.companyId;
	 $scope.noOfDecimalPoints = parseInt($scope.companyData.noOfDecimalPoints);
	 $scope.inventoryData = inventoryData;
	 var allProductHsn = productHsn;
	 $scope.total = total;
	 $scope.grandTotal = grandTotal;
	 $scope.totalTax = $scope.billData.tax;
	 $scope.advance = $scope.billData.advance;
	 $scope.balance = $scope.billData.balanceTable;
	 $scope.remark = $scope.billData.remark;
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
	
	var tags = ['Company','ClientName','INVID','CLIENTADD','OrderDate','Mobile','Description','Total','TotalInWord','TotalQty','TotalTax','REMAINAMT','gstSummary'];
	
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
	
	function checkGSTValue(value){
		
		if(angular.isUndefined(value) || value == '' || isNaN(value)){
			return 0;
		}
		else{
			return parseFloat(value);
		}
	}

	// var obj = {name: 'misko', gender: 'male'};
	// var log = [];
	// angular.forEach(obj, function(value, key) {
	  // console.log(key + ': ' + value);
	// });
	
	var inventoryCount = $scope.inventoryData.length;
	var descTotalCM = 10.4;
	var output = "";
	var gstOutput = "";
	var totalQty = 0;
	var totalDiscount = 0;
	var srNumber = 1;
	var gstSummarySizeManage = 0;
	var gstSummaryArray = [];
	var trClose = "</td></tr>";
	var totalAmount = 0;

	for(var productArray=0;productArray<inventoryCount;productArray++){
		
		var productData = $scope.inventoryData[productArray];

		if(productData.productId != ""){

			if(productArray==0)
			{
			 output = output+trClose;
			}
			
			var mainPrice = parseFloat(productData.price)*parseInt(productData.qty);

			totalAmount = totalAmount + parseFloat(productData.amount);
			//productData.amount
			//Single Product GST Percentage
			var cgstPercentage = checkGSTValue(productData.cgstPercentage);
			var sgstPercentage = checkGSTValue(productData.sgstPercentage);
			var igstPercentage = checkGSTValue(productData.igstPercentage);

			//Total tax in percentage
			var totalTaxInPercentage = cgstPercentage + sgstPercentage + igstPercentage;

			var discountInPercentage = "-";
			var discount = 0;

			if(productData.discountType == 'percentage'){
				
				discount = $filter('setDecimal')(productArrayFactory.calculateTax(mainPrice,productData.discount,0),$scope.noOfDecimalPoints);

				discountInPercentage = productData.discount+'%'; //Discount in %

				totalDiscount = totalDiscount + discount;
				
				
			}
			else{
				
				discount =  $filter('setDecimal')(productData.discount,$scope.noOfDecimalPoints);
				totalDiscount = totalDiscount + discount;
			}

			//Taxable Value
			var taxableValue = $filter('setDecimal')(mainPrice - discount,$scope.noOfDecimalPoints);

			//var cgstAmt = $filter('setDecimal')(productArrayFactory.calculateTax(taxableValue,cgstPercentage,0),$scope.noOfDecimalPoints);
			//var sgstAmt = $filter('setDecimal')(productArrayFactory.calculateTax(taxableValue,sgstPercentage,0),$scope.noOfDecimalPoints);
			//var igstAmt = $filter('setDecimal')(productArrayFactory.calculateTax(taxableValue,igstPercentage,0),$scope.noOfDecimalPoints);

			var cgstAmt = checkGSTValue(productData.cgstAmount);
			var sgstAmt = checkGSTValue(productData.sgstAmount);
			var igstAmt = checkGSTValue(productData.igstAmount);

			//Total Value
			var productTotal = $filter('setDecimal')((mainPrice - discount) + cgstAmt + sgstAmt + igstAmt,$scope.noOfDecimalPoints);

			if(allProductHsn[productArray] == '' || allProductHsn[productArray] == undefined || allProductHsn[productArray] == null){
				var hsnNo = '-';
			}
			else{
				var hsnNo = allProductHsn[productArray];
			}
			
				output = output+"<tr  style='font-family: Calibri; text-align: left; height:  0.7cm; background-color: transparent;'><td  style='font-size: 12px; height: 0.7cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ srNumber +
				"</td><td colspan='3' style='font-size: 12px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' >&nbsp;"
				+ productData.productName +
				"</td><td  style='font-size: 12px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);text-align:center'>"+ hsnNo +
				"</td><td colspan='2' style='font-size: 12px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);text-align:center'>"+ productData.color +" | "+ productData.size +
				"</td><td  style='font-size: 12px;  height:  0.7cm; padding:0 0 0 0; text-align: center;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ productData.frameNo +
				"</td><td  style='font-size: 12px;  height:  0.7cm; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);text-align:center'>"+ productData.qty +
				"</td><td  style='font-size: 12px;   height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ $filter('number')(productData.price,$scope.noOfDecimalPoints) +
				"&nbsp;</td><td  style='font-size: 12px;   height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ $filter('number')(mainPrice,$scope.noOfDecimalPoints) +
				"&nbsp;</td><td  style='font-size: 12px; height:  0.7cm; text-align: center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ discountInPercentage +
				"</td><td class='tg-ullm thamt' style='font-size: 12px;  height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ $filter('number')(discount,$scope.noOfDecimalPoints) +
				"&nbsp;</td><td class='tg-ullm thamt' style='font-size: 12px;  height:  0.7cm; text-align: right; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ $filter('number')(taxableValue,$scope.noOfDecimalPoints) +
				"&nbsp;</td><td class='tg-ullm thamt' style='font-size: 12px; height: 0.7cm; text-align: center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);'>"+ totalTaxInPercentage +
				"%</td><td class='tg-ullm thamt' style='font-size: 12px;  height: 0.7cm; text-align: right; padding:0 0 0 0;'>"+ $filter('number')(productData.amount,$scope.noOfDecimalPoints)+"&nbsp;";
			
			 
			  var copyFlag = 0;

			  var summaryLength = gstSummaryArray.length;
			  if(summaryLength > 1 && hsnNo != '-'){
			  
			  		var summaryIndex = 0;
			  		while(summaryIndex < summaryLength){
			  			var singleObject = gstSummaryArray[summaryIndex];
			  			if(singleObject.hsnNo == allProductHsn[productArray]){
			  				
			  					copyFlag = 1;

							  gstSummaryArray[summaryIndex].taxableValue = gstSummaryArray[summaryIndex].taxableValue + taxableValue;
							  //gstSummaryArray[summaryIndex].cgstPercentage += productData.cgstPercentage;
							  gstSummaryArray[summaryIndex].cgstAmt = (gstSummaryArray[summaryIndex].taxableValue * gstSummaryArray[summaryIndex].cgstPercentage)/100;
							  //gstSummaryArray[summaryIndex].sgstPercentage += productData.sgstPercentage;
							  gstSummaryArray[summaryIndex].sgstAmt = (gstSummaryArray[summaryIndex].taxableValue * gstSummaryArray[summaryIndex].sgstPercentage)/100;
							  //gstSummaryArray[summaryIndex].igstPercentage += productData.igstPercentage;
							  gstSummaryArray[summaryIndex].igstAmt =  (gstSummaryArray[summaryIndex].taxableValue * gstSummaryArray[summaryIndex].igstPercentage)/100;
							  break;
			  			}
			  			summaryIndex++;
			  		}
			  }

			 	if(copyFlag == 0){
			 		if(cgstPercentage > 0 || sgstPercentage > 0 || igstPercentage > 0){
			 			var summaryTempObject = {};
						summaryTempObject.hsnNo = hsnNo;
						summaryTempObject.taxableValue = taxableValue;
						summaryTempObject.cgstPercentage = cgstPercentage;
						summaryTempObject.cgstAmt = cgstAmt;
						summaryTempObject.sgstPercentage = sgstPercentage;
						summaryTempObject.sgstAmt = sgstAmt;
						summaryTempObject.igstPercentage = igstPercentage;
						summaryTempObject.igstAmt = igstAmt;

						gstSummaryArray.push(summaryTempObject);

						gstSummarySizeManage++;
					}
			 	}
			  	 
			if(productArray != inventoryCount-1)
			{
				output = output+trClose;
			}
			
			if(productArray == inventoryCount-1)
			{
				var lastManageSpace = parseInt(srNumber) + gstSummarySizeManage;
				var totalProductSpace = lastManageSpace*0.7;
				var finalProductBlankSpace = parseFloat(descTotalCM) - parseFloat(totalProductSpace);
				
				output = output + "<tr  style='height:"+finalProductBlankSpace+"cm; background-color: transparent;'><td style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' colspan='3' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td colspan='2' style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, .3);' ></td><td  style='font-size: 12px; height: "+finalProductBlankSpace+"cm; text-align:center; padding:0 0 0 0;border-right: 1px solid rgba(0, 0, 0, 1);' ></td></tr>";
			}
			 srNumber++;
			totalQty = totalQty + parseInt(productData.qty);

		}

	}

	var totalTaxableAmt = 0;
	var totalCgst = 0;
	var totalCgstAmt = 0;
	var totalSgst = 0;
	var totalSgstAmt = 0;
	var totalIgst = 0;
	var totalIgstAmt = 0;

	var gstIndex = 0;
	var gstCnt = gstSummaryArray.length;
	while(gstIndex < gstCnt){

		var singleGstData = gstSummaryArray[gstIndex];

		totalTaxableAmt = totalTaxableAmt+singleGstData.taxableValue;
		totalCgst = totalCgst+singleGstData.cgstPercentage;
		totalCgstAmt = totalCgstAmt+singleGstData.cgstAmt;
		totalSgst = totalSgst+singleGstData.sgstPercentage;
		totalSgstAmt = totalSgstAmt+singleGstData.sgstAmt;
		totalIgst = totalIgst+singleGstData.igstPercentage;
		totalIgstAmt = totalIgstAmt+singleGstData.igstAmt;

		if(gstIndex==0)
		{
		 gstOutput = gstOutput+trClose;
		}

		//gstSummary Array
			gstOutput = gstOutput + '<tr style="background-color: transparent; height: 15px;"><td colspan=2  align="center" valign=middle  style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px">'
			+ singleGstData.hsnNo+
			'</td><td colspan=2 align="right" valign=bottom  style="border-right: 1px solid rgba(0, 0, 0, .3);font-size:12px ">'
			+ $filter('number')(singleGstData.taxableValue,$scope.noOfDecimalPoints) +
			'&nbsp;</td><td align="center" valign=bottom  style="border-right: 1px solid rgba(0, 0, 0, .3);font-size:12px ">'
			+ singleGstData.cgstPercentage+
			'</td><td colspan=2 align="right" valign=bottom  style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px">'
			+ $filter('number')(singleGstData.cgstAmt,$scope.noOfDecimalPoints)+
			'&nbsp;</td><td align="center" valign=bottom style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px">'
			+ singleGstData.sgstPercentage+
			'</td><td colspan=2 align="right" valign=bottom style="border-right: 1px solid rgba(0, 0, 0, .3);font-size:12px ">'
			+ $filter('number')(singleGstData.sgstAmt,$scope.noOfDecimalPoints)+
			'&nbsp;</td><td align="center" valign=bottom style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px" >'
			+singleGstData.igstPercentage+
			'</td><td colspan=2 align="right" valign=bottom style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px" >'
			+ $filter('number')(singleGstData.igstAmt,$scope.noOfDecimalPoints)+
			'&nbsp;</td><td align="center" valign=bottom style="border-right: 1px solid rgba(0, 0, 0, .3); font-size:12px" ></td><td colspan=2 align="right" valign=bottom  >&nbsp;</td>';

		//End

		if(gstIndex != gstCnt-1)
		{
			gstOutput = gstOutput+trClose;
		}
		gstIndex++;
	}

	var  date = new Date(entryDate);
	var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	date.setMonth(date.getMonth() + 1);
	var Lastdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
			
	//E.Charge
	var extraCharge = checkGSTValue($scope.billData.extraCharge);

	//OverAll Discount
	var overAllDiscount = 0;
		if($scope.billData.overallDiscountType == 'percentage'){
			overAllDiscount = $filter('setDecimal')(productArrayFactory.calculateTax(totalAmount+extraCharge,$scope.billData.overallDiscount,0),$scope.noOfDecimalPoints);
			totalDiscount =  overAllDiscount;
		}
		else{
			overAllDiscount =  $filter('setDecimal')($scope.billData.overallDiscount,$scope.noOfDecimalPoints);
			totalDiscount = overAllDiscount;
		}

	var roundableAmount = (totalAmount+extraCharge)-totalDiscount;
	$scope.RoundTotal = Math.round(roundableAmount);
	$scope.RoundFigure =  $filter('setDecimal')($scope.RoundTotal - roundableAmount,$scope.noOfDecimalPoints);
			

	var billArrayTag = {};
	
	billArrayTag.CMPLOGO = $scope.companyLogo;
	billArrayTag.Company = $scope.companyData.companyName;
	billArrayTag.CompanyWebsite = $scope.companyData.websiteName == undefined || $scope.companyData.websiteName == '' ? '' : $scope.companyData.websiteName;
	billArrayTag.CompanyContact = $scope.companyData.customerCare == undefined || $scope.companyData.customerCare == '' ? '' : $scope.companyData.customerCare;
	billArrayTag.CompanyEmail = $scope.companyData.emailId == 'undefined' || $scope.companyData.emailId == '' ? '' : $scope.companyData.emailId;
	billArrayTag.CompanyAdd = $scope.companyData.address1 == 'undefined' ? '' : $scope.companyData.address1 +' '+ $scope.companyData.address2 == 'undefined' ? '' : ', '+$scope.companyData.address2;
	billArrayTag.CreditCashMemo = "CASH";
	billArrayTag.BILLLABEL = $scope.saleType == 'QuotationPrint' ? 'Quotation' : 'Tax Invoice';
	billArrayTag.ClientName = $scope.billData.clientName;
	billArrayTag.INVID = $scope.billData.invoiceNumber;
	billArrayTag.ChallanNo = " ";
	billArrayTag.ChallanDate = " ";
	billArrayTag.CLIENTADD = $scope.billData.fisrtAddress == '' || $scope.billData.fisrtAddress == undefined ? '' : $scope.billData.fisrtAddress;
	billArrayTag.OrderDate = fdate;
	billArrayTag.Mobile = $scope.billData.BillContact;
	//billArrayTag.Total = $scope.grandTotal;
	billArrayTag.ExtraCharge = $filter('number')(extraCharge,$scope.noOfDecimalPoints);
	billArrayTag.Total = $filter('number')(totalAmount,$scope.noOfDecimalPoints);
	billArrayTag.TotalRoundableAmount = $filter('number')(roundableAmount,$scope.noOfDecimalPoints);
	billArrayTag.RoundTotal = $filter('number')($scope.RoundTotal,$scope.noOfDecimalPoints);
	billArrayTag.RoundFigure = isNaN($scope.RoundFigure) ? 0 :  $scope.RoundFigure;
	billArrayTag.TotalTax = $scope.billData.tax;
	billArrayTag.TotalDiscount = totalDiscount != undefined ? $filter('number')(totalDiscount,$scope.noOfDecimalPoints) : 0;
	billArrayTag.TotalQty = totalQty;
	billArrayTag.TotalInWord = convert_amount_into_rupees_paisa($scope.total);
	billArrayTag.REMAINAMT = $scope.balance;
	billArrayTag.REMARK = angular.isUndefined($scope.remark) ? '': $scope.remark;
	billArrayTag.Description = output;
	billArrayTag.gstSummary = gstOutput;
	billArrayTag.TotalTaxableAmt = $filter('number')(totalTaxableAmt,$scope.noOfDecimalPoints);
	billArrayTag.TotalCgst = totalCgst;
	billArrayTag.TotalCgstAmt = $filter('number')(totalCgstAmt,$scope.noOfDecimalPoints);
	billArrayTag.TotalSgst = totalSgst;
	billArrayTag.TotalSgstAmt = $filter('number')(totalSgstAmt,$scope.noOfDecimalPoints);
	billArrayTag.TotalIgst = totalIgst;
	billArrayTag.TotalIgstAmt = $filter('number')(totalIgstAmt,$scope.noOfDecimalPoints);
	billArrayTag.ExpireDate = Lastdate;
	billArrayTag.CompanySGST = $scope.companyData.sgst;
	billArrayTag.CompanyCGST = $scope.companyData.cgst;
	billArrayTag.CLIENTTINNO = " ";
	billArrayTag.PONO = $scope.billData.poNumber == '' || $scope.billData.poNumber == undefined ? '': $scope.billData.poNumber;
	
	
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

previewBillModalController.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath","$timeout","$state","apiResponse","$sce","billData","inventoryData","total","grandTotal","entryDate","$filter","productArrayFactory","buttonValidation","insertOrUpdate","saleType","productFactory","productHsn"];
