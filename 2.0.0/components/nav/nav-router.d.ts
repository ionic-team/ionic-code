import { ElementRef, DynamicComponentLoader } from 'angular2/core';
import { RouterOutlet, Router, ComponentInstruction } from 'angular2/router';
import { Nav } from './nav';
import { ViewController } from './view-controller';
/**
 * @private
 */
export declare class NavRouter extends RouterOutlet {
    private _nav;
    private _activeViewId;
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, nameAttr: string, _nav: Nav);
    /**
     * @private
     * TODO
     * @param {ComponentInstruction} instruction  TODO
     */
    activate(nextInstruction: ComponentInstruction): Promise<any>;
    reuse(nextInstruction: ComponentInstruction): Promise<void>;
    /**
     * Called by Ionic after a transition has completed.
     * @param {string} direction  The direction of the state change
     * @param {ViewController} viewCtrl  The entering ViewController
     */
    stateChange(direction: string, viewCtrl: ViewController): void;
    /**
     * TODO
     * @param {TODO} componentType  TODO
     * @returns {TODO} TODO
     */
    getPathRecognizerByComponent(componentType: any): any;
}
