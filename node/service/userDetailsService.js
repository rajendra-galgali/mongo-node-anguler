/**
 * Created by galgara on 4/11/2017.
 */

var dbConnectioCheck = require('../../db/mongoConnection');
var co = require('co');
var schema = require('schemajs');


exports.validateUser = function (userDetails) {

    return new Promise(function (resolve, reject) {
        var model = schema.create({
            "name": {
                type: "string"
            },
            "id": {
                type: "string"
            },
            "age": {
                type: "number",
                filters: "trim",
            },
            "password": {
                type: "string",
            },
            "dob": {
                type: "string",
                filters: "trim",
            },
            "phoneNumber": {
                type: "number"
            },
            "email": {
                type: "string"
            }
        });
        var form = model.validate(userDetails);
        resolve(form.valid);
    })
}

exports.insertUser = function (userDetails) {

    return new Promise(function (resolve, reject) {
        co(function*() {
            var db = yield dbConnectioCheck.checkDBConnectionObject();
            db.collection('UserData').insertOne(userDetails, function (error, data) {
                if (error) {
                    co(function*() {
                        if (error.name === "MongoError") {
                            yield dbConnectioCheck.checkDBConnectionObject()
                        } else {
                            logger.error("requestId :: " + self.params.requestId + ":: " + '-ERROR:: ' + JSON.stringify(error));
                            reject({
                                'response': error
                            });
                        }
                    })
                } else {
                    resolve(data);
                }
            });
        });
    })
}

exports.getAllUsers = function () {
    return new Promise(function (resolve, reject) {
        co(function*() {
            var db = yield dbConnectioCheck.checkDBConnectionObject();
            db.collection('UserData').find().toArray(function(error, data) {
                if (error) {
                    co(function*() {
                        if (error.name === "MongoError") {
                            yield dbConnectioCheck.checkDBConnectionObject()
                        } else {
                            logger.error("requestId :: " + self.params.requestId + ":: " + '-ERROR:: ' + JSON.stringify(error));
                            reject({
                                'response': error
                            });
                        }
                    })
                } else {
                    resolve(data);
                }
            })
        })
    })
}

exports.deleteUser = function (deleteBy) {
    return new Promise(function (resolve, reject) {
        co(function*() {
            var db = yield dbConnectioCheck.checkDBConnectionObject();
            db.collection('UserData').remove(deleteBy, function(error, result) {
                if (error) {
                    co(function*() {
                        if (error.name === "MongoError") {
                            yield dbConnectioCheck.checkDBConnectionObject()
                        } else {
                            logger.error("requestId :: " + self.params.requestId + ":: " + '-ERROR:: ' + JSON.stringify(error));
                            reject({
                                'response': error
                            });
                        }
                    })
                } else {
                    resolve(result);
                }
            })
        })
    })
}
