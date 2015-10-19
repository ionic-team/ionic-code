'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _plugin = require('./plugin');

_defaults(exports, _interopExportWildcard(_plugin, _defaults));

var _applinksApplinks = require('./applinks/applinks');

_defaults(exports, _interopExportWildcard(_applinksApplinks, _defaults));

var _barcodeBarcode = require('./barcode/barcode');

_defaults(exports, _interopExportWildcard(_barcodeBarcode, _defaults));

var _batteryBattery = require('./battery/battery');

_defaults(exports, _interopExportWildcard(_batteryBattery, _defaults));

var _cameraCamera = require('./camera/camera');

_defaults(exports, _interopExportWildcard(_cameraCamera, _defaults));

var _contactsContacts = require('./contacts/contacts');

_defaults(exports, _interopExportWildcard(_contactsContacts, _defaults));

var _dialogsDialogs = require('./dialogs/dialogs');

_defaults(exports, _interopExportWildcard(_dialogsDialogs, _defaults));

var _deviceDevice = require('./device/device');

_defaults(exports, _interopExportWildcard(_deviceDevice, _defaults));

var _deviceMotionDeviceMotion = require('./device-motion/device-motion');

_defaults(exports, _interopExportWildcard(_deviceMotionDeviceMotion, _defaults));

var _deviceOrientationDeviceOrientation = require('./device-orientation/device-orientation');

_defaults(exports, _interopExportWildcard(_deviceOrientationDeviceOrientation, _defaults));

var _geolocationGeolocation = require('./geolocation/geolocation');

_defaults(exports, _interopExportWildcard(_geolocationGeolocation, _defaults));

var _keyboardKeyboard = require('./keyboard/keyboard');

_defaults(exports, _interopExportWildcard(_keyboardKeyboard, _defaults));

var _statusbarStatusbar = require('./statusbar/statusbar');

_defaults(exports, _interopExportWildcard(_statusbarStatusbar, _defaults));

var _vibrationVibration = require('./vibration/vibration');

_defaults(exports, _interopExportWildcard(_vibrationVibration, _defaults));