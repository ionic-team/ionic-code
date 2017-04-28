/*! (C) Ionic https://ionicframework.com - Mit License */
(window.Ionic=window.Ionic||{}).components={"ion-app":[{1:0,2:1,3:2}],"ion-content":[{1:0,2:1,3:2},[["ionScrollStart"],["ionScroll"],["ionScrollEnd"],["fullscreen",0]]],"ion-toolbar":[{1:0,2:1,3:2}],"ion-title":[{1:0,2:1,3:2}],"ion-navbar":[{0:3},[["hideBackButton",0]]],"ion-badge":[{1:4,2:5,3:6}],"ion-button":[{1:7,2:8,3:9},[["large",0],["small",0],["default",0],["outline",0],["clear",0],["solid",0],["round",0],["block",0],["full",0],["strong",0],["mode"],["color"]]],"ion-card":[{1:10,2:11,3:12}],"ion-card-content":[{1:10,2:11,3:12}],"ion-card-header":[{1:10,2:11,3:12}],"ion-card-title":[{1:10,2:11,3:12}],"ion-list":[{1:13,2:14,3:15}],"ion-label":[{1:13,2:14,3:15}],"ion-item":[{0:16}],"ion-gesture":[{0:17},[["direction"],["gestureName"],["gesturePriority",1],["listenOn"],["maxAngle",1],["threshold",1],["type"],["canStart"],["onStart"],["onMove"],["onEnd"],["onPress"],["notCaptured"]]],"ion-scroll":[{0:17},[["enabled",0],["jsScroll",0],["ionScrollStart"],["ionScroll"],["ionScrollEnd"]]],"ion-toggle":[{1:18,2:19,3:20},[["checked",0],["disabled",0],["value"]]],"ion-slides":[{1:21,2:22,3:23},[["effect"],["autoplay",1],["control"],["direction"],["initialSlide",1],["loop",0],["pager",0],["paginationType"],["parallax",0],["slidesPerView"],["spaceBetween",1],["speed",1],["zoom",0],["keyboardControl",0]]],"ion-slide":[{0:24}]};
(function (window, document) {
    'use strict';
    // create window.Ionic if it doesn't already exist
    var ionic = window.Ionic = window.Ionic || {};
    // find the static directory, which should be the same as this JS file
    var scriptElm = document.getElementsByTagName('script');
    scriptElm = scriptElm[scriptElm.length - 1];
    var stcDir = document.querySelector('script[data-static-dir]');
    if (stcDir) {
        ionic.staticDir = stcDir.dataset['staticDir'];
    }
    else {
        var paths = scriptElm.src.split('/');
        paths.pop();
        ionic.staticDir = scriptElm.dataset['staticDir'] = paths.join('/') + '/';
    }
    var style = document.createElement('style');
    style.innerHTML = Object.keys(ionic.components).join(',') + '{visibility:hidden}';
    document.head.appendChild(style);
    // build up a path for the exact ionic core javascript file this browser needs
    var pathItems = [];
    if (!('attachShadow' in Element.prototype)) {
        // browser requires the shadow dom polyfill
        pathItems.push('sd');
    }
    if (!window.customElements) {
        // browser requires the custom elements polyfill
        pathItems.push('ce');
    }
    // request the ionic core file this browser needs
    var s = document.createElement('script');
    s.src = ionic.staticDir + 'ionic.core' + pathItems.join('.') + '.js';
    document.head.appendChild(s);
})(window, document);
