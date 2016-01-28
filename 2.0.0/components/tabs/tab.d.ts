import { ElementRef, Compiler, AppViewManager, NgZone, Renderer, Type } from 'angular2/core';
import { EventEmitter } from 'angular2/core';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { NavController } from '../nav/nav-controller';
import { Tabs } from './tabs';
import { TabButton } from './tab-button';
/**
 * @name Tab
 * @usage
 * ```html
 * <ion-tabs>
 * 	 <ion-tab tabTitle="Home" tabIcon="home" [root]="tabOneRoot"></ion-tab>
 * 	 <ion-tab tabTitle="Login" tabIcon="star" [root]="tabTwoRoot"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * @description
 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
 * of the Component docs._
 *
 * Tab components are basic navigation controllers used with Tabs.  Much like
 * Nav, they are a subclass of NavController and can be used to navigate
 * to pages in and manipulate the navigation stack of a particular tab.
 *
 * For more information on using navigation controllers like Tab or [Nav](../../nav/Nav/),
 * take a look at the [NavController API reference](../NavController/).
 *
 * See the [Tabs API reference](../Tabs/) for more details on configuring Tabs
 * and the TabBar.
 *
 * For most cases, you can give tab a `[root]` property along with the component you want to load.
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot"><ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * import {Chat} from '../chat/chat';
 * export class Tabs {
 *    constructor(){
 *      // here we'll set the property of chatRoot to
 *      // the imported class of Chat
 *      this.chatRoot = Chat
 *    }
 * }
 * ```
 *
 * In other cases, you may not want to navigate to a new component, but just
 * call a method. You can use the `(select)` event to call a method on your
 * class. Below is an example of presenting a modal from one of the tabs.
 *
 * ```html
 * <ion-tabs preloadTabs="false">
 *   <ion-tab (select)="chat()"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * export class Tabs {
 *   constructor(nav: NavController){
 *     this.nav = nav;
 *   }
 *   chat() {
 *     let modal = Modal.create(ChatPage);
 *     this.nav.present(modal);
 *   }
 * }
 * ```
 *
 *
 * @property {any} [root] - set the root page for this tab
 * @property {any} [tabTitle] - set the title of this tab
 * @property {any} [tabIcon] - set the icon for this tab
 * @property {any} [tabBadge] - set the badge for this tab
 * @property {any} [tabBadgeStyle] - set the badge color for this tab
 * @property {any} [select] - method to call when the current tab is selected
 *
 */
export declare class Tab extends NavController {
    isSelected: boolean;
    private _isInitial;
    private _panelId;
    private _btnId;
    private _loaded;
    private _loadTimer;
    /**
     * @private
     */
    btn: TabButton;
    root: Type;
    tabTitle: string;
    tabIcon: string;
    tabBadge: string;
    tabBadgeStyle: string;
    select: EventEmitter<any>;
    constructor(parentTabs: Tabs, app: IonicApp, config: Config, keyboard: Keyboard, elementRef: ElementRef, compiler: Compiler, viewManager: AppViewManager, zone: NgZone, renderer: Renderer);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    load(opts: any, done?: Function): void;
    preload(wait: any): void;
    /**
     * @private
     */
    loadPage(viewCtrl: any, navbarContainerRef: any, opts: any, done: any): void;
    /**
     * @private
     */
    setSelected(isSelected: any): void;
    /**
     * @private
     */
    hideNavbars(shouldHideNavbars: any): void;
    /**
     *
     * ```ts
     * export class MyClass{
     *  constructor(tab: Tab){
     *    this.tab = tab;
     *    console.log(this.tab.index);
     *  }
     * }
     * ```
     *
     * @returns {number} Returns the index of this page within its NavController.
     *
     */
    index: any;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
