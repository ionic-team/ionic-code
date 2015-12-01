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
import { Directive, Optional } from 'angular2/angular2';
import { Config } from '../../config/config';
import { TextInput } from './text-input';
import { pointerCoord, hasPointerMoved } from '../../util/dom';
export let Label = class {
    constructor(config, container) {
        this.scrollAssist = config.get('scrollAssist');
        if (!this.id) {
            this.id = 'lbl-' + (++labelIds);
        }
        this.container = container;
        container && container.registerLabel(this);
    }
    /**
     * @private
     */
    pointerStart(ev) {
        if (this.scrollAssist) {
            // remember where the touchstart/mousedown started
            this.startCoord = pointerCoord(ev);
        }
    }
    /**
     * @private
     */
    pointerEnd(ev) {
        if (this.container) {
            // get where the touchend/mouseup ended
            let endCoord = pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            if (!hasPointerMoved(20, this.startCoord, endCoord)) {
                ev.preventDefault();
                ev.stopPropagation();
                this.container.initFocus();
            }
            this.startCoord = null;
        }
    }
};
Label = __decorate([
    Directive({
        selector: 'ion-label',
        inputs: [
            'id'
        ],
        host: {
            '[attr.id]': 'id',
            '(touchstart)': 'pointerStart($event)',
            '(touchend)': 'pointerEnd($event)',
            '(mousedown)': 'pointerStart($event)',
            '(mouseup)': 'pointerEnd($event)'
        }
    }),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object, (typeof (_b = typeof TextInput !== 'undefined' && TextInput) === 'function' && _b) || Object])
], Label);
let labelIds = -1;
var _a, _b;