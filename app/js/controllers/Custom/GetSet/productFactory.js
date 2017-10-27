App.factory('productFactory',['apiCall','apiPath','apiResponse','$q','fetchArrayService', function(apiCall,apiPath,apiResponse,$q,fetchArrayService) {
	 'use strict';
	 
	var savedData = null;
	
	function setUpdatedProduct(productId) {
		return apiCall.getCall(apiPath.getAllProduct+'/'+productId).then(function(data){
			if(angular.isObject(data)){
				fetchArrayService.setUpdatedObject(savedData,data,productId,'productId');
			}
			return data;
		});
	}
 
	function setNewProduct(companyId,productName,color,size,pushIt = true){
		// companyId == '' || productName == '' || color == '' || size == '' ? return 'Parameters are Mising or Wrong' : '';
		var searchPath = apiPath.getProductByCompany+companyId;
		var headerSearch = {'Content-Type': undefined,'productName':productName,'color':color,'size':size};
			return apiCall.getCallHeader(searchPath,headerSearch).then(function(response){
				if(angular.isArray(response)){
					if(pushIt === true){
						savedData.push(response[0]);
					}
					return response[0];
				}
				else{
					return response;
				}
			});
	}
	
	function getProduct() {
		if(savedData !== null) {
			var deferredMenu = $q.defer();
				deferredMenu.resolve(savedData);
			return deferredMenu.promise;
		} else {
			return apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				if(angular.isArray(data)){
					savedData = data;
				}
				return data;
			})
		}
	}
 
	function blankProduct() {
		savedData = null;
	}
 
	function getSingleProduct(proId){
		if(savedData !== null) {
			var deferredMenu = $q.defer();
			 	deferredMenu.resolve(fetchArrayService.getfilteredSingleObject(savedData,proId,'productId'));
			 return deferredMenu.promise;
		} else {
			return apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				if(angular.isArray(data)){
					savedData = data;
					return fetchArrayService.getfilteredSingleObject(data,proId,'productId');
				}
				else{
					return data;
				}
			});
		}
	}
	
	function getProductByCompany(compId){
		if(savedData !== null) {
			var deferredMenu = $q.defer();
				deferredMenu.resolve(fetchArrayService.getfilteredArray(savedData,compId,'company','companyId'));
			return deferredMenu.promise;
		} else {
			getProduct();
			return apiCall.getCall(apiPath.getProductByCompany+compId).then(function(data) {
				return data;
			});
		}
	}
	
	function deleteSingleProduct(proId){
		if(proId != '' && proId != null && proId != undefined){
			return apiCall.deleteCall(apiPath.getAllProduct+'/'+proId).then(function(response){
				if(apiResponse.ok == response){
					/** Splice **/
					var index = fetchArrayService.myIndexOf(savedData,proId,'productId');
					if (index !== -1) savedData.splice(index,1);
					/** Splice **/
				}
				return response;
			});
		}
		else{
			var deferredMenu = $q.defer();
				deferredMenu.resolve('Product Parameter Not Proper');
			return deferredMenu.promise;
		}
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
