import { Renderer, ElementRef } from 'angular2/core';
import { Form } from '../../util/form';
/**
 * @name Item
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * There are three common ways to use an item:
 * - Use `<ion-item>` for something that is only non-clickable text.
 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
 * - Use `<a ion-item>` for when the item needs to contain a `href`.
 *
 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
 *
 *
 * @usage
 * ```html
 *
 * <ion-list>
 *
 *   // default item
 *   <ion-item>
 *     {{item.title}}
 *   </ion-item>
 *
 * </ion-list>
 *
 *  ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
export declare class Item {
    private _renderer;
    private _elementRef;
    private _ids;
    private _inputs;
    private _label;
    private _viewLabel;
    id: string;
    labelId: string;
    constructor(form: Form, _renderer: Renderer, _elementRef: ElementRef);
    /**
     * @private
     */
    registerInput(type: string): string;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    setCssClass(cssClass: string, shouldAdd: boolean): void;
    /**
     * @private
     */
    getLabelText(): string;
    private contentLabel;
    private viewLabel;
    /**
     * @private
     */
    private _buttons;
    /**
     * @private
     */
    private _icons;
}
