/**
 * Created by Christoph on 17.01.2016.
 */

define('MarkerFactory', [
    "jquery",
    "jqueryMobile",
    "ol3",
    "Marker"
],function($, m$, ol, Marker){

    var MarkerFactory = function(markerManager) {

        this.make = function(markerOptions) {
            var options = markerOptions || {};
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(options.coord),
                id: options.id,
                data: options.data,
                type : 'Marker'
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: 'pages/map/view/styles/images/icon.png'
                }))
            });

            iconFeature.setStyle(iconStyle);

            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            options.vectorLayer = vectorLayer;


            return new Marker(options, markerManager);
        }
    };


    return MarkerFactory;
});
