'use strict';

angular.module('app').filter('numberSuffix', function ($filter) {
    var suffixes = ['th', 'st', 'nd', 'rd'];
    return function (input) {
        if (input !== undefined) {
            var relevantDigits = (input < 30) ? input % 20 : input % 30,
                suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
            return input + suffix;
        }
    };
});