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
import { Injectable, NgZone } from 'angular2/angular2';
import { Config } from '../config/config';
/**
 * The Input component is used to focus text input elements.
 *
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Name</ion-label>
 *   <input value="Name" type="text">
 * </ion-input>
 * ```
 */
export let Form = class {
    constructor(config, zone) {
        this._config = config;
        this._zone = zone;
        this._inputs = [];
        this._focused = null;
        zone.runOutsideAngular(() => {
            this.focusCtrl(document);
        });
    }
    register(input) {
        this._inputs.push(input);
    }
    deregister(input) {
        let index = this._inputs.indexOf(input);
        if (index > -1) {
            this._inputs.splice(index, 1);
        }
        if (input === this._focused) {
            this._focused = null;
        }
    }
    focusCtrl(document) {
        let scrollAssist = this._config.get('scrollAssist');
        // raw DOM fun
        let focusCtrl = document.createElement('focus-ctrl');
        focusCtrl.setAttribute('aria-hidden', true);
        if (scrollAssist) {
            this._tmp = document.createElement('input');
            this._tmp.tabIndex = -1;
            focusCtrl.appendChild(this._tmp);
        }
        this._blur = document.createElement('button');
        this._blur.tabIndex = -1;
        focusCtrl.appendChild(this._blur);
        document.body.appendChild(focusCtrl);
        if (scrollAssist) {
            this._tmp.addEventListener('keydown', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
            });
        }
    }
    focusOut() {
        console.debug('focusOut');
        this._blur.focus();
    }
    setFocusHolder(type) {
        if (this._tmp && this._config.get('scrollAssist')) {
            this._tmp.type = type;
            console.debug('setFocusHolder', this._tmp.type);
            this._tmp.focus();
        }
    }
    setAsFocused(input) {
        this._focused = input;
    }
    /**
     * Focuses the next input element, if it exists.
     */
    focusNext(currentInput) {
        console.debug('focusNext');
        let index = this._inputs.indexOf(currentInput);
        if (index > -1 && (index + 1) < this._inputs.length) {
            let nextInput = this._inputs[index + 1];
            if (nextInput !== this._focused) {
                return nextInput.initFocus();
            }
        }
        index = this._inputs.indexOf(this._focused);
        if (index > 0) {
            let previousInput = this._inputs[index - 1];
            if (previousInput) {
                previousInput.initFocus();
            }
        }
    }
};
Form = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object, (typeof (_b = typeof NgZone !== 'undefined' && NgZone) === 'function' && _b) || Object])
], Form);
var _a, _b;