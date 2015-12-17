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
export declare function App(args?: {}): (cls: any) => any;
