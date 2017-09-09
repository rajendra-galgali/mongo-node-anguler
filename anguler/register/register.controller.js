(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', 'FlashService'];
    function RegisterController(UserService, $location, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.status == 201) {
                        FlashService.Success(response.data,true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.data,false);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
