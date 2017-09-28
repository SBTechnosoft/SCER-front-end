App.service('fetchArrayService',[function() {
	 'use strict';
	 
	function getfilteredArray(arrayData,id,firstParam,secondParam = null){
		var StateArray = [];
		var cnt = arrayData.length;
		var productIndex=0;
		while(productIndex<cnt)
		{
			var singleProductData = arrayData[productIndex];
			var compareId = secondParam !== null ? singleProductData[firstParam][secondParam] : singleProductData[firstParam];
			if(compareId == id){
				StateArray.push(singleProductData);
			}
			productIndex++;
		}
		return StateArray;
	}
	
	function getfilteredSingleObject(arrayData,id,firstParam,secondParam = null){
		var cnt = arrayData.length;
		var productIndex=0;
		while(productIndex<cnt)
		{
			var singleProductData = arrayData[productIndex];
			var compareId = secondParam !== null ? singleProductData[firstParam][secondParam] : singleProductData[firstParam];
			if(compareId == id){
				return arrayData[productIndex];
				break;
			}
			productIndex++;
		}
	}
	
	function setUpdatedObject(arrayData,data,id,firstParam){
		var cnt = arrayData.length;
		var productIndex=0;
		while(productIndex<cnt)
		{
			var singleProductData = arrayData[productIndex];
			if(singleProductData[firstParam] == id){
				arrayData[productIndex] = data;
				break;
			}
			productIndex++;
		}
	}
		
	return {
		getfilteredArray: getfilteredArray,
		getfilteredSingleObject: getfilteredSingleObject,
		setUpdatedObject: setUpdatedObject
	}

}]);