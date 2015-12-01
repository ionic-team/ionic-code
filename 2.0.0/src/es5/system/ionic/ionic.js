System.register('ionic/ionic', ['./config/bootstrap', './config/config', './config/modes', './config/decorators', './config/directives', './components', './platform/platform', './platform/registry', './platform/storage', './util/click-block', './util/events', './util/keyboard', './animations/animation', './animations/builtins', './animations/ios-transition', './animations/md-transition', './translation/translate', './translation/translate_pipe'], function (_export) {
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
    }, function (_configDirectives) {
      for (var _key5 in _configDirectives) {
        if (_key5 !== 'default') _export(_key5, _configDirectives[_key5]);
      }
    }, function (_components) {
      for (var _key6 in _components) {
        if (_key6 !== 'default') _export(_key6, _components[_key6]);
      }
    }, function (_platformPlatform) {
      for (var _key7 in _platformPlatform) {
        if (_key7 !== 'default') _export(_key7, _platformPlatform[_key7]);
      }
    }, function (_platformRegistry) {
      for (var _key8 in _platformRegistry) {
        if (_key8 !== 'default') _export(_key8, _platformRegistry[_key8]);
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
    }, function (_utilKeyboard) {
      for (var _key12 in _utilKeyboard) {
        if (_key12 !== 'default') _export(_key12, _utilKeyboard[_key12]);
      }
    }, function (_animationsAnimation) {
      for (var _key13 in _animationsAnimation) {
        if (_key13 !== 'default') _export(_key13, _animationsAnimation[_key13]);
      }
    }, function (_animationsBuiltins) {
      for (var _key14 in _animationsBuiltins) {
        if (_key14 !== 'default') _export(_key14, _animationsBuiltins[_key14]);
      }
    }, function (_animationsIosTransition) {
      for (var _key15 in _animationsIosTransition) {
        if (_key15 !== 'default') _export(_key15, _animationsIosTransition[_key15]);
      }
    }, function (_animationsMdTransition) {
      for (var _key16 in _animationsMdTransition) {
        if (_key16 !== 'default') _export(_key16, _animationsMdTransition[_key16]);
      }
    }, function (_translationTranslate) {
      for (var _key17 in _translationTranslate) {
        if (_key17 !== 'default') _export(_key17, _translationTranslate[_key17]);
      }
    }, function (_translationTranslate_pipe) {
      for (var _key18 in _translationTranslate_pipe) {
        if (_key18 !== 'default') _export(_key18, _translationTranslate_pipe[_key18]);
      }
    }],
    execute: function () {}
  };
});