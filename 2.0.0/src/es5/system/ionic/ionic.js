System.register('ionic/ionic', ['./config/bootstrap', './config/config', './config/modes', './config/decorators', './components', './platform/platform', './platform/registry', './platform/plugins', './platform/storage', './util/click-block', './util/events', './animations/animation', './animations/builtins', './transitions/transition', './transitions/ios-transition', './transitions/md-transition', './translation/translate', './translation/translate_pipe'], function (_export) {
  'use strict';

  return {
    setters: [function (_configBootstrap) {
      for (var _key in _configBootstrap) {
        if (_key !== 'default') _export(_key, _configBootstrap[_key]);
      }
    }, function (_configConfig) {
      for (var _key2 in _configConfig) {
        if (_key2 !== 'default') _export(_key2, _configConfig[_key2]);
      }
    }, function (_configModes) {
      for (var _key3 in _configModes) {
        if (_key3 !== 'default') _export(_key3, _configModes[_key3]);
      }
    }, function (_configDecorators) {
      for (var _key4 in _configDecorators) {
        if (_key4 !== 'default') _export(_key4, _configDecorators[_key4]);
      }
    }, function (_components) {
      for (var _key5 in _components) {
        if (_key5 !== 'default') _export(_key5, _components[_key5]);
      }
    }, function (_platformPlatform) {
      for (var _key6 in _platformPlatform) {
        if (_key6 !== 'default') _export(_key6, _platformPlatform[_key6]);
      }
    }, function (_platformRegistry) {
      for (var _key7 in _platformRegistry) {
        if (_key7 !== 'default') _export(_key7, _platformRegistry[_key7]);
      }
    }, function (_platformPlugins) {
      for (var _key8 in _platformPlugins) {
        if (_key8 !== 'default') _export(_key8, _platformPlugins[_key8]);
      }

      for (var _key17 in _platformPlugins) {
        if (_key17 !== 'default') _export(_key17, _platformPlugins[_key17]);
      }
    }, function (_platformStorage) {
      for (var _key9 in _platformStorage) {
        if (_key9 !== 'default') _export(_key9, _platformStorage[_key9]);
      }
    }, function (_utilClickBlock) {
      for (var _key10 in _utilClickBlock) {
        if (_key10 !== 'default') _export(_key10, _utilClickBlock[_key10]);
      }
    }, function (_utilEvents) {
      for (var _key11 in _utilEvents) {
        if (_key11 !== 'default') _export(_key11, _utilEvents[_key11]);
      }
    }, function (_animationsAnimation) {
      for (var _key12 in _animationsAnimation) {
        if (_key12 !== 'default') _export(_key12, _animationsAnimation[_key12]);
      }
    }, function (_animationsBuiltins) {
      for (var _key13 in _animationsBuiltins) {
        if (_key13 !== 'default') _export(_key13, _animationsBuiltins[_key13]);
      }
    }, function (_transitionsTransition) {
      for (var _key14 in _transitionsTransition) {
        if (_key14 !== 'default') _export(_key14, _transitionsTransition[_key14]);
      }
    }, function (_transitionsIosTransition) {
      for (var _key15 in _transitionsIosTransition) {
        if (_key15 !== 'default') _export(_key15, _transitionsIosTransition[_key15]);
      }
    }, function (_transitionsMdTransition) {
      for (var _key16 in _transitionsMdTransition) {
        if (_key16 !== 'default') _export(_key16, _transitionsMdTransition[_key16]);
      }
    }, function (_translationTranslate) {
      for (var _key18 in _translationTranslate) {
        if (_key18 !== 'default') _export(_key18, _translationTranslate[_key18]);
      }
    }, function (_translationTranslate_pipe) {
      for (var _key19 in _translationTranslate_pipe) {
        if (_key19 !== 'default') _export(_key19, _translationTranslate_pipe[_key19]);
      }
    }],
    execute: function () {}
  };
});