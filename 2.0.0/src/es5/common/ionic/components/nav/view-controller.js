'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _navController = require('./nav-controller');

/**
 * TODO
 */

var ViewController = (function () {
    function ViewController(navCtrl, componentType) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, ViewController);

        this.navCtrl = navCtrl;
        this.componentType = componentType;
        this.params = new _navController.NavParams(params);
        this.instance = {};
        this.state = 0;
        this._destroys = [];
        this._loaded = false;
    }

    /**
     * @returns {boolean} Returns if it's possible to go back from this Page.
     */

    _createClass(ViewController, [{
        key: 'enableBack',
        value: function enableBack() {
            // update if it's possible to go back from this nav item
            if (this.navCtrl) {
                var previousItem = this.navCtrl.getPrevious(this);
                // the previous view may exist, but if it's about to be destroyed
                // it shouldn't be able to go back to
                return !!(previousItem && !previousItem.shouldDestroy);
            }
            return false;
        }

        /**
         * @private
         */
    }, {
        key: 'setInstance',
        value: function setInstance(instance) {
            this.instance = instance;
        }

        /**
         * @returns {Number} Returns the index of this page within its NavController.
         */
    }, {
        key: 'isRoot',

        /**
         * @returns {boolean} Returns if this Page is the root page of the NavController.
         */
        value: function isRoot() {
            return this.index === 0;
        }

        /**
         * @private
         */
    }, {
        key: 'addDestroy',
        value: function addDestroy(destroyFn) {
            this._destroys.push(destroyFn);
        }

        /**
         * @private
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            for (var i = 0; i < this._destroys.length; i++) {
                this._destroys[i]();
            }
            this._destroys = [];
        }

        /**
         * @private
         */
    }, {
        key: 'setNavbarTemplateRef',
        value: function setNavbarTemplateRef(templateRef) {
            this._nbTmpRef = templateRef;
        }

        /**
         * @private
         */
    }, {
        key: 'getNavbarTemplateRef',
        value: function getNavbarTemplateRef() {
            return this._nbTmpRef;
        }

        /**
         * @private
         */
    }, {
        key: 'getNavbarViewRef',
        value: function getNavbarViewRef() {
            return this._nbVwRef;
        }

        /**
         * @private
         */
    }, {
        key: 'setNavbarViewRef',
        value: function setNavbarViewRef(viewContainerRef) {
            this._nbVwRef = viewContainerRef;
        }

        /**
         * @private
         */
    }, {
        key: 'setPageRef',
        value: function setPageRef(elementRef) {
            this._pgRef = elementRef;
        }

        /**
         * @returns {ElementRef} Returns the Page's ElementRef
         */
    }, {
        key: 'pageRef',
        value: function pageRef() {
            return this._pgRef;
        }

        /**
         * @private
         */
    }, {
        key: 'setContentRef',
        value: function setContentRef(elementRef) {
            this._cntRef = elementRef;
        }

        /**
         * @returns {ElementRef} Returns the Page's Content ElementRef
         */
    }, {
        key: 'contentRef',
        value: function contentRef() {
            return this._cntRef;
        }

        /**
         * @private
         */
    }, {
        key: 'setContent',
        value: function setContent(directive) {
            this._cntDir = directive;
        }

        /**
         * @returns {Component} Returns the Page's Content component reference.
         */
    }, {
        key: 'getContent',
        value: function getContent() {
            return this._cntDir;
        }

        /**
         * @private
         */
    }, {
        key: 'setNavbar',
        value: function setNavbar(directive) {
            this._nbDir = directive;
        }

        /**
         * @private
         */
    }, {
        key: 'getNavbar',
        value: function getNavbar() {
            return this._nbDir;
        }

        /**
         * @returns {boolean} Returns a boolean if this Page has a navbar or not.
         */
    }, {
        key: 'hasNavbar',
        value: function hasNavbar() {
            return !!this.getNavbar();
        }

        /**
         * @private
         */
    }, {
        key: 'navbarRef',
        value: function navbarRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getElementRef();
        }

        /**
         * @private
         */
    }, {
        key: 'titleRef',
        value: function titleRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getTitleRef();
        }

        /**
         * @private
         */
    }, {
        key: 'navbarItemRefs',
        value: function navbarItemRefs() {
            var navbar = this.getNavbar();
            return navbar && navbar.getItemRefs();
        }

        /**
         * @private
         */
    }, {
        key: 'backBtnRef',
        value: function backBtnRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackButtonRef();
        }

        /**
         * @private
         */
    }, {
        key: 'backBtnTextRef',
        value: function backBtnTextRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackButtonTextRef();
        }

        /**
         * @private
         */
    }, {
        key: 'navbarBgRef',
        value: function navbarBgRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackgroundRef();
        }

        /**
         * @param {string} Set the back button text.
         */
    }, {
        key: 'setBackButtonText',
        value: function setBackButtonText(val) {
            var navbar = this.getNavbar();
            if (navbar) {
                navbar.bbText = val;
            }
        }

        /**
         * @param {boolean} Set if this Page's back button should show or not.
         */
    }, {
        key: 'showBackButton',
        value: function showBackButton(shouldShow) {
            var navbar = this.getNavbar();
            if (navbar) {
                navbar.hideBackButton = !shouldShow;
            }
        }

        /**
         * @private
         */
    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            return this._loaded;
        }

        /**
         * @private
         * The view has loaded. This event only happens once per view being
         * created. If a view leaves but is cached, then this will not
         * fire again on a subsequent viewing. This method is a good place
         * to put your setup code for the view; however, it is not the
         * recommended method to use when a view becomes active.
         */
    }, {
        key: 'loaded',
        value: function loaded() {
            this._loaded = true;
            if (!this.shouldDestroy) {
                ctrlFn(this, 'onPageLoaded');
            }
        }

        /**
         * @private
         */
    }, {
        key: 'postRender',
        value: function postRender() {}
        // let navbar = this.getNavbar();
        // navbar && navbar.postRender();
        // ctrlFn(this, 'onPagePostRender');

        /**
         * @private
         * The view is about to enter and become the active view.
         */

    }, {
        key: 'willEnter',
        value: function willEnter() {
            if (!this.shouldDestroy) {
                ctrlFn(this, 'onPageWillEnter');
            }
        }

        /**
         * @private
         * The view has fully entered and is now the active view. This
         * will fire, whether it was the first load or loaded from the cache.
         */
    }, {
        key: 'didEnter',
        value: function didEnter() {
            var navbar = this.getNavbar();
            navbar && navbar.didEnter();
            ctrlFn(this, 'onPageDidEnter');
        }

        /**
         * @private
         * The view has is about to leave and no longer be the active view.
         */
    }, {
        key: 'willLeave',
        value: function willLeave() {
            ctrlFn(this, 'onPageWillLeave');
        }

        /**
         * @private
         * The view has finished leaving and is no longer the active view. This
         * will fire, whether it is cached or unloaded.
         */
    }, {
        key: 'didLeave',
        value: function didLeave() {
            ctrlFn(this, 'onPageDidLeave');
        }

        /**
         * @private
         * The view is about to be destroyed and have its elements removed.
         */
    }, {
        key: 'willUnload',
        value: function willUnload() {
            ctrlFn(this, 'onPageWillUnload');
        }

        /**
         * @private
         * The view has been destroyed and its elements have been removed.
         */
    }, {
        key: 'didUnload',
        value: function didUnload() {
            ctrlFn(this, 'onPageDidUnload');
        }
    }, {
        key: 'index',
        get: function get() {
            return this.navCtrl ? this.navCtrl.indexOf(this) : -1;
        }
    }]);

    return ViewController;
})();

exports.ViewController = ViewController;

function ctrlFn(viewCtrl, fnName) {
    if (viewCtrl.instance && viewCtrl.instance[fnName]) {
        try {
            viewCtrl.instance[fnName]();
        } catch (e) {
            console.error(fnName + ': ' + e.message);
        }
    }
}