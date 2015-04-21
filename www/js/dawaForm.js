angular.module('dawaApp', ['ionic','ajoslin.promise-tracker'])
  .controller('dawaCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
    $scope.subjectListOptions = {
      'swedish': 'Swed',		
      'indonesia': 'Indonesia',
      'Ethiopia': 'Ethiopia',
      'uganda': 'Uganda',
      'other': 'Other'
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
          'whatstel	' : $scope.whatstel,
          'subjectList' : $scope.subjectList,
          'desc' : $scope.comments
      	};

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
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user
      $scope.progress.addPromise($promise);
	};
});