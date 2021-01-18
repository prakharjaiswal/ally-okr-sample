import angular from 'angular';
import {ROOT_MODULE} from '@src/config.constants.js';

let okrService;
class ListOkrsComponent {
    constructor(_okrService) {
        okrService = _okrService;
    }

    $onInit() {
        this.$$fetchOKRLists();
    }

    $$fetchOKRLists() {
        okrService.fetchOkrs(true, true)
            .then(({okrs, categories}) => {
                this.okrs = okrs;
                this.categories = categories;

            })
            .catch(err => console.error(err));
    }

    filterByCategory(okr) {
        if(!this.selectedOKRCategory) {
            return okr;
        }
        return okr.category === this.selectedOKRCategory;
    }
}

ListOkrsComponent.$inject = ['okr.service'];

angular.module(ROOT_MODULE)
    .component('listOkrs', {
        template: require('./listOkr.template.html'),
        controller: ListOkrsComponent,
        controllerAs: 'listOkrCtrl'
    });