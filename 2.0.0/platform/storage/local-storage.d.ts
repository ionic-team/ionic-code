import { StorageEngine } from './storage';
/**
 * @name LocalStorage
 * @description
 * The LocalStorage storage engine uses the browser's local storage system for
 * storing key/value pairs.
 *
 * Note: LocalStorage should ONLY be used for temporary data that you can afford to lose.
 * Given disk space constraints on a mobile device, local storage might be "cleaned up"
 * by the operating system (iOS).
 *
 * For guaranteed, long-term storage, use the SqlStorage engine which stores data in a file.
 *
 * @usage
 * ```ts
 * import {Page, Storage, LocalStorage} from 'ionic/ionic';
 * @Page({
 *   template: `<ion-content></ion-content>`
 * });
 * export class MyClass{
 *  constructor(){
 *    this.local = new Storage(LocalStorage);
 *    this.local.set('didTutorial', true);
 *  }
 *}
 *```
 * @demo /docs/v2/demos/local-storage/
 * @see {@link /docs/v2/platform/storage/ Storage Platform Docs}
 */
export declare class LocalStorage extends StorageEngine {
    constructor();
    /**
     * Get the value of a key in LocalStorage
     * @param {String} key the key you want to lookup in LocalStorage
     */
    get(key: any): Promise<{}>;
    /**
     * Set a key value pair and save it to LocalStorage
     * @param {String} key the key you want to save to LocalStorage
     * @param {Any} value the value of the key you're saving
     */
    set(key: any, value: any): Promise<{}>;
    /**
     * Remove a key from LocalStorage
     * @param {String} key the key you want to remove from LocalStorage
     */
    remove(key: any): Promise<{}>;
}
