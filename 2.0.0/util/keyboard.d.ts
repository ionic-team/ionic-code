import { NgZone } from 'angular2/core';
import { Config } from '../config/config';
import { Form } from './form';
/**
 * @name Keyboard
 * @description
 * The `Keyboard` class allows you to work with the keyboard events provide by the Ionic keyboard plugin.
 *
 * @usage
 * ```ts
 * export class MyClass{
 *  constructor(keyboard: Keyboard){
 *    this.keyboard = keyboard;
 *  }
 * }
 *
 * ```
 */
export declare class Keyboard {
    private _form;
    private _zone;
    constructor(config: Config, _form: Form, _zone: NgZone);
    /**
     * Chech to see if the keyboard is open or not.
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *  }
     *  keyboardCheck(){
     *    setTimeout(()  => console.log('is the keyboard open ', this.keyboard.isOpen()));
     *  }
     * }
     *
     * ```
     *
     * @return {Bool} returns a true or flase value if the keyboard is open or not
     */
    isOpen(): boolean;
    /**
     * When the keyboard is closed, call any methods you want
     *
     * ```ts
     * export class MyClass{
     *  constructor(keyboard: Keyboard){
     *    this.keyboard = keyboard;
     *    this.keyboard.onClose(this.closeCallback);
     *  }
     *  closeCallback(){
     *     // call what ever functionality you want on keyboard close
     *     console.log('Closing time");
     *  }
     * }
     *
     * ```
     * @param {Function} callback method you want to call when the keyboard has been closed
     * @return {Function} returns a callback that gets fired when the keyboard is closed
     */
    onClose(callback: any, pollingInternval?: number): any;
    /**
     * Progamatically close they keyboard
     *
     */
    close(): void;
    /**
     * @private
     */
    focusOutline(setting: any, document: any): void;
}
