// import angular and router
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-cookies';

// import config and constant
import { config } from './utilities/config';
import { serverConstant } from './utilities/constant';
import { run } from './utilities/run';

// import services
import { CalendarService } from './services/calendar.service';
import { UserService } from './services/user.service';


// import controllers
import { CalendarController } from './controllers/calendar.controller';
import { HomeController } from './controllers/home.controller';
import { LayoutController } from './controllers/layout.controller';
import { ProfileController } from './controllers/profile.controller';
import { DayViewController } from './controllers/day-view.controller';
import { LoginController } from './controllers/login.controller';
import { SignUpController } from './controllers/signup.controller';
import { ExpenseController } from './controllers/expense.controller';
import { IncomeController } from './controllers/income.controller';


angular
  .module('app', ['ui.router', 'ngMaterial', 'ngCookies'])
  .config(config)
  .constant('SERVER', serverConstant)
  .run(run)
  .service('CalendarService', CalendarService)
  .service('UserService', UserService)
  .controller('DayViewController', DayViewController)
  .controller('CalendarController', CalendarController)
  .controller('HomeController', HomeController)
  .controller('LayoutController', LayoutController)
  .controller('ProfileController', ProfileController)
  .controller('LoginController', LoginController)
  .controller('SignUpController', SignUpController)
  .controller('ExpenseController', ExpenseController)
  .controller('IncomeController', IncomeController)

;
