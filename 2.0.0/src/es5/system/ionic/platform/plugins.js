System.register('ionic/platform/plugins', ['./plugin', './applinks/applinks', './barcode/barcode', './battery/battery', './camera/camera', './contacts/contacts', './dialogs/dialogs', './device/device', './device-motion/device-motion', './device-orientation/device-orientation', './geolocation/geolocation', './keyboard/keyboard', './statusbar/statusbar', './vibration/vibration'], function (_export) {
  'use strict';

  return {
    setters: [function (_plugin) {
      for (var _key in _plugin) {
        if (_key !== 'default') _export(_key, _plugin[_key]);
      }
    }, function (_applinksApplinks) {
      for (var _key2 in _applinksApplinks) {
        if (_key2 !== 'default') _export(_key2, _applinksApplinks[_key2]);
      }
    }, function (_barcodeBarcode) {
      for (var _key3 in _barcodeBarcode) {
        if (_key3 !== 'default') _export(_key3, _barcodeBarcode[_key3]);
      }
    }, function (_batteryBattery) {
      for (var _key4 in _batteryBattery) {
        if (_key4 !== 'default') _export(_key4, _batteryBattery[_key4]);
      }
    }, function (_cameraCamera) {
      for (var _key5 in _cameraCamera) {
        if (_key5 !== 'default') _export(_key5, _cameraCamera[_key5]);
      }
    }, function (_contactsContacts) {
      for (var _key6 in _contactsContacts) {
        if (_key6 !== 'default') _export(_key6, _contactsContacts[_key6]);
      }
    }, function (_dialogsDialogs) {
      for (var _key7 in _dialogsDialogs) {
        if (_key7 !== 'default') _export(_key7, _dialogsDialogs[_key7]);
      }
    }, function (_deviceDevice) {
      for (var _key8 in _deviceDevice) {
        if (_key8 !== 'default') _export(_key8, _deviceDevice[_key8]);
      }
    }, function (_deviceMotionDeviceMotion) {
      for (var _key9 in _deviceMotionDeviceMotion) {
        if (_key9 !== 'default') _export(_key9, _deviceMotionDeviceMotion[_key9]);
      }
    }, function (_deviceOrientationDeviceOrientation) {
      for (var _key10 in _deviceOrientationDeviceOrientation) {
        if (_key10 !== 'default') _export(_key10, _deviceOrientationDeviceOrientation[_key10]);
      }
    }, function (_geolocationGeolocation) {
      for (var _key11 in _geolocationGeolocation) {
        if (_key11 !== 'default') _export(_key11, _geolocationGeolocation[_key11]);
      }
    }, function (_keyboardKeyboard) {
      for (var _key12 in _keyboardKeyboard) {
        if (_key12 !== 'default') _export(_key12, _keyboardKeyboard[_key12]);
      }
    }, function (_statusbarStatusbar) {
      for (var _key13 in _statusbarStatusbar) {
        if (_key13 !== 'default') _export(_key13, _statusbarStatusbar[_key13]);
      }
    }, function (_vibrationVibration) {
      for (var _key14 in _vibrationVibration) {
        if (_key14 !== 'default') _export(_key14, _vibrationVibration[_key14]);
      }
    }],
    execute: function () {}
  };
});