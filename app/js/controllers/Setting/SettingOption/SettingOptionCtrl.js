
App.controller('settingOptionController', settingOptionController);

function settingOptionController($rootScope,$scope,apiCall,apiPath,toaster,apiResponse,validationMessage) {
  'use strict';
  var vm = this;
 
  var formdata = new FormData();
  
	/* VALIDATION */
	
	$scope.errorMessage = validationMessage; //Error Messages In Constant
	
	/* VALIDATION END */
	
	/** Barcode Code **/
	
		//var barcodeFormData = new FormData();
		$scope.barcodeData = [];
		$scope.insertUpdateLabel;
		
		vm.barcodeWidthDrop = ["0.5","0.6","0.7","0.8","0.9","1","1.5","2"];  // Default-> 1.5
		vm.barcodeHeightDrop = ["40","50","60","70","80","90","100"];          // Default-> 40
		
		$scope.getOptionSettingData = function(){
			
			toaster.clear();
			
			apiCall.getCall(apiPath.settingOption).then(function(response2){
			
				if(apiResponse.noContent == response2){
					
					$scope.insertUpdateLabel = "Insert";
				}
				else{
					
					$scope.insertUpdateLabel = "Update";
					
					//console.log(response2);
					var cnt = response2.length;
					for(var ind = 0;ind<cnt;ind++){
						
						var arrayData = response2[ind];
						
						if(arrayData.settingType == "barcode"){
							
							$scope.barcodeData.barcodeHeight = arrayData.barcodeHeight;
							$scope.barcodeData.barcodeWidth = arrayData.barcodeWidth;
							
							break;
						}
						
					}
					
				}
			
			});
		
		}
		
		$scope.getOptionSettingData();
		
		$scope.flag = 0;
		$scope.changeInBarcodeData = function(key,value){
			
			$scope.flag = 1;
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