import angular from 'angular';
import {ROOT_MODULE} from './config.constants';

const ALLY_MODULE = angular.module(ROOT_MODULE, ['ngRoute']);

ALLY_MODULE.config(['$routeProvider', ($routeProvider) => {

    $routeProvider.when('/list', {
        template: '<list-okrs></list-okrs>'
    })
    .otherwise({
        redirectTo: '/list'
    });

}]);
