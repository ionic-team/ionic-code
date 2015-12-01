'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.run = run;

var _ionicIonic = require('ionic/ionic');

function run() {
    it('should create a new Config instace when no confg passed in ionicProviders', function () {
        var providers = (0, _ionicIonic.ionicProviders)();
        var config = providers.find(function (provider) {
            return provider.useValue instanceof _ionicIonic.Config;
        }).useValue;
        expect(config.get('mode')).toEqual('ios');
    });
    it('should used passed in Config instance in ionicProviders', function () {
        var userConfig = new _ionicIonic.Config({
            mode: 'configInstance'
        });
        var providers = (0, _ionicIonic.ionicProviders)({ config: userConfig });
        var config = providers.find(function (provider) {
            return provider.useValue instanceof _ionicIonic.Config;
        }).useValue;
        expect(config.get('mode')).toEqual('configInstance');
    });
    it('should create new Config instance from config object in ionicProviders', function () {
        var providers = (0, _ionicIonic.ionicProviders)({ config: {
                mode: 'configObj'
            } });
        var config = providers.find(function (provider) {
            return provider.useValue instanceof _ionicIonic.Config;
        }).useValue;
        expect(config.get('mode')).toEqual('configObj');
    });
    it('should override mode settings', function () {
        var config = new _ionicIonic.Config({
            mode: 'md'
        });
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('md');
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should override mode settings from platforms setting', function () {
        var config = new _ionicIonic.Config({
            platforms: {
                ios: {
                    mode: 'md'
                }
            }
        });
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('md');
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should get boolean value from querystring', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform();
        platform.url('http://biff.com/?ionicanimate=true');
        config.setPlatform(platform);
        expect(config.get('animate')).toEqual(true);
        config = new _ionicIonic.Config();
        platform = new _ionicIonic.Platform();
        platform.url('http://biff.com/?ionicanimate=false');
        config.setPlatform(platform);
        expect(config.get('animate')).toEqual(false);
    });
    it('should get value from case insensitive querystring key', function () {
        var config = new _ionicIonic.Config({
            mode: 'a'
        });
        var platform = new _ionicIonic.Platform();
        platform.url('http://biff.com/?ionicConfigKey=b');
        config.setPlatform(platform);
        expect(config.get('configKey')).toEqual('b');
    });
    it('should get value from querystring', function () {
        var config = new _ionicIonic.Config({
            mode: 'modeA'
        });
        var platform = new _ionicIonic.Platform();
        platform.url('http://biff.com/?ionicmode=modeB');
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('modeB');
    });
    it('should override mode platform', function () {
        var config = new _ionicIonic.Config({
            mode: 'modeA',
            platforms: {
                mobile: {
                    mode: 'modeB'
                },
                ios: {
                    mode: 'modeC'
                }
            }
        });
        var platform = new _ionicIonic.Platform(['mobile']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('modeB');
    });
    it('should override mode', function () {
        var config = new _ionicIonic.Config({
            mode: 'modeA'
        });
        var platform = new _ionicIonic.Platform(['core']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('modeA');
    });
    it('should get user settings after user platform settings', function () {
        var config = new _ionicIonic.Config({
            hoverCSS: true
        });
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('hoverCSS')).toEqual(true);
    });
    it('should get ios mode for core platform', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['core']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('ios');
    });
    it('should get ios mode for ipad platform', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'ios', 'ipad', 'tablet']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('ios');
    });
    it('should get md mode for windowsphone platform', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'windowsphone']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('md');
    });
    it('should get md mode for android platform', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'android']);
        config.setPlatform(platform);
        expect(config.get('mode')).toEqual('md');
    });
    it('should override ios mode config with user platform setting', function () {
        var config = new _ionicIonic.Config({
            tabbarPlacement: 'hide',
            platforms: {
                ios: {
                    tabbarPlacement: 'top'
                }
            }
        });
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should override ios mode config with user setting', function () {
        var config = new _ionicIonic.Config({
            tabbarPlacement: 'top'
        });
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should get setting from md mode', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['android']);
        config.setPlatform(platform);
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should get setting from ios mode', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        expect(config.get('tabbarPlacement')).toEqual('bottom');
    });
    it('should set/get platform setting from set()', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        config.set('tabbarPlacement', 'bottom');
        config.set('ios', 'tabbarPlacement', 'top');
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should set/get setting from set()', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        config.set('tabbarPlacement', 'top');
        expect(config.get('tabbarPlacement')).toEqual('top');
    });
    it('should set ios platform settings from settings()', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        config.settings('ios', {
            key: 'iosValue'
        });
        expect(config.get('key')).toEqual('iosValue');
    });
    it('should set/get mobile setting even w/ higher priority ios', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'ios']);
        config.setPlatform(platform);
        config.settings({
            key: 'defaultValue',
            platforms: {
                mobile: {
                    key: 'mobileValue'
                }
            }
        });
        expect(config.get('key')).toEqual('mobileValue');
    });
    it('should set/get mobile setting even w/ higher priority ios', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'ios']);
        config.setPlatform(platform);
        config.settings({
            key: 'defaultValue',
            platforms: {
                mobile: {
                    key: 'mobileValue'
                }
            }
        });
        expect(config.get('key')).toEqual('mobileValue');
    });
    it('should set/get android setting w/ higher priority than mobile', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['mobile', 'android']);
        config.setPlatform(platform);
        config.settings({
            key: 'defaultValue',
            platforms: {
                mobile: {
                    key: 'mobileValue'
                },
                android: {
                    key: 'androidValue'
                }
            }
        });
        expect(config.get('key')).toEqual('androidValue');
    });
    it('should set/get ios setting w/ platforms set', function () {
        var config = new _ionicIonic.Config();
        var platform = new _ionicIonic.Platform(['ios']);
        config.setPlatform(platform);
        config.settings({
            key: 'defaultValue',
            platforms: {
                ios: {
                    key: 'iosValue'
                },
                android: {
                    key: 'androidValue'
                }
            }
        });
        expect(config.get('key')).toEqual('iosValue');
    });
    it('should set/get default setting w/ platforms set, but no platform match', function () {
        var config = new _ionicIonic.Config();
        config.settings({
            key: 'defaultValue',
            platforms: {
                ios: {
                    key: 'iosValue'
                },
                android: {
                    key: 'androidValue'
                }
            }
        });
        expect(config.get('key')).toEqual('defaultValue');
    });
    it('should set setting object', function () {
        var config = new _ionicIonic.Config();
        config.settings({
            name: 'Doc Brown',
            occupation: 'Weather Man'
        });
        expect(config.get('name')).toEqual('Doc Brown');
        expect(config.get('name')).toEqual('Doc Brown');
        expect(config.get('occupation')).toEqual('Weather Man');
        expect(config.get('occupation')).toEqual('Weather Man');
    });
    it('should get null setting', function () {
        var config = new _ionicIonic.Config();
        expect(config.get('name')).toEqual(null);
        expect(config.get('name')).toEqual(null);
        expect(config.get('occupation')).toEqual(null);
        expect(config.get('occupation')).toEqual(null);
    });
    it('should set/get single setting', function () {
        var config = new _ionicIonic.Config();
        config.set('name', 'Doc Brown');
        config.set('occupation', 'Weather Man');
        expect(config.get('name')).toEqual('Doc Brown');
        expect(config.get('name')).toEqual('Doc Brown');
        expect(config.get('occupation')).toEqual('Weather Man');
        expect(config.get('occupation')).toEqual('Weather Man');
    });
    it('should init w/ given config settings', function () {
        var config = new _ionicIonic.Config({
            name: 'Doc Brown',
            occupation: 'Weather Man'
        });
        expect(config.get('name')).toEqual('Doc Brown');
        expect(config.get('occupation')).toEqual('Weather Man');
    });
    it('should get settings object', function () {
        var config = new _ionicIonic.Config({
            name: 'Doc Brown',
            occupation: 'Weather Man'
        });
        expect(config.settings()).toEqual({
            name: 'Doc Brown',
            occupation: 'Weather Man'
        });
    });
    it('should create default config w/ bad settings value', function () {
        var config = new _ionicIonic.Config(null);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(undefined);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config();
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config([1, 2, 3]);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config('im bad, you know it');
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(8675309);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(true);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(false);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(1);
        expect(config.settings()).toEqual({});
        config = new _ionicIonic.Config(function () {});
        expect(config.settings()).toEqual({});
    });
}