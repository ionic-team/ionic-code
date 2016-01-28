var win = window;
var doc = document;
var docEle = doc.documentElement;
// requestAnimationFrame is polyfilled for old Android
// within the web-animations polyfill
exports.raf = win.requestAnimationFrame;
function rafFrames(framesToWait, callback) {
    framesToWait = Math.ceil(framesToWait);
    if (framesToWait < 2) {
        exports.raf(callback);
    }
    else {
        setTimeout(function () {
            exports.raf(callback);
        }, (framesToWait - 1) * 17);
    }
}
exports.rafFrames = rafFrames;
exports.CSS = {};
(function () {
    // transform
    var i, keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
        '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
    for (i = 0; i < keys.length; i++) {
        if (docEle.style[keys[i]] !== undefined) {
            exports.CSS.transform = keys[i];
            break;
        }
    }
    // transition
    keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
    for (i = 0; i < keys.length; i++) {
        if (docEle.style[keys[i]] !== undefined) {
            exports.CSS.transition = keys[i];
            break;
        }
    }
    // The only prefix we care about is webkit for transitions.
    var isWebkit = exports.CSS.transition.indexOf('webkit') > -1;
    // transition duration
    exports.CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
    // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
    exports.CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
})();
if (win.onanimationend === undefined && win.onwebkitanimationend !== undefined) {
    exports.CSS.animationStart = 'webkitAnimationStart animationstart';
    exports.CSS.animationEnd = 'webkitAnimationEnd animationend';
}
else {
    exports.CSS.animationStart = 'animationstart';
    exports.CSS.animationEnd = 'animationend';
}
function transitionEnd(el) {
    return cssPromise(el, exports.CSS.transitionEnd);
}
exports.transitionEnd = transitionEnd;
function animationStart(el, animationName) {
    return cssPromise(el, exports.CSS.animationStart, animationName);
}
exports.animationStart = animationStart;
function animationEnd(el, animationName) {
    return cssPromise(el, exports.CSS.animationEnd, animationName);
}
exports.animationEnd = animationEnd;
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
            }
            else if (ev.target !== el) {
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
        promise = new Promise(function (resolve) { callback = resolve; });
    }
    if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
        callback();
    }
    else {
        function completed() {
            doc.removeEventListener('DOMContentLoaded', completed, false);
            win.removeEventListener('load', completed, false);
            callback();
        }
        doc.addEventListener('DOMContentLoaded', completed, false);
        win.addEventListener('load', completed, false);
    }
    return promise;
}
exports.ready = ready;
function windowLoad(callback) {
    var promise = null;
    if (!callback) {
        // a callback wasn't provided, so let's return a promise instead
        promise = new Promise(function (resolve) { callback = resolve; });
    }
    if (doc.readyState === 'complete') {
        callback();
    }
    else {
        function completed() {
            win.removeEventListener('load', completed, false);
            callback();
        }
        win.addEventListener('load', completed, false);
    }
    return promise;
}
exports.windowLoad = windowLoad;
function pointerCoord(ev) {
    // get coordinates for either a mouse click
    // or a touch depending on the given event
    var c = { x: 0, y: 0 };
    if (ev) {
        var touches = ev.touches && ev.touches.length ? ev.touches : [ev];
        var e = (ev.changedTouches && ev.changedTouches[0]) || touches[0];
        if (e) {
            c.x = e.clientX || e.pageX || 0;
            c.y = e.clientY || e.pageY || 0;
        }
    }
    return c;
}
exports.pointerCoord = pointerCoord;
function hasPointerMoved(threshold, startCoord, endCoord) {
    return startCoord && endCoord &&
        (Math.abs(startCoord.x - endCoord.x) > threshold || Math.abs(startCoord.y - endCoord.y) > threshold);
}
exports.hasPointerMoved = hasPointerMoved;
function isActive(ele) {
    return !!(ele && (doc.activeElement === ele));
}
exports.isActive = isActive;
function hasFocus(ele) {
    return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
}
exports.hasFocus = hasFocus;
function isTextInput(ele) {
    return !!ele &&
        (ele.tagName == 'TEXTAREA' ||
            ele.contentEditable === 'true' ||
            (ele.tagName == 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i).test(ele.type)));
}
exports.isTextInput = isTextInput;
function hasFocusedTextInput() {
    var ele = doc.activeElement;
    if (isTextInput(ele)) {
        return (ele.parentElement.querySelector(':focus') === ele);
    }
    return false;
}
exports.hasFocusedTextInput = hasFocusedTextInput;
var matchesFn;
var matchesMethods = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'];
matchesMethods.some(function (fn) {
    if (typeof docEle[fn] == 'function') {
        matchesFn = fn;
        return true;
    }
});
function closest(ele, selector, checkSelf) {
    if (ele && matchesFn) {
        // traverse parents
        ele = (checkSelf ? ele : ele.parentElement);
        while (ele !== null) {
            if (ele[matchesFn](selector)) {
                return ele;
            }
            ele = ele.parentElement;
        }
    }
    return null;
}
exports.closest = closest;
function removeElement(ele) {
    ele && ele.parentNode && ele.parentNode.removeChild(ele);
}
exports.removeElement = removeElement;
/**
 * Get the element offsetWidth and offsetHeight. Values are cached
 * to reduce DOM reads. Cache is cleared on a window resize.
 * @param {TODO} ele  TODO
 */
function getDimensions(ele, id) {
    var dimensions = dimensionCache[id];
    if (!dimensions) {
        // make sure we got good values before caching
        if (ele.offsetWidth && ele.offsetHeight) {
            dimensions = dimensionCache[id] = {
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                left: ele.offsetLeft,
                top: ele.offsetTop
            };
        }
        else {
            // do not cache bad values
            return { width: 0, height: 0, left: 0, top: 0 };
        }
    }
    return dimensions;
}
exports.getDimensions = getDimensions;
function windowDimensions() {
    if (!dimensionCache.win) {
        // make sure we got good values before caching
        if (win.innerWidth && win.innerHeight) {
            dimensionCache.win = {
                width: win.innerWidth,
                height: win.innerHeight
            };
        }
        else {
            // do not cache bad values
            return { width: 0, height: 0 };
        }
    }
    return dimensionCache.win;
}
exports.windowDimensions = windowDimensions;
function flushDimensionCache() {
    dimensionCache = {};
}
exports.flushDimensionCache = flushDimensionCache;
var dimensionCache = {};
function isStaticPositioned(element) {
    return (element.style.position || 'static') === 'static';
}
/**
 * returns the closest, non-statically positioned parentOffset of a given element
 * @param element
 */
function parentOffsetEl(element) {
    var offsetParent = element.offsetParent || doc;
    while (offsetParent && offsetParent !== doc && isStaticPositioned(offsetParent)) {
        offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || doc;
}
exports.parentOffsetEl = parentOffsetEl;
;
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
    if (offsetParentEl != doc) {
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
exports.position = position;
/**
* Get the current coordinates of the element, relative to the doc.
* Read-only equivalent of [jQuery's offset function](http://api.jquery.com/offset/).
* @param {element} element The element to get the offset of.
* @returns {object} Returns an object containing the properties top, left, width and height.
*/
function offset(element) {
    var boundingClientRect = element.getBoundingClientRect();
    return {
        width: boundingClientRect.width || element.offsetWidth,
        height: boundingClientRect.height || element.offsetHeight,
        top: boundingClientRect.top + (win.pageYOffset || docEle.scrollTop),
        left: boundingClientRect.left + (win.pageXOffset || docEle.scrollLeft)
    };
}
exports.offset = offset;
