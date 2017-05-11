'use strict';

angular.module('templatestore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TemplatesCtrl'
  })
   .when('/templates/:id', {
    templateUrl: 'templates/templates-details.html',
    controller: 'TemplatesDetailsCtrl'
  });
}])

.controller('TemplatesCtrl', ['$scope','$http', function($scope, $http) {
		$http.get('json/templates.json').success(function(data){
		$scope.templates = data;
	});
}])

.controller('TemplatesDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').success(function(data){
		$scope.template = $filter('filter')(data, function(d){
			return d.id == templateId;
		})[0];
		$scope.mainImage = $scope.template.images[0].name;
	});

	$scope.setImage = function(image) {
		$scope.mainImage = image.name;
	};
}]);