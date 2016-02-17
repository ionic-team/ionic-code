import { ViewController } from '../components/nav/view-controller';
/**
  Animation Steps/Process
  -----------------------

 - Construct animation (doesn't start)
 - Client play()'s animation, returns promise
 - Add before classes to elements
 - Remove before classes from elements
 - Elements staged in "from" effect w/ inline styles
 - Call onReady()
 - Wait for RENDER_DELAY milliseconds (give browser time to render)
 - Call onPlay()
 - Run from/to animation on elements
 - Animations finish async
 - Set inline styles w/ the "to" effects on elements
 - Add after classes to elements
 - Remove after classes from elements
 - Call onFinish()
 - Resolve play()'s promise
**/
/**
 * @private
**/
export declare class Animation {
    private _parent;
    private _isStaged;
    private _isFinished;
    private _duration;
    private _easing;
    private _from;
    private _to;
    private _rate;
    private _opts;
    private _el;
    private _chld;
    private _ani;
    private _bfSty;
    private _bfAdd;
    private _bfRmv;
    private _afAdd;
    private _afRmv;
    private _readys;
    private _plays;
    private _finishes;
    isProgress: boolean;
    constructor(ele?: any, opts?: {});
    reset(): void;
    elements(ele: any): this;
    addElement(ele: any): void;
    parent(parentAnimation: any): this;
    add(childAnimations: any): this;
    duration(value?: number): any;
    clearDuration(): void;
    easing(name?: string, opts?: {}): any;
    playbackRate(value?: number): any;
    reverse(): any;
    forward(): any;
    from(property: any, value: any): this;
    to(property: any, value: any): this;
    fromTo(property: any, from: any, to: any): this;
    fadeIn(): this;
    fadeOut(): this;
    before: {
        addClass: (className: any) => Animation;
        removeClass: (className: any) => Animation;
        setStyles: (styles: any) => Animation;
    };
    after: {
        addClass: (className: string) => Animation;
        removeClass: (className: string) => Animation;
    };
    play(done?: Function): any;
    stage(): void;
    _onPlay(): void;
    _onFinish(): void;
    pause(): void;
    progressStart(): void;
    progress(value: any): void;
    /**
     * Get the current time of the first animation
     * in the list. To get a specific time of an animation, call
     * subAnimationInstance.getCurrentTime()
     */
    getCurrentTime(): any;
    progressEnd(shouldComplete: any, rate?: number): Promise<any[]>;
    onReady(fn: any, clear: any): this;
    onPlay(fn: any, clear: any): this;
    onFinish(fn: any, clear: any): this;
    clone(): Animation;
    dispose(removeElement?: any): void;
    static create(name: any): any;
    static createTransition(enteringView: ViewController, leavingView: ViewController, opts?: any): any;
    static register(name: string, AnimationClass: any): void;
}
