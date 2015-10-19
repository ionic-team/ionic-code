System.register("ionic/components/overlay/overlay-controller", ["angular2/angular2", "../app/app", "../../animations/animation", "ionic/util"], function (_export) {
    "use strict";

    var NgZone, Injectable, Renderer, IonicApp, Animation, util, __decorate, __metadata, OverlayController, ROOT_Z_INDEX, _a, _b, _c;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            NgZone = _angular2Angular2.NgZone;
            Injectable = _angular2Angular2.Injectable;
            Renderer = _angular2Angular2.Renderer;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_animationsAnimation) {
            Animation = _animationsAnimation.Animation;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
                switch (arguments.length) {
                    case 2:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(o) || o;
                        }, target);
                    case 3:
                        return decorators.reduceRight(function (o, d) {
                            return (d && d(target, key), void 0);
                        }, void 0);
                    case 4:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(target, key, o) || o;
                        }, desc);
                }
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            OverlayController = (function () {
                function OverlayController(app, zone, renderer) {
                    _classCallCheck(this, OverlayController);

                    this.app = app;
                    this.zone = zone;
                    this.renderer = renderer;
                    this.refs = [];
                }

                _createClass(OverlayController, [{
                    key: "open",
                    value: function open(overlayType, componentType) {
                        var _this = this;

                        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                        if (!this.anchor) {
                            console.error('<ion-overlay></ion-overlay> required in root component template to use: ' + overlayType);
                            return Promise.reject();
                        }
                        var resolve = undefined,
                            reject = undefined;
                        var promise = new Promise(function (res, rej) {
                            resolve = res;reject = rej;
                        });
                        try {
                            this.anchor.append(componentType).then(function (ref) {
                                var instance = ref && ref.instance;
                                if (!instance) {
                                    return reject();
                                }
                                ref._z = ROOT_Z_INDEX;
                                for (var i = 0; i < _this.refs.length; i++) {
                                    if (_this.refs[i]._z >= ref._z) {
                                        ref._z = _this.refs[i]._z + 1;
                                    }
                                }
                                _this.renderer.setElementStyle(ref.location, 'zIndex', ref._z);
                                util.extend(instance, opts);
                                ref._type = overlayType;
                                ref._handle = opts.handle || overlayType + ref._z;
                                _this.add(ref);
                                instance.close = function () {
                                    var closeOpts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                                    _this.close(ref, util.extend(opts, closeOpts));
                                };
                                instance.onPageLoaded && instance.onPageLoaded();
                                instance.onPageWillEnter && instance.onPageWillEnter();
                                var animation = Animation.create(ref.location.nativeElement, opts.enterAnimation);
                                animation.before.addClass('show-overlay');
                                _this.app.setEnabled(false, animation.duration());
                                _this.app.setTransitioning(true, animation.duration());
                                _this.zone.runOutsideAngular(function () {
                                    animation.play().then(function () {
                                        animation.dispose();
                                        _this.zone.run(function () {
                                            _this.app.setEnabled(true);
                                            _this.app.setTransitioning(false);
                                            instance.onPageDidEnter && instance.onPageDidEnter();
                                            resolve();
                                        });
                                    });
                                });
                            })["catch"](function (err) {
                                console.error(err);
                            });
                        } catch (e) {
                            console.error(e);
                        }
                        return promise;
                    }
                }, {
                    key: "close",
                    value: function close(ref, opts) {
                        var _this2 = this;

                        var resolve = undefined;
                        var promise = new Promise(function (res) {
                            resolve = res;
                        });
                        var instance = ref.instance;
                        instance.onPageWillLeave && instance.onPageWillLeave();
                        instance.onPageWillUnload && instance.onPageWillUnload();
                        var animation = Animation.create(ref.location.nativeElement, opts.leaveAnimation);
                        animation.after.removeClass('show-overlay');
                        this.app.setEnabled(false, animation.duration());
                        this.app.setTransitioning(true, animation.duration());
                        this.zone.runOutsideAngular(function () {
                            animation.play().then(function () {
                                animation.dispose();
                                _this2.zone.run(function () {
                                    instance.onPageDidLeave && instance.onPageDidLeave();
                                    instance.onPageDidUnload && instance.onPageDidUnload();
                                    _this2.app.setEnabled(true);
                                    _this2.app.setTransitioning(false);
                                    _this2.remove(ref);
                                    resolve();
                                });
                            });
                        });
                        return promise;
                    }
                }, {
                    key: "add",
                    value: function add(ref) {
                        this.refs.push(ref);
                    }
                }, {
                    key: "remove",
                    value: function remove(ref) {
                        util.array.remove(this.refs, ref);
                        ref.dispose && ref.dispose();
                    }
                }, {
                    key: "getByType",
                    value: function getByType(overlayType) {
                        for (var i = this.refs.length - 1; i >= 0; i--) {
                            if (overlayType === this.refs[i]._type) {
                                return this.refs[i].instance;
                            }
                        }
                        return null;
                    }
                }, {
                    key: "getByHandle",
                    value: function getByHandle(handle, overlayType) {
                        for (var i = this.refs.length - 1; i >= 0; i--) {
                            if (handle === this.refs[i]._handle && overlayType === this.refs[i]._type) {
                                return this.refs[i].instance;
                            }
                        }
                        return null;
                    }
                }]);

                return OverlayController;
            })();

            _export("OverlayController", OverlayController);

            _export("OverlayController", OverlayController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a || Object, typeof (_b = typeof NgZone !== 'undefined' && NgZone) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object])], OverlayController));
            ROOT_Z_INDEX = 1000;
        }
    };
});