import { ViewController } from '../nav/view-controller';
/**
 * @name Alert
 * @description
 * An Alert is a dialog that presents users with either information, or used
 * to receive information from the user using inputs. An alert appears on top
 * of the app's content, and must be manually dismissed by the user before
 * they can resume interaction with the app.
 *
 * An alert is created from an array of `buttons` and optionally an array of
 * `inputs`. Each button includes properties for its `text`, and optionally a
 * `handler`. If a handler returns `false` then the alert will not be dismissed.
 * An alert can also optionally have a `title`, `subTitle` and `message`.
 *
 * All buttons will show up in the order they have been added to the `buttons`
 * array, from left to right. Note: The right most button (the last one in the
 * array) is the main button.
 *
 * Alerts can also include inputs whos data can be passed back to the app.
 * Inputs can be used to prompt users for information.
 *
 * Its shorthand is to add all the alert's options from within the
 * `Alert.create(opts)` first argument. Otherwise the alert's
 * instance has methods to add options, such as `setTitle()` or `addButton()`.
 *
 * @usage
 * ```ts
 * constructor(nav: NavController) {
 *   this.nav = nav;
 * }
 *
 * presentAlert() {
 *   let alert = Alert.create({
 *     title: 'Low battery',
 *     subTitle: '10% of battery remaining',
 *     buttons: ['Dismiss']
 *   });
 *   this.nav.present(alert);
 * }
 *
 * presentConfirm() {
 *   let alert = Alert.create({
 *     title: 'Confirm purchase',
 *     message: 'Do you want to buy this book?',
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         handler: () => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Buy',
 *         handler: () => {
 *           console.log('Buy clicked');
 *         }
 *       }
 *     ]
 *   });
 *   this.nav.present(alert);
 * }
 *
 * presentPrompt() {
 *   let alert = Alert.create({
 *     title: 'Login',
 *     inputs: [
 *       {
 *         name: 'username',
 *         placeholder: 'Username'
 *       },
 *       {
 *         name: 'password',
 *         placeholder: 'Password',
 *         type: 'password'
 *       }
 *     ],
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         handler: data => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Login',
 *         handler: data => {
 *           if (User.isValid(data.username, data.password)) {
 *             // logged in!
 *           } else {
 *             // invalid login
 *             return false;
 *           }
 *         }
 *       }
 *     ]
 *   });
 *   this.nav.present(alert);
 * }
 * ```
 *
 */
export declare class Alert extends ViewController {
    constructor(opts?: {
        title?: string;
        subTitle?: string;
        message?: string;
        cssClass?: string;
        inputs?: Array<{
            type?: string;
            name?: string;
            placeholder?: string;
            value?: string;
            label?: string;
            checked?: boolean;
            id?: string;
        }>;
        buttons?: Array<any>;
    });
    /**
    * @private
    */
    getTransitionName(direction: any): any;
    /**
     * @param {string} title Alert title
     */
    setTitle(title: string): void;
    /**
     * @param {string} subTitle Alert subtitle
     */
    setSubTitle(subTitle: string): void;
    /**
     * @private
     */
    private setBody(message);
    /**
     * @param {string} message  Alert message content
     */
    setMessage(message: string): void;
    /**
     * @param {object} input Alert input
     */
    addInput(input: {
        type?: string;
        name?: string;
        placeholder?: string;
        value?: string;
        label?: string;
        checked?: boolean;
        id?: string;
    }): void;
    /**
     * @param {object} button Alert button
     */
    addButton(button: any): void;
    /**
     * @param {string} cssClass CSS class name to add to the alert's outer wrapper
     */
    setCssClass(cssClass: string): void;
    /**
     * @param {Object} opts Alert options
     */
    static create(opts?: {
        title?: string;
        subTitle?: string;
        message?: string;
        cssClass?: string;
        inputs?: Array<{
            type?: string;
            name?: string;
            placeholder?: string;
            value?: string;
            label?: string;
            checked?: boolean;
            id?: string;
        }>;
        buttons?: Array<any>;
    }): Alert;
}
