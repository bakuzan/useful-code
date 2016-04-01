(function () {
    'use strict';
    angular
        .module('app')
        .directive('focusOnShow', ['$timeout', function ($timeout) {
            return function (scope, element, attrs) {
                scope.$watch(attrs.focusOnShow, function (newValue) {
                    $timeout(function () {
                        var myValue = newValue && element[0].focus();
                        return myValue;
                    });
                }, true);
            };
        }])
        .directive('anywhereButHere', function ($document, $window) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.data('thing', true);

                    /** On click, check what you clicked and whether you can ignore it.
                        *    Based on checks false the ng-show of the anywhere-but-here element.
                        */
                    angular.element($document[0].body).on('click', function (e) {
                        var inThing = angular.element(e.target).inheritedData('thing'),
                            ignore = angular.element(e.target).attr('ignore-here');
                        if (scope.$parent[attrs.ngShow] && !inThing && !ignore) {
                            console.log('anywhere-but-here');
                            scope.$apply(function () {
                                scope.$parent[attrs.ngShow] = false;
                            });
                        }
                    });
                }
            };
        })
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
        })
        .directive('autocompleteDynamicWidth', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var discrepancy = 45,
                        width,
                        el = document.createElement('li'),
                        inner = document.createElement('span'),
                        body = document.getElementsByTagName('body')[0];
                    el.id = 'width-setter';
                    el.appendChild(inner)
                    body.appendChild(el);

                    function setWidth(word) {
                        inner.textContent = word;
                        width = el.offsetWidth;
                        element[0].style.width = width + discrepancy + 'px';
                    }

                    scope.$watch('self.maxlength', function (newValue) {
                        if (newValue.length > 0) {
                            setWidth(newValue);
                        }
                    });

                }
            }
        })
        .directive("scrollExecutor", function () {
            return function (scope, elm, attr) {
                var raw = elm[0],
                    func = attr.scrollExecutor,
                    preEmpt = 10;

                elm.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - preEmpt) {
                        scope.$apply(func);
                    }
                });
            };
        })
        .directive('infiniteScroll', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
            return {
                link: function (scope, elem, attrs) {
                    var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                    $window = angular.element($window);
                    elem.css('overflow-y', 'scroll');
                    elem.css('overflow-x', 'hidden');
                    elem.css('height', 'inherit');
                    scrollDistance = 0;
                    if (attrs.infiniteScrollDistance != null) {
                        scope.$watch(attrs.infiniteScrollDistance, function (value) {
                            return scrollDistance = parseInt(value, 10);
                        });
                    }
                    scrollEnabled = true;
                    checkWhenEnabled = false;
                    if (attrs.infiniteScrollDisabled != null) {
                        scope.$watch(attrs.infiniteScrollDisabled, function (value) {
                            scrollEnabled = !value;
                            if (scrollEnabled && checkWhenEnabled) {
                                checkWhenEnabled = false;
                                return handler();
                            }
                        });
                    }
                    $rootScope.$on('refreshStart', function (event, parameters) {
                        elem.animate({ scrollTop: "0" });
                    });
                    handler = function () {
                        var container, elementBottom, remaining, shouldScroll, containerBottom;
                        container = $(elem.children()[0]);
                        elementBottom = elem.offset().top + elem.height();
                        containerBottom = container.offset().top + container.height();
                        remaining = containerBottom - elementBottom;
                        shouldScroll = remaining <= elem.height() * scrollDistance;
                        if (shouldScroll && scrollEnabled) {
                            if ($rootScope.$$phase) {
                                return scope.$eval(attrs.infiniteScroll);
                            } else {
                                return scope.$apply(attrs.infiniteScroll);
                            }
                        } else if (shouldScroll) {
                            return checkWhenEnabled = true;
                        }
                    };
                    elem.on('scroll', handler);
                    scope.$on('$destroy', function () {
                        return $window.off('scroll', handler);
                    });
                    return $timeout((function () {
                        if (attrs.infiniteScrollImmediateCheck) {
                            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                                return handler();
                            }
                        } else {
                            return handler();
                        }
                    }), 0);
                }
            };
        }])
        .directive('blockCollapse', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    blockCollapse: '='
                },
                link: function (scope, elm, attrs) {
                    var el = elm[0];
                    el.classList.add('collapsed');

                    elm.bind('click', function (e) {
                        if (el.className.indexOf('collapsed') === -1) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });

                    //Fire a click of to re-open after the 'folder query'
                    scope.$watch('blockCollapse', function (newValue) {
                        if (newValue !== undefined) {
                            if (newValue) {
                                $timeout(function () {
                                    elm.click();
                                }, 250);
                            }
                        }
                    })

                }
            };
        }])
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
        .directive('steps', function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                template: '<div class="steps" ng-transclude>' +
                          '</div>'
            };
        })
        .directive('step', function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                scope: {
                    stepConfig: '='
                },
                templateUrl: abp.appPath + 'App/Main/views/Administration/TemplateWizard/step.html',
                link: function (scope, elm, attrs) {
                    scope.stepNumber = elm.index() + 1;
                    var element = elm[0],
                        classList = element.classList;

                    function classRemove(array) {
                        angular.forEach(array, function (item) {
                            classList.remove(item);
                        });
                    }
                    function classAdd(array) {
                        angular.forEach(array, function (item) {
                            classList.add(item);
                        });
                    }
                    function setZIndex(number) {
                        element.style.zIndex = number;
                    }

                    scope.$watch('stepConfig.currentPage', function (newValue) {
                        if (newValue !== undefined) {
                            if (scope.stepNumber === scope.stepConfig.currentPage) {
                                classRemove(['step-transition', 'step-out']);
                                setZIndex(2);
                                classAdd(['step-transition', 'step-in']);
                            } else {
                                classRemove(['step-transition', 'step-in']);
                                setZIndex(1);
                                classAdd(['step-transition', 'step-out']);
                            }
                        }
                    });
                }
            };
        })
        .directive('stepControls', function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                template: '<div class="step-controls step-button-group padding-5" layout="row" ng-transclude>' +
                           '</div>'
            };
        });

})();