import $ from 'jquery';

function SignUpController($http, SERVER, $state, UserService) {
  let vm = this;
  vm.signup = signup;
  vm.loadingIndicator = false;

  function signup(user){
    vm.loadingIndicator = true;
    UserService.signup(user).then(function(res){
      console.log(res);
      // Refactor this code using try and catch
      // vm.user = {};
      if (res.status === 201){
        $state.go('root.log-in');
      }else {
        alert('Email or Username has been taken by someone else')
      }
    })
  }

}

SignUpController.$inject = ['$http', 'SERVER', '$state', 'UserService'];

export { SignUpController };
