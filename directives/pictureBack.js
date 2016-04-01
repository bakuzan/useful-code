'use strict';

angular.module('app').directive('pictureBacking', function(){
    return function(scope, element, attrs){
        var url = attrs.pictureBacking;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
        });
    };
});