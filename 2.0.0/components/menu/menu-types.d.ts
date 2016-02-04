import { Animation } from '../../animations/animation';
/**
 * Menu Type
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 * @private
 */
export declare class MenuType {
    open: Animation;
    close: Animation;
    isOpening: boolean;
    seek: Animation;
    setOpen(shouldOpen: any): Promise<{}>;
    setProgressStart(isOpen: any): void;
    setProgess(value: any): void;
    setProgressEnd(shouldComplete: any): Promise<{}>;
    ngOnDestroy(): void;
}
