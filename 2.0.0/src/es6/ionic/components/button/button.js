var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, Renderer, Attribute } from 'angular2/angular2';
import { Config } from '../../config/config';
/**
 * TODO
 */
export let Button = class {
    constructor(config, elementRef, renderer, type) {
        let element = elementRef.nativeElement;
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
        let childNodes = element.childNodes;
        let childNode;
        let nodes = [];
        for (let i = 0, l = childNodes.length; i < l; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 3) {
                // text node
                if (childNode.textContent.trim() !== '') {
                    nodes.push(TEXT);
                }
            }
            else if (childNode.nodeType === 1) {
                if (childNode.nodeName === 'ICON') {
                    // icon element node
                    nodes.push(ICON);
                }
                else {
                    // element other than an <icon>
                    nodes.push(TEXT);
                }
            }
        }
        if (nodes.length > 1) {
            if (nodes[0] === ICON && nodes[1] === TEXT) {
                element.classList.add('icon-left');
            }
            else if (nodes[0] === TEXT && nodes[1] === ICON) {
                element.classList.add('icon-right');
            }
        }
        else if (nodes.length === 1 && nodes[0] === ICON) {
            element.classList.add('icon-only');
        }
    }
};
Button = __decorate([
    Directive({
        selector: 'button,[button]'
    }),
    __param(3, Attribute('type')), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object, String])
], Button);
const TEXT = 1;
const ICON = 2;
var _a, _b, _c;