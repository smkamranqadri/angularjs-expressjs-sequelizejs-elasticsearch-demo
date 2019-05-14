var demoApp = angular.module('demoApp');
demoApp.service('CustomersService', ['$http', CustomersService]);

function CustomersService($http) {
  this.url = '/api/customers';
  this.getCustomers = function(q) {
    var url = this.url;
    if (q) url = this.url + '?q=' + q;
    return $http.get(url);
  };
}
