import { AppViewManager, ElementRef, Renderer } from 'angular2/core';
import { IonicApp } from './app';
/**
 * @name Id
 * @description
 * IdRef is an easy way to identify unique components in an app and access them
 * no matter where in the UI heirarchy you are. For example, this makes toggling
 * a global side menu feasible from any place in the application.
 *
 * See the [Menu section](http://ionicframework.com/docs/v2/components/#menus) of
 * the Component docs for an example of how Menus rely on ID's.
 *
 * @usage
 * To give any component an ID, simply set its `id` property:
 * ```html
 * <ion-checkbox id="myCheckbox"></ion-checkbox>
 * ```
 *
 * To get a reference to the registered component, inject the [IonicApp](../app/IonicApp/)
 * service:
 * ```ts
 * constructor(app: IonicApp) {
 *    this.app = app
 * }
 * ngAfterViewInit{
 *  var checkbox = this.app.getComponent("myCheckbox");
 *  if (checkbox.checked) {
 *    console.log('checkbox is checked');
 *  }
 * }
 * ```
 *
 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
 * guarantee that the registered component has not been destroyed if its Page
 * has been navigated away from.
 */
export declare class IdRef {
    private _app;
    private _component;
    id: string;
    constructor(_app: IonicApp, elementRef: ElementRef, appViewManager: AppViewManager);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
/**
 * @private
 */
export declare class Attr {
    private _renderer;
    private _elementRef;
    attr: string;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
}
