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
                if (!this.itemElms ||
                    (!this.runLoop && !(0 <= value && value <= this.itemElms.length - 1))) {
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
                        this.realIndex = this.elms.length;
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
            if (isPlatformBrowser(this.platformId)) {
                this._renderer.setStyle(this.containerElm, "transform", "translateX(" + (value + (this.currentIndex !== 0 ? this.padding : 0)) + "px)");
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
            return isPlatformBrowser(this.platformId)
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
            this.currentIndex = this.startIndex;
        }
        this._infineDataCount = this._showNum * 2;
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
            (this.elmWidth / this.gridBy.col) * this.elms.length;
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
        if (!this.orginalData.length) {
            this.orginalData = tslib_1.__spread(this.data);
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
                    this.gridBy = { col: 1, row: 1 };
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
                    template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li\n        *ngIf=\"\n          (i + gridBy.col * gridBy.row) % (scrollNum * gridBy.row) === 0 &&\n          i + gridBy.col * gridBy.row < itemElms.length + scrollNum\n        \"\n        (click)=\"currentIndex = i\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
        breakpoint: [{ type: Input }],
        screenSizeMap: [{ type: Input }],
        padding: [{ type: Input }]
    };
    return NgxAdvancedCarouselComponent;
}());
export { NgxAdvancedCarouselComponent };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBRVYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBRVosaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLEtBQUssRUFFTCxFQUFFLEVBQ0YsT0FBTyxFQUVQLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDtJQTRURSxzQ0FDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFDYixHQUFzQjtRQUxoQyxpQkFNSTtRQUwy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SUFDN0IsOENBQW1DOzs7OztJQUVuQyxnREFBcUI7O0lBS3JCLGlEQUFzQzs7SUFFdEMsb0RBQW9COztJQUVwQixxREFBNEI7Ozs7O0lBQzVCLG9EQUF5Qjs7SUFDekIsbURBQXdCOzs7OztJQUV4Qix3REFBNkI7Ozs7O0lBaUQ3QixnREFBa0M7Ozs7O0lBQ2xDLGlEQUE2Qjs7Ozs7SUFsTjNCLGtEQUE0Qzs7Ozs7SUFDNUMsaURBQW1DOzs7OztJQUNuQyxpREFBNEI7Ozs7O0lBQzVCLDZDQUFxQjs7Ozs7SUFDckIsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZm9ya0pvaW4sXG4gIGZyb21FdmVudCxcbiAgaW50ZXJ2YWwsXG4gIG1lcmdlLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIGJ1ZmZlckNvdW50LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YWtlVW50aWwsXG4gIHRhcCxcbn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSB9IGZyb20gXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC1pdGVtLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgcmVzaXplT2JzZXJ2YWJsZSB9IGZyb20gXCIuL3J4anMub2JzZXJ2YWJsZS5yZXNpemVcIjtcbmRlY2xhcmUgdmFyIEhhbW1lcjtcbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuc2Nzc1wiXSxcbiAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWUpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gIH1cbiAgLyoqIGRpc2FibGUgZHJhZyBldmVudCB3aXRoIHRvdWNoIGFuZCBtb3VzZSBwYW4gbW92aW5nLCBkZWZhdWx0IGlzIGBmYWxzZWAgKi9cbiAgQElucHV0KFwiZGlzYWJsZS1kcmFnXCIpXG4gIHB1YmxpYyBnZXQgZGlzYWJsZURyYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVEcmFnO1xuICB9XG4gIHB1YmxpYyBzZXQgZGlzYWJsZURyYWcodmFsdWUpIHtcbiAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZURyYWcgIT09IHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGlzYWJsZURyYWcgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBpcyB0aGUgY2Fyb3VzZWwgY2FuIG1vdmUgaW5maW5pdGUgKi9cbiAgQElucHV0KFwiaW5maW5pdGVcIilcbiAgcHVibGljIGdldCBpbmZpbml0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5maW5pdGU7XG4gIH1cbiAgcHVibGljIHNldCBpbmZpbml0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2luZmluaXRlID0gdmFsdWU7XG5cbiAgICAvKiB0aGlzLmluZmluaXRlRWxtUmVmcy5mb3JFYWNoKChyZWYpID0+IHtcbiAgICAgIHRoaXMuYWRkU3R5bGUocmVmLnJvb3ROb2Rlc1swXSwge1xuICAgICAgICB2aXNpYmlsaXR5OiB0aGlzLnJ1bkxvb3AgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIH0pO1xuICAgIH0pOyAqL1xuICB9XG5cbiAgLyoqIGF1dG8gcGxheSBzcGVlZCAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1zcGVlZFwiKVxuICBwdWJsaWMgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLnNwZWVkQ2hhbmdlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3BlZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaG93IG1hbnkgbnVtYmVyIGl0ZW1zIHRvIHNob3cgb25jZSwgZGVmYXVsdCBpcyBgMWBcbiAgICogc2V0IGBhdXRvYCB0byB1c2luZyBgW2JyZWFrcG9pbnRdYCBzZXQgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoXCJzaG93LW51bVwiKVxuICBwdWJsaWMgZ2V0IHNob3dOdW0oKTogbnVtYmVyIHwgXCJhdXRvXCIge1xuICAgIHJldHVybiB0aGlzLl9zaG93TnVtO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd051bSh2YWx1ZTogbnVtYmVyIHwgXCJhdXRvXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmlzQXV0b051bSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSArdmFsdWU7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICB9XG4gIH1cblxuICAvKiogY2Fyb3VzZWwgYXV0byBwbGF5IGNvbmZpbmcgKi9cbiAgQElucHV0KFwiYXV0b3BsYXlcIilcbiAgcHVibGljIGdldCBhdXRvcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b3BsYXk7XG4gIH1cbiAgcHVibGljIHNldCBhdXRvcGxheSh2YWx1ZSkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDA7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkID0gdGhpcy5kb05leHQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuZG9OZXh0U3ViJCkge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2F1dG9wbGF5ID0gdmFsdWU7XG4gICAgLy8gaWYgc2V0IGF1dG9wbGF5LCB0aGVuIHRoZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmluZmluaXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudEluZGV4KHZhbHVlKSB7XG4gICAgLy8gaWYgbm93IGluZGV4IGlmIG5vdCBlcXVhbGUgdG8gc2F2ZSBpbmRleCwgZG8gc29tZXRpbmdcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggIT09IHZhbHVlKSB7XG4gICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgbm90IGNvbnRhaW4gd2l0aCB0aGUgYm91bmRhcnkgbm90IGhhbmRsZXJ3XG4gICAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIHZhbHVlID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMuaXRlbUVsbXMgfHxcbiAgICAgICAgKCF0aGlzLnJ1bkxvb3AgJiYgISgwIDw9IHZhbHVlICYmIHZhbHVlIDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLmlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIGlmICghdGhpcy5pbmZpbml0ZSAmJiB0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZWxtcy5sZW5ndGg7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbCA8XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gLVxuICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2w7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtIDwgMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogdGhpcy5lbG1zLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPCAwICYmICF0aGlzLmluZmluaXRlID8gMCA6IHRoaXMuY3VycmVudEluZGV4O1xuICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmluaXRpYWxJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gKiA0ICsgdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogMikge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLmRhdGEubGVuZ3RoICsgdGhpcy5fc2hvd051bSAqIDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGltZXIodGhpcy5hbmlUaW1lICsgMTAwKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgKHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGNvdW50ID0gKHRoaXMucmVhbEluZGV4IC0gdGhpcy5lbG1zLmxlbmd0aCkgJSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCAtPSBjb3VudDtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIDAgPD0gdGhpcy5jdXJyZW50SW5kZXggJiZcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5kZXhDaGFuZ2VkLmVtaXQoe1xuICAgICAgcmVhbEluZGV4OiB0aGlzLnJlYWxJbmRleCxcbiAgICAgIGN1cnJlbnRJbmRleDogdGhpcy5jdXJyZW50SW5kZXgsXG4gICAgICB2aWV3U2l6ZTogdGhpcy5fc2hvd051bSxcbiAgICB9KTtcbiAgICB0aGlzLmlzRnJvbUF1dG8gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvZ3Jlc3NXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9yZ3Jlc3NXaWR0aDtcbiAgfVxuICBwdWJsaWMgc2V0IHByb2dyZXNzV2lkdGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5wcm9ncmVzc0VsbSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuX3BvcmdyZXNzV2lkdGggPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAodGhpcy5wcm9ncmVzc0NvbnRhaW5lckVsbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jaGlsZHJlblswXSxcbiAgICAgICAgXCJ3aWR0aFwiLFxuICAgICAgICBgJHt0aGlzLnByb2dyZXNzV2lkdGh9JWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBncmFiYmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JhYmJpbmc7XG4gIH1cbiAgcHVibGljIHNldCBncmFiYmluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9ncmFiYmluZyAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZ3JhYmJpbmcgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYmJpbmdcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYW5Db3VudCA9IDA7XG4gICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWUgKyAodGhpcy5jdXJyZW50SW5kZXggIT09IDAgPyB0aGlzLnBhZGRpbmcgOiAwKX1weClgXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWV9JSlgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1heFJpZ2h0SW5kZXgoKSB7XG4gICAgbGV0IGFkZEluZGV4ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMuYWxpZ24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAodGhpcy5zaG93TnVtIGFzIG51bWJlcikgLSAxO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSAtIHRoaXMuX3Nob3dOdW0gKyAxICsgYWRkSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGdldCBydW5Mb29wKCkge1xuICAgIHJldHVybiB0aGlzLmF1dG9wbGF5IHx8IHRoaXMuaW5maW5pdGU7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgbGVuZ3RoT25lKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCA9PT0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJvb3RFbG1XaWR0aCgpIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKVxuICAgICAgPyB0aGlzLnJvb3RFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgIDogMTAwO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgY29udGFpbmVyRWxtV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwid2lkdGhcIiwgdmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBpbmRleENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3N0YXJ0SW5kZXggPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHByaXZhdGUgZ2V0IHN0YXJ0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0SW5kZXg7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgc3RhcnRJbmRleCh2YWwpIHtcbiAgICB0aGlzLl9zdGFydEluZGV4ID0gdmFsO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5fc3RhcnRJbmRleDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJFbG1cIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oXCJ2aWV3QXJlYVwiKSBwdWJsaWMgdmlld0FyZWE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZChcInByZXZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5QcmV2OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibmV4dFwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGJ0bk5leHQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJwcm9ncmVzc1wiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzQ29udGFpbmVyRWxtOiBFbGVtZW50UmVmO1xuXG4gIC8vIGdldCBhbGwgaXRlbSBlbG1zXG4gIEBDb250ZW50Q2hpbGRyZW4oTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUsIHtcbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgICByZWFkOiBFbGVtZW50UmVmLFxuICB9KVxuICBwdWJsaWMgaXRlbUVsbXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxQcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudFByZXY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbE5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjb250ZW50TmV4dDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsRG90XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgZG90RWxtOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxJdGVtVGVtcGxhdGVcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjYXJvdXNlbEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0VsbTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwdWJsaWMgX2RhdGE6IGFueVtdO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgbWFwcGVkRGF0YTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIHdoZW4gaW5maW5pdGUgaXMgdHJ1ZSwgdGhlIGFuaW1hdGlvbiB0aW1lIHdpdGggaXRlbSwgZGVmYXVsdCBpcyA0MDAuICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlUaW1lID0gNDAwO1xuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCBpbiAjY29udGFpbmVyRWxtIHdoZW4gbW9kZWwgY2hhbmdlICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzcyA9IFwidHJhbnNpdGlvblwiO1xuXG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIHdoZW4gY2Fyb3VzZWwgYXV0byBwbGF5LFxuICAgKiB0aGlzIGRlZmF1bHQgYXV0b3BsYXkgYW5pbWF0aW9uIGlzIHNhbWUgYXMgYW5pQ2xhc3NcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzc0F1dG8gPSB0aGlzLmFuaUNsYXNzO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dChcInNob3ctbmV4dC1wcmV2LWJ1dHRvbnNcIikgcHVibGljIHNob3dCdXR0b25zTWV0aG9kOlxuICAgIHwgXCJhbHdheXNcIlxuICAgIHwgXCJhdXRvLWhpZGVcIlxuICAgIHwgXCJhdXRvLWRpc2FibGVcIiA9IFwiYWx3YXlzXCI7XG5cbiAgLyoqXG4gICAqIHVzZXIgbW92ZSBwaWN0dXJlIHdpdGggdGhlIGNvbnRhaW5lciB3aWR0aCByYXRlLFxuICAgKiB3aGVuIG1vcmUgdGhhbiB0aGF0IHJhdGUsIGl0IHdpbGwgZ28gdG8gbmV4dCBvciBwcmV2LFxuICAgKiBzZXQgZmFsc2Ugd2lsbCBuZXZlciBtb3ZlIHdpdGggZGlzdGFuY2UgcmF0ZSxcbiAgICogZGVmYXVsdCBpcyBgMC4xNWBcbiAgICovXG4gIEBJbnB1dChcInBhbi1ib3VuZGFyeVwiKSBwdWJsaWMgcGFuQm91bmRhcnk6IG51bWJlciB8IGZhbHNlID0gMC4xNTtcblxuICAvKiogd2hlbiBzaG93LW51bSBpcyBiaWdnZXIgdGhhbiAxLCB0aGUgZmlyc3QgaXRlbSBhbGlnbiwgZGVmYXVsdGUgaXMgYGNlbnRlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIGFsaWduOiBcImxlZnRcIiB8IFwiY2VudGVyXCIgfCBcInJpZ2h0XCIgPSBcImNlbnRlclwiO1xuXG4gIC8qKlxuICAgKiBkaXNhYmxlIHdoZW4gZHJhZyBvY2N1ciB0aGUgY2hpbGQgZWxlbWVudCB3aWxsIGZvbGxvdyB0b3VjaCBwb2ludC5cbiAgICogZGVmYXVsdCBpcyBgZmFsc2VgXG4gICAqL1xuICBASW5wdXQoXCJub3QtZm9sbG93LXBhblwiKSBwdWJsaWMgbm90RHJhZyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFja0J5S2V5ID0gXCJjb2RlXCI7XG4gIC8qKlxuICAgKiB0aGUgZXZlbnQgYmluZGluZyBzdGF0ZSBmb3Igc3RvcCBhdXRvIHBsYXkgd2hlbiBtb3Vyc2UgbW92ZW92ZXJcbiAgICovXG4gIEBJbnB1dChcIm1vdXJzZS1lbmFibGVcIikgcHVibGljIG1vdXJzZUVuYWJsZSA9IGZhbHNlO1xuICAvKiogZWFjaCBhdXRvIHBsYXkgYmV0d2VlbiB0aW1lICovXG4gIEBJbnB1dChcImJldHdlZW4tZGVsYXlcIikgcHVibGljIGRlbGF5ID0gODAwMDtcbiAgLyoqIGF1dG8gcGxheSBkaXJlY3Rpb24sIGRlZmF1bHQgaXMgYHJpZ2h0YC4gKi9cbiAgQElucHV0KFwiYXV0b3BsYXktZGlyZWN0aW9uXCIpIHB1YmxpYyBkaXJlY3Rpb246IFwibGVmdFwiIHwgXCJyaWdodFwiID0gXCJyaWdodFwiO1xuICAvKiogaG93IG1hbnkgbnVtYmVyIHdpdGggZWFjaCBzY3JvbGwsIGRlZmF1bHQgaXMgYDFgLiAqL1xuICBASW5wdXQoXCJzY3JvbGwtbnVtXCIpIHB1YmxpYyBzY3JvbGxOdW0gPSAxO1xuICAvKiogQ291bGQgdXNlciBzY3JvbGwgbWFueSBpdGVtIG9uY2UsIHNpbXVsYXRlIHdpdGggc2Nyb2xsYmFyLCBkZWZhdWx0IGlzIGBmYWxzZWAgKi9cbiAgQElucHV0KFwiZHJhZy1tYW55XCIpIHB1YmxpYyBpc0RyYWdNYW55ID0gZmFsc2U7XG4gIC8qKiBNaW5pbWFsIHZlbG9jaXR5IHJlcXVpcmVkIGJlZm9yZSByZWNvZ25pemluZywgdW5pdCBpcyBpbiBweCBwZXIgbXMsIGRlZmF1bHQgYDAuM2AgKi9cbiAgQElucHV0KFwic3dpcGUtdmVsb2NpdHlcIikgcHVibGljIHN3aXBlVmVsb2NpdHkgPSAwLjM7XG5cbiAgLyoqXG4gICAqIHN3aXRjaCBzaG93IG51bWJlciB3aXRoIGN1c3RvbSBsb2dpYyBsaWtlIGNzcyBAbWVkaWEgKG1pbi13aWR0aDogYG51bWJlcmBweClcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBicmVha3BvaW50OiBBcnJheTx7XG4gICAgZ3JpZEJ5PztcbiAgICBzY3JlZW5TaXplOiBcInh4bFwiIHwgXCJ4bFwiIHwgXCJsZ1wiIHwgXCJtZFwiIHwgXCJzbVwiIHwgXCJ4c1wiO1xuICAgIG51bWJlcjtcbiAgICBzY3JvbGxOdW0/O1xuICAgIHBhZGRpbmc/O1xuICB9PiA9IFtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBzY3JlZW5TaXplTWFwID0ge1xuICAgIHh4bDogMTQ0MCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgIHhsOiAxMjAwLFxuICAgIGxnOiA5OTIsXG4gICAgbWQ6IDc2OCxcbiAgICBzbTogNTc2LFxuICAgIHhzOiAwLFxuICB9O1xuXG4gIEBJbnB1dCgpIHBhZGRpbmc6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGxlYXZlT2JzJCA9IG1lcmdlKFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJtb3VzZXVwXCIpLFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJ0b3VjaGVuZFwiKVxuICApLnBpcGUoXG4gICAgdGFwKChlOiBFdmVudCkgPT4ge1xuICAgICAgdGhpcy5ncmFiYmluZyA9IGZhbHNlO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICApO1xuXG4gIHByaXZhdGUgaXNGcm9tQXV0byA9IHRydWU7XG4gIHByaXZhdGUgaXNBdXRvTnVtID0gZmFsc2U7XG4gIHByaXZhdGUgbW91c2VPbkNvbnRhaW5lciA9IGZhbHNlO1xuICBwcml2YXRlIGFsaWduRGlzdGFuY2UgPSAwO1xuICBwcml2YXRlIGVsbVdpZHRoID0gMDtcblxuICBwcml2YXRlIHJvb3RFbG06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGNvbnRhaW5lckVsbTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBlbG1zOiBBcnJheTxIVE1MRWxlbWVudD47XG5cbiAgcHJpdmF0ZSBoYW1tZXI7XG5cbiAgcHJpdmF0ZSBkb05leHRTdWIkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZG9OZXh0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSByZXN0YXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIHNwZWVkQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdCg1MDAwKTtcbiAgcHJpdmF0ZSBzdG9wRXZlbnQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcG9yZ3Jlc3NXaWR0aCA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRJbmRleCA9IDA7XG4gIHB1YmxpYyBfc2hvd051bSA9IDE7XG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgX2luZmluaXRlID0gZmFsc2U7XG4gIHByaXZhdGUgX2dyYWJiaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVEcmFnID0gZmFsc2U7XG4gIHB1YmxpYyBncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG5cbiAgcHJpdmF0ZSBwYW5Db3VudCA9IDA7XG5cbiAgLy8gdGhpcyB2YXJpYWJsZSB1c2UgZm9yIGNoZWNrIHRoZSBpbml0IHZhbHVlIGlzIHdyaXRlIHdpdGggbmdNb2RlbCxcbiAgLy8gd2hlbiBpbml0IGZpcnN0LCBub3Qgc2V0IHdpdGggYW5pbWF0aW9uXG5cbiAgcHVibGljIHJlYWxJbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuICBwdWJsaWMgd3JhcHBlcldpZHRoO1xuXG4gIHB1YmxpYyBzaW5nbGVUaW1lUnVuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpbml0aWFsSW5kZXggPSAwO1xuICBwdWJsaWMgb3JnaW5hbERhdGEgPSBbXTtcblxuICBwcml2YXRlIF9pbmZpbmVEYXRhQ291bnQgPSAwO1xuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucm9vdEVsbSA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbG0gPSB0aGlzLnJvb3RFbG0uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIGZvcmtKb2luKFtcbiAgICAgIC4uLnRoaXMuYmluZENsaWNrKCksXG4gICAgICAvLyB3aGVuIGl0ZW0gY2hhbmdlZCwgcmVtb3ZlIG9sZCBoYW1tZXIgYmluZGluZywgYW5kIHJlc2V0IHdpZHRoXG4gICAgICB0aGlzLml0ZW1FbG1zLmNoYW5nZXMucGlwZShcbiAgICAgICAgLy8gZGV0ZWN0Q2hhbmdlcyB0byBjaGFuZ2UgdmlldyBkb3RzXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyBpIGNhbid0IHBhc3MgdGhlIGNoYW5nZWRldGVjdGlvbiBjaGVjaywgb25seSB0aGUgd2F5IHRvIHVzaW5nIHRpbWVvdXQuIDooXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgfSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCkpXG4gICAgICApLFxuICAgICAgcmVzaXplT2JzZXJ2YWJsZSh0aGlzLnJvb3RFbG0sICgpID0+IHRoaXMuY29udGFpbmVyUmVzaXplKCkpLFxuICAgIF0pXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLmluaXRWYXJpYWJsZSgpO1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKHRydWUpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVEcmFnKSB7XG4gICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLnN0YXJ0SW5kZXg7XG4gICAgLyogaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5ydW5Mb29wKSB7XG4gICAgICB0aGlzLmFkZEluZmluaXRlRWxtKCk7XG4gICAgfSAqL1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuXG4gICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVzdG9yeUhhbW1lcigpIHtcbiAgICBpZiAodGhpcy5oYW1tZXIpIHtcbiAgICAgIHRoaXMuaGFtbWVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnRhaW5lclJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldFZpZXdXaWR0aCgpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleCB8fCB0aGlzLmluaXRpYWxJbmRleDtcblxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFZhcmlhYmxlKCkge1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5lbG1zID0gdGhpcy5pdGVtRWxtcy50b0FycmF5KCkubWFwKCh4KSA9PiB4Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICBsZXQgc3RhcnRFdmVudCA9IHRoaXMucmVzdGFydC5hc09ic2VydmFibGUoKTtcbiAgICAgIGxldCBzdG9wRXZlbnQgPSB0aGlzLnN0b3BFdmVudC5hc09ic2VydmFibGUoKTtcbiAgICAgIGlmICh0aGlzLm1vdXJzZUVuYWJsZSkge1xuICAgICAgICBzdGFydEV2ZW50ID0gbWVyZ2UoXG4gICAgICAgICAgc3RhcnRFdmVudCxcbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5jb250YWluZXJFbG0sIFwibW91c2VsZWF2ZVwiKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmdyYWJiaW5nKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiAodGhpcy5tb3VzZU9uQ29udGFpbmVyID0gZmFsc2UpKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgc3RvcEV2ZW50ID0gbWVyZ2UoXG4gICAgICAgICAgc3RvcEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZW92ZXJcIikucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiAodGhpcy5tb3VzZU9uQ29udGFpbmVyID0gdHJ1ZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRvTmV4dCA9IHN0YXJ0RXZlbnQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuc3BlZWRDaGFuZ2UpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICB0aW1lcih0aGlzLmRlbGF5KS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMucnVuUHJvZ3Jlc3MoMjApKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNGcm9tQXV0byA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YWtlVW50aWwoc3RvcEV2ZW50LnBpcGUodGFwKCgpID0+ICh0aGlzLnByb2dyZXNzV2lkdGggPSAwKSkpKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgdGhpcy5kb05leHRTdWIkID0gdGhpcy5kb05leHQuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlU2V0QWxpZ25EaXN0YW5jZSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuYWxpZ24pIHtcbiAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gKHRoaXMucm9vdEVsbVdpZHRoIC0gdGhpcy5lbG1XaWR0aCkgLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9IHRoaXMucm9vdEVsbVdpZHRoIC0gdGhpcy5lbG1XaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaWV3V2lkdGgoaXNJbml0PzogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmlzQXV0b051bSkge1xuICAgICAgdGhpcy5fc2hvd051bSA9IHRoaXMuZ2V0QXV0b051bSgpO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLnN0YXJ0SW5kZXg7XG4gICAgfVxuICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJcIik7XG4gICAgaWYgKGlzSW5pdCkge1xuICAgICAgLy8gcmVtYWluIG9uZSBlbG0gaGVpZ2h0XG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMuX2luZmluZURhdGFDb3VudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZWxtV2lkdGggPVxuICAgICAgdGhpcy5yb290RWxtV2lkdGggLyAodGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdykgLVxuICAgICAgKHRoaXMucGFkZGluZyAqIDIpIC9cbiAgICAgICAgKHRoaXMuZ3JpZEJ5LmNvbCA+IDFcbiAgICAgICAgICA/IHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgIDogdGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdyk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICk7XG5cbiAgICB0aGlzLmNvbnRhaW5lckVsbVdpZHRoID1cbiAgICAgICh0aGlzLmVsbVdpZHRoIC8gdGhpcy5ncmlkQnkuY29sKSAqIHRoaXMuZWxtcy5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpO1xuICAgIHRoaXMudmlld0FyZWEuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJzdHlsZVwiLFxuICAgICAgICBgd2lkdGg6JHt0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMucGFkZGluZyAqIDJ9cHhgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbG1zLmZvckVhY2goKGVsbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoZWxtLCBcIndpZHRoXCIsIHRoaXMuZWxtV2lkdGgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEhhbW1lcigpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBobSA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLmNvbnRhaW5lckVsbSk7XG5cbiAgICAgIGNvbnN0IHBhbiA9IG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBobS5hZGQocGFuKTtcblxuICAgICAgaG0ub24oXCJwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWxcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoT25lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09IFwiY2VudGVyXCIgJiYgdGhpcy5zaG93TnVtID49IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgdGhpcy5vdXRPZkJvdW5kKGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgZS5kZWx0YVggKj0gMC4yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubm90RHJhZykge1xuICAgICAgICAgICAgICB0aGlzLmxlZnQgPVxuICAgICAgICAgICAgICAgIC10aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMuZWxtV2lkdGggK1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgZS5kZWx0YVg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RyYWdNYW55KSB7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogMC41KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhbmNhbmNlbFwiOlxuICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJwYW5lbmRcIjpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoTWF0aC5hYnMoZS5kZWx0YVgpIC8gdGhpcy5lbG1XaWR0aClcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTnVtO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gbW92ZU51bTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggKyBtb3ZlTnVtO1xuXG4gICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAodGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW0pKVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5idG5QcmV2Lm5hdGl2ZUVsZW1lbnQsIFwiY2xpY2tcIikucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGNhbGxSZXN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLm1vdXNlT25Db250YWluZXIgJiYgIXRoaXMuZ3JhYmJpbmcpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3RhcnQubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd1ZpZXcoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBpc0FuaW1hdGlvbiA9IHRydWUsXG4gICAgaXNGcm9tQXV0byA9IHRoaXMuaXNGcm9tQXV0b1xuICApIHtcbiAgICBpZiAodGhpcy5lbG1zLmxlbmd0aCA+IDEgJiYgdGhpcy5lbG1zLmxlbmd0aCA+IHRoaXMuX3Nob3dOdW0pIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5sZWZ0ID0gLShpbmRleCAqIHRoaXMuZWxtV2lkdGggLSB0aGlzLmFsaWduRGlzdGFuY2UpO1xuXG4gICAgICBpZiAoaXNBbmltYXRpb24pIHtcbiAgICAgICAgaWYgKGlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlZnQgPSB0aGlzLmFsaWduRGlzdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvdXRPZkJvdW5kKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJwYW5sZWZ0XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4IDw9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBydW5Qcm9ncmVzcyhiZXR3ZWVuVGltZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG93VGltZXMgPSB0aGlzLnNwZWVkIC8gYmV0d2VlblRpbWU7XG4gICAgICBjb25zdCBldmVyeUluY3JlYXNlID0gKDEwMCAvIHRoaXMuc3BlZWQpICogYmV0d2VlblRpbWU7XG4gICAgICByZXR1cm4gaW50ZXJ2YWwoYmV0d2VlblRpbWUpLnBpcGUoXG4gICAgICAgIHRhcCgodCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9ICh0ICUgaG93VGltZXMpICogZXZlcnlJbmNyZWFzZTtcbiAgICAgICAgfSksXG4gICAgICAgIGJ1ZmZlckNvdW50KE1hdGgucm91bmQoaG93VGltZXMpLCAwKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGluaXREYXRhKHNob3dOdW0pIHtcbiAgICBpZiAoIXRoaXMub3JnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yZ2luYWxEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgIHRoaXMuc2luZ2xlVGltZVJ1biA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheUNyZWF0b3IodGhpcy5vcmdpbmFsRGF0YSwgc2hvd051bSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBzaG93TnVtO1xuICAgICAgdGhpcy5pbml0aWFsSW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEF1dG9OdW0oKSB7XG4gICAgY29uc3QgY3VycldpZHRoID0gdGhpcy5yb290RWxtV2lkdGg7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3cgPSB0aGlzLmJyZWFrcG9pbnQuZmluZCgoYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplTWFwW2Iuc2NyZWVuU2l6ZV0gPD0gY3VycldpZHRoO1xuICAgICAgfSk7XG4gICAgICBpZiAobm93KSB7XG4gICAgICAgIHRoaXMucGFkZGluZyA9IG5vdy5wYWRkaW5nIHx8IHRoaXMucGFkZGluZztcbiAgICAgICAgaWYgKG5vdy5ncmlkQnkpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5ncmlkQnkuY29sIHx8IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IG5vdy5ncmlkQnk7XG4gICAgICAgICAgY29uc3Qgc2hvd051bSA9IG5vdy5ncmlkQnkuY29sICogbm93LmdyaWRCeS5yb3cgfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgICByZXR1cm4gbm93Lm51bWJlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wYWRkaW5nID1cbiAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5wYWRkaW5nIHx8IHRoaXMucGFkZGluZztcbiAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeSkge1xuICAgICAgICB0aGlzLnNjcm9sbE51bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5zY3JvbGxOdW0gfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgdGhpcy5ncmlkQnkgPSB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeTtcbiAgICAgICAgY29uc3Qgc2hvd051bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sICpcbiAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LnJvdyB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXROdW0gPSAzO1xuICAgIGlmIChjdXJyV2lkdGggPiAyMDApIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGluaXROdW0gKyBjdXJyV2lkdGggLyAxMDApO1xuICAgIH1cblxuICAgIHJldHVybiBpbml0TnVtO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShlbG06IEhUTUxFbGVtZW50LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfSVgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJhY2tCeUZjbihpbmRleCwgaXRlbSkge1xuICAgIGlmICghaXRlbSB8fCBpdGVtW3RoaXMudHJhY2tCeUtleV0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVt0aGlzLnRyYWNrQnlLZXldO1xuICB9XG5cbiAgcHVibGljIGFycmF5Q3JlYXRvcihhcnIsIGNvdW50KSB7XG4gICAgY29uc3QgZGF0YSA9IFsuLi5hcnJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgZGF0YS51bnNoaWZ0KGFyclthcnIubGVuZ3RoIC0gMSAtIChpICUgYXJyLmxlbmd0aCldKTtcbiAgICAgIGRhdGEucHVzaChhcnJbaSAlIGFyci5sZW5ndGhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==