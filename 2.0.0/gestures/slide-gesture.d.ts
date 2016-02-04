import { DragGesture } from './drag-gesture';
export declare class SlideGesture extends DragGesture {
    slide: any;
    constructor(element: any, opts?: {});
    getSlideBoundaries(slide: any, ev: any): {
        min: number;
        max: number;
    };
    getElementStartPos(slide: any, ev: any): number;
    canStart(ev: any): boolean;
    onDragStart(ev: any): boolean;
    onDrag(ev: any): boolean;
    onDragEnd(ev: any): void;
    onSlideBeforeStart(slide?: any, ev?: any): void;
    onSlideStart(slide?: any, ev?: any): void;
    onSlide(slide?: any, ev?: any): void;
    onSlideEnd(slide?: any, ev?: any): void;
}
