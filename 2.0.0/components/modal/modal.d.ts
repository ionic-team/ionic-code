import { ViewController } from '../nav/view-controller';
/**
 * @name Modal
 * @description
 * A Modal is a content pane that goes over the user's current page.
 * Usually it is used for making a choice or editing an item. A modal uses the
 * `NavController` to
 * {@link /docs/v2/api/components/nav/NavController/#present present}
 * itself in the root nav stack. It is added to the stack similar to how
 * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
 * works.
 *
 * When a modal (or any other overlay such as an alert or actionsheet) is
 * "presented" to a nav controller, the overlay is added to the app's root nav.
 * After the modal has been presented, from within the component instance The
 * modal can later be closed or "dismissed" by using the ViewController's
 * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
 * on the root nav controller.
 *
 * A modal can also emit data, which is useful when it is used to add or edit
 * data. For example, a profile page could slide up in a modal, and on submit,
 * the submit button could pass the updated profile data, then dismiss the
 * modal.
 *
 * @usage
 * ```ts
 * import {Modal, NavController} from 'ionic/ionic';
 *
 * @Page(...)
 * class HomePage {
 *
 *  constructor(nav: NavController) {
 *    this.nav = nav;
 *  }
 *
 *  presentContactModal() {
 *    let contactModal = Modal.create(ContactUs);
 *    this.nav.present(contactModal);
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = Modal.create(Profile, { userId: 8675309 });
 *    profileModal.onDismiss(data => {
 *      console.log(data);
 *    });
 *    this.nav.present(profileModal);
 *  }
 *
 * }
 *
 * @Page(...)
 * class Profile {
 *
 *  constructor(viewCtrl: ViewController) {
 *    this.viewCtrl = viewCtrl;
 *  }
 *
 *  dismiss() {
 *    let data = { 'foo': 'bar' };
 *    this.viewCtrl.dismiss(data);
 *  }
 *
 * }
 * ```
 * @demo /docs/v2/demos/modal/
 * @see {@link /docs/v2/components#modals Modal Component Docs}
 */
export declare class Modal extends ViewController {
    constructor(componentType: any, data?: {});
    /**
    * @private
    */
    getTransitionName(direction: any): any;
    /**
     * @param {Any} componentType Modal
     * @param {Object} data Modal options
     */
    static create(componentType: any, data?: {}): Modal;
}
