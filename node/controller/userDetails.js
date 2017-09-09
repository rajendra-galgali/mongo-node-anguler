/**
 * Created by galgara on 4/11/2017.
 */
var co = require('co');
var UserDetails = require('../service/userDetailsService');
var serachUserDetails = require('../util/searchUser');
var logger = getLogger('userController');

exports.addUserDetail = function (req, res) {
    req.body.userData.phoneNumber = parseInt(req.body.userData.phoneNumber)
    req.body.userData.age = parseInt(req.body.userData.age)
    var userName = req.body.userData.userName;
    var userInfo = req.body.userData;
    logger.debug("user controller  ::  add user details request body:" + JSON.stringify(userInfo));

    co(function*() {
        var valid = yield UserDetails.validateUser(userInfo);
        if (valid) {
            var userData = yield UserDetails.getAllUsers();
            userData = yield serachUserDetails.searchUser(userData, userName);
            if (Object.keys(userData).length > 0) {
                logger.info("user controller  ::  failed to add user " + req.body.userData.name);
                res.status(400).send("User name alredy exists");
            }else {
                var result = yield UserDetails.insertUser(userInfo);
                if (result.result.ok == 1) {
                    logger.info("user controller  ::   user  " + req.body.userData.name + "is added successfully ");
                    res.status(201).send("User is added successfully");
                } else {
                    logger.info("user controller  ::  failed to add user " + req.body.userData.name);
                    res.status(400).send("Failed to add user");
                }
            }
        } else {
            res.status(400).send("Invalid Payload");
        }
    })

}

exports.getAllUsers = function (req, res) {

    var name = req.query.name;
    var id = req.query.id;

    logger.debug("user controller  ::  get all user ");

    co(function*() {
        var userData = yield UserDetails.getAllUsers();
        userData = yield serachUserDetails.searchUser(userData, name, id)
        if (Object.keys(userData).length) {
            logger.info("user controller  ::  get all user : user details "+ JSON.stringify(userData));
            res.status(200).send(userData);
        } else {
            logger.info("user controller  ::  get all user : no user found ");
            res.status(204).send();
        }
    })
}

exports.deleteUser = function (req, res) {
    console.log("raj"+JSON.stringify(req.body));
    var userName = req.body.userName;
    var userId = req.body.userId;
    var deleteBy = {};

    logger.debug("user controller  ::  delete user ");
    if (!(userId && userName) && (userName || userId)) {
        if (userName) {
            deleteBy = {
                "userName": userName
            }
        } else if (userId) {
            deleteBy = {
                "id": userId
            }
        }
        co(function*() {
            var deletedData = JSON.parse(yield UserDetails.deleteUser(deleteBy));
            if (deletedData.n > 0) {
                logger.info("user controller  ::  delete user : user "+ req.body.userName || req.body.userId +" deleted successfully ");
                res.status(200).send("User deleted successfully")
            } else {
                logger.info("user controller  ::  delete user : failed to delete user "+ userName|| userId);
                res.status(202).send("Failed to delete User");
            }
        })
    } else {
        res.sendStatus(400)
    }
}

exports.loginUser = function (req, res) {

    var userName = req.query.userName;
    var password = req.query.password;
    var userId = "";
    logger.debug("user controller   ::  login user ");
    if (userName && password) {
        co(function*() {
            var userData = yield UserDetails.getAllUsers();
            userData = yield serachUserDetails.searchUser(userData, userName);
            if (Object.keys(userData).length) {
                if(userData[0].userName === userName && userData[0].password === password) {
                    res.status(200).send("Login successfully");
                }else{
                    res.status(401).send("Invalid user name or password")
                }
            } else {
                logger.info("login controller : no user found ");
                res.status(204).send();
            }
        })
    } else {
        res.sendStatus(400)
    }
}