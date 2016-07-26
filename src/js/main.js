// import angular and router
import angular from 'angular';
import 'angular-ui-router';

// import config and constant
import { config } from './utilities/config';





angular
  .module('app', ['ui.router'])
  .config(config)

;
