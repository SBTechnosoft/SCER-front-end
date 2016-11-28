
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

App
  .constant('appDependencies', {
    // jQuery based and standalone scripts
    scripts: {
      'animate':            ['app/vendor//animate.css/animate.min.css'],
      'icons':              ['app/vendor/fontawesome/css/font-awesome.min.css',
                             'app/vendor/weather-icons/css/weather-icons.min.css',
                             'app/vendor/feather/webfont/feather-webfont/feather.css'],
      'sparklines':         ['app/js/sparklines/jquery.sparkline.min.js'],
      'slider':             ['app/vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                             'app/vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css'],
      'wysiwyg':            ['app/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                             'app/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      'slimscroll':         ['app/vendor/slimscroll/jquery.slimscroll.min.js'],
      'screenfull':         ['app/vendor/screenfull/dist/screenfull.min.js'],
      'vector-map':         ['app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                             'app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
      'vector-map-maps':    ['app/vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                             'app/vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
      'loadGoogleMapsJS':   ['app/js/gmap/load-google-maps.js'],
      'flot-chart':         ['app/vendor/Flot/jquery.flot.js'],
      'flot-chart-plugins': ['app/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                             'app/vendor/Flot/jquery.flot.resize.js',
                             'app/vendor/Flot/jquery.flot.pie.js',
                             'app/vendor/Flot/jquery.flot.time.js',
                             'app/vendor/Flot/jquery.flot.categories.js',
                             'app/vendor/flot-spline/js/jquery.flot.spline.min.js'],
      'jquery-ui':          ['app/vendor/jquery-ui/jquery-ui.min.js',
                             'app/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
      'moment' :            ['app/vendor/moment/min/moment-with-locales.min.js'],
      'inputmask':          ['app/vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
      'flatdoc':            ['app/vendor/flatdoc/flatdoc.js'],
      'gcal':               ['app/vendor/fullcalendar/dist/gcal.js'],
	  'treeGrid':          ['app/vendor/tree-grid/treeGrid.css',
							 'app/vendor/tree-grid/tree-grid-directive.js'],
	  'fileUpload':          ['app/vendor/fileUpload/vendor/jquery.ui.widget.js',
						   'app/vendor/fileUpload/jquery.iframe-transport.js',
						   'app/vendor/fileUpload/jquery.fileupload.js',
						   'app/vendor/fileUpload/jquery.fileupload-process.js',
						   'app/vendor/fileUpload/jquery.fileupload-image.js',
						   'app/vendor/fileUpload/jquery.fileupload-audio.js',
						   'app/vendor/fileUpload/jquery.fileupload-video.js',
						   'app/vendor/fileUpload/jquery.fileupload-validate.js',
						   'app/vendor/fileUpload/jquery.fileupload-angular.js'],
	'getBranchSrv':			['app/js/controllers/Branch/getBranchFactory.js'],
	'tinymce':				['app/vendor/tinymce/js/tinymce/jquery.tinymce.min.js',
							'app/vendor/tinymce/js/tinymce/tinymce.min.js']
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'toaster',           files: ['app/vendor/angularjs-toaster/toaster.js',
                                          'app/vendor/angularjs-toaster/toaster.css']},
      {name: 'ui.knob',           files: ['app/vendor/angular-knob/src/angular-knob.js',
                                          'app/vendor/jquery-knob/dist/jquery.knob.min.js']},
      {name: 'angularFileUpload', files: ['app/vendor/angular-file-upload/dist/angular-file-upload.min.js']},
      {name: 'angular-chosen',    files: ['app/vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                          'app/vendor/chosen_v1.2.0/chosen.min.css',
                                          'app/vendor/angular-chosen/angular-chosen.min.js']},								  
      {name: 'ngTable',           files: ['app/vendor/ng-table/ng-table.min.js',
                                          'app/vendor/ng-table/ng-table.min.css']},
      {name: 'ngTableExport',     files: ['app/vendor/ng-table-export/ng-table-export.js']},
      {name: 'AngularGM',         files: ['app/vendor/AngularGM/angular-gm.min.js']},
      {name: 'ui.calendar',       files: ['app/vendor/fullcalendar/dist/fullcalendar.min.js',
                                          'app/vendor/fullcalendar/dist/fullcalendar.css',
                                          'app/vendor/angular-ui-calendar/src/calendar.js']}
    ]

  })
  // Same colors as defined in the css
  .constant('appColors', {
    'primary':                '#43a8eb',
    'success':                '#88bf57',
    'info':                   '#8293b9',
    'warning':                '#fdaf40',
    'danger':                 '#eb615f',
    'inverse':                '#363C47',
    'turquoise':              '#2FC8A6',
    'pink':                   '#f963bc',
    'purple':                 '#c29eff',
    'orange':                 '#F57035',
    'gray-darker':            '#2b3d51',
    'gray-dark':              '#515d6e',
    'gray':                   '#A0AAB2',
    'gray-light':             '#e6e9ee',
    'gray-lighter':           '#f4f5f5'
  })
  //Api Path
  .constant('apiPath', {
    'getAllBranch':           'http://api.siliconbrain.co.in/branches',
	'getOneBranch':           'http://api.siliconbrain.co.in/branches/company/',
    'getAllCompany':          'http://api.siliconbrain.co.in/companies',
	'getAllState':          'http://api.siliconbrain.co.in/states',
	'getAllCity':          'http://api.siliconbrain.co.in/cities/state/',
	'getOneCity':          'http://api.siliconbrain.co.in/cities',
	'getLedgerGroups':     'http://api.siliconbrain.co.in/accounting/ledger-groups',
	'getAllInvoice':     'http://api.siliconbrain.co.in/settings/invoice-numbers',
	'getAllQuotation':     'http://api.siliconbrain.co.in/settings/quotation-numbers',
	'getAllTemplate':     'http://api.siliconbrain.co.in/settings/templates',
	'getAllLedgerGroup':     'http://api.siliconbrain.co.in/accounting/ledger-groups',
	'getAllLedger':     'http://api.siliconbrain.co.in/accounting/ledgers',
	'getAllProduct':     'http://api.siliconbrain.co.in/products',
	'getAllCategory':     'http://api.siliconbrain.co.in/product-categories',
	'getAllGroup':     'http://api.siliconbrain.co.in/product-groups',
	'getJrnlNext': 'http://api.siliconbrain.co.in/accounting/journals/next',
	'postJrnl': 'http://api.siliconbrain.co.in/accounting/journals',
	'getAllClient': 'http://api.siliconbrain.co.in/clients',
	'getAllBank': 'http://api.siliconbrain.co.in/banks',
	'postBill': 'http://api.siliconbrain.co.in/accounting/bill',
	'getLatestInvoice1': 'http://api.siliconbrain.co.in/settings/invoice-numbers/company/',
	'getLatestInvoice2': '/latest'
  })
  // Same MQ as defined in the css
  .constant('appMediaquery', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
;