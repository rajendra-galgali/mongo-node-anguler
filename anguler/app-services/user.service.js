(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        service.GetAllUsers = GetAllUsers;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.deleteUserByUserName = deleteUserByUserName;
        service.Login = Login;

        return service;

        function GetAllUsers() {
            return $http.get('http://localhost:1992/app/users/getUsers').then(function (data) {
              return data;
            },function (error) {
                return error;
            });
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('http://localhost:1992/app/users/addUser', user).then(function (data) {
                return data;
            }, function (error) {
                return error
            });
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function deleteUserByUserName(userName) {
            var userData = {
                "userName" : userName
            }
            var header = {
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }
            return $http.delete('http://localhost:1992/app/users/deleteUser',{data:userData,headers:header.headers}).then(function (data) {
                return data;
            },function (error) {
                return error;
            });
        }

        function Login(username, password) {
            return $http.get('/app/users/loginUser?userName='+username+"&password="+password).then(function (data) {
              return data;
            },function (error) {
                return error;
            });
        }
    }

})();
