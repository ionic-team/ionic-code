import { Config } from '../config/config';
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
export declare class Platform {
    private _platforms;
    private _versions;
    private _dir;
    private _lang;
    private _url;
    private _qs;
    private _ua;
    private _bPlt;
    private _onResizes;
    private _readyPromise;
    private _readyResolve;
    private _engineReady;
    private _resizeTimer;
    /**
     * @private
     */
    platformOverride: string;
    constructor(platforms?: any[]);
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
    is(platformName: string): boolean;
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
    platforms(): Array<string>;
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
    versions(platformName: string): any;
    /**
     * @private
     */
    version(): any;
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
    ready(): Promise<any>;
    /**
     * @private
     */
    prepareReady(config: Config): void;
    /**
    * Set the app's language direction, which will update the `dir` attribute
    * on the app's root `<html>` element. We recommend the app's `index.html`
    * file already has the correct `dir` attribute value set, such as
    * `<html dir="ltr">` or `<html dir="rtl">`. This method is useful if the
    * direction needs to be dynamically changed per user/session.
    * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
    * @param {string} dir  Examples: `rtl`, `ltr`
    */
    setDir(dir: string, updateDocument: boolean): void;
    /**
     * Returns app's language direction.
     * We recommend the app's `index.html` file already has the correct `dir`
     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
     * @returns {string}
     */
    dir(): string;
    /**
     * Returns if this app is using right-to-left language direction or not.
     * We recommend the app's `index.html` file already has the correct `dir`
     * attribute value set, such as `<html dir="ltr">` or `<html dir="rtl">`.
     * [W3C: Structural markup and right-to-left text in HTML](http://www.w3.org/International/questions/qa-html-dir)
     * @returns {boolean}
     */
    isRTL(): boolean;
    /**
    * Set the app's language and optionally the country code, which will update
    * the `lang` attribute on the app's root `<html>` element.
    * We recommend the app's `index.html` file already has the correct `lang`
    * attribute value set, such as `<html lang="en">`. This method is useful if
    * the language needs to be dynamically changed per user/session.
    * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
    * @param {string} language  Examples: `en-US`, `en-GB`, `ar`, `de`, `zh`, `es-MX`
    */
    setLang(language: string, updateDocument: boolean): void;
    /**
     * Returns app's language and optional country code.
     * We recommend the app's `index.html` file already has the correct `lang`
     * attribute value set, such as `<html lang="en">`.
     * [W3C: Declaring language in HTML](http://www.w3.org/International/questions/qa-html-language-declarations)
     * @returns {string}
     */
    lang(): string;
    /**
    * @private
    */
    on(): void;
    /**
    * @private
    */
    onHardwareBackButton(): void;
    /**
    * @private
    */
    registerBackButtonAction(): void;
    /**
    * @private
    */
    exitApp(): void;
    /**
    * @private
    */
    fullScreen(): void;
    /**
    * @private
    */
    showStatusBar(): void;
    /**
    * @private
    */
    setUrl(url: string): void;
    /**
    * @private
    */
    url(): string;
    /**
    * @private
    */
    query(key: string): string;
    /**
    * @private
    */
    setUserAgent(userAgent: string): void;
    /**
    * @private
    */
    userAgent(): string;
    /**
    * @private
    */
    setNavigatorPlatform(navigatorPlatform: string): void;
    /**
    * @private
    */
    navigatorPlatform(): string;
    /**
    * @private
    */
    width(): number;
    /**
    * @private
    */
    height(): number;
    /**
    * @private
    */
    isPortrait(): boolean;
    /**
    * @private
    */
    isLandscape(): boolean;
    /**
    * @private
    */
    windowResize(): void;
    /**
    * @private
    */
    onResize(cb: Function): void;
    /**
     * @private
     */
    static register(platformConfig: any): void;
    /**
    * @private
    */
    static registry(): any;
    /**
     * @private
     */
    static get(platformName: string): any;
    /**
     * @private
     */
    static setDefault(platformName: string): void;
    /**
     * @private
     */
    testQuery(queryValue: string, queryTestValue: string): boolean;
    /**
     * @private
     */
    testUserAgent(userAgentExpression: any): boolean;
    /**
     * @private
     */
    testNavigatorPlatform(navigatorPlatformExpression: string): boolean;
    /**
     * @private
     */
    matchUserAgentVersion(userAgentExpression: RegExp): any;
    /**
     * @private
     */
    isPlatform(queryTestValue: string, userAgentExpression: string): boolean;
    /**
     * @private
     */
    load(platformOverride?: string): void;
    /**
     * @private
     */
    matchPlatform(platformName: string): any;
}
