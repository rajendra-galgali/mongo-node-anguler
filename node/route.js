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
        app.use(express.static('./anguler/public'));

        app.get('/',function (req,res) {
            res.sendfile(__dirname+'/index.html')
        });

        appRouter.post('/users/addUser', userDetails.addUserDetail);
        appRouter.get('/users/getAllUsers', userDetails.getAllUsers);
        appRouter.delete('/users/deleteUser', userDetails.deleteUser);
        app.use('/app', appRouter);


    }
})()
