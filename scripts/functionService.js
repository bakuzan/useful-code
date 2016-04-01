(function () {

    'use strict';
    angular.module('app').factory('FunctionService', function () {
        return {
            lowerFirstLetter: lowerFirstLetter,
            findWithAttr: findWithAttr,
            friendlyErrorBuilder: friendlyErrorBuilder,
            compareString: compareString
        }
        
        function lowerFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }

        //Find object using attr of value in array.
        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;  //when doesn't exist.
        };

        function compareString(a, b, sensitive) {
            if (sensitive)  return a.toLowerCase() === b.toLowerCase();
            if (!sensitive) return a === b;
        };

        function friendlyErrorBuilder(res) {
            var idx, title, error,
                details = res.error.details,
                message = res.error.message;
            if (details === null) {
                //idx = message.lastIndexOf(')');
                title = 'Error';
                error = message;
                //error = (idx === -1) ? message :
                //                       message.substring(idx + 1);
            } else {
                //idx = details.lastIndexOf(')');
                title = message;
                error = details;
                //error = (idx === -1) ? details :
                //                       details.substring(idx + 1);
            }
            return { title: title, message: error };
        }

    });
})()