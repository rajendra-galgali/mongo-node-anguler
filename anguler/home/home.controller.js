(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService','$scope','FlashService'];
    function HomeController(UserService, $scope, FlashService) {

        var vm = this;

        vm.users = users;
            users();
        function users() {
            vm.dataLoading = true;
            UserService.GetAllUsers()
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.userInf = response.data;
                    }else if(response.status === 204){
                        FlashService.Error("No users are available",false);
                        vm.dataLoading = false;
                    }else {
                        FlashService.Error(response.data,false);
                        vm.dataLoading = false;
                    }
                });
        }

        $scope.deleteUser = function(user){
            var userName = user.userName;
            UserService.deleteUserByUserName(userName)
                .then(function (response) {
                    if(response.status === 200){
                        FlashService.Success(response.data,true);
                        users();
                    }else{
                        FlashService.Error(response.data,false);
                        vm.dataLoading = false;
                        users();
                    }
                })
        }
    }

})();