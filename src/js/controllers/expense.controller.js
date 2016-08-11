function ExpenseController ($scope, $mdDialog){


  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.show = function(){

  }

}

ExpenseController.$inject = ['$scope', '$mdDialog'];

export { ExpenseController };
