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
            var request = baseURL + "interpreter?data=[out:json];relation[building=\"yes\"]("+bbox+");out;";
            $.getJSON(request ,function(data){
                console.log(data);
            })
        }
    };

    return Overpass;
});
