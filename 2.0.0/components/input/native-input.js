var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var NativeInput = (function () {
    function NativeInput(_elementRef, _renderer, ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this.focusChange = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
    }
    /**
     * @private
     */
    NativeInput.prototype._change = function (ev) {
        this.valueChange.emit(ev.target.value);
    };
    /**
     * @private
     */
    NativeInput.prototype._focus = function () {
        this.focusChange.emit(true);
    };
    /**
     * @private
     */
    NativeInput.prototype._blur = function () {
        this.focusChange.emit(false);
        this.hideFocus(false);
    };
    NativeInput.prototype.labelledBy = function (val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
    };
    /**
     * @private
     */
    NativeInput.prototype.setFocus = function () {
        this.element().focus();
    };
    /**
     * @private
     */
    NativeInput.prototype.relocate = function (shouldRelocate, inputRelativeY) {
        void 0;
        if (this._relocated !== shouldRelocate) {
            var focusedInputEle = this.element();
            if (shouldRelocate) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-focus');
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                focusedInputEle.style[dom_1.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                focusedInputEle.style.opacity = '0';
                this.setFocus();
                dom_1.raf(function () {
                    focusedInputEle.classList.add('cloned-active');
                });
            }
            else {
                focusedInputEle.classList.remove('cloned-active');
                focusedInputEle.style[dom_1.CSS.transform] = '';
                focusedInputEle.style.opacity = '';
                removeClone(focusedInputEle, 'cloned-focus');
            }
            this._relocated = shouldRelocate;
        }
    };
    /**
     * @private
     */
    NativeInput.prototype.hideFocus = function (shouldHideFocus) {
        void 0;
        var focusedInputEle = this.element();
        if (shouldHideFocus) {
            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
            focusedInputEle.classList.add('cloned-active');
            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
        }
        else {
            focusedInputEle.classList.remove('cloned-active');
            removeClone(focusedInputEle, 'cloned-move');
        }
    };
    NativeInput.prototype.hasFocus = function () {
        return dom_1.hasFocus(this.element());
    };
    NativeInput.prototype.getValue = function () {
        return this.element().value;
    };
    /**
     * @private
     */
    NativeInput.prototype.element = function () {
        return this._elementRef.nativeElement;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NativeInput.prototype, "focusChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NativeInput.prototype, "valueChange", void 0);
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_change", null);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_focus", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_blur", null);
    NativeInput = __decorate([
        core_1.Directive({
            selector: '.text-input'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, common_1.NgControl])
    ], NativeInput);
    return NativeInput;
})();
exports.NativeInput = NativeInput;
function cloneInput(focusedInputEle, addCssClass) {
    var clonedInputEle = focusedInputEle.cloneNode(true);
    clonedInputEle.classList.add('cloned-input');
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    clonedInputEle.style.width = (focusedInputEle.offsetWidth + 10) + 'px';
    return clonedInputEle;
}
function removeClone(focusedInputEle, queryCssClass) {
    var clonedInputEle = focusedInputEle.parentElement.querySelector('.' + queryCssClass);
    if (clonedInputEle) {
        clonedInputEle.parentNode.removeChild(clonedInputEle);
    }
}
/**
 * @private
 */
var NextInput = (function () {
    function NextInput() {
        this.focused = new core_1.EventEmitter();
    }
    NextInput.prototype.receivedFocus = function () {
        this.focused.emit(true);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NextInput.prototype, "focused", void 0);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NextInput.prototype, "receivedFocus", null);
    NextInput = __decorate([
        core_1.Directive({
            selector: '[next-input]'
        }), 
        __metadata('design:paramtypes', [])
    ], NextInput);
    return NextInput;
})();
exports.NextInput = NextInput;
