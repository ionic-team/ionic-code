import { ElementRef, Renderer } from 'angular2/core';
import { Config } from '../../config/config';
/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components. For a full list of available icons,
 * check out the [Ionicons resource docs](../../../../resources/ionicons).
 *
 * @usage
 * ```html
 * <!-- use the appropriate home icon for ios and md -->
 * <icon home></icon>
 *
 * <!-- explicity set the icon for each platform -->
 * <icon ios="ion-ios-home" md="ion-md-home"></icon>
 * ```
 *
 * @property {boolean} [isActive] - Whether or not the icon is active. Icons that are not active will use an outlined version of the icon.
 * If there is not an outlined version for the particular icon, it will use the default (full) version.
 * @property {string} [ios] - Explicitly set the icon to use on iOS.
 * @property {string} [md] - Explicitly set the icon to use on Android.
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
export declare class Icon {
    private elementRef;
    private renderer;
    constructor(elementRef: ElementRef, config: Config, renderer: Renderer);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    isActive: boolean;
    /**
     * @private
     */
    update(): void;
}
