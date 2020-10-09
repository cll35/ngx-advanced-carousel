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
                    template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) || infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) || infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length - 1) || infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) || infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li *ngIf=\"i % (scrollNum * gridBy.row) === 0\" (click)=\"currentIndex = i\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
        screenSizeMap: [{ type: Input }]
    };
    return NgxAdvancedCarouselComponent;
}());
export { NgxAdvancedCarouselComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBRVYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBRVosaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLEtBQUssRUFFTCxFQUFFLEVBQ0YsT0FBTyxFQUVQLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDtJQXNTRSxzQ0FDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFDYixHQUFzQjtRQUxoQyxpQkFNSTtRQUwyQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQUE7UUFDM0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUE4QmYsZUFBVSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDOzs7O1FBRXRELFlBQU8sR0FBRyxHQUFHLENBQUM7Ozs7UUFFZCxhQUFRLEdBQUcsWUFBWSxDQUFDOzs7OztRQUt4QixpQkFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBR0wsc0JBQWlCLEdBR3BDLFFBQVEsQ0FBQzs7Ozs7OztRQVFBLGdCQUFXLEdBQW1CLElBQUksQ0FBQzs7OztRQUdqRCxVQUFLLEdBQWdDLFFBQVEsQ0FBQzs7Ozs7UUFNOUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQyxlQUFVLEdBQUcsTUFBTSxDQUFDOzs7O1FBSUwsaUJBQVksR0FBRyxLQUFLLENBQUM7Ozs7UUFFckIsVUFBSyxHQUFHLElBQUksQ0FBQzs7OztRQUVSLGNBQVMsR0FBcUIsT0FBTyxDQUFDOzs7O1FBRTlDLGNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7UUFFZixlQUFVLEdBQUcsS0FBSyxDQUFDOzs7O1FBRWQsa0JBQWEsR0FBRyxHQUFHLENBQUM7Ozs7UUFLcEMsZUFBVSxHQUtyQixFQUFFLENBQUM7UUFFUSxrQkFBYSxHQUFHO1lBQzlCLEdBQUcsRUFBRSxJQUFJOztZQUVULEVBQUUsRUFBRSxJQUFJO1lBQ1IsRUFBRSxFQUFFLEdBQUc7WUFDUCxFQUFFLEVBQUUsR0FBRztZQUNQLEVBQUUsRUFBRSxHQUFHO1lBQ1AsRUFBRSxFQUFFLENBQUM7U0FDTixDQUFDO1FBRUssY0FBUyxHQUFHLEtBQUssQ0FDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUN0QyxDQUFDLElBQUksQ0FDSixHQUFHOzs7O1FBQUMsVUFBQyxDQUFRO1lBQ1gsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FDSCxDQUFDO1FBRU0sZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBWWIsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1FBQ3pDLGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDL0IsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFOUIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbkIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNaLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRTNCLGFBQVEsR0FBRyxDQUFDLENBQUM7OztRQUtkLGNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBSS9CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWhCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQWlEckIsYUFBUTs7OztRQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsRUFBQztRQUMxQixjQUFTOzs7UUFBRyxjQUFPLENBQUMsRUFBQztJQTNNMUIsQ0FBQztJQTVSSixzQkFDVyw4Q0FBSTs7OztRQURmO1lBRUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBQ0QsVUFBZ0IsS0FBSztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDOzs7T0FIQTtJQUtELHNCQUNXLHFEQUFXO1FBRnRCLDZFQUE2RTs7Ozs7UUFDN0U7WUFFRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQzs7Ozs7UUFDRCxVQUF1QixLQUFLO1lBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUN0Qjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDakM7aUJBQ0Y7YUFDRjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7OztPQVpBO0lBZUQsc0JBQ1csa0RBQVE7UUFGbkIsd0NBQXdDOzs7OztRQUN4QztZQUVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQW9CLEtBQUs7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdkI7Ozs7a0JBSU07UUFDUixDQUFDOzs7T0FUQTtJQVlELHNCQUNXLCtDQUFLO1FBRmhCLHNCQUFzQjs7Ozs7UUFDdEI7WUFFRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ2hDLENBQUM7Ozs7O1FBQ0QsVUFBaUIsS0FBSztZQUF0QixpQkFJQztZQUhDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7WUFBQztnQkFDM0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDOzs7T0FMQTtJQVdELHNCQUNXLGlEQUFPO1FBTGxCOzs7V0FHRzs7Ozs7O1FBQ0g7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFtQixLQUFzQjtZQUN2QyxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQjthQUNGO1FBQ0gsQ0FBQzs7O09BWkE7SUFlRCxzQkFDVyxrREFBUTtRQUZuQixpQ0FBaUM7Ozs7O1FBQ2pDO1lBRUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBb0IsS0FBSztZQUF6QixpQkFvQkM7WUFuQkMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxLQUFLLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7Ozt3QkFBQzs0QkFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM1QyxDQUFDLEVBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7eUJBQy9CO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2Qiw2Q0FBNkM7WUFDN0MsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDSCxDQUFDOzs7T0FyQkE7SUF1QkQsc0JBQVcsc0RBQVk7Ozs7UUFBdkI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFDRCxVQUF3QixLQUFLO1lBQTdCLGlCQTRGQztZQTNGQyx3REFBd0Q7WUFDeEQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtnQkFDL0IsNkRBQTZEO2dCQUM3RCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7b0JBQ2IsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3ZFLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O3dCQUFDOzRCQUMzQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUN0QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3JCLENBQUMsRUFBQyxDQUFDO3FCQUNKO29CQUNELElBQUksQ0FBQyxTQUFTO3dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7NEJBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtnQ0FDakIsSUFBSSxDQUFDLFFBQVE7Z0NBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7NEJBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QyxJQUFJLENBQUMsYUFBYTtnQ0FDaEIsSUFBSSxDQUFDLFNBQVM7b0NBQ1osSUFBSSxDQUFDLFFBQVE7b0NBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7b0NBQ2xDLENBQUM7b0NBQ0MsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTO3dDQUNkLElBQUksQ0FBQyxRQUFRO3dDQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7eUJBQ3hDOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxhQUFhO2dDQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUM7b0NBQ2xDLENBQUMsQ0FBQyxDQUFDO29DQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO3lCQUN4QztxQkFDRjtvQkFDRCxJQUFJLENBQUMsYUFBYTt3QkFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNqQixJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTs0QkFDekMsSUFBSSxDQUFDLGFBQWE7Z0NBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7eUJBQzVEO3dCQUNELElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTs0QkFDNUQsSUFBSSxDQUFDLGFBQWE7Z0NBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7eUJBQzVEO3dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7d0JBQUM7NEJBQzNCLEtBQUssQ0FBQyxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztpQ0FDdEIsSUFBSSxDQUNILFNBQVM7Ozs0QkFBQztnQ0FDUixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQ3hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNsQixDQUFDLEVBQUMsRUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7aUNBQ0EsU0FBUyxFQUFFLENBQUM7d0JBQ2pCLENBQUMsRUFBQyxDQUFDO3FCQUNKO29CQUNEOzs7Ozs7Ozs7Ozs7d0JBWUk7aUJBQ0w7Z0JBQ0QsSUFDRSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVk7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUM3QztvQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7OztvQkFBQzt3QkFDYixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDakMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDM0IsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQTdGQTtJQStGRCxzQkFBVyx1REFBYTs7OztRQUF4QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7OztRQUNELFVBQXlCLEtBQUs7WUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLENBQUMsbUJBQUEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUNwRSxPQUFPLEVBQ0osSUFBSSxDQUFDLGFBQWEsTUFBRyxDQUN6QixDQUFDO2FBQ0g7UUFDSCxDQUFDOzs7T0FWQTtJQVlELHNCQUFXLGtEQUFROzs7O1FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBb0IsS0FBYztZQUFsQyxpQkFjQztZQWJDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7O2dCQUFDO29CQUNiLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixJQUFJLEtBQUssRUFBRTt3QkFDVCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3FCQUN4RDt5QkFBTTt3QkFDTCxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQzt3QkFDbEIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNuQixLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3FCQUMzRDtvQkFDRCxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQzs7O09BZkE7SUFpQkQsc0JBQVksOENBQUk7Ozs7OztRQUFoQixVQUFpQixLQUFhO1lBQzVCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFlBQVksRUFDakIsV0FBVyxFQUNYLGdCQUFjLEtBQUssUUFBSyxDQUN6QixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLFdBQVcsRUFDWCxnQkFBYyxLQUFLLE9BQUksQ0FDeEIsQ0FBQzthQUNIO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSx1REFBYTs7Ozs7UUFBekI7O2dCQUNNLFFBQVEsR0FBRyxDQUFDO1lBQ2hCLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDbEIsS0FBSyxNQUFNO29CQUNULFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2IsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsUUFBUSxHQUFHLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixRQUFRLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hDLE1BQU07YUFDVDtZQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLGlEQUFPOzs7OztRQUFuQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVksbURBQVM7Ozs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSxzREFBWTs7Ozs7UUFBeEI7WUFDRSxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSztnQkFDNUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNWLENBQUM7OztPQUFBO0lBRUQsc0JBQVksMkRBQWlCOzs7Ozs7UUFBN0IsVUFBOEIsS0FBYTtZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUM7OztPQUFBOzs7O0lBa0tNLHNEQUFlOzs7SUFBdEI7UUFBQSxpQkE0QkM7UUEzQkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFlLENBQUM7UUFFNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosUUFBUSxrQkFDSCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLGdFQUFnRTtZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3hCLG9DQUFvQztZQUNwQyxHQUFHOzs7WUFBQztnQkFDRixJQUFJLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNoRCw0RUFBNEU7b0JBQzVFLFVBQVU7OztvQkFBQzt3QkFDVCxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0MsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNQO2dCQUNELEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7O1lBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQXhCLENBQXdCLEVBQUMsQ0FDcEM7WUFDRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTzs7O1lBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsRUFBQztXQUM1RDthQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSxrREFBVzs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU0saURBQVU7Ozs7SUFBakIsVUFBa0IsS0FBVTtRQUMxQixJQUFJLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTSx1REFBZ0I7Ozs7SUFBdkIsVUFBd0IsRUFBdUI7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDTSx3REFBaUI7Ozs7SUFBeEIsVUFBeUIsRUFBYTtRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUlPLDJDQUFJOzs7O0lBQVo7UUFDRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4Qzs7WUFFSTtJQUNOLENBQUM7Ozs7O0lBRU8sOENBQU87Ozs7SUFBZjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7Ozs7O0lBRU8sb0RBQWE7Ozs7SUFBckI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxzREFBZTs7OztJQUF2QjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRU8sbURBQVk7Ozs7SUFBcEI7UUFBQSxpQkE0Q0M7UUEzQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztRQUFDO1lBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsYUFBYSxFQUFmLENBQWUsRUFBQyxDQUFDOztnQkFFNUQsVUFBVSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFOztnQkFDeEMsU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1lBQzdDLElBQUksS0FBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsVUFBVSxHQUFHLEtBQUssQ0FDaEIsVUFBVSxFQUNWLFNBQVMsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDN0MsTUFBTTs7O2dCQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQWQsQ0FBYyxFQUFDLEVBQzVCLEdBQUc7OztnQkFBQyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEVBQS9CLENBQStCLEVBQUMsQ0FDM0MsQ0FDRixDQUFDO2dCQUNGLFNBQVMsR0FBRyxLQUFLLENBQ2YsU0FBUyxFQUNULFNBQVMsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDNUMsR0FBRzs7O2dCQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsRUFBQyxDQUMxQyxDQUNGLENBQUM7YUFDSDtZQUVELEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDM0IsU0FBUzs7O1lBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQWhCLENBQWdCLEVBQUMsRUFDakMsU0FBUzs7O1lBQUM7Z0JBQ1IsT0FBQSxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDcEIsU0FBUzs7O2dCQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFwQixDQUFvQixFQUFDLEVBQ3JDLEdBQUc7OztnQkFBQztvQkFDRixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdkIsSUFBSSxLQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTt3QkFDN0IsS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDO3FCQUNyQzt5QkFBTTt3QkFDTCxLQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUM7cUJBQ3JDO2dCQUNILENBQUMsRUFBQyxFQUNGLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7OztnQkFBQyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUF4QixDQUF3QixFQUFDLENBQUMsQ0FBQyxDQUMvRDtZQVhELENBV0MsRUFDRixDQUNGLENBQUM7WUFFRixJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx5REFBa0I7Ozs7SUFBMUI7UUFDRSxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbEIsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdELE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZELE1BQU07U0FDVDtJQUNILENBQUM7Ozs7OztJQUVPLG1EQUFZOzs7OztJQUFwQixVQUFxQixNQUFnQjtRQUFyQyxpQkF1Q0M7UUF0Q0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFFO1lBQ1Ysd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLHNDQUFzQyxDQUN2QyxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLHNDQUFzQyxDQUN2QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQjtZQUNwQixDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE9BQU87WUFDNUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQ2hDLE9BQU8sRUFDUCxXQUNFLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsT0FDcEUsQ0FDTCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEdBQWdCO1lBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU8saURBQVU7Ozs7SUFBbEI7UUFBQSxpQkFrR0M7UUFqR0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O1FBQUM7O2dCQUM1QixFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUM7O2dCQUUxQyxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN6QixTQUFTLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtnQkFDdEMsU0FBUyxFQUFFLENBQUM7YUFDYixDQUFDO1lBRUYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVaLEVBQUUsQ0FBQyxFQUFFLENBQUMsbUNBQW1DOzs7O1lBQUUsVUFBQyxDQUFDO2dCQUMzQyxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2xCLE9BQU87aUJBQ1I7Z0JBRUQsS0FBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBRWpDLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsS0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztvQkFBQzt3QkFDM0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBRUQsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFO29CQUNkLEtBQUssU0FBUyxDQUFDO29CQUNmLEtBQUssVUFBVTt3QkFDYixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2hCLElBQUksS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7NEJBQ3JCLE9BQU87eUJBQ1I7d0JBRUQsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLElBQUksS0FBSSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDL0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZCLE9BQU87eUJBQ1I7d0JBQ0QsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzVDLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO3lCQUNqQjt3QkFFRCxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTs0QkFDakIsS0FBSSxDQUFDLElBQUk7Z0NBQ1AsQ0FBQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRO29DQUNsQyxLQUFJLENBQUMsYUFBYTtvQ0FDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt5QkFDWjt3QkFFRCxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTs0QkFDcEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtnQ0FDNUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQ0FDaEIsS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDO2lDQUNyQztxQ0FBTTtvQ0FDTCxLQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUM7aUNBQ3JDO2dDQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUN2QixPQUFPOzZCQUNSO3lCQUNGO3dCQUNELE1BQU07b0JBQ1IsS0FBSyxXQUFXO3dCQUNkLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNqQyxNQUFNO29CQUVSLEtBQUssUUFBUTt3QkFDWCxJQUNFLEtBQUksQ0FBQyxXQUFXLEtBQUssS0FBSzs0QkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUNyRDs7Z0NBQ00sT0FBTyxHQUFHLEtBQUksQ0FBQyxVQUFVO2dDQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO2dDQUMvQyxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVM7O2dDQUVaLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU87O2dDQUN2QyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksR0FBRyxPQUFPOzRCQUU3QyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dDQUNoQixLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzZCQUN4QjtpQ0FBTTtnQ0FDTCxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzZCQUN4Qjs0QkFDRCxNQUFNO3lCQUNQOzZCQUFNLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUU7NEJBQy9ELEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ2pEOzZCQUFNLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFOzRCQUM5RCxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNqRDs2QkFBTTs0QkFDTCxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDbEM7d0JBQ0QsTUFBTTtpQkFDVDtZQUNILENBQUMsRUFBQyxDQUFDO1lBRUgsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLDZDQUFNOzs7OztJQUFkLFVBQWUsU0FBaUI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNsQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUVPLDZDQUFNOzs7OztJQUFkLFVBQWUsU0FBaUI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkQsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRU8sZ0RBQVM7Ozs7SUFBakI7UUFBQSxpQkFjQztRQWJDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE9BQU87Z0JBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDakQsR0FBRzs7O2dCQUFDLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxZQUFZLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFyQyxDQUFxQyxFQUFDLENBQ2pEO2dCQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2pELEdBQUc7OztnQkFBQztvQkFDRixPQUFPLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEUsQ0FBQyxFQUFDLENBQ0g7YUFDRixDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRU8sa0RBQVc7Ozs7SUFBbkI7UUFBQSxpQkFNQztRQUxDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztZQUFDO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFTywrQ0FBUTs7Ozs7OztJQUFoQixVQUNFLEtBQWEsRUFDYixXQUFrQixFQUNsQixVQUE0QjtRQUQ1Qiw0QkFBQSxFQUFBLGtCQUFrQjtRQUNsQiwyQkFBQSxFQUFBLGFBQWEsSUFBSSxDQUFDLFVBQVU7UUFFNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1RCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFMUQsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQy9EO3FCQUFNO29CQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzRDthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7O0lBRU8sZ0VBQXlCOzs7O0lBQWpDO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7O0lBRU8saURBQVU7Ozs7O0lBQWxCLFVBQW1CLElBQUk7UUFDckIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDakQsS0FBSyxVQUFVO2dCQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxrREFBVzs7Ozs7SUFBbkIsVUFBb0IsV0FBVztRQUEvQixpQkFXQztRQVZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztRQUFDOztnQkFDNUIsUUFBUSxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVzs7Z0JBQ25DLGFBQWEsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVztZQUN0RCxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUc7Ozs7WUFBQyxVQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDdEQsQ0FBQyxFQUFDLEVBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3JDLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUNPLCtDQUFROzs7OztJQUFoQixVQUFpQixPQUFPO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxvQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpREFBVTs7OztJQUFsQjtRQUFBLGlCQTRDQzs7WUEzQ08sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZO1FBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsQ0FBQztnQkFDakMsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFTLENBQUM7WUFDdkQsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO29CQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7O3dCQUNuQixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU07b0JBQzdELE9BQU8sT0FBTyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNqQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7aUJBQ25CO2FBQ0Y7WUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN0RCxJQUFJLENBQUMsU0FBUztvQkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO3dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVM7d0JBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDOztvQkFDM0QsT0FBTyxHQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDcEQsT0FBTyxPQUFPLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVM7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTO3dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2FBQzNEO1NBQ0Y7O1lBRUssT0FBTyxHQUFHLENBQUM7UUFDakIsSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFFTywrQ0FBUTs7Ozs7OztJQUFoQixVQUFpQixHQUFnQixFQUFFLEtBQWEsRUFBRSxLQUFhO1FBQzdELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUssS0FBSyxPQUFJLENBQUMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBSyxLQUFLLE1BQUcsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Ozs7O0lBRU0saURBQVU7Ozs7O0lBQWpCLFVBQWtCLEtBQUssRUFBRSxJQUFJO1FBQzNCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVNLG1EQUFZOzs7OztJQUFuQixVQUFvQixHQUFHLEVBQUUsS0FBSzs7WUFDdEIsSUFBSSxvQkFBTyxHQUFHLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBOTRCRixTQUFTLFNBQUM7b0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSx1QkFBdUI7b0JBRWpDLDBtR0FBcUQ7b0JBQ3JELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSw0QkFBNEIsRUFBNUIsQ0FBNEIsRUFBQzs0QkFDM0QsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnREEwUkksTUFBTSxTQUFDLFdBQVc7Z0RBQ2xCLE1BQU0sU0FBQyxRQUFRO2dCQXhVbEIsU0FBUztnQkFOVCxNQUFNO2dCQVZOLGlCQUFpQjs7O3VCQWdFaEIsS0FBSzs4QkFRTCxLQUFLLFNBQUMsY0FBYzsyQkFrQnBCLEtBQUssU0FBQyxVQUFVO3dCQWVoQixLQUFLLFNBQUMsZ0JBQWdCOzBCQWN0QixLQUFLLFNBQUMsVUFBVTsyQkFrQmhCLEtBQUssU0FBQyxVQUFVOzRCQW9OaEIsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7MkJBQzNDLFlBQVksU0FBQyxVQUFVOzBCQUN2QixTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFDbkMsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7dUNBQ25DLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzJCQUl2QyxlQUFlLFNBQUMsZ0NBQWdDLEVBQUU7d0JBQ2pELFdBQVcsRUFBRSxJQUFJO3dCQUNqQixJQUFJLEVBQUUsVUFBVTtxQkFDakI7OEJBR0EsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBRTlDLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3lCQUU5QyxZQUFZLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1Q0FHN0MsWUFBWSxTQUFDLHNCQUFzQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFFdEQsWUFBWSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs2QkFLbEQsTUFBTTswQkFFTixLQUFLOzJCQUVMLEtBQUs7K0JBS0wsS0FBSztvQ0FHTCxLQUFLLFNBQUMsd0JBQXdCOzhCQVc5QixLQUFLLFNBQUMsY0FBYzt3QkFHcEIsS0FBSzswQkFNTCxLQUFLLFNBQUMsZ0JBQWdCOzZCQUV0QixLQUFLOytCQUlMLEtBQUssU0FBQyxlQUFlO3dCQUVyQixLQUFLLFNBQUMsZUFBZTs0QkFFckIsS0FBSyxTQUFDLG9CQUFvQjs0QkFFMUIsS0FBSyxTQUFDLFlBQVk7NkJBRWxCLEtBQUssU0FBQyxXQUFXO2dDQUVqQixLQUFLLFNBQUMsZ0JBQWdCOzZCQUt0QixLQUFLO2dDQU9MLEtBQUs7O0lBMGdCUixtQ0FBQztDQUFBLEFBLzRCRCxJQSs0QkM7U0FqNEJZLDRCQUE0Qjs7O0lBK1J2QyxpREFBMkU7O0lBQzNFLGdEQUFpRTs7SUFDakUsK0NBQWlFOztJQUNqRSwrQ0FBaUU7O0lBQ2pFLDREQUN3Qzs7SUFHeEMsZ0RBSXVDOztJQUV2QyxtREFDcUM7O0lBQ3JDLG1EQUNxQzs7SUFDckMsOENBRUU7O0lBQ0YsNERBQzhDOztJQUM5QyxtREFDcUM7O0lBRXJDLDZDQUFvQjs7SUFFcEIsa0RBQXNFOzs7OztJQUV0RSwrQ0FBOEI7Ozs7O0lBRTlCLGdEQUF3Qzs7Ozs7O0lBS3hDLG9EQUE2Qzs7SUFHN0MseURBRzhCOzs7Ozs7OztJQVE5QixtREFBaUU7Ozs7O0lBR2pFLDZDQUE4RDs7Ozs7O0lBTTlELCtDQUFnRDs7SUFFaEQsa0RBQW9DOzs7OztJQUlwQyxvREFBb0Q7Ozs7O0lBRXBELDZDQUE0Qzs7Ozs7SUFFNUMsaURBQTBFOzs7OztJQUUxRSxpREFBMEM7Ozs7O0lBRTFDLGtEQUE4Qzs7Ozs7SUFFOUMscURBQW9EOzs7OztJQUtwRCxrREFLUTs7SUFFUixxREFRRTs7SUFFRixpREFTRTs7Ozs7SUFFRixrREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsd0RBQWlDOzs7OztJQUNqQyxxREFBMEI7Ozs7O0lBQzFCLGdEQUFxQjs7Ozs7SUFFckIsK0NBQTZCOzs7OztJQUM3QixvREFBa0M7Ozs7O0lBRWxDLDRDQUFpQzs7Ozs7SUFFakMsOENBQWU7Ozs7O0lBRWYsa0RBQWlDOzs7OztJQUNqQyw4Q0FBZ0M7Ozs7O0lBRWhDLCtDQUFpRDs7Ozs7SUFDakQsbURBQWdEOzs7OztJQUNoRCxpREFBdUM7Ozs7O0lBQ3ZDLGdEQUFzQzs7Ozs7SUFFdEMsc0RBQTJCOzs7OztJQUMzQixxREFBMEI7O0lBQzFCLGdEQUFvQjs7Ozs7SUFDcEIsaURBQTBCOzs7OztJQUMxQixpREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsb0RBQTZCOztJQUM3Qiw4Q0FBbUM7Ozs7O0lBRW5DLGdEQUFxQjs7SUFLckIsaURBQXNDOztJQUV0QyxvREFBb0I7O0lBRXBCLHFEQUE0Qjs7Ozs7SUFDNUIsb0RBQXlCOztJQUN6QixtREFBd0I7Ozs7O0lBRXhCLHdEQUE2Qjs7Ozs7SUFpRDdCLGdEQUFrQzs7Ozs7SUFDbEMsaURBQTZCOzs7OztJQWhOM0Isa0RBQTRDOzs7OztJQUM1QyxpREFBbUM7Ozs7O0lBQ25DLGlEQUE0Qjs7Ozs7SUFDNUIsNkNBQXFCOzs7OztJQUNyQiwyQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmb3JrSm9pbixcbiAgZnJvbUV2ZW50LFxuICBpbnRlcnZhbCxcbiAgbWVyZ2UsXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyLFxufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtcbiAgYnVmZmVyQ291bnQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbiAgdGFwLFxufSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlIH0gZnJvbSBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLWl0ZW0uZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyByZXNpemVPYnNlcnZhYmxlIH0gZnJvbSBcIi4vcnhqcy5vYnNlcnZhYmxlLnJlc2l6ZVwiO1xuZGVjbGFyZSB2YXIgSGFtbWVyO1xuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5zY3NzXCJdLFxuICB0ZW1wbGF0ZVVybDogXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuICAvKiogZGlzYWJsZSBkcmFnIGV2ZW50IHdpdGggdG91Y2ggYW5kIG1vdXNlIHBhbiBtb3ZpbmcsIGRlZmF1bHQgaXMgYGZhbHNlYCAqL1xuICBASW5wdXQoXCJkaXNhYmxlLWRyYWdcIilcbiAgcHVibGljIGdldCBkaXNhYmxlRHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZURyYWc7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlRHJhZyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlRHJhZyAhPT0gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW1tZXIgPSB0aGlzLmJpbmRIYW1tZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9kaXNhYmxlRHJhZyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIGlzIHRoZSBjYXJvdXNlbCBjYW4gbW92ZSBpbmZpbml0ZSAqL1xuICBASW5wdXQoXCJpbmZpbml0ZVwiKVxuICBwdWJsaWMgZ2V0IGluZmluaXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmZpbml0ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGluZmluaXRlKHZhbHVlKSB7XG4gICAgdGhpcy5faW5maW5pdGUgPSB2YWx1ZTtcblxuICAgIC8qIHRoaXMuaW5maW5pdGVFbG1SZWZzLmZvckVhY2goKHJlZikgPT4ge1xuICAgICAgdGhpcy5hZGRTdHlsZShyZWYucm9vdE5vZGVzWzBdLCB7XG4gICAgICAgIHZpc2liaWxpdHk6IHRoaXMucnVuTG9vcCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nLFxuICAgICAgfSk7XG4gICAgfSk7ICovXG4gIH1cblxuICAvKiogYXV0byBwbGF5IHNwZWVkICovXG4gIEBJbnB1dChcImF1dG9wbGF5LXNwZWVkXCIpXG4gIHB1YmxpYyBnZXQgc3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BlZWRDaGFuZ2UudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zcGVlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBob3cgbWFueSBudW1iZXIgaXRlbXMgdG8gc2hvdyBvbmNlLCBkZWZhdWx0IGlzIGAxYFxuICAgKiBzZXQgYGF1dG9gIHRvIHVzaW5nIGBbYnJlYWtwb2ludF1gIHNldCB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dChcInNob3ctbnVtXCIpXG4gIHB1YmxpYyBnZXQgc2hvd051bSgpOiBudW1iZXIgfCBcImF1dG9cIiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dOdW07XG4gIH1cbiAgcHVibGljIHNldCBzaG93TnVtKHZhbHVlOiBudW1iZXIgfCBcImF1dG9cIikge1xuICAgIGlmICh2YWx1ZSA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuaXNBdXRvTnVtID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2hvd051bSA9ICt2YWx1ZTtcbiAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5fc2hvd051bTtcbiAgICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgICAgdGhpcy5zZXRWaWV3V2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogY2Fyb3VzZWwgYXV0byBwbGF5IGNvbmZpbmcgKi9cbiAgQElucHV0KFwiYXV0b3BsYXlcIilcbiAgcHVibGljIGdldCBhdXRvcGxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b3BsYXk7XG4gIH1cbiAgcHVibGljIHNldCBhdXRvcGxheSh2YWx1ZSkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDA7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkID0gdGhpcy5kb05leHQuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuZG9OZXh0U3ViJCkge1xuICAgICAgICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2F1dG9wbGF5ID0gdmFsdWU7XG4gICAgLy8gaWYgc2V0IGF1dG9wbGF5LCB0aGVuIHRoZSBpbmZpbml0ZSBpcyB0cnVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmluZmluaXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xuICB9XG4gIHB1YmxpYyBzZXQgY3VycmVudEluZGV4KHZhbHVlKSB7XG4gICAgLy8gaWYgbm93IGluZGV4IGlmIG5vdCBlcXVhbGUgdG8gc2F2ZSBpbmRleCwgZG8gc29tZXRpbmdcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggIT09IHZhbHVlKSB7XG4gICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgbm90IGNvbnRhaW4gd2l0aCB0aGUgYm91bmRhcnkgbm90IGhhbmRsZXJ3XG4gICAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICAgIHZhbHVlID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5ydW5Mb29wICYmICEoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSAmJiAhdGhpcy5pc0Zyb21BdXRvKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFdmVudC5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgIHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDFcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICBpZiAoIXRoaXMuaW5maW5pdGUgJiYgdGhpcy5yZWFsSW5kZXggPiB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLmVsbXMubGVuZ3RoO1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wgPFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bSA8IDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IDwgMCAmJiAhdGhpcy5pbmZpbml0ZSA/IDAgOiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5pbml0aWFsSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogNCArIHRoaXMuY3VycmVudEluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5kYXRhLmxlbmd0aCArIHRoaXMuX3Nob3dOdW0gKiA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyKHRoaXMuYW5pVGltZSArIDEwMClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlmICh0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9ICh0aGlzLnJlYWxJbmRleCAtIHRoaXMuZWxtcy5sZW5ndGgpICUgdGhpcy5fc2hvd051bTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggLT0gY291bnQ7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAwIDw9IHRoaXMuY3VycmVudEluZGV4ICYmXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4IDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlzRnJvbUF1dG8gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvZ3Jlc3NXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9yZ3Jlc3NXaWR0aDtcbiAgfVxuICBwdWJsaWMgc2V0IHByb2dyZXNzV2lkdGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5wcm9ncmVzc0VsbSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuX3BvcmdyZXNzV2lkdGggPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAodGhpcy5wcm9ncmVzc0NvbnRhaW5lckVsbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jaGlsZHJlblswXSxcbiAgICAgICAgXCJ3aWR0aFwiLFxuICAgICAgICBgJHt0aGlzLnByb2dyZXNzV2lkdGh9JWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBncmFiYmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JhYmJpbmc7XG4gIH1cbiAgcHVibGljIHNldCBncmFiYmluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9ncmFiYmluZyAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZ3JhYmJpbmcgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYmJpbmdcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYW5Db3VudCA9IDA7XG4gICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWV9cHgpYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfSUpYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBtYXhSaWdodEluZGV4KCkge1xuICAgIGxldCBhZGRJbmRleCA9IDA7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBhZGRJbmRleCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEgLSB0aGlzLl9zaG93TnVtICsgMSArIGFkZEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcnVuTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRvcGxheSB8fCB0aGlzLmluZmluaXRlO1xuICB9XG4gIHByaXZhdGUgZ2V0IGxlbmd0aE9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggPT09IDE7XG4gIH1cblxuICBwcml2YXRlIGdldCByb290RWxtV2lkdGgoKSB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICAgID8gdGhpcy5yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICA6IDEwMDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lckVsbVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcIndpZHRoXCIsIHZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJFbG1cIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oXCJ2aWV3QXJlYVwiKSBwdWJsaWMgdmlld0FyZWE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZChcInByZXZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5QcmV2OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibmV4dFwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGJ0bk5leHQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJwcm9ncmVzc1wiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzQ29udGFpbmVyRWxtOiBFbGVtZW50UmVmO1xuXG4gIC8vIGdldCBhbGwgaXRlbSBlbG1zXG4gIEBDb250ZW50Q2hpbGRyZW4oTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUsIHtcbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgICByZWFkOiBFbGVtZW50UmVmLFxuICB9KVxuICBwdWJsaWMgaXRlbUVsbXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxQcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudFByZXY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbE5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjb250ZW50TmV4dDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsRG90XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgZG90RWxtOiBUZW1wbGF0ZVJlZjxcbiAgICBhbnlcbiAgPjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsSXRlbVRlbXBsYXRlXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY2Fyb3VzZWxJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NFbG06IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIF9kYXRhOiBhbnlbXTtcblxuICBAT3V0cHV0KCkgcHVibGljIG1hcHBlZERhdGE6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiB3aGVuIGluZmluaXRlIGlzIHRydWUsIHRoZSBhbmltYXRpb24gdGltZSB3aXRoIGl0ZW0sIGRlZmF1bHQgaXMgNDAwLiAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pVGltZSA9IDQwMDtcbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgaW4gI2NvbnRhaW5lckVsbSB3aGVuIG1vZGVsIGNoYW5nZSAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3MgPSBcInRyYW5zaXRpb25cIjtcblxuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCB3aGVuIGNhcm91c2VsIGF1dG8gcGxheSxcbiAgICogdGhpcyBkZWZhdWx0IGF1dG9wbGF5IGFuaW1hdGlvbiBpcyBzYW1lIGFzIGFuaUNsYXNzXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3NBdXRvID0gdGhpcy5hbmlDbGFzcztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoXCJzaG93LW5leHQtcHJldi1idXR0b25zXCIpIHB1YmxpYyBzaG93QnV0dG9uc01ldGhvZDpcbiAgICB8IFwiYWx3YXlzXCJcbiAgICB8IFwiYXV0by1oaWRlXCJcbiAgICB8IFwiYXV0by1kaXNhYmxlXCIgPSBcImFsd2F5c1wiO1xuXG4gIC8qKlxuICAgKiB1c2VyIG1vdmUgcGljdHVyZSB3aXRoIHRoZSBjb250YWluZXIgd2lkdGggcmF0ZSxcbiAgICogd2hlbiBtb3JlIHRoYW4gdGhhdCByYXRlLCBpdCB3aWxsIGdvIHRvIG5leHQgb3IgcHJldixcbiAgICogc2V0IGZhbHNlIHdpbGwgbmV2ZXIgbW92ZSB3aXRoIGRpc3RhbmNlIHJhdGUsXG4gICAqIGRlZmF1bHQgaXMgYDAuMTVgXG4gICAqL1xuICBASW5wdXQoXCJwYW4tYm91bmRhcnlcIikgcHVibGljIHBhbkJvdW5kYXJ5OiBudW1iZXIgfCBmYWxzZSA9IDAuMTU7XG5cbiAgLyoqIHdoZW4gc2hvdy1udW0gaXMgYmlnZ2VyIHRoYW4gMSwgdGhlIGZpcnN0IGl0ZW0gYWxpZ24sIGRlZmF1bHRlIGlzIGBjZW50ZXJgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGlnbjogXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiID0gXCJjZW50ZXJcIjtcblxuICAvKipcbiAgICogZGlzYWJsZSB3aGVuIGRyYWcgb2NjdXIgdGhlIGNoaWxkIGVsZW1lbnQgd2lsbCBmb2xsb3cgdG91Y2ggcG9pbnQuXG4gICAqIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KFwibm90LWZvbGxvdy1wYW5cIikgcHVibGljIG5vdERyYWcgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwdWJsaWMgdHJhY2tCeUtleSA9IFwiY29kZVwiO1xuICAvKipcbiAgICogdGhlIGV2ZW50IGJpbmRpbmcgc3RhdGUgZm9yIHN0b3AgYXV0byBwbGF5IHdoZW4gbW91cnNlIG1vdmVvdmVyXG4gICAqL1xuICBASW5wdXQoXCJtb3Vyc2UtZW5hYmxlXCIpIHB1YmxpYyBtb3Vyc2VFbmFibGUgPSBmYWxzZTtcbiAgLyoqIGVhY2ggYXV0byBwbGF5IGJldHdlZW4gdGltZSAqL1xuICBASW5wdXQoXCJiZXR3ZWVuLWRlbGF5XCIpIHB1YmxpYyBkZWxheSA9IDgwMDA7XG4gIC8qKiBhdXRvIHBsYXkgZGlyZWN0aW9uLCBkZWZhdWx0IGlzIGByaWdodGAuICovXG4gIEBJbnB1dChcImF1dG9wbGF5LWRpcmVjdGlvblwiKSBwdWJsaWMgZGlyZWN0aW9uOiBcImxlZnRcIiB8IFwicmlnaHRcIiA9IFwicmlnaHRcIjtcbiAgLyoqIGhvdyBtYW55IG51bWJlciB3aXRoIGVhY2ggc2Nyb2xsLCBkZWZhdWx0IGlzIGAxYC4gKi9cbiAgQElucHV0KFwic2Nyb2xsLW51bVwiKSBwdWJsaWMgc2Nyb2xsTnVtID0gMTtcbiAgLyoqIENvdWxkIHVzZXIgc2Nyb2xsIG1hbnkgaXRlbSBvbmNlLCBzaW11bGF0ZSB3aXRoIHNjcm9sbGJhciwgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRyYWctbWFueVwiKSBwdWJsaWMgaXNEcmFnTWFueSA9IGZhbHNlO1xuICAvKiogTWluaW1hbCB2ZWxvY2l0eSByZXF1aXJlZCBiZWZvcmUgcmVjb2duaXppbmcsIHVuaXQgaXMgaW4gcHggcGVyIG1zLCBkZWZhdWx0IGAwLjNgICovXG4gIEBJbnB1dChcInN3aXBlLXZlbG9jaXR5XCIpIHB1YmxpYyBzd2lwZVZlbG9jaXR5ID0gMC4zO1xuXG4gIC8qKlxuICAgKiBzd2l0Y2ggc2hvdyBudW1iZXIgd2l0aCBjdXN0b20gbG9naWMgbGlrZSBjc3MgQG1lZGlhIChtaW4td2lkdGg6IGBudW1iZXJgcHgpXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYnJlYWtwb2ludDogQXJyYXk8e1xuICAgIGdyaWRCeT87XG4gICAgc2NyZWVuU2l6ZTogXCJ4eGxcIiB8IFwieGxcIiB8IFwibGdcIiB8IFwibWRcIiB8IFwic21cIiB8IFwieHNcIjtcbiAgICBudW1iZXI7XG4gICAgc2Nyb2xsTnVtPztcbiAgfT4gPSBbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2NyZWVuU2l6ZU1hcCA9IHtcbiAgICB4eGw6IDE0NDAsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICB4bDogMTIwMCxcbiAgICBsZzogOTkyLFxuICAgIG1kOiA3NjgsXG4gICAgc206IDU3NixcbiAgICB4czogMCxcbiAgfTtcblxuICBwdWJsaWMgbGVhdmVPYnMkID0gbWVyZ2UoXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcIm1vdXNldXBcIiksXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcInRvdWNoZW5kXCIpXG4gICkucGlwZShcbiAgICB0YXAoKGU6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdyYWJiaW5nID0gZmFsc2U7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG5cbiAgcHJpdmF0ZSBpc0Zyb21BdXRvID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc0F1dG9OdW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZU9uQ29udGFpbmVyID0gZmFsc2U7XG4gIHByaXZhdGUgYWxpZ25EaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgZWxtV2lkdGggPSAwO1xuXG4gIHByaXZhdGUgcm9vdEVsbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyRWxtOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGVsbXM6IEFycmF5PEhUTUxFbGVtZW50PjtcblxuICBwcml2YXRlIGhhbW1lcjtcblxuICBwcml2YXRlIGRvTmV4dFN1YiQ6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkb05leHQ6IE9ic2VydmFibGU8YW55PjtcblxuICBwcml2YXRlIHJlc3RhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgc3BlZWRDaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDUwMDApO1xuICBwcml2YXRlIHN0b3BFdmVudCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBwcml2YXRlIF9wb3JncmVzc1dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudEluZGV4ID0gMDtcbiAgcHVibGljIF9zaG93TnVtID0gMTtcbiAgcHJpdmF0ZSBfYXV0b3BsYXkgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaW5maW5pdGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZ3JhYmJpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZURyYWcgPSBmYWxzZTtcbiAgcHVibGljIGdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcblxuICBwcml2YXRlIHBhbkNvdW50ID0gMDtcblxuICAvLyB0aGlzIHZhcmlhYmxlIHVzZSBmb3IgY2hlY2sgdGhlIGluaXQgdmFsdWUgaXMgd3JpdGUgd2l0aCBuZ01vZGVsLFxuICAvLyB3aGVuIGluaXQgZmlyc3QsIG5vdCBzZXQgd2l0aCBhbmltYXRpb25cblxuICBwdWJsaWMgcmVhbEluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG4gIHB1YmxpYyB3cmFwcGVyV2lkdGg7XG5cbiAgcHVibGljIHNpbmdsZVRpbWVSdW4gPSB0cnVlO1xuICBwcml2YXRlIGluaXRpYWxJbmRleCA9IDA7XG4gIHB1YmxpYyBvcmdpbmFsRGF0YSA9IFtdO1xuXG4gIHByaXZhdGUgX2luZmluZURhdGFDb3VudCA9IDA7XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yb290RWxtID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsbSA9IHRoaXMucm9vdEVsbS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9ya0pvaW4oW1xuICAgICAgLi4udGhpcy5iaW5kQ2xpY2soKSxcbiAgICAgIC8vIHdoZW4gaXRlbSBjaGFuZ2VkLCByZW1vdmUgb2xkIGhhbW1lciBiaW5kaW5nLCBhbmQgcmVzZXQgd2lkdGhcbiAgICAgIHRoaXMuaXRlbUVsbXMuY2hhbmdlcy5waXBlKFxuICAgICAgICAvLyBkZXRlY3RDaGFuZ2VzIHRvIGNoYW5nZSB2aWV3IGRvdHNcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGkgY2FuJ3QgcGFzcyB0aGUgY2hhbmdlZGV0ZWN0aW9uIGNoZWNrLCBvbmx5IHRoZSB3YXkgdG8gdXNpbmcgdGltZW91dC4gOihcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKSlcbiAgICAgICksXG4gICAgICByZXNpemVPYnNlcnZhYmxlKHRoaXMucm9vdEVsbSwgKCkgPT4gdGhpcy5jb250YWluZXJSZXNpemUoKSksXG4gICAgXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZhcmlhYmxlKCk7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgodHJ1ZSk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgfVxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAvKiBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnJ1bkxvb3ApIHtcbiAgICAgIHRoaXMuYWRkSW5maW5pdGVFbG0oKTtcbiAgICB9ICovXG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG5cbiAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0b3J5SGFtbWVyKCkge1xuICAgIGlmICh0aGlzLmhhbW1lcikge1xuICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udGFpbmVyUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5pbml0aWFsSW5kZXg7XG5cbiAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRWYXJpYWJsZSgpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuZWxtcyA9IHRoaXMuaXRlbUVsbXMudG9BcnJheSgpLm1hcCgoeCkgPT4geC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgbGV0IHN0YXJ0RXZlbnQgPSB0aGlzLnJlc3RhcnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICBsZXQgc3RvcEV2ZW50ID0gdGhpcy5zdG9wRXZlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICBpZiAodGhpcy5tb3Vyc2VFbmFibGUpIHtcbiAgICAgICAgc3RhcnRFdmVudCA9IG1lcmdlKFxuICAgICAgICAgIHN0YXJ0RXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlbGVhdmVcIikucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5ncmFiYmluZyksXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IGZhbHNlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHN0b3BFdmVudCA9IG1lcmdlKFxuICAgICAgICAgIHN0b3BFdmVudCxcbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5jb250YWluZXJFbG0sIFwibW91c2VvdmVyXCIpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IHRydWUpKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kb05leHQgPSBzdGFydEV2ZW50LnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnNwZWVkQ2hhbmdlKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgdGltZXIodGhpcy5kZWxheSkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnJ1blByb2dyZXNzKDIwKSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzRnJvbUF1dG8gPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFrZVVudGlsKHN0b3BFdmVudC5waXBlKHRhcCgoKSA9PiAodGhpcy5wcm9ncmVzc1dpZHRoID0gMCkpKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZVNldEFsaWduRGlzdGFuY2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9ICh0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMuZWxtV2lkdGgpIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSB0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMuZWxtV2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld1dpZHRoKGlzSW5pdD86IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5pc0F1dG9OdW0pIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSB0aGlzLmdldEF1dG9OdW0oKTtcbiAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5fc2hvd051bTtcbiAgICB9XG4gICAgdGhpcy5faW5maW5lRGF0YUNvdW50ID0gdGhpcy5fc2hvd051bSAqIDI7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5lbG1XaWR0aCA9IHRoaXMucm9vdEVsbVdpZHRoIC8gKHRoaXMuX3Nob3dOdW0gLyB0aGlzLmdyaWRCeS5jb2wpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICApO1xuXG4gICAgdGhpcy5jb250YWluZXJFbG1XaWR0aCA9XG4gICAgICAodGhpcy5lbG1XaWR0aCAvIHRoaXMuZ3JpZEJ5LmNvbCkgKiB0aGlzLmVsbXMubGVuZ3RoO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcbiAgICB0aGlzLnZpZXdBcmVhLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwic3R5bGVcIixcbiAgICAgICAgYHdpZHRoOiR7XG4gICAgICAgICAgKHRoaXMucm9vdEVsbVdpZHRoICogdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wpIC8gdGhpcy5fc2hvd051bVxuICAgICAgICB9cHhgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbG1zLmZvckVhY2goKGVsbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoZWxtLCBcIndpZHRoXCIsIHRoaXMuZWxtV2lkdGgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEhhbW1lcigpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBobSA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLmNvbnRhaW5lckVsbSk7XG5cbiAgICAgIGNvbnN0IHBhbiA9IG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBobS5hZGQocGFuKTtcblxuICAgICAgaG0ub24oXCJwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWxcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoT25lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09IFwiY2VudGVyXCIgJiYgdGhpcy5zaG93TnVtID49IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgdGhpcy5vdXRPZkJvdW5kKGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgZS5kZWx0YVggKj0gMC4yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubm90RHJhZykge1xuICAgICAgICAgICAgICB0aGlzLmxlZnQgPVxuICAgICAgICAgICAgICAgIC10aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMuZWxtV2lkdGggK1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgZS5kZWx0YVg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RyYWdNYW55KSB7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogMC41KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhbmNhbmNlbFwiOlxuICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJwYW5lbmRcIjpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoTWF0aC5hYnMoZS5kZWx0YVgpIC8gdGhpcy5lbG1XaWR0aClcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTnVtO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gbW92ZU51bTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggKyBtb3ZlTnVtO1xuXG4gICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAodGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW0pKVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5idG5QcmV2Lm5hdGl2ZUVsZW1lbnQsIFwiY2xpY2tcIikucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGNhbGxSZXN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLm1vdXNlT25Db250YWluZXIgJiYgIXRoaXMuZ3JhYmJpbmcpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3RhcnQubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd1ZpZXcoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBpc0FuaW1hdGlvbiA9IHRydWUsXG4gICAgaXNGcm9tQXV0byA9IHRoaXMuaXNGcm9tQXV0b1xuICApIHtcbiAgICBpZiAodGhpcy5lbG1zLmxlbmd0aCA+IDEgJiYgdGhpcy5lbG1zLmxlbmd0aCA+IHRoaXMuX3Nob3dOdW0pIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5sZWZ0ID0gLShpbmRleCAqIHRoaXMuZWxtV2lkdGggLSB0aGlzLmFsaWduRGlzdGFuY2UpO1xuXG4gICAgICBpZiAoaXNBbmltYXRpb24pIHtcbiAgICAgICAgaWYgKGlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlZnQgPSB0aGlzLmFsaWduRGlzdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvdXRPZkJvdW5kKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJwYW5sZWZ0XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4IDw9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBydW5Qcm9ncmVzcyhiZXR3ZWVuVGltZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG93VGltZXMgPSB0aGlzLnNwZWVkIC8gYmV0d2VlblRpbWU7XG4gICAgICBjb25zdCBldmVyeUluY3JlYXNlID0gKDEwMCAvIHRoaXMuc3BlZWQpICogYmV0d2VlblRpbWU7XG4gICAgICByZXR1cm4gaW50ZXJ2YWwoYmV0d2VlblRpbWUpLnBpcGUoXG4gICAgICAgIHRhcCgodCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9ICh0ICUgaG93VGltZXMpICogZXZlcnlJbmNyZWFzZTtcbiAgICAgICAgfSksXG4gICAgICAgIGJ1ZmZlckNvdW50KE1hdGgucm91bmQoaG93VGltZXMpLCAwKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGluaXREYXRhKHNob3dOdW0pIHtcbiAgICBpZiAoIXRoaXMub3JnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yZ2luYWxEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgIHRoaXMuc2luZ2xlVGltZVJ1biA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheUNyZWF0b3IodGhpcy5vcmdpbmFsRGF0YSwgc2hvd051bSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBzaG93TnVtO1xuICAgICAgdGhpcy5pbml0aWFsSW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEF1dG9OdW0oKSB7XG4gICAgY29uc3QgY3VycldpZHRoID0gdGhpcy5yb290RWxtV2lkdGg7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3cgPSB0aGlzLmJyZWFrcG9pbnQuZmluZCgoYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplTWFwW2Iuc2NyZWVuU2l6ZV0gPD0gY3VycldpZHRoO1xuICAgICAgfSk7XG4gICAgICBpZiAobm93KSB7XG4gICAgICAgIGlmIChub3cuZ3JpZEJ5KSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuZ3JpZEJ5LmNvbCB8fCBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSBub3cuZ3JpZEJ5O1xuICAgICAgICAgIGNvbnN0IHNob3dOdW0gPSBub3cuZ3JpZEJ5LmNvbCAqIG5vdy5ncmlkQnkucm93IHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHNob3dOdW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG4gICAgICAgICAgcmV0dXJuIG5vdy5udW1iZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeSkge1xuICAgICAgICB0aGlzLnNjcm9sbE51bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5zY3JvbGxOdW0gfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgdGhpcy5ncmlkQnkgPSB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeTtcbiAgICAgICAgY29uc3Qgc2hvd051bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sICpcbiAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LnJvdyB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXROdW0gPSAzO1xuICAgIGlmIChjdXJyV2lkdGggPiAyMDApIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGluaXROdW0gKyBjdXJyV2lkdGggLyAxMDApO1xuICAgIH1cblxuICAgIHJldHVybiBpbml0TnVtO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShlbG06IEhUTUxFbGVtZW50LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfSVgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJhY2tCeUZjbihpbmRleCwgaXRlbSkge1xuICAgIGlmICghaXRlbSB8fCBpdGVtW3RoaXMudHJhY2tCeUtleV0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVt0aGlzLnRyYWNrQnlLZXldO1xuICB9XG5cbiAgcHVibGljIGFycmF5Q3JlYXRvcihhcnIsIGNvdW50KSB7XG4gICAgY29uc3QgZGF0YSA9IFsuLi5hcnJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgZGF0YS51bnNoaWZ0KGFyclthcnIubGVuZ3RoIC0gMSAtIChpICUgYXJyLmxlbmd0aCldKTtcbiAgICAgIGRhdGEucHVzaChhcnJbaSAlIGFyci5sZW5ndGhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==