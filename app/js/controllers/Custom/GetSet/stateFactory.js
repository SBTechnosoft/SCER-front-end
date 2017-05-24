App.factory('stateCityFactory',['apiCall','apiPath','$q',function(apiCall,apiPath,$q) {
 var savedData = {};
 var cityData = {};
 
 function getCity() {
	 return cityData;
 }
 function getState() {
	var deferredMenu = $q.defer();
	 
	if(savedData.length > 0) {
		deferredMenu.resolve(savedData);
	} else {
		
		apiCall.getCall(apiPath.getOneCity).then(function(data) {
			cityData = data;
			
			apiCall.getCall(apiPath.getAllState).then(function(data) {
				savedData = data;

				deferredMenu.resolve(data);
			});
		});
	}

	return deferredMenu.promise;
 }
 
 
 function blankState() {
   savedData = {};
 }
 function blankCity() {
   cityData = {};
 }

	function getDefaultState(stateId){
		
		var Cnt = savedData.length;
		for(var y=0;y<Cnt;y++)
		{
			var stateData = savedData[y];
			if(stateData.stateAbb == stateId){
				return stateData;
				break;
			}
		}
		
		
	}
	
	function getDefaultStateCities(stateId){

		var StateArray = [];
		var Cnt = cityData.length;
		for(var y=0;y<Cnt;y++)
		{
			var cityArrayData = cityData[y];
			
			if(cityArrayData.state.stateAbb == stateId){
				StateArray.push(cityArrayData);
				//var index = cityData.findIndex(x => x.stateAbb==stateId);
				//StateArray.push(cityData[index]);  
				
			}
		}
		return StateArray;
	}
	
	function getDefaultCity(cityId){
		var Cnt = cityData.length;
		for(var y=0;y<Cnt;y++)
		{
			var cityArrayData = cityData[y];
			if(cityArrayData.cityId == cityId){
				return cityArrayData;
				break;
			}
		}
	}
	
		
 return {
  getState: getState,
  getCity: getCity,
  blankState: blankState,
  blankCity: blankCity,
  getDefaultState: getDefaultState,
  getDefaultStateCities: getDefaultStateCities,
  getDefaultCity: getDefaultCity
 }

}]);
