import angular from 'angular';
import {ROOT_MODULE} from '@src/config.constants.js';

class OkrDetailsComponent {
    constructor() {
    }
}


angular.module(ROOT_MODULE)
    .component('okrDetails', {
        template: require('./okrDetails.template.html'),
        controller: OkrDetailsComponent,
        controllerAs: 'OkrDetailCtrl',
        bindings: {
            okr: '='
        }
    });