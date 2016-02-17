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
    private _app;
    private _renderer;
    private _bbIcon;
    private _bbText;
    private _hidden;
    private _bbRef;
    private _bbtRef;
    private _bgRef;
    hideBackButton: any;
    constructor(_app: IonicApp, viewCtrl: ViewController, elementRef: ElementRef, config: Config, _renderer: Renderer);
    /**
     * @private
     */
    ngOnInit(): void;
    setBackButtonText(text: string): void;
    /**
     * @private
     */
    getBackButtonRef(): ElementRef;
    /**
     * @private
     */
    setBackButtonRef(backButtonElementRef: ElementRef): void;
    /**
     * @private
     */
    getBackButtonTextRef(): ElementRef;
    /**
     * @private
     */
    setBackButtonTextRef(backButtonTextElementRef: ElementRef): void;
    /**
     * @private
     */
    setBackgroundRef(backgrouneElementRef: ElementRef): void;
    /**
     * @private
     */
    getBackgroundRef(): ElementRef;
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
