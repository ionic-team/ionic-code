import { ElementRef, Renderer, TemplateRef, ViewContainerRef } from 'angular2/core';
import { ToolbarBase } from '../toolbar/toolbar';
import { Config } from '../../config/config';
import { IonicApp } from '../app/app';
import { ViewController } from '../nav/view-controller';
/**
 * @name Navbar
 * @description
 * Navbar is a global level toolbar that gets updated every time a page gets
 * loaded. You can pass the navbar a `ion-title` or any number of buttons.
 *
 * @usage
 * ```html
 * <ion-navbar *navbar>
 *
 *   <ion-buttons>
 *     <button (click)="toggleItems()">
 *       toggle
 *     </button>
 *   </ion-buttons>
 *
 *   <ion-title>
 *     Page Title
 *   </ion-title>
 *
 *   <ion-buttons>
 *     <button (click)="openModal()">
 *       Modal
 *     </button>
 *   </ion-buttons>
 * </ion-navbar>
 * ```
 *
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
export declare class Navbar extends ToolbarBase {
    constructor(app: IonicApp, viewCtrl: ViewController, elementRef: ElementRef, config: Config, renderer: Renderer);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    getBackButtonRef(): any;
    /**
     * @private
     */
    setBackButtonRef(backButtonElementRef: any): void;
    /**
     * @private
     */
    getBackButtonTextRef(): any;
    /**
     * @private
     */
    setBackButtonTextRef(backButtonTextElementRef: any): void;
    /**
     * @private
     */
    setBackgroundRef(backgrouneElementRef: any): void;
    /**
     * @private
     */
    getBackgroundRef(): any;
    /**
     * @private
     */
    didEnter(): void;
    /**
     * @private
     */
    setHidden(isHidden: any): void;
}
/**
 * @private
 * Used to find and register headers in a view, and this directive's
 * content will be moved up to the common navbar location, and created
 * using the same context as the view's content area.
*/
export declare class NavbarTemplate {
    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef, viewCtrl: ViewController);
}
