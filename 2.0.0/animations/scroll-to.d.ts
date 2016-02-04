export declare class ScrollTo {
    isPlaying: boolean;
    private _el;
    constructor(ele: any);
    start(x: number, y: number, duration: number, tolerance?: number): Promise<any>;
    stop(): void;
    dispose(): void;
}
