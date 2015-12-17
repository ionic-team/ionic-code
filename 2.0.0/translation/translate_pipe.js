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
var translate_1 = require('./translate');
/**
 * @private
 * The Translate pipe makes it easy to translate strings.
 *
 * @usage
 * Translate using the current language or language set through Translate.setLanguage
 * {{ 'Please enter your location' | translate }}
 *
 * Translate using a specific language
 * {{ 'Please enter your location' | translate:"de" }}
 */
var TranslatePipe = (function () {
    function TranslatePipe(translate) {
        this.translate = translate;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        var lang;
        if (args.length > 0) {
            lang = args[0];
        }
        return this.translate.translate(value, lang);
    };
    TranslatePipe.prototype.supports = function (obj) { return true; };
    TranslatePipe = __decorate([
        core_1.Pipe({ name: 'translate' }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof translate_1.Translate !== 'undefined' && translate_1.Translate) === 'function' && _a) || Object])
    ], TranslatePipe);
    return TranslatePipe;
    var _a;
})();
exports.TranslatePipe = TranslatePipe;