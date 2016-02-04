import { SlideGesture } from './slide-gesture';
export declare class SlideEdgeGesture extends SlideGesture {
    edges: Array<string>;
    maxEdgeStart: any;
    private _d;
    constructor(element: Element, opts?: any);
    canStart(ev: any): boolean;
    getContainerDimensions(): {
        left: number;
        top: number;
        width: any;
        height: any;
    };
    _checkEdge(edge: any, pos: any): boolean;
}
