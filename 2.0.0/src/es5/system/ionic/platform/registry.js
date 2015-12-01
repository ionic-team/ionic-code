System.register('ionic/platform/registry', ['./platform', '../util/dom'], function (_export) {
    'use strict';

    var Platform, windowLoad;

    function isIOSDevice(p) {
        // shortcut function to be reused internally
        // checks navigator.platform to see if it's an actual iOS device
        // this does not use the user-agent string because it is often spoofed
        // an actual iPad will return true, a chrome dev tools iPad will return false
        return (/iphone|ipad|ipod/i.test(p.navigatorPlatform())
        );
    }
    return {
        setters: [function (_platform) {
            Platform = _platform.Platform;
        }, function (_utilDom) {
            windowLoad = _utilDom.windowLoad;
        }],
        execute: function () {
            Platform.register({
                name: 'core',
                settings: {
                    mode: 'ios',
                    keyboardHeight: 290
                }
            });
            Platform.setDefault('core');
            Platform.register({
                name: 'mobile'
            });
            Platform.register({
                name: 'phablet',
                isMatch: function isMatch(p) {
                    var smallest = Math.min(p.width(), p.height());
                    var largest = Math.max(p.width(), p.height());
                    return smallest > 390 && smallest < 520 && (largest > 620 && largest < 800);
                }
            });
            Platform.register({
                name: 'tablet',
                isMatch: function isMatch(p) {
                    var smallest = Math.min(p.width(), p.height());
                    var largest = Math.max(p.width(), p.height());
                    return smallest > 460 && smallest < 820 && (largest > 780 && largest < 1400);
                }
            });
            Platform.register({
                name: 'android',
                superset: 'mobile',
                subsets: ['phablet', 'tablet'],
                settings: {
                    activator: function activator(p) {
                        return p.version().major < 5 && p.navigatorPlatform().indexOf('linux') > -1 ? 'none' : 'ripple';
                    },
                    hoverCSS: false,
                    keyboardHeight: 300,
                    mode: 'md',
                    scrollAssist: true
                },
                isMatch: function isMatch(p) {
                    return p.isPlatform('android', 'android|silk');
                },
                versionParser: function versionParser(p) {
                    return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
                }
            });
            Platform.register({
                name: 'ios',
                superset: 'mobile',
                subsets: ['ipad', 'iphone'],
                settings: {
                    clickBlock: true,
                    hoverCSS: false,
                    keyboardHeight: 300,
                    mode: 'ios',
                    scrollAssist: isIOSDevice,
                    swipeBackEnabled: isIOSDevice,
                    swipeBackThreshold: 40,
                    tapPolyfill: isIOSDevice
                },
                isMatch: function isMatch(p) {
                    return p.isPlatform('ios', 'iphone|ipad|ipod');
                },
                versionParser: function versionParser(p) {
                    return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
                }
            });
            Platform.register({
                name: 'ipad',
                superset: 'tablet',
                settings: {
                    keyboardHeight: 500
                },
                isMatch: function isMatch(p) {
                    return p.isPlatform('ipad');
                }
            });
            Platform.register({
                name: 'iphone',
                subsets: ['phablet'],
                isMatch: function isMatch(p) {
                    return p.isPlatform('iphone');
                }
            });
            Platform.register({
                name: 'windowsphone',
                superset: 'mobile',
                subsets: ['phablet', 'tablet'],
                settings: {
                    mode: 'md'
                },
                isMatch: function isMatch(p) {
                    return p.isPlatform('windowsphone', 'windows phone');
                },
                versionParser: function versionParser(p) {
                    return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
                }
            });
            Platform.register({
                name: 'cordova',
                isEngine: true,
                methods: {
                    ready: function ready(resolve) {
                        function isReady() {
                            document.removeEventListener('deviceready', isReady);
                            resolve();
                        }
                        windowLoad(function () {
                            document.addEventListener('deviceready', isReady);
                        });
                    }
                },
                isMatch: function isMatch() {
                    return !!(window.cordova || window.PhoneGap || window.phonegap);
                }
            });
        }
    };
});