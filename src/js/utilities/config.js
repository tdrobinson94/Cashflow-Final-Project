function config($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('root', {
    templateUrl: 'templates/layout.tpl.html',
    abstract: true
  })

  .state('root.calendar', {
    url: '/calendar',
    templateUrl: 'templates/calendar.tpl.html',
    controller: 'CalendarController as vm'
  })

  $urlRouterProvider.otherwise('/calendar');


};

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export { config };
