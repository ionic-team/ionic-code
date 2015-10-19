"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _configConfig = require('../../config/config');

/**
 * TODO
 */
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var Button = function Button(config, elementRef, renderer, type) {
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
exports.Button = Button;
exports.Button = Button = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'button,[button]'
}), __param(3, (0, _angular2Angular2.Attribute)('type')), __metadata('design:paramtypes', [typeof (_a = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _c || Object, String])], Button);
var TEXT = 1;
var ICON = 2;
var _a, _b, _c;