angular.module('transApp', ['ionic','ajoslin.promise-tracker'])
	.controller('transCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
		
    $scope.natList = {
      'الهندية': 'الهندية',		
      'النيبالية': 'النيبالية',
      'الفلبينية': 'الفلبينية',
	  ' السيريلانكية': 'السيريلانكية' ,
      'الكينية': 'الكينية',
      'الاثيوبية': 'الاثيوبية'
    };
	
    $scope.langList = {
      'الهندية': 'الهندية',		
      'النيبالية': 'النيبالية',
      'الفلبينية': 'الفلبينية',
	  ' السيريلانكية': 'السيريلانكية' ,
      'الكينية': 'الكينية',
      'الاثيوبية': 'الاثيوبية'
    };
	
    $scope.typeList = {
      'الهندية': 'الهندية',		
      'النيبالية': 'النيبالية',
      'الفلبينية': 'الفلبينية',
	  ' السيريلانكية': 'السيريلانكية' ,
      'الكينية': 'الكينية',
      'الاثيوبية': 'الاثيوبية'
    };
			
			
    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
		
      	// Default values for the request.
     	var config = {
          'name' : $scope.name,
          'tel' : $scope.tel,
		  'nat' : $scope.natList,
		  'lang' : $scope.langList,
		  'type' : $scope.typeList
      	};

      // Ajax
      var $promise = 
	  	$http({
			method: 'POST',
			url: 'http://www.wasmiah.com/httpreq/insWork.php',
			data: config,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .success(function(data, status, headers, config) {	
			window.plugins.toast.showLongCenter('Submitted Succesfully');
        
		    $scope.name = null;
            $scope.tel = null;
            $scope.natList = null;
			$scope.langList = null;
			$scope.typeList = null;
            //$scope.messages = 'Your form has been sent!';
            $scope.submitted = false;
        })
        .error(function(data, status, headers, config) {
			window.plugins.toast.showLongCenter('There was a network error. Try again later.')
          	$scope.progress = data;
          	//$scope.messages = 'There was a network error. Try again later.';
          	$log.error(data);
        })
        .finally(function() {
          // Hide status messages after three seconds
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user
      $scope.progress.addPromise($promise);
	};
});