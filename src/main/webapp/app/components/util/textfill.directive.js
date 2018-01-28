/**
 * Copied and adapted from https://github.com/HenningM/angular-textfill/blob/master/angular-textfill.js
 * (accessed: 2018-01-22 22:14)
 */

(function () {
    'use strict';

    angular
        .module('artemisApp')
        .directive('textfill', textfill);

    textfill.$inject = ['$window'];

    function textfill($window) {
        return {
            restrict: 'A',
            scope: {
                textfill: '@'
            },
            template: '',
            link: function (scope, element, attr) {
                var options = {
                    innerTag: attr.innerTag || "span",
                    debug: attr.debug || false,
                    minFontPixels: parseInt(attr.minFontPixels) || 6,
                    maxFontPixels: parseInt(attr.maxFontPixels) || 30,
                    widthOnly: attr.widthOnly || false,
                    explicitHeight: attr.explicitHeight || null,
                    explicitWidth: attr.explicitWidth || null
                };

                function runTextFill() {
                    element.textfill(options);
                }

                runTextFill();

                // react to changes in model
                scope.$watch('textfill', runTextFill);

                // react to resize event
                scope.$watch(
                    function () {
                        return [element[0].offsetWidth, element[0].offsetHeight].join('x');
                    },
                    runTextFill
                );
            }
        };
    }
})();