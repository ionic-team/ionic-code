import { Provider } from 'angular2/core';
import { IonicApp } from '../components/app/app';
import { Form } from '../util/form';
import { Keyboard } from '../util/keyboard';
import { Translate } from '../translation/translate';
import { TapClick } from '../components/tap-click/tap-click';
/**
 * @private
 */
export declare function ionicProviders(args?: any): (typeof IonicApp | Provider | typeof TapClick | typeof Form | typeof Keyboard | typeof Translate | any[])[];
