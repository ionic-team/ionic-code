import { List } from './list';
export declare class ListVirtualScroll {
    content: any;
    viewContainer: any;
    viewportHeight: any;
    virtualHeight: any;
    viewportScrollHeight: any;
    itemsPerScreen: any;
    list: List;
    itemHeight: number;
    shownItems: {};
    enteringItems: any[];
    leavingItems: any[];
    constructor(list: List);
    resize(): void;
    _handleVirtualScroll(event: any): void;
    cellAtIndex(index: any): void;
}
