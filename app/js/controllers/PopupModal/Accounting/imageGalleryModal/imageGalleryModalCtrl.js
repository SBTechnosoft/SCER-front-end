
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
//$.getScript('app/vendor/ng-table/ng-table.min.js');
//$.getScript('app/vendor/ng-table/ng-table.min.css');


App.controller('imageGalleryModalCtrl',imageGalleryModalCtrl);

function imageGalleryModalCtrl($rootScope,$scope, $modalInstance,$http,apiCall,apiPath,$timeout,getSetFactory,$state,billData,formatType,validationMessage,apiResponse,transType) {
  'use strict';
  
	 var data = [];
	 var vm = this;
	 $scope.billData = billData;
	 $scope.formatType = formatType;
	 $scope.transType = transType;
	 
	  var dateFormats = $rootScope.dateFormats; //Date Format
	  
	$scope.erpPath = $rootScope.erpPath; // Erp Path
	
		$scope.stockModel=[];
 
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.ok = function () {
      $modalInstance.close('closed');
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
	
	/**
		Page Code
	**/
	if($scope.formatType == "image"){
		$scope.heading = "Image Gallery";
	}
	else if($scope.formatType == "pdf"){
		
		$scope.heading = "Pdf List";
	}
	else if($scope.formatType == "payment"){
		
		$scope.heading = "Payment";
	}
	
	$scope.changeAmountLimit = function(){
		
		if($scope.paymentForm.paymentTrn == 'refund'){
			
			if($scope.paymentForm.amount >= $scope.billData.advance)
			{
				$scope.paymentForm.amount = $scope.billData.advance;
			}
			
			$scope.LimitAmount = parseFloat($scope.billData.advance);
			
		}
		else{
			
			if($scope.paymentForm.amount >= $scope.billData.balance)
			{
				$scope.paymentForm.amount = $scope.billData.balance;
			}
			
			$scope.LimitAmount = parseFloat($scope.billData.balance);
			
		}
	}
	
	/**
		End
	**/
	
	
	/** payment Code **/
	
	if($scope.formatType == "payment"){
		
		//get Bank
		vm.bankDrop=[];
		apiCall.getCall(apiPath.getAllBank).then(function(response2){
				//console.log(response2);
				vm.bankDrop = response2;
				
		});
	
			// Datepicker
		  // ----------------------------------- 
			this.minStart = new Date();
			this.maxStart = new Date();
		  this.today = function() {
			this.dt1 = new Date();
		  };
		  this.today();

		  this.clear = function () {
			this.dt1 = null;
		  };

		  // Disable weekend selection
		  this.disabled = function(date, mode) {
			return false; //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  this.toggleMin = function() {
			this.minDate = this.minDate ? null : new Date();
		  };
		  this.toggleMin();

		  this.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			this.opened = true;
		  };
		  
		  this.openStart = function($event) {
			  
			$event.preventDefault();
			$event.stopPropagation();

			this.openedStart = true;
		  };

		  this.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		  };

		  this.initDate = new Date('2016-15-20');
		  // this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  this.format = dateFormats;
		  
		  //DatePicker End
		  
		  /* VALIDATION */
	
			$scope.errorMessage = validationMessage; //Error Messages In Constant
			
			/* VALIDATION END */
		   $scope.paymentForm = [];
		   
		  $scope.paymentModeDrop = ['cash','bank','card'];
		  if($scope.transType == 'payment'){
			  
			 $scope.paymentTrasDrop = ['payment'];
			 
			 $scope.paymentForm.paymentTrn = 'payment';
			 
			 $scope.LimitAmount = parseFloat($scope.billData.balance);
		  }
		  else if($scope.transType == 'refund'){
			  
			$scope.paymentTrasDrop = ['refund'];
			  
			$scope.paymentForm.paymentTrn = 'refund';
			   
			$scope.LimitAmount = parseFloat($scope.billData.advance);
		  }
		  else if($scope.transType == 'both'){
			
			$scope.paymentTrasDrop = ['payment','refund'];
  
			$scope.paymentForm.paymentTrn = 'payment';
			
			$scope.LimitAmount = parseFloat($scope.billData.balance);
			
		  }
		 
			
		 
		  
			$scope.insertPayment = function(){
				  
				 // console.log($scope.billData);
				 
				  
				var payFormData = new FormData();
				  
				var  date = new Date(vm.dt1);
				// var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
				var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
				
				payFormData.append('entryDate',fdate);
				payFormData.append('amount',$scope.paymentForm.amount);
				payFormData.append('paymentMode',$scope.paymentForm.paymentMode);
				
				
				if($scope.paymentForm.paymentMode == 'bank'){
					
					payFormData.append('bankName',$scope.paymentForm.BankName.bankName);
					payFormData.append('checkNumber',$scope.paymentForm.chequeNo);
				}
				
				payFormData.append('paymentTransaction',$scope.paymentForm.paymentTrn);
				  
				
				
				apiCall.postCall(apiPath.billPaymentRefund+$scope.billData.saleId+'/payment',payFormData).then(function(response){
					
					//console.log(response);
					if(angular.isObject(response) && response.hasOwnProperty('documentPath')){
						
						$modalInstance.close($scope.paymentForm.paymentTrn);
						
					}
					else{
						
						alert(response);
					}
					
				});
				 
				  
			}
		  
		  $scope.cancel = function(){
			  
			$scope.paymentForm = [];
			  
			 vm.dt1 = new Date();
			 
			 $scope.paymentForm.paymentTrn = 'payment';
		  }
	}
	/** End **/
}

imageGalleryModalCtrl.$inject = ["$rootScope","$scope", "$modalInstance","$http","apiCall","apiPath","$timeout","getSetFactory","$state","billData","formatType","validationMessage","apiResponse","transType"];
