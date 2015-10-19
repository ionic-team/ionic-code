'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _storageStorage = require('./storage/storage');

_defaults(exports, _interopExportWildcard(_storageStorage, _defaults));

var _storageLocalStorage = require('./storage/local-storage');

_defaults(exports, _interopExportWildcard(_storageLocalStorage, _defaults));

var _storageSql = require('./storage/sql');

_defaults(exports, _interopExportWildcard(_storageSql, _defaults));