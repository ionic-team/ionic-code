'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Page = Page;
exports.ConfigComponent = ConfigComponent;
exports.App = App;

var _angular2Angular2 = require('angular2/angular2');

var _componentsTapClickTapClick = require('../components/tap-click/tap-click');

var _utilUtil = require('../util/util');

var _bootstrap = require('./bootstrap');

var _directives = require('./directives');

/**
 * _For more information on how pages are created, see the [NavController API
 * reference](../../components/nav/NavController/#creating_pages)._
 *
 * The Page decorator indicates that the decorated class is an Ionic
 * navigation component, meaning it can be navigated to using a NavController.
 *
 * Pages have all [IONIC_DIRECTIVES](../IONIC_DIRECTIVES/), which include
 * all Ionic components and directives, as well as Angular's [CORE_DIRECTIVES](https://angular.io/docs/js/latest/api/core/CORE_DIRECTIVES-const.html)
 * and [FORM_DIRECTIVES](https://angular.io/docs/js/latest/api/core/FORM_DIRECTIVES-const.html),
 * already provided to them, so you only need to supply custom components and
 * directives to your pages:
 *
 * ```ts
 * @Page({
 *   template: `
 *     <ion-checkbox my-custom-dir>
 *     </ion-checkbox>`
 *   directives: [MyCustomDirective]
 * })
 * class MyPage {}
 * ```
 * Here [Checkbox](../../../components/checkbox/Checkbox/) will load because
 * it is in IONIC_DIRECTIVES, so there is no need to add it to the `directives`
 * array.
 *
 * For custom components that use Ionic components, you will need to include
 * IONIC_DIRECTIVES in the `directives` array:
 *
 * ```ts
 * import {IONIC_DIRECTIVES} from 'ionic/ionic';
 * @Component({
 *   selector: 'my-component'
 *   template: `<div class="my-style">
 *   						  <ion-checkbox></ion-checkbox>
 *   						</div>`,
 *   directives: [IONIC_DIRECTIVES]
 * })
 * class MyCustomCheckbox {}
 *```
 * Alternatively, you could:
 * ```ts
 * import {Checkbox, Icon} from 'ionic/ionic'
 * ```
 * along with any other components and add them individually:
 * ```
 * @Component({
 *   ...
 *   directives: [Checkbox, Icon]
 * })
 * ```
 * However, using IONIC_DIRECTIVES will always *Just Work* with no
 * performance overhead, so there is really no reason to not always use it.
 *
 * Pages have their content automatically wrapped in `<ion-view>`, so although
 * you may see these tags if you inspect your markup, you don't need to include
 * them in your templates.
 */

function Page() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (cls) {
        config.selector = 'ion-page';
        config.directives = config.directives ? config.directives.concat(_directives.IONIC_DIRECTIVES) : _directives.IONIC_DIRECTIVES;
        config.host = config.host || {};
        config.host['[hidden]'] = '_hidden';
        config.host['[class.tab-subpage]'] = '_tabSubPage';
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new _angular2Angular2.Component(config));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}

/**
 * @private
 */

function ConfigComponent(config) {
    return function (cls) {
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new _angular2Angular2.Component(appendConfig(cls, config)));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}

/**
 * @private
 */
function appendConfig(cls, config) {
    config.host = config.host || {};
    cls.defaultInputs = config.defaultInputs || {};
    config.inputs = config.inputs || [];
    for (var prop in cls.defaultInputs) {
        // add the property to the component "inputs"
        config.inputs.push(prop);
        // set the component "hostProperties", so the instance's
        // input value will be used to set the element's attribute
        config.host['[attr.' + (0, _utilUtil.pascalCaseToDashCase)(prop) + ']'] = prop;
    }
    cls.delegates = config.delegates;
    return config;
}
/**
* @ngdoc service
* @name App
* @module ionic
* @param {object} [config] - the app's [../Config](Config) object
* @param {string} [template] - the template to use for the app root
* @param {string} [templateUrl] - a relative URL pointing to the template to use for the app root
* @description
* App is an Ionic decorator that bootstraps an application. It can be passed a number of arguments, that act as global config variables for the app.
*/

function App() {
    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return function (cls) {
        // get current annotations
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        args.selector = 'ion-app';
        // auto add Ionic directives
        args.directives = args.directives ? args.directives.concat(_directives.IONIC_DIRECTIVES) : _directives.IONIC_DIRECTIVES;
        // if no template was provided, default so it has a root <ion-nav>
        if (!args.templateUrl && !args.template) {
            args.template = '<ion-nav></ion-nav>';
        }
        // create @Component
        annotations.push(new _angular2Angular2.Component(args));
        // redefine with added annotations
        Reflect.defineMetadata('annotations', annotations, cls);
        (0, _angular2Angular2.bootstrap)(cls, (0, _bootstrap.ionicProviders)(args)).then(function (appRef) {
            appRef.injector.get(_componentsTapClickTapClick.TapClick);
        });
        return cls;
    };
}