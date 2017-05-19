App.factory('stateCityFactory', function() {
 var savedData = {};
 var cityData = {};
 
 function setState(data) {
   savedData = data;
 }
 function setCity(data) {
   cityData = data;
 }
 
 function getState() {
  return savedData;
 }
 function getCity() {
  return cityData;
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
  setState: setState,
  setCity: setCity,
  getState: getState,
  getCity: getCity,
  blankState: blankState,
  blankCity: blankCity,
  getDefaultState: getDefaultState,
  getDefaultStateCities: getDefaultStateCities,
  getDefaultCity: getDefaultCity
 }

});
