import { ElementRef } from 'angular2/core';
import { IonicApp } from '../app/app';
import { ViewController } from '../nav/view-controller';
import { Navbar } from '../navbar/navbar';
/**
* @name MenuToggle
* @description
* Toggle a menu by placing this directive on any item.
* Note that the menu's id must be either `leftMenu` or `rightMenu`
*
* @usage
 * ```html
 *<ion-content>
 *  <h3>Page 1</h3>
 *  <button menuToggle>Toggle Menu</button>
 *</ion-content>
 *
 * ```
* @demo /docs/v2/demos/menu/
* @see {@link /docs/v2/components#menus Menu Component Docs}
* @see {@link ../../menu/Menu Menu API Docs}
*/
export declare class MenuToggle {
    constructor(app: IonicApp, elementRef: ElementRef, viewCtrl: ViewController, navbar: Navbar);
    /**
    * @private
    */
    toggle(): void;
    /**
    * @private
    */
    isHidden: boolean;
}
