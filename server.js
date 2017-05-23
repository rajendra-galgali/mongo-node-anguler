/**
 * Created by galgara on 4/11/2017.
 */

'use strict'

var express = require('express');
var app = express();
var co = require('co');
var mongo = require('./db/mongoConnection');

co(function*() {
    global.getLogger = require('./log4js.js');
    global.db = yield mongo.getConnnection("mongodb://localhost:27017/");
    console.log("mongo server is running");

}).catch(function (err) {
    console.error("*******db connection error********" + err);
    reject(err)
});
require('./node/config/config')(app);
require('./node/route')(app);

var port = 1992;

app.listen(port, () => {
    console.log("server running on port " + port);
});