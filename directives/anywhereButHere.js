'use strict';

angular.module('app')
.directive('anywhereButHere', function ($document, $window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.data('thing', true);

            angular.element($document[0].body).on('click', function (e) {
                var inThing = angular.element(e.target).inheritedData('thing');
                if (!inThing) {
                    scope.$apply(function () {
                        scope.close();
                    });
                }
            })
        }
    }
});
