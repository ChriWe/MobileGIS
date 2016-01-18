require.config({
	paths: {
		jquery: 'vendor/scripts/jquery',
		jqueryMobile: 'vendor/scripts/jquery.mobile-1.3.2',
        PouchDB: 'vendor/scripts/pouchdb-5.2.0.min',
        App: 'app',
        Map: 'pages/map/controller/map.controller',
        Overpass: 'pages/map/controller/overpass.controller',
        Database: 'pages/map/controller/database.controller',
        MarkerFactory: 'pages/map/controller/marker.factory',
        MarkerManager: 'pages/map/controller/marker.manager'
	},
  shim: {
	"vendor/scripts/jquery.mobile-1.3.2'" : { deps: ["jquery"], exports: 'jquery' },
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
