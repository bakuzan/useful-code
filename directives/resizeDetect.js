.directive('resizeDetect', ['$timeout', function ($timeout) {
            return {
                link: function (scope, elm, attrs) {
                    var el = elm[0],
                        child = el.firstChild,
                        func = attrs.resizeDetect;

                    //if resized, trigger attrs function.
                    scope.$watch(
                        function () {
                            return {
                                width: elm.width(),
                                height: elm.height(),
                            }
                        }, function () {
                            $timeout(function () {
                                scope.$apply(func);
                            }, 500);
                        }, true
                    );
                }
            };
        }])