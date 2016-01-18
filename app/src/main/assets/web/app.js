/*global define */
define('App', [
    "jquery",
    "jqueryMobile",
    "Map"
], function ($) {
    'use strict';



    var options = {
        map: {name: "map", template: undefined},
        data: {name: "data", template: undefined}
    };

    retrieveTemplates();

    $("#map-link").click(function () {
        replaceTemplate(options.map);
    });

    $("#data-link").click(function () {
       replaceTemplate(options.data);
    });


    function retrieveTemplates() {
        function doGet(key) {
            if (options.hasOwnProperty(key)) {
                $.get('pages/' + options[key].name + '/view/' + options[key].name + '.html').then(
                    function(data) {
                        options[key].template = data;
                        //if (key === 'map') {
                        //    console.log("view");
                        //    $('#content').append(data)
                        //}
                    }, function() {
                        alert( "$.get failed!" );
                    }
                );
            }
        }

        for (var key in options) {
          doGet(key);
        }
    }

    function replaceTemplate(option) {
        var currentChild =  $('#content').children();
        if (currentChild.length > 0) {
            options[currentChild.attr("id")].template = currentChild;
        }

        $("#content").empty();
        if ($('#' + option.name).length == 0) {
            $('#content').append(option.template);
        }
    }

});
