/**
 * @name Config
 * @demo /docs/v2/demos/config/
 * @description
 * Config lets you change multiple or a single value in an apps mode configuration. Things such as tab placement, icon changes, and view animations can be set here.
 *
 * ```ts
 * @App({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 *   config: {
 *     backButtonText: 'Go Back',
 *     iconMode: 'ios',
 *     modalEnter: 'modal-slide-in',
 *     modalLeave: 'modal-slide-out',
 *     tabbarPlacement: 'bottom',
 *     pageTransition: 'ios',
 *   }
 * })
 * ```
 *
 * Config can be overwritting at multiple levels, allowing deeper configuration. Taking the example from earlier, we can override any setting we want based on a platform.
 * ```ts
 * @App({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 *   config: {
 *     tabbarPlacement: 'bottom',
 *     platforms: {
 *      ios: {
 *        tabbarPlacement: 'top',
 *      }
 *     }
 *   }
 * })
 * ```
 *
 * We could also configure these values at a component level. Take `tabbarPlacement`, we can configure this as a property on our `ion-tabs`.
 *
 * ```html
 * <ion-tabs tabbarPlacement="top">
 *    <ion-tab tabTitle="Dash" tabIcon="pulse" [root]="tabRoot"></ion-tab>
 *  </ion-tabs>
 * ```
 *
 * The property will override anything else set in the apps.
 *
 * The last way we could configure is through URL query strings. This is useful for testing while in the browser.
 * Simply add `?ionic<PROPERTYNAME>=<value>` to the url.
 *
 * ```bash
 * http://localhost:8100/?ionicTabbarPlacement=bottom
 * ```
 *
 * Custom values can be added to config, and looked up at a later point in time.
 *
 * ``` javascript
 * config.set('ios', 'favoriteColor', 'green');
 * // from any page in your app:
 * config.get('favoriteColor'); // 'green'
 * ```
 *
 *
 * A config value can come from anywhere and be anything, but there are a default set of values.
 *
 *
 * | Config property            | Default iOS Value      | Default MD Value          |
 * |----------------------------|------------------------|---------------------------|
 * | activator                  | highlight              | ripple                    |
 * | actionSheetEnter           | action-sheet-slide-in  | action-sheet-md-slide-in  |
 * | actionSheetLeave           | action-sheet-slide-out | action-sheet-md-slide-out |
 * | actionSheetCancelIcon      |                        | ion-md-close              |
 * | actionSheetDestructiveIcon |                        | ion-md-trash              |
 * | backButtonText             | Back                   |                           |
 * | backButtonIcon             | ion-ios-arrow-back     | ion-md-arrow-back         |
 * | iconMode                   | ios                    | md                        |
 * | menuType                   | reveal                 | overlay                   |
 * | modalEnter                 | modal-slide-in         | modal-md-slide-in         |
 * | modalLeave                 | modal-slide-out        | modal-md-slide-out        |
 * | pageTransition             | ios-transition         | md-transition             |
 * | pageTransitionDelay        | 16                     | 120                       |
 * | popupEnter                 | popup-pop-in           | popup-md-pop-in           |
 * | popupLeave                 | popup-pop-out          | popup-md-pop-out          |
 * | tabbarPlacement            | bottom                 | true                      |
 * | tabbarHighlight            |                        | top                       |
 * | tabSubPage                 |                        | true                      |
 *
**/
export declare class Config {
    constructor(config: any);
    /**
     * For setting and getting multiple config values
     */
    /**
     * @private
     * @name settings()
     * @description
     */
    settings(): any;
    /**
     * @name set
     * @description
     * Sets a single config value.
     *
     * @param {String} [platform] - The platform (either 'ios' or 'android') that the config value should apply to. Leaving this blank will apply the config value to all platforms.
     * @param {String} [key] - The key used to look up the value at a later point in time.
     * @param {String} [value] - The config value being stored.
     */
    set(): Config;
    /**
     * @name get
     * @description
     * Returns a single config value, given a key.
     *
     * @param {String} [key] - the key for the config value
     */
    get(key: any): any;
    /**
     * @private
     */
    setPlatform(platform: any): void;
    static setModeConfig(mode: any, config: any): void;
    static getModeConfig(mode: any): any;
}
