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
        var selectedMarker;
        var markers = [];
        var markerFactory = new MarkerFactory(this);

        this.getSelectedMarker = function () {
            return selectedMarker;
        };

        this.addMarker = function (markerOptions) {
            var marker = markerFactory.make(markerOptions);
            marker.target.addLayer(marker.vectorLayer);
            markers.push(marker);
            selectedMarker = marker;
            return marker;
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

        this.openPopup = function (marker, storeCallback) {
            if (typeof storeCallback === "function") {
                marker.openPopup(function(storeData) {
                    storeCallback(storeData)
                });
            }
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
