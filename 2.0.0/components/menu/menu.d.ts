import { EventEmitter, ElementRef, NgZone, Renderer } from 'angular2/core';
import { Ion } from '../ion';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Platform } from '../../platform/platform';
import { Keyboard } from '../../util/keyboard';
import { MenuType } from './menu-types';
/**
 * @name Menu
 * @description
 * _For basic Menu usage, see the [Menu section](../../../../components/#menus)
 * of the Component docs._
 *
 * Menu is a side-menu navigation that can be dragged out or toggled to show.
 *
 * @usage
 * In order to use Menu, you must specify a [reference](https://angular.io/docs/ts/latest/guide/user-input.html#local-variables)
 * to the content element that Menu should listen on for drag events, using the `content` property:
 *
 * ```html
 * <ion-menu [content]="mycontent">
 *   <ion-content>
 *     <ion-list>
 *     ...
 *     </ion-list>
 *   </ion-content>
 * </ion-menu>
 *
 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
 * ```
 *
 * By default, Menus are on the left, but this can be overriden with the `side`
 * property:
 * ```html
 * <ion-menu [content]="mycontent" side="right"></ion-menu>
 * ```
 *
 * Menus can optionally be given an `id` attribute which allows the app to
 * to get ahold of menu references. If no `id` is given then the menu
 * automatically receives an `id` created from the side it is on, such as
 * `leftMenu` or `rightMenu`. When using more than one menu it is always
 * recommended to give each menu a unique `id`. Additionally menuToggle and
 * menuClose directives should be given menu id values of their respective
 * menu.
 *
 * Menu supports two display styles: overlay, and reveal. Overlay
 * is the traditional Android drawer style, and Reveal is the traditional iOS
 * style. By default, Menu will adjust to the correct style for the platform,
 * but this can be overriden using the `type` property:
 * ```html
 * <ion-menu [content]="mycontent" type="overlay"></ion-menu>
 * ```
 *
 * To programatically interact with the menu, you first get the menu component.
 *
 * ```ts
 * @Page({
 * `<ion-menu [content]="mycontent" id="leftMenu"></ion-menu>
 * <ion-nav #mycontent [root]="rootPage"></ion-nav>`
 * )}
 * export class MyClass{
 *  constructor(app: IonicApp){
 *    this.app = app;
 *    this.menu;
 *  }
 *
 *  // Wait until the page is ready
 *  ngAfterViewInit(){
 *    this.menu = this.app.getComponent('leftMenu');
 *  }
 *
 *  // Open the menu programatically
 *  openMenu(){
 *    this.menu.open();
 *  }
 *
 * }
 * ```
 *
 * If you want to use any of the APIs down below, make sure to grabe the menu component by it's ID
 *
 * @demo /docs/v2/demos/menu/
 *
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../../nav/Nav Nav API Docs}
 *
 */
export declare class Menu extends Ion {
    private _elementRef;
    private _config;
    private _app;
    private _platform;
    private _renderer;
    private _keyboard;
    private _zone;
    private _preventTime;
    private _cntEle;
    private _gesture;
    private _targetGesture;
    private _type;
    isOpen: boolean;
    isEnabled: boolean;
    isSwipeEnabled: boolean;
    backdrop: MenuBackdrop;
    onContentClick: EventListener;
    content: any;
    id: string;
    side: string;
    type: string;
    swipeEnabled: string;
    maxEdgeStart: any;
    opening: EventEmitter<any>;
    constructor(_elementRef: ElementRef, _config: Config, _app: IonicApp, _platform: Platform, _renderer: Renderer, _keyboard: Keyboard, _zone: NgZone);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    _initGesture(): void;
    /**
     * @private
     */
    _initType(type: any): void;
    /**
     * @private
     */
    _getType(): MenuType;
    /**
     * Sets the state of the Menu to open or not.
     * @param {boolean} isOpen  If the Menu is open or not.
     * @return {Promise} returns a promise once set
     */
    setOpen(shouldOpen: any): Promise<void>;
    /**
     * @private
     */
    setProgressStart(): void;
    /**
     * @private
     */
    setProgess(value: any): void;
    /**
     * @private
     */
    setProgressEnd(shouldComplete: any): void;
    /**
     * @private
     */
    _before(): void;
    /**
     * @private
     */
    _after(isOpen: any): void;
    /**
     * @private
     */
    _prevent(): void;
    /**
     * @private
     */
    _isPrevented(): boolean;
    /**
     * Progamatically open the Menu
     * @return {Promise} returns a promise when the menu is fully opened
     */
    open(): Promise<void>;
    /**
     * Progamatically close the Menu
     * @return {Promise} returns a promise when the menu is fully closed
     */
    close(): Promise<void>;
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it will close
     * @return {Promise} returns a promise when the menu has been toggled
     */
    toggle(): Promise<void>;
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be dragged open.
     * @param {boolean} shouldEnable  True if it should be enabled, false if not.
     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable: any): this;
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
     * @return {Menu}  Returns the instance of the menu, which is useful for chaining.
     */
    swipeEnable(shouldEnable: any): this;
    /**
     * @private
     */
    getMenuElement(): any;
    /**
     * @private
     */
    getContentElement(): HTMLElement;
    /**
     * @private
     */
    getBackdropElement(): any;
    /**
     * @private
     */
    static register(name: string, cls: new (...args: any[]) => MenuType): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    static getById(app: any, menuId: any): any;
}
/**
 * @private
 */
export declare class MenuBackdrop {
    private menu;
    elementRef: ElementRef;
    constructor(menu: Menu, elementRef: ElementRef);
    /**
     * @private
     */
    clicked(ev: any): void;
}
