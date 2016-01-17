require.config({
	paths: {
		jquery: 'vendor/scripts/jquery',
		jqueryMobile: 'vendor/scripts/jquery.mobile-1.3.2',
        app: 'app',
        map: 'pages/map/controller/map.controller',
        Overpass: 'pages/map/controller/overpass.controller'
	},
  shim: {
	"vendor/scripts/jquery.mobile-1.3.2'" : { deps: ["jquery"], exports: 'jquery' },
  }
});

require(["jquery",
	"jqueryMobile",
    "app",
    "map"
], function ($) {
    console.log('jQuery version ' + $().jquery + ' installed');
    $(window).on('load', function () {
        $("#index").show();
    });
});
