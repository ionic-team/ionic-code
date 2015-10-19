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
import { NgZone, Injectable, Renderer } from 'angular2/angular2';
import { IonicApp } from '../app/app';
import { Animation } from '../../animations/animation';
import * as util from 'ionic/util';
export let OverlayController = class {
    constructor(app, zone, renderer) {
        this.app = app;
        this.zone = zone;
        this.renderer = renderer;
        this.refs = [];
    }
    open(overlayType, componentType, opts = {}) {
        if (!this.anchor) {
            console.error('<ion-overlay></ion-overlay> required in root component template to use: ' + overlayType);
            return Promise.reject();
        }
        let resolve, reject;
        let promise = new Promise((res, rej) => { resolve = res; reject = rej; });
        try {
            this.anchor.append(componentType).then(ref => {
                let instance = ref && ref.instance;
                if (!instance) {
                    return reject();
                }
                ref._z = ROOT_Z_INDEX;
                for (let i = 0; i < this.refs.length; i++) {
                    if (this.refs[i]._z >= ref._z) {
                        ref._z = this.refs[i]._z + 1;
                    }
                }
                this.renderer.setElementStyle(ref.location, 'zIndex', ref._z);
                util.extend(instance, opts);
                ref._type = overlayType;
                ref._handle = opts.handle || (overlayType + ref._z);
                this.add(ref);
                instance.close = (closeOpts = {}) => {
                    this.close(ref, util.extend(opts, closeOpts));
                };
                instance.onPageLoaded && instance.onPageLoaded();
                instance.onPageWillEnter && instance.onPageWillEnter();
                let animation = Animation.create(ref.location.nativeElement, opts.enterAnimation);
                animation.before.addClass('show-overlay');
                this.app.setEnabled(false, animation.duration());
                this.app.setTransitioning(true, animation.duration());
                this.zone.runOutsideAngular(() => {
                    animation.play().then(() => {
                        animation.dispose();
                        this.zone.run(() => {
                            this.app.setEnabled(true);
                            this.app.setTransitioning(false);
                            instance.onPageDidEnter && instance.onPageDidEnter();
                            resolve();
                        });
                    });
                });
            }).catch(err => {
                console.error(err);
            });
        }
        catch (e) {
            console.error(e);
        }
        return promise;
    }
    close(ref, opts) {
        let resolve;
        let promise = new Promise(res => { resolve = res; });
        let instance = ref.instance;
        instance.onPageWillLeave && instance.onPageWillLeave();
        instance.onPageWillUnload && instance.onPageWillUnload();
        let animation = Animation.create(ref.location.nativeElement, opts.leaveAnimation);
        animation.after.removeClass('show-overlay');
        this.app.setEnabled(false, animation.duration());
        this.app.setTransitioning(true, animation.duration());
        this.zone.runOutsideAngular(() => {
            animation.play().then(() => {
                animation.dispose();
                this.zone.run(() => {
                    instance.onPageDidLeave && instance.onPageDidLeave();
                    instance.onPageDidUnload && instance.onPageDidUnload();
                    this.app.setEnabled(true);
                    this.app.setTransitioning(false);
                    this.remove(ref);
                    resolve();
                });
            });
        });
        return promise;
    }
    add(ref) {
        this.refs.push(ref);
    }
    remove(ref) {
        util.array.remove(this.refs, ref);
        ref.dispose && ref.dispose();
    }
    getByType(overlayType) {
        for (let i = this.refs.length - 1; i >= 0; i--) {
            if (overlayType === this.refs[i]._type) {
                return this.refs[i].instance;
            }
        }
        return null;
    }
    getByHandle(handle, overlayType) {
        for (let i = this.refs.length - 1; i >= 0; i--) {
            if (handle === this.refs[i]._handle && overlayType === this.refs[i]._type) {
                return this.refs[i].instance;
            }
        }
        return null;
    }
};
OverlayController = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof NgZone !== 'undefined' && NgZone) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object])
], OverlayController);
const ROOT_Z_INDEX = 1000;
var _a, _b, _c;