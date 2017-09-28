App.factory('productFactory',['apiCall','apiPath','apiResponse','$q','fetchArrayService', function(apiCall,apiPath,apiResponse,$q,fetchArrayService) {
	 'use strict';
	 
	var savedData = null;
	
	function setUpdatedProduct(productId) {
		var deferredMenu = $q.defer();
			apiCall.getCall(apiPath.getAllProduct+'/'+productId).then(function(data){
				if(angular.isObject(data)){
					fetchArrayService.setUpdatedObject(savedData,data,productId,'productId');
				}
				deferredMenu.resolve(data);
			});
		return deferredMenu.promise;
	}
 
	function setNewProduct(companyId,productName,color,size,pushIt = true){
		var deferredMenu = $q.defer();
		// companyId == '' || productName == '' || color == '' || size == '' ? return 'Parameters are Mising or Wrong' : '';
		var searchPath = apiPath.getProductByCompany+companyId;
		var headerSearch = {'Content-Type': undefined,'productName':productName,'color':color,'size':size};
			apiCall.getCallHeader(searchPath,headerSearch).then(function(response){
				if(angular.isArray(response)){
					if(pushIt === true){
						savedData.push(response[0]);
					}
					deferredMenu.resolve(response[0]);
				}
				else{
					deferredMenu.resolve(response);
				}
			});
			
		return deferredMenu.promise;
	}
	
	function getProduct() {
		
	 var deferredMenu = $q.defer();
	 
		if(savedData !== null) {
			deferredMenu.resolve(savedData);
		} else {
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				if(angular.isArray(data)){
					savedData = data;
				}
				deferredMenu.resolve(data);
			})
		}
		return deferredMenu.promise;
	}
 
	function blankProduct() {
		savedData = null;
	}
 
	function getSingleProduct(proId){
		
		var deferredMenu = $q.defer();

		if(savedData !== null) {
			 deferredMenu.resolve(fetchArrayService.getfilteredSingleObject(savedData,proId,'productId'));
		} else {
			
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				if(angular.isArray(data)){
					savedData = data;
					deferredMenu.resolve(fetchArrayService.getfilteredSingleObject(data,proId,'productId'));
				}
				else{
					deferredMenu.resolve(data);
				}
			});
		}
		return deferredMenu.promise;
	}
	
	function getProductByCompany(compId){
		var deferredMenu = $q.defer();
		
		if(savedData !== null) {
			deferredMenu.resolve(fetchArrayService.getfilteredArray(savedData,compId,'company','companyId'));
		} else {
			apiCall.getCall(apiPath.getProductByCompany+compId).then(function(data) {
				deferredMenu.resolve(data);
			});
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				savedData = data;
				// deferredMenu.resolve(fetchArrayService.getfilteredArray(savedData,compId,'company','companyId'));
			});
		}
		return deferredMenu.promise;
	}
	
	function deleteSingleProduct(proId){
		var deferredMenu = $q.defer();
			if(proId != '' && proId != null && proId != undefined){
				apiCall.deleteCall(apiPath.getAllProduct+'/'+proId).then(function(response){
					if(apiResponse.ok == response){
						/** Splice **/
						var index = savedData.findIndex(function(o){
							 return o.productId == proId;
						})
						if (index !== -1) savedData.splice(index,1);
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
	
 return {
  setUpdatedProduct: setUpdatedProduct,
  setNewProduct: setNewProduct,
  getProduct: getProduct,
  blankProduct: blankProduct,
  getSingleProduct: getSingleProduct,
  getProductByCompany: getProductByCompany,
  deleteSingleProduct: deleteSingleProduct
 }

}]);
