
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
         text: 'Client Name',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[ClientName]');
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
         text: 'Order Date',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[OrderDate]');
         }
        });
        editor.addMenuItem('item4', {
         text: 'Order Name',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[OrderName]');
         }
        });
        editor.addMenuItem('item5', {
         text: 'Venue',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[Venue]');
         }
        });
        editor.addMenuItem('item6', {
         text: 'Order Id',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[OrderId]');
         }
        });
        editor.addMenuItem('item7', {
         text: 'Client Charge',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[ClientCharge]');
         }
        });
        editor.addMenuItem('item8', {
         text: 'Discount',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[Discount]');
         }
        });
        editor.addMenuItem('item9', {
         text: 'Tax Amount',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[TaxAmt]');
         }
        });
        editor.addMenuItem('item10', {
         text: 'Total',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[Total]');
         }
        });
        editor.addMenuItem('item11', {
         text: 'Tax Rate',
         context: 'newmenu',
         onclick: function (){ 
           
          editor.insertContent('[TaxRate]');
         }
        });
        editor.addMenuItem('item12', {
         text: 'Delivery Date',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[DeliveryDate]');
         }
        });
        editor.addMenuItem('item13', {
         text: 'Organization',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Organization]');
         }
        });
        editor.addMenuItem('item14', {
         text: 'Banner_Img',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Banner_Img]');
         }
        });
        editor.addMenuItem('item15', {
         text: 'OrderDesc',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[OrderDesc]');
         }
        });
        editor.addMenuItem('item16', {
         text: 'Email',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Email]');
         }
        });
        editor.addMenuItem('item17', {
         text: 'HomeMob',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[HomeMob]');
         }
        });
        editor.addMenuItem('item18', {
         text: 'WorkMob',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[WorkMob]');
         }
        });
        editor.addMenuItem('item19', {
         text: 'Mobile',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[Mobile]');
         }
        });
        editor.addMenuItem('item20', {
         text: 'ADATE',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[ADATE]');
         }
        });
        editor.addMenuItem('item21', {
         text: 'INVID',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[INVID]');
         }
        });
        editor.addMenuItem('item22', {
         text: 'CLIENTADD',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[CLIENTADD]');
         }
        });
        editor.addMenuItem('item23', {
         text: 'CMPLOGO',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[CMPLOGO]');
         }
        });
        editor.addMenuItem('item24', {
         text: 'PAIDAMT',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[PAIDAMT]');
         }
        });
        editor.addMenuItem('item25', {
         text: 'REMAINAMT',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[REMAINAMT]');
         }
        });
        editor.addMenuItem('item26', {
         text: 'OPERATOR',
         context: 'newmenu',
         onclick: function (){           
          editor.insertContent('[OPERATOR]');
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