App.factory('apiCall', ["$http","$q","apiPath","$rootScope","$state", function ($http,$q,apiPath,$rootScope,$state) {
	
	//if($rootScope.$storage.authToken != 'undefined'){
		
		//var authToken = $rootScope.$storage.authToken;
		//console.log(authToken);
	// }
	// else{
		
		// $state.go("page.login");
		// console.log('else');
	// }
	
	
	return {
		 getCall : function(url){
			 
			var deferred = $q.defer();
			
			$http({
				url: url,
				method: 'get',
				processData: false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken}
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			});

			return deferred.promise;
			
		},
		postCall : function(url,formdata){
			 var deferred = $q.defer();
			 
			$http({
				url: url,
				method: 'post',
				processData: false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
				data:formdata
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		getCallHeader : function(url,headerData){
			
			//var headerDataIn = headerData;
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			var deferred = $q.defer();
			
			$http({
				url: url,
				method: 'get',
				processData: false,
			   headers: headerData
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			});

			return deferred.promise;
			
		},
		postCallHeader : function(url,headerData,formdata){
			
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			var deferred = $q.defer();
			 
			$http({
				url: url,
				method: 'post',
				processData: false,
			   headers: headerData,
				data:formdata
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		deleteCall : function(url){
			 
			var deferred = $q.defer();
			
			$http({
				url: url,
				method: 'delete',
				processData: false,
				headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				deferred.resolve(data);
				
			});

			return deferred.promise;
			
		},
		getDefaultCompany : function(){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiPath.getAllCompany,
				method: 'get',
				processData: false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				for(var i=0;i<data.length;i++){
					if(data[i].isDefault == 'ok')
					{
						deferred.resolve(data[i]);
						
					}
				}
			});

			return deferred.promise;
			
		},
		getDefaultBranch : function(){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiPath.getAllBranch,
				method: 'get',
				processData: false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				for(var i=0;i<data.length;i++){
					if(data[i].isDefault == 'ok')
					{
						deferred.resolve(data[i]);
						
					}
				}
			});

			return deferred.promise;
			
		}
			
	};
}]);