function run($rootScope, UserService, $state){


  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (!UserService.loggedIn() && toState.name !== 'root.log-in' && toState.name !== 'root.sign-up' && toState.name !== 'root.home'){
      event.preventDefault();
      $state.go('root.home');
    }
  })

  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    $rootScope.$broadcast('loginChange', UserService.loggedIn());
  })

}

run.$inject = ['$rootScope', 'UserService', '$state'];

export { run };
