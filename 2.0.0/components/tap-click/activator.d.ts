export declare class Activator {
    app: any;
    zone: any;
    activatedClass: any;
    queue: Array<any>;
    active: Array<any>;
    x: number;
    y: number;
    constructor(app: any, config: any, zone: any);
    downAction(ev: any, activatableEle: any, pointerX: any, pointerY: any): boolean;
    upAction(): void;
    clearState(): void;
    deactivate(): void;
    disableActivated(ev: any): boolean;
}
