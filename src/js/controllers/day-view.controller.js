function DayViewController ($scope, $mdDialog){

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };


}

DayViewController.$inject = ['$scope', '$mdDialog'];

export { DayViewController };
