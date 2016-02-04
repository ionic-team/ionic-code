import { Gesture } from './gesture';
export declare class DragGesture extends Gesture {
    dragging: boolean;
    constructor(element: any, opts?: {});
    listen(): void;
    onDrag(ev: any): boolean;
    onDragStart(ev: any): boolean;
    onDragEnd(ev: any): void;
}
