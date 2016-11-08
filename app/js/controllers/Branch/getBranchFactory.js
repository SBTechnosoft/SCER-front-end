App.factory('apiCall', ["$http","$q", function ($http,$q) {
		
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
					
				}
					
			};
}]);