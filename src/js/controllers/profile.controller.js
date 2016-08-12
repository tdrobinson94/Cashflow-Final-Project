import $ from 'jquery';

function ProfileController($cookies, ProfileService, UserService) {

  let vm = this;
  vm.accountForm = false;
  vm.showAccountForm = showAccountForm;
  vm.hideAccountForm = hideAccountForm;
  vm.addAccount = addAccount;
  vm.deleteAccount = deleteAccount;
  vm.accounts = [];

  init();

  function init(){
    getAccountInfo();
    // getUser();
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
      vm.accountForm = false;
      getAccountInfo();
      console.log(getAccountInfo());
      vm.account = {};
    })
  }

  function getAccountInfo(){
    let user_id = $cookies.get('user_id');
    ProfileService.getAccountInfo(user_id).then(function(res){
      console.log(res);
      vm.accounts = res.data.reverse();
    })
  }

  function deleteAccount(account_id){
    ProfileService.deleteAccount(account_id).then(function(res){
      vm.accounts = vm.accounts.filter( (account) => {
        return account.id !== account_id;
      });
    })
  }

  // function getUser(){
  //   UserService.getUser(user).then(function(res){
  //     console.log(res);
  //   })
  // }

}

ProfileController.$inject = ['$cookies', 'ProfileService', 'UserService'];

export {  ProfileController };
