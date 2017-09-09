(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'UserService', 'FlashService'];
    function LoginController($location, UserService, FlashService) {
        var vm = this;

        vm.login = login;

        function login() {
            vm.dataLoading = true;
            UserService.Login(vm.username, vm.password).then(function (response) {
                if (response.status === 200) {
                    FlashService.Success(response.data,true);
                    $location.path('/home');
                } else if(response.status === 204){
                    FlashService.Error("User not exits");
                    vm.dataLoading = false;
                }else{
                    FlashService.Error(response.data);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
