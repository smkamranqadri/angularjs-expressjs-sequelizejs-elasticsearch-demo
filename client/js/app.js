var demoApp = angular.module('demoApp', ['ui.router']);

demoApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    var search = {
      name: 'search',
      url: '/search',
      controller: 'searchController',
      controllerAs: 'vm',
      templateUrl: 'views/search.html'
    };
    $urlRouterProvider.otherwise('/search');
    $stateProvider.state(search);
  }
]);
