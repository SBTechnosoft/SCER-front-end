
App.service('sidebarMemu', ["$rootScope", "$http","userPermisionKey", function($rootScope, $http,userPermisionKey) {
  'use strict';
  var menuJson = 'server/sidebar/sidebar-items.json',
      menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
	  

  return {
    load: function() {

      $http.get(menuURL)
        .success(function(items) {

           $rootScope.menuItems = items;
           $rootScope.permissionKey = userPermisionKey.configuration;

        })
        .error(function(data, status, headers, config) {

          alert('Failure loading menu');

        });
    }
  };

}]);