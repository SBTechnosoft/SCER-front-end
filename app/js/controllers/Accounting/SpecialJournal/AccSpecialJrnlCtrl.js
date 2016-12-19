
/**=========================================================
 * Module: AccPaymentController.js
 * Controller for input components
 =========================================================*/

App.controller('AccSpecialJrnlController', AccSpecialJrnlController);

function AccSpecialJrnlController($scope,apiCall,apiPath,getSetFactory,$modal,$log,$rootScope,toaster) {
  'use strict';
  
   var vm = this;
   var formdata  = new FormData();
   $scope.addAccJrnl = [];
   $scope.addAccJrnl.jfid;
   $scope.changeInArray = false;
   vm.AccSpecialJrnlTable = []; //Table Array
   vm.multiCurrentBalance = [];
   
   //Company Drop Down 
   vm.companyDrop = [];
	
	apiCall.getCall(apiPath.getAllCompany).then(function(responseCompanyDrop){
		
		vm.companyDrop = responseCompanyDrop;
	
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
  this.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  this.format = this.formats[0];
  
	//Date Picker End
	

	if(Object.keys(getSetFactory.get()).length){
		
		$scope.addAccJrnl.getSetJrnlId = getSetFactory.get();
		//$scope.addAccJrnl.jfid = $scope.addAccJrnl.getSetJrnlId;
		//console.log($scope.addAccJrnl.getSetJrnlId);
		getSetFactory.blank();
		
		var getOneJrnlPath = apiPath.getOneJrnl+parseInt($scope.addAccJrnl.getSetJrnlId);
	  
		apiCall.getCall(getOneJrnlPath).then(function(response){
			
			console.log(response);
			//Set JFID
			$scope.addAccJrnl.jfid = response[0].jfId;
			
			//Company DropDown Selection
			var companyDropPath = apiPath.getAllCompany+'/'+response[0].company.companyId;
			apiCall.getCall(companyDropPath).then(function(res2){
			
				$scope.addAccJrnl.companyDropDown = res2;
			});
			
			//Set Date
			var getResdate = response[0].entryDate;
			var splitedate = getResdate.split("-").reverse().join("-");
			vm.dt1 = new Date(splitedate);
			vm.minStart = new Date(splitedate);
			vm.maxStart = new Date(splitedate);
			
			//Set Table Array
			for(var i=0;i<response.length;i++){
				
				 var tempData = {};
				tempData.amountType = response[i].amountType;
				tempData.ledgerId= response[i].ledger.ledgerId;
				tempData.ledgerName = response[i].ledger.ledgerName;
				tempData.amount = parseInt(response[i].amount);
				
				vm.AccSpecialJrnlTable.push(tempData);
				
				//Set Current Balance 
				// var tempBalanceData = {};
				
				// tempBalanceData.contactNo = Math.floor((Math.random() * 1000000) + 100000);
				// tempBalanceData.amountType = data.journal[i].amountType;
				
				// vm.multiCurrentBalance.push(tempBalanceData);
			}
			//console.log(vm.AccSpecialJrnlTable);
		});
		
	}
	else{
		
		//console.log('Not');
		apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
			$scope.addAccJrnl.jfid = response.nextValue;
	
		});
		vm.AccSpecialJrnlTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
		
		vm.multiCurrentBalance = [{"contactNo":"","amountType":""},{"contactNo":"","amountType":""}];
	}
  
  
  /* Table */
	
	$scope.addRow = function(){
		 
		 var data = {};
		data.amountType ='debit';
		data.ledgerId='';
		data.ledgerName ='';
		data.amount ='';
		vm.AccSpecialJrnlTable.push(data);
		
		var balance = {};
		balance.contactNo = '';
		balance.amountType = '';
		vm.multiCurrentBalance.push(balance);
			
		$scope.changeInArray = true;

    };
	
	$scope.settabledata = function(item,index)
	{
		vm.multiCurrentBalance[index].contactNo = item.currentBalance;
		vm.multiCurrentBalance[index].amountType = item.currentBalanceType;
			
		vm.AccSpecialJrnlTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccSpecialJrnlTable);
		$scope.changeInArray = true;
	}
	
	$scope.removeRow = function (idx) {
		
		vm.AccSpecialJrnlTable.splice(idx, 1);
		vm.multiCurrentBalance.splice(idx, 1);
		$scope.changeInArray = true;
	};
	
  /* End */
	
	//Auto suggest Client Name
	vm.clientNameDrop=[];
	
	//Set JSuggest Data When Company
	$scope.changeCompany = function(Fname,value){
		
		//Auto suggest Client Name
		var jsuggestPath = apiPath.getLedgerJrnl+value;
		var headerData = {'Content-Type': undefined};
		
		apiCall.getCallHeader(jsuggestPath,headerData).then(function(response3){
			
			vm.clientNameDrop = response3;
		
		});
		
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
		
	}
	
	 //Changed Data When Update
	$scope.changeSpecialJrnlData = function(Fname,value){
		
		console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
	//Changed date
	// $scope.changeSpecialJrnlDate = function(Fname,value){
		
		// if(formdata.get(Fname))
		// {
			// formdata.delete(Fname);
		// }
		// var  date = new Date(vm.dt1);
		// var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		// console.log(Fname+'..'+fdate);
		// formdata.append(Fname,fdate);
	// }
	
	$scope.changeSpecialJrnlTable = function(){
		
		$scope.changeInArray = true;
		console.log($scope.changeInArray);
	}
	
	
  $scope.pop = function()
  {
	//console.log($scope.addAccJrnl.jfid);
						var  date = new Date(vm.dt1);
						var fdate  = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	//var fdate  = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

	// formdata.append('companyId',$scope.addAccJrnl.companyDropDown.companyId);
	
					if(formdata.has('entryDate'))
					{
						formdata.delete('entryDate');
					}
						formdata.append('entryDate',fdate);
						
	// if($scope.changeInArray){
		
		// var json = angular.copy(vm.AccSpecialJrnlTable);
		 
		// for(var i=0;i<json.length;i++){
			 
			// angular.forEach(json[i], function (value,key) {
				
				// formdata.append('data['+i+']['+key+']',value);
			// });
			
		// }
	// }
	
	
	if($scope.addAccJrnl.getSetJrnlId){
		
		
		var SpecialJtnlPath = apiPath.postJrnl+'/'+$scope.addAccJrnl.jfid;
		
		console.log(SpecialJtnlPath);
		console.log($scope.addAccJrnl.jfid);
		
		if($scope.changeInArray){
			
		
			var json = angular.copy(vm.AccSpecialJrnlTable);
			 
			for(var i=0;i<json.length;i++){
				 
				angular.forEach(json[i], function (value,key) {
					
					formdata.append('data['+i+']['+key+']',value);
				});
				
			}
			
		}
		
	}
	else{
		
		formdata.append('jfId',$scope.addAccJrnl.jfid);
		
		var SpecialJtnlPath = apiPath.postJrnl;
		
		console.log(SpecialJtnlPath);
		
		var json = angular.copy(vm.AccSpecialJrnlTable);
		 
		for(var i=0;i<json.length;i++){
			 
			angular.forEach(json[i], function (value,key) {
				
				formdata.append('data['+i+']['+key+']',value);
			});
			
		}
		
		$scope.changeInArray = true; // For Delete Array In FormData After Success
		
		
	}
	
	//Special Journal Insert Update Call
		apiCall.postCall(SpecialJtnlPath,formdata).then(function(response){
			
			console.log(response);
			vm.dt1 = new Date();
			vm.minStart = new Date();
			vm.maxStart = new Date();
			
			if($scope.changeInArray){
				
				console.log('Delete Array');
				for(var i=0;i<json.length;i++){
					 
					angular.forEach(json[i], function (value,key) {
						
						formdata.delete('data['+i+']['+key+']',value);
					});
					
				}
				
				$scope.changeInArray = false;
				
			}
			
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
			//Display Toaster Message
			if($scope.addAccJrnl.getSetJrnlId){
				toaster.pop('success', 'Title', 'Update Successfully');
				
			}
			else{
				toaster.pop('success', 'Title', 'Insert Successfully');
				
			}
			
			$scope.addAccJrnl = [];
			
			vm.AccSpecialJrnlTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
			
			vm.multiCurrentBalance = [{"contactNo":"","amountType":""},{"contactNo":"","amountType":""}];
			
			 apiCall.getCall(apiPath.getJrnlNext).then(function(response){
			
				$scope.addAccJrnl.jfid = response.nextValue;
		
			});
			
			
		
		});
	
	
  }
 

 
  // Timepicker
  // ----------------------------------- 
  this.mytime = new Date();

  this.hstep = 1;
  this.mstep = 15;

  this.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  this.ismeridian = true;
  this.toggleMode = function() {
    this.ismeridian = ! this.ismeridian;
  };

  this.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    this.mytime = d;
  };

  this.changed = function () {
    console.log('Time changed to: ' + this.mytime);
  };

  this.clear = function() {
    this.mytime = null;
  };

  // Input mask
  // ----------------------------------- 

  this.testoption = {
        "mask": "99-9999999",
        "oncomplete": function () {
            console.log();
            console.log(arguments,"oncomplete!this log form controler");
        },
        "onKeyValidation": function () {
            console.log("onKeyValidation event happend! this log form controler");
        }
    };

  //default value
  this.test1 = new Date();

  this.dateFormatOption = {
      parser: function (viewValue) {
          return viewValue ? new Date(viewValue) : undefined;
      },
      formatter: function (modelValue) {
          if (!modelValue) {
              return "";
          }
          var date = new Date(modelValue);
          return (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()).replace(/\b(\d)\b/g, "0$1");
      },
      isEmpty: function (modelValue) {
          return !modelValue;
      }
  };

  this.mask = { regex: ["999.999", "aa-aa-aa"]};

  this.regexOption = {
      regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}"
  };

  this.functionOption = {
   mask: function () {
      return ["[1-]AAA-999", "[1-]999-AAA"];
  }};

  // Bootstrap Wysiwyg
  // ----------------------------------- 
 
  this.editorFontFamilyList = [
    'Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact',
    'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
    'Times New Roman', 'Verdana'
  ];
  
  this.editorFontSizeList = [
    {value: 1, name: 'Small'},
    {value: 3, name: 'Normal'},
    {value: 5, name: 'Huge'}
  ];
  
  /**
  *
  Ledger Model Start
  *
  **/
	$scope.openLedger = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/myModalContent.html',
      controller: ModalLedgerCtrl,
      size: size
    });

    var state = $('#modal-state');
    modalInstance.result.then(function () {
      
		apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
			vm.clientNameDrop = response3;
	
		});
	
    }, function () {
      
    });
  };

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  var ModalLedgerCtrl = function ($scope, $modalInstance,$rootScope,apiCall,apiPath) {
	  
	$scope.stockModel=[];
	var formdata = new FormData();
	$scope.ledgerForm = [];	
	  
	//Get Company
	$scope.companyDrop=[];
	apiCall.getCall(apiPath.getAllCompany).then(function(response3){
		
		$scope.companyDrop = response3;
	
	});
	
	//Get State
	$scope.statesDrop=[];
	apiCall.getCall(apiPath.getAllState).then(function(response3){
		
		$scope.statesDrop = response3;
	
	});
	
	$scope.ChangeState = function(Fname,state)
	 {
		
		var getonecity = apiPath.getAllCity+state;
		
		//Get City
		apiCall.getCall(getonecity).then(function(response4){
			$scope.cityDrop = response4;
				
		});
		console.log(Fname+'...'+state);
			if(formdata.has(Fname))
			{
				formdata.delete(Fname);
			}
			
			formdata.append(Fname,state);
	}
	
	 $scope.underWhat=[];
	apiCall.getCall(apiPath.getAllLedgerGroup).then(function(response3){
		
		$scope.underWhat = response3;
	
	});
	
	$scope.setPcode = function(Fname,value) {
  		//console.log(value.ledgerGroupId);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value.ledgerGroupId);
  	}
  
	  $scope.invAffectDrop = [
		'yes',
		'no'
	  ]
	  
	  $scope.amountTypeDrop = [
		'debit',
		'credit'
	  ];
	  
	//Changed Data When Update
	$scope.changeLedgerData = function(Fname,value){
		//console.log(Fname+'..'+value);
		if(formdata.has(Fname))
		{
			formdata.delete(Fname);
		}
		formdata.append(Fname,value);
	}
	
	if($rootScope.ArraystockModel)
	{
		$scope.stockModel.state=$rootScope.ArraystockModel.state;
		$scope.stockModel.state2=$rootScope.ArraystockModel.state2;
		$scope.stockModel.state3=$rootScope.ArraystockModel.state3;
	}
  // $scope.stockModel.state;

    $scope.clickSave = function () {
		
		
		formdata.append('balanceFlag','opening');
		apiCall.postCall(apiPath.getAllLedger,formdata).then(function(response5){
		
			console.log(response5);
			$scope.ledgerForm = [];
			
			// Delete formdata  keys
			for (var key of formdata.keys()) {
			   formdata.delete(key); 
			}
			
			$modalInstance.close('closed');
		});
		
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
	
	
  };
  ModalLedgerCtrl.$inject = ["$scope", "$modalInstance","$rootScope","apiCall","apiPath"];
  /**
  *
  Ledger Model End
  *
  **/
}
AccSpecialJrnlController.$inject = ["$scope","apiCall","apiPath","getSetFactory","$modal", "$log","$rootScope","toaster"];