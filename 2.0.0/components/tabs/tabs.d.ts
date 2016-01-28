import { ElementRef, ViewContainerRef, EventEmitter, Renderer } from 'angular2/core';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Tab } from './tab';
import { Ion } from '../ion';
import { Platform } from '../../platform/platform';
import { NavController } from '../nav/nav-controller';
import { ViewController } from '../nav/view-controller';
/**
 * @name Tabs
 * @property {any} [tabbarPlacement] - set position of the tabbar, top or bottom
 * @property {any} [tabbarIcons] - set the position of the tabbar's icons: top, bottom, left, right, hide
 * @property {any} [preloadTabs] - sets whether to preload all the tabs, true or false
 * @usage
* ```html
 * <ion-tabs>
 *   <ion-tab [root]="tabRoot"></ion-tab>
 * </ion-tabs>
 * ```
 * @description
 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
 * of the Component docs._
 *
 * The Tabs component is a container with a TabBar and any number of
 * individual Tab components. On iOS, the TabBar is placed on the bottom of
 * the screen, while on Android it is at the top.
 *
 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
 * @see {@link ../Tab Tab API Docs}
 */
export declare class Tabs extends Ion {
    parent: NavController;
    private _app;
    private _config;
    private _elementRef;
    private _platform;
    private _renderer;
    private _ids;
    private _tabs;
    private _onReady;
    private _useHighlight;
    /**
     * @private
     */
    id: number;
    /**
     * @private
     */
    navbarContainerRef: ViewContainerRef;
    subPages: boolean;
    selectedIndex: any;
    preloadTabs: any;
    tabbarIcons: string;
    tabbarPlacement: string;
    change: EventEmitter<Tab>;
    private _highlight;
    private _btns;
    constructor(viewCtrl: ViewController, parent: NavController, _app: IonicApp, _config: Config, _elementRef: ElementRef, _platform: Platform, _renderer: Renderer);
    /**
     * @private
     */
    ngAfterViewInit(): void;
    /**
     * @private
     */
    private _setConfig(attrKey, fallback);
    /**
     * @private
     */
    add(tab: any): void;
    /**
     * @param {number} index Index of the tab you want to select
     */
    select(tabOrIndex: any): any;
    /**
     * @param {number} index Index of the tab you want to get
     * @returns {Any} Tab Returs the tab who's index matches the one passed
     */
    getByIndex(index: number): any;
    /**
     * @return {Any} Tab Returns the currently selected tab
     */
    getSelected(): Tab;
    /**
     * @private
     */
    getIndex(tab: Tab): number;
    /**
     * @private
     * "Touch" the active tab, going back to the root view of the tab
     * or optionally letting the tab handle the event
     */
    private _touchActive(tab);
    /**
     * Returns the root NavController. Returns `null` if Tabs is not
     * within a NavController.
     * @returns {NavController}
     */
    rootNav: NavController;
}
