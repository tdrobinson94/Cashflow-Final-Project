// import angular and router
import angular from 'angular';
import 'angular-ui-router';

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




angular
  .module('app', ['ui.router'])
  .config(config)
  .constant('SERVER', serverConstant)
  .service('CalendarService', CalendarService)
  .controller('CalendarController', CalendarController)
  .controller('HomeController', HomeController)
  .controller('LayoutController', LayoutController)
  .controller('ProfileController', ProfileController)

;
