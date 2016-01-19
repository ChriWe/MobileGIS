require.config({
	paths: {
		jquery: 'vendor/jquery/jquery-1.12.0/jquery.min',
		jqueryMobile: 'vendor/jquery/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min',
        Bootstrap: 'vendor/bootstrap/bootstrap-3.3.6-dist/js/bootstrap.min',
        BootstrapEditable: 'vendor/bootstrap/bootstrap-editable-v1.1.4/bootstrap-editable/js/bootstrap-editable.min',
        PouchDB: 'vendor/pouchdb/pouchdb-5.2.0/pouchdb-5.2.0.min',
        App: 'app',
        Map: 'pages/map/controller/map.controller',
        Overpass: 'pages/map/controller/overpass.controller',
        Database: 'pages/map/controller/database.controller',
        MarkerFactory: 'pages/map/controller/marker.factory',
        MarkerManager: 'pages/map/controller/marker.manager'
	},
  shim: {
	"vendor/scripts/jquery.mobile-1.3.2'" : { deps: ["jquery"], exports: 'jquery' },
    "bootstrap" : { "deps" :['jquery'] }
  }
});

require(["jquery",
	"jqueryMobile",
    "App"
], function ($) {
    console.log('jQuery version ' + $().jquery + ' installed');
    $(window).on('load', function () {
        $("#index").show();
    });
});
