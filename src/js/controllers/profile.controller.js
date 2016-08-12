import $ from 'jquery';

function ProfileController($cookies, ProfileService) {

  let vm = this;
  vm.accountForm = false;
  vm.showAccountForm = showAccountForm;
  vm.hideAccountForm = hideAccountForm;
  vm.addAccount = addAccount;
  vm.accounts = [];

  init();

  function init(){
    getAccountInfo();
  }

  function showAccountForm(){
    vm.accountForm = true;
  }

  function hideAccountForm(){
    vm.accountForm = false;
  }

  function addAccount(account){
    ProfileService.addAccount(account).then(function(res){
      console.log(res);
      console.log(account);
      vm.accountForm = false;
      getAccountInfo();
    })
  }

  function getAccountInfo(){
    let user_id = $cookies.get('user_id');
    ProfileService.getAccountInfo(user_id).then(function(res){
      console.log(res);
      vm.accounts = res.data.reverse();
    })
  }



}

ProfileController.$inject = ['$cookies', 'ProfileService'];

export {  ProfileController };
