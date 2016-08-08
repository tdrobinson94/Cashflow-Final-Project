function run($rootScope, LoginService, $state){


  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (!LoginService.loggedIn() && toState.name !== 'root.log-in' && toState.name !== 'root.sign-up' && toState.name !== 'root.home'){
      event.preventDefault();
      $state.go('root.home');
    }
  })

  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    $rootScope.$broadcast('loginChange', LoginService.loggedIn());
  })
}

run.$inject = ['$rootScope', 'LoginService', '$state'];

export { run };
