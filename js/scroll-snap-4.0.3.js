(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    var TIMEOUT_MIN = 50;
    var TIMEOUT_DEFAULT = 100;
    var DURATION_DEFAULT = 300;
    var THRESHOLD_DEFAULT = 0.2;
    var SNAPSTOP_DEFAULT = false;
    var EASING_DEFAULT = easeInOutQuad;
    var NOOP = function () { };
    function createScrollSnap(element, settings, callback) {
        if (settings === void 0) { settings = {}; }
        var onAnimationEnd = typeof callback === 'function' ? callback : NOOP;
        var listenerElement;
        var target;
        var animating = false;
        var scrollHandlerTimer;
        var scrollSpeedTimer;
        var scrollStart;
        var speedDeltaX;
        var speedDeltaY;
        var snapLengthUnit;
        var lastScrollValue = {
            x: 0,
            y: 0,
        };
        var animationFrame;
        var snapDestinationX = settings.snapDestinationX, snapDestinationY = settings.snapDestinationY;
        if (snapDestinationX &&
            typeof snapDestinationX !== 'string' &&
            typeof snapDestinationX !== 'number') {
            throw new Error("Settings property 'snapDestinationX' is not valid, expected STRING or NUMBER but found " + (typeof snapDestinationX).toUpperCase());
        }
        if (snapDestinationY &&
            typeof snapDestinationY !== 'string' &&
            typeof snapDestinationY !== 'number') {
            throw new Error("Settings property 'snapDestinationY' is not valid, expected STRING or NUMBER but found " + (typeof snapDestinationY).toUpperCase());
        }
        if (settings.timeout && (isNaN(settings.timeout) || typeof settings.timeout === 'boolean')) {
            throw new Error("Optional settings property 'timeout' is not valid, expected NUMBER but found " + (typeof settings.timeout).toUpperCase());
        }
        // any value less then TIMEOUT_MIN may cause weird bahaviour on some devices (especially on mobile with momentum scrolling)
        var timeout = settings.timeout && settings.timeout >= TIMEOUT_MIN ? settings.timeout : TIMEOUT_DEFAULT;
        if (settings.duration && (isNaN(settings.duration) || typeof settings.duration === 'boolean')) {
            throw new Error("Optional settings property 'duration' is not valid, expected NUMBER but found " + (typeof settings.duration).toUpperCase());
        }
        var duration = settings.duration || DURATION_DEFAULT;
        if (settings.threshold &&
            (isNaN(settings.threshold) || typeof settings.threshold === 'boolean')) {
            throw new Error("Optional settings property 'threshold' is not valid, expected NUMBER but found " + (typeof settings.threshold).toUpperCase());
        }
        var threshold = settings.threshold || THRESHOLD_DEFAULT;
        if (settings.easing && typeof settings.easing !== 'function') {
            throw new Error("Optional settings property 'easing' is not valid, expected FUNCTION but found " + (typeof settings.easing).toUpperCase());
        }
        var easing = settings.easing || EASING_DEFAULT;
        if (settings.snapStop && typeof settings.snapStop !== 'boolean') {
            throw new Error("Optional settings property 'snapStop' is not valid, expected BOOLEAN but found " + (typeof settings.snapStop).toUpperCase());
        }
        var snapStop = settings.snapStop || SNAPSTOP_DEFAULT;
        function checkScrollSpeed(value, axis) {
            var clear = function () {
                lastScrollValue[axis] = null;
            };
            var newValue = value;
            var delta;
            if (lastScrollValue[axis] !== null) {
                delta = newValue - lastScrollValue[axis];
            }
            else {
                delta = 0;
            }
            lastScrollValue[axis] = newValue;
            scrollSpeedTimer && clearTimeout(scrollSpeedTimer);
            scrollSpeedTimer = window.setTimeout(clear, 100);
            return delta;
        }
        function bindElement(element) {
            target = element;
            listenerElement = element === document.documentElement ? window : element;
            listenerElement.addEventListener('scroll', startAnimation, false);
            snapLengthUnit = parseSnapCoordinatesValue(snapDestinationX, snapDestinationY);
        }
        function unbindElement() {
            listenerElement.removeEventListener('scroll', startAnimation, false);
        }
        function startAnimation() {
            speedDeltaX = checkScrollSpeed(target.scrollLeft, 'x');
            speedDeltaY = checkScrollSpeed(target.scrollTop, 'y');
            if (animating || (speedDeltaX === 0 && speedDeltaY === 0)) {
                return;
            }
            handler(target);
        }
        /**
         * scroll handler
         * this is the callback for scroll events.
         */
        function handler(target) {
            // if currently animating, stop it. this prevents flickering.
            if (animationFrame) {
                clearTimeout(animationFrame);
            }
            // if a previous timeout exists, clear it.
            if (scrollHandlerTimer) {
                // we only want to call a timeout once after scrolling..
                clearTimeout(scrollHandlerTimer);
            }
            else {
                scrollStart = {
                    y: target.scrollTop,
                    x: target.scrollLeft,
                };
            }
            scrollHandlerTimer = window.setTimeout(animationHandler, timeout);
        }
        function animationHandler() {
            // if we don't move a thing, we can ignore the timeout: if we did, there'd be another timeout added for scrollStart+1.
            if (scrollStart.y === target.scrollTop && scrollStart.x === target.scrollLeft) {
                // ignore timeout
                return;
            }
            // detect direction of scroll. negative is up, positive is down.
            var direction = {
                y: Math.sign(speedDeltaY),
                x: Math.sign(speedDeltaX),
            };
            // get the next snap-point to snap-to
            var snapPoint = getNextSnapPoint(target, direction);
            listenerElement.removeEventListener('scroll', startAnimation, false);
            animating = true;
            // smoothly move to the snap point
            smoothScroll(target, snapPoint, function () {
                // after moving to the snap point, rebind the scroll event handler
                animating = false;
                listenerElement.addEventListener('scroll', startAnimation, false);
                onAnimationEnd();
                // reset scrollStart
                scrollStart = {
                    y: target.scrollTop,
                    x: target.scrollLeft,
                };
            });
        }
        function getNextSnapPoint(target, direction) {
            // get snap length
            var snapLength = {
                y: Math.round(getYSnapLength(target, snapLengthUnit.y)),
                x: Math.round(getXSnapLength(target, snapLengthUnit.x)),
            };
            var top = target.scrollTop;
            var left = target.scrollLeft;
            var startPoint = {
                y: scrollStart.y / snapLength.y || 0,
                x: scrollStart.x / snapLength.x || 0,
            };
            var currentPoint = {
                y: top / snapLength.y || 0,
                x: left / snapLength.x || 0,
            };
            var nextPoint = {
                y: 0,
                x: 0,
            };
            /**
             * Set target and bounds by direction,
             * if threshold has not been reached, scroll back to currentPoint
             **/
            if (isAboveThreshold(direction.y, currentPoint.y)) {
                if (snapStop) {
                    nextPoint.y = roundByDirection(-direction.y, startPoint.y + direction.y);
                }
                else {
                    nextPoint.y = roundByDirection(direction.y, currentPoint.y);
                }
            }
            else {
                nextPoint.y = roundByDirection(direction.y * -1, currentPoint.y);
            }
            if (isAboveThreshold(direction.x, currentPoint.x)) {
                if (snapStop) {
                    nextPoint.x = roundByDirection(-direction.x, startPoint.x + direction.x);
                }
                else {
                    nextPoint.x = roundByDirection(direction.x, currentPoint.x);
                }
            }
            else {
                nextPoint.x = roundByDirection(direction.x * -1, currentPoint.x);
            }
            // DEBUG
            // console.log('direction', direction)
            // console.log('startPoint', startPoint)
            // console.log('currentPoint', currentPoint)
            // console.log('nextPoint', nextPoint)
            // calculate where to scroll
            var scrollTo = {
                y: nextPoint.y * snapLength.y,
                x: nextPoint.x * snapLength.x,
            };
            // stay in bounds (minimum: 0, maxmimum: absolute height)
            scrollTo.y = stayInBounds(0, target.scrollHeight, scrollTo.y);
            scrollTo.x = stayInBounds(0, target.scrollWidth, scrollTo.x);
            return scrollTo;
        }
        function isAboveThreshold(direction, value) {
            return direction > 0 ? value % 1 > threshold : 1 - (value % 1) > threshold;
        }
        function roundByDirection(direction, value) {
            if (direction === -1) {
                // when we go up, we floor the number to jump to the next snap-point in scroll direction
                return Math.floor(value);
            }
            // go down, we ceil the number to jump to the next in view.
            return Math.ceil(value);
        }
        function stayInBounds(min, max, destined) {
            return Math.max(Math.min(destined, max), min);
        }
        function parseSnapCoordinatesValue(x, y) {
            // regex to parse lengths
            var regex = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?)(px|%|vw|vh)/;
            // defaults
            var parsed = {
                y: {
                    value: 0,
                    unit: 'px',
                },
                x: {
                    value: 0,
                    unit: 'px',
                },
            };
            if (typeof y === 'number') {
                parsed.y.value = y;
            }
            else {
                var resultY = regex.exec(y);
                if (resultY !== null) {
                    parsed.y = {
                        value: Number(resultY[1]),
                        unit: resultY[2],
                    };
                }
            }
            if (typeof x === 'number') {
                parsed.x.value = x;
            }
            else {
                var resultX = regex.exec(x);
                if (resultX !== null) {
                    parsed.x = {
                        value: Number(resultX[1]),
                        unit: resultX[2],
                    };
                }
            }
            return parsed;
        }
        function getYSnapLength(obj, declaration) {
            // get y snap length based on declaration unit
            if (declaration.unit === 'vh') {
                return ((Math.max(document.documentElement.clientHeight, window.innerHeight || 1) / 100) *
                    declaration.value);
            }
            else if (declaration.unit === '%') {
                return (obj.clientHeight / 100) * declaration.value;
            }
            else {
                return declaration.value;
            }
        }
        function getXSnapLength(obj, declaration) {
            // get x snap length based on declaration unit
            if (declaration.unit === 'vw') {
                return ((Math.max(document.documentElement.clientWidth, window.innerWidth || 1) / 100) *
                    declaration.value);
            }
            else if (declaration.unit === '%') {
                return (obj.clientWidth / 100) * declaration.value;
            }
            else {
                return declaration.value;
            }
        }
        function isEdge(Coordinates) {
            return (Coordinates.x === 0 && speedDeltaY === 0) || (Coordinates.y === 0 && speedDeltaX === 0);
        }
        function smoothScroll(obj, end, callback) {
            var position = function (start, end, elapsed, period) {
                if (elapsed > period) {
                    return end;
                }
                return start + (end - start) * easing(elapsed / period);
            };
            var start = {
                y: obj.scrollTop,
                x: obj.scrollLeft,
            };
            // get animation frame or a fallback
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (fn) {
                    return window.setTimeout(fn, 15);
                };
            var period = isEdge(start) ? 1 : duration;
            var startTime;
            // setup the stepping function
            function step(timestamp) {
                if (!startTime) {
                    startTime = timestamp;
                }
                var elapsed = timestamp - startTime;
                // change position on y-axis if result is a number.
                if (!isNaN(end.y)) {
                    obj.scrollTop = position(start.y, end.y, elapsed, period);
                }
                // change position on x-axis if result is a number.
                if (!isNaN(end.x)) {
                    obj.scrollLeft = position(start.x, end.x, elapsed, period);
                }
                // check if we are over due;
                if (elapsed < period) {
                    requestAnimationFrame(step);
                }
                else {
                    // is there a callback?
                    if (typeof callback === 'function') {
                        // stop execution and run the callback
                        return callback(end);
                    }
                }
            }
            animationFrame = requestAnimationFrame(step);
        }
        function bind() {
            bindElement(element);
        }
        function unbind() {
            unbindElement();
        }
        bind();
        return {
            bind: bind,
            unbind: unbind,
        };
    }
    exports.default = createScrollSnap;
});
//# sourceMappingURL=index.js.map