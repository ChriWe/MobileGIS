/**
 * Created by christof on 03.12.2015.
 */

define('Overpass', [
    "jquery",
    "jqueryMobile"
],function(){
    console.log("overpass_controller");
    var bbox;
    var Overpass = function() {
        this.map = map;
        this.bboxset = function(value){
            bbox = value;
        };

        this.sendRequest = function(){
            var baseURL = 'http://overpass-api.de/api/';
            var requestURL = baseURL + "interpreter?data=[out:json];relation[building=\"yes\"]("+bbox+");out;";
            return request = $.getJSON(requestURL ,function(data){
                console.log(data);
            }).then(function(data) {
                // filtering the data
                var elements = data.elements;
                var defkey = ['name','description:en','description','architect','url'];
                if (elements.length > 0 ) {
                    for (var i = 0; i < elements.length; i++) {
                        if ('name' in elements[i].tags) {
                            for (var keys in elements[i].tags){
                                if(!($.inArray(keys, defkey) > -1 )){
                                    delete elements[i].tags[keys];
                                }
                            }
                            return elements[i].tags;
                        }
                    }
                }
            });

        }
    };

    return Overpass;
});
