import { ViewController } from '../nav/view-controller';
/**
 * @name ActionSheet
 * @description
 * An Action Sheet is a dialog that lets the user choose from a set of
 * options. It appears on top of the app's content, and must be manually
 * dismissed by the user before they can resume interaction with the app.
 * Dangerous (destructive) options are made obvious. There are easy
 * ways to cancel out of the action sheet, such as tapping the backdrop or
 * hitting the escape key on desktop.
 *
 * An action sheet is created from an array of `buttons`, with each button
 * including properties for its `text`, and optionally a `style` and `handler`.
 * If a handler returns `false` then the action sheet will not be dismissed. An
 * action sheet can also optionally have a `title` and a `subTitle`.
 *
 * A button's `style` property can either be `destructive` or `cancel`. Buttons
 * without a style property will have a default style for its platform. Buttons
 * with the `cancel` style will always load as the bottom button, no matter where
 * it shows up in the array. All other buttons will show up in the order they
 * have been added to the `buttons` array. Note: We recommend that `destructive`
 * buttons show be the first button in the array, making it the button on top.
 *
 * Its shorthand is to add all the action sheet's options from within the
 * `ActionSheet.create(opts)` first argument. Otherwise the action sheet's
 * instance has methods to add options, such as `setTitle()` or `addButton()`.
 *
 * @usage
 * ```ts
 * constructor(nav: NavController) {
 *   this.nav = nav;
 * }
 *
 * presentActionSheet() {
 *   let actionSheet = ActionSheet.create({
 *     title: 'Modify your album',
 *     buttons: [
 *       {
 *         text: 'Destructive',
 *         style: 'destructive',
 *         handler: () => {
 *           console.log('Destructive clicked');
 *         }
 *       },
 *       {
 *         text: 'Archive',
 *         handler: () => {
 *           console.log('Archive clicked');
 *         }
 *       },
 *       {
 *         text: 'Cancel',
 *         style: 'cancel',
 *         handler: () => {
 *           console.log('Cancel clicked');
 *         }
 *       }
 *     ]
 *   });
 *
 *   this.nav.present(actionSheet);
 * }
 * ```
 *
 * @demo /docs/v2/demos/action-sheet/
 * @see {@link /docs/v2/components#action-sheets ActionSheet Component Docs}
 */
export declare class ActionSheet extends ViewController {
    constructor(opts?: {
        title?: string;
        subTitle?: string;
        cssClass?: string;
        buttons?: Array<any>;
    });
    /**
    * @private
    */
    getTransitionName(direction: any): any;
    /**
     * @param {string} title Action sheet title
     */
    setTitle(title: string): void;
    /**
     * @param {string} subTitle Action sheet subtitle
     */
    setSubTitle(subTitle: string): void;
    /**
     * @param {object} button Action sheet button
     */
    addButton(button: any): void;
    /**
     * @param {object} opts Action sheet options
     */
    static create(opts?: {
        title?: string;
        subTitle?: string;
        cssClass?: string;
        buttons?: Array<any>;
    }): ActionSheet;
}
