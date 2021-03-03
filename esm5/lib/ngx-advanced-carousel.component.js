/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-advanced-carousel.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, forkJoin, fromEvent, interval, merge, of, Subject, timer, } from "rxjs";
import { bufferCount, filter, map, switchMap, take, takeUntil, tap, } from "rxjs/operators";
import { NgxAdvancedCarouselItemDirective } from "./ngx-advanced-carousel-item.directive";
import { resizeObservable } from "./rxjs.observable.resize";
var NgxAdvancedCarouselComponent = /** @class */ (function () {
    function NgxAdvancedCarouselComponent(platformId, _document, _renderer, _zone, _cd) {
        var _this = this;
        this.platformId = platformId;
        this._document = _document;
        this._renderer = _renderer;
        this._zone = _zone;
        this._cd = _cd;
        this.verticalModeEnabled = false;
        this.indexChanged = new EventEmitter();
        this._startIndex = 0;
        this.mappedData = new EventEmitter();
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
        this.isRtl = false;
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
        this.padding = 0;
        this.leaveObs$ = merge(fromEvent(this._document, "mouseup"), fromEvent(this._document, "touchend")).pipe(tap((/**
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
        this.elmHeight = 0;
        this.restart = new BehaviorSubject(null);
        this.speedChange = new BehaviorSubject(5000);
        this.stopEvent = new Subject();
        this.destroy$ = new Subject();
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
        this.originalData = [];
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
                    if (!this.verticalModeEnabled) {
                        this.setViewWidth();
                    }
                    else {
                        this.setViewHeight();
                    }
                    this.reSetAlignDistance();
                }
                this.currentIndex = this.startIndex;
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
            this._autoplay =
                this.data && this.data.length > this.showNum ? value : false;
            if (isPlatformBrowser(this.platformId)) {
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
            // if set autoplay, then the infinite is true
            if (value) {
                this.infinite =
                    this.data && this.data.length > this.showNum ? value : false;
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
                if (!this.itemElms ||
                    (!this.runLoop && !(0 <= value && value <= this.itemElms.length - 1) ||
                        (this.data && this.data.length < this._showNum))) {
                    this.drawView(this.currentIndex);
                    return;
                }
                /** @type {?} */
                var dir = this._currentIndex > value ? -1 : 1;
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
                        this.realIndex =
                            dir > 0
                                ? Math.ceil(this.currentIndex / this._showNum +
                                    (this.currentIndex % this._showNum ? 0 : 1)) >= Math.ceil(this.elms.length / this._showNum)
                                    ? this.elms.length
                                    : this.currentIndex
                                : this.currentIndex;
                    }
                    this._currentIndex =
                        this.currentIndex < 0 && !this.infinite ? 0 : this.currentIndex;
                    this.drawView(this.currentIndex, true);
                    if (this.infinite) {
                        if (this.currentIndex < this.initialIndex) {
                            this._currentIndex = this.currentIndex + this._showNum * 2;
                        }
                        if (this.currentIndex > this.data.length - this._showNum * 2 - 1) {
                            this._currentIndex =
                                this.currentIndex - this.data.length + this._showNum * 4;
                        }
                        this._zone.runOutsideAngular((/**
                         * @return {?}
                         */
                        function () {
                            timer(_this.aniTime + 100)
                                .pipe(switchMap((/**
                             * @return {?}
                             */
                            function () {
                                _this.drawView(_this.currentIndex, false);
                                return of(null);
                            })), take(1))
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
            this.indexChanged.emit({
                realIndex: this.realIndex,
                currentIndex: this.currentIndex,
                viewSize: this._showNum,
            });
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
            if (!this.verticalModeEnabled) {
                if (isPlatformBrowser(this.platformId)) {
                    this._renderer.setStyle(this.containerElm, "transform", "translateX(" + (value + (this.currentIndex !== 0 ? this.padding : 0)) *
                        (this.align === "right" ? -1 : 1) + "px)");
                }
                else {
                    this._renderer.setStyle(this.containerElm, "transform", "translateX(" + value + "%)");
                }
            }
            else {
                if (isPlatformBrowser(this.platformId)) {
                    this._renderer.setStyle(this.containerElm, "transform", "translateY(" + (value + (this.currentIndex !== 0 ? this.padding : 0)) + "px)");
                }
                else {
                    this._renderer.setStyle(this.containerElm, "transform", "translateY(" + value + "%)");
                }
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
                    addIndex = 0;
                    break;
                default:
                    addIndex = 0;
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
            return isPlatformBrowser(this.platformId)
                ? this.rootElm.getBoundingClientRect().width
                : 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "rootElmHeight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this.platformId)
                ? this.rootElm.getBoundingClientRect().height
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
            if (!this.verticalModeEnabled) {
                this.setStyle(this.containerElm, "width", value);
            }
            else {
                this.containerElmHeight = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "containerElmHeight", {
        set: /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setStyle(this.containerElm, "height", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "startIndex", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._startIndex;
        },
        set: /**
         * @private
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._startIndex = val;
            this.currentIndex = this._startIndex;
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
        forkJoin(tslib_1.__spread(this.bindClick(), [
            // when item changed, remove old hammer binding, and reset width
            this.itemElms.changes.pipe(
            // detectChanges to change view dots
            tap((/**
             * @return {?}
             */
            function () {
                _this.destroy();
                _this.init();
                _this.progressWidth = 0;
            })), tap((/**
             * @return {?}
             */
            function () { return _this._cd.detectChanges(); }))),
            resizeObservable(this.rootElm, (/**
             * @return {?}
             */
            function () { return _this.containerResize(); })),
        ]))
            .pipe(takeUntil(this.destroy$))
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
        this.currentIndex = this.startIndex;
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
        this.currentIndex = this.startIndex || this.initialIndex;
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
                startEvent = merge(startEvent, fromEvent(_this.containerElm, "mouseleave").pipe(filter((/**
                 * @return {?}
                 */
                function () { return !_this.grabbing; })), tap((/**
                 * @return {?}
                 */
                function () { return (_this.mouseOnContainer = false); }))));
                stopEvent = merge(stopEvent, fromEvent(_this.containerElm, "mouseover").pipe(tap((/**
                 * @return {?}
                 */
                function () { return (_this.mouseOnContainer = true); }))));
            }
            _this.doNext = startEvent.pipe(switchMap((/**
             * @return {?}
             */
            function () { return _this.speedChange; })), switchMap((/**
             * @return {?}
             */
            function () {
                return timer(_this.delay).pipe(switchMap((/**
                 * @return {?}
                 */
                function () { return _this.runProgress(20); })), tap((/**
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
                })), takeUntil(stopEvent.pipe(tap((/**
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
                this.alignDistance = 0;
                break;
            case "top":
                this.alignDistance = 0;
                break;
            case "bottom":
                this.alignDistance = 0;
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
        if (!this.verticalModeEnabled) {
            if (this.isAutoNum) {
                this._showNum = this.getAutoNum();
                this.realIndex = this._showNum;
                this.currentIndex = this.startIndex;
            }
            this._infineDataCount = this._showNum * 2;
            this.infinite =
                this.data && this.data.length > this._showNum ? this.infinite : false;
            this._renderer.addClass(this.containerElm, "grab");
            if (isInit) {
                // remain one elm height
                this.initData(this._infineDataCount);
                this._renderer.addClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
            }
            this.elmWidth =
                this.rootElmWidth / (this._showNum / this.gridBy.row) -
                    (this.padding * 2) /
                        (this.gridBy.col > 1
                            ? this.gridBy.col
                            : this._showNum / this.gridBy.row);
            this._renderer.removeClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
            this.containerElmWidth =
                (this.rootElmWidth - this.padding * 2) *
                    (this.elms.length / this._showNum);
            this._renderer.setStyle(this.containerElm, "position", "relative");
            this.viewArea.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                element.nativeElement.setAttribute("style", "width:" + (_this.rootElmWidth - _this.padding * 2) + "px");
            }));
            this.elms.forEach((/**
             * @param {?} elm
             * @return {?}
             */
            function (elm) {
                _this.setStyle(elm, "width", _this.elmWidth);
            }));
        }
        else {
            this.setViewHeight(isInit);
        }
        this._cd.detectChanges();
    };
    /**
     * @private
     * @param {?=} isInit
     * @return {?}
     */
    NgxAdvancedCarouselComponent.prototype.setViewHeight = /**
     * @private
     * @param {?=} isInit
     * @return {?}
     */
    function (isInit) {
        var _this = this;
        if (this.isAutoNum) {
            this._showNum = this.getAutoNum();
            this.realIndex = this._showNum;
            this.currentIndex = this.startIndex;
        }
        this._infineDataCount = this._showNum * 2;
        this.infinite =
            this.data && this.data.length > this._showNum ? this.infinite : false;
        this._renderer.addClass(this.containerElm, "grab");
        if (isInit) {
            // remain one elm height
            this.initData(this._infineDataCount);
            this._renderer.addClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
        }
        this.elmWidth =
            this.rootElmHeight / (this._showNum / this.gridBy.row) -
                (this.padding * 2) /
                    (this.gridBy.col > 1
                        ? this.gridBy.col
                        : this._showNum / this.gridBy.row);
        this._renderer.removeClass(this.containerElm, "ngx-advanced-carousel-display-nowrap");
        this.containerElmWidth =
            (this.rootElmHeight - this.padding * 2) *
                (this.elms.length / this._showNum);
        this._renderer.setStyle(this.containerElm, "position", "relative");
        this.viewArea.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            element.nativeElement.setAttribute("style", "height:" + (_this.rootElmHeight - _this.padding * 2) + "px");
        }));
        this.elms.forEach((/**
         * @param {?} elm
         * @return {?}
         */
        function (elm) {
            _this.setStyle(elm, "height", _this.elmWidth);
        }));
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
        if (!isPlatformBrowser(this.platformId)) {
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
                            _this.verticalModeEnabled ? e.deltaY : (e.deltaX *= 0.2);
                        }
                        if (!_this.notDrag) {
                            _this.left =
                                -_this.currentIndex * _this.elmWidth +
                                    _this.alignDistance +
                                    (_this.verticalModeEnabled
                                        ? e.deltaY
                                        : _this.align === "right"
                                            ? -e.deltaX
                                            : e.deltaX);
                        }
                        if (!_this.isDragMany) {
                            if (Math.abs(_this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                                _this.elmWidth * 0.5) {
                                if ((_this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                                    if (_this.align === "right") {
                                        _this.currentIndex += _this.scrollNum;
                                    }
                                    else {
                                        _this.currentIndex -= _this.scrollNum;
                                    }
                                }
                                else {
                                    if (_this.align === "right") {
                                        _this.currentIndex -= _this.scrollNum;
                                    }
                                    else {
                                        _this.currentIndex += _this.scrollNum;
                                    }
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
                            Math.abs(_this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                                _this.elmWidth * _this.panBoundary) {
                            /** @type {?} */
                            var moveNum = _this.isDragMany
                                ? Math.ceil(Math.abs(_this.verticalModeEnabled ? e.deltaY : e.deltaX) /
                                    _this.elmWidth)
                                : _this.scrollNum;
                            /** @type {?} */
                            var prevIndex = _this.currentIndex - moveNum;
                            /** @type {?} */
                            var nextIndex = _this.currentIndex + moveNum;
                            if ((_this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                                _this.align === "right"
                                    ? _this.goNext(nextIndex)
                                    : _this.goPrev(prevIndex);
                            }
                            else {
                                _this.align === "right"
                                    ? _this.goPrev(prevIndex)
                                    : _this.goNext(nextIndex);
                            }
                            break;
                        }
                        else if (e.velocityX < -_this.swipeVelocity && e.distance > 10) {
                            _this.align === "right"
                                ? _this.goPrev(_this.currentIndex - _this.scrollNum)
                                : _this.goNext(_this.currentIndex + _this.scrollNum);
                        }
                        else if (e.velocityX > _this.swipeVelocity && e.distance > 10) {
                            _this.align === "right"
                                ? _this.goNext(_this.currentIndex + _this.scrollNum)
                                : _this.goPrev(_this.currentIndex - _this.scrollNum);
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
                fromEvent(this.btnNext.nativeElement, "click").pipe(map((/**
                 * @return {?}
                 */
                function () { return (_this.currentIndex += _this.scrollNum); }))),
                fromEvent(this.btnPrev.nativeElement, "click").pipe(map((/**
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
            this.left = -index * this.elmWidth + this.alignDistance;
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
            return interval(betweenTime).pipe(tap((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                _this.progressWidth = (t % howTimes) * everyIncrease;
            })), bufferCount(Math.round(howTimes), 0));
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
        if (!this.originalData.length) {
            this.originalData = tslib_1.__spread(this.data);
        }
        if (this.infinite) {
            this.singleTimeRun = false;
            this.data = this.arrayCreator(this.originalData, showNum);
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
                this.padding = now.padding || this.padding;
                if (now.gridBy) {
                    this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
                    this.gridBy = now.gridBy;
                    /** @type {?} */
                    var showNum = now.gridBy.col * now.gridBy.row || now.number;
                    return showNum;
                }
                else {
                    this.scrollNum = now.scrollNum || now.number;
                    this.gridBy = { col: now.number, row: 1 };
                    return now.number;
                }
            }
            this.padding =
                this.breakpoint[this.breakpoint.length - 1].padding || this.padding;
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
        if (isPlatformBrowser(this.platformId)) {
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
        var data = tslib_1.__spread(arr);
        for (var i = 0; i < count; i++) {
            data.unshift(arr[arr.length - 1 - (i % arr.length)]);
            data.push(arr[i % arr.length]);
        }
        return data;
    };
    NgxAdvancedCarouselComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: "ngx-advanced-carousel",
                    template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li\n        *ngIf=\"\n          (i + gridBy.col * gridBy.row) % (scrollNum * gridBy.row) === 0 &&\n          (infinite ? (i >= _showNum * 2 &&\n          i + _showNum * 2 < itemElms.length) : !infinite)\n        \"\n        (click)=\"currentIndex = i\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NgxAdvancedCarouselComponent; })),
                            multi: true,
                        },
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;height:100%}.invisible{visibility:hidden}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel-container{position:relative}.carousel-container .carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel-container .carousel .slide{display:flex;flex-direction:row}.carousel-container .carousel .transition{transition:.5s ease-in-out}.carousel-container .carousel .content{display:flex}.carousel-container .carousel .content .item{display:block;opacity:0;width:100%}.carousel-container .carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel-container .carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel-container .carousel .content .item.visible{opacity:1}.carousel-container .carousel .content .item:first-child,.carousel-container .carousel .content .item:last-child{opacity:0}.carousel-container .carousel .content .item.visible_important{opacity:1}.carousel-container ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel-container ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel-container .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel-container .direction.left{left:0}.carousel-container .direction.right{position:absolute;right:0}.carousel-container .direction.disabled{opacity:.6;pointer-events:none}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"]
                }] }
    ];
    /** @nocollapse */
    NgxAdvancedCarouselComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    NgxAdvancedCarouselComponent.propDecorators = {
        data: [{ type: Input }],
        disableDrag: [{ type: Input, args: ["disable-drag",] }],
        infinite: [{ type: Input, args: ["infinite",] }],
        speed: [{ type: Input, args: ["autoplay-speed",] }],
        showNum: [{ type: Input, args: ["show-num",] }],
        autoplay: [{ type: Input, args: ["autoplay",] }],
        verticalModeEnabled: [{ type: Input }],
        indexChanged: [{ type: Output }],
        startIndex: [{ type: Input }],
        container: [{ type: ViewChild, args: ["containerElm", { static: false },] }],
        viewArea: [{ type: ViewChildren, args: ["viewArea",] }],
        btnPrev: [{ type: ViewChild, args: ["prev", { static: false },] }],
        btnNext: [{ type: ViewChild, args: ["next", { static: false },] }],
        progressContainerElm: [{ type: ViewChild, args: ["progress", { static: false },] }],
        itemElms: [{ type: ContentChildren, args: [NgxAdvancedCarouselItemDirective, {
                        descendants: true,
                        read: ElementRef,
                    },] }],
        contentPrev: [{ type: ContentChild, args: ["carouselPrev", { static: false },] }],
        contentNext: [{ type: ContentChild, args: ["carouselNext", { static: false },] }],
        dotElm: [{ type: ContentChild, args: ["carouselDot", { static: false },] }],
        carouselItemTemplate: [{ type: ContentChild, args: ["carouselItemTemplate", { static: false },] }],
        progressElm: [{ type: ContentChild, args: ["carouselProgress", { static: false },] }],
        mappedData: [{ type: Output }],
        aniTime: [{ type: Input }],
        aniClass: [{ type: Input }],
        aniClassAuto: [{ type: Input }],
        showButtonsMethod: [{ type: Input, args: ["show-next-prev-buttons",] }],
        panBoundary: [{ type: Input, args: ["pan-boundary",] }],
        align: [{ type: Input }],
        notDrag: [{ type: Input, args: ["not-follow-pan",] }],
        trackByKey: [{ type: Input }],
        mourseEnable: [{ type: Input, args: ["mourse-enable",] }],
        delay: [{ type: Input, args: ["between-delay",] }],
        direction: [{ type: Input, args: ["autoplay-direction",] }],
        scrollNum: [{ type: Input, args: ["scroll-num",] }],
        isDragMany: [{ type: Input, args: ["drag-many",] }],
        swipeVelocity: [{ type: Input, args: ["swipe-velocity",] }],
        isRtl: [{ type: Input }],
        breakpoint: [{ type: Input }],
        screenSizeMap: [{ type: Input }],
        padding: [{ type: Input }]
    };
    return NgxAdvancedCarouselComponent;
}());
export { NgxAdvancedCarouselComponent };
if (false) {
    /** @type {?} */
    NgxAdvancedCarouselComponent.prototype.verticalModeEnabled;
    /** @type {?} */
    NgxAdvancedCarouselComponent.prototype.indexChanged;
    /**
     * @type {?}
     * @private
     */
    NgxAdvancedCarouselComponent.prototype._startIndex;
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
    /** @type {?} */
    NgxAdvancedCarouselComponent.prototype.isRtl;
    /**
     * switch show number with custom logic like css \@media (min-width: `number`px)
     * @type {?}
     */
    NgxAdvancedCarouselComponent.prototype.breakpoint;
    /** @type {?} */
    NgxAdvancedCarouselComponent.prototype.screenSizeMap;
    /** @type {?} */
    NgxAdvancedCarouselComponent.prototype.padding;
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
    NgxAdvancedCarouselComponent.prototype.elmHeight;
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
    NgxAdvancedCarouselComponent.prototype.originalData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBRVYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBRVosaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLEtBQUssRUFFTCxFQUFFLEVBQ0YsT0FBTyxFQUVQLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDtJQW9YRSxzQ0FDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFDYixHQUFzQjtRQUxoQyxpQkFNSTtRQUwy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d0RBQWlDOzs7OztJQUNqQyxxREFBMEI7Ozs7O0lBQzFCLGdEQUFxQjs7Ozs7SUFDckIsaURBQXNCOzs7OztJQUV0QiwrQ0FBNkI7Ozs7O0lBQzdCLG9EQUFrQzs7Ozs7SUFFbEMsNENBQWlDOzs7OztJQUVqQyw4Q0FBZTs7Ozs7SUFFZixrREFBaUM7Ozs7O0lBQ2pDLDhDQUFnQzs7Ozs7SUFFaEMsK0NBQWlEOzs7OztJQUNqRCxtREFBZ0Q7Ozs7O0lBQ2hELGlEQUF1Qzs7Ozs7SUFDdkMsZ0RBQXNDOzs7OztJQUV0QyxzREFBMkI7Ozs7O0lBQzNCLHFEQUEwQjs7SUFDMUIsZ0RBQW9COzs7OztJQUNwQixpREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQixvREFBNkI7O0lBQzdCLDhDQUFtQzs7Ozs7SUFFbkMsZ0RBQXFCOztJQUtyQixpREFBc0M7O0lBRXRDLG9EQUFvQjs7SUFFcEIscURBQTRCOzs7OztJQUM1QixvREFBeUI7O0lBQ3pCLG9EQUF5Qjs7Ozs7SUFFekIsd0RBQTZCOzs7OztJQTJDN0IsZ0RBQWtDOzs7OztJQUNsQyxpREFBNkI7Ozs7O0lBL00zQixrREFBNEM7Ozs7O0lBQzVDLGlEQUFtQzs7Ozs7SUFDbkMsaURBQTRCOzs7OztJQUM1Qiw2Q0FBcUI7Ozs7O0lBQ3JCLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBmcm9tRXZlbnQsXG4gIGludGVydmFsLFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBidWZmZXJDb3VudCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUgfSBmcm9tIFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtaXRlbS5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IHJlc2l6ZU9ic2VydmFibGUgfSBmcm9tIFwiLi9yeGpzLm9ic2VydmFibGUucmVzaXplXCI7XG5kZWNsYXJlIHZhciBIYW1tZXI7XG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6IFwibmd4LWFkdmFuY2VkLWNhcm91c2VsXCIsXG4gIHN0eWxlVXJsczogW1wiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG4gIC8qKiBkaXNhYmxlIGRyYWcgZXZlbnQgd2l0aCB0b3VjaCBhbmQgbW91c2UgcGFuIG1vdmluZywgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRpc2FibGUtZHJhZ1wiKVxuICBwdWJsaWMgZ2V0IGRpc2FibGVEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlRHJhZztcbiAgfVxuICBwdWJsaWMgc2V0IGRpc2FibGVEcmFnKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVEcmFnICE9PSB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVEcmFnID0gdmFsdWU7XG4gIH1cblxuICAvKiogaXMgdGhlIGNhcm91c2VsIGNhbiBtb3ZlIGluZmluaXRlICovXG4gIEBJbnB1dChcImluZmluaXRlXCIpXG4gIHB1YmxpYyBnZXQgaW5maW5pdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZmluaXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgaW5maW5pdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbmZpbml0ZSA9IHZhbHVlO1xuXG4gICAgLyogdGhpcy5pbmZpbml0ZUVsbVJlZnMuZm9yRWFjaCgocmVmKSA9PiB7XG4gICAgICB0aGlzLmFkZFN0eWxlKHJlZi5yb290Tm9kZXNbMF0sIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5ydW5Mb29wID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG4gICAgICB9KTtcbiAgICB9KTsgKi9cbiAgfVxuXG4gIC8qKiBhdXRvIHBsYXkgc3BlZWQgKi9cbiAgQElucHV0KFwiYXV0b3BsYXktc3BlZWRcIilcbiAgcHVibGljIGdldCBzcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGVlZENoYW5nZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhvdyBtYW55IG51bWJlciBpdGVtcyB0byBzaG93IG9uY2UsIGRlZmF1bHQgaXMgYDFgXG4gICAqIHNldCBgYXV0b2AgdG8gdXNpbmcgYFticmVha3BvaW50XWAgc2V0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KFwic2hvdy1udW1cIilcbiAgcHVibGljIGdldCBzaG93TnVtKCk6IG51bWJlciB8IFwiYXV0b1wiIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd051bTtcbiAgfVxuICBwdWJsaWMgc2V0IHNob3dOdW0odmFsdWU6IG51bWJlciB8IFwiYXV0b1wiKSB7XG4gICAgaWYgKHZhbHVlID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5pc0F1dG9OdW0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gK3ZhbHVlO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRWaWV3SGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBjYXJvdXNlbCBhdXRvIHBsYXkgY29uZmluZyAqL1xuICBASW5wdXQoXCJhdXRvcGxheVwiKVxuICBwdWJsaWMgZ2V0IGF1dG9wbGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdXRvcGxheTtcbiAgfVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlKSB7XG4gICAgdGhpcy5fYXV0b3BsYXkgPVxuICAgICAgdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGggPiB0aGlzLnNob3dOdW0gPyB2YWx1ZSA6IGZhbHNlO1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDA7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkID0gdGhpcy5kb05leHQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuZG9OZXh0U3ViJCkge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGlmIHNldCBhdXRvcGxheSwgdGhlbiB0aGUgaW5maW5pdGUgaXMgdHJ1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbmZpbml0ZSA9XG4gICAgICAgIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoID4gdGhpcy5zaG93TnVtID8gdmFsdWUgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgdmVydGljYWxNb2RlRW5hYmxlZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgY3VycmVudEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50SW5kZXgodmFsdWUpIHtcbiAgICAvLyBpZiBub3cgaW5kZXggaWYgbm90IGVxdWFsZSB0byBzYXZlIGluZGV4LCBkbyBzb21ldGluZ1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBub3QgY29udGFpbiB3aXRoIHRoZSBib3VuZGFyeSBub3QgaGFuZGxlcndcbiAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5pdGVtRWxtcyB8fFxuICAgICAgICAoIXRoaXMucnVuTG9vcCAmJiAhKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSB8fFxuICAgICAgICAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGggPCB0aGlzLl9zaG93TnVtICkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpciA9IHRoaXMuX2N1cnJlbnRJbmRleCA+IHZhbHVlID8gLTEgOiAxO1xuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLmlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIGlmICghdGhpcy5pbmZpbml0ZSAmJiB0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5yZWFsSW5kZXggLVxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gLVxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sIDxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogdGhpcy5yZWFsSW5kZXggLVxuICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5lbG1zLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gPCAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgICAgZGlyID4gMFxuICAgICAgICAgICAgICA/IE1hdGguY2VpbChcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC8gdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmN1cnJlbnRJbmRleCAlIHRoaXMuX3Nob3dOdW0gPyAwIDogMSlcbiAgICAgICAgICAgICAgICApID49IE1hdGguY2VpbCh0aGlzLmVsbXMubGVuZ3RoIC8gdGhpcy5fc2hvd051bSlcbiAgICAgICAgICAgICAgICA/IHRoaXMuZWxtcy5sZW5ndGhcbiAgICAgICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4XG4gICAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8IDAgJiYgIXRoaXMuaW5maW5pdGUgPyAwIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaW5pdGlhbEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDIgLSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuZGF0YS5sZW5ndGggKyB0aGlzLl9zaG93TnVtICogNDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aW1lcih0aGlzLmFuaVRpbWUgKyAxMDApXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpZiAodGhpcy5yZWFsSW5kZXggPiB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgY291bnQgPSAodGhpcy5yZWFsSW5kZXggLSB0aGlzLmVsbXMubGVuZ3RoKSAlIHRoaXMuX3Nob3dOdW07XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4IC09IGNvdW50O1xuICAgICAgICAgIHRoaXMucmVhbEluZGV4ID1cbiAgICAgICAgICAgIHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDFcbiAgICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgMCA8PSB0aGlzLmN1cnJlbnRJbmRleCAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8PSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDFcbiAgICAgICkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbmRleENoYW5nZWQuZW1pdCh7XG4gICAgICByZWFsSW5kZXg6IHRoaXMucmVhbEluZGV4LFxuICAgICAgY3VycmVudEluZGV4OiB0aGlzLmN1cnJlbnRJbmRleCxcbiAgICAgIHZpZXdTaXplOiB0aGlzLl9zaG93TnVtLFxuICAgIH0pO1xuICAgIHRoaXMuaXNGcm9tQXV0byA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9ncmVzc1dpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3JncmVzc1dpZHRoO1xuICB9XG4gIHB1YmxpYyBzZXQgcHJvZ3Jlc3NXaWR0aCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnByb2dyZXNzRWxtICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5fcG9yZ3Jlc3NXaWR0aCA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICh0aGlzLnByb2dyZXNzQ29udGFpbmVyRWxtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkcmVuWzBdLFxuICAgICAgICBcIndpZHRoXCIsXG4gICAgICAgIGAke3RoaXMucHJvZ3Jlc3NXaWR0aH0lYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdyYWJiaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9ncmFiYmluZztcbiAgfVxuICBwdWJsaWMgc2V0IGdyYWJiaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2dyYWJiaW5nICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9ncmFiYmluZyA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhbkNvdW50ID0gMDtcbiAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYmJpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQpIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgICAgYHRyYW5zbGF0ZVgoJHtcbiAgICAgICAgICAgICh2YWx1ZSArICh0aGlzLmN1cnJlbnRJbmRleCAhPT0gMCA/IHRoaXMucGFkZGluZyA6IDApKSAqXG4gICAgICAgICAgICAodGhpcy5hbGlnbiA9PT0gXCJyaWdodFwiID8gLTEgOiAxKVxuICAgICAgICAgIH1weClgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWV9JSlgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgICAgYHRyYW5zbGF0ZVkoJHtcbiAgICAgICAgICAgIHZhbHVlICsgKHRoaXMuY3VycmVudEluZGV4ICE9PSAwID8gdGhpcy5wYWRkaW5nIDogMClcbiAgICAgICAgICB9cHgpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgICBgdHJhbnNsYXRlWSgke3ZhbHVlfSUpYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1heFJpZ2h0SW5kZXgoKSB7XG4gICAgbGV0IGFkZEluZGV4ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMuYWxpZ24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEgLSB0aGlzLl9zaG93TnVtICsgMSArIGFkZEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcnVuTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRvcGxheSB8fCB0aGlzLmluZmluaXRlO1xuICB9XG4gIHByaXZhdGUgZ2V0IGxlbmd0aE9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggPT09IDE7XG4gIH1cblxuICBwcml2YXRlIGdldCByb290RWxtV2lkdGgoKSB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICAgID8gdGhpcy5yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICA6IDEwMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJvb3RFbG1IZWlnaHQoKSB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICAgID8gdGhpcy5yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgOiAxMDA7XG4gIH1cblxuICBwcml2YXRlIHNldCBjb250YWluZXJFbG1XaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwid2lkdGhcIiwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsbUhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lckVsbUhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJoZWlnaHRcIiwgdmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBpbmRleENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3N0YXJ0SW5kZXggPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHByaXZhdGUgZ2V0IHN0YXJ0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0SW5kZXg7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgc3RhcnRJbmRleCh2YWwpIHtcbiAgICB0aGlzLl9zdGFydEluZGV4ID0gdmFsO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5fc3RhcnRJbmRleDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJFbG1cIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oXCJ2aWV3QXJlYVwiKSBwdWJsaWMgdmlld0FyZWE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZChcInByZXZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5QcmV2OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibmV4dFwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGJ0bk5leHQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJwcm9ncmVzc1wiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzQ29udGFpbmVyRWxtOiBFbGVtZW50UmVmO1xuXG4gIC8vIGdldCBhbGwgaXRlbSBlbG1zXG4gIEBDb250ZW50Q2hpbGRyZW4oTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUsIHtcbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgICByZWFkOiBFbGVtZW50UmVmLFxuICB9KVxuICBwdWJsaWMgaXRlbUVsbXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxQcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudFByZXY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbE5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjb250ZW50TmV4dDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsRG90XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgZG90RWxtOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxJdGVtVGVtcGxhdGVcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjYXJvdXNlbEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0VsbTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwdWJsaWMgX2RhdGE6IGFueVtdO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgbWFwcGVkRGF0YTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIHdoZW4gaW5maW5pdGUgaXMgdHJ1ZSwgdGhlIGFuaW1hdGlvbiB0aW1lIHdpdGggaXRlbSwgZGVmYXVsdCBpcyA0MDAuICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlUaW1lID0gNDAwO1xuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCBpbiAjY29udGFpbmVyRWxtIHdoZW4gbW9kZWwgY2hhbmdlICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzcyA9IFwidHJhbnNpdGlvblwiO1xuXG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIHdoZW4gY2Fyb3VzZWwgYXV0byBwbGF5LFxuICAgKiB0aGlzIGRlZmF1bHQgYXV0b3BsYXkgYW5pbWF0aW9uIGlzIHNhbWUgYXMgYW5pQ2xhc3NcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzc0F1dG8gPSB0aGlzLmFuaUNsYXNzO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dChcInNob3ctbmV4dC1wcmV2LWJ1dHRvbnNcIikgcHVibGljIHNob3dCdXR0b25zTWV0aG9kOlxuICAgIHwgXCJhbHdheXNcIlxuICAgIHwgXCJhdXRvLWhpZGVcIlxuICAgIHwgXCJhdXRvLWRpc2FibGVcIiA9IFwiYWx3YXlzXCI7XG5cbiAgLyoqXG4gICAqIHVzZXIgbW92ZSBwaWN0dXJlIHdpdGggdGhlIGNvbnRhaW5lciB3aWR0aCByYXRlLFxuICAgKiB3aGVuIG1vcmUgdGhhbiB0aGF0IHJhdGUsIGl0IHdpbGwgZ28gdG8gbmV4dCBvciBwcmV2LFxuICAgKiBzZXQgZmFsc2Ugd2lsbCBuZXZlciBtb3ZlIHdpdGggZGlzdGFuY2UgcmF0ZSxcbiAgICogZGVmYXVsdCBpcyBgMC4xNWBcbiAgICovXG4gIEBJbnB1dChcInBhbi1ib3VuZGFyeVwiKSBwdWJsaWMgcGFuQm91bmRhcnk6IG51bWJlciB8IGZhbHNlID0gMC4xNTtcblxuICAvKiogd2hlbiBzaG93LW51bSBpcyBiaWdnZXIgdGhhbiAxLCB0aGUgZmlyc3QgaXRlbSBhbGlnbiwgZGVmYXVsdGUgaXMgYGNlbnRlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIGFsaWduOiBcImxlZnRcIiB8IFwiY2VudGVyXCIgfCBcInJpZ2h0XCIgfCBcInRvcFwiIHwgXCJib3R0b21cIiA9XG4gICAgXCJjZW50ZXJcIjtcblxuICAvKipcbiAgICogZGlzYWJsZSB3aGVuIGRyYWcgb2NjdXIgdGhlIGNoaWxkIGVsZW1lbnQgd2lsbCBmb2xsb3cgdG91Y2ggcG9pbnQuXG4gICAqIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KFwibm90LWZvbGxvdy1wYW5cIikgcHVibGljIG5vdERyYWcgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwdWJsaWMgdHJhY2tCeUtleSA9IFwiY29kZVwiO1xuICAvKipcbiAgICogdGhlIGV2ZW50IGJpbmRpbmcgc3RhdGUgZm9yIHN0b3AgYXV0byBwbGF5IHdoZW4gbW91cnNlIG1vdmVvdmVyXG4gICAqL1xuICBASW5wdXQoXCJtb3Vyc2UtZW5hYmxlXCIpIHB1YmxpYyBtb3Vyc2VFbmFibGUgPSBmYWxzZTtcbiAgLyoqIGVhY2ggYXV0byBwbGF5IGJldHdlZW4gdGltZSAqL1xuICBASW5wdXQoXCJiZXR3ZWVuLWRlbGF5XCIpIHB1YmxpYyBkZWxheSA9IDgwMDA7XG4gIC8qKiBhdXRvIHBsYXkgZGlyZWN0aW9uLCBkZWZhdWx0IGlzIGByaWdodGAuICovXG4gIEBJbnB1dChcImF1dG9wbGF5LWRpcmVjdGlvblwiKSBwdWJsaWMgZGlyZWN0aW9uOiBcImxlZnRcIiB8IFwicmlnaHRcIiA9IFwicmlnaHRcIjtcbiAgLyoqIGhvdyBtYW55IG51bWJlciB3aXRoIGVhY2ggc2Nyb2xsLCBkZWZhdWx0IGlzIGAxYC4gKi9cbiAgQElucHV0KFwic2Nyb2xsLW51bVwiKSBwdWJsaWMgc2Nyb2xsTnVtID0gMTtcbiAgLyoqIENvdWxkIHVzZXIgc2Nyb2xsIG1hbnkgaXRlbSBvbmNlLCBzaW11bGF0ZSB3aXRoIHNjcm9sbGJhciwgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRyYWctbWFueVwiKSBwdWJsaWMgaXNEcmFnTWFueSA9IGZhbHNlO1xuICAvKiogTWluaW1hbCB2ZWxvY2l0eSByZXF1aXJlZCBiZWZvcmUgcmVjb2duaXppbmcsIHVuaXQgaXMgaW4gcHggcGVyIG1zLCBkZWZhdWx0IGAwLjNgICovXG4gIEBJbnB1dChcInN3aXBlLXZlbG9jaXR5XCIpIHB1YmxpYyBzd2lwZVZlbG9jaXR5ID0gMC4zO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBpc1J0bCA9IGZhbHNlO1xuICAvKipcbiAgICogc3dpdGNoIHNob3cgbnVtYmVyIHdpdGggY3VzdG9tIGxvZ2ljIGxpa2UgY3NzIEBtZWRpYSAobWluLXdpZHRoOiBgbnVtYmVyYHB4KVxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGJyZWFrcG9pbnQ6IEFycmF5PHtcbiAgICBncmlkQnk/O1xuICAgIHNjcmVlblNpemU6IFwieHhsXCIgfCBcInhsXCIgfCBcImxnXCIgfCBcIm1kXCIgfCBcInNtXCIgfCBcInhzXCI7XG4gICAgbnVtYmVyO1xuICAgIHNjcm9sbE51bT87XG4gICAgcGFkZGluZz87XG4gIH0+ID0gW107XG5cbiAgQElucHV0KCkgcHVibGljIHNjcmVlblNpemVNYXAgPSB7XG4gICAgeHhsOiAxNDQwLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgeGw6IDEyMDAsXG4gICAgbGc6IDk5MixcbiAgICBtZDogNzY4LFxuICAgIHNtOiA1NzYsXG4gICAgeHM6IDAsXG4gIH07XG5cbiAgQElucHV0KCkgcGFkZGluZzogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgbGVhdmVPYnMkID0gbWVyZ2UoXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcIm1vdXNldXBcIiksXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcInRvdWNoZW5kXCIpXG4gICkucGlwZShcbiAgICB0YXAoKGU6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdyYWJiaW5nID0gZmFsc2U7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG5cbiAgcHJpdmF0ZSBpc0Zyb21BdXRvID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc0F1dG9OdW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZU9uQ29udGFpbmVyID0gZmFsc2U7XG4gIHByaXZhdGUgYWxpZ25EaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgZWxtV2lkdGggPSAwO1xuICBwcml2YXRlIGVsbUhlaWdodCA9IDA7XG5cbiAgcHJpdmF0ZSByb290RWxtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJFbG06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgZWxtczogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgaGFtbWVyO1xuXG4gIHByaXZhdGUgZG9OZXh0U3ViJDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRvTmV4dDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIHByaXZhdGUgcmVzdGFydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBzcGVlZENoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoNTAwMCk7XG4gIHByaXZhdGUgc3RvcEV2ZW50ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX3BvcmdyZXNzV2lkdGggPSAwO1xuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuICBwdWJsaWMgX3Nob3dOdW0gPSAxO1xuICBwcml2YXRlIF9hdXRvcGxheSA9IGZhbHNlO1xuICBwcml2YXRlIF9pbmZpbml0ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9ncmFiYmluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlRHJhZyA9IGZhbHNlO1xuICBwdWJsaWMgZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuXG4gIHByaXZhdGUgcGFuQ291bnQgPSAwO1xuXG4gIC8vIHRoaXMgdmFyaWFibGUgdXNlIGZvciBjaGVjayB0aGUgaW5pdCB2YWx1ZSBpcyB3cml0ZSB3aXRoIG5nTW9kZWwsXG4gIC8vIHdoZW4gaW5pdCBmaXJzdCwgbm90IHNldCB3aXRoIGFuaW1hdGlvblxuXG4gIHB1YmxpYyByZWFsSW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cbiAgcHVibGljIHdyYXBwZXJXaWR0aDtcblxuICBwdWJsaWMgc2luZ2xlVGltZVJ1biA9IHRydWU7XG4gIHByaXZhdGUgaW5pdGlhbEluZGV4ID0gMDtcbiAgcHVibGljIG9yaWdpbmFsRGF0YSA9IFtdO1xuXG4gIHByaXZhdGUgX2luZmluZURhdGFDb3VudCA9IDA7XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yb290RWxtID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsbSA9IHRoaXMucm9vdEVsbS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9ya0pvaW4oW1xuICAgICAgLi4udGhpcy5iaW5kQ2xpY2soKSxcbiAgICAgIC8vIHdoZW4gaXRlbSBjaGFuZ2VkLCByZW1vdmUgb2xkIGhhbW1lciBiaW5kaW5nLCBhbmQgcmVzZXQgd2lkdGhcbiAgICAgIHRoaXMuaXRlbUVsbXMuY2hhbmdlcy5waXBlKFxuICAgICAgICAvLyBkZXRlY3RDaGFuZ2VzIHRvIGNoYW5nZSB2aWV3IGRvdHNcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKSlcbiAgICAgICksXG4gICAgICByZXNpemVPYnNlcnZhYmxlKHRoaXMucm9vdEVsbSwgKCkgPT4gdGhpcy5jb250YWluZXJSZXNpemUoKSksXG4gICAgXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZhcmlhYmxlKCk7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgodHJ1ZSk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgfVxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAvKiBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnJ1bkxvb3ApIHtcbiAgICAgIHRoaXMuYWRkSW5maW5pdGVFbG0oKTtcbiAgICB9ICovXG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG5cbiAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0b3J5SGFtbWVyKCkge1xuICAgIGlmICh0aGlzLmhhbW1lcikge1xuICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udGFpbmVyUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4IHx8IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld1dpZHRoKGlzSW5pdD86IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICAgIHRoaXMuX3Nob3dOdW0gPSB0aGlzLmdldEF1dG9OdW0oKTtcbiAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgICAgdGhpcy5pbmZpbml0ZSA9XG4gICAgICAgIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubGVuZ3RoID4gdGhpcy5fc2hvd051bSA/IHRoaXMuaW5maW5pdGUgOiBmYWxzZTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJcIik7XG4gICAgICBpZiAoaXNJbml0KSB7XG4gICAgICAgIC8vIHJlbWFpbiBvbmUgZWxtIGhlaWdodFxuICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMuX2luZmluZURhdGFDb3VudCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZWxtV2lkdGggPVxuICAgICAgICB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkucm93KSAtXG4gICAgICAgICh0aGlzLnBhZGRpbmcgKiAyKSAvXG4gICAgICAgICAgKHRoaXMuZ3JpZEJ5LmNvbCA+IDFcbiAgICAgICAgICAgID8gdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICA6IHRoaXMuX3Nob3dOdW0gLyB0aGlzLmdyaWRCeS5yb3cpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyRWxtV2lkdGggPVxuICAgICAgICAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLnBhZGRpbmcgKiAyKSAqXG4gICAgICAgICh0aGlzLmVsbXMubGVuZ3RoIC8gdGhpcy5fc2hvd051bSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgICB0aGlzLnZpZXdBcmVhLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgICAgYHdpZHRoOiR7dGhpcy5yb290RWxtV2lkdGggLSB0aGlzLnBhZGRpbmcgKiAyfXB4YFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZWxtcy5mb3JFYWNoKChlbG06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoZWxtLCBcIndpZHRoXCIsIHRoaXMuZWxtV2lkdGgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0Vmlld0hlaWdodChpc0luaXQpO1xuICAgIH1cbiAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFZpZXdIZWlnaHQoaXNJbml0PzogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmlzQXV0b051bSkge1xuICAgICAgdGhpcy5fc2hvd051bSA9IHRoaXMuZ2V0QXV0b051bSgpO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLnN0YXJ0SW5kZXg7XG4gICAgfVxuICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgIHRoaXMuaW5maW5pdGUgPVxuICAgICAgdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGggPiB0aGlzLl9zaG93TnVtID8gdGhpcy5pbmZpbml0ZSA6IGZhbHNlO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJcIik7XG4gICAgaWYgKGlzSW5pdCkge1xuICAgICAgLy8gcmVtYWluIG9uZSBlbG0gaGVpZ2h0XG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMuX2luZmluZURhdGFDb3VudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZWxtV2lkdGggPVxuICAgICAgdGhpcy5yb290RWxtSGVpZ2h0IC8gKHRoaXMuX3Nob3dOdW0gLyB0aGlzLmdyaWRCeS5yb3cpIC1cbiAgICAgICh0aGlzLnBhZGRpbmcgKiAyKSAvXG4gICAgICAgICh0aGlzLmdyaWRCeS5jb2wgPiAxXG4gICAgICAgICAgPyB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICA6IHRoaXMuX3Nob3dOdW0gLyB0aGlzLmdyaWRCeS5yb3cpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICApO1xuXG4gICAgdGhpcy5jb250YWluZXJFbG1XaWR0aCA9XG4gICAgICAodGhpcy5yb290RWxtSGVpZ2h0IC0gdGhpcy5wYWRkaW5nICogMikgKlxuICAgICAgKHRoaXMuZWxtcy5sZW5ndGggLyB0aGlzLl9zaG93TnVtKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgdGhpcy52aWV3QXJlYS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIGBoZWlnaHQ6JHt0aGlzLnJvb3RFbG1IZWlnaHQgLSB0aGlzLnBhZGRpbmcgKiAyfXB4YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxtcy5mb3JFYWNoKChlbG06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFN0eWxlKGVsbSwgXCJoZWlnaHRcIiwgdGhpcy5lbG1XaWR0aCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGJpbmRIYW1tZXIoKSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG0gPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5jb250YWluZXJFbG0pO1xuXG4gICAgICBjb25zdCBwYW4gPSBuZXcgSGFtbWVyLlBhbih7XG4gICAgICAgIGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICB9KTtcblxuICAgICAgaG0uYWRkKHBhbik7XG5cbiAgICAgIGhtLm9uKFwicGFubGVmdCBwYW5yaWdodCBwYW5lbmQgcGFuY2FuY2VsXCIsIChlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aE9uZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFdmVudC5uZXh0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJwYW5sZWZ0XCI6XG4gICAgICAgICAgY2FzZSBcInBhbnJpZ2h0XCI6XG4gICAgICAgICAgICB0aGlzLnBhbkNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5wYW5Db3VudCA8IDIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmdyYWJiaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWduICE9PSBcImNlbnRlclwiICYmIHRoaXMuc2hvd051bSA+PSB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHRoaXMub3V0T2ZCb3VuZChlLnR5cGUpKSB7XG4gICAgICAgICAgICAgIHRoaXMudmVydGljYWxNb2RlRW5hYmxlZCA/IGUuZGVsdGFZIDogKGUuZGVsdGFYICo9IDAuMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ub3REcmFnKSB7XG4gICAgICAgICAgICAgIHRoaXMubGVmdCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuY3VycmVudEluZGV4ICogdGhpcy5lbG1XaWR0aCArXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlICtcbiAgICAgICAgICAgICAgICAodGhpcy52ZXJ0aWNhbE1vZGVFbmFibGVkXG4gICAgICAgICAgICAgICAgICA/IGUuZGVsdGFZXG4gICAgICAgICAgICAgICAgICA6IHRoaXMuYWxpZ24gPT09IFwicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgPyAtZS5kZWx0YVhcbiAgICAgICAgICAgICAgICAgIDogZS5kZWx0YVgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEcmFnTWFueSkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy52ZXJ0aWNhbE1vZGVFbmFibGVkID8gZS5kZWx0YVkgOiBlLmRlbHRhWCkgPlxuICAgICAgICAgICAgICAgIHRoaXMuZWxtV2lkdGggKiAwLjVcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQgPyBlLmRlbHRhWSA6IGUuZGVsdGFYKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWduID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhbmNhbmNlbFwiOlxuICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJwYW5lbmRcIjpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy52ZXJ0aWNhbE1vZGVFbmFibGVkID8gZS5kZWx0YVkgOiBlLmRlbHRhWCkgPlxuICAgICAgICAgICAgICAgIHRoaXMuZWxtV2lkdGggKiB0aGlzLnBhbkJvdW5kYXJ5XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgbW92ZU51bSA9IHRoaXMuaXNEcmFnTWFueVxuICAgICAgICAgICAgICAgID8gTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQgPyBlLmRlbHRhWSA6IGUuZGVsdGFYKSAvXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1XaWR0aFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxOdW07XG5cbiAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSBtb3ZlTnVtO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIG1vdmVOdW07XG5cbiAgICAgICAgICAgICAgaWYgKCh0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQgPyBlLmRlbHRhWSA6IGUuZGVsdGFYKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduID09PSBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5nb05leHQobmV4dEluZGV4KVxuICAgICAgICAgICAgICAgICAgOiB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24gPT09IFwicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgPyB0aGlzLmdvUHJldihwcmV2SW5kZXgpXG4gICAgICAgICAgICAgICAgICA6IHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5hbGlnbiA9PT0gXCJyaWdodFwiXG4gICAgICAgICAgICAgICAgPyB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmFsaWduID09PSBcInJpZ2h0XCJcbiAgICAgICAgICAgICAgICA/IHRoaXMuZ29OZXh0KHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5zY3JvbGxOdW0pXG4gICAgICAgICAgICAgICAgOiB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAodGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW0pKVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5idG5QcmV2Lm5hdGl2ZUVsZW1lbnQsIFwiY2xpY2tcIikucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGNhbGxSZXN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLm1vdXNlT25Db250YWluZXIgJiYgIXRoaXMuZ3JhYmJpbmcpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3RhcnQubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd1ZpZXcoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBpc0FuaW1hdGlvbiA9IHRydWUsXG4gICAgaXNGcm9tQXV0byA9IHRoaXMuaXNGcm9tQXV0b1xuICApIHtcbiAgICBpZiAodGhpcy5lbG1zLmxlbmd0aCA+IDEgJiYgdGhpcy5lbG1zLmxlbmd0aCA+IHRoaXMuX3Nob3dOdW0pIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5sZWZ0ID0gLWluZGV4ICogdGhpcy5lbG1XaWR0aCArIHRoaXMuYWxpZ25EaXN0YW5jZTtcblxuICAgICAgaWYgKGlzQW5pbWF0aW9uKSB7XG4gICAgICAgIGlmIChpc0Zyb21BdXRvKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3NBdXRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5hbGlnbkRpc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzcyk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3NBdXRvKTtcbiAgfVxuXG4gIHByaXZhdGUgb3V0T2ZCb3VuZCh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwicGFubGVmdFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5tYXhSaWdodEluZGV4O1xuICAgICAgY2FzZSBcInBhbnJpZ2h0XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA8PSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuUHJvZ3Jlc3MoYmV0d2VlblRpbWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGhvd1RpbWVzID0gdGhpcy5zcGVlZCAvIGJldHdlZW5UaW1lO1xuICAgICAgY29uc3QgZXZlcnlJbmNyZWFzZSA9ICgxMDAgLyB0aGlzLnNwZWVkKSAqIGJldHdlZW5UaW1lO1xuICAgICAgcmV0dXJuIGludGVydmFsKGJldHdlZW5UaW1lKS5waXBlKFxuICAgICAgICB0YXAoKHQpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAodCAlIGhvd1RpbWVzKSAqIGV2ZXJ5SW5jcmVhc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBidWZmZXJDb3VudChNYXRoLnJvdW5kKGhvd1RpbWVzKSwgMClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBpbml0RGF0YShzaG93TnVtKSB7XG4gICAgaWYgKCF0aGlzLm9yaWdpbmFsRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub3JpZ2luYWxEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgIHRoaXMuc2luZ2xlVGltZVJ1biA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheUNyZWF0b3IodGhpcy5vcmlnaW5hbERhdGEsIHNob3dOdW0pO1xuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gc2hvd051bTtcbiAgICAgIHRoaXMuaW5pdGlhbEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdXRvTnVtKCkge1xuICAgIGNvbnN0IGN1cnJXaWR0aCA9IHRoaXMucm9vdEVsbVdpZHRoO1xuICAgIGlmICh0aGlzLmJyZWFrcG9pbnQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgbm93ID0gdGhpcy5icmVha3BvaW50LmZpbmQoKGIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NyZWVuU2l6ZU1hcFtiLnNjcmVlblNpemVdIDw9IGN1cnJXaWR0aDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5vdykge1xuICAgICAgICB0aGlzLnBhZGRpbmcgPSBub3cucGFkZGluZyB8fCB0aGlzLnBhZGRpbmc7XG4gICAgICAgIGlmIChub3cuZ3JpZEJ5KSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuZ3JpZEJ5LmNvbCB8fCBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSBub3cuZ3JpZEJ5O1xuICAgICAgICAgIGNvbnN0IHNob3dOdW0gPSBub3cuZ3JpZEJ5LmNvbCAqIG5vdy5ncmlkQnkucm93IHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHNob3dOdW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSB7IGNvbDogbm93Lm51bWJlciwgcm93OiAxIH07XG4gICAgICAgICAgcmV0dXJuIG5vdy5udW1iZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucGFkZGluZyA9XG4gICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ucGFkZGluZyB8fCB0aGlzLnBhZGRpbmc7XG4gICAgICBpZiAodGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LmNvbCB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnk7XG4gICAgICAgIGNvbnN0IHNob3dOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LmNvbCAqXG4gICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5yb3cgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgcmV0dXJuIHNob3dOdW07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNjcm9sbE51bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5zY3JvbGxOdW0gfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgdGhpcy5ncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG4gICAgICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpbml0TnVtID0gMztcbiAgICBpZiAoY3VycldpZHRoID4gMjAwKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihpbml0TnVtICsgY3VycldpZHRoIC8gMTAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5pdE51bTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3R5bGUoZWxtOiBIVE1MRWxlbWVudCwgc3R5bGU6IHN0cmluZywgdmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbG0sIHN0eWxlLCBgJHt2YWx1ZX1weGApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbG0sIHN0eWxlLCBgJHt2YWx1ZX0lYCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRyYWNrQnlGY24oaW5kZXgsIGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0gfHwgaXRlbVt0aGlzLnRyYWNrQnlLZXldKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1bdGhpcy50cmFja0J5S2V5XTtcbiAgfVxuXG4gIHB1YmxpYyBhcnJheUNyZWF0b3IoYXJyLCBjb3VudCkge1xuICAgIGNvbnN0IGRhdGEgPSBbLi4uYXJyXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGRhdGEudW5zaGlmdChhcnJbYXJyLmxlbmd0aCAtIDEgLSAoaSAlIGFyci5sZW5ndGgpXSk7XG4gICAgICBkYXRhLnB1c2goYXJyW2kgJSBhcnIubGVuZ3RoXSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iXX0=