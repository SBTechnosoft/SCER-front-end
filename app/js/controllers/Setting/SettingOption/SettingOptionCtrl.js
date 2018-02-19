
App.controller('settingOptionController', settingOptionController);

function settingOptionController($rootScope,$scope,apiCall,apiPath,toaster,apiResponse,validationMessage) {
  'use strict';
  var vm = this;
 
  var formdata = new FormData();
  	

  	/*service-date */
  	$scope.enableDisableValue=false;
  	$scope.enableDisableChequeNoValue=false;
  	$scope.serviceData = [];

	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	/** Barcode Code **/
		//var barcodeFormData = new FormData();
		$scope.barcodeData = [];
		$scope.insertUpdateLabel;
		$scope.insertUpdateServiceLabel;
		$scope.insertUpdateChequeNoLabel;
		
		vm.barcodeWidthDrop = ["0.5","0.6","0.7","0.8","0.9","1","1.5","2"];  // Default-> 1.5
		vm.barcodeHeightDrop = ["40","50","60","70","80","90","100"];          // Default-> 40
		$scope.getOptionSettingData = function(){
			toaster.clear();
			apiCall.getCall(apiPath.settingOption).then(function(response2){
				var responseLength = response2.length;
				// console.log(response2);
				for(var arrayData=0;arrayData<responseLength;arrayData++)
				{
					if(angular.isObject(response2) || angular.isArray(response2))
					{
						if(response2[arrayData].hasOwnProperty("barcodeWidth")){
							$scope.insertUpdateLabel = "Update";
							var arrayData1 = response2[arrayData];
							if(arrayData1.settingType == "barcode"){
								$scope.barcodeData.barcodeHeight = arrayData1.barcodeHeight;
								$scope.barcodeData.barcodeWidth = arrayData1.barcodeWidth;
							}
						}
						else
						{
							$scope.insertUpdateLabel = "Insert";
						}
						if(response2[arrayData].hasOwnProperty("servicedateNoOfDays"))
						{
							$scope.insertUpdateServiceLabel = "Update";
							var arrayData1 = response2[arrayData];
							if(arrayData1.settingType == "servicedate"){
								$scope.enableDisableValue=true;
								$scope.serviceData.noOfDays = arrayData1.servicedateNoOfDays;
							}
						}
						else
						{
							$scope.insertUpdateServiceLabel = "Insert";
						}

						if(response2[arrayData].hasOwnProperty("chequeno"))
						{
							$scope.insertUpdateChequeNoLabel = "Update";
							var arrayData1 = response2[arrayData];
							if(arrayData1.settingType == "chequeno"){
								console.log(arrayData1.chequeno);
								$scope.enableDisableChequeNoValue = arrayData1.chequeno=="enable" ? true : false;
							}
						}
						else
						{
							$scope.insertUpdateChequeNoLabel = "Insert";
						}
					}
				}
			});
		}
		
		$scope.getOptionSettingData();
		
		$scope.flag = 0;
		$scope.serviceDataflag = 1;
		$scope.chequeNoflag = 1;
		$scope.changeInBarcodeData = function(key,value){
			
			$scope.flag = 1;
			// if(barcodeFormData.has(key)){
				
				// barcodeFormData.delete(key);
			// }
			
			// barcodeFormData.append(key,value);
		}
		$scope.changeInServiceData = function(key,value){
			
			$scope.serviceDataflag = 1;
			// if(barcodeFormData.has(key)){
				
				// barcodeFormData.delete(key);
			// }
			
			// barcodeFormData.append(key,value);
		}

		$scope.changeInChequeNo = function(key,value){
			
			$scope.chequeNoflag = 1;
			// if(barcodeFormData.has(key)){
				
				// barcodeFormData.delete(key);
			// }
			
			// barcodeFormData.append(key,value);
		}
		
		$scope.AddUpdateBarcodeSetting = function(){
			
			toaster.clear();
			
			if($scope.flag == 1){
				
				var barcodeFormData = new FormData();
				
				barcodeFormData.append('barcodeHeight',$scope.barcodeData.barcodeHeight);
				barcodeFormData.append('barcodeWidth',$scope.barcodeData.barcodeWidth);
				//barcodeFormData.append('settingType','barcode');
				
				if($scope.insertUpdateLabel == "Update"){
					var apiPostPatchCall = apiCall.patchCall;
				}
				else{
					var apiPostPatchCall = apiCall.postCall;
				}
				
				apiPostPatchCall(apiPath.settingOption,barcodeFormData).then(function(response){
				
					if(apiResponse.ok == response){
						
						
						$scope.getOptionSettingData();
						
						toaster.pop('success','Barcode',$scope.insertUpdateLabel+' Successfull');
						$scope.flag = 0 ;
						
					}
					else{
						
						toaster.pop('warning','Opps!!',response);
					}
				
				});
			}
			else{
				
				toaster.pop('info','Barcode','Please Change Data');
			}
			
		
			//console.log($scope.barcodeData);
		}

		//Add-Update service-date data
		$scope.AddUpdateServiceDateSetting = function(){
			
			toaster.clear();
			if($scope.serviceDataflag == 1){
				
				var serviceDateFormData = new FormData();
				
				serviceDateFormData.append('servicedateNoOfDays',$scope.serviceData.noOfDays);
				//barcodeFormData.append('settingType','barcode');
				
				if($scope.insertUpdateServiceLabel == "Update"){
					var apiPostPatchCall = apiCall.patchCall;
				}
				else{
					var apiPostPatchCall = apiCall.postCall;
				}
				
				apiPostPatchCall(apiPath.settingOption,serviceDateFormData).then(function(response){
				
					if(apiResponse.ok == response){
						
						
						$scope.getOptionSettingData();
						
						toaster.pop('success','Service-Date',$scope.insertUpdateServiceLabel+' Successfull');
						$scope.serviceDataflag = 0 ;
						
					}
					else{
						
						toaster.pop('warning','Opps!!',response);
					}
				
				});
			}
			else{
				
				toaster.pop('info','Service-Date','Please Change Data');
			}
			
		
			//console.log($scope.barcodeData);
		}
		
		/** End **/

		//Add-Update cheque-no data
		$scope.AddUpdateChequeNoSetting = function(){
			
			toaster.clear();
			if($scope.chequeNoflag == 1){
				var chequeNoFormData = new FormData();
				if($scope.enableDisableChequeNoValue==true)
				{
					chequeNoFormData.append('chequeno','enable');
				}
				else if($scope.enableDisableChequeNoValue==false)
				{
					chequeNoFormData.append('chequeno','disable');
				}
				if($scope.insertUpdateChequeNoLabel == "Update"){
					var apiPostPatchCall = apiCall.patchCall;
				}
				else{
					var apiPostPatchCall = apiCall.postCall;
				}
				
				apiPostPatchCall(apiPath.settingOption,chequeNoFormData).then(function(response){
					if(apiResponse.ok == response){
						
						$scope.getOptionSettingData();
						toaster.pop('success','Cheque-Number',$scope.insertUpdateChequeNoLabel+' Successfull');
						$scope.chequeNoflag = 0;
						
					}
					else{
						
						toaster.pop('warning','Opps!!',response);
					}
				
				});
			}
			else{
				
				toaster.pop('info','Cheque-Number','Please Change Data');
			}
			
		
			//console.log($scope.barcodeData);
		}
		
	/** End **/
	
	/** Color **/
	
	$scope.app = $rootScope.app;

		  $scope.themes = [
			{sidebar: 'bg-white br-inverse', brand: 'bg-info my-font-white', topbar:  'bg-inverse'},
			{sidebar: 'bg-inverse', brand: 'bg-inverse my-font-white', topbar:  'bg-white'},
			{sidebar: 'bg-inverse', brand: 'bg-purple my-font-white', topbar:  'bg-white'},
			{sidebar: 'bg-white br-success', brand: 'bg-success my-font-white', topbar:  'bg-inverse'},
			{sidebar: 'bg-white br', brand: 'bg-inverse my-font-white', topbar:  'bg-inverse'},
			{sidebar: 'bg-inverse', brand: 'bg-info my-font-white', topbar:  'bg-info'},
			{sidebar: 'bg-white br', brand: 'bg-purple my-font-white', topbar:  'bg-purple'},
			{sidebar: 'bg-white br', brand: 'bg-primary my-font-white', topbar:  'my-Topbar-Color'}
		  ];

		  $scope.setTheme = function($idx) {
			$scope.app.theme = $scope.themes[$idx];
		  };
		  
	/** End Color **/
	
  // Datepicker
  // ----------------------------------- 

  this.today = function() {
    this.dt = new Date();
  };
  this.today();

  this.clear = function () {
    this.dt = null;
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

  this.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  this.initDate = new Date('2016-15-20');
  this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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
settingOptionController.$inject = ["$rootScope","$scope","apiCall","apiPath","toaster","apiResponse","validationMessage"];