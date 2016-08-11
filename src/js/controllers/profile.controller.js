import $ from 'jquery';

function ProfileController(UserService, $cookies) {

  let vm = this;
  vm.accountForm = false;
  vm.showAccountForm = showAccountForm;
  vm.hideAccountForm = hideAccountForm;

  function showAccountForm(){
    vm.accountForm = true;
  }

  function hideAccountForm(){
    vm.accountForm = false;
  }



}

ProfileController.$inject = ['UserService', '$cookies'];

export {  ProfileController };
