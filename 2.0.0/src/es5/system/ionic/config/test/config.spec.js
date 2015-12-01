System.register('ionic/config/config.spec', ['ionic/ionic'], function (_export) {
    'use strict';

    var Config, Platform, ionicProviders;

    _export('run', run);

    function run() {
        it('should create a new Config instace when no confg passed in ionicProviders', function () {
            var providers = ionicProviders();
            var config = providers.find(function (provider) {
                return provider.useValue instanceof Config;
            }).useValue;
            expect(config.get('mode')).toEqual('ios');
        });
        it('should used passed in Config instance in ionicProviders', function () {
            var userConfig = new Config({
                mode: 'configInstance'
            });
            var providers = ionicProviders({ config: userConfig });
            var config = providers.find(function (provider) {
                return provider.useValue instanceof Config;
            }).useValue;
            expect(config.get('mode')).toEqual('configInstance');
        });
        it('should create new Config instance from config object in ionicProviders', function () {
            var providers = ionicProviders({ config: {
                    mode: 'configObj'
                } });
            var config = providers.find(function (provider) {
                return provider.useValue instanceof Config;
            }).useValue;
            expect(config.get('mode')).toEqual('configObj');
        });
        it('should override mode settings', function () {
            var config = new Config({
                mode: 'md'
            });
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('md');
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should override mode settings from platforms setting', function () {
            var config = new Config({
                platforms: {
                    ios: {
                        mode: 'md'
                    }
                }
            });
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('md');
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should get boolean value from querystring', function () {
            var config = new Config();
            var platform = new Platform();
            platform.url('http://biff.com/?ionicanimate=true');
            config.setPlatform(platform);
            expect(config.get('animate')).toEqual(true);
            config = new Config();
            platform = new Platform();
            platform.url('http://biff.com/?ionicanimate=false');
            config.setPlatform(platform);
            expect(config.get('animate')).toEqual(false);
        });
        it('should get value from case insensitive querystring key', function () {
            var config = new Config({
                mode: 'a'
            });
            var platform = new Platform();
            platform.url('http://biff.com/?ionicConfigKey=b');
            config.setPlatform(platform);
            expect(config.get('configKey')).toEqual('b');
        });
        it('should get value from querystring', function () {
            var config = new Config({
                mode: 'modeA'
            });
            var platform = new Platform();
            platform.url('http://biff.com/?ionicmode=modeB');
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('modeB');
        });
        it('should override mode platform', function () {
            var config = new Config({
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
            var platform = new Platform(['mobile']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('modeB');
        });
        it('should override mode', function () {
            var config = new Config({
                mode: 'modeA'
            });
            var platform = new Platform(['core']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('modeA');
        });
        it('should get user settings after user platform settings', function () {
            var config = new Config({
                hoverCSS: true
            });
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('hoverCSS')).toEqual(true);
        });
        it('should get ios mode for core platform', function () {
            var config = new Config();
            var platform = new Platform(['core']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('ios');
        });
        it('should get ios mode for ipad platform', function () {
            var config = new Config();
            var platform = new Platform(['mobile', 'ios', 'ipad', 'tablet']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('ios');
        });
        it('should get md mode for windowsphone platform', function () {
            var config = new Config();
            var platform = new Platform(['mobile', 'windowsphone']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('md');
        });
        it('should get md mode for android platform', function () {
            var config = new Config();
            var platform = new Platform(['mobile', 'android']);
            config.setPlatform(platform);
            expect(config.get('mode')).toEqual('md');
        });
        it('should override ios mode config with user platform setting', function () {
            var config = new Config({
                tabbarPlacement: 'hide',
                platforms: {
                    ios: {
                        tabbarPlacement: 'top'
                    }
                }
            });
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should override ios mode config with user setting', function () {
            var config = new Config({
                tabbarPlacement: 'top'
            });
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should get setting from md mode', function () {
            var config = new Config();
            var platform = new Platform(['android']);
            config.setPlatform(platform);
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should get setting from ios mode', function () {
            var config = new Config();
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            expect(config.get('tabbarPlacement')).toEqual('bottom');
        });
        it('should set/get platform setting from set()', function () {
            var config = new Config();
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            config.set('tabbarPlacement', 'bottom');
            config.set('ios', 'tabbarPlacement', 'top');
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should set/get setting from set()', function () {
            var config = new Config();
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            config.set('tabbarPlacement', 'top');
            expect(config.get('tabbarPlacement')).toEqual('top');
        });
        it('should set ios platform settings from settings()', function () {
            var config = new Config();
            var platform = new Platform(['ios']);
            config.setPlatform(platform);
            config.settings('ios', {
                key: 'iosValue'
            });
            expect(config.get('key')).toEqual('iosValue');
        });
        it('should set/get mobile setting even w/ higher priority ios', function () {
            var config = new Config();
            var platform = new Platform(['mobile', 'ios']);
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
            var config = new Config();
            var platform = new Platform(['mobile', 'ios']);
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
            var config = new Config();
            var platform = new Platform(['mobile', 'android']);
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
            var config = new Config();
            var platform = new Platform(['ios']);
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
            var config = new Config();
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
            var config = new Config();
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
            var config = new Config();
            expect(config.get('name')).toEqual(null);
            expect(config.get('name')).toEqual(null);
            expect(config.get('occupation')).toEqual(null);
            expect(config.get('occupation')).toEqual(null);
        });
        it('should set/get single setting', function () {
            var config = new Config();
            config.set('name', 'Doc Brown');
            config.set('occupation', 'Weather Man');
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('occupation')).toEqual('Weather Man');
            expect(config.get('occupation')).toEqual('Weather Man');
        });
        it('should init w/ given config settings', function () {
            var config = new Config({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            });
            expect(config.get('name')).toEqual('Doc Brown');
            expect(config.get('occupation')).toEqual('Weather Man');
        });
        it('should get settings object', function () {
            var config = new Config({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            });
            expect(config.settings()).toEqual({
                name: 'Doc Brown',
                occupation: 'Weather Man'
            });
        });
        it('should create default config w/ bad settings value', function () {
            var config = new Config(null);
            expect(config.settings()).toEqual({});
            config = new Config(undefined);
            expect(config.settings()).toEqual({});
            config = new Config();
            expect(config.settings()).toEqual({});
            config = new Config([1, 2, 3]);
            expect(config.settings()).toEqual({});
            config = new Config('im bad, you know it');
            expect(config.settings()).toEqual({});
            config = new Config(8675309);
            expect(config.settings()).toEqual({});
            config = new Config(true);
            expect(config.settings()).toEqual({});
            config = new Config(false);
            expect(config.settings()).toEqual({});
            config = new Config(1);
            expect(config.settings()).toEqual({});
            config = new Config(function () {});
            expect(config.settings()).toEqual({});
        });
    }

    return {
        setters: [function (_ionicIonic) {
            Config = _ionicIonic.Config;
            Platform = _ionicIonic.Platform;
            ionicProviders = _ionicIonic.ionicProviders;
        }],
        execute: function () {}
    };
});