var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: 'MahasiswaController',
    templateUrl: 'view/mahasiswa.html'
  })
  .when('/api/mahasiswa', {
    controller: 'MahasiswaController',
    templateUrl: 'view/mahasiswa.html'
  })
  .when('/api/mahasiswa/detail/:id', {
    controller: 'MahasiswaController',
    templateUrl: 'view/detail_mahasiswa.html'
  })
  .when('/api/mahasiswa/add', {
    controller: 'MahasiswaController',
    templateUrl: 'view/add_mahasiswa.html'
  })
  .when('/api/mahasiswa/edit/:id', {
    controller: 'MahasiswaController',
    templateUrl: 'view/edit_mahasiswa.html'
  })
});
