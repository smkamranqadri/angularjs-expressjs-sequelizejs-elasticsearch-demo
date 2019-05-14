var demoApp = angular.module('demoApp');
demoApp.controller('searchController', [
  '$scope',
  'CustomersService',
  SearchController
]);

function SearchController($scope, CustomersService) {
  vm = this;

  vm.results = [];
  vm.error = false;

  vm.getCustomers = function(q) {
    CustomersService.getCustomers(q).then(
      function(response) {
        vm.results = response.data.data;
      },
      function(err) {
        vm.error = err;
      }
    );
  };

  vm.getCustomers();
}
