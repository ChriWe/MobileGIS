/**
 * Created by Christoph on 17.01.2016.
 */

define('Database', [
    "jquery",
    "jqueryMobile",
    "PouchDB"
],function($, m$, PouchDB){

    console.log("database_controller");

    var Database = function() {
        var dbName = "sighter";
        var dbURL = "http://gi88.geoinfo.tuwien.ac.at:5984";

        this.getDBName = function () {
            return dbName;
        };

        this.getDBUrl = function() {
            return dbURL;
        };

        this.getDBConUrl = function() {
            return dbURL + "/" + dbName;
        };

        this.serverDb = new PouchDB(this.getDBConUrl());
        this.browserDb = new PouchDB(this.getDBName());

    };

    Database.prototype.insertObject = function(object) {

        var x = object;
        //var x = this.serverDb;


        //return this.serverDb.put(object, function(err, result) {
        //    if (err) {
        //        console.log("Database error: " +  err)
        //    } else {
        //        console.log(result)
        //    }
        //});
    };



    return Database;
});
