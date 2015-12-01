System.register('ionic/util/click-block', [], function (_export) {
    'use strict';

    var CSS_CLICK_BLOCK, DEFAULT_EXPIRE, cbEle, fallbackTimerId, isShowing, ClickBlock;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function show(expire) {
        clearTimeout(fallbackTimerId);
        fallbackTimerId = setTimeout(hide, expire || DEFAULT_EXPIRE);
        if (!isShowing) {
            cbEle.classList.add(CSS_CLICK_BLOCK);
            isShowing = true;
        }
    }
    function hide() {
        clearTimeout(fallbackTimerId);
        if (isShowing) {
            cbEle.classList.remove(CSS_CLICK_BLOCK);
            isShowing = false;
        }
    }
    return {
        setters: [],
        execute: function () {
            CSS_CLICK_BLOCK = 'click-block-active';
            DEFAULT_EXPIRE = 330;
            cbEle = undefined;
            fallbackTimerId = undefined;
            isShowing = false;

            ClickBlock = (function () {
                function ClickBlock() {
                    _classCallCheck(this, ClickBlock);
                }

                _createClass(ClickBlock, [{
                    key: 'enable',
                    value: function enable() {
                        cbEle = document.createElement('click-block');
                        document.body.appendChild(cbEle);
                        cbEle.addEventListener('touchmove', function (ev) {
                            ev.preventDefault();
                            ev.stopPropagation();
                        });
                        this._enabled = true;
                    }
                }, {
                    key: 'show',
                    value: (function (_show) {
                        function show(_x, _x2) {
                            return _show.apply(this, arguments);
                        }

                        show.toString = function () {
                            return _show.toString();
                        };

                        return show;
                    })(function (shouldShow, expire) {
                        if (this._enabled) {
                            if (shouldShow) {
                                show(expire);
                            } else {
                                hide();
                            }
                        }
                    })
                }]);

                return ClickBlock;
            })();

            _export('ClickBlock', ClickBlock);
        }
    };
});