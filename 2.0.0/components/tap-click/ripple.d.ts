import { Activator } from './activator';
export declare class RippleActivator extends Activator {
    private expands;
    private fades;
    private expandSpeed;
    constructor(app: any, config: any, zone: any);
    downAction(ev: any, activatableEle: any, pointerX: any, pointerY: any): boolean;
    createRipple(activatableEle: any, pointerX: any, pointerY: any, clientRect: any): void;
    upAction(): void;
    next(): void;
    clearState(): void;
}
