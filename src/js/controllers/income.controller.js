function IncomeController ($scope, $mdDialog){


  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.show = function(){

  }

}

IncomeController.$inject = ['$scope', '$mdDialog'];

export { IncomeController };
