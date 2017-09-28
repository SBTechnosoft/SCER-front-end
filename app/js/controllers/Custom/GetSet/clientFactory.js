App.factory('clientFactory',['apiCall','apiPath','apiResponse','$q','fetchArrayService', function(apiCall,apiPath,apiResponse,$q,fetchArrayService) {
	 'use strict';
	 
	var clientData = null;
	var clientProfessionData = null;
	var URL = apiPath.getAllClient;
	var professionUrl = apiPath.clientProfession;
	
	/** Cleint **/
		function setUpdatedClient(clientId,formdata) {
			var deferredMenu = $q.defer();
				apiCall.postCall(URL+'/'+clientId,formdata).then(function(data){
					if(angular.isObject(data)){
						fetchArrayService.setUpdatedObject(clientData,data,clientId,'clientId');
					}
					deferredMenu.resolve(data);
				});
			return deferredMenu.promise;
		}
	 
		function insertAndSetNewClient(formdata,cId = null,pushIt = true){
			var deferredMenu = $q.defer();
				var intUpdatePath = cId === null ? URL : URL+'/'+cId;
				apiCall.postCall(intUpdatePath,formdata).then(function(response){
					if(angular.isObject(response)){
						pushIt === true ? clientData.push(response) : fetchArrayService.setUpdatedObject(clientData,response,response.clientId,'clientId');;
					}
					deferredMenu.resolve(response);
				});
			return deferredMenu.promise;
		}
		
		function getSetNewClientByContact(contactNo,pushIt = true){
			var deferredMenu = $q.defer();
				var headerSearch = {'Content-Type': undefined,'contactNo':contactNo};
				apiCall.getCallHeader(URL,headerSearch).then(function(response){
					if(angular.isArray(response)){
						pushIt === true ? clientData.push(response[0]) : fetchArrayService.setUpdatedObject(clientData,response[0],response[0].clientId,'clientId');;
					}
					deferredMenu.resolve(response);
				});
			return deferredMenu.promise;
		}
		
		function getClient() {
			
		 var deferredMenu = $q.defer();
		 
			if(clientData !== null) {
				deferredMenu.resolve(clientData);
			} else {
				apiCall.getCall(URL).then(function(data) {
					if(angular.isArray(data)){
						clientData = data;
					}
					deferredMenu.resolve(data);
				})
			}
			return deferredMenu.promise;
		}
	 
		function blankClient() {
			clientData = null;
		}
	 
		function getSingleClient(cId){
			
			var deferredMenu = $q.defer();
			
			if(clientData !== null) {
				deferredMenu.resolve(fetchArrayService.getfilteredSingleObject(clientData,cId,'clientId'));
			} else {
				apiCall.getCall(URL+'/'+cId).then(function(data) {
					deferredMenu.resolve(data);
				});
				getClient();
			}
			return deferredMenu.promise;
		}
		
		function getClientByProfession(profId){
			var deferredMenu = $q.defer();
			
			if(clientData !== null) {
				deferredMenu.resolve(fetchArrayService.getfilteredArray(clientData,profId,'profession','professionId'));
			} else {
				getClient();
			}
			return deferredMenu.promise;
		}
		
	/** End Client **/
	
	/** Cleint Profession **/
		function setGetUpdatedProfession(profId) {
			var deferredMenu = $q.defer();
				apiCall.getCall(professionUrl+'/'+profId).then(function(data){
					if(angular.isObject(data)){
						fetchArrayService.setUpdatedObject(clientProfessionData,data,profId,'professionId');
					}
					deferredMenu.resolve(data);
				});
			return deferredMenu.promise;
		}
		
		function getSingleProfession(profId){
			
			var deferredMenu = $q.defer();
			
			if(clientProfessionData !== null) {
				deferredMenu.resolve(fetchArrayService.getfilteredSingleObject(clientProfessionData,profId,'professionId'));
			} else {
				apiCall.getCall(professionUrl+'/'+profId).then(function(data) {
					deferredMenu.resolve(data);
				});
				getProfession();
			}
			return deferredMenu.promise;
		}
		
		function getProfession() {
			var deferredMenu = $q.defer();
		 
			if(clientProfessionData !== null) {
				deferredMenu.resolve(clientProfessionData);
			} else {
				apiCall.getCall(professionUrl).then(function(data) {
					if(angular.isArray(data)){
						clientProfessionData = data;
					}
					deferredMenu.resolve(data);
				})
			}
			return deferredMenu.promise;
		}
		
		function insertAndUpdateProfession(formdata,profId = null){
			var deferredMenu = $q.defer();
				var profPath = profId === null ? professionUrl : professionUrl+'/'+profId;
				apiCall.postCall(profPath,formdata).then(function(response){
					if(apiResponse.ok == response){
						profId === null ? blankProfession() : '';
					}
					deferredMenu.resolve(response);
				});
			return deferredMenu.promise;
		}
		
		function blankProfession() {
			clientProfessionData = null;
		}
		
		function deleteSingleProfession(profId){
			var deferredMenu = $q.defer();
				if(profId != '' && profId != null && profId != undefined && profId != 0){
					apiCall.deleteCall(professionUrl+'/'+profId).then(function(response){
						if(apiResponse.ok == response){
							/** Splice **/
							var index = clientProfessionData.findIndex(function(o){
								 return o.professionId == profId;
							});
							if (index !== -1) clientProfessionData.splice(index,1);
							/** Splice **/
						}
						deferredMenu.resolve(response);
					});
				}
				else{
					deferredMenu.resolve('Product Parameter Not Proper');
				}
			return deferredMenu.promise;
		}
	/** End Cleint Profession **/
	
 return {
  setUpdatedClient: setUpdatedClient,
  insertAndSetNewClient: insertAndSetNewClient,
  getSetNewClientByContact: getSetNewClientByContact,
  getClient: getClient,
  blankClient: blankClient,
  getSingleClient: getSingleClient,
  getClientByProfession: getClientByProfession,
  setGetUpdatedProfession: setGetUpdatedProfession,
  getSingleProfession: getSingleProfession,
  getProfession: getProfession,
  insertAndUpdateProfession: insertAndUpdateProfession,
  blankProfession: blankProfession,
  deleteSingleProfession: deleteSingleProfession
 }
}]);
