/**
 * Created by galgara on 5/24/2017.
 */

exports.searchUser = function (object ,userName, userId) {
    var obj = object;
    if (userName) {
        obj = object.filter(function (obj) {
            return obj.userName === userName;
        });
    } else if (userId) {
        obj = object.filter(function (obj) {
            return obj.id === userId;
        });
    }
    return obj;
}