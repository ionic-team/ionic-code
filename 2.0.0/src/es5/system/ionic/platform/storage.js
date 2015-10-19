System.register('ionic/platform/storage', ['./storage/storage', './storage/local-storage', './storage/sql'], function (_export) {
  'use strict';

  return {
    setters: [function (_storageStorage) {
      for (var _key in _storageStorage) {
        if (_key !== 'default') _export(_key, _storageStorage[_key]);
      }
    }, function (_storageLocalStorage) {
      for (var _key2 in _storageLocalStorage) {
        if (_key2 !== 'default') _export(_key2, _storageLocalStorage[_key2]);
      }
    }, function (_storageSql) {
      for (var _key3 in _storageSql) {
        if (_key3 !== 'default') _export(_key3, _storageSql[_key3]);
      }
    }],
    execute: function () {}
  };
});