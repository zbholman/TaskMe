var TaskMe = angular.module('TaskMe', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all projects and show them
    $http.get('api/Projects')
	.success(function(data) {
	    $scope.projects = data;
	    console.log(data);
	})
	.error(function(data) {
	    console.log('Error: ' + data);
	});
    // when submitting the add form, send the text to the node API
    $scope.createProject = function() {
        $http.post('/api/Projects', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // delete a Project after checking it
    $scope.deleteProject = function(id) {
        $http.delete('/api/Projects/' + id)
            .success(function(data) {
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}   
