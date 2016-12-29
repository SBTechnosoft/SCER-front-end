App.factory('apiCall', ["$http","$q","apiPath", function ($http,$q,apiPath) {
		
	return {
		 getCall : function(url){
			 
			var deferred = $q.defer();
			
			$http.get(url)
			.success(function (data) {
			
				deferred.resolve(data);

			})
			.error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
			
		},
		postCall : function(url,formdata){
			 var deferred = $q.defer();
			 
			$http({
				url: url,
				method: 'post',
				processData: false,
			   headers: {'Content-Type': undefined},
				data:formdata
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		getCallHeader : function(url,headerData){
			 
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
				headers: {'Content-Type': undefined},
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
			   headers: {'Content-Type': undefined},
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
			   headers: {'Content-Type': undefined},
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