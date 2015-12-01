System.register('ionic/util/dom', [], function (_export) {
    'use strict';

    var nativeRaf, nativeCancelRaf, _raf, rafCancel, CSS, matchesFn, dimensionCache, dimensionIds;

    _export('raf', raf);

    _export('rafFrames', rafFrames);

    _export('transitionEnd', transitionEnd);

    _export('animationStart', animationStart);

    _export('animationEnd', animationEnd);

    _export('ready', ready);

    _export('windowLoad', windowLoad);

    _export('pointerCoord', pointerCoord);

    _export('hasPointerMoved', hasPointerMoved);

    _export('isActive', isActive);

    _export('hasFocus', hasFocus);

    _export('isTextInput', isTextInput);

    _export('hasFocusedTextInput', hasFocusedTextInput);

    _export('closest', closest);

    /**
     * Get the element offsetWidth and offsetHeight. Values are cached
     * to reduce DOM reads. Cache is cleared on a window resize.
     * @param {TODO} ele  TODO
     */

    _export('removeElement', removeElement);

    _export('getDimensions', getDimensions);

    _export('windowDimensions', windowDimensions);

    _export('flushDimensionCache', flushDimensionCache);

    _export('parentOffsetEl', parentOffsetEl);

    /**
    * Get the current coordinates of the element, relative to the document.
    * Read-only equivalent of [jQuery's offset function](http://api.jquery.com/offset/).
    * @param {element} element The element to get the offset of.
    * @returns {object} Returns an object containing the properties top, left, width and height.
    */

    _export('position', position);

    _export('offset', offset);

    function raf(callback) {
        //console.log('raf', callback.toString().replace(/\s/g, '').replace('function', '').substring(0, 50));
        //console.log('raf, isRootZone()', zone.isRootZone(), '$id', zone.$id);
        _raf(callback);
    }

    function rafFrames(framesToWait, callback) {
        framesToWait = Math.ceil(framesToWait);
        if (framesToWait < 2) {
            raf(callback);
        } else {
            setTimeout(function () {
                raf(callback);
            }, (framesToWait - 1) * 17);
        }
    }

    function transitionEnd(el) {
        return cssPromise(el, CSS.transitionEnd);
    }

    function animationStart(el, animationName) {
        return cssPromise(el, CSS.animationStart, animationName);
    }

    function animationEnd(el, animationName) {
        return cssPromise(el, CSS.animationEnd, animationName);
    }

    function cssPromise(el, eventNames, animationName) {
        return new Promise(function (resolve) {
            eventNames.split(' ').forEach(function (eventName) {
                el.addEventListener(eventName, onEvent);
            });
            function onEvent(ev) {
                if (ev.animationName && animationName) {
                    // do not resolve if a bubbled up ev.animationName
                    // is not the same as the passed in animationName arg
                    if (ev.animationName !== animationName) {
                        return;
                    }
                } else if (ev.target !== el) {
                    // do not resolve if the event's target element is not
                    // the same as the element the listener was added to
                    return;
                }
                ev.stopPropagation();
                eventNames.split(' ').forEach(function (eventName) {
                    el.removeEventListener(eventName, onEvent);
                });
                resolve(ev);
            }
        });
    }

    function ready(callback) {
        var promise = null;
        if (!callback) {
            // a callback wasn't provided, so let's return a promise instead
            promise = new Promise(function (resolve) {
                callback = resolve;
            });
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback();
        } else {
            (function () {
                var completed = function completed() {
                    document.removeEventListener('DOMContentLoaded', completed, false);
                    window.removeEventListener('load', completed, false);
                    callback();
                };

                document.addEventListener('DOMContentLoaded', completed, false);
                window.addEventListener('load', completed, false);
            })();
        }
        return promise;
    }

    function windowLoad(callback) {
        var promise = null;
        if (!callback) {
            // a callback wasn't provided, so let's return a promise instead
            promise = new Promise(function (resolve) {
                callback = resolve;
            });
        }
        if (document.readyState === 'complete') {
            callback();
        } else {
            (function () {
                var completed = function completed() {
                    window.removeEventListener('load', completed, false);
                    callback();
                };

                window.addEventListener('load', completed, false);
            })();
        }
        return promise;
    }

    function pointerCoord(ev) {
        // get coordinates for either a mouse click
        // or a touch depending on the given event
        var c = { x: 0, y: 0 };
        if (ev) {
            var touches = ev.touches && ev.touches.length ? ev.touches : [ev];
            var e = ev.changedTouches && ev.changedTouches[0] || touches[0];
            if (e) {
                c.x = e.clientX || e.pageX || 0;
                c.y = e.clientY || e.pageY || 0;
            }
        }
        return c;
    }

    function hasPointerMoved(threshold, startCoord, endCoord) {
        return startCoord && endCoord && (Math.abs(startCoord.x - endCoord.x) > threshold || Math.abs(startCoord.y - endCoord.y) > threshold);
    }

    function isActive(ele) {
        return !!(ele && document.activeElement === ele);
    }

    function hasFocus(ele) {
        return isActive(ele) && ele.parentElement.querySelector(':focus') === ele;
    }

    function isTextInput(ele) {
        return !!ele && (ele.tagName == 'TEXTAREA' || ele.contentEditable === 'true' || ele.tagName == 'INPUT' && !/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i.test(ele.type));
    }

    function hasFocusedTextInput() {
        var ele = document.activeElement;
        if (isTextInput(ele)) {
            return ele.parentElement.querySelector(':focus') === ele;
        }
        return false;
    }

    function closest(ele, selector, checkSelf) {
        if (ele && matchesFn) {
            // traverse parents
            ele = checkSelf ? ele : ele.parentElement;
            while (ele !== null) {
                if (ele[matchesFn](selector)) {
                    return ele;
                }
                ele = ele.parentElement;
            }
        }
        return null;
    }

    function removeElement(ele) {
        ele && ele.parentNode && ele.parentNode.removeChild(ele);
    }

    function getDimensions(ion, ele) {
        if (!ion._dimId) {
            ion._dimId = ++dimensionIds;
            if (ion._dimId % 1000 === 0) {
                // periodically flush dimensions
                flushDimensionCache();
            }
        }
        var dimensions = dimensionCache[ion._dimId];
        if (!dimensions) {
            var _ele = ion.getNativeElement();
            // make sure we got good values before caching
            if (_ele.offsetWidth && _ele.offsetHeight) {
                dimensions = dimensionCache[ion._dimId] = {
                    width: _ele.offsetWidth,
                    height: _ele.offsetHeight,
                    left: _ele.offsetLeft,
                    top: _ele.offsetTop
                };
            } else {
                // do not cache bad values
                return { width: 0, height: 0, left: 0, top: 0 };
            }
        }
        return dimensions;
    }

    function windowDimensions() {
        if (!dimensionCache.win) {
            // make sure we got good values before caching
            if (window.innerWidth && window.innerHeight) {
                dimensionCache.win = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            } else {
                // do not cache bad values
                return { width: 0, height: 0 };
            }
        }
        return dimensionCache.win;
    }

    function flushDimensionCache() {
        dimensionCache = {};
    }

    function isStaticPositioned(element) {
        return (element.style.position || 'static') === 'static';
    }
    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */

    function parentOffsetEl(element) {
        var offsetParent = element.offsetParent || document;
        while (offsetParent && offsetParent !== document && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || document;
    }

    /**
     * Get the current coordinates of the element, relative to the offset parent.
     * Read-only equivalent of [jQuery's position function](http://api.jquery.com/position/).
     * @param {element} element The element to get the position of.
     * @returns {object} Returns an object containing the properties top, left, width and height.
     */

    function position(element) {
        var elBCR = offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element);
        if (offsetParentEl != document) {
            offsetParentBCR = offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = element.getBoundingClientRect();
        return {
            width: boundingClientRect.width || element.offsetWidth,
            height: boundingClientRect.height || element.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }

    function offset(element) {
        var boundingClientRect = element.getBoundingClientRect();
        return {
            width: boundingClientRect.width || element.offsetWidth,
            height: boundingClientRect.height || element.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || document.documentElement.scrollLeft)
        };
    }

    return {
        setters: [],
        execute: function () {
            nativeRaf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            nativeCancelRaf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;

            _raf = nativeRaf || function (callback) {
                var timeCurrent = new Date().getTime(),
                    timeDelta = undefined;
                /* Dynamically set delay on a per-tick basis to match 60fps. */
                /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
                timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                timeLast = timeCurrent + timeDelta;
                return setTimeout(function () {
                    callback(timeCurrent + timeDelta);
                }, timeDelta);
            };

            rafCancel = nativeRaf ? nativeCancelRaf : function (id) {
                return window.cancelTimeout(id);
            };

            _export('rafCancel', rafCancel);

            CSS = {};

            _export('CSS', CSS);

            (function () {
                // transform
                var i,
                    keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform', '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
                for (i = 0; i < keys.length; i++) {
                    if (document.documentElement.style[keys[i]] !== undefined) {
                        CSS.transform = keys[i];
                        break;
                    }
                }
                // transition
                keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
                for (i = 0; i < keys.length; i++) {
                    if (document.documentElement.style[keys[i]] !== undefined) {
                        CSS.transition = keys[i];
                        break;
                    }
                }
                // The only prefix we care about is webkit for transitions.
                var isWebkit = CSS.transition.indexOf('webkit') > -1;
                CSS.prefix = isWebkit ? '-webkit-' : '';
                // transition duration
                CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
                // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
                CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
            })();
            if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
                CSS.animation = 'WebkitAnimation';
                CSS.animationStart = 'webkitAnimationStart animationstart';
                CSS.animationEnd = 'webkitAnimationEnd animationend';
            } else {
                CSS.animation = 'animation';
                CSS.animationStart = 'animationstart';
                CSS.animationEnd = 'animationend';
            }
            matchesFn = undefined;

            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'].some(function (fn) {
                if (typeof document.documentElement[fn] == 'function') {
                    matchesFn = fn;
                }
            });
            dimensionCache = {};
            dimensionIds = 0;

            ;
        }
    };
});