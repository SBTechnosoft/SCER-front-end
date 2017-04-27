
/**=========================================================
 * Module: ModalController
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
//$.getScript('app/vendor/ng-table/ng-table.min.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.initiate.js');
//$.getScript('app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.config.js');


App.controller('documentScanController',documentScanController);

function documentScanController($scope, $modalInstance,$rootScope,$http,apiCall,apiPath,$timeout,$state,$templateCache) {
  'use strict';
  
	// $scope.firstScript = "app/views/QuickMenu/DocumentScan/Resources/dynamsoft.webtwain.config.js?r="+Math.random();
	// $scope.randomNumber = Math.random();
	
	 var data = [];
	 var vm = this;
	
	  $scope.ok = function (msg) {
      $modalInstance.close(msg);
    };
	
	$scope.doneButton = function () {
		
		var ImageArray = [];
		
		if(DWObject.HowManyImagesInBuffer > 0){
		
			for(var setIndex = 0;setIndex < DWObject.HowManyImagesInBuffer;setIndex++){
				
				ImageArray[setIndex] = DWObject.GetImageURL(setIndex, 500, 500);
			}
			
			 $modalInstance.close(ImageArray);
			
		}
		else{
			
			$modalInstance.dismiss(ImageArray);
		}
		
		
		//DWObject.GetImageURL(0, 500, 500);
		//DWObject.HowManyImagesInBuffer
    };
	
	
	
	$scope.closeButton = function () {
		
		var ImageArray = [];
		
			
			$modalInstance.dismiss(ImageArray);
			
		//DWObject.GetImageURL(0, 500, 500);
		//DWObject.HowManyImagesInBuffer
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
	
	
	/** Twain Code **/
	
		var CurrentPathName = unescape(location.pathname);
	var CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
	var strHTTPServer = location.hostname;
	var strActionPage = CurrentPath + 'action/php.php';
	if (DWObject) {
		DWObject.destroy();
	}
	
var DWObject;
        $scope.DWT_AcquireImage= function(){
			
                 DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
				 
				 
               // var DWObject = Dynamsoft.WebTwainEnv;
	//DWObject.IfDisableSourceAfterAcquire = true; 
               DWObject.SelectSource();
         DWObject.OpenSource();
         DWObject.IfShowUI = false;
        // DWObject.IfFeederEnabled = true;

        // DWObject.IfAutoFeed = true;

         DWObject.XferCount = -1;

         DWObject.AcquireImage(); //using ADF  for scanning

		 

		  // console.log("dgdgdgg");

         // var strFileName;

         // var Digital = new Date();

         // var Month = Digital.getMonth() + 1;

         // var Day = Digital.getDate();

         // var Hour = Digital.getHours();

         // var Minute = Digital.getMinutes();

         // var Second = Digital.getSeconds();

         // var CurrentTime = Month + "_" + Day + "_" + Hour + "_" + Minute + "_" + Second;

		 

		DWObject.IfShowFileDialog = false;

         // strFileName = "/home/siliconbrain/public_html/siliconbrain/erp.siliconbrain.co.in/server/"+CurrentTime + ".pdf";
	// console.log(DWObject.clientId);



		

         //DWObject.SaveAsPDF(strFileName); //save each scanned image as a different PDF file 

		 //var Digital = new Date();
			//var uploadfilename = Digital.getMilliseconds(); // Uses milliseconds according to local time as the file name
			//DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'.
			//DWObject.HTTPPort = location.port;
			//DWObject.HTTPUploadAllThroughPostAsPDF(strHTTPServer, strActionPage, uploadfilename + ".pdf", OnHttpUploadSuccess, OnHttpServerReturnedSomething);
			
		// console.log("save");

		  console.log(DWObject.CurrentImageIndexInBuffer);
		  
		

			 if (DWObject.ErrorCode != 0) {  

				 alert (DWObject.ErrorString);

			 }

            }

			$scope.ClearScanned = function(){
				
				var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
				
				DWObject.RemoveAllImages();
				
				$modalInstance.dismiss('clear');
				
			}
			
	$scope.uploadImage = function() {
			var Digital = new Date();
			var uploadfilename = Digital.getMilliseconds(); // Uses milliseconds according to local time as the file name
			var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'.
			
			console.log(DWObject);
			DWObject.IfSSL = true;
			
			DWObject.HTTPPort = location.port;
			DWObject.HTTPUploadAllThroughPostAsPDF(strHTTPServer, strActionPage, uploadfilename + ".pdf", OnHttpUploadSuccess, OnHttpServerReturnedSomething);
		}
		
			
			
	$scope.OnHttpUploadSuccess = function() {

		console.log('successful');
		
	}
	
	$scope.getImage = function(){
	
		var DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
		console.log(DWObject.GetImageURL(0, 500, 500));
		
	}

	$scope.OnHttpServerReturnedSomething = function(errorCode, errorString, sHttpResponse) {
		console.log(errorString);
		
		var textFromServer = sHttpResponse;
	}
	
	

	/** End  **/
}

documentScanController.$inject = ["$scope", "$modalInstance","$rootScope","$http","apiCall","apiPath","$timeout","$state","$templateCache"];
