System.register('ionic/config/decorators', ['angular2/angular2', 'ionic/util', './bootstrap', './directives'], function (_export) {
    /**
     * @private
     */
    'use strict';

    var Component, View, bootstrap, util, ionicProviders, IONIC_DIRECTIVES, PageImpl;

    var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    /**
     * TODO
     */

    _export('Page', Page);

    _export('ConfigComponent', ConfigComponent);

    _export('makeComponent', makeComponent);

    _export('App', App);

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    /**
     * _For more information on how pages are created, see the [NavController API
     * reference](../../Nav/NavController/#creating_pages)._
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

    function Page(args) {
        return function (cls) {
            var annotations = Reflect.getMetadata('annotations', cls) || [];
            annotations.push(new PageImpl(args));
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        };
    }

    function ConfigComponent(config) {
        return function (cls) {
            return makeComponent(cls, appendConfig(cls, config));
        };
    }

    function makeComponent(cls, config) {
        var annotations = Reflect.getMetadata('annotations', cls) || [];
        annotations.push(new Component(config));
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    }

    function appendConfig(cls, config) {
        config.host = config.host || {};
        cls.defaultInputs = config.defaultInputs || {};
        config.inputs = config.inputs || [];
        for (var prop in cls.defaultInputs) {
            // add the property to the component "inputs"
            config.inputs.push(prop);
            // set the component "hostProperties", so the instance's
            // input value will be used to set the element's attribute
            config.host['[attr.' + util.pascalCaseToDashCase(prop) + ']'] = prop;
        }
        cls.delegates = config.delegates;
        return config;
    }
    /**
     * TODO
     */

    function App() {
        var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return function (cls) {
            // get current annotations
            var annotations = Reflect.getMetadata('annotations', cls) || [];
            // default to select <ion-app>
            args.selector = args.selector || 'ion-app';
            // auto add Ionic directives
            args.directives = args.directives ? args.directives.concat(IONIC_DIRECTIVES) : IONIC_DIRECTIVES;
            // if no template was provided, default so it has a root <ion-nav>
            if (!args.templateUrl && !args.template) {
                args.template = '<ion-nav></ion-nav>';
            }
            // create @Component
            annotations.push(new Component(args));
            // redefine with added annotations
            Reflect.defineMetadata('annotations', annotations, cls);
            bootstrap(cls, ionicProviders(args.config));
            return cls;
        };
    }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            View = _angular2Angular2.View;
            bootstrap = _angular2Angular2.bootstrap;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }, function (_bootstrap) {
            ionicProviders = _bootstrap.ionicProviders;
        }, function (_directives) {
            IONIC_DIRECTIVES = _directives.IONIC_DIRECTIVES;
        }],
        execute: function () {
            PageImpl = (function (_View) {
                _inherits(PageImpl, _View);

                function PageImpl() {
                    var args = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                    _classCallCheck(this, PageImpl);

                    args.directives = (args.directives || []).concat(IONIC_DIRECTIVES);
                    _get(Object.getPrototypeOf(PageImpl.prototype), 'constructor', this).call(this, args);
                }

                return PageImpl;
            })(View);
        }
    };
});