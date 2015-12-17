import { ElementRef, Renderer } from 'angular2/core';
import { Config } from '../../config/config';
import { TextInput } from './text-input';
import { Form } from '../../util/form';
/**
 * @name Label
 * @description
 * Labels describe the data that the user should enter in to an input element.
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Username</ion-label>
 *   <input type="text" value="">
 * </ion-input>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */
export declare class Label {
    private form;
    private elementRef;
    private renderer;
    constructor(config: Config, container: TextInput, form: Form, elementRef: ElementRef, renderer: Renderer);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    pointerStart(ev: any): void;
    /**
     * @private
     */
    pointerEnd(ev: any): void;
    /**
     * @private
     */
    addClass(className: any): void;
}
