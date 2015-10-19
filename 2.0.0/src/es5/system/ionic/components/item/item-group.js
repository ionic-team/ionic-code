System.register("ionic/components/item/item-group", ["angular2/angular2", "../content/content", "../../util/util", "../../util/dom", "../../util/feature-detect", "../../config/config"], function (_export) {
    /**
     * TODO
     */
    "use strict";

    var Directive, ElementRef, Content, throttle, position, offset, CSS, raf, FeatureDetect, Config, __decorate, __metadata, ItemGroup, ItemGroupTitle, _a, _b, _c, _d, _e;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
        }, function (_contentContent) {
            Content = _contentContent.Content;
        }, function (_utilUtil) {
            throttle = _utilUtil.throttle;
        }, function (_utilDom) {
            position = _utilDom.position;
            offset = _utilDom.offset;
            CSS = _utilDom.CSS;
            raf = _utilDom.raf;
        }, function (_utilFeatureDetect) {
            FeatureDetect = _utilFeatureDetect.FeatureDetect;
        }, function (_configConfig) {
            Config = _configConfig.Config;
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

            ItemGroup =
            /**
             * TODO
             * @param {ElementRef} elementRef  TODO
             */
            function ItemGroup(elementRef) {
                _classCallCheck(this, ItemGroup);

                this.ele = elementRef.nativeElement;
            };

            _export("ItemGroup", ItemGroup);

            _export("ItemGroup", ItemGroup = __decorate([Directive({
                selector: 'ion-item-group',
                host: {
                    'class': 'item-group'
                }
            }), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object])], ItemGroup));
            /**
             * TODO
             */

            ItemGroupTitle = (function () {
                /**
                 * TODO
                 * @param {ElementRef} elementRef  TODO
                 */

                function ItemGroupTitle(elementRef, config, content, featureDetect) {
                    _classCallCheck(this, ItemGroupTitle);

                    this.isSticky = true;
                    this.content = content;
                    this.ele = elementRef.nativeElement;
                    this.parent = this.ele.parentNode;
                    this.isCssValid = true; //featureDetect.has('positionsticky')
                }

                _createClass(ItemGroupTitle, [{
                    key: "onInit",
                    value: function onInit() {
                        var _this = this;

                        if (!this.content || this.isCssValid) {
                            return;
                        }
                        this.scrollContent = this.content.elementRef.nativeElement.children[0];
                        this.scrollMin = 0;
                        this.scrollMax = 0;
                        this.scrollTransition = 0;
                        this.isSticking = false;
                        this.scrollContent.addEventListener('scroll', function (event) {
                            return _this.scrollEvent(event);
                        });
                        this.calculateScrollLimits = function (scrollTop) {
                            var containerPosition = position(_this.parent);
                            var elementOffset = offset(_this.ele);
                            var containerTop = containerPosition.top;
                            var containerHeight = containerPosition.height;
                            var affixHeight = elementOffset.height;
                            _this.scrollMin = containerTop;
                            _this.scrollMax = _this.scrollMin + containerHeight;
                            _this.scrollTransition = _this.scrollMax - affixHeight;
                        };
                        // throttled version of the same calculation
                        var CALCULATION_THROTTLE_MS = 500;
                        this.throttledCalculateScrollLimits = throttle(this.calculateScrollLimits, CALCULATION_THROTTLE_MS, { trailing: false });
                    }
                }, {
                    key: "applyTransform",
                    value: function applyTransform(element, transformString) {
                        // do not apply the transformation if it is already applied
                        if (element.style[CSS.transform] == transformString) {} else {
                            element.style[CSS.transform] = transformString;
                        }
                    }
                }, {
                    key: "translateUp",
                    value: function translateUp(element, dy, executeImmediately) {
                        var _this2 = this;

                        var translateDyPixelsUp = dy == 0 ? 'translate3d(0px, 0px, 0px)' : 'translate3d(0px, -' + dy + 'px, 0px)';
                        // if immediate execution is requested, then just execute immediately
                        // if not, execute in the animation frame.
                        if (executeImmediately) {
                            this.applyTransform(element, translateDyPixelsUp);
                        } else {
                            raf(function (a) {
                                return _this2.applyTransform(element, translateDyPixelsUp);
                            });
                        }
                    }
                }, {
                    key: "createAffixClone",
                    value: function createAffixClone() {
                        var clone = this.ele.cloneNode(true);
                        clone.style.position = 'absolute';
                        clone.style.top = 0;
                        clone.style.left = 0;
                        clone.style.right = 0;
                        this.scrollContent.parentNode.appendChild(clone);
                        return clone;
                    }
                }, {
                    key: "scrollEvent",
                    value: function scrollEvent(event) {
                        var scrollTop = event.target.scrollTop;
                        // when scroll to top, we should always execute the immediate calculation.
                        // this is because of some weird problem which is hard to describe.
                        // if you want to experiment, always use the throttled one and just click on the page
                        // you will see all affix elements stacked on top
                        if (scrollTop == 0) {
                            this.calculateScrollLimits(scrollTop);
                        } else {
                            this.throttledCalculateScrollLimits(scrollTop);
                        }
                        // when we scrolled to the container, create the clone of element and place it on top
                        if (scrollTop >= this.scrollMin && scrollTop <= this.scrollMax) {
                            // we need to track if we created the clone just now
                            // that is important since normally we apply the transforms in the animation frame
                            // but, we need to apply the transform immediately when we add the element for the first time. otherwise it is too late!
                            var cloneCreatedJustNow = false;
                            if (!this.affixClone) {
                                this.affixClone = this.createAffixClone();
                                cloneCreatedJustNow = true;
                                this.isSticking = true;
                            }
                            // if we're reaching towards the end of the container, apply some nice translation to move up/down the clone
                            // but if we're reached already to the container and we're far away than the end, move clone to top
                            if (scrollTop > this.scrollTransition) {
                                this.translateUp(this.affixClone, Math.floor(scrollTop - this.scrollTransition), cloneCreatedJustNow);
                            } else {
                                this.translateUp(this.affixClone, 0, cloneCreatedJustNow);
                            }
                        } else {
                            this.removeAffixClone();
                            this.isSticking = false;
                        }
                    }
                }, {
                    key: "removeAffixClone",
                    value: function removeAffixClone() {
                        if (this.affixClone) {
                            this.scrollContent.parentNode.removeChild(this.affixClone);
                            this.affixClone = null;
                        }
                    }
                }]);

                return ItemGroupTitle;
            })();

            _export("ItemGroupTitle", ItemGroupTitle);

            _export("ItemGroupTitle", ItemGroupTitle = __decorate([Directive({
                selector: 'ion-item-group-title',
                host: {
                    'class': 'item-group-title',
                    '[class.sticky]': 'isSticky'
                }
            }), __metadata('design:paramtypes', [typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof Content !== 'undefined' && Content) === 'function' && _d || Object, typeof (_e = typeof FeatureDetect !== 'undefined' && FeatureDetect) === 'function' && _e || Object])], ItemGroupTitle));
        }
    };
});