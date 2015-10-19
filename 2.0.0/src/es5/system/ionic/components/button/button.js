System.register("ionic/components/button/button", ["angular2/angular2", "../../config/config"], function (_export) {
    /**
     * TODO
     */
    "use strict";

    var Directive, ElementRef, Renderer, Attribute, Config, __decorate, __metadata, __param, Button, TEXT, ICON, _a, _b, _c;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Renderer = _angular2Angular2.Renderer;
            Attribute = _angular2Angular2.Attribute;
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

            __param = undefined && undefined.__param || function (paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            };

            Button = function Button(config, elementRef, renderer, type) {
                _classCallCheck(this, Button);

                var element = elementRef.nativeElement;
                if (config.get('hoverCSS') === false) {
                    renderer.setElementClass(elementRef, 'disable-hover', true);
                }
                if (element.hasAttribute('ion-item')) {
                    // no need to put on these icon classes for an ion-item
                    return;
                }
                if (type) {
                    renderer.setElementAttribute(elementRef, type, '');
                }
                // figure out if and where the icon lives in the button
                var childNodes = element.childNodes;
                var childNode = undefined;
                var nodes = [];
                for (var i = 0, l = childNodes.length; i < l; i++) {
                    childNode = childNodes[i];
                    if (childNode.nodeType === 3) {
                        // text node
                        if (childNode.textContent.trim() !== '') {
                            nodes.push(TEXT);
                        }
                    } else if (childNode.nodeType === 1) {
                        if (childNode.nodeName === 'ICON') {
                            // icon element node
                            nodes.push(ICON);
                        } else {
                            // element other than an <icon>
                            nodes.push(TEXT);
                        }
                    }
                }
                if (nodes.length > 1) {
                    if (nodes[0] === ICON && nodes[1] === TEXT) {
                        element.classList.add('icon-left');
                    } else if (nodes[0] === TEXT && nodes[1] === ICON) {
                        element.classList.add('icon-right');
                    }
                } else if (nodes.length === 1 && nodes[0] === ICON) {
                    element.classList.add('icon-only');
                }
            };

            _export("Button", Button);

            _export("Button", Button = __decorate([Directive({
                selector: 'button,[button]'
            }), __param(3, Attribute('type')), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object, String])], Button));
            TEXT = 1;
            ICON = 2;
        }
    };
});