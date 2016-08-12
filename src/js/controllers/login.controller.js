function LoginController($http, $state, SERVER, $cookies, UserService){

  let vm = this;
  vm.login = login;

  function login(user){
    UserService.login(user).then(function(res){
      console.log(res);
      $cookies.put('access_token', res.data.access_token);
      $cookies.put('user_id', res.data.id)
      $state.go('root.profile');
    })
  }

}


LoginController.$inject = ['$http', '$state', 'SERVER', '$cookies', 'UserService'];

export { LoginController };
