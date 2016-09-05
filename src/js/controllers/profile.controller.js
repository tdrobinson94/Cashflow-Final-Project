import $ from 'jquery';

function ProfileController($cookies, ProfileService, UserService) {

  let vm = this;
  vm.accountForm = false;
  vm.showAccountForm = showAccountForm;
  vm.hideAccountForm = hideAccountForm;
  vm.addAccount = addAccount;
  vm.deleteAccount = deleteAccount;
  vm.getUser = getUser;
  vm.accounts = [];
  vm.userInfo = {};
  vm.exampleForm = true;

  init();

  function init(){
    getUser();
    getAccountInfo();
  }

  function showAccountForm(){
    vm.accountForm = true;
    $('body').animate({scrollTop: '180px'}, 250);
  }

  function hideAccountForm(){
    vm.accountForm = false;
  }

  function addAccount(account){
    ProfileService.addAccount(account).then(function(res){
      console.log(res.status);
      vm.accountForm = false;
      getAccountInfo();
      vm.account = {};
      if (res.status === 204){
        alert("You can only have one account setup at a time!")
      }
    })
  }

  function getAccountInfo(){
    let user_id = $cookies.get('user_id');
    ProfileService.getAccountInfo(user_id).then(function(res){
      console.log(res.data);
      vm.accounts = res.data.reverse();
      if (res.data.length === 1){
        $('body').animate({scrollTop: '200px'}, 250);
        vm.exampleForm = false;
      } else {
        vm.exampleForm = true;
      }
    })
  }

  function deleteAccount(account_id){
    ProfileService.deleteAccount(account_id).then(function(res){
      vm.accounts = vm.accounts.filter( (account) => {
        return account.id !== account_id;
      });
    })
    vm.exampleForm = true;
  }

  function getUser(){
    UserService.getUser().then(function(res){
      vm.userInfo = res.data;
    })
  }

}

ProfileController.$inject = ['$cookies', 'ProfileService', 'UserService'];

export {  ProfileController };
