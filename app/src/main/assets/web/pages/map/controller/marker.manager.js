/**
 * Created by Christoph on 17.01.2016.
 */

define('MarkerManager', [
    "jquery",
    "jqueryMobile",
    "MarkerFactory",
    "Marker"
], function ($, m$, MarkerFactory, Marker) {

    var MarkerManager = function () {
        var activeMarker;
        var markers = [];
        var markerFactory = new MarkerFactory(this);


        this.activeMarkerExists = function() {
            if (activeMarker) {
                return true
            }
            return false;
        };

        this.getActiveMarker = function () {
            return activeMarker;
        };

        this.removeActiveMarker = function () {
            activeMarker.target.removeLayer(activeMarker.vectorLayer);
        };

        this.setActiveMarker = function (markerOptions) {
            activeMarker = markerFactory.make(markerOptions);
            activeMarker.target.addLayer(activeMarker.vectorLayer);
            return activeMarker;
        };

        this.addMarker = function (marker) {
            markers.push(marker);
        };

        this.removeMarker = function (marker) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id === marker.id) {
                    marker.target.removeLayer(marker.vectorLayer);
                    markers.splice(i, 1);
                    return;
                }
            }
        };

        this.updateMarker = function (marker) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id === marker.id) {
                    markers[i] = marker;
                    return;
                }
            }
        };

        this.getMarker = function(id) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id === id) {
                    return markers[i];
                }
            }
        };

        this.openPopup = function (marker) {
            marker.openPopup();
        };

        this.closePopup = function (marker) {
            marker.closePopup();
        };

        this.getMarkers = function () {
            return markers;
        };

        this.deleteUnsavedMarkers = function () {
            for (var i = 0; i < markers.length; i++) {
                if (!markers[i].saved) {
                    markers[i].target.removeLayer(markers[i].vectorLayer);
                    markers[i].closePopup();
                    markers.splice(i, 1);
                    return;
                }
            }
        }

    };

    return MarkerManager;
});
