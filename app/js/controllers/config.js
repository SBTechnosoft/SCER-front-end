
/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'appDependencies',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider,appDependencies) {
      'use strict';

      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

      // LAZY LOAD MODULES
      // ----------------------------------- 

      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: appDependencies.modules
      });


      // default route to dashboard
      $urlRouterProvider.otherwise('/page/login');

      // 
      // App Routes
      // -----------------------------------   
      $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: basepath('app.html?r='+Math.random()),
            controller: 'AppController',
            resolve: requireDeps('icons', 'screenfull', 'sparklines', 'slimscroll', 'toaster', 'ui.knob', 'animate')
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: basepath('dashboard.html?r='+Math.random()),
            resolve: requireDeps('flot-chart','flot-chart-plugins')
        })
        .state('app.buttons', {
            url: '/buttons',
            templateUrl: basepath('buttons.html')
        })
        .state('app.palette', {
            url: '/palette',
            templateUrl: basepath('palette.html')
        })
        .state('app.notifications', {
            url: '/notifications',
            templateUrl: basepath('notifications.html'),
            controller: 'NotificationController'
        })
        .state('app.bootstrapui', {
            url: '/bootstrapui',
            templateUrl: basepath('bootstrap-ui.html')
        })
        .state('app.panels', {
            url: '/panels',
            templateUrl: basepath('panels.html')
        })
        .state('app.portlets', {
            url: '/portlets',
            templateUrl: basepath('portlets.html'),
            resolve: requireDeps('jquery-ui')
        })
        .state('app.maps-google', {
            url: '/maps-google',
            templateUrl: basepath('maps-google.html'),
            resolve: requireDeps('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'AngularGM')
        })
        .state('app.maps-vector', {
            url: '/maps-vector',
            templateUrl: basepath('maps-vector.html'),
            resolve: requireDeps('vector-map', 'vector-map-maps')
        })
        .state('app.grid', {
            url: '/grid',
            templateUrl: basepath('grid.html')
        })
        .state('app.grid-masonry', {
            url: '/grid-masonry',
            templateUrl: basepath('grid-masonry.html')
        })
        .state('app.typo', {
            url: '/typo',
            templateUrl: basepath('typo.html')
        })
        .state('app.icons-feather', {
            url: '/icons-feather',
            templateUrl: basepath('icons-feather.html')
        })
        .state('app.icons-fa', {
            url: '/icons-fa',
            templateUrl: basepath('icons-fa.html')
        })
        .state('app.icons-weather', {
            url: '/icons-weather',
            templateUrl: basepath('icons-weather.html')
        })
        .state('app.icons-climacon', {
            url: '/icons-climacon',
            templateUrl: basepath('icons-climacon.html')
        })
        .state('app.AddCompany', {
            url: '/AddCompany/:id',
            templateUrl: basepath('Company/AddCompany.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','fileUpload','getBranchSrv','toaster')
        })
		//Show Branch
		.state('app.Branch', {
            url: '/Branch',
            templateUrl: 'app/views/Branch/Branch.html?r='+Math.random(),
			controller: 'BranchController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv')
        })
		//Add Branch
		.state('app.AddBranch', {
            url: '/AddBranch/:id',
            templateUrl: basepath('Branch/AddBranch.html?r='+Math.random()),
			//controller: 'AddBranchController as form',
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Show Staff
		.state('app.Staff', {
            url: '/Staff',
            templateUrl: basepath('Staff/Staff.html?r='+Math.random()),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen')
        })
		//Add Staff
		.state('app.AddStaff', {
            url: '/AddStaff',
            templateUrl: basepath('Staff/AddStaff.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg')
        })
		//Invoice#
		.state('app.Invoice', {
            url: '/Invoice',
            templateUrl: basepath('Invoice/Invoice.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider','wysiwyg','ngTable','ngTableExport','getBranchSrv')
        })
		//Quotation#
		.state('app.Quotation', {
            url: '/Quotation',
            templateUrl: basepath('Quotation/Quotation.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider','wysiwyg','ngTable','ngTableExport','getBranchSrv')
        })
		/*** Template ***/
		//General
		.state('app.tempGeneral', {
            url: '/tempGeneral',
            templateUrl: basepath('Template/General.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','getBranchSrv','toaster')
        })
		/*** End Template ***/
		//Add Inventory Product
		.state('app.AddInvProduct', {
            url: '/AddInvProduct/:id',
            templateUrl: basepath('Inventory/Product/AddInvProduct.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Show Inventory Product
		.state('app.InvProduct', {
            url: '/InvProduct',
            templateUrl: basepath('Inventory/Product/InvProduct.html?r='+Math.random()),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv')
        })
		//Add Inventory Stock
		.state('app.AddInvStock', {
            url: '/AddInvStock',
            templateUrl: basepath('Inventory/StockRegister/AddInvStock.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster')
        })
		//Show Inventory Stock
		.state('app.InvStock', {
            url: '/InvStock',
            templateUrl: basepath('Inventory/StockRegister/InvStock.html?r='+Math.random()),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv')
        })
		//Show Inventory Category
		.state('app.InvCategory', {
            url: '/InvCategory',
            templateUrl: basepath('Inventory/Category/InvCategory.html?r='+Math.random()),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','treeGrid','getBranchSrv','toaster')
        })
		//Show Inventory Group
		.state('app.InvGroup', {
            url: '/InvGroup',
            templateUrl: basepath('Inventory/Group/InvGroup.html?r='+Math.random()),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','treeGrid','getBranchSrv','toaster')
        })
		//Accounting Sales
		.state('app.AccSales', {
            url: '/AccSales',
			controller: 'AccSalesController as form',
            templateUrl: basepath('Accounting/Sales/AccSales.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','getBranchSrv','toaster')
        })
		//Accounting View Sales
		.state('app.AccViewSales', {
            url: '/AccViewSales',
            templateUrl: basepath('Accounting/Sales/AccViewSales.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Sales
		.state('app.AccDataSales', {
            url: '/AccDataSales',
            templateUrl: basepath('Accounting/Sales/AccDataSales.html?r='+Math.random()),
			controller: 'AccDataSalesController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Purchase
		.state('app.AccPurchase', {
            url: '/AccPurchase',
            templateUrl: basepath('Accounting/Purchase/AccPurchase.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','getBranchSrv','toaster')
        })
		//Accounting View Purchase
		.state('app.AccViewPurchase', {
            url: '/AccViewPurchase',
            templateUrl: basepath('Accounting/Purchase/AccViewPurchase.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Purchase
		.state('app.AccDataPurchase', {
            url: '/AccDataPurchase',
            templateUrl: basepath('Accounting/Purchase/AccDataPurchase.html?r='+Math.random()),
			controller: 'AccDataPurchaseController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting View Credit Notes
		.state('app.AccViewCreditNotes', {
            url: '/AccViewCreditNotes',
            templateUrl: basepath('Accounting/CreditNotes/AccViewCreditNotes.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Credit Notes
		.state('app.AccDataCreditNotes', {
            url: '/AccDataCreditNotes',
            templateUrl: basepath('Accounting/CreditNotes/AccDataCreditNotes.html?r='+Math.random()),
			controller: 'AccDataCreditNotesController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting View Debit Notes
		.state('app.AccViewDebitNotes', {
            url: '/AccViewDebitNotes',
            templateUrl: basepath('Accounting/DebitNotes/AccViewDebitNotes.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Debit Notes
		.state('app.AccDataDebitNotes', {
            url: '/AccDataDebitNotes',
            templateUrl: basepath('Accounting/DebitNotes/AccDataDebitNotes.html?r='+Math.random()),
			controller: 'AccDataCreditNotesController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Special journal
		.state('app.AccSpecialJrnl', {
            url: '/AccSpecialJrnl',
            templateUrl: basepath('Accounting/SpecialJournal/AccSpecialJrnl.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider','wysiwyg','getBranchSrv','toaster')
        })
		//Accounting View Special journal
		.state('app.AccViewSpecialJrnl', {
            url: '/AccViewSpecialJrnl',
            templateUrl: basepath('Accounting/SpecialJournal/AccViewSpecialJrnl.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Special journal
		.state('app.AccDataSpecialJrnl', {
            url: '/AccDataSpecialJrnl',
            templateUrl: basepath('Accounting/SpecialJournal/AccDataSpecialJrnl.html?r='+Math.random()),
			controller: 'AccDataSpecialJrnlController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Payment
		.state('app.AccPayment', {
            url: '/AccPayment',
            templateUrl: basepath('Accounting/Payment/AccPayment.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider','wysiwyg','getBranchSrv')
        })
		//Accounting View Payment
		.state('app.AccViewPayment', {
            url: '/AccViewPayment',
            templateUrl: basepath('Accounting/Payment/AccViewPayment.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Payment
		.state('app.AccDataPayment', {
            url: '/AccDataPayment',
            templateUrl: basepath('Accounting/Payment/AccDataPayment.html?r='+Math.random()),
			controller: 'AccDataPaymentController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Receipt
		.state('app.AccReceipt', {
            url: '/AccReceipt',
            templateUrl: basepath('Accounting/Receipt/AccReceipt.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','getBranchSrv')
        })
		//Accounting View Receipt
		.state('app.AccViewReceipt', {
            url: '/AccViewReceipt',
            templateUrl: basepath('Accounting/Receipt/AccViewReceipt.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Receipt
		.state('app.AccDataReceipt', {
            url: '/AccDataReceipt',
            templateUrl: basepath('Accounting/Receipt/AccDataReceipt.html?r='+Math.random()),
			controller: 'AccDataReceiptController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting View Taxation
		.state('app.AccViewTaxation', {
            url: '/AccViewTaxation',
            templateUrl: basepath('Accounting/Taxation/AccViewTaxation.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','toaster','getBranchSrv')
        })
		//Accounting Data Taxation
		.state('app.AccDataTaxation', {
            url: '/AccDataTaxation',
            templateUrl: basepath('Accounting/Taxation/AccDataTaxation.html?r='+Math.random()),
			controller: 'AccDataTaxationController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Ledger
		.state('app.AccLedger', {
            url: '/AccLedger',
            templateUrl: basepath('Accounting/Ledger/Ledger.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','ngTable', 'ngTableExport','getBranchSrv','toaster')
        })
		//Accounting Data Ledger
		.state('app.AccDataLedger', {
            url: '/AccDataLedger',
            templateUrl: basepath('Accounting/Ledger/AccDataLedger.html?r='+Math.random()),
			controller: 'AccDataLedgerController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		/*** Quick Menu ***/
		//Bill
		.state('app.Bill', {
            url: '/Bill',
            templateUrl: basepath('QuickMenu/Bill.html?r='+Math.random()),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen', 'slider', 'wysiwyg','getBranchSrv')
        })
		/*** End Quick Menu ***/
        .state('app.form-validation', {
            url: '/form-validation',
            templateUrl: basepath('form-validation.html')
        })
        .state('app.form-wizard', {
            url: '/form-wizard',
            templateUrl: basepath('form-wizard.html')
        })
        .state('app.charts', {
            url: '/charts',
            templateUrl: basepath('charts.html'),
            resolve: requireDeps('flot-chart','flot-chart-plugins')
        })
        .state('app.table-responsive', {
            url: '/table-responsive',
            templateUrl: basepath('table-responsive.html')
        })
        .state('app.Company', {
            url: '/Company',
            templateUrl: basepath('Company/Company.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','getBranchSrv')
        })
        .state('app.calendar', {
            url: '/calendar',
            templateUrl: basepath('calendar.html'),
            resolve: requireDeps('jquery-ui', 'moment', 'ui.calendar', 'gcal')
        })
        .state('app.invoice', {
            url: '/invoice',
            templateUrl: basepath('invoice.html')
        })
        .state('app.search', {
            url: '/search',
            templateUrl: basepath('search.html'),
            resolve: requireDeps('moment',  'angular-chosen', 'slider')
        })
        .state('app.price', {
            url: '/price',
            templateUrl: basepath('price-table.html')
        })
        .state('app.tasks', {
            url: '/tasks',
            templateUrl: basepath('tasks.html'),
            controller: 'TasksController as taskctrl'
        })
        .state('app.template', {
            url: '/template',
            templateUrl: basepath('template.html')
        })
        .state('app.documentation', {
            url: '/documentation',
            templateUrl: basepath('documentation.html'),
            resolve: requireDeps('flatdoc')
        })
        // Mailbox
        // ----------------------------------- 
        .state('app.mailbox', {
            url: '/mailbox',
            abstract: true,
            templateUrl: basepath('mailbox.html'),
            resolve: requireDeps('moment')
        })
        .state('app.mailbox.folder', {
            url: '/folder',
            abstract: true
        })
        .state('app.mailbox.folder.list', {
            url: '/:folder',
            views: {
              'container@app.mailbox': {
                templateUrl: basepath('mailbox-folder.html')
              }
            }
        })
        .state('app.mailbox.folder.list.view', {
            url: '/:id',
            views: {
              'mails@app.mailbox.folder.list': {
                templateUrl: basepath('mailbox-view-mail.html')
              }
            },
            resolve: requireDeps('wysiwyg')
        })
        .state('app.mailbox.compose', {
            url: '/compose',
            views: {
              'container@app.mailbox': {
                templateUrl: basepath('mailbox-compose.html')
              }
            },
            resolve: requireDeps('wysiwyg')
        })
        // 
        // Single Page Routes
        // ----------------------------------- 
        .state('page', {
            url: '/page',
            templateUrl: 'app/pages/page.html',
            resolve: requireDeps('icons', 'animate')
        })
        .state('page.login', {
            url: '/login',
            templateUrl: 'app/pages/login.html'
        })
        .state('page.register', {
            url: '/register',
            templateUrl: 'app/pages/register.html'
        })
        .state('page.recover', {
            url: '/recover',
            templateUrl: 'app/pages/recover.html'
        })
        .state('page.lock', {
            url: '/lock',
            templateUrl: 'app/pages/lock.html'
        })
        // 
        // CUSTOM RESOLVE FUNCTION
        //   Add your own resolve properties
        //   following this object extend
        //   method
        // ----------------------------------- 
        // .state('app.yourRouteState', {
        //   url: '/route_url',
        //   templateUrl: 'your_template.html',
        //   controller: 'yourController',
        //   resolve: angular.extend(
        //     requireDeps(...), {
        //     // YOUR CUSTOM RESOLVES HERE
        //     }
        //   )
        // })
        ;


        // Change here your views base path
        function basepath(uri) {
          return 'app/views/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.appDependencies
        // Also accept functions that returns a promise
        function requireDeps() {
          var _args = arguments;
          return {
            deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
              // Creates a promise chain for each argument
              var promise = $q.when(1); // empty promise
              for(var i=0, len=_args.length; i < len; i ++){
                promise = addThen(_args[i]);
              }
              return promise;

              // creates promise to chain dynamically
              function addThen(_arg) {
                // also support a function that returns a promise
                if(typeof _arg == 'function')
                    return promise.then(_arg);
                else
                    return promise.then(function() {
                      // if is a module, pass the name. If not, pass the array
                      var whatToLoad = getRequired(_arg);
                      // simple error check
                      if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                      // finally, return a promise
                      return $ocLL.load( whatToLoad );
                    });
              }
              // check and returns required data
              // analyze module items with the form [name: '', files: []]
              // and also simple array of script files (for not angular js)
              function getRequired(name) {
                if (appDependencies.modules)
                    for(var m in appDependencies.modules)
                        if(appDependencies.modules[m].name && appDependencies.modules[m].name === name)
                            return appDependencies.modules[m];
                return appDependencies.scripts && appDependencies.scripts[name];
              }

            }]};
        }


}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/langs/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.app-container > section';
}]).config(['$httpProvider', function($httpProvider) {
	// $httpProvider.defaults.useXDomain = true;
  // $httpProvider.defaults.withCredentials = true;
  // delete $httpProvider.defaults.headers.common["X-Requested-With"];
// $httpProvider.defaults.headers.common["Accept"] = "application/json";
// $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}]);
