var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var slide_edge_gesture_1 = require('../../gestures/slide-edge-gesture');
var SwipeBackGesture = (function (_super) {
    __extends(SwipeBackGesture, _super);
    function SwipeBackGesture(element, opts, _nav) {
        if (opts === void 0) { opts = {}; }
        _super.call(this, element, opts);
        this._nav = _nav;
        // Can check corners through use of eg 'left top'
        this.edges = opts.edge.split(' ');
        this.threshold = opts.threshold;
    }
    SwipeBackGesture.prototype.onSlideStart = function () {
        this._nav.swipeBackStart();
    };
    SwipeBackGesture.prototype.onSlide = function (slide, ev) {
        this._nav.swipeBackProgress(slide.distance / slide.max);
    };
    SwipeBackGesture.prototype.onSlideEnd = function (slide, ev) {
        var shouldComplete = (Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5);
        // TODO: calculate a better playback rate depending on velocity and distance
        this._nav.swipeBackEnd(shouldComplete, 1);
    };
    return SwipeBackGesture;
})(slide_edge_gesture_1.SlideEdgeGesture);
exports.SwipeBackGesture = SwipeBackGesture;
