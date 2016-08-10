import $ from 'jquery';

function SignUpController($http, SERVER, $state, UserService) {
  let vm = this;
  vm.signup = signup;

  function signup(user){
    UserService.signup(user).then(function(res){
      console.log(res);
      $state.go('root.log-in');
    })
  }

}

SignUpController.$inject = ['$http', 'SERVER', '$state', 'UserService'];

export { SignUpController };
