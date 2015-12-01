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
import { Form } from './form';
import { hasFocusedTextInput, raf, rafFrames } from './dom';
export let Keyboard = class {
    constructor(config, form, zone) {
        this.form = form;
        this.zone = zone;
        zone.runOutsideAngular(() => {
            this.focusOutline(config.get('focusOutline'), document);
        });
    }
    isOpen() {
        return hasFocusedTextInput();
    }
    onClose(callback, pollingInternval = KEYBOARD_CLOSE_POLLING) {
        const self = this;
        let promise = null;
        if (!callback) {
            // a callback wasn't provided, so let's return a promise instead
            promise = new Promise(resolve => { callback = resolve; });
        }
        self.zone.runOutsideAngular(() => {
            function checkKeyboard() {
                if (!self.isOpen()) {
                    rafFrames(30, () => {
                        self.zone.run(() => {
                            console.debug('keyboard closed');
                            callback();
                        });
                    });
                }
                else {
                    setTimeout(checkKeyboard, pollingInternval);
                }
            }
            setTimeout(checkKeyboard, pollingInternval);
        });
        return promise;
    }
    close() {
        raf(() => {
            if (hasFocusedTextInput()) {
                // only focus out when a text input has focus
                this.form.focusOut();
            }
        });
    }
    focusOutline(setting, document) {
        /* Focus Outline
         * --------------------------------------------------
         * By default, when a keydown event happens from a tab key, then
         * the 'focus-outline' css class is added to the body element
         * so focusable elements have an outline. On a mousedown or
         * touchstart event, then the 'focus-outline' css class is removed.
         *
         * Config default overrides:
         * focusOutline: true     - Always add the focus-outline
         * focusOutline: false    - Do not add the focus-outline
         */
        let self = this;
        let isKeyInputEnabled = false;
        function cssClass() {
            raf(() => {
                document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
            });
        }
        if (setting === true) {
            isKeyInputEnabled = true;
            return cssClass();
        }
        else if (setting === false) {
            return;
        }
        // default is to add the focus-outline when the tab key is used
        function keyDown(ev) {
            if (!isKeyInputEnabled && ev.keyCode == 9) {
                isKeyInputEnabled = true;
                enableKeyInput();
            }
        }
        function pointerDown() {
            isKeyInputEnabled = false;
            enableKeyInput();
        }
        function enableKeyInput() {
            cssClass();
            self.zone.runOutsideAngular(() => {
                document.removeEventListener('mousedown', pointerDown);
                document.removeEventListener('touchstart', pointerDown);
                if (isKeyInputEnabled) {
                    document.addEventListener('mousedown', pointerDown);
                    document.addEventListener('touchstart', pointerDown);
                }
            });
        }
        document.addEventListener('keydown', keyDown);
    }
};
Keyboard = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object, (typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b) || Object, (typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c) || Object])
], Keyboard);
const KEYBOARD_CLOSE_POLLING = 150;
var _a, _b, _c;