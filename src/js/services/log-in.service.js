function LoginService ($http, $cookies, SERVER){

  this.signup = signup;
  this.login = login;
  this.loggedIn = loggedIn;
  this.logOut = logOut;


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
}

LoginService.$inject = ['$http', '$cookies', 'SERVER'];

export { LoginService };
