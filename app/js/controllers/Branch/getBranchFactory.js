App.factory('apiCall', ["$http","$q","apiPath","$rootScope","$state","apiResponse", function ($http,$q,apiPath,$rootScope,$state,apiResponse) {
	
	var apiRootPath = $rootScope.erpPath;
	
	return {
		 getCall : function(url){

			return $http({
				url: apiRootPath+url,
				method: 'get',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
				// dataType: 'jsonp',
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken}
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				
				return response.data;
			});
		},
		postCall : function(url,formdata){
			
			return $http({
				url: apiRootPath+url,
				method: 'post',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
				data:formdata
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				return response.data;
			});
		},
		patchCall : function(url,formdata){
			
			return $http({
				url: apiRootPath+url,
				method: 'patch',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
				data:formdata
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				return response.data;
			});
		},
		getCallHeader : function(url,headerData){
			
			//var headerDataIn = headerData;
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			return $http({
				url: apiRootPath+url,
				method: 'get',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: headerData
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				return response.data;
			}).catch(function (reason) {
				
			 return  reason;
			  
		   });
		},
		postCallHeader : function(url,headerData,formdata){
			
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			return $http({
				url: apiRootPath+url,
				method: 'post',
				processData: false,
				contentType: false,
				crossDomain:true,
				cache:false,
			   headers: headerData,
				data:formdata
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
					
				}
				
				return response.data;
			}).catch(function (reason) {
				
			 return reason;
			  
		   });
		},
		deleteCall : function(url){
			 
			return $http({
				url: apiRootPath+url,
				method: 'delete',
				processData: false,
				headers: {'Content-Type': undefined,'authenticationToken':$rootScope.$storage.authToken},
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				return response.data;
			});

		},
		deleteCallHeader : function(url,headerData){
			 
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			return $http({
				url: apiRootPath+url,
				method: 'delete',
				processData: false,
				headers: headerData,
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				return response.data;
				
			});
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
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				var companyCnt = response.data.length;
				var j=0;
				while(j<companyCnt){
					if(response.data[j].isDefault == 'ok')
					{
						deferred.resolve(response.data[j]);
						break;
					}
					j++;
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
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				var branchCnt = response.data.length;
				var i=0;
				while(i<branchCnt){
					if(response.data[i].isDefault == 'ok')
					{
						deferred.resolve(response.data[i]);
						break;
					}
					i++;
				}
			});

			return deferred.promise;
			
		}
			
	};
}]);