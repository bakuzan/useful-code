(function () {
    'use strict';

    angular.module('app').factory('FunctionService', ['$q', function ($q) {
        var service = this;

        service.commonValues = function () {
            return {
                bands: { 'High': '#41a891', 'Medium': '#a044c9', 'Low': '#dbad5e' }
            };
        };

        service.lowerFirstLetter = function(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }

        //Find object using attr of value in array.
        service.findWithAttr = function(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;  //when doesn't exist.
        }

        service.compareString = function (a, b, sensitive) {
            if (sensitive) return a.toLowerCase() === b.toLowerCase();
            if (!sensitive) return a === b;
        }

        //Separates items of 1 array into several based on values of given properties.
        service.groupItemsByProperties = function (array, groupProperties) {
            return $q(function (resolve, reject) {
                var groupedArrays = groupBy(array, function (item) {
                    return getGroupProperties(item, groupProperties);
                });
                resolve(groupedArrays);
            });
        }

        //Retrieve the item values for grouping by
        function getGroupProperties(item, groups) {
            var array = [];
            angular.forEach(groups, function (group) {
                array.push(item[group]);
            });
            return array;
        }
        //Group the items into arrays using the values.
        function groupBy(array, f) {
            var groups = {};
            array.forEach(function (o) {
                var group = JSON.stringify(f(o));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function (group) {
                return groups[group];
            })
        }

        return service;
    }]);
})()