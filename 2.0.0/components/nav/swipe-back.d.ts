import { NavController } from './nav-controller';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
export declare class SwipeBackGesture extends SlideEdgeGesture {
    private _nav;
    edges: Array<string>;
    threshold: string;
    constructor(element: HTMLElement, opts: any, _nav: NavController);
    onSlideStart(): void;
    onSlide(slide: any, ev: any): void;
    onSlideEnd(slide: any, ev: any): void;
}
