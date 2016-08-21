function config($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('root', {
    templateUrl: 'templates/layout.tpl.html',
    controller: 'LayoutController as vm',
    abstract: true
  })

  .state('root.home', {
    url:'/home',
    templateUrl: 'templates/home.tpl.html',
    controller: 'HomeController as vm'
  })

  .state('root.calendar', {
    url: '/calendar',
    templateUrl: 'templates/calendar.tpl.html',
    controller: 'CalendarController as vm'
  })

  .state('root.sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.tpl.html',
    controller: 'SignUpController as vm'
  })

  .state('root.log-in', {
    url:'/log-in',
    templateUrl: 'templates/log-in.tpl.html',
    controller: 'LoginController as vm'
  })

  .state('root.profile', {
    url: '/profile',
    templateUrl: 'templates/profile.tpl.html',
    controller: 'ProfileController as vm'
  })

  .state('root.settings', {
    url: '/settings',
    templateUrl: 'templates/settings.tpl.html',
  })

  $urlRouterProvider.otherwise('/home');


};

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export { config };
