import $ from 'jquery';

function ProfileController(UserService, $cookies) {

  let vm = this;
  vm.enterAccountInfo = enterAccountInfo;
  vm.accountInput = accountInput;
  vm.account = [];
  vm.showAccountInput = {
		accountInput: false
	};

  function enterAccountInfo(account){
		vm.showAccountInput.accountInput = true;
	}

  // init();
  //
  // function init(){
  //   let user = $cookies.get('access_token')
  //   getUser(id);
  // }
  //
  // function getUser(id){
  //   UserService.getUser(id).then(function(res){
  //     console.log(res);
  //   })
  // }

}

ProfileController.$inject = ['UserService', '$cookies'];

export {  ProfileController };
