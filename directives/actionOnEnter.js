'use strict';

angular.module('app')
  return {
      restrict: 'AE',
      replace: true,
      scope: {
          slides: '=?',
          interval: '=?'
      },
      templateUrl: '/modules/characters/templates/slider.html',
      link: function(scope, elem, attrs) {
          var timer, autoSlide, length = elem[0].childElementCount - 1;
          scope.currentIndex = -1; //pre-first slide to stop 'cannot assign to undefined' error.
          scope.repeater = scope.slides === undefined ? false : true; //is there a collection to iterate through?
          scope.interval = scope.interval === undefined ? 3000 : scope.interval; //is there a custom interval?
          
          //allow retreival of local resource
          scope.trustAsResourceUrl = function(url) {
              return $sce.trustAsResourceUrl(url);
          };
          
          //if no collection, make a dummy collection to cycle throught the children.
          if (!scope.repeater) {
            scope.slides = []; //used to allow cycling.
            for(var i = 0; i < length; i++) {
                scope.slides.push({ index: i });
            }
          }
          scope.goToSlide = function(slide) {
//              console.log('go to', slide);
              if (scope.currentIndex !== slide) {
                  //reached end of slides?
                  if (slide !== scope.filteredSlides.length) {
                    scope.currentIndex = slide;
                  } else {
                    scope.currentIndex = 0;
                  }
              } else {
                  if (scope.filteredSlides[scope.currentIndex].locked) {
                    //unlock, i.e start timer.
                    scope.filteredSlides[scope.currentIndex].locked = false;
                  } else {
                    //lock, i.e. cancel timer.
                    scope.filteredSlides[scope.currentIndex].locked = true;
                    $timeout.cancel(timer);
                  }
              }
          };
          scope.next = function() {
              if (scope.currentIndex < scope.filteredSlides.length - 1) {
                  scope.currentIndex += 1;
              } else {
                  scope.currentIndex = 0;
              }
          };
          scope.prev = function() {
              if (scope.currentIndex > 0) {
                  scope.currentIndex -= 1;
              } else {
                  scope.currentIndex = scope.filteredSlides.length - 1;
              }
          };
          
          scope.$watch('currentIndex', function() {
//              console.log('index', scope.currentIndex, 'filtered slides ', scope.filteredSlides);
              if (scope.currentIndex > -1) {
                    scope.filteredSlides.forEach(function(slide) {
                        slide.visible = false; // make every slide invisible
                        slide.locked = false; // make every slide unlocked
                    });
                    scope.filteredSlides[scope.currentIndex].visible = true; // make the current slide visible
              }
          });
          
          autoSlide = function() {
              timer = $timeout(function() {
                  scope.next();
                  timer = $timeout(autoSlide, scope.interval);
              }, scope.interval);
          };
          autoSlide();
          scope.$on('$destroy', function() {
              $timeout.cancel(timer); // when the scope is destroyed, cancel the timer
          });
          
          //Stop timer on enter.
          scope.enter = function() {
//              console.log('entered');
              if (scope.filteredSlides[scope.currentIndex].locked !== true) {
                $timeout.cancel(timer);
//                  console.log('cancelled');
              }
          };
          //Restart timer on leave.
          scope.leave = function() {
//              console.log('left');
              if (scope.filteredSlides[scope.currentIndex].locked !== true) {
                timer = $timeout(autoSlide, scope.interval);
//                  console.log('restarted');
              }
          };
          
          /** FILTERS
           *    Code below here will allow the slides to be affected by the character filters.
           *    Note: the interval is removed and replaced to avoid the auto-slide fouling the
           *            change over up.
           */
          scope.$watch('$parent.filterConfig.search', function(newValue) {
              if (scope.$parent.filterConfig.search !== undefined) {
                  var temp = scope.interval;
                  scope.interval = null;
                  scope.search = newValue;
                  scope.interval = temp;
              }
          });
          scope.$watch('$parent.filterConfig.media', function(newValue) {
              if (scope.$parent.filterConfig.media !== undefined) {
                  var temp = scope.interval;
                  scope.interval = null;
                  scope.media = newValue;
                  scope.interval = temp;
              }
          });
          scope.$watch('$parent.filterConfig.searchTags', function(newValue) {
              if (scope.$parent.filterConfig.media !== undefined) {
                  var temp = scope.interval;
                  scope.interval = null;
                  scope.searchTags = newValue;
                  scope.interval = temp;
              }
          });
      }
  };
    
}]);
.directive('actionOnEnter', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.actionOnEnter);
                    });
                    event.preventDefault();
                 }
            });
        }
    };
});