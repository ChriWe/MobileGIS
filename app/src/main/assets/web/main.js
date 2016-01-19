require.config({
    paths: {
        jquery: 'vendor/jquery/jquery-1.12.0/jquery.min',
        jqueryMobile: 'vendor/jquery/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min',
        Bootstrap: 'vendor/bootstrap/bootstrap-3.3.6-dist/js/bootstrap.min',
        Editable: 'vendor/bootstrap/bootstrap3-editable-1.5.1/bootstrap3-editable/js/bootstrap-editable',
        ol3: 'vendor/openlayers/openlayers-v3.11.0/ol.min',
        PouchDB: 'vendor/pouchdb/pouchdb-5.2.0/pouchdb-5.2.0.min',
        App: 'app',
        Map: 'pages/map/controller/map.controller',
        Overpass: 'pages/map/controller/overpass.controller',
        MarkerFactory: 'pages/map/controller/marker.factory',
        MarkerManager: 'pages/map/controller/marker.manager',
        Database: 'pages/data/controller/database.controller'
    },
    shim: {
        jqueryMobile: {deps: ['jquery']},
        Bootstrap: {deps: ['jquery']},
        Editable : { deps: ['jquery', 'Bootstrap'] },
        Map: {deps: ['ol3']}
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
