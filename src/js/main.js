// import angular and router
import angular from 'angular';
import 'angular-ui-router';

// import config and constant
import { config } from './utilities/config';
import { serverConstant } from './utilities/constant';

// import services


// import controllers





angular
  .module('app', ['ui.router'])
  .config(config)
  .constant('SERVER', serverConstant)

;
