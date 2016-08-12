function UserService ($http, $cookies, SERVER){

  this.signup = signup;
  this.login = login;
  this.loggedIn = loggedIn;
  this.logOut = logOut;
  this.getUser = getUser;

  let token = $cookies.get('access_token');

  let config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  function signup(user){
    return $http.post(SERVER.URL + 'signup', user);
  }

  function login(user){
    return $http.post(SERVER.URL + 'login', user);
  }

  function loggedIn(){
    // console.log('Logged in: ', $cookies.get('access_token') ? true : false);
    return $cookies.get('access_token') ? true : false;
  }

  function logOut(){
    $cookies.remove('access_token');
  }

  function getUser(user){
    return $http.get(SERVER.URL + 'accounts', user, config)
  }

}

UserService.$inject = ['$http', '$cookies', 'SERVER'];

export { UserService };
