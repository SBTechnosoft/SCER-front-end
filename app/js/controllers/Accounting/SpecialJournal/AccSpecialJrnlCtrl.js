
/**=========================================================
 * Module: AccPaymentController.js
 * Controller for input components
 =========================================================*/

App.controller('AccSpecialJrnlController', AccSpecialJrnlController);

function AccSpecialJrnlController($scope,apiCall,apiPath,getSetFactory) {
  'use strict';
  
   var vm = this;
   var formdata  = new FormData();
   $scope.addAccJrnl = [];
   $scope.addAccJrnl.jfid;
   $scope.changeInArray;
   var getSetJfId; //For Update
   
	if(Object.keys(getSetFactory.get()).length){
		getSetJfId = getSetFactory.get();
		$scope.addAccJrnl.jfid = getSetJfId;
		//console.log(getSetJfId);
		getSetFactory.blank();
		
		// var getOneJrnlPath = apiPath.getOneJrnl+parseInt(getSetJfId);
	  
		// apiCall.getCall(getOneJrnlPath).then(function(response){
			
			// console.log(response);
		 
		// });
	}
	else{
		
		//console.log('Not');
		apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
			$scope.addAccJrnl.jfid = response.nextValue;
	
		});
	}
  
  
  /* Table */
	vm.AccSpecialJrnlTable = [];
	vm.AccSpecialJrnlTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
	
	$scope.addRow = function(){
		 
		 var data = {};
		data.amountType ='debit';
		data.ledgerId='';
		data.ledgerName ='';
		data.amount ='';
		vm.AccSpecialJrnlTable.push(data);

    };
	
	$scope.settabledata = function(item,index)
	{
		vm.AccSpecialJrnlTable[index].ledgerId = item.ledgerId;
		console.log(vm.AccSpecialJrnlTable);
		$scope.changeInArray = true;
	}
	
	//Auto suggest Client Name
	vm.clientNameDrop=[];
	apiCall.getCall(apiPath.getAllLedger).then(function(response3){
		
		vm.clientNameDrop = response3;
	
	});
	
	$scope.removeRow = function (idx) {
		vm.AccSpecialJrnlTable.splice(idx, 1);
	};
	
  /* End */
	
	 //Changed Data When Update
	$scope.changeSpecialJrnlData = function(Fname,value){
		
		console.log(Fname+'..'+value);
		if(formdata.get(Fname))
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
	formdata.append('entryDate',fdate);
	
	formdata.append('jfId',$scope.addAccJrnl.jfid);
	
	// if($scope.changeInArray){
		
		// var json = angular.copy(vm.AccSpecialJrnlTable);
		 
		// for(var i=0;i<json.length;i++){
			 
			// angular.forEach(json[i], function (value,key) {
				
				// formdata.append('data['+i+']['+key+']',value);
			// });
			
		// }
	// }
	
	var json = angular.copy(vm.AccSpecialJrnlTable);
		 
		for(var i=0;i<json.length;i++){
			 
			angular.forEach(json[i], function (value,key) {
				
				formdata.append('data['+i+']['+key+']',value);
			});
			
		}
	 
	 //Insert Special journal
	apiCall.postCall(apiPath.postJrnl,formdata).then(function(response){
		
		console.log(response);
		$scope.addAccJrnl = [];
		vm.dt1 = new Date();
		
		for(var i=0;i<json.length;i++){
			 
			angular.forEach(json[i], function (value,key) {
				
				formdata.delete('data['+i+']['+key+']',value);
			});
			
		}
		
		vm.AccSpecialJrnlTable = [{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""},{"amountType":"debit","ledgerId":"","ledgerName":"","amount":""}];
		
		 apiCall.getCall(apiPath.getJrnlNext).then(function(response){
		
			$scope.addAccJrnl.jfid = response.nextValue;
	
		});
	
		formdata.delete('jfId');
		formdata.delete('companyId');
		formdata.delete('entryDate');
	
	});
	
  }
 
  // Chosen data
  // ----------------------------------- 
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
}
AccSpecialJrnlController.$inject = ["$scope","apiCall","apiPath","getSetFactory"];