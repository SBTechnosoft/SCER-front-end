App.factory('getLatestNumber', ["apiCall","apiPath", function (apiCall,apiPath) {
	
	//var erpPath = $rootScope.erpPath;
	
	
	return  { 
		 getInvoice : function(response){
			 var latestNumber;
			var label = response.invoiceLabel;
			var invoiceEndAt = response.endAt;
			if(response.invoiceType=='postfix'){
				
				latestNumber = label+invoiceEndAt;
			}
			else{
				
				latestNumber = invoiceEndAt+label;
				
			}
		
		return latestNumber;
			
		},
		 getJobcard : function(response){
			 var jobcardlatestNumber;
			var label = response.jobCardNumberLabel;
			var jobcardEndAt = response.endAt;
			if(response.jobCardNumberType=='postfix'){
				
				jobcardlatestNumber = label+jobcardEndAt;
			}
			else{
				
				jobcardlatestNumber = jobcardEndAt+label;
				
			}
		
		return jobcardlatestNumber;
			
		}
	};
	
	
}]);