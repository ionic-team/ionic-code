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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var nav_1 = require('./nav');
/**
 * @private
 */
var NavRouter = (function (_super) {
    __extends(NavRouter, _super);
    function NavRouter(_elementRef, _loader, _parentRouter, nameAttr, _nav) {
        _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
        this._nav = _nav;
        // register this router with Ionic's NavController
        // Ionic's NavController will call this NavRouter's "stateChange"
        // method when the NavController has...changed its state
        _nav.registerRouter(this);
    }
    /**
     * @private
     * TODO
     * @param {ComponentInstruction} instruction  TODO
     */
    NavRouter.prototype.activate = function (nextInstruction) {
        var previousInstruction = this['_currentInstruction'];
        this['_currentInstruction'] = nextInstruction;
        var componentType = nextInstruction.componentType;
        var childRouter = this['_parentRouter'].childRouter(componentType);
        // prevent double navigations to the same view
        var lastView = this._nav.last();
        if (this._nav.isTransitioning() || lastView && lastView.componentType === componentType && lastView.data === nextInstruction.params) {
            return Promise.resolve();
        }
        // tell the NavController which componentType, and it's params, to navigate to
        return this._nav.push(componentType, nextInstruction.params);
    };
    NavRouter.prototype.reuse = function (nextInstruction) {
        return Promise.resolve();
    };
    /**
     * Called by Ionic after a transition has completed.
     * @param {string} direction  The direction of the state change
     * @param {ViewController} viewCtrl  The entering ViewController
     */
    NavRouter.prototype.stateChange = function (direction, viewCtrl) {
        // stateChange is called by Ionic's NavController
        // type could be "push" or "pop"
        // viewCtrl is Ionic's ViewController class, which has the properties "componentType" and "params"
        // only do an update if there's an actual view change
        if (!viewCtrl || this._activeViewId === viewCtrl.id)
            return;
        this._activeViewId = viewCtrl.id;
        // get the best PathRecognizer for this view's componentType
        var pathRecognizer = this.getPathRecognizerByComponent(viewCtrl.componentType);
        if (pathRecognizer) {
            // generate a componentInstruction from the view's PathRecognizer and params
            var componentInstruction = pathRecognizer.generate(viewCtrl.data);
            // create a ResolvedInstruction from the componentInstruction
            var instruction = new ResolvedInstruction(componentInstruction, null, null);
            this['_parentRouter'].navigateByInstruction(instruction);
        }
    };
    /**
     * TODO
     * @param {TODO} componentType  TODO
     * @returns {TODO} TODO
     */
    NavRouter.prototype.getPathRecognizerByComponent = function (componentType) {
        // given a componentType, figure out the best PathRecognizer to use
        var rules = this['_parentRouter'].registry._rules;
        var pathRecognizer = null;
        rules.forEach(function (rule) {
            pathRecognizer = rule.matchers.find(function (matcherPathRecognizer) {
                return (matcherPathRecognizer.handler.componentType === componentType);
            });
        });
        return pathRecognizer;
    };
    NavRouter = __decorate([
        core_1.Directive({
            selector: 'ion-nav'
        }),
        __param(3, core_1.Attribute('name')), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, router_1.Router, String, nav_1.Nav])
    ], NavRouter);
    return NavRouter;
})(router_1.RouterOutlet);
exports.NavRouter = NavRouter;
// TODO: hacked from
// https://github.com/angular/angular/blob/6ddfff5cd59aac9099aa6da5118c5598eea7ea11/modules/angular2/src/router/instruction.ts#L207
var ResolvedInstruction = (function (_super) {
    __extends(ResolvedInstruction, _super);
    function ResolvedInstruction(component, child, auxInstruction) {
        _super.call(this);
        this.component = component;
        this.child = child;
        this.auxInstruction = auxInstruction;
    }
    ResolvedInstruction.prototype.resolveComponent = function () {
        return Promise.resolve(this.component);
    };
    return ResolvedInstruction;
})(router_1.Instruction);
