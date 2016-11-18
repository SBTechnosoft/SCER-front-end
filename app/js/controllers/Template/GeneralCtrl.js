
/**=========================================================
 * Module: tempGeneralCtrl.js
 * Controller for input components
 =========================================================*/

App.controller('tempGeneralController', tempGeneralController);

function tempGeneralController($scope,apiCall,apiPath,toaster) {
  'use strict';
  var vm = this;
  $scope.generalTemp = [];
  var formdata = new FormData();
  
 
      tinymce.init({
       selector: "#textdesc",
	   height : "280",
       menu : {
        file   : {title : 'File'  , items : 'newdocument'},
        edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
        newmenu: {title : 'Setting', items : 'item1 item2 item3 item4 item5 item6 item7 item8 item9 item10 item11 item12 item13 item14 item15 item16 item17 item18 item19 item20 item21 item22 item23 item24 item25 item26'}
       },
       menubar: 'file edit newmenu',
       setup: function(editor) {
        editor.addMenuItem('item1', {
         text: 'Date',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[date]');
         }
        });
        editor.addMenuItem('item2', {
         text: 'Company',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[Company]');
         }
        });
        editor.addMenuItem('item3', {
         text: 'Contact',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[Contact]');
         }
        });
        editor.addMenuItem('item4', {
         text: 'Client Name',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[ClientName]');
         }
        });
        editor.addMenuItem('item5', {
         text: 'Invoice#',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[InvoiceNumber]');
         }
        });
        editor.addMenuItem('item6', {
         text: 'First Address',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[FirstAddress]');
         }
        });
        editor.addMenuItem('item7', {
         text: 'Second Address',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[SecondAddress]');
         }
        });
        editor.addMenuItem('item8', {
         text: 'State',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[State]');
         }
        });
        editor.addMenuItem('item9', {
         text: 'City',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[City]');
         }
        });
        
        editor.addMenuItem('item15', {
         text: 'Product items',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[ProductItems]');
         }
        });
        editor.addMenuItem('item16', {
         text: 'Total',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Total]');
         }
        });
        editor.addMenuItem('item17', {
         text: 'Tax',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Tax]');
         }
        });
        editor.addMenuItem('item18', {
         text: 'Grand Total',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[GrandTotal]');
         }
        });
        editor.addMenuItem('item19', {
         text: 'Advance',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Advance]');
         }
        });
        editor.addMenuItem('item20', {
         text: 'Balance',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Balance]');
         }
        });
        editor.addMenuItem('item21', {
         text: 'Payment Mode',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[PaymentMode]');
         }
        });
        editor.addMenuItem('item22', {
         text: 'Bank Name',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[BankName]');
         }
        });
        editor.addMenuItem('item23', {
         text: 'Cheque#',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[ChequeNumber]');
         }
        });
        editor.addMenuItem('item24', {
         text: 'Remark',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Remark]');
         }
        });
        
       }
       
       
      });
     

	//All Template In Right
	vm.AllTempRight = [];
	apiCall.getCall(apiPath.getAllTemplate).then(function(responseTemp){
		
		vm.AllTempRight = responseTemp;
	
	});
	
	//Save Tempalte ID For Update
	$scope.tempID;
	
	// Edit Template
	$scope.EditTemplate = function(id)
	{
	
		$scope.tempID = id;
		apiCall.getCall(apiPath.getAllTemplate+'/'+id).then(function(responseTemp){
		
			$scope.generalTemp.tempName = responseTemp.templateName;
			tinyMCE.get('textdesc').setContent(responseTemp.templateBody);
	
		});
	}
	
	// Update Template
	$scope.addUpTemplate = function()
	{
		formdata.append('templateName',$scope.generalTemp.tempName);
		formdata.append('templateBody',tinyMCE.get('textdesc').getContent());
		//formdata.append('templateType',addBranch.branchName);
	
		apiCall.postCall(apiPath.getAllTemplate+'/'+$scope.tempID,formdata).then(function(responseTemp){
			
			toaster.pop('success', '', 'Updated Successfully');
			$scope.generalTemp.tempName = '';
			tinyMCE.get('textdesc').setContent('');
			$scope.tempID = '';
	
		});
	}
	
	$scope.cancel = function()
	{
		$scope.generalTemp.tempName = '';
		tinyMCE.get('textdesc').setContent('');
	}
	
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
tempGeneralController.$inject = ["$scope","apiCall","apiPath","toaster"];