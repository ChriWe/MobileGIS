/**
 * Created by Christoph on 24.02.2016.
 */

define('DatabaseModel', [
    "jquery",
    "jqueryMobile"
], function ($, m$) {

    var databaseModel = function() {
        console.log("database_model");

        this.dbName = "sighter";
        this.dbURL = "http://gi88.geoinfo.tuwien.ac.at:5984";
    };

    return databaseModel;
});
