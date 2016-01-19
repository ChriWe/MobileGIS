/**
 * Created by Christoph on 17.01.2016.
 */

define('MarkerFactory', [
    "jquery",
    "jqueryMobile",
    "ol3"
],function($, m$, ol){

    var MarkerFactory = function() {

        var marker = {
            id: undefined,
            coord: undefined,
            showOnMap: undefined,
            target: undefined,
            vectorLayer: undefined
        };

        var setMarker = function(options) {
          marker.id = options.id;
          marker.coord = options.coord;
          marker.showOnMap = options.showOnMap;
          marker.target = options.target;
          marker.vectorLayer = options.vectorLayer;
        };

        this.make = function(markerOptions) {
            var options = markerOptions || {};

            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(options.coord),
                name: options.id,
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

            setMarker({
                id: options.id,
                coord: options.coord,
                showOnMap: options.showOnMap,
                target: options.target,
                vectorLayer: vectorLayer
            });

            return marker
        }
    };


    return MarkerFactory;
});
