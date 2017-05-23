/**
 * Created by galgara on 4/11/2017.
 */
var co = require('co');
var UserDetails = require('../service/userDetailsService');
var logger = getLogger('userController');

exports.addUserDetail = function (req, res) {

    var userInfo = req.body.userData;
    logger.debug("user controller  ::  add user details request body:" + JSON.stringify(userInfo));

    co(function*() {
        var valid = yield UserDetails.validateUser(userInfo);
        if (valid) {
            var result = yield UserDetails.insertUser(userInfo);
            if (result.result.ok == 1) {
                logger.info("user controller  ::   user  "+ req.body.userData.name+"is added successfully ");
                res.status(201).send("User is added successfully");
            } else {
                logger.info("user controller  ::  failed to add user "+ req.body.userData.name);
                res.status(400).send("Failed to add user");
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
    function search(object, name, id) {
        var obj = object;
        if (name) {
            obj = object.filter(function (obj) {
                return obj.name === name;
            });
        } else if (id) {
            obj = object.filter(function (obj) {
                return obj.id === id;
            });
        }
        return obj;
    }

    co(function*() {
        var userData = yield UserDetails.getAllUsers();
        userData = search(userData, name, id)
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
    var userName = req.body.userName;
    var userId = req.body.userId;
    var deleteBy = {};

    logger.debug("user controller  ::  delete user ");
    if (!(userId && userName) && (userName || userId)) {
        if (userName) {
            deleteBy = {
                "name": userName
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