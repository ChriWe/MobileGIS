/**
 * Created by Christoph on 17.01.2016.
 */

define('MarkerFactory', [
    "jquery",
    "jqueryMobile"
],function($, m$){

    var MarkerFactory = function() {
        this.make = function(markerOptions) {
            var options = markerOptions || {};

            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(options.coord),
                name: options.name,
                data: options.data
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: 'pages/map/styles/images/icon.png'
                }))
            });

            iconFeature.setStyle(iconStyle);

            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            return {
                name: options.name,
                coord: options.coord,
                showOnMap: options.showOnMap,
                target: options.target,
                vectorLayer: vectorLayer
            }
        }
    };


    return MarkerFactory;
});
