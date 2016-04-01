'use strict';

angular.module('app').directive('myProgressBar', function() {
  return function(scope, element, attrs) {
  scope.$watch(attrs.myProgress, function(val) {
      
      var type = 'checklist-progress';
      
       element.html('<div class="' + type + '" style="width: ' + val + '%;height: 100%"></div>');
  });
  };
});