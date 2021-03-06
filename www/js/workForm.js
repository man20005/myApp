angular.module('workApp', ['ionic','ajoslin.promise-tracker'])
	.controller('workCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
    $scope.natList = {
      'الهندية': 'الهندية',		
      'النيبالية': 'النيبالية',
      'الفلبينية': 'الفلبينية',
	  ' السيريلانكية': 'السيريلانكية' ,
      'الكينية': 'الكينية',
      'الاثيوبية': 'الاثيوبية'
    };
	
	$scope.ageList = {
      '15-': '15-',
	  '15': '35',
	  '36': '50',
	  '50+': '50+'
    };
	
	$scope.degreeList = {
      '10': '10',
      '0': '0'	  
    };	
	
	$scope.skillsList = {
      '15-': '15-',
      '0': '0'	  
	  
    };
	
	$scope.contestList = {
      '10': '10',
      '0': '0'	  
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
          'whatstel' : $scope.whatstel,
          'desc' : $scope.comments,
		  'db' : 'work'
      	};

      // Ajax
      var $promise = 
	  	$http({
			method: 'POST',
			url: 'http://www.wasmiah.com/httpreq/insComp.php',
			data: config,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .success(function(data, status, headers, config) {	
			window.plugins.toast.showLongCenter('Submitted Succesfully');
        
		    $scope.name = null;
            $scope.tel = null;
            $scope.email = null;
            $scope.subjectList = null;
            $scope.comments = null;
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