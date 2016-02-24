/**
 * Created by Christoph on 17.01.2016.
 */

define('Database', [
    "jquery",
    "jqueryMobile",
    "DatabaseModel",
    "PouchDB"
],function($, m$, DatabaseModel, PouchDB){

    console.log("database_controller");

    var Database = function() {
        var dbModel = new DatabaseModel();
        var dbName = dbModel.dbName;
        var dbURL = dbModel.dbURL;

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

    Database.prototype.insertLocal = function(object){
        var self = this;
        self.browserDb
            .get(object.id)
            .catch(function (err){
                if(err.status === 404){
                    return {
                        "_id": object.id,
                        "geometry": {
                            "type": "Point",
                            "coordinates": object.coord
                        },
                        "properties": object.data
                    };
                }
            })
            .then(function(serverdoc) {
                return self.browserDb.put({
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

    Database.prototype.UUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    return Database;
});
