.directive('disableEnter', function ($document, $window) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    //Control what enter key does in 'step' form.
                    element.bind('keydown', function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                        }
                    });
                }
            };
        })
        .directive('disableSpace', function ($document, $window) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var span = document.createElement('span'),
                        parent = element[0].parentElement,
                        classList = span.classList;
                    classList.add('disable-space-warning');
                    classList.add('disable-space-right');
                    parent.appendChild(span);

                    //Disable spaces.
                    element.bind('keydown', function (e) {
                        if (e.keyCode === 32) {
                            e.preventDefault();
                            classList.add('block-space');
                            //fade out after 3s
                            setTimeout(function () {
                                classList.remove('block-space');
                            }, 3000);
                        }
                    });
                }
            };
        });