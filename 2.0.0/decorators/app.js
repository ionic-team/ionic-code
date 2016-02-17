var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var tap_click_1 = require('../components/tap-click/tap-click');
var bootstrap_1 = require('../config/bootstrap');
var directives_1 = require('../config/directives');
var _reflect = Reflect;
/**
* @name App
* @description
* App is an Ionic decorator that bootstraps an application. It can be passed a number of arguments, that act as global config variables for the app.
* App can accept a `template` property that has an inline template or a `templateUrl` property that points to an external html template.
*
* @usage
* ```ts
* import {App} from 'ionic/ionic';
*
* @App({
*   templateUrl: 'app/app.html'
* })
*
* export class MyApp{
*   // Anything we would want to do at the root of our app
* }
* ```
*
* @param {Object} [config] - the app's [../Config](Config) object
* @param {String} [template] - the template to use for the app root
* @param {String} [templateUrl] - a relative URL pointing to the template to use for the app root
*
*/
function App(args) {
    if (args === void 0) { args = {}; }
    return function (cls) {
        // get current annotations
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        args.selector = 'ion-app';
        // auto add Ionic directives
        args.directives = args.directives ? args.directives.concat(directives_1.IONIC_DIRECTIVES) : directives_1.IONIC_DIRECTIVES;
        // if no template was provided, default so it has a root <ion-nav>
        if (!args.templateUrl && !args.template) {
            args.template = '<ion-nav></ion-nav>';
        }
        // create @Component
        annotations.push(new core_1.Component(args));
        // redefine with added annotations
        _reflect.defineMetadata('annotations', annotations, cls);
        // define array of bootstrap providers
        var providers = bootstrap_1.ionicProviders(args).concat(args.providers || []);
        browser_1.bootstrap(cls, providers).then(function (appRef) {
            appRef.injector.get(tap_click_1.TapClick);
        });
        return cls;
    };
}
exports.App = App;
