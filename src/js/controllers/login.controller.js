function LoginController($http, $state, SERVER, $cookies, LoginService){

  let vm = this;
  vm.login = login;

  function login(user){
    LoginService.login(user).then(function(res){
      console.log(res);
      $cookies.put('access_token', res.data.access_token);
      $state.go('root.calendar');
    })
  }

}


LoginController.$inject = ['$http', '$state', 'SERVER', '$cookies', 'LoginService'];

export { LoginController };
