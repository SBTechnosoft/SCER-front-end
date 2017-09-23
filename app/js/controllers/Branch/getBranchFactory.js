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
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				
				deferred.resolve(response.data);
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
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				deferred.resolve(response.data);
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
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				deferred.resolve(response.data);
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
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				deferred.resolve(response.data);
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
			}).then(function(response) {
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
					
				}
				
				deferred.resolve(response.data);
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
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				deferred.resolve(response.data);
				
			});

			return deferred.promise;
			
		},
		deleteCallHeader : function(url,headerData){
			 
			headerData.authenticationToken = $rootScope.$storage.authToken;
			
			var deferred = $q.defer();
			
			$http({
				url: apiRootPath+url,
				method: 'delete',
				processData: false,
				headers: headerData,
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				deferred.resolve(response.data);
				
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
			}).then(function(response) {
				
				if(apiResponse.noMatch == response.data || apiResponse.tokenExpired == response.data || apiResponse.notExists == response.data){
					$state.go('page.login');
				}
				console.time('loop');
				var companyCnt = response.data.length;
				for(var i=0;i<companyCnt;i++){
					
					if(response.data[i].isDefault == 'ok')
					{
						deferred.resolve(response.data[i]);
						console.timeEnd('loop');
						break;
					}
				}
				console.time('func');
				var companyIndex = response.data.findIndex( x => x.isDefault == 'ok');
				console.log(response.data[companyIndex]);
				console.timeEnd('func');
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
				for(var i=0;i<branchCnt;i++){
					if(response.data[i].isDefault == 'ok')
					{
						deferred.resolve(response.data[i]);
						break;
					}
				}
			});

			return deferred.promise;
			
		}
			
	};
}]);