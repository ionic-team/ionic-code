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
import { Injectable } from 'angular2/angular2';
import { OverlayController } from '../overlay/overlay-controller';
import { Config } from '../../config/config';
import { Animation } from '../../animations/animation';
import { makeComponent } from '../../config/decorators';
import * as util from 'ionic/util';
/**
 * The Modal is a content pane that can go over the user's main view temporarily.
 * Usually used for making a choice or editing an item.
 *
 * @usage
 * ```ts
 * class MyApp {
 *
 *  constructor(modal: Modal, app: IonicApp, Config: Config) {
 *    this.modal = modal;
 *  }
 *
 *  openModal() {
 *    this.modal.open(ContactModal, {
 *      enterAnimation: 'my-fade-in',
 *      leaveAnimation: 'my-fade-out',
 *      handle: 'my-modal'
 *    });
 *  }
 * }
 * ```
 */
export let Modal = class {
    constructor(ctrl, config) {
        this.ctrl = ctrl;
        this._defaults = {
            enterAnimation: config.get('modalEnter') || 'modal-slide-in',
            leaveAnimation: config.get('modalLeave') || 'modal-slide-out',
        };
    }
    /**
     * TODO
     * @param {Type} componentType  TODO
     * @param {Object} [opts={}]  TODO
     * @returns {TODO} TODO
     */
    open(componentType, opts = {}) {
        let modalComponent = makeComponent(componentType, {
            selector: 'ion-modal'
        });
        return this.ctrl.open(OVERLAY_TYPE, modalComponent, util.extend(this._defaults, opts));
    }
    /**
     * TODO
     * @param {TODO} handle  TODO
     * @returns {TODO} TODO
     */
    get(handle) {
        if (handle) {
            return this.ctrl.getByHandle(handle, OVERLAY_TYPE);
        }
        return this.ctrl.getByType(OVERLAY_TYPE);
    }
};
Modal = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object])
], Modal);
const OVERLAY_TYPE = 'modal';
/**
 * Animations for modals
 */
class ModalSlideIn extends Animation {
    constructor(element) {
        super(element);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(400)
            .fromTo('translateY', '100%', '0%');
    }
}
Animation.register('modal-slide-in', ModalSlideIn);
class ModalSlideOut extends Animation {
    constructor(element) {
        super(element);
        this
            .easing('ease-out')
            .duration(250)
            .fromTo('translateY', '0%', '100%');
    }
}
Animation.register('modal-slide-out', ModalSlideOut);
class ModalMDSlideIn extends Animation {
    constructor(element) {
        super(element);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(280)
            .fromTo('translateY', '40px', '0px')
            .fadeIn();
    }
}
Animation.register('modal-md-slide-in', ModalMDSlideIn);
class ModalMDSlideOut extends Animation {
    constructor(element) {
        super(element);
        this
            .duration(200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)')
            .fromTo('translateY', '0px', '40px')
            .fadeOut();
    }
}
Animation.register('modal-md-slide-out', ModalMDSlideOut);
var _a, _b;