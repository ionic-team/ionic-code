import { NgZone } from 'angular2/core';
import { Platform } from '../../platform/platform';
/**
 * @private
 */
export declare class DisplayWhen {
    constructor(conditions: any, platform: any, ngZone: any);
    orientation(): boolean;
}
/**
 *
 * The `showWhen` attribute takes a string that represents a plaform or screen orientation.
 * The element the attribute is added to will only be shown when that platform or screen orientation is active.
 * Complements the [hideWhen attribute](../HideWhen).
 * @usage
 * ```html
 * <div showWhen="ios">I am only visible on iOS!</div>
 * ```
 * @demo /docs/v2/demos/show-when/
 * @see {@link ../HideWhen HideWhen API Docs}
 */
export declare class ShowWhen extends DisplayWhen {
    constructor(showWhen: string, platform: Platform, ngZone: NgZone);
    /**
     * @private
     */
    hidden: boolean;
}
/**
 *
 * The `hideWhen` attribute takes a string that represents a plaform or screen orientation.
 * The element the attribute is added to will only be hidden when that platform or screen orientation is active.
 * Complements the [showWhen attribute](../ShowWhen).
 * @usage
 * ```html
 * <div hideWhen="android">I am hidden on Android!</div>
 * ```
 * @demo /docs/v2/demos/hide-when/
 * @see {@link ../ShowWhen ShowWhen API Docs}
 */
export declare class HideWhen extends DisplayWhen {
    constructor(hideWhen: string, platform: Platform, ngZone: NgZone);
    /**
     * @private
     */
    hidden: any;
}
