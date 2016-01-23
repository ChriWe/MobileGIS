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


/*    Database.prototype.insertServer = function(object) {
        var x = object;
        //var x = this.serverDb;


        return this.serverDb.put(object, function(err, result) {
            if (err) {
                console.log("Database error: " +  err)
            } else {
                console.log(result)
            }
        });
    };*/
    Database.prototype.insertLocal = function(object){
        var self = this;
        self.serverDb
            .get(object.id).catch(function (err){
                if(err.status === 404){

                    var localdoc = {
                        "_id": object.id,
                        "geometry": {
                            "type": "Point",
                            "coordinates": object.coord
                        },
                        "properties": object.data
                    };
                    return self.browserDb.put(localdoc, function(err, result) {
                        if (err) {
                            console.log("Database error: " +  err)
                        } else {
                            console.log('da' + result)
                        }
                    });
                }
            })
            .then(function(serverdoc) {
                return self.serverDb.put({
                    "_id": object.id,
                    "_rev": serverdoc._rev,
                    "geometry": {
                        "type": "Point",
                        "coordinates": object.coord
                    },
                    "properties": object.data
                });
            })

    };

    Database.prototype.syncDB = function (){
        var syncOpt = {live: true, retry: true};
        PouchDB.sync(this.browserDb, this.serverDb, syncOpt)
            .on('change', function(info){
                $("#sync-button .ui-btn-text").text("changed");
                console.log("sync: change");
            })
            .on('paused', function(info){
                $("#sync-button .ui-btn-text").text("Sync!");
                console.log("sync: paused");
            })
            .on('active', function(info){
                $("#sync-button .ui-btn-text").text("active");
                console.log("sync: active");
            })
            .on('error', function(info){
                $("#sync-button .ui-btn-text").text("error");
                console.log("sync: error");
            })
            .on('complete', function(info){
                $("#sync-button .ui-btn-text").text("complete");
                console.log("sync: complete");
            });
    };
    return Database;
});
