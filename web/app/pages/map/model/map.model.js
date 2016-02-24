/**
 * Created by Christoph on 24.02.2016.
 */

define('MapModel', [
    "jquery",
    "jqueryMobile",
    "ol3"
], function ($, m$, ol) {

    var mapModel = function(target) {
        console.log("map_model");

        var view = new ol.View({
            center: ol.proj.transform([16, 48], 'EPSG:4326', 'EPSG:3857'),
            zoom: 5
        });

        var myFormat = function (dgts) {
            return (
                function (coord1) {
                    var coord2 = [coord1[1], coord1[0]];
                    return ol.coordinate.toStringXY(coord2, dgts);
                });
        };
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: myFormat(3),
            projection: 'EPSG:4326',
            undefinedHTML: '&nbsp;',
            target: document.getElementById('mouse-location')
        });

        var map = new ol.Map({
            target: target,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'osm'})
                })
            ],
            view: view,
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([mousePositionControl])
        });

        return map;
    };

    return mapModel;
});
