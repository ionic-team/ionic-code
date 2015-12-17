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
var core_1 = require('angular2/core');
var config_1 = require('../config/config');
var form_1 = require('./form');
var dom_1 = require('./dom');
/**
 * @name Keyboard
 * @description
 * The `Keyboard` class allows you to work with the keyboard events provide by the Ionic keyboard plugin.
 *
 * @usage
 * ```ts
 * export class MyClass{
 *  constructor(keyboard: Keyboard){
 *    this.keyboard = keyboard;
 *  }
 * }
 *
 * ```
 */
var Keyboard = (function () {
    function Keyboard(config, form, zone) {
        var _this = this;
        this.form = form;
        this.zone = zone;
        zone.runOutsideAngular(function () {
            _this.focusOutline(config.get('focusOutline'), document);
        });
    }
    /**
     * Chech to see if the keyboard is open or not.
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *  }
     *  keyboardCheck(){
     *    setTimeout(()  => console.log('is the keyboard open ', this.keyboard.isOpen()));
     *  }
     * }
     *
     * ```
     *
     * @return {Bool} returns a true or flase value if the keyboard is open or not
     */
    Keyboard.prototype.isOpen = function () {
        return dom_1.hasFocusedTextInput();
    };
    /**
     * When the keyboard is closed, call any methods you want
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *    this.keyboard.onClose(this.closeCallback);
     *  }
     *  closeCallback(){
     *     // call what ever functionality you want on keyboard close
     *     console.log('Closing time");
     *  }
     * }
     *
     * ```
     * @param {Function} callback method you want to call when the keyboard has been closed
     * @return {Function} returns a callback that gets fired when the keyboard is closed
     */
    Keyboard.prototype.onClose = function (callback, pollingInternval) {
        if (pollingInternval === void 0) { pollingInternval = KEYBOARD_CLOSE_POLLING; }
        console.debug('keyboard onClose');
        var self = this;
        var checks = 0;
        var promise = null;
        if (!callback) {
            // a callback wasn't provided, so let's return a promise instead
            promise = new Promise(function (resolve) { callback = resolve; });
        }
        self.zone.runOutsideAngular(function () {
            function checkKeyboard() {
                console.debug('keyboard isOpen', self.isOpen(), checks);
                if (!self.isOpen() || checks > 100) {
                    dom_1.rafFrames(30, function () {
                        self.zone.run(function () {
                            console.debug('keyboard closed');
                            callback();
                        });
                    });
                }
                else {
                    setTimeout(checkKeyboard, pollingInternval);
                }
                checks++;
            }
            setTimeout(checkKeyboard, pollingInternval);
        });
        return promise;
    };
    /**
     * Progamatically close they keyboard
     *
     */
    Keyboard.prototype.close = function () {
        var _this = this;
        console.debug('keyboard close()');
        dom_1.raf(function () {
            if (dom_1.hasFocusedTextInput()) {
                // only focus out when a text input has focus
                _this.form.focusOut();
            }
        });
    };
    /**
     * @private
     */
    Keyboard.prototype.focusOutline = function (setting, document) {
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
        var self = this;
        var isKeyInputEnabled = false;
        function cssClass() {
            dom_1.raf(function () {
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
            self.zone.runOutsideAngular(function () {
                document.removeEventListener('mousedown', pointerDown);
                document.removeEventListener('touchstart', pointerDown);
                if (isKeyInputEnabled) {
                    document.addEventListener('mousedown', pointerDown);
                    document.addEventListener('touchstart', pointerDown);
                }
            });
        }
        document.addEventListener('keydown', keyDown);
    };
    Keyboard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
    ], Keyboard);
    return Keyboard;
    var _a, _b, _c;
})();
exports.Keyboard = Keyboard;
var KEYBOARD_CLOSE_POLLING = 150;