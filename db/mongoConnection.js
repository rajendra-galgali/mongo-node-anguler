var mongodb = require('mongodb');
var co = require('co');
var MongoClient = mongodb.MongoClient;
var MongoDbConnectionDef = function () {}

MongoDbConnectionDef.prototype.getConnnection = function (url) {
    var self = this;
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                reject(err);
            } else {
                console.log('Mongo connection established');
                resolve(db);
            }
        });
    });
}
MongoDbConnectionDef.prototype.checkDBConnectionObject = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        co(function* () {
            global.db = yield self.getConnnection('mongodb://localhost:27017/mean');
            resolve(global.db);
        }).
        catch(function (err) {
            reject(err);
        });
    });
}

module.exports = new MongoDbConnectionDef();
