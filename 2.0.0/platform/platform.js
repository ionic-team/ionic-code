var util_1 = require('../util/util');
var dom_1 = require('../util/dom');
/**
 * @name Platform
 * @description
 * Platform returns the availble information about your current platform.
 * Platforms in Ionic 2 are much more complex then in V1, returns not just a single platform,
 * but a hierarchy of information, such as a devices OS, phone vs tablet, or mobile vs browser.
 * With this information you can completely custimize your app to fit any device and platform.
 *
 * @usage
 * ```ts
 * import {Platform} 'ionic/ionic';
 * export MyClass {
 *    constructor(platform: Platform){
 *      this.platform = platform;
 *    }
 * }
 * ```
 * @demo /docs/v2/demos/platform/
 */
var Platform = (function () {
    function Platform(platforms) {
        var _this = this;
        if (platforms === void 0) { platforms = []; }
        this._versions = {};
        this._onResizes = [];
        this._platforms = platforms;
        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
    }
    // Methods
    // **********************************************
    /**
     * @param {string} platformName
     * @returns {bool} returns true/false based on platform you place
     * @description
     * Depending on the platform name, isPlatform will return true or flase
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      if(this.platform.is('ios'){
     *        // what ever you need to do for
     *        // if the platfomr is ios
     *      }
     *    }
     * }
     * ```
     */
    Platform.prototype.is = function (platformName) {
        return (this._platforms.indexOf(platformName) > -1);
    };
    /**
     * @returns {array} the array of platforms
     * @description
     * Depending on what device you are on, `platforms` can return multiple values.
     * Each possible value is a hierarchy of platforms. For example, on an iPhone,
     * it would return mobile, ios, and iphone.
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.platforms());
     *      // This will return an array of all the availble platforms
     *      // From if your on mobile, to mobile os, and device name
     *    }
     * }
     * ```
     */
    Platform.prototype.platforms = function () {
        // get the array of active platforms, which also knows the hierarchy,
        // with the last one the most important
        return this._platforms;
    };
    /**
     * Returns an object containing information about the paltform
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      console.log(this.platform.versions());
     *    }
     * }
     * ```
  
     * @param {string} [platformName] optional platformName
     * @returns {object} An object with various platform info
     *
     */
    Platform.prototype.versions = function (platformName) {
        if (arguments.length) {
            // get a specific platform's version
            return this._versions[platformName];
        }
        // get all the platforms that have a valid parsed version
        return this._versions;
    };
    /**
     * @private
     */
    Platform.prototype.version = function () {
        for (var platformName in this._versions) {
            if (this._versions[platformName]) {
                return this._versions[platformName];
            }
        }
        return {};
    };
    /**
     * Returns a promise when the platform is ready and native functionality can be called
     *
     * ```
     * import {Platform} 'ionic/ionic';
     * export MyClass {
     *    constructor(platform: Platform){
     *      this.platform = platform;
     *      this.platform.ready().then(() => {
     *        console.log('Platform ready');
     *        // The platform is now ready, execute any native code you want
     *       });
     *    }
     * }
     * ```
     * @returns {promise} Returns a promsie when device ready has fired
     */
    Platform.prototype.ready = function () {
        return this._readyPromise;
    };
    /**
     * @private
     */
    Platform.prototype.prepareReady = function (config) {
        var self = this;
        function resolve() {
            self._readyResolve(config);
        }
        if (this._engineReady) {
            // the engine provide a ready promise, use this instead
            this._engineReady(resolve);
        }
        else {
            // there is no custom ready method from the engine
            // use the default dom ready
            dom_1.ready(resolve);
        }
    };
    /**
    * Set the app's language direction, which will update the `dir` attribute
    * on the app's root `<html>` element. We recommend the app's `index.html`
    * file already has the correct `dir` attribute value set, such as
    * `<html dir="ltr">` or `<html dir="rtl">`. This method is useful if the
    * direction needs to be dynamically changed per user/session.
    * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
    * @param {string} dir  Examples: `rtl`, `ltr`
    */
    Platform.prototype.setDir = function (dir, updateDocument) {
        this._dir = (dir || '').toLowerCase();
        if (updateDocument !== false) {
            document.documentElement.setAttribute('dir', dir);
        }
    };
    /**
     * Returns app's language direction.
     * We recommend the app's `index.html` file already has the correct `dir`
     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
     * @returns {string}
     */
    Platform.prototype.dir = function () {
        return this._dir;
    };
    /**
     * Returns if this app is using right-to-left language direction or not.
     * We recommend the app's `index.html` file already has the correct `dir`
     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
     * @returns {boolean}
     */
    Platform.prototype.isRTL = function () {
        return (this._dir === 'rtl');
    };
    /**
    * Set the app's language and optionally the country code, which will update
    * the `lang` attribute on the app's root `<html>` element.
    * We recommend the app's `index.html` file already has the correct `lang`
    * attribute value set, such as `<html lang="en">`. This method is useful if
    * the language needs to be dynamically changed per user/session.
    * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
    * @param {string} language  Examples: `en-US`, `en-GB`, `ar`, `de`, `zh`, `es-MX`
    */
    Platform.prototype.setLang = function (language, updateDocument) {
        this._lang = language;
        if (updateDocument !== false) {
            document.documentElement.setAttribute('lang', language);
        }
    };
    /**
     * Returns app's language and optional country code.
     * We recommend the app's `index.html` file already has the correct `lang`
     * attribute value set, such as `<html lang="en">`.
     * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
     * @returns {string}
     */
    Platform.prototype.lang = function () {
        return this._lang;
    };
    // Methods meant to be overridden by the engine
    // **********************************************
    // Provided NOOP methods so they do not error when
    // called by engines (the browser) doesn't provide them
    /**
    * @private
    */
    Platform.prototype.on = function () { };
    /**
    * @private
    */
    Platform.prototype.onHardwareBackButton = function () { };
    /**
    * @private
    */
    Platform.prototype.registerBackButtonAction = function () { };
    /**
    * @private
    */
    Platform.prototype.exitApp = function () { };
    /**
    * @private
    */
    Platform.prototype.fullScreen = function () { };
    /**
    * @private
    */
    Platform.prototype.showStatusBar = function () { };
    // Getter/Setter Methods
    // **********************************************
    /**
    * @private
    */
    Platform.prototype.setUrl = function (url) {
        this._url = url;
        this._qs = util_1.getQuerystring(url);
    };
    /**
    * @private
    */
    Platform.prototype.url = function () {
        return this._url;
    };
    /**
    * @private
    */
    Platform.prototype.query = function (key) {
        return (this._qs || {})[key];
    };
    /**
    * @private
    */
    Platform.prototype.setUserAgent = function (userAgent) {
        this._ua = userAgent;
    };
    /**
    * @private
    */
    Platform.prototype.userAgent = function () {
        return this._ua || '';
    };
    /**
    * @private
    */
    Platform.prototype.setNavigatorPlatform = function (navigatorPlatform) {
        this._bPlt = navigatorPlatform;
    };
    /**
    * @private
    */
    Platform.prototype.navigatorPlatform = function () {
        return this._bPlt || '';
    };
    /**
    * @private
    */
    Platform.prototype.width = function () {
        return dom_1.windowDimensions().width;
    };
    /**
    * @private
    */
    Platform.prototype.height = function () {
        return dom_1.windowDimensions().height;
    };
    /**
    * @private
    */
    Platform.prototype.isPortrait = function () {
        return this.width() < this.height();
    };
    /**
    * @private
    */
    Platform.prototype.isLandscape = function () {
        return !this.isPortrait();
    };
    /**
    * @private
    */
    Platform.prototype.windowResize = function () {
        var self = this;
        clearTimeout(self._resizeTimer);
        self._resizeTimer = setTimeout(function () {
            dom_1.flushDimensionCache();
            for (var i = 0; i < self._onResizes.length; i++) {
                try {
                    self._onResizes[i]();
                }
                catch (e) {
                    void 0;
                }
            }
        }, 250);
    };
    /**
    * @private
    */
    Platform.prototype.onResize = function (cb) {
        this._onResizes.push(cb);
    };
    // Platform Registry
    // **********************************************
    /**
     * @private
     */
    Platform.register = function (platformConfig) {
        platformRegistry[platformConfig.name] = platformConfig;
    };
    /**
    * @private
    */
    Platform.registry = function () {
        return platformRegistry;
    };
    /**
     * @private
     */
    Platform.get = function (platformName) {
        return platformRegistry[platformName] || {};
    };
    /**
     * @private
     */
    Platform.setDefault = function (platformName) {
        platformDefault = platformName;
    };
    /**
     * @private
     */
    Platform.prototype.testQuery = function (queryValue, queryTestValue) {
        var valueSplit = queryValue.toLowerCase().split(';');
        return valueSplit.indexOf(queryTestValue) > -1;
    };
    /**
     * @private
     */
    Platform.prototype.testUserAgent = function (userAgentExpression) {
        var rgx = new RegExp(userAgentExpression, 'i');
        return rgx.test(this._ua || '');
    };
    /**
     * @private
     */
    Platform.prototype.testNavigatorPlatform = function (navigatorPlatformExpression) {
        var rgx = new RegExp(navigatorPlatformExpression, 'i');
        return rgx.test(this._bPlt);
    };
    /**
     * @private
     */
    Platform.prototype.matchUserAgentVersion = function (userAgentExpression) {
        if (this._ua && userAgentExpression) {
            var val = this._ua.match(userAgentExpression);
            if (val) {
                return {
                    major: val[1],
                    minor: val[2]
                };
            }
        }
    };
    /**
     * @private
     */
    Platform.prototype.isPlatform = function (queryTestValue, userAgentExpression) {
        if (!userAgentExpression) {
            userAgentExpression = queryTestValue;
        }
        var queryValue = this.query('ionicplatform');
        if (queryValue) {
            return this.testQuery(queryValue, queryTestValue);
        }
        return this.testUserAgent(userAgentExpression);
    };
    /**
     * @private
     */
    Platform.prototype.load = function (platformOverride) {
        var rootPlatformNode = null;
        var engineNode = null;
        var self = this;
        this.platformOverride = platformOverride;
        // figure out the most specific platform and active engine
        var tmpPlatform = null;
        for (var platformName in platformRegistry) {
            tmpPlatform = this.matchPlatform(platformName);
            if (tmpPlatform) {
                // we found a platform match!
                // check if its more specific than the one we already have
                if (tmpPlatform.isEngine) {
                    // because it matched then this should be the active engine
                    // you cannot have more than one active engine
                    engineNode = tmpPlatform;
                }
                else if (!rootPlatformNode || tmpPlatform.depth > rootPlatformNode.depth) {
                    // only find the root node for platforms that are not engines
                    // set this node as the root since we either don't already
                    // have one, or this one is more specific that the current one
                    rootPlatformNode = tmpPlatform;
                }
            }
        }
        if (!rootPlatformNode) {
            rootPlatformNode = new PlatformNode(platformDefault);
        }
        // build a Platform instance filled with the
        // hierarchy of active platforms and settings
        if (rootPlatformNode) {
            // check if we found an engine node (cordova/node-webkit/etc)
            if (engineNode) {
                // add the engine to the first in the platform hierarchy
                // the original rootPlatformNode now becomes a child
                // of the engineNode, which is not the new root
                engineNode.child = rootPlatformNode;
                rootPlatformNode.parent = engineNode;
                rootPlatformNode = engineNode;
                // add any events which the engine would provide
                // for example, Cordova provides its own ready event
                var engineMethods = engineNode.methods();
                engineMethods._engineReady = engineMethods.ready;
                delete engineMethods.ready;
                util_1.assign(this, engineMethods);
            }
            var platformNode = rootPlatformNode;
            while (platformNode) {
                insertSuperset(platformNode);
                platformNode = platformNode.child;
            }
            // make sure the root noot is actually the root
            // incase a node was inserted before the root
            platformNode = rootPlatformNode.parent;
            while (platformNode) {
                rootPlatformNode = platformNode;
                platformNode = platformNode.parent;
            }
            platformNode = rootPlatformNode;
            while (platformNode) {
                // set the array of active platforms with
                // the last one in the array the most important
                this._platforms.push(platformNode.name());
                // get the platforms version if a version parser was provided
                this._versions[platformNode.name()] = platformNode.version(this);
                // go to the next platform child
                platformNode = platformNode.child;
            }
        }
        if (this._platforms.indexOf('mobile') > -1 && this._platforms.indexOf('cordova') === -1) {
            this._platforms.push('mobileweb');
        }
    };
    /**
     * @private
     */
    Platform.prototype.matchPlatform = function (platformName) {
        // build a PlatformNode and assign config data to it
        // use it's getRoot method to build up its hierarchy
        // depending on which platforms match
        var platformNode = new PlatformNode(platformName);
        var rootNode = platformNode.getRoot(this);
        if (rootNode) {
            rootNode.depth = 0;
            var childPlatform = rootNode.child;
            while (childPlatform) {
                rootNode.depth++;
                childPlatform = childPlatform.child;
            }
        }
        return rootNode;
    };
    return Platform;
})();
exports.Platform = Platform;
function insertSuperset(platformNode) {
    var supersetPlaformName = platformNode.superset();
    if (supersetPlaformName) {
        // add a platform in between two exist platforms
        // so we can build the correct hierarchy of active platforms
        var supersetPlatform = new PlatformNode(supersetPlaformName);
        supersetPlatform.parent = platformNode.parent;
        supersetPlatform.child = platformNode;
        if (supersetPlatform.parent) {
            supersetPlatform.parent.child = supersetPlatform;
        }
        platformNode.parent = supersetPlatform;
    }
}
var PlatformNode = (function () {
    function PlatformNode(platformName) {
        this.c = Platform.get(platformName);
        this.isEngine = this.c.isEngine;
    }
    PlatformNode.prototype.name = function () {
        return this.c.name;
    };
    PlatformNode.prototype.settings = function () {
        return this.c.settings || {};
    };
    PlatformNode.prototype.superset = function () {
        return this.c.superset;
    };
    PlatformNode.prototype.methods = function () {
        return this.c.methods || {};
    };
    PlatformNode.prototype.isMatch = function (p) {
        if (p.platformOverride && !this.isEngine) {
            return (p.platformOverride === this.c.name);
        }
        else if (!this.c.isMatch) {
            return false;
        }
        return this.c.isMatch(p);
    };
    PlatformNode.prototype.version = function (p) {
        if (this.c.versionParser) {
            var v = this.c.versionParser(p);
            if (v) {
                var str = v.major + '.' + v.minor;
                return {
                    str: str,
                    num: parseFloat(str),
                    major: parseInt(v.major, 10),
                    minor: parseInt(v.minor, 10)
                };
            }
        }
    };
    PlatformNode.prototype.getRoot = function (p) {
        if (this.isMatch(p)) {
            var parents = this.getSubsetParents(this.name());
            if (!parents.length) {
                return this;
            }
            var platform = null;
            var rootPlatform = null;
            for (var i = 0; i < parents.length; i++) {
                platform = new PlatformNode(parents[i]);
                platform.child = this;
                rootPlatform = platform.getRoot(p);
                if (rootPlatform) {
                    this.parent = platform;
                    return rootPlatform;
                }
            }
        }
        return null;
    };
    PlatformNode.prototype.getSubsetParents = function (subsetPlatformName) {
        var platformRegistry = Platform.registry();
        var parentPlatformNames = [];
        var platform = null;
        for (var platformName in platformRegistry) {
            platform = platformRegistry[platformName];
            if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
                parentPlatformNames.push(platformName);
            }
        }
        return parentPlatformNames;
    };
    return PlatformNode;
})();
var platformRegistry = {};
var platformDefault = null;
