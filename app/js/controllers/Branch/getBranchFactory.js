App.factory('apiCall', ["$http","$q","apiPath","$rootScope","$state","apiResponse", function ($http,$q,apiPath,$rootScope,$state,apiResponse) {
	
	var apiRootPath = $rootScope.erpPath;
	
	return {
		 getCall : function(url){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+url,
				method: 'get',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
				// dataType: 'jsonp',
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken}
			}).success(function(data, status, headers, config) {
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				
				deferred.resolve(data);
			});

			return deferred.promise;
			
		},
		postCall : function(url,formdata){
			 var deferred = $q.defer();
			 
			$http({
				url: apiRootPath+url,
				method: 'post',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
				data:formdata
			}).success(function(data, status, headers, config) {
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		patchCall : function(url,formdata){
			 var deferred = $q.defer();
			 
			$http({
				url: apiRootPath+url,
				method: 'patch',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
				data:formdata
			}).success(function(data, status, headers, config) {
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		getCallHeader : function(url,headerData){
			
			//var headerDataIn = headerData;
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+url,
				method: 'get',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: headerData
			}).success(function(data, status, headers, config) {
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				deferred.resolve(data);
			}).catch(function (reason) {
				
			  deferred.resolve(reason);
			  
		   });

			return deferred.promise;
			
		},
		postCallHeader : function(url,headerData,formdata){
			
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			var deferred = $q.defer();
			 
			$http({
				url: apiRootPath+url,
				method: 'post',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: headerData,
				data:formdata
			}).success(function(data, status, headers, config) {
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
					
				}
				
				deferred.resolve(data);
			}).catch(function (reason) {
				
			  deferred.resolve(reason);
			  
		   });
			
			return deferred.promise;
		},
		deleteCall : function(url){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+url,
				method: 'delete',
				processData: false,
				headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				deferred.resolve(data);
				
			});

			return deferred.promise;
			
		},
		getDefaultCompany : function(){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+apiPath.getAllCompany,
				method: 'get',
				processData: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				
				for(var i=0;i<data.length;i++){
					
					if(data[i].isDefault == 'ok')
					{
						deferred.resolve(data[i]);
						//return false;
					}
				}
			});

			return deferred.promise;
			
		},
		getDefaultBranch : function(){
			 
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+apiPath.getAllBranch,
				method: 'get',
				processData: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).success(function(data, status, headers, config) {
				
				if(apiResponse.noMatch == data || apiResponse.tokenExpired == data || apiResponse.notExists == data){
					$state.go('page.login');
				}
				
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