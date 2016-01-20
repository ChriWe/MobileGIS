/**
 * Created by Christoph on 20.01.2016.
 */

define('Marker', [
    "jquery",
    "jqueryMobile",
    "ol3"
], function ($, m$, ol) {

    var Marker = function (options, markerManager) {
        this.id = options.id;
        this.coord = options.coord;
        this.popupOpen = options.popupOpen;
        this.saved = options.saved;
        this.target = options.target;
        this.data = options.data;
        this.vectorLayer = options.vectorLayer;

        var self = this;
        this.openPopup = function () {
            var element = document.getElementById('popup');
            var popup = new ol.Overlay({
                element: element
            });

            this.target.addOverlay(popup);

            $(element).popover('destroy');

            $.fn.editable.defaults.mode = 'inline';

            popup.setPosition(self.coord);
            $(element).popover({
                'placement': 'top',
                'animation': false,
                'html': true,
                'content': createDataTemplate(self.data, self.coord)
            });
            $(element).popover('show');
            $('.popover-title').append('<button type="button" class="close">&times;</button>');
            $('.popover-content').append(
                '<button id="save" type="button" class="btn btn-success btn-sm" style="float:right">Save</button>'
            );

            $('.close').click(function (e) {
                $(element).popover('hide');
                $(element).popover('destroy');

                self.popupOpen = false;
                markerManager.updateMarker(self);
                if (!self.saved) {
                    markerManager.removeActiveMarker(self);
                }
            });
            $('#save').click(function (e) {
                updateData();

                $(element).popover('hide');

                self.saved = true;
                self.popupOpen = false;
                markerManager.addMarker(self)
            });

            registerEditables(self.data);

            this.popupOpen = true;
        };

        function updateData() {
            if (self.data.length > 0) {
                for (var i = 0; i < self.data.length; i++) {
                    var currentData = self.data[i];
                    var j = 0;
                    for (var key in currentData) {
                        if (currentData.hasOwnProperty(key)) {
                            self.data[i].name.value = $('#'+i + "-" + 0 + "-editable")[0].innerHTML;
                            self.data[i].description_en.value = $('#'+i + "-" + 1 + "-editable")[0].innerHTML;
                            self.data[i].description.value = $('#'+i + "-" + 2 + "-editable")[0].innerHTML;
                            self.data[i].architect.value = $('#'+i + "-" + 3 + "-editable")[0].innerHTML;
                            self.data[i].url.value = $('#'+i + "-" + 4 + "-editable")[0].innerHTML;
                        }
                        j++;
                    }
                }
            }
        }

        this.closePopup = function () {
            var element = document.getElementById('popup');
            $(element).popover('hide');
            $(element).popover('destroy');
            this.popupOpen = false;
        };

        function createDataTemplate(data, coord4326) {
            var dataTemplate = document.createElement("div");
            var table = dataTemplate.appendChild(document.createElement("table"));
            var p = table.appendChild(document.createElement("p"));

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var currentData = data[i];
                    var j = 0;
                    for (var key in currentData) {
                        if (currentData.hasOwnProperty(key)) {
                            var tr = p.appendChild(document.createElement("tr"));
                            var span = tr.appendChild(document.createElement("span"));
                            span.innerHTML = currentData[key].description + " ";
                            var a = span.appendChild(document.createElement("a"));
                            a.setAttribute("href", "#");
                            a.setAttribute("id", i + "-" + j + "-editable");
                            a.setAttribute("data-type", "text");
                            a.setAttribute("data-pk", "1");
                            a.setAttribute("data-title", currentData[key].value);
                            a.innerHTML = currentData[key].value;
                        }
                        j++;
                    }
                }
            } else {
                var tr = p.appendChild(document.createElement("tr"));
                var a = tr.appendChild(document.createElement("a"));
                a.innerHTML = "No Info Available";
            }

            var c = dataTemplate.appendChild(document.createElement("code"));
            c.innerHTML = coord4326[0].toFixed(6) + ", " + coord4326[1].toFixed(6);
            c.id = "coord";


            return dataTemplate;
        }

        function registerEditables(data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var currentData = data[i];
                    var j = 0;
                    for (var key in currentData) {
                        if (currentData.hasOwnProperty(key)) {
                            $('#' + i + "-" + j + "-editable").editable();
                        }
                        j++;
                    }
                }
            }
        }
    };

    return Marker;
});
