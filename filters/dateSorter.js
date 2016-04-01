'use strict';

angular.module('app')
.filter('dateSorter', function () {
    return function (input) {
        input.sort(function (obj1, obj2) {
            var a = obj1.dateModified === null ? obj1.dateCreated : obj1.dateModified,
                b = obj2.dateModified === null ? obj2.dateCreated : obj2.dateModified;
            return a > b ? -1 :
                   a < b ?  1 :
                            0 ;
        });
        return input;
    };
});