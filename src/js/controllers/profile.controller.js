import $ from 'jquery';

function ProfileController(UserService, $cookies) {

  let vm = this;

  init();

  function init(){
    let user = $cookies.get('access_token')
    getUser(id);
  }

  function getUser(id){
    UserService.getUser(id).then(function(res){
      console.log(res);
    })
  }

}

ProfileController.$inject = ['UserService', '$cookies'];

export {  ProfileController };
