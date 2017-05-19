App.factory('productFactory',['apiCall','apiPath','$q', function(apiCall,apiPath,$q) {
	var savedData = {};
	
 
	function setProduct(data) {
		savedData = data;
	}
 
	function getProduct() {
		
	 var deferredMenu = $q.defer();
	 
		if(savedData.length > 0) {
			deferredMenu.resolve(savedData);
		} else {
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				savedData = data;

				deferredMenu.resolve(data);
			})
		}

		return deferredMenu.promise;
	}
 
	function blankProduct() {
		savedData = {};
	}
 

	function getSingleProduct(proId){
		
		var deferredMenu = $q.defer();
		
		if(savedData.length > 0) {
			
			var AllData = savedData;
				var Cnt = AllData.length;
				for(var y=0;y<Cnt;y++)
				{
					var stateData = AllData[y];
					if(stateData.productId == proId){
						deferredMenu.resolve(stateData);
						break;
					}
				}
				
		} else {
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				savedData = data;
				var AllData = data;
				var Cnt = AllData.length;
				for(var y=0;y<Cnt;y++)
				{
					var stateData = AllData[y];
					if(stateData.productId == proId){
						deferredMenu.resolve(stateData);
						break;
					}
				}
				
			})
		}
		
		return deferredMenu.promise;
		
	}
	
	function getProductByCompany(compId){
		var deferredMenu = $q.defer();
		
		console.log(compId);
		if(savedData.length > 0) {
			console.log('if');
			var AllData = savedData;
			
			var StateArray = [];
			var Cnt = AllData.length;
			for(var y=0;y<Cnt;y++)
			{
				var productArrayData = AllData[y];
				
				if(productArrayData.company.companyId == compId){
					
					StateArray.push(productArrayData);
					
				}
			}
			console.log(StateArray);
			deferredMenu.resolve(StateArray);
				
		} else {
				console.log('else');
			apiCall.getCall(apiPath.getAllProduct).then(function(data) {
				savedData = data;
				
				var AllData = data;
				var StateArray = [];
				var Cnt = AllData.length;
				for(var y=0;y<Cnt;y++)
				{
					var productArrayData = AllData[y];
					
					if(productArrayData.company.companyId == compId){
						
						StateArray.push(productArrayData);
						
					}
				}
		
				deferredMenu.resolve(StateArray);
			})
		}
		
		
		return deferredMenu.promise;
		
	}
	
		
 return {
  setProduct: setProduct,
  getProduct: getProduct,
  blankProduct: blankProduct,
  getSingleProduct: getSingleProduct,
  getProductByCompany: getProductByCompany
 }

}]);
