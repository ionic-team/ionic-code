import { Compiler, ElementRef, NgZone, AppViewManager, Renderer, ResolvedProvider, Type } from 'angular2/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { IonicApp } from '../app/app';
import { Keyboard } from '../../util/keyboard';
import { NavRouter } from './nav-router';
import { ViewController } from './view-controller';
/**
 * _For examples on the basic usage of NavController, check out the
 * [Navigation section](../../../../components/#navigation) of the Component
 * docs._
 *
 * NavController is the base class for navigation controller components like
 * [`Nav`](../Nav/) and [`Tab`](../../Tabs/Tab/). You use navigation controllers
 * to navigate to [pages](#creating_pages) in your app. At a basic level, a
 * navigation controller is an array of pages representing a particular history
 * (of a Tab for example). This array can be manipulated to navigate throughout
 * an app by pushing and popping pages or inserting and removing them at
 * arbitrary locations in history.
 *
 * The current page is the last one in the array, or the top of the stack if we
 * think of it that way.  [Pushing](#push) a new page onto the top of the
 * navigation stack causes the new page to be animated in, while [popping](#pop)
 * the current page will navigate to the previous page in the stack.
 *
 * Unless you are using a directive like [NavPush](../NavPush/), or need a
 * specific NavController, most times you will inject and use a reference to the
 * nearest NavController to manipulate the navigation stack.
 *
 * <h3 id="injecting_nav_controller">Injecting NavController</h3>
 * Injecting NavController will always get you an instance of the nearest
 * NavController, regardless of whether it is a Tab or a Nav.
 *
 * Behind the scenes, when Ionic instantiates a new NavController, it creates an
 * injector with NavController bound to that instance (usually either a Nav or
 * Tab) and adds the injector to its own providers.  For more information on
 * providers and dependency injection, see [Providers and DI]().
 *
 * Instead, you can inject NavController and know that it is the correct
 * navigation controller for most situations (for more advanced situations, see
 * [Menu](../../Menu/Menu/) and [Tab](../../Tab/Tab/)).
 *
 * ```ts
 *  class MyComponent {
 *    constructor(nav: NavController) {
 *      this.nav = nav;
 *    }
 *  }
 * ```
 *
 * <h2 id="creating_pages">Page creation</h2>
 * _For more information on the `@Page` decorator see the [@Page API
 * reference](../../../decorators/Page/)._
 *
 * Pages are created when they are added to the navigation stack.  For methods
 * like [push()](#push), the NavController takes any component class that is
 * decorated with `@Page` as its first argument.  The NavController then
 * compiles that component, adds it to the app and animates it into view.
 *
 * By default, pages are cached and left in the DOM if they are navigated away
 * from but still in the navigation stack (the exiting page on a `push()` for
 * example).  They are destroyed when removed from the navigation stack (on
 * [pop()](#pop) or [setRoot()](#setRoot)).
 *
 *
 * <h2 id="Lifecycle">Lifecycle events</h2>
 * Lifecycle events are fired during various stages of navigation.  They can be
 * defined in any `@Page` decorated component class.
 *
 * ```ts
 * @Page({
 *   template: 'Hello World'
 * })
 * class HelloWorld {
 *   onPageLoaded() {
 *     console.log("I'm alive!");
 *   }
 *   onPageWillLeave() {
 *     console.log("Looks like I'm about to leave :(");
 *   }
 * }
 * ```
 *
 *
 *
 * - `onPageLoaded` - Runs when the page has loaded. This event only happens once per page being created and added to the DOM. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The `onPageLoaded` event is good place to put your setup code for the page.
 * - `onPageWillEnter` - Runs when the page is about to enter and become the active page.
 * - `onPageDidEnter` - Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
 * - `onPageWillLeave` - Runs when the page is about to leave and no longer be the active page.
 * - `onPageDidLeave` - Runs when the page has finished leaving and is no longer the active page.
 * - `onPageWillUnload` - Runs when the page is about to be destroyed and have its elements removed.
 * - `onPageDidUnload` - Runs after the page has been destroyed and its elements have been removed.
 *
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 */
export declare class NavController extends Ion {
    parent: any;
    app: IonicApp;
    config: Config;
    keyboard: Keyboard;
    protected _anchorName: string;
    protected _compiler: Compiler;
    protected _viewManager: AppViewManager;
    protected _zone: NgZone;
    protected _renderer: Renderer;
    private _transIds;
    private _init;
    private _lastTrans;
    protected _ids: number;
    protected _sbEnabled: any;
    protected _sbThreshold: any;
    protected _sbTrans: any;
    protected _trnsDelay: any;
    protected _trnsTime: number;
    protected _views: Array<ViewController>;
    id: number;
    providers: ResolvedProvider[];
    router: NavRouter;
    sbGesture: any;
    constructor(parent: any, app: IonicApp, config: Config, keyboard: Keyboard, elementRef: ElementRef, _anchorName: string, _compiler: Compiler, _viewManager: AppViewManager, _zone: NgZone, _renderer: Renderer);
    /**
     * Set the root for the current navigation stack
     * @param {Type} page  The name of the component you want to push on the navigation stack
     * @param {object} [params={}] Any nav-params you want to pass along to the next view
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when done
     */
    setRoot(page: Type, params?: any, opts?: any): Promise<any>;
    /**
     * You can set the views of the current navigation stack and navigate to the last view past
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic'
     * import {Detail} from '../detail/detail'
     * import {Info} from '../info/info'
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([ {page: List}, {page: Detail}, {page:Info} ]);
     *    }
     *  }
     *```
     *
     *
     *In this example, we're giving the current nav stack an array of pages. Then the navigation stack will navigate to the last view in the array and remove the orignal view you came from.
     *
     * By default, animations are disabled, but they can be enabled by passing options to the navigation controller
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic'
     * import {Detail} from '../detail/detail'
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([ {page: List}, {page: Detail} ], {
     *        animate: true
     *      });
     *    }
     *  }
     *```
     *
     *
     *You can also pass any navigation params to the individual pages in the array.
     *
     *
     *```typescript
     * import {Page, NavController} from 'ionic/ionic';
     * import {Info} from '../info/info';
     * import {List} from '../list/list';
     * import {Detail} from '../detail/detail';
     *
     *  export class Home {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    setPages() {
     *      this.nav.setPages([{
     *        page: Info
     *      }, {
     *        page: List,
     *        params: {tags: 'css'}
     *      }, {
     *        page: Detail,
     *        params: {id: 325}
     *      }]);
     *    }
     *  }
     *```
     *
     * @param {Array<Type>} pages  An arry of page components and their params to load in the stack
     * @param {object} [opts={}] Any options you want to use pass
     * @returns {Promise} Returns a promise when the pages are set
     */
    setPages(pages: Array<{
        page: Type;
        params?: any;
    }>, opts?: any): Promise<any>;
    /**
     * @private
     */
    private setViews(components, opts?);
    /**
     * Push is how we can pass components and navigate to them. We push the component we want to navigate to on to the navigation stack.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(){
     *      this.nav.push(SecondView);
     *    }
     * }
     * ```
     *
     * We can also pass along parameters to the next view, such as data that we have on the current view. This is a similar concept to to V1 apps with `$stateParams`.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(user){
     *      this.nav.push(SecondView,{
     *       // user is an object we have in our view
     *       // typically this comes from an ngFor or some array
     *       // here we can create an object with a property of
     *       // paramUser, and set it's value to the user object we passed in
     *       paramUser: user
     *      });
     *    }
     * }
     * ```
     *
     * We'll look at how we can access that data in the `SecondView` in the navParam docs
     *
     * We can also pass any options to the transtion from that same method
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav: NavController){
     *      this.nav = nav;
     *    }
     *
     *    pushPage(user){
     *      this.nav.push(SecondView,{
     *       // user is an object we have in our view
     *       // typically this comes from an ngFor or some array
     *       // here we can create an object with a property of
     *       // paramUser, and set it's value to the user object we passed in
     *       paramUser: user
     *      },{
     *       // here we can configure things like the animations direction or
     *       // or if the view should animate at all.
     *       direction: 'back'
     *      });
     *    }
     * }
     * ```
     * @param {Type} page  The page component class you want to push on to the navigation stack
     * @param {object} [params={}] Any nav-params you want to pass along to the next view
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise, which resolves when the transition has completed
     */
    push(page: Type, params?: any, opts?: {
        animate?: boolean;
        animation?: string;
        direction?: string;
    }): Promise<any>;
    /**
     * Present is how we display overlays on top of the content, from within the
     * root level `NavController`. The `present` method is used by overlays, such
     * as `ActionSheet`, `Alert`, and `Modal`. The main difference between `push`
     * and `present`, is that `present` takes a `ViewController` instance, whereas
     * `push` takes a `Page` component class. Additionally, `present` will place
     * the overlay in the root NavController's stack.
     *
     * ```typescript
     * class MyClass{
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *
     *    presentModal() {
     *      let modal = Modal.create(ProfilePage);
     *      this.nav.present(modal);
     *    }
     * }
     * ```
     *
     * @param {ViewController} enteringView The name of the component you want to push on the navigation stack
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise, which resolves when the transition has completed
     */
    present(enteringView: ViewController, opts?: any): Promise<any>;
    /**
     * Inserts a view into the nav stack at the specified index.
     * This is useful if you need to add a view at any point in your navigation stack
     *
     * ```typescript
     * export class Detail {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    insertPage(){
     *      this.nav.insert(1, Info);
     *    }
     *  }
     * ```
     *
     * This will insert the `Info` page into the second slot of our navigation stack
     *
     * @param {number} insertIndex  The index where you want to insert the page
     * @param {Type} page  The name of the component you want to insert into the nav stack
     * @param {object} [params={}] Any nav-params you want to pass along to the next page
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the page has been inserted into the navigation stack
     */
    insert(insertIndex: number, page: Type, params?: any, opts?: any): Promise<any>;
    /**
     * Inserts multiple pages into the nav stack at the specified index.
     *
     * ```typescript
     * export class Detail {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    insertPages(){
     *      let pages = [
     *        { page: Info },
     *        { page: ProfileList },
     *        { page: ProfileDetail, params: {userId:5} }
     *      ];
     *      this.nav.insertPages(2, pages);
     *    }
     *  }
     * ```
     *
     * This will insert each of the pages in the array, starting at the third slot
     * (second index) of the nav stack. The last page in the array will animate
     * in and become the active page.
     *
     * @param {number} insertIndex  The index where you want to insert the page
     * @param {Array<{page: Type, params=: any}>} insertPages  An array of objects, each with a `page` and optionally `params` property
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the pages have been inserted into the navigation stack
     */
    insertPages(insertIndex: number, insertPages: Array<{
        page: Type;
        params?: any;
    }>, opts?: any): Promise<any>;
    private _insertViews(insertIndex, insertViews, opts?);
    /**
     * @private
     */
    private _insert(insertIndex, insertViews);
    /**
     * If you wanted to navigate back from a current view, you can use the back-button or programatically call `pop()`
     * Similar to `push()`, you can pass animation options.
     *
     * ```typescript
     * class SecondView{
     *    constructor(nav:NavController){
     *      this.nav = nav;
     *    }
     *    goBack(){
     *      this.nav.pop();
     *    }
     * }
     * ```
     *
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the transition is completed
     */
    pop(opts?: any): Promise<any>;
    /**
     * Similar to `pop()`, this method let's you navigate back to the root of the stack, no matter how many views that is
     * @param {object} [opts={}] Any options you want to use pass to transtion
     */
    popToRoot(opts?: {}): Promise<any>;
    /**
     * Pop to a specific view in the history stack
     * @param {ViewController} view  to pop to
     * @param {object} [opts={}]  Any options you want to use pass to transtion
     */
    popTo(view: ViewController, opts?: any): Promise<any>;
    /**
     * Removes a view from the nav stack at the specified index.
     *
     * ```typescript
     * export class Detail {
     *    constructor(nav: NavController) {
     *      this.nav = nav;
     *    }
     *    removeView(){
     *      this.nav.remove(1);
     *    }
     *  }
     * ```
     *
     * @param {number} startIndex  The starting index to remove views from the nav stack
     * @param {removeCount} [opts={}]  The number of views to remove, defaults to remove `1`.
     * @param {object} [opts={}] Any options you want to use pass to transtion
     * @returns {Promise} Returns a promise when the view has been removed
     */
    remove(startIndex: number, removeCount?: number, opts?: any): Promise<any>;
    /**
     * @private
     */
    private _remove(startIndex, removeCount);
    /**
     * @private
     */
    private _transition(enteringView, leavingView, opts, done);
    /**
     * @private
     */
    private _render(transId, enteringView, leavingView, opts, done);
    /**
     * @private
     */
    private _postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
    /**
     * @private
     */
    private _beforeTrans(enteringView, leavingView, opts, done);
    /**
     * @private
     */
    private _afterTrans(enteringView, leavingView, opts, done);
    /**
     * @private
     */
    private _transComplete(transId, enteringView, leavingView, direction);
    private _cleanup();
    /**
     * @private
     */
    loadPage(view: ViewController, navbarContainerRef: any, opts: any, done: Function): void;
    /**
     * @private
     */
    swipeBackStart(): void;
    /**
     * @private
     */
    swipeBackProgress(value: any): void;
    /**
     * @private
     */
    swipeBackEnd(completeSwipeBack: any, rate: any): void;
    /**
     * @private
     */
    private _sbComplete();
    /**
     * Check to see if swipe-to-go-back is enabled
     * @param {boolean} isSwipeBackEnabled Set whether or not swipe-to-go-back is enabled
     * @returns {boolean} Whether swipe-to-go-back is enabled
     */
    isSwipeBackEnabled(val?: boolean): boolean;
    /**
     * If it's possible to use swipe back or not. If it's not possible
     * to go back, or swipe back is not enable then this will return false.
     * If it is possible to go back, and swipe back is enabled, then this
     * will return true.
     * @returns {boolean} Whether you can swipe to go back
     */
    canSwipeBack(): boolean;
    /**
     * Returns `true` if there's a valid previous page that we can pop back to.
     * Otherwise returns false.
     * @returns {boolean} Whether there is a page to go back to
     */
    canGoBack(): boolean;
    /**
     * Boolean if the nav controller is actively transitioning or not.
     * @private
     * @return {boolean}
     */
    isTransitioning(): boolean;
    /**
     * @private
     * @return {boolean}
     */
    setTransitioning(isTransitioning: boolean, fallback?: number): void;
    /**
     * @private
     * @returns {ViewController}
     */
    getByState(state: string): ViewController;
    /**
     * @param {number} index  The index of the page you want to get
     * @returns {ViewController} Returns the component that matches the index given
     */
    getByIndex(index: number): ViewController;
    /**
     * @returns {ViewController} Returns the active page's view controller.
     */
    getActive(): ViewController;
    /**
     * @param {ViewController} view
     * @returns {boolean}
     */
    isActive(view: ViewController): boolean;
    /**
     * @param {ViewController} view  The ViewController to get the previous view to
     * @returns {ViewController}
     */
    getPrevious(view: ViewController): ViewController;
    /**
     * First page in this nav controller's stack.
     * @returns {ViewController} Returns the first component page in the current stack
     */
    first(): ViewController;
    /**
     * Last page in this nav controller's stack. This would not return a page which is about to be destroyed.
     * @returns {ViewController} Returns the last component page in the current stack
     */
    last(): ViewController;
    /**
     * @param {ViewController} view
     * @returns {number} Returns the index number of the view
     */
    indexOf(view: ViewController): number;
    /**
     * Number of sibling views in the nav controller.
     * @returns {number} The number of views in stack, including the current view
     */
    length(): number;
    /**
     * Returns the root NavController.
     * @returns {NavController}
     */
    rootNav: NavController;
    /**
     * @private
     * @param {TODO} router  TODO
     */
    registerRouter(router: any): void;
    /**
     * @private
     */
    private _incId(view);
    /**
     * @private
     */
    private _setZIndex(enteringView, leavingView, direction);
}
