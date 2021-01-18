import angular from 'angular';
import 'angular-route';
import './app.js';
import './services.js';
import './components.js';

import './root.css';
import {ROOT_MODULE} from '@src/config.constants';


angular.bootstrap(document.querySelector('#root'), [ROOT_MODULE]);
