.directive("scrollExecutor", function () {
            return function (scope, elm, attr) {
                var raw = elm[0],
                    scrollTop = raw.scrollTop,
                    offsetHeight = raw.offsetHeight,
                    scrollHeight = raw.scrollHeight,
                    func = attr.scrollExecutor;

                elm.bind('scroll', function () {
                    if (scrollTop + offsetHeight >= scrollHeight) {
                        scope.$apply(func);
                    }
                });
            };
        });