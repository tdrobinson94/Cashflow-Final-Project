function LoginController($http, $state, SERVER, $cookies, UserService){

  let vm = this;
  vm.login = login;
  vm.loadingIndicator = false;

  function login(user){
    vm.loadingIndicator = true;
    UserService.login(user).then(function(res){
      console.log(res.status);
      if(res.status === 200){
        $cookies.put('access_token', res.data.access_token);
        $cookies.put('user_id', res.data.id)
        $state.go('root.profile');
      } else {
        alert('Username or Password is incorrect!')
      }
    })
  }

}


LoginController.$inject = ['$http', '$state', 'SERVER', '$cookies', 'UserService'];

export { LoginController };
