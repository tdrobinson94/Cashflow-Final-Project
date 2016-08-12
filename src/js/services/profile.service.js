function ProfileService($http, $cookies, SERVER){

  this.addAccount = addAccount;
  this.getAccountInfo = getAccountInfo;
  this.deleteAccount = deleteAccount;
  let token = $cookies.get('access_token');

  let config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  function addAccount (account){
    return $http.post(SERVER.URL + 'account', account, config)
  }

  function getAccountInfo(user_id){
    config.params = { user_id: user_id };
    return $http.get(SERVER.URL + 'profile/accounts', config)
  }

  function deleteAccount(account_id){
    let header = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    return $http.delete(SERVER.URL + 'account/' + account_id, header)
  }


}

ProfileService.$inject = ['$http', '$cookies', 'SERVER'];


export { ProfileService };
