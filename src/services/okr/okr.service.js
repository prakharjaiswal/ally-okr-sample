import angular from 'angular';
import {ROOT_MODULE} from '@src/config.constants';

let $http;


let arrangeNestedOkrs = (okrs) => {
    return okrs;
};

class OKRService {
    constructor(http) {
        $http = http;
    }

    fetchOkrs(generateCategories = false, nested = false) {
        let getOKRsPromise = $http.get('https://okrcentral.github.io/sample-okrs/db.json')
                                .then(({data: {data}}) => data);
        if(nested) {
            getOKRsPromise = getOKRsPromise.then((data) => arrangeNestedOkrs(data));
        }
        if(!generateCategories) {
            return getOKRsPromise;
        }
        return getOKRsPromise.then((data) => {
            let categories = this.parseCategories(data);
            return {categories, okrs: data};
        });
    }

    parseCategories(data) {
        let set = data.reduce((categories, okr) => categories.add(okr.category), new Set());
        return Array.from(set);
    }
}

OKRService.$inject = ['$http'];

angular.module(ROOT_MODULE)
    .service('okr.service', OKRService);