/**
 * Created by christof on 03.12.2015.
 */

define('Overpass', [
    "jquery",
    "jqueryMobile"
], function () {
    console.log("overpass_controller");
    var bbox;
    var Overpass = function () {
        this.map = map;
        this.bboxset = function (value) {
            bbox = value;
        };
        this.getTemplate = function() {
            return {
                name : {
                    description: "Name:",
                    value: undefined
                },
                description_en : {
                    description: "Description (en):",
                    value: undefined
                },
                description : {
                    description: "Description:",
                    value: undefined
                },
                architect : {
                    description: "Architekt:",
                    value: undefined
                },
                url : {
                    description: "URL:",
                    value: undefined
                }
            };
        };

        this.sendRequest = function () {
            var baseURL = 'http://overpass-api.de/api/';
            var requestURL = baseURL + "interpreter?data=[out:json];relation[building=\"yes\"](" + bbox + ");out;";
            return request = $.getJSON(requestURL, function (data) {
            }).then(function (data) {
                // filtering the data
                console.log(data);
                var elements = data.elements;

                var template = {
                    name : {
                        description: "Name:",
                        value: undefined
                    },
                    description_en : {
                        description: "Description (en):",
                        value: undefined
                    },
                    description : {
                        description: "Description:",
                        value: undefined
                    },
                    architect : {
                        description: "Architekt:",
                        value: undefined
                    },
                    url : {
                        description: "URL:",
                        value: undefined
                    }
                };

                if (elements.length > 0) {
                    var templates = [];
                    for (var i = 0; i < elements.length; i++) {
                        if ('name' in elements[i].tags) {
                            for (var key in elements[i].tags) {
                                if (key === 'name') {
                                    template.name.value = elements[i].tags[key];
                                }
                                if (key === 'description:en') {
                                    template.description_en.value = elements[i].tags[key];
                                }
                                if (key === 'description') {
                                    template.description.value = elements[i].tags[key];
                                }
                                if (key === 'architect') {
                                    template.architect.value = elements[i].tags[key];
                                }
                                if (key === 'url') {
                                    template.url.value = elements[i].tags[key];
                                }
                            }
                            templates.push(template);
                        }
                    }

                    if (templates.length > 0) {
                        return templates;
                    } else {
                        return [template];
                    }
                } else {
                    return [template];
                }
            });

        }
    };

    return Overpass;
});
