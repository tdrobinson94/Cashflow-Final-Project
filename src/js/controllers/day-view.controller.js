function DayViewController ($scope, $mdDialog, date){

  $scope.date = date;
  

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.show = function(){

  }

}

DayViewController.$inject = ['$scope', '$mdDialog', 'date'];

export { DayViewController };
