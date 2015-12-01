System.register('ionic/util/feature-detect', [], function (_export) {
    'use strict';

    var FeatureDetect, featureDetects;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            FeatureDetect = (function () {
                function FeatureDetect() {
                    _classCallCheck(this, FeatureDetect);
                }

                _createClass(FeatureDetect, [{
                    key: 'run',
                    value: function run(window, document) {
                        this._results = {};
                        for (var _name in featureDetects) {
                            this._results[_name] = featureDetects[_name](window, document, document.body);
                        }
                    }
                }, {
                    key: 'has',
                    value: function has(featureName) {
                        return !!this._results[featureName];
                    }
                }], [{
                    key: 'add',
                    value: function add(name, fn) {
                        featureDetects[name] = fn;
                    }
                }]);

                return FeatureDetect;
            })();

            _export('FeatureDetect', FeatureDetect);

            featureDetects = {};

            // FeatureDetect.add('sticky', function(window, document) {
            //   // css position sticky
            //   let ele = document.createElement('div');
            //   ele.style.cssText = 'position:-webkit-sticky;position:sticky';
            //   return ele.style.position.indexOf('sticky') > -1;
            // });
            FeatureDetect.add('hairlines', function (window, document, body) {
                /**
                * Hairline Shim
                * Add the "hairline" CSS class name to the body tag
                * if the browser supports subpixels.
                */
                var canDo = false;
                if (window.devicePixelRatio >= 2) {
                    var hairlineEle = document.createElement('div');
                    hairlineEle.style.border = '.5px solid transparent';
                    body.appendChild(hairlineEle);
                    if (hairlineEle.offsetHeight === 1) {
                        body.classList.add('hairlines');
                        canDo = true;
                    }
                    body.removeChild(hairlineEle);
                }
                return canDo;
            });
        }
    };
});