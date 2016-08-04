import $ from 'jquery';

function SignUpController() {

  let vm = this;
  let show = false;
  vm.showSignup = showSignup;
  vm.showLogin = showLogin;


  function showSignup(){
    show = true;
  }

  function showLogin(){
    show = true
  }

}

SignUpController.$inject = [];

export { SignUpController };
