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
    constructor(ele: any, opts?: {});
    reset(): void;
    elements(ele: any): Animation;
    addElement(ele: any): void;
    parent(parentAnimation: any): Animation;
    add(childAnimations: any): Animation;
    duration(value: any): any;
    clearDuration(): void;
    easing(name: any, opts: any): any;
    playbackRate(value: any): any;
    reverse(): any;
    forward(): any;
    from(property: any, value: any): Animation;
    to(property: any, value: any): Animation;
    fromTo(property: any, from: any, to: any): Animation;
    fadeIn(): Animation;
    fadeOut(): Animation;
    before: {
        addClass: (className: any) => Animation;
        removeClass: (className: any) => Animation;
        setStyles: (styles: any) => Animation;
    };
    after: {
        addClass: (className: any) => Animation;
        removeClass: (className: any) => Animation;
    };
    play(done: any): any;
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
    onReady(fn: any, clear: any): Animation;
    onPlay(fn: any, clear: any): Animation;
    onFinish(fn: any, clear: any): Animation;
    clone(): any;
    dispose(removeElement: any): void;
    static create(element: any, name: any): any;
    static createTransition(enteringView: any, leavingView: any, opts?: {}): any;
    static register(name: any, AnimationClass: any): void;
}
