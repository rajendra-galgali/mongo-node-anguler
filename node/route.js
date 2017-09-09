/**
 * Created by galgara on 4/11/2017.
 */


var express = require('express');
var bodyParser = require('body-parser');
const userDetails = require('./controller/userDetails');
const appRouter = express.Router();

(function () {
    module.exports = function (app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static('anguler'));


        appRouter.post('/users/addUser', userDetails.addUserDetail);
        appRouter.get('/users/getUsers', userDetails.getAllUsers);
        appRouter.delete('/users/deleteUser', userDetails.deleteUser);
        appRouter.get('/users/loginUser', userDetails.loginUser);
        app.use('/app', appRouter);


    }
})()
