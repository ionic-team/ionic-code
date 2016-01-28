import { ElementRef, EventEmitter } from 'angular2/core';
import { Tab } from './tab';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * @private
 */
export declare class TabButton extends Ion {
    private disHover;
    private hasTitle;
    private hasIcon;
    private hasTitleOnly;
    private hasIconOnly;
    private hasBadge;
    tab: Tab;
    select: EventEmitter<Tab>;
    constructor(config: Config, elementRef: ElementRef);
    ngOnInit(): void;
    private onClick();
}
