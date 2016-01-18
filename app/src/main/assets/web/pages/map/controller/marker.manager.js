/**
 * Created by Christoph on 17.01.2016.
 */

define('MarkerManager', [
    "jquery",
    "jqueryMobile",
    "MarkerFactory"
],function($, m$, MarkerFactory){

    var MarkerManager = function() {
        var markers = [];
        var markerFactory = new MarkerFactory();

        this.addMarker = function(markerOptions) {
            var marker = markerFactory.make(markerOptions);
            markers.push(marker);

            if (marker.showOnMap) {
                marker.target.addLayer(marker.vectorLayer);
            }

            return marker;
        };

        this.deleteMarker = function(marker) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].name === marker.name) {
                    markers.splice(i,1);

                    if (marker.showOnMap) {
                        marker.target.removeLayer(marker.vectorLayer);
                    }
                    return;
                }
            }
        };

        this.getMarkers = function() {
            return markers;
        };

    };

    return MarkerManager;
});
