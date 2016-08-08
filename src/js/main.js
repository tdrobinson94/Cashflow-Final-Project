// import angular and router
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';

// import config and constant
import { config } from './utilities/config';
import { serverConstant } from './utilities/constant';

// import services
import { CalendarService } from './services/calendar.service';


// import controllers
import { CalendarController } from './controllers/calendar.controller';
import { HomeController } from './controllers/home.controller';
import { LayoutController } from './controllers/layout.controller';
import { ProfileController } from './controllers/profile.controller';
import { DayViewController } from './controllers/day-view.controller';


angular
  .module('app', ['ui.router', 'ngMaterial'])
  .config(config)
  .constant('SERVER', serverConstant)
  .service('CalendarService', CalendarService)
  .controller('DayViewController', DayViewController)
  .controller('CalendarController', CalendarController)
  .controller('HomeController', HomeController)
  .controller('LayoutController', LayoutController)
  .controller('ProfileController', ProfileController)

;
