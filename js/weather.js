var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('weatherCtrl', function($scope, $http, $sce) {
   

   $scope.getWeather = function(e) {
     e.preventDefault();
     console.log($scope.city);
     
     $http.get('http://api.openweathermap.org/data/2.5/weather', { 
       params: { 
         q: $scope.city}
           })
             .success(function (results) {
             $scope.results  = results;
             $scope.tempFormat = $sce.trustAsHtml("&nbsp;&#8457;");

             $scope.temperature = 9/5 * (results.main.temp -273) + 32; 
             $scope.humidity = 'Humidity: ' + results.main.humidity + '%';
             
             $scope.weatherIcon = results.weather[0].icon;
             
             $scope.weatherIcon = 'http://openweathermap.org/img/w/' + $scope.weatherIcon + '.png'; 

             $scope.city = '';
     });
     
       $http.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
        params: {
          q: $scope.city, cnt: 5, mode: "json", units: "imperial"}
      })
        .success(function (fiveDay) {
          $scope.fiveDay = fiveDay;
        console.log(fiveDay.list[1].temp.max);
      }).error(function (fiveDay){
        console.log('error');
    });
   };
});