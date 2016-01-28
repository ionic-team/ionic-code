var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var tab_1 = require('./tab');
var ion_1 = require('../ion');
var config_1 = require('../../config/config');
/**
 * @private
 */
var TabButton = (function (_super) {
    __extends(TabButton, _super);
    function TabButton(config, elementRef) {
        _super.call(this, elementRef);
        this.select = new core_1.EventEmitter();
        this.disHover = (config.get('hoverCSS') === false);
    }
    TabButton.prototype.ngOnInit = function () {
        this.tab.btn = this;
        this.hasTitle = !!this.tab.tabTitle;
        this.hasIcon = !!this.tab.tabIcon;
        this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
        this.hasIconOnly = (this.hasIcon && !this.hasTitle);
        this.hasBadge = !!this.tab.tabBadge;
    };
    TabButton.prototype.onClick = function () {
        this.select.emit(this.tab);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', tab_1.Tab)
    ], TabButton.prototype, "tab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabButton.prototype, "select", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TabButton.prototype, "onClick", null);
    TabButton = __decorate([
        core_1.Directive({
            selector: '.tab-button',
            host: {
                '[attr.id]': 'tab._btnId',
                '[attr.aria-controls]': 'tab._panelId',
                '[attr.aria-selected]': 'tab.isSelected',
                '[class.has-title]': 'hasTitle',
                '[class.has-icon]': 'hasIcon',
                '[class.has-title-only]': 'hasTitleOnly',
                '[class.icon-only]': 'hasIconOnly',
                '[class.has-badge]': 'hasBadge',
                '[class.disable-hover]': 'disHover'
            }
        }), 
        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef])
    ], TabButton);
    return TabButton;
})(ion_1.Ion);
exports.TabButton = TabButton;
