/**
 * A gesture recognizer class.
 *
 * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
 */
export declare class Gesture {
    element: HTMLElement;
    direction: any;
    private _hammer;
    private _options;
    private _callbacks;
    constructor(element: any, opts?: any);
    options(opts?: {}): void;
    on(type: any, cb: any): void;
    off(type: any, cb: any): void;
    listen(): void;
    unlisten(): void;
    destroy(): void;
}
