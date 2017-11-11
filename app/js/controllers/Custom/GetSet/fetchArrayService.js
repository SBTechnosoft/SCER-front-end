App.service('fetchArrayService',[function() {
	 'use strict';
	 
	function getfilteredArray(arrayData,id,firstParam,secondParam = null){
		var StateArray = [];
		var productIndex = arrayData.length;
		while(productIndex--){
			var singleProductData = arrayData[productIndex];
			var compareId = secondParam !== null ? singleProductData[firstParam][secondParam] : singleProductData[firstParam];
			if(compareId == id) StateArray.push(singleProductData);
		}
		return StateArray;
	}
	
	function getfilteredSingleObject(arrayData,id,firstParam,secondParam = null){
		var productIndex = arrayData.length;
		while(productIndex--){
			var singleProductData = arrayData[productIndex];
			var compareId = secondParam !== null ? singleProductData[firstParam][secondParam] : singleProductData[firstParam];
			if(compareId == id){
				return arrayData[productIndex];
			}
		}
	}
	
	function setUpdatedObject(arrayData,data,id,firstParam){
		var productIndex = arrayData.length;
		while(productIndex--){
			var singleProductData = arrayData[productIndex];
			if(singleProductData[firstParam] == id){
				arrayData[productIndex] = data;
				break;
			}
		}
	}
	
	//get Index Data
	function myIndexOfObject(a,b,f,c,d,e){
	 for(c=a.length,d=c*1;c--;){
	  if(a[c][f]==b)return a[c];
	  if(a[e=d-1-c][f]==b)return a[e];
	 }
	 return -1
	}

	//get Index
	function myIndexOf(a,b,f,c,d,e){
	 for(c=a.length,d=c*1;c--;){
	  if(a[c][f]==b)return a;
	  if(a[e=d-1-c][f]==b)return a;
	 }
	 return -1
	}

	return {
		getfilteredArray: getfilteredArray,
		getfilteredSingleObject: getfilteredSingleObject,
		setUpdatedObject: setUpdatedObject,
		myIndexOfObject:myIndexOfObject,
		myIndexOf:myIndexOf
	}

}]);