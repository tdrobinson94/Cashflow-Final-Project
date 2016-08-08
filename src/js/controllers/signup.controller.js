import $ from 'jquery';

function SignUpController($http, SERVER, $state, LoginService) {
  let vm = this;
  vm.signup = signup;

  function signup(user){
    LoginService.signup(user).then(function(res){
      console.log(res);
      $state.go('root.log-in');
    })
  }

}

SignUpController.$inject = ['$http', 'SERVER', '$state', 'LoginService'];

export { SignUpController };
