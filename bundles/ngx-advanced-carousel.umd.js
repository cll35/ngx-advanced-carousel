(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('resize-observer-polyfill'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-advanced-carousel', ['exports', 'resize-observer-polyfill', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory(global['ngx-advanced-carousel'] = {}, global['resize-observer-polyfill'], global.rxjs, global.rxjs.operators, global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, ResizeObserver, rxjs, operators, core, common, forms) { 'use strict';

    ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/rxjs.observable.resize.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An observable creator for element resize.
     * @param {?} elm the watch element.
     * @param {?} cb when resize complete, call back function.
     * @param {?=} time resize emit time, default is 200
     * @return {?}
     */
    function resizeObservable(elm, cb, time) {
        if (time === void 0) { time = 200; }
        /** @type {?} */
        var elmObserve$;
        return new rxjs.Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            elmObserve$ = new ResizeObserver((/**
             * @param {?} entries
             * @param {?} obs
             * @return {?}
             */
            function (entries, obs) {
                observer.next(elmObserve$);
            }));
            elmObserve$.observe(elm);
        })).pipe(operators.debounceTime(time), operators.tap((/**
         * @return {?}
         */
        function () {
            cb();
        })), operators.finalize((/**
         * @return {?}
         */
        function () {
            elmObserve$.unobserve(elm);
            elmObserve$.disconnect();
        })));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-advanced-carousel-item.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxAdvancedCarouselItemDirective = /** @class */ (function () {
        function NgxAdvancedCarouselItemDirective() {
        }
        NgxAdvancedCarouselItemDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngx-advanced-carousel-item]',
                    },] }
        ];
        /** @nocollapse */
        NgxAdvancedCarouselItemDirective.ctorParameters = function () { return []; };
        return NgxAdvancedCarouselItemDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-advanced-carousel.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxAdvancedCarouselComponent = /** @class */ (function () {
        function NgxAdvancedCarouselComponent(platformId, _document, _renderer, _zone, _cd) {
            var _this = this;
            this.platformId = platformId;
            this._document = _document;
            this._renderer = _renderer;
            this._zone = _zone;
            this._cd = _cd;
            this.mappedData = new core.EventEmitter();
            /**
             * when infinite is true, the animation time with item, default is 400.
             */
            this.aniTime = 400;
            /**
             * this class will add in #containerElm when model change
             */
            this.aniClass = "transition";
            /**
             * this class will add when carousel auto play,
             * this default autoplay animation is same as aniClass
             */
            this.aniClassAuto = this.aniClass;
            // tslint:disable-next-line: no-input-rename
            this.showButtonsMethod = "always";
            /**
             * user move picture with the container width rate,
             * when more than that rate, it will go to next or prev,
             * set false will never move with distance rate,
             * default is `0.15`
             */
            this.panBoundary = 0.15;
            /**
             * when show-num is bigger than 1, the first item align, defaulte is `center`
             */
            this.align = "center";
            /**
             * disable when drag occur the child element will follow touch point.
             * default is `false`
             */
            this.notDrag = false;
            this.trackByKey = "code";
            /**
             * the event binding state for stop auto play when mourse moveover
             */
            this.mourseEnable = false;
            /**
             * each auto play between time
             */
            this.delay = 8000;
            /**
             * auto play direction, default is `right`.
             */
            this.direction = "right";
            /**
             * how many number with each scroll, default is `1`.
             */
            this.scrollNum = 1;
            /**
             * Could user scroll many item once, simulate with scrollbar, default is `false`
             */
            this.isDragMany = false;
            /**
             * Minimal velocity required before recognizing, unit is in px per ms, default `0.3`
             */
            this.swipeVelocity = 0.3;
            /**
             * switch show number with custom logic like css \@media (min-width: `number`px)
             */
            this.breakpoint = [];
            this.screenSizeMap = {
                xxl: 1440,
                // tslint:disable-next-line: object-literal-sort-keys
                xl: 1200,
                lg: 992,
                md: 768,
                sm: 576,
                xs: 0,
            };
            this.leaveObs$ = rxjs.merge(rxjs.fromEvent(this._document, "mouseup"), rxjs.fromEvent(this._document, "touchend")).pipe(operators.tap((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.grabbing = false;
                e.stopPropagation();
                e.preventDefault();
            })));
            this.isFromAuto = true;
            this.isAutoNum = false;
            this.mouseOnContainer = false;
            this.alignDistance = 0;
            this.elmWidth = 0;
            this.restart = new rxjs.BehaviorSubject(null);
            this.speedChange = new rxjs.BehaviorSubject(5000);
            this.stopEvent = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            this._porgressWidth = 0;
            this._currentIndex = 0;
            this._showNum = 1;
            this._autoplay = false;
            this._infinite = false;
            this._grabbing = false;
            this._disableDrag = false;
            this.gridBy = { col: 1, row: 1 };
            this.panCount = 0;
            // this variable use for check the init value is write with ngModel,
            // when init first, not set with animation
            this.realIndex = this._currentIndex;
            this.singleTimeRun = true;
            this.initialIndex = 0;
            this.orginalData = [];
            this._infineDataCount = 0;
            this.onChange = (/**
             * @param {?} _
             * @return {?}
             */
            function (_) { });
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
        }
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "data", {
            get: /**
             * @return {?}
             */
            function () {
                return this._data;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "disableDrag", {
            /** disable drag event with touch and mouse pan moving, default is `false` */
            get: /**
             * disable drag event with touch and mouse pan moving, default is `false`
             * @return {?}
             */
            function () {
                return this._disableDrag;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this.rootElm) {
                    if (this._disableDrag !== value) {
                        if (value) {
                            this.destoryHammer();
                        }
                        else {
                            this.hammer = this.bindHammer();
                        }
                    }
                }
                this._disableDrag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "infinite", {
            /** is the carousel can move infinite */
            get: /**
             * is the carousel can move infinite
             * @return {?}
             */
            function () {
                return this._infinite;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._infinite = value;
                /* this.infiniteElmRefs.forEach((ref) => {
                  this.addStyle(ref.rootNodes[0], {
                    visibility: this.runLoop ? 'visible' : 'hidden',
                  });
                }); */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "speed", {
            /** auto play speed */
            get: /**
             * auto play speed
             * @return {?}
             */
            function () {
                return this.speedChange.value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                this._zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.speedChange.next(value);
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "showNum", {
            /**
             * how many number items to show once, default is `1`
             * set `auto` to using `[breakpoint]` set value.
             */
            get: /**
             * how many number items to show once, default is `1`
             * set `auto` to using `[breakpoint]` set value.
             * @return {?}
             */
            function () {
                return this._showNum;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value === "auto") {
                    this.isAutoNum = true;
                }
                else {
                    this._showNum = +value;
                    this.realIndex = this._showNum;
                    if (this.rootElm) {
                        this.setViewWidth();
                        this.reSetAlignDistance();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "autoplay", {
            /** carousel auto play confing */
            get: /**
             * carousel auto play confing
             * @return {?}
             */
            function () {
                return this._autoplay;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (common.isPlatformBrowser(this.platformId)) {
                    if (this.elms) {
                        this.progressWidth = 0;
                        if (value) {
                            this._zone.runOutsideAngular((/**
                             * @return {?}
                             */
                            function () {
                                _this.doNextSub$ = _this.doNext.subscribe();
                            }));
                        }
                        else {
                            if (this.doNextSub$) {
                                this.doNextSub$.unsubscribe();
                            }
                        }
                    }
                }
                this._autoplay = value;
                // if set autoplay, then the infinite is true
                if (value) {
                    this.infinite = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "currentIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this._currentIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                // if now index if not equale to save index, do someting
                if (this.currentIndex !== value) {
                    // if the value is not contain with the boundary not handlerw
                    if (value < 0) {
                        value = 0;
                    }
                    if (!this.runLoop && !(0 <= value && value <= this.itemElms.length - 1)) {
                        return;
                    }
                    this._currentIndex = value;
                    if (this.elms) {
                        if (this.autoplay && !this.isFromAuto) {
                            this._zone.runOutsideAngular((/**
                             * @return {?}
                             */
                            function () {
                                _this.stopEvent.next();
                                _this.callRestart();
                            }));
                        }
                        this.realIndex =
                            this.gridBy.col * this.gridBy.row > 1
                                ? this.currentIndex +
                                    this._showNum +
                                    this.scrollNum * this.gridBy.col
                                : this.currentIndex + this._showNum;
                        if (!this.infinite && this.realIndex > this.elms.length) {
                            if (this.gridBy.col * this.gridBy.row > 1) {
                                this._currentIndex =
                                    this.realIndex -
                                        this._showNum -
                                        this.scrollNum * this.gridBy.col <
                                        0
                                        ? 0
                                        : this.realIndex -
                                            this._showNum -
                                            this.scrollNum * this.gridBy.col;
                            }
                            else {
                                this._currentIndex =
                                    this.elms.length - this._showNum < 0
                                        ? 0
                                        : this.elms.length - this._showNum;
                            }
                            this.realIndex = this.elms.length;
                        }
                        this._currentIndex =
                            this.currentIndex < 0 && !this.infinite ? 0 : this.currentIndex;
                        this.drawView(this.currentIndex, true);
                        if (this.infinite) {
                            if (this.currentIndex < this.initialIndex) {
                                this._currentIndex =
                                    this.data.length - this._showNum * 4 + this.currentIndex;
                            }
                            if (this.currentIndex > this.data.length - this._showNum * 2) {
                                this._currentIndex =
                                    this.currentIndex - this.data.length + this._showNum * 4;
                            }
                            this._zone.runOutsideAngular((/**
                             * @return {?}
                             */
                            function () {
                                rxjs.timer(_this.aniTime + 100)
                                    .pipe(operators.switchMap((/**
                                 * @return {?}
                                 */
                                function () {
                                    _this.drawView(_this.currentIndex, false);
                                    return rxjs.of(null);
                                })), operators.take(1))
                                    .subscribe();
                            }));
                        }
                        /* if (this.realIndex > this.elms.length) {
                          const count = (this.realIndex - this.elms.length) % this._showNum;
                          for (let i = 0; i < count; i++) {
                            this.data.shift();
                          }
                          this._currentIndex -= count;
                          this.realIndex =
                            this.gridBy.col * this.gridBy.row > 1
                              ? this.currentIndex +
                                this._showNum +
                                this.scrollNum * this.gridBy.col
                              : this.currentIndex + this._showNum;
                        } */
                    }
                    if (0 <= this.currentIndex &&
                        this.currentIndex <= this.itemElms.length - 1) {
                        this._zone.run((/**
                         * @return {?}
                         */
                        function () {
                            _this.onChange(_this.currentIndex);
                            _this._cd.detectChanges();
                        }));
                    }
                }
                this.isFromAuto = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "progressWidth", {
            get: /**
             * @return {?}
             */
            function () {
                return this._porgressWidth;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this.progressElm !== undefined && this.autoplay) {
                    this._porgressWidth = value;
                    this._renderer.setStyle(((/** @type {?} */ (this.progressContainerElm.nativeElement))).children[0], "width", this.progressWidth + "%");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "grabbing", {
            get: /**
             * @return {?}
             */
            function () {
                return this._grabbing;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this._grabbing !== value) {
                    this._zone.run((/**
                     * @return {?}
                     */
                    function () {
                        _this._grabbing = value;
                        if (value) {
                            _this._renderer.addClass(_this.containerElm, "grabbing");
                        }
                        else {
                            _this.panCount = 0;
                            _this.callRestart();
                            _this._renderer.removeClass(_this.containerElm, "grabbing");
                        }
                        _this._cd.detectChanges();
                    }));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "left", {
            set: /**
             * @private
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (common.isPlatformBrowser(this.platformId)) {
                    this._renderer.setStyle(this.containerElm, "transform", "translateX(" + value + "px)");
                }
                else {
                    this._renderer.setStyle(this.containerElm, "transform", "translateX(" + value + "%)");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "maxRightIndex", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var addIndex = 0;
                switch (this.align) {
                    case "left":
                        addIndex = 0;
                        break;
                    case "center":
                        addIndex = ((/** @type {?} */ (this.showNum))) - 1;
                        break;
                    case "right":
                        addIndex = ((/** @type {?} */ (this.showNum))) - 1;
                        break;
                }
                return this.itemElms.length - 1 - this._showNum + 1 + addIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "runLoop", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.autoplay || this.infinite;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "lengthOne", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return this.itemElms.length === 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "rootElmWidth", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return common.isPlatformBrowser(this.platformId)
                    ? this.rootElm.getBoundingClientRect().width
                    : 100;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "containerElmWidth", {
            set: /**
             * @private
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.setStyle(this.containerElm, "width", value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.rootElm = this.container.nativeElement;
            this.containerElm = (/** @type {?} */ (this.rootElm.children[0]));
            this.init();
            rxjs.forkJoin(__spread(this.bindClick(), [
                // when item changed, remove old hammer binding, and reset width
                this.itemElms.changes.pipe(
                // detectChanges to change view dots
                operators.tap((/**
                 * @return {?}
                 */
                function () {
                    if (_this.currentIndex > _this.itemElms.length - 1) {
                        // i can't pass the changedetection check, only the way to using timeout. :(
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.currentIndex = _this.itemElms.length - 1;
                        }), 0);
                    }
                    _this.destroy();
                    _this.init();
                    _this.progressWidth = 0;
                })), operators.tap((/**
                 * @return {?}
                 */
                function () { return _this._cd.detectChanges(); }))),
                resizeObservable(this.rootElm, (/**
                 * @return {?}
                 */
                function () { return _this.containerResize(); })),
            ]))
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe();
        };
        /**
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy();
            this.destroy$.next();
            this.destroy$.unsubscribe();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value || value === 0) {
                this.currentIndex = value;
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.init = /**
         * @private
         * @return {?}
         */
        function () {
            this.initVariable();
            this.setViewWidth(true);
            this.reSetAlignDistance();
            if (!this.disableDrag) {
                this.hammer = this.bindHammer();
            }
            this.drawView(this.currentIndex, false);
            /* if (isPlatformBrowser(this.platformId) && this.runLoop) {
              this.addInfiniteElm();
            } */
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.destroy = /**
         * @private
         * @return {?}
         */
        function () {
            this.destoryHammer();
            if (this.autoplay) {
                this.doNextSub$.unsubscribe();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.destoryHammer = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.hammer) {
                this.hammer.destroy();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.containerResize = /**
         * @private
         * @return {?}
         */
        function () {
            this.setViewWidth();
            this.reSetAlignDistance();
            this.currentIndex = this.initialIndex;
            this.drawView(this.currentIndex, false);
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.initVariable = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.elms = _this.itemElms.toArray().map((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x.nativeElement; }));
                /** @type {?} */
                var startEvent = _this.restart.asObservable();
                /** @type {?} */
                var stopEvent = _this.stopEvent.asObservable();
                if (_this.mourseEnable) {
                    startEvent = rxjs.merge(startEvent, rxjs.fromEvent(_this.containerElm, "mouseleave").pipe(operators.filter((/**
                     * @return {?}
                     */
                    function () { return !_this.grabbing; })), operators.tap((/**
                     * @return {?}
                     */
                    function () { return (_this.mouseOnContainer = false); }))));
                    stopEvent = rxjs.merge(stopEvent, rxjs.fromEvent(_this.containerElm, "mouseover").pipe(operators.tap((/**
                     * @return {?}
                     */
                    function () { return (_this.mouseOnContainer = true); }))));
                }
                _this.doNext = startEvent.pipe(operators.switchMap((/**
                 * @return {?}
                 */
                function () { return _this.speedChange; })), operators.switchMap((/**
                 * @return {?}
                 */
                function () {
                    return rxjs.timer(_this.delay).pipe(operators.switchMap((/**
                     * @return {?}
                     */
                    function () { return _this.runProgress(20); })), operators.tap((/**
                     * @return {?}
                     */
                    function () {
                        _this.isFromAuto = true;
                        if (_this.direction === "left") {
                            _this.currentIndex -= _this.scrollNum;
                        }
                        else {
                            _this.currentIndex += _this.scrollNum;
                        }
                    })), operators.takeUntil(stopEvent.pipe(operators.tap((/**
                     * @return {?}
                     */
                    function () { return (_this.progressWidth = 0); })))));
                })));
                if (_this.autoplay) {
                    _this.doNextSub$ = _this.doNext.subscribe();
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.reSetAlignDistance = /**
         * @private
         * @return {?}
         */
        function () {
            switch (this.align) {
                case "center":
                    this.alignDistance = (this.rootElmWidth - this.elmWidth) / 2;
                    break;
                case "left":
                    this.alignDistance = 0;
                    break;
                case "right":
                    this.alignDistance = this.rootElmWidth - this.elmWidth;
                    break;
            }
        };
        /**
         * @private
         * @param {?=} isInit
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.setViewWidth = /**
         * @private
         * @param {?=} isInit
         * @return {?}
         */
        function (isInit) {
            var _this = this;
            if (this.isAutoNum) {
                this._showNum = this.getAutoNum();
                this.realIndex = this._showNum;
            }
            this._infineDataCount = this._showNum * 2;
            this._renderer.addClass(this.containerElm, "grab");
            if (isInit) {
                // remain one elm height
                this.initData(this._infineDataCount);
                this._renderer.addClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
            }
            this.elmWidth = this.rootElmWidth / (this._showNum / this.gridBy.col);
            this._renderer.removeClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
            this.containerElmWidth =
                (this.elmWidth / this.gridBy.col) * this.elms.length;
            this._renderer.setStyle(this.containerElm, "position", "relative");
            this.viewArea.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                element.nativeElement.setAttribute("style", "width:" + (_this.rootElmWidth * _this.scrollNum * _this.gridBy.col) / _this._showNum + "px");
            }));
            this.elms.forEach((/**
             * @param {?} elm
             * @return {?}
             */
            function (elm) {
                _this.setStyle(elm, "width", _this.elmWidth);
            }));
            this._cd.detectChanges();
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.bindHammer = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return null;
            }
            return this._zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var hm = new Hammer.Manager(_this.containerElm);
                /** @type {?} */
                var pan = new Hammer.Pan({
                    direction: Hammer.DIRECTION_HORIZONTAL,
                    threshold: 0,
                });
                hm.add(pan);
                hm.on("panleft panright panend pancancel", (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    if (_this.lengthOne) {
                        return;
                    }
                    _this.removeContainerTransition();
                    if (_this.autoplay) {
                        _this._zone.runOutsideAngular((/**
                         * @return {?}
                         */
                        function () {
                            _this.stopEvent.next();
                        }));
                    }
                    switch (e.type) {
                        case "panleft":
                        case "panright":
                            _this.panCount++;
                            if (_this.panCount < 2) {
                                return;
                            }
                            _this.grabbing = true;
                            if (_this.align !== "center" && _this.showNum >= _this.elms.length) {
                                _this.hammer.stop(true);
                                return;
                            }
                            if (!_this.runLoop && _this.outOfBound(e.type)) {
                                e.deltaX *= 0.2;
                            }
                            if (!_this.notDrag) {
                                _this.left =
                                    -_this.currentIndex * _this.elmWidth +
                                        _this.alignDistance +
                                        e.deltaX;
                            }
                            if (!_this.isDragMany) {
                                if (Math.abs(e.deltaX) > _this.elmWidth * 0.5) {
                                    if (e.deltaX > 0) {
                                        _this.currentIndex -= _this.scrollNum;
                                    }
                                    else {
                                        _this.currentIndex += _this.scrollNum;
                                    }
                                    _this.hammer.stop(true);
                                    return;
                                }
                            }
                            break;
                        case "pancancel":
                            _this.drawView(_this.currentIndex);
                            break;
                        case "panend":
                            if (_this.panBoundary !== false &&
                                Math.abs(e.deltaX) > _this.elmWidth * _this.panBoundary) {
                                /** @type {?} */
                                var moveNum = _this.isDragMany
                                    ? Math.ceil(Math.abs(e.deltaX) / _this.elmWidth)
                                    : _this.scrollNum;
                                /** @type {?} */
                                var prevIndex = _this.currentIndex - moveNum;
                                /** @type {?} */
                                var nextIndex = _this.currentIndex + moveNum;
                                if (e.deltaX > 0) {
                                    _this.goPrev(prevIndex);
                                }
                                else {
                                    _this.goNext(nextIndex);
                                }
                                break;
                            }
                            else if (e.velocityX < -_this.swipeVelocity && e.distance > 10) {
                                _this.goNext(_this.currentIndex + _this.scrollNum);
                            }
                            else if (e.velocityX > _this.swipeVelocity && e.distance > 10) {
                                _this.goPrev(_this.currentIndex - _this.scrollNum);
                            }
                            else {
                                _this.drawView(_this.currentIndex);
                            }
                            break;
                    }
                }));
                return hm;
            }));
        };
        /**
         * @private
         * @param {?} prevIndex
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.goPrev = /**
         * @private
         * @param {?} prevIndex
         * @return {?}
         */
        function (prevIndex) {
            if (!this.runLoop && prevIndex < 0) {
                prevIndex = 0;
                this.drawView(0);
            }
            this.currentIndex = prevIndex;
        };
        /**
         * @private
         * @param {?} nextIndex
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.goNext = /**
         * @private
         * @param {?} nextIndex
         * @return {?}
         */
        function (nextIndex) {
            if (!this.runLoop && nextIndex > this.maxRightIndex) {
                nextIndex = this.maxRightIndex;
                this.drawView(nextIndex);
            }
            this.currentIndex = nextIndex;
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.bindClick = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.btnNext && this.btnPrev) {
                return [
                    rxjs.fromEvent(this.btnNext.nativeElement, "click").pipe(operators.map((/**
                     * @return {?}
                     */
                    function () { return (_this.currentIndex += _this.scrollNum); }))),
                    rxjs.fromEvent(this.btnPrev.nativeElement, "click").pipe(operators.map((/**
                     * @return {?}
                     */
                    function () {
                        return (_this.currentIndex = _this.currentIndex - _this.scrollNum);
                    }))),
                ];
            }
            return [];
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.callRestart = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.autoplay && !this.mouseOnContainer && !this.grabbing) {
                this._zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.restart.next(null);
                }));
            }
        };
        /**
         * @private
         * @param {?} index
         * @param {?=} isAnimation
         * @param {?=} isFromAuto
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.drawView = /**
         * @private
         * @param {?} index
         * @param {?=} isAnimation
         * @param {?=} isFromAuto
         * @return {?}
         */
        function (index, isAnimation, isFromAuto) {
            if (isAnimation === void 0) { isAnimation = true; }
            if (isFromAuto === void 0) { isFromAuto = this.isFromAuto; }
            if (this.elms.length > 1 && this.elms.length > this._showNum) {
                this.removeContainerTransition();
                this.left = -(index * this.elmWidth - this.alignDistance);
                if (isAnimation) {
                    if (isFromAuto) {
                        this._renderer.addClass(this.containerElm, this.aniClassAuto);
                    }
                    else {
                        this._renderer.addClass(this.containerElm, this.aniClass);
                    }
                }
            }
            else {
                this.left = this.alignDistance;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.removeContainerTransition = /**
         * @private
         * @return {?}
         */
        function () {
            this._renderer.removeClass(this.containerElm, this.aniClass);
            this._renderer.removeClass(this.containerElm, this.aniClassAuto);
        };
        /**
         * @private
         * @param {?} type
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.outOfBound = /**
         * @private
         * @param {?} type
         * @return {?}
         */
        function (type) {
            switch (type) {
                case "panleft":
                    return this.currentIndex >= this.maxRightIndex;
                case "panright":
                    return this.currentIndex <= 0;
            }
        };
        /**
         * @private
         * @param {?} betweenTime
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.runProgress = /**
         * @private
         * @param {?} betweenTime
         * @return {?}
         */
        function (betweenTime) {
            var _this = this;
            return this._zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var howTimes = _this.speed / betweenTime;
                /** @type {?} */
                var everyIncrease = (100 / _this.speed) * betweenTime;
                return rxjs.interval(betweenTime).pipe(operators.tap((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    _this.progressWidth = (t % howTimes) * everyIncrease;
                })), operators.bufferCount(Math.round(howTimes), 0));
            }));
        };
        /**
         * @private
         * @param {?} showNum
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.initData = /**
         * @private
         * @param {?} showNum
         * @return {?}
         */
        function (showNum) {
            if (!this.orginalData.length) {
                this.orginalData = __spread(this.data);
            }
            if (this.infinite) {
                this.singleTimeRun = false;
                this.data = this.arrayCreator(this.orginalData, showNum);
                this._currentIndex = showNum;
                this.initialIndex = this.currentIndex;
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.getAutoNum = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var currWidth = this.rootElmWidth;
            if (this.breakpoint.length > 0) {
                /** @type {?} */
                var now = this.breakpoint.find((/**
                 * @param {?} b
                 * @return {?}
                 */
                function (b) {
                    return _this.screenSizeMap[b.screenSize] <= currWidth;
                }));
                if (now) {
                    if (now.gridBy) {
                        this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
                        this.gridBy = now.gridBy;
                        /** @type {?} */
                        var showNum = now.gridBy.col * now.gridBy.row || now.number;
                        return showNum;
                    }
                    else {
                        this.scrollNum = now.scrollNum || now.number;
                        this.gridBy = { col: 1, row: 1 };
                        return now.number;
                    }
                }
                if (this.breakpoint[this.breakpoint.length - 1].gridBy) {
                    this.scrollNum =
                        this.breakpoint[this.breakpoint.length - 1].gridBy.col ||
                            this.breakpoint[this.breakpoint.length - 1].scrollNum ||
                            this.breakpoint[this.breakpoint.length - 1].number;
                    this.gridBy = this.breakpoint[this.breakpoint.length - 1].gridBy;
                    /** @type {?} */
                    var showNum = this.breakpoint[this.breakpoint.length - 1].gridBy.col *
                        this.breakpoint[this.breakpoint.length - 1].gridBy.row ||
                        this.breakpoint[this.breakpoint.length - 1].number;
                    return showNum;
                }
                else {
                    this.scrollNum =
                        this.breakpoint[this.breakpoint.length - 1].scrollNum ||
                            this.breakpoint[this.breakpoint.length - 1].number;
                    this.gridBy = { col: 1, row: 1 };
                    return this.breakpoint[this.breakpoint.length - 1].number;
                }
            }
            /** @type {?} */
            var initNum = 3;
            if (currWidth > 200) {
                return Math.floor(initNum + currWidth / 100);
            }
            return initNum;
        };
        /**
         * @private
         * @param {?} elm
         * @param {?} style
         * @param {?} value
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.setStyle = /**
         * @private
         * @param {?} elm
         * @param {?} style
         * @param {?} value
         * @return {?}
         */
        function (elm, style, value) {
            if (common.isPlatformBrowser(this.platformId)) {
                this._renderer.setStyle(elm, style, value + "px");
            }
            else {
                this._renderer.setStyle(elm, style, value + "%");
            }
        };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.trackByFcn = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            if (!item || item[this.trackByKey]) {
                return null;
            }
            return item[this.trackByKey];
        };
        /**
         * @param {?} arr
         * @param {?} count
         * @return {?}
         */
        NgxAdvancedCarouselComponent.prototype.arrayCreator = /**
         * @param {?} arr
         * @param {?} count
         * @return {?}
         */
        function (arr, count) {
            /** @type {?} */
            var data = __spread(arr);
            for (var i = 0; i < count; i++) {
                data.unshift(arr[arr.length - 1 - (i % arr.length)]);
                data.push(arr[i % arr.length]);
            }
            return data;
        };
        NgxAdvancedCarouselComponent.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        selector: "ngx-advanced-carousel",
                        template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0)\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0)\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length - 1)\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1)\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li *ngIf=\"i % (scrollNum * gridBy.row) === 0\" (click)=\"currentIndex = i\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NgxAdvancedCarouselComponent; })),
                                multi: true,
                            },
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host{display:block;height:100%}.invisible{visibility:hidden}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel-container{position:relative}.carousel-container .carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel-container .carousel .slide{display:flex;flex-direction:row}.carousel-container .carousel .transition{transition:.5s ease-in-out}.carousel-container .carousel .content{display:flex}.carousel-container .carousel .content .item{display:block;opacity:0;width:100%}.carousel-container .carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel-container .carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel-container .carousel .content .item.visible{opacity:1}.carousel-container .carousel .content .item:first-child,.carousel-container .carousel .content .item:last-child{opacity:0}.carousel-container .carousel .content .item.visible_important{opacity:1}.carousel-container ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel-container ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel-container .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel-container .direction.left{left:0}.carousel-container .direction.right{position:absolute;right:0}.carousel-container .direction.disabled{opacity:.6;pointer-events:none}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"]
                    }] }
        ];
        /** @nocollapse */
        NgxAdvancedCarouselComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.Renderer2 },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef }
        ]; };
        NgxAdvancedCarouselComponent.propDecorators = {
            data: [{ type: core.Input }],
            disableDrag: [{ type: core.Input, args: ["disable-drag",] }],
            infinite: [{ type: core.Input, args: ["infinite",] }],
            speed: [{ type: core.Input, args: ["autoplay-speed",] }],
            showNum: [{ type: core.Input, args: ["show-num",] }],
            autoplay: [{ type: core.Input, args: ["autoplay",] }],
            container: [{ type: core.ViewChild, args: ["containerElm", { static: false },] }],
            viewArea: [{ type: core.ViewChildren, args: ["viewArea",] }],
            btnPrev: [{ type: core.ViewChild, args: ["prev", { static: false },] }],
            btnNext: [{ type: core.ViewChild, args: ["next", { static: false },] }],
            progressContainerElm: [{ type: core.ViewChild, args: ["progress", { static: false },] }],
            itemElms: [{ type: core.ContentChildren, args: [NgxAdvancedCarouselItemDirective, {
                            descendants: true,
                            read: core.ElementRef,
                        },] }],
            contentPrev: [{ type: core.ContentChild, args: ["carouselPrev", { static: false },] }],
            contentNext: [{ type: core.ContentChild, args: ["carouselNext", { static: false },] }],
            dotElm: [{ type: core.ContentChild, args: ["carouselDot", { static: false },] }],
            carouselItemTemplate: [{ type: core.ContentChild, args: ["carouselItemTemplate", { static: false },] }],
            progressElm: [{ type: core.ContentChild, args: ["carouselProgress", { static: false },] }],
            mappedData: [{ type: core.Output }],
            aniTime: [{ type: core.Input }],
            aniClass: [{ type: core.Input }],
            aniClassAuto: [{ type: core.Input }],
            showButtonsMethod: [{ type: core.Input, args: ["show-next-prev-buttons",] }],
            panBoundary: [{ type: core.Input, args: ["pan-boundary",] }],
            align: [{ type: core.Input }],
            notDrag: [{ type: core.Input, args: ["not-follow-pan",] }],
            trackByKey: [{ type: core.Input }],
            mourseEnable: [{ type: core.Input, args: ["mourse-enable",] }],
            delay: [{ type: core.Input, args: ["between-delay",] }],
            direction: [{ type: core.Input, args: ["autoplay-direction",] }],
            scrollNum: [{ type: core.Input, args: ["scroll-num",] }],
            isDragMany: [{ type: core.Input, args: ["drag-many",] }],
            swipeVelocity: [{ type: core.Input, args: ["swipe-velocity",] }],
            breakpoint: [{ type: core.Input }],
            screenSizeMap: [{ type: core.Input }]
        };
        return NgxAdvancedCarouselComponent;
    }());
    if (false) {
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.container;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.viewArea;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.btnPrev;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.btnNext;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.progressContainerElm;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.itemElms;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.contentPrev;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.contentNext;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.dotElm;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.carouselItemTemplate;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.progressElm;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype._data;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.mappedData;
        /**
         * when infinite is true, the animation time with item, default is 400.
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.aniTime;
        /**
         * this class will add in #containerElm when model change
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.aniClass;
        /**
         * this class will add when carousel auto play,
         * this default autoplay animation is same as aniClass
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.aniClassAuto;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.showButtonsMethod;
        /**
         * user move picture with the container width rate,
         * when more than that rate, it will go to next or prev,
         * set false will never move with distance rate,
         * default is `0.15`
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.panBoundary;
        /**
         * when show-num is bigger than 1, the first item align, defaulte is `center`
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.align;
        /**
         * disable when drag occur the child element will follow touch point.
         * default is `false`
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.notDrag;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.trackByKey;
        /**
         * the event binding state for stop auto play when mourse moveover
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.mourseEnable;
        /**
         * each auto play between time
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.delay;
        /**
         * auto play direction, default is `right`.
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.direction;
        /**
         * how many number with each scroll, default is `1`.
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.scrollNum;
        /**
         * Could user scroll many item once, simulate with scrollbar, default is `false`
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.isDragMany;
        /**
         * Minimal velocity required before recognizing, unit is in px per ms, default `0.3`
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.swipeVelocity;
        /**
         * switch show number with custom logic like css \@media (min-width: `number`px)
         * @type {?}
         */
        NgxAdvancedCarouselComponent.prototype.breakpoint;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.screenSizeMap;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.leaveObs$;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.isFromAuto;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.isAutoNum;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.mouseOnContainer;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.alignDistance;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.elmWidth;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.rootElm;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.containerElm;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.elms;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.hammer;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.doNextSub$;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.doNext;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.restart;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.speedChange;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.stopEvent;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.destroy$;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._porgressWidth;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._currentIndex;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype._showNum;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._autoplay;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._infinite;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._grabbing;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._disableDrag;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.gridBy;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.panCount;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.realIndex;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.wrapperWidth;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.singleTimeRun;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.initialIndex;
        /** @type {?} */
        NgxAdvancedCarouselComponent.prototype.orginalData;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._infineDataCount;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.onChange;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.onTouched;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype.platformId;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._document;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._renderer;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._zone;
        /**
         * @type {?}
         * @private
         */
        NgxAdvancedCarouselComponent.prototype._cd;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-advanced-carousel.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxAdvancedCarouselModule = /** @class */ (function () {
        function NgxAdvancedCarouselModule() {
        }
        NgxAdvancedCarouselModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                        exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                        imports: [common.CommonModule, forms.FormsModule],
                    },] }
        ];
        return NgxAdvancedCarouselModule;
    }());

    exports.NgxAdvancedCarouselComponent = NgxAdvancedCarouselComponent;
    exports.NgxAdvancedCarouselItemDirective = NgxAdvancedCarouselItemDirective;
    exports.NgxAdvancedCarouselModule = NgxAdvancedCarouselModule;
    exports.resizeObservable = resizeObservable;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-advanced-carousel.umd.js.map
