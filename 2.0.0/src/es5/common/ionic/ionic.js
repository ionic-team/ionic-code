'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _configBootstrap = require('./config/bootstrap');

_defaults(exports, _interopExportWildcard(_configBootstrap, _defaults));

var _configConfig = require('./config/config');

_defaults(exports, _interopExportWildcard(_configConfig, _defaults));

var _configModes = require('./config/modes');

_defaults(exports, _interopExportWildcard(_configModes, _defaults));

var _configDecorators = require('./config/decorators');

_defaults(exports, _interopExportWildcard(_configDecorators, _defaults));

var _configDirectives = require('./config/directives');

_defaults(exports, _interopExportWildcard(_configDirectives, _defaults));

var _components = require('./components');

_defaults(exports, _interopExportWildcard(_components, _defaults));

var _platformPlatform = require('./platform/platform');

_defaults(exports, _interopExportWildcard(_platformPlatform, _defaults));

var _platformRegistry = require('./platform/registry');

_defaults(exports, _interopExportWildcard(_platformRegistry, _defaults));

var _platformStorage = require('./platform/storage');

_defaults(exports, _interopExportWildcard(_platformStorage, _defaults));

var _utilClickBlock = require('./util/click-block');

_defaults(exports, _interopExportWildcard(_utilClickBlock, _defaults));

var _utilEvents = require('./util/events');

_defaults(exports, _interopExportWildcard(_utilEvents, _defaults));

var _utilKeyboard = require('./util/keyboard');

_defaults(exports, _interopExportWildcard(_utilKeyboard, _defaults));

var _animationsAnimation = require('./animations/animation');

_defaults(exports, _interopExportWildcard(_animationsAnimation, _defaults));

var _animationsBuiltins = require('./animations/builtins');

_defaults(exports, _interopExportWildcard(_animationsBuiltins, _defaults));

var _animationsIosTransition = require('./animations/ios-transition');

_defaults(exports, _interopExportWildcard(_animationsIosTransition, _defaults));

var _animationsMdTransition = require('./animations/md-transition');

_defaults(exports, _interopExportWildcard(_animationsMdTransition, _defaults));

var _translationTranslate = require('./translation/translate');

_defaults(exports, _interopExportWildcard(_translationTranslate, _defaults));

var _translationTranslate_pipe = require('./translation/translate_pipe');

_defaults(exports, _interopExportWildcard(_translationTranslate_pipe, _defaults));