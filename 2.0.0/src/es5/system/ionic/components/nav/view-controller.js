System.register('ionic/components/nav/view-controller', ['./nav-controller'], function (_export) {
    /**
     * TODO
     */
    'use strict';

    var NavParams, ViewController;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_navController) {
            NavParams = _navController.NavParams;
        }],
        execute: function () {
            ViewController = (function () {
                function ViewController(navCtrl, componentType) {
                    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    _classCallCheck(this, ViewController);

                    this.navCtrl = navCtrl;
                    this.componentType = componentType;
                    this.params = new NavParams(params);
                    this.instance = null;
                    this.state = 0;
                    this.disposals = [];
                }

                _createClass(ViewController, [{
                    key: 'setContent',
                    value: function setContent(content) {
                        this._content = content;
                    }
                }, {
                    key: 'getContent',
                    value: function getContent() {
                        return this._content;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: 'stage',
                    value: function stage(done) {
                        var _this = this;

                        var navCtrl = this.navCtrl;
                        if (this.instance || !navCtrl || this.shouldDestroy) {
                            // already compiled this view
                            return done();
                        }
                        // compile the component and create a ProtoViewRef
                        navCtrl.compileView(this.componentType).then(function (hostProtoViewRef) {
                            if (_this.shouldDestroy) return done();
                            // get the pane the NavController wants to use
                            // the pane is where all this content will be placed into
                            navCtrl.loadContainer(_this.componentType, hostProtoViewRef, _this, function () {
                                // this ViewController instance has finished loading
                                try {
                                    _this.loaded();
                                } catch (e) {
                                    console.error(e);
                                }
                                done();
                            });
                        });
                    }

                    /**
                     * TODO
                     * @returns {boolean} TODO
                     */
                }, {
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
                     * TODO
                     * @param {TODO} instance  TODO
                     */
                }, {
                    key: 'setInstance',
                    value: function setInstance(instance) {
                        this.instance = instance;
                    }
                }, {
                    key: 'isRoot',
                    value: function isRoot() {
                        return this.index === 0;
                    }

                    /**
                     * TODO
                     */
                }, {
                    key: 'destroy',
                    value: function destroy() {
                        for (var i = 0; i < this.disposals.length; i++) {
                            this.disposals[i]();
                        }
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
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'setContentRef',
                    value: function setContentRef(contentElementRef) {
                        this._cntRef = contentElementRef;
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'contentRef',
                    value: function contentRef() {
                        return this._cntRef;
                    }
                }, {
                    key: 'setNavbar',
                    value: function setNavbar(navbarView) {
                        this._nbVw = navbarView;
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'getNavbar',
                    value: function getNavbar() {
                        return this._nbVw;
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'hasNavbar',
                    value: function hasNavbar() {
                        return !!this.getNavbar();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'navbarRef',
                    value: function navbarRef() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getElementRef();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'titleRef',
                    value: function titleRef() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getTitleRef();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'navbarItemRefs',
                    value: function navbarItemRefs() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getItemRefs();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'backBtnRef',
                    value: function backBtnRef() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getBackButtonRef();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'backBtnTextRef',
                    value: function backBtnTextRef() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getBackButtonTextRef();
                    }

                    /**
                     * TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: 'navbarBgRef',
                    value: function navbarBgRef() {
                        var navbar = this.getNavbar();
                        return navbar && navbar.getNativeElement().querySelector('.toolbar-background');
                    }

                    /**
                     * The view has loaded. This event only happens once per view being
                     * created. If a view leaves but is cached, then this will not
                     * fire again on a subsequent viewing. This method is a good place
                     * to put your setup code for the view; however, it is not the
                     * recommended method to use when a view becomes active.
                     */
                }, {
                    key: 'loaded',
                    value: function loaded() {
                        if (!this.shouldDestroy) {
                            this.instance && this.instance.onPageLoaded && this.instance.onPageLoaded();
                        }
                    }

                    /**
                     * The view is about to enter and become the active view.
                     */
                }, {
                    key: 'willEnter',
                    value: function willEnter() {
                        if (!this.shouldDestroy) {
                            this.instance && this.instance.onPageWillEnter && this.instance.onPageWillEnter();
                        }
                    }

                    /**
                     * The view has fully entered and is now the active view. This
                     * will fire, whether it was the first load or loaded from the cache.
                     */
                }, {
                    key: 'didEnter',
                    value: function didEnter() {
                        var navbar = this.getNavbar();
                        navbar && navbar.didEnter();
                        this.instance && this.instance.onPageDidEnter && this.instance.onPageDidEnter();
                    }

                    /**
                     * The view has is about to leave and no longer be the active view.
                     */
                }, {
                    key: 'willLeave',
                    value: function willLeave() {
                        this.instance && this.instance.onPageWillLeave && this.instance.onPageWillLeave();
                    }

                    /**
                     * The view has finished leaving and is no longer the active view. This
                     * will fire, whether it is cached or unloaded.
                     */
                }, {
                    key: 'didLeave',
                    value: function didLeave() {
                        this.instance && this.instance.onPageDidLeave && this.instance.onPageDidLeave();
                    }

                    /**
                     * The view is about to be destroyed and have its elements removed.
                     */
                }, {
                    key: 'willUnload',
                    value: function willUnload() {
                        this.instance && this.instance.onPageWillUnload && this.instance.onPageWillUnload();
                    }

                    /**
                     * The view has been destroyed and its elements have been removed.
                     */
                }, {
                    key: 'didUnload',
                    value: function didUnload() {
                        this.instance && this.instance.onPageDidUnload && this.instance.onPageDidUnload();
                    }
                }, {
                    key: 'domCache',
                    value: function domCache(isActiveView, isPreviousView) {
                        var renderInDom = isActiveView || isPreviousView;
                        var contentRef = this.contentRef();
                        if (contentRef) {
                            // the active view, and the previous view should have the 'show-view' css class
                            // all others, like a cached page 2 back, should now have 'show-view' so it's not rendered
                            contentRef.nativeElement.classList[renderInDom ? 'add' : 'remove']('show-view');
                        }
                        var navbarRef = this.getNavbar();
                        if (navbarRef) {
                            navbarRef.elementRef.nativeElement.classList[renderInDom ? 'add' : 'remove']('show-navbar');
                        }
                    }
                }, {
                    key: 'index',
                    get: function get() {
                        return this.navCtrl ? this.navCtrl.indexOf(this) : -1;
                    }
                }]);

                return ViewController;
            })();

            _export('ViewController', ViewController);
        }
    };
});