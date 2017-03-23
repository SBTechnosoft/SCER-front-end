
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


      // default route to Login
      $urlRouterProvider.otherwise('/page/login');

      // 
      // App Routes
      // -----------------------------------   
      $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
			cache: false,
            templateUrl: basepath('app.html'),
            controller: 'AppController',
            resolve: requireDeps('icons', 'screenfull', 'sparklines', 'slimscroll', 'toaster', 'ui.knob', 'animate')
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: basepath('dashboard.html'),
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
            templateUrl: basepath('Company/AddCompany.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Show Branch
		.state('app.Branch', {
            url: '/Branch',
            templateUrl: 'app/views/Branch/Branch.html?r='+new Date().getTime(),
			controller: 'BranchController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Add Branch
		.state('app.AddBranch', {
            url: '/AddBranch/:id',
            templateUrl: basepath('Branch/AddBranch.html'),
			//controller: 'AddBranchController as form',
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Show Staff
		.state('app.Staff', {
            url: '/Staff',
            templateUrl: basepath('Staff/Staff.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Add Staff
		.state('app.AddStaff', {
            url: '/AddStaff',
            templateUrl: basepath('Staff/AddStaff.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Invoice#
		.state('app.Invoice', {
            url: '/Invoice',
            templateUrl: basepath('Invoice/Invoice.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','ngTable','ngTableExport','getBranchSrv','toaster')
        })
		//Quotation#
		.state('app.Quotation', {
            url: '/Quotation',
            templateUrl: basepath('Quotation/Quotation.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','ngTable','ngTableExport','getBranchSrv','toaster')
        })
		/*** Template ***/
		//General
		.state('app.tempGeneral', {
            url: '/tempGeneral',
            templateUrl: basepath('Template/General.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		/*** End Template ***/
		/*** Setting ***/
			//Option
			.state('app.SettingOption', {
				url: '/SettingOption',
				templateUrl: basepath('Setting/SettingOption/SettingOption.html'),
				resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
			})
		/*** End Setting ***/
		//Add Inventory Product
		.state('app.AddInvProduct', {
            url: '/AddInvProduct',
            templateUrl: basepath('Inventory/Product/AddInvProduct.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Show Inventory Product
		.state('app.InvProduct', {
            url: '/InvProduct',
            templateUrl: basepath('Inventory/Product/InvProduct.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Inventory Barcode Print Product
		.state('app.InvBarcodePrint', {
            url: '/InvBarcodePrint',
            templateUrl: basepath('Inventory/BarcodePrint/InvBarcodePrint.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Add Inventory Stock
		.state('app.AddInvStock', {
            url: '/AddInvStock',
            templateUrl: basepath('Inventory/StockRegister/AddInvStock.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv')
        })
		//Show Inventory Stock
		.state('app.InvStock', {
            url: '/InvStock',
            templateUrl: basepath('Inventory/StockRegister/InvStock.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Show Inventory Category
		.state('app.InvCategory', {
            url: '/InvCategory',
            templateUrl: basepath('Inventory/Category/InvCategory.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','treeGrid','getBranchSrv','toaster')
        })
		//Show Inventory Group
		.state('app.InvGroup', {
            url: '/InvGroup',
            templateUrl: basepath('Inventory/Group/InvGroup.html'),
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','treeGrid','getBranchSrv','toaster')
        })
		//Accounting Sales
		.state('app.AccSales', {
            url: '/AccSales',
			controller: 'AccSalesController as form',
            templateUrl: basepath('Accounting/Sales/AccSales.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Sales
		.state('app.AccViewSales', {
            url: '/AccViewSales',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'sales';
				}
			})
        })
		//Accounting Data Sales
		.state('app.AccDataSales', {
            url: '/AccDataSales',
            templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster'),{
				headerType: function(){
					return 'sales';
				}
			})
        })
		//Accounting View Retail Sales
		.state('app.AccViewRetailSales', {
            url: '/AccViewRetailSales',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'Retailsales';
				}
			})
        })
		//Accounting Data Retail Sales
		.state('app.AccDataRetailSales', {
            url: '/AccDataRetailSales',
            templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster'),{
				headerType: function(){
					return 'Retailsales';
				}
			})
        })
		//Accounting View Whole Sales
		.state('app.AccViewWholeSales', {
            url: '/AccViewWholeSales',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'Wholesales';
				}
			})
        })
		//Accounting Data Whole Sales
		.state('app.AccDataWholeSales', {
            url: '/AccDataWholeSales',
            templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster'),{
				headerType: function(){
					return 'Wholesales';
				}
			})
        })
		//Accounting Purchase
		.state('app.AccPurchase', {
            url: '/AccPurchase',
            templateUrl: basepath('Accounting/Purchase/AccPurchase.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Purchase
		.state('app.AccViewPurchase', {
            url: '/AccViewPurchase',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'purchase';
				}
			})
        })
		//Accounting Data Purchase
		.state('app.AccDataPurchase', {
            url: '/AccDataPurchase',
             templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster'),{
				headerType: function(){
					return 'purchase';
				}
			})
        })
		//Accounting View Credit Notes
		.state('app.AccViewCreditNotes', {
            url: '/AccViewCreditNotes',
            templateUrl: basepath('Accounting/CreditNotes/AccViewCreditNotes.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Accounting Data Credit Notes
		.state('app.AccDataCreditNotes', {
            url: '/AccDataCreditNotes',
            templateUrl: basepath('Accounting/CreditNotes/AccDataCreditNotes.html'),
			controller: 'AccDataCreditNotesController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting View Debit Notes
		.state('app.AccViewDebitNotes', {
            url: '/AccViewDebitNotes',
            templateUrl: basepath('Accounting/DebitNotes/AccViewDebitNotes.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Accounting Data Debit Notes
		.state('app.AccDataDebitNotes', {
            url: '/AccDataDebitNotes',
            templateUrl: basepath('Accounting/DebitNotes/AccDataDebitNotes.html'),
			controller: 'AccDataCreditNotesController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Special journal
		.state('app.AccSpecialJrnl', {
            url: '/AccSpecialJrnl',
            templateUrl: basepath('Accounting/SpecialJournal/AccSpecialJrnl.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Special journal
		.state('app.AccViewSpecialJrnl', {
            url: '/AccViewSpecialJrnl',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'specialJournal';
				}
			})
        })
		//Accounting Data Special journal
		.state('app.AccDataSpecialJrnl', {
            url: '/AccDataSpecialJrnl',
             templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster'),{
				headerType: function(){
					return 'specialJournal';
				}
			})
        })
		//Accounting Payment
		.state('app.AccPayment', {
            url: '/AccPayment',
            templateUrl: basepath('Accounting/Payment/AccPayment.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Payment
		.state('app.AccViewPayment', {
            url: '/AccViewPayment',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'payment';
				}
			})
        })
		//Accounting Data Payment
		.state('app.AccDataPayment', {
            url: '/AccDataPayment',
             templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster'),{
				headerType: function(){
					return 'payment';
				}
			})
        })
		//Accounting Receipt
		.state('app.AccReceipt', {
            url: '/AccReceipt',
            templateUrl: basepath('Accounting/Receipt/AccReceipt.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Receipt
		.state('app.AccViewReceipt', {
            url: '/AccViewReceipt',
            templateUrl: basepath('Accounting/viewData/AccView.html'),
			controller: 'AccViewController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv'),{
				viewDataType: function(){
					return 'receipt';
				}
			})
        })
		//Accounting Data Receipt
		.state('app.AccDataReceipt', {
            url: '/AccDataReceipt',
             templateUrl: basepath('Accounting/viewData/AccDataViews.html'),
			controller: 'AccViewDataController as table',
            resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster'),{
				headerType: function(){
					return 'receipt';
				}
			})
        })
		//Accounting Trail Balance
		.state('app.AccTrailBalance', {
            url: '/AccTrailBalance',
            templateUrl: basepath('Accounting/Statements/AccTrailBalance.html'),
			controller: 'AccTrailBalanceController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Accounting BalanceSheet
		.state('app.AccBalanceSheet', {
            url: '/AccBalanceSheet',
            templateUrl: basepath('Accounting/Statements/AccBalanceSheet.html'),
			controller: 'AccBalanceSheetController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Accounting Profit & Loss
		.state('app.AccProfitLoss', {
            url: '/AccProfitLoss',
            templateUrl: basepath('Accounting/Statements/AccProfitLoss.html'),
			controller: 'AccProfitLossController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Accounting Cash Flow
		.state('app.AccCashFlow', {
            url: '/AccCashFlow',
            templateUrl: basepath('Accounting/Statements/AccCashFlow.html'),
			controller: 'AccCashFlowController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','toaster')
        })
		//Accounting View Taxation
		.state('app.AccViewTaxation', {
            url: '/AccViewTaxation',
            templateUrl: basepath('Accounting/Taxation/AccViewTaxation.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','toaster','getBranchSrv')
        })
		//Accounting Data Taxation
		.state('app.AccDataTaxation', {
            url: '/AccDataTaxation',
            templateUrl: basepath('Accounting/Taxation/AccDataTaxation.html'),
			controller: 'AccDataTaxationController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins')
        })
		//Accounting Ledger
		.state('app.AccLedger', {
            url: '/AccLedger',
            templateUrl: basepath('Accounting/Ledger/Ledger.html'),
            resolve: requireDeps('moment', 'inputmask', 'angular-chosen','ngTable', 'ngTableExport','getBranchSrv','toaster')
        })
		//Accounting Data Ledger
		.state('app.AccDataLedger', {
            url: '/AccDataLedger',
            templateUrl: basepath('Accounting/Ledger/AccDataLedger.html'),
			controller: 'AccDataLedgerController as table',
            resolve: requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv','flot-chart','flot-chart-plugins','toaster')
        })
		/*** Quick Menu ***/
		//Retailsale Bill
		.state('app.RetailsaleBill', {
            url: '/RetailsaleBill',
            templateUrl: basepath('QuickMenu/RetailsaleBill.html'),
			controller: 'RetailsaleBillController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster','barcodeScanner'),{
				saleType: function(){
					
					return 'RetailsaleBill';
				}
			})
        })
		//WholeSale Bill
		.state('app.WholesaleBill', {
            url: '/WholesaleBill',
            templateUrl: basepath('QuickMenu/RetailsaleBill.html'),
			controller: 'RetailsaleBillController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster','barcodeScanner'),{
				saleType: function(){
					
					return 'WholesaleBill';
				}
			})
        })
		/*** End Quick Menu ***/
		
		/*** PriceList ***/
		//Form RetailSales
		.state('app.FormPriceListRetailSales', {
            url: '/FormPriceListRetailSales',
            templateUrl: basepath('PriceList/RetailSales/FormPriceListRetailSales.html'),
			controller: 'FormPriceListRetailSalesController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster'),{
				saleType: function(){
					
					return 'retail_sales';
				}
			})
        })
		//Show RetailSales
		.state('app.PriceListRetailSales', {
            url: '/PriceListRetailSales',
            templateUrl: basepath('PriceList/RetailSales/PriceListRetailSales.html'),
			controller: 'PriceListRetailSalesController as table',
			 resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','PriceListTreeGrid','angular-chosen','getBranchSrv'),{
				saleType: function(){
					
					return 'retail_sales';
				}
			})
        })
		//Form WholeSales
		.state('app.FormPriceListWholeSales', {
            url: '/FormPriceListWholeSales',
            templateUrl: basepath('PriceList/RetailSales/FormPriceListRetailSales.html'),
			controller: 'FormPriceListRetailSalesController as form',
            resolve: angular.extend(requireDeps('moment', 'inputmask', 'angular-chosen','getBranchSrv','toaster'),{
				saleType: function(){
					
					return 'whole_sales';
				}
			})
        })
		//Show WholeSales
		.state('app.PriceListWholeSales', {
            url: '/PriceListWholeSales',
            templateUrl: basepath('PriceList/RetailSales/PriceListRetailSales.html'),
			controller: 'PriceListRetailSalesController as table',
			 resolve: angular.extend(requireDeps('ngTable', 'ngTableExport','angular-chosen','getBranchSrv'),{
				saleType: function(){
					
					return 'whole_sales';
				}
			})
        })
		/*** End PriceList ***/
		
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
            resolve: requireDeps('ngTable', 'ngTableExport','getBranchSrv','toaster')
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
            templateUrl: 'app/pages/login.html?r='+Math.random()
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
          return 'app/views/' + uri + '?r='+Math.random();
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
