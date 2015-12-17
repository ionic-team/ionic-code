import { NavController } from './nav-controller';
import { NavRegistry } from './nav-registry';
/**
 * @name NavPush
 * @description
 * Directive for declaratively linking to a new page instead of using
 * {@link ../NavController/#push NavController.push}. Similar to ui-router's `ui-sref`.
 *
 * @usage
 * ```html
 * <button [navPush]="pushPage"></button>
 * ```
 * To specify parameters you can use array syntax or the `nav-params` property:
 * ```html
 * <button [navPush]="pushPage" [navParams]="params"></button>
 * ```
 * Where `pushPage` and `params` are specified in your component, and `pushPage`
 * contains a reference to a [@Page component](../../../config/Page/):
 *
 * ```ts
 * import {LoginPage} from 'login';
 * @Page({
 *   template: `<button [navPush]="pushPage" [navParams]="params"></button>`
 * })
 * class MyPage {
 *   constructor(){
 *     this.pushPage = LoginPage;
 *     this.params = { id: 42 };
 *   }
 * }
 * ```
 *
 * ### Alternate syntax
 * You can also use syntax similar to Angular2's router, passing an array to
 * NavPush:
 * ```html
 * <button [navPush]="[pushPage, params]"></button>
 * ```
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPop NavPop API Docs}
 */
export declare class NavPush {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    constructor(nav: NavController, registry: NavRegistry);
    /**
     * @private
     */
    onClick(): void;
}
/**
 * @name NavPop
 * @description
 * Directive for declaratively pop the current page off from the navigation stack.
 *
 * @usage
 * ```html
 * <ion-content>
 *  <div block button nav-pop>go back</div>
 * </ion-content>
 * ```
 * This will go back one page in the navigation stack
 *
 * Similar to {@link /docs/v2/api/components/nav/NavPush/ `NavPush` }
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPush NavPush API Docs}
 */
export declare class NavPop {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    constructor(nav: NavController);
    /**
     * @private
     */
    onClick(): void;
}
