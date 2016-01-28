import { DragGesture } from '../../gestures/drag-gesture';
import { List } from '../list/list';
export declare class ItemSlidingGesture extends DragGesture {
    list: List;
    listEle: HTMLElement;
    canDrag: boolean;
    data: {};
    openItems: number;
    onTap: any;
    onMouseOut: any;
    preventDrag: boolean;
    dragEnded: boolean;
    constructor(list: List, listEle: HTMLElement);
    onDragStart(ev: any): boolean;
    onDrag(ev: any): boolean;
    onDragEnd(ev: any): void;
    closeOpened(doNotCloseEle?: HTMLElement): boolean;
    open(itemContainerEle: any, openAmount: any, isFinal: any): void;
    getOpenAmount(itemContainerEle: any): any;
    get(itemContainerEle: any): any;
    set(itemContainerEle: any, key: any, value: any): void;
    unlisten(): void;
}
