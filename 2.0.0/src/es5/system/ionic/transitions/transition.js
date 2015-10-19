System.register('ionic/transitions/transition', [], function (_export) {
    'use strict';

    var Transition, transitionRegistry;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            Transition = (function () {
                function Transition() {
                    _classCallCheck(this, Transition);
                }

                _createClass(Transition, null, [{
                    key: 'create',
                    value: function create(navCtrl) {
                        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                        var name = opts.animation || 'ios';
                        var TransitionClass = transitionRegistry[name];
                        if (!TransitionClass) {
                            TransitionClass = transitionRegistry.ios;
                        }
                        return new TransitionClass(navCtrl, opts);
                    }
                }, {
                    key: 'register',
                    value: function register(name, TransitionClass) {
                        transitionRegistry[name] = TransitionClass;
                    }
                }]);

                return Transition;
            })();

            _export('Transition', Transition);

            transitionRegistry = {};
        }
    };
});