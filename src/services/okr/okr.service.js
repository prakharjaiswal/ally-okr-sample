import angular from 'angular';
import {ROOT_MODULE} from '@src/config.constants';

let $http;


let arrangeNestedOkrs = (okrs) => {
    let nestedOkrs = [];
    let mappedOkrs = {};
    let deferred = [];

    let checkForParent = (okr) => {
        if(!okr.parent_objective_id) {
            nestedOkrs.push(okr);
        }
        else if(!mappedOkrs[okr.parent_objective_id]){
            deferred.push(okr);
            
        }
        else {
            mappedOkrs[okr.parent_objective_id].subOkrs = mappedOkrs[okr.parent_objective_id].subOkrs || [];
            mappedOkrs[okr.parent_objective_id].subOkrs.push(okr);
        }
        mappedOkrs[okr.id] = okr;
    };
    okrs.forEach(checkForParent);
    deferred.forEach(checkForParent);
    return nestedOkrs;
};

class OKRService {
    constructor(http) {
        $http = http;
    }

    fetchOkrs() {
        return $http.get('https://okrcentral.github.io/sample-okrs/db.json')
                                .then(({data: {data}}) => data)
                                .then((data) => {
                                    let categories = this.parseCategories(data);
                                    return {categories, okrs: data};
                                })
                                .then((result) => ({...result, okrs: arrangeNestedOkrs(result.okrs)}));
        
    }

    parseCategories(data) {
        let set = data.reduce((categories, okr) => categories.add(okr.category), new Set());
        return Array.from(set);
    }
}

OKRService.$inject = ['$http'];

angular.module(ROOT_MODULE)
    .service('okr.service', OKRService);