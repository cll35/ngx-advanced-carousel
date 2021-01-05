/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-advanced-carousel.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, forkJoin, fromEvent, interval, merge, of, Subject, timer, } from "rxjs";
import { bufferCount, filter, map, switchMap, take, takeUntil, tap, } from "rxjs/operators";
import { NgxAdvancedCarouselItemDirective } from "./ngx-advanced-carousel-item.directive";
import { resizeObservable } from "./rxjs.observable.resize";
export class NgxAdvancedCarouselComponent {
    /**
     * @param {?} platformId
     * @param {?} _document
     * @param {?} _renderer
     * @param {?} _zone
     * @param {?} _cd
     */
    constructor(platformId, _document, _renderer, _zone, _cd) {
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
        (e) => {
            this.grabbing = false;
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
        (_) => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data = value;
    }
    /**
     * disable drag event with touch and mouse pan moving, default is `false`
     * @return {?}
     */
    get disableDrag() {
        return this._disableDrag;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableDrag(value) {
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
    }
    /**
     * is the carousel can move infinite
     * @return {?}
     */
    get infinite() {
        return this._infinite;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set infinite(value) {
        this._infinite = value;
        /* this.infiniteElmRefs.forEach((ref) => {
          this.addStyle(ref.rootNodes[0], {
            visibility: this.runLoop ? 'visible' : 'hidden',
          });
        }); */
    }
    /**
     * auto play speed
     * @return {?}
     */
    get speed() {
        return this.speedChange.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set speed(value) {
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.speedChange.next(value);
        }));
    }
    /**
     * how many number items to show once, default is `1`
     * set `auto` to using `[breakpoint]` set value.
     * @return {?}
     */
    get showNum() {
        return this._showNum;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showNum(value) {
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
    }
    /**
     * carousel auto play confing
     * @return {?}
     */
    get autoplay() {
        return this._autoplay;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        if (isPlatformBrowser(this.platformId)) {
            if (this.elms) {
                this.progressWidth = 0;
                if (value) {
                    this._zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        this.doNextSub$ = this.doNext.subscribe();
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
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        return this._currentIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentIndex(value) {
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
                    () => {
                        this.stopEvent.next();
                        this.callRestart();
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
                        this._currentIndex = this.currentIndex + this._showNum * 2;
                    }
                    if (this.currentIndex > this.data.length - this._showNum * 2 - 1) {
                        this._currentIndex =
                            this.currentIndex - this.data.length + this._showNum * 4;
                    }
                    this._zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        timer(this.aniTime + 100)
                            .pipe(switchMap((/**
                         * @return {?}
                         */
                        () => {
                            this.drawView(this.currentIndex, false);
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
                () => {
                    this.onChange(this.currentIndex);
                    this._cd.detectChanges();
                }));
            }
        }
        this.indexChanged.emit({
            realIndex: this.realIndex,
            currentIndex: this.currentIndex,
            viewSize: this._showNum,
        });
        this.isFromAuto = false;
    }
    /**
     * @return {?}
     */
    get progressWidth() {
        return this._porgressWidth;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set progressWidth(value) {
        if (this.progressElm !== undefined && this.autoplay) {
            this._porgressWidth = value;
            this._renderer.setStyle(((/** @type {?} */ (this.progressContainerElm.nativeElement))).children[0], "width", `${this.progressWidth}%`);
        }
    }
    /**
     * @return {?}
     */
    get grabbing() {
        return this._grabbing;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set grabbing(value) {
        if (this._grabbing !== value) {
            this._zone.run((/**
             * @return {?}
             */
            () => {
                this._grabbing = value;
                if (value) {
                    this._renderer.addClass(this.containerElm, "grabbing");
                }
                else {
                    this.panCount = 0;
                    this.callRestart();
                    this._renderer.removeClass(this.containerElm, "grabbing");
                }
                this._cd.detectChanges();
            }));
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set left(value) {
        if (!this.verticalModeEnabled) {
            if (isPlatformBrowser(this.platformId)) {
                this._renderer.setStyle(this.containerElm, "transform", `translateX(${value + (this.currentIndex !== 0 ? this.padding : 0)}px)`);
            }
            else {
                this._renderer.setStyle(this.containerElm, "transform", `translateX(${value}%)`);
            }
        }
        else {
            if (isPlatformBrowser(this.platformId)) {
                this._renderer.setStyle(this.containerElm, "transform", `translateY(${value + (this.currentIndex !== 0 ? this.padding : 0)}px)`);
            }
            else {
                this._renderer.setStyle(this.containerElm, "transform", `translateY(${value}%)`);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    get maxRightIndex() {
        /** @type {?} */
        let addIndex = 0;
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
    }
    /**
     * @private
     * @return {?}
     */
    get runLoop() {
        return this.autoplay || this.infinite;
    }
    /**
     * @private
     * @return {?}
     */
    get lengthOne() {
        return this.itemElms.length === 1;
    }
    /**
     * @private
     * @return {?}
     */
    get rootElmWidth() {
        return isPlatformBrowser(this.platformId)
            ? this.rootElm.getBoundingClientRect().width
            : 100;
    }
    /**
     * @private
     * @return {?}
     */
    get rootElmHeight() {
        return isPlatformBrowser(this.platformId)
            ? this.rootElm.getBoundingClientRect().height
            : 100;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set containerElmWidth(value) {
        if (!this.verticalModeEnabled) {
            this.setStyle(this.containerElm, "width", value);
        }
        else {
            this.containerElmHeight = value;
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set containerElmHeight(value) {
        this.setStyle(this.containerElm, "height", value);
    }
    /**
     * @private
     * @return {?}
     */
    get startIndex() {
        return this._startIndex;
    }
    /**
     * @private
     * @param {?} val
     * @return {?}
     */
    set startIndex(val) {
        this._startIndex = val;
        this.currentIndex = this._startIndex;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.rootElm = this.container.nativeElement;
        this.containerElm = (/** @type {?} */ (this.rootElm.children[0]));
        this.init();
        forkJoin([
            ...this.bindClick(),
            // when item changed, remove old hammer binding, and reset width
            this.itemElms.changes.pipe(
            // detectChanges to change view dots
            tap((/**
             * @return {?}
             */
            () => {
                if (this.currentIndex > this.itemElms.length - 1) {
                    // i can't pass the changedetection check, only the way to using timeout. :(
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.currentIndex = this.itemElms.length - 1;
                    }), 0);
                }
                this.destroy();
                this.init();
                this.progressWidth = 0;
            })), tap((/**
             * @return {?}
             */
            () => this._cd.detectChanges()))),
            resizeObservable(this.rootElm, (/**
             * @return {?}
             */
            () => this.containerResize())),
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value || value === 0) {
            this.currentIndex = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @private
     * @return {?}
     */
    init() {
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
    }
    /**
     * @private
     * @return {?}
     */
    destroy() {
        this.destoryHammer();
        if (this.autoplay) {
            this.doNextSub$.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    destoryHammer() {
        if (this.hammer) {
            this.hammer.destroy();
        }
    }
    /**
     * @private
     * @return {?}
     */
    containerResize() {
        this.setViewWidth();
        this.reSetAlignDistance();
        this.currentIndex = this.startIndex || this.initialIndex;
        this.drawView(this.currentIndex, false);
    }
    /**
     * @private
     * @return {?}
     */
    initVariable() {
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.elms = this.itemElms.toArray().map((/**
             * @param {?} x
             * @return {?}
             */
            (x) => x.nativeElement));
            /** @type {?} */
            let startEvent = this.restart.asObservable();
            /** @type {?} */
            let stopEvent = this.stopEvent.asObservable();
            if (this.mourseEnable) {
                startEvent = merge(startEvent, fromEvent(this.containerElm, "mouseleave").pipe(filter((/**
                 * @return {?}
                 */
                () => !this.grabbing)), tap((/**
                 * @return {?}
                 */
                () => (this.mouseOnContainer = false)))));
                stopEvent = merge(stopEvent, fromEvent(this.containerElm, "mouseover").pipe(tap((/**
                 * @return {?}
                 */
                () => (this.mouseOnContainer = true)))));
            }
            this.doNext = startEvent.pipe(switchMap((/**
             * @return {?}
             */
            () => this.speedChange)), switchMap((/**
             * @return {?}
             */
            () => timer(this.delay).pipe(switchMap((/**
             * @return {?}
             */
            () => this.runProgress(20))), tap((/**
             * @return {?}
             */
            () => {
                this.isFromAuto = true;
                if (this.direction === "left") {
                    this.currentIndex -= this.scrollNum;
                }
                else {
                    this.currentIndex += this.scrollNum;
                }
            })), takeUntil(stopEvent.pipe(tap((/**
             * @return {?}
             */
            () => (this.progressWidth = 0)))))))));
            if (this.autoplay) {
                this.doNextSub$ = this.doNext.subscribe();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    reSetAlignDistance() {
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
            case "top":
                this.alignDistance = 0;
                break;
            case "bottom":
                this.alignDistance = this.rootElmHeight - this.elmHeight;
        }
    }
    /**
     * @private
     * @param {?=} isInit
     * @return {?}
     */
    setViewWidth(isInit) {
        if (!this.verticalModeEnabled) {
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
                (this.rootElmWidth - this.padding * 2) *
                    (this.elms.length / this._showNum);
            this._renderer.setStyle(this.containerElm, "position", "relative");
            this.viewArea.forEach((/**
             * @param {?} element
             * @return {?}
             */
            (element) => {
                element.nativeElement.setAttribute("style", `width:${this.rootElmWidth - this.padding * 2}px`);
            }));
            this.elms.forEach((/**
             * @param {?} elm
             * @return {?}
             */
            (elm) => {
                this.setStyle(elm, "width", this.elmWidth);
            }));
        }
        else {
            this.setViewHeight(isInit);
        }
        this._cd.detectChanges();
    }
    /**
     * @private
     * @param {?=} isInit
     * @return {?}
     */
    setViewHeight(isInit) {
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
        (element) => {
            element.nativeElement.setAttribute("style", `height:${this.rootElmHeight - this.padding * 2}px`);
        }));
        this.elms.forEach((/**
         * @param {?} elm
         * @return {?}
         */
        (elm) => {
            this.setStyle(elm, "height", this.elmWidth);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    bindHammer() {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        return this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const hm = new Hammer.Manager(this.containerElm);
            /** @type {?} */
            const pan = new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 0,
            });
            hm.add(pan);
            hm.on("panleft panright panend pancancel", (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                if (this.lengthOne) {
                    return;
                }
                this.removeContainerTransition();
                if (this.autoplay) {
                    this._zone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => {
                        this.stopEvent.next();
                    }));
                }
                switch (e.type) {
                    case "panleft":
                    case "panright":
                        this.panCount++;
                        if (this.panCount < 2) {
                            return;
                        }
                        this.grabbing = true;
                        if (this.align !== "center" && this.showNum >= this.elms.length) {
                            this.hammer.stop(true);
                            return;
                        }
                        if (!this.runLoop && this.outOfBound(e.type)) {
                            this.verticalModeEnabled ? e.deltaY : (e.deltaX *= 0.2);
                        }
                        if (!this.notDrag) {
                            this.left =
                                -this.currentIndex * this.elmWidth +
                                    this.alignDistance +
                                    (this.verticalModeEnabled ? e.deltaY : e.deltaX);
                        }
                        if (!this.isDragMany) {
                            if (Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                                this.elmWidth * 0.5) {
                                if ((this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                                    this.currentIndex -= this.scrollNum;
                                }
                                else {
                                    this.currentIndex += this.scrollNum;
                                }
                                this.hammer.stop(true);
                                return;
                            }
                        }
                        break;
                    case "pancancel":
                        this.drawView(this.currentIndex);
                        break;
                    case "panend":
                        if (this.panBoundary !== false &&
                            Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                                this.elmWidth * this.panBoundary) {
                            /** @type {?} */
                            const moveNum = this.isDragMany
                                ? Math.ceil(Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) /
                                    this.elmWidth)
                                : this.scrollNum;
                            /** @type {?} */
                            const prevIndex = this.currentIndex - moveNum;
                            /** @type {?} */
                            const nextIndex = this.currentIndex + moveNum;
                            if ((this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                                this.goPrev(prevIndex);
                            }
                            else {
                                this.goNext(nextIndex);
                            }
                            break;
                        }
                        else if (e.velocityX < -this.swipeVelocity && e.distance > 10) {
                            this.goNext(this.currentIndex + this.scrollNum);
                        }
                        else if (e.velocityX > this.swipeVelocity && e.distance > 10) {
                            this.goPrev(this.currentIndex - this.scrollNum);
                        }
                        else {
                            this.drawView(this.currentIndex);
                        }
                        break;
                }
            }));
            return hm;
        }));
    }
    /**
     * @private
     * @param {?} prevIndex
     * @return {?}
     */
    goPrev(prevIndex) {
        if (!this.runLoop && prevIndex < 0) {
            prevIndex = 0;
            this.drawView(0);
        }
        this.currentIndex = prevIndex;
    }
    /**
     * @private
     * @param {?} nextIndex
     * @return {?}
     */
    goNext(nextIndex) {
        if (!this.runLoop && nextIndex > this.maxRightIndex) {
            nextIndex = this.maxRightIndex;
            this.drawView(nextIndex);
        }
        this.currentIndex = nextIndex;
    }
    /**
     * @private
     * @return {?}
     */
    bindClick() {
        if (this.btnNext && this.btnPrev) {
            return [
                fromEvent(this.btnNext.nativeElement, "click").pipe(map((/**
                 * @return {?}
                 */
                () => (this.currentIndex += this.scrollNum)))),
                fromEvent(this.btnPrev.nativeElement, "click").pipe(map((/**
                 * @return {?}
                 */
                () => {
                    return (this.currentIndex = this.currentIndex - this.scrollNum);
                }))),
            ];
        }
        return [];
    }
    /**
     * @private
     * @return {?}
     */
    callRestart() {
        if (this.autoplay && !this.mouseOnContainer && !this.grabbing) {
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.restart.next(null);
            }));
        }
    }
    /**
     * @private
     * @param {?} index
     * @param {?=} isAnimation
     * @param {?=} isFromAuto
     * @return {?}
     */
    drawView(index, isAnimation = true, isFromAuto = this.isFromAuto) {
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
    }
    /**
     * @private
     * @return {?}
     */
    removeContainerTransition() {
        this._renderer.removeClass(this.containerElm, this.aniClass);
        this._renderer.removeClass(this.containerElm, this.aniClassAuto);
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    outOfBound(type) {
        switch (type) {
            case "panleft":
                return this.currentIndex >= this.maxRightIndex;
            case "panright":
                return this.currentIndex <= 0;
        }
    }
    /**
     * @private
     * @param {?} betweenTime
     * @return {?}
     */
    runProgress(betweenTime) {
        return this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const howTimes = this.speed / betweenTime;
            /** @type {?} */
            const everyIncrease = (100 / this.speed) * betweenTime;
            return interval(betweenTime).pipe(tap((/**
             * @param {?} t
             * @return {?}
             */
            (t) => {
                this.progressWidth = (t % howTimes) * everyIncrease;
            })), bufferCount(Math.round(howTimes), 0));
        }));
    }
    /**
     * @private
     * @param {?} showNum
     * @return {?}
     */
    initData(showNum) {
        if (!this.originalData.length) {
            this.originalData = [...this.data];
        }
        if (this.infinite) {
            this.singleTimeRun = false;
            this.data = this.arrayCreator(this.originalData, showNum);
            this._currentIndex = showNum;
            this.initialIndex = this.currentIndex;
        }
    }
    /**
     * @private
     * @return {?}
     */
    getAutoNum() {
        /** @type {?} */
        const currWidth = this.rootElmWidth;
        if (this.breakpoint.length > 0) {
            /** @type {?} */
            const now = this.breakpoint.find((/**
             * @param {?} b
             * @return {?}
             */
            (b) => {
                return this.screenSizeMap[b.screenSize] <= currWidth;
            }));
            if (now) {
                this.padding = now.padding || this.padding;
                if (now.gridBy) {
                    this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
                    this.gridBy = now.gridBy;
                    /** @type {?} */
                    const showNum = now.gridBy.col * now.gridBy.row || now.number;
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
                const showNum = this.breakpoint[this.breakpoint.length - 1].gridBy.col *
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
        const initNum = 3;
        if (currWidth > 200) {
            return Math.floor(initNum + currWidth / 100);
        }
        return initNum;
    }
    /**
     * @private
     * @param {?} elm
     * @param {?} style
     * @param {?} value
     * @return {?}
     */
    setStyle(elm, style, value) {
        if (isPlatformBrowser(this.platformId)) {
            this._renderer.setStyle(elm, style, `${value}px`);
        }
        else {
            this._renderer.setStyle(elm, style, `${value}%`);
        }
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFcn(index, item) {
        if (!item || item[this.trackByKey]) {
            return null;
        }
        return item[this.trackByKey];
    }
    /**
     * @param {?} arr
     * @param {?} count
     * @return {?}
     */
    arrayCreator(arr, count) {
        /** @type {?} */
        const data = [...arr];
        for (let i = 0; i < count; i++) {
            data.unshift(arr[arr.length - 1 - (i % arr.length)]);
            data.push(arr[i % arr.length]);
        }
        return data;
    }
}
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
                        () => NgxAdvancedCarouselComponent)),
                        multi: true,
                    },
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;height:100%}.invisible{visibility:hidden}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel-container{position:relative}.carousel-container .carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel-container .carousel .slide{display:flex;flex-direction:row}.carousel-container .carousel .transition{transition:.5s ease-in-out}.carousel-container .carousel .content{display:flex}.carousel-container .carousel .content .item{display:block;opacity:0;width:100%}.carousel-container .carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel-container .carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel-container .carousel .content .item.visible{opacity:1}.carousel-container .carousel .content .item:first-child,.carousel-container .carousel .content .item:last-child{opacity:0}.carousel-container .carousel .content .item.visible_important{opacity:1}.carousel-container ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel-container ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel-container .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel-container .direction.left{left:0}.carousel-container .direction.right{position:absolute;right:0}.carousel-container .direction.disabled{opacity:.6;pointer-events:none}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"]
            }] }
];
/** @nocollapse */
NgxAdvancedCarouselComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
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
    breakpoint: [{ type: Input }],
    screenSizeMap: [{ type: Input }],
    padding: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQXFWdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFD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QixvREFBeUI7O0lBQ3pCLG9EQUF5Qjs7Ozs7SUFFekIsd0RBQTZCOzs7OztJQWlEN0IsZ0RBQWtDOzs7OztJQUNsQyxpREFBNkI7Ozs7O0lBcE4zQixrREFBNEM7Ozs7O0lBQzVDLGlEQUFtQzs7Ozs7SUFDbkMsaURBQTRCOzs7OztJQUM1Qiw2Q0FBcUI7Ozs7O0lBQ3JCLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBmcm9tRXZlbnQsXG4gIGludGVydmFsLFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBidWZmZXJDb3VudCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUgfSBmcm9tIFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtaXRlbS5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IHJlc2l6ZU9ic2VydmFibGUgfSBmcm9tIFwiLi9yeGpzLm9ic2VydmFibGUucmVzaXplXCI7XG5kZWNsYXJlIHZhciBIYW1tZXI7XG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6IFwibmd4LWFkdmFuY2VkLWNhcm91c2VsXCIsXG4gIHN0eWxlVXJsczogW1wiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG4gIC8qKiBkaXNhYmxlIGRyYWcgZXZlbnQgd2l0aCB0b3VjaCBhbmQgbW91c2UgcGFuIG1vdmluZywgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRpc2FibGUtZHJhZ1wiKVxuICBwdWJsaWMgZ2V0IGRpc2FibGVEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlRHJhZztcbiAgfVxuICBwdWJsaWMgc2V0IGRpc2FibGVEcmFnKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVEcmFnICE9PSB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVEcmFnID0gdmFsdWU7XG4gIH1cblxuICAvKiogaXMgdGhlIGNhcm91c2VsIGNhbiBtb3ZlIGluZmluaXRlICovXG4gIEBJbnB1dChcImluZmluaXRlXCIpXG4gIHB1YmxpYyBnZXQgaW5maW5pdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZmluaXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgaW5maW5pdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbmZpbml0ZSA9IHZhbHVlO1xuXG4gICAgLyogdGhpcy5pbmZpbml0ZUVsbVJlZnMuZm9yRWFjaCgocmVmKSA9PiB7XG4gICAgICB0aGlzLmFkZFN0eWxlKHJlZi5yb290Tm9kZXNbMF0sIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5ydW5Mb29wID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG4gICAgICB9KTtcbiAgICB9KTsgKi9cbiAgfVxuXG4gIC8qKiBhdXRvIHBsYXkgc3BlZWQgKi9cbiAgQElucHV0KFwiYXV0b3BsYXktc3BlZWRcIilcbiAgcHVibGljIGdldCBzcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGVlZENoYW5nZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhvdyBtYW55IG51bWJlciBpdGVtcyB0byBzaG93IG9uY2UsIGRlZmF1bHQgaXMgYDFgXG4gICAqIHNldCBgYXV0b2AgdG8gdXNpbmcgYFticmVha3BvaW50XWAgc2V0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KFwic2hvdy1udW1cIilcbiAgcHVibGljIGdldCBzaG93TnVtKCk6IG51bWJlciB8IFwiYXV0b1wiIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd051bTtcbiAgfVxuICBwdWJsaWMgc2V0IHNob3dOdW0odmFsdWU6IG51bWJlciB8IFwiYXV0b1wiKSB7XG4gICAgaWYgKHZhbHVlID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5pc0F1dG9OdW0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gK3ZhbHVlO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRWaWV3SGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBjYXJvdXNlbCBhdXRvIHBsYXkgY29uZmluZyAqL1xuICBASW5wdXQoXCJhdXRvcGxheVwiKVxuICBwdWJsaWMgZ2V0IGF1dG9wbGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdXRvcGxheTtcbiAgfVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5kb05leHRTdWIkKSB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgICAvLyBpZiBzZXQgYXV0b3BsYXksIHRoZW4gdGhlIGluZmluaXRlIGlzIHRydWVcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW5maW5pdGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyB2ZXJ0aWNhbE1vZGVFbmFibGVkID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRJbmRleCh2YWx1ZSkge1xuICAgIC8vIGlmIG5vdyBpbmRleCBpZiBub3QgZXF1YWxlIHRvIHNhdmUgaW5kZXgsIGRvIHNvbWV0aW5nXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5vdCBjb250YWluIHdpdGggdGhlIGJvdW5kYXJ5IG5vdCBoYW5kbGVyd1xuICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLml0ZW1FbG1zIHx8XG4gICAgICAgICghdGhpcy5ydW5Mb29wICYmICEoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSAmJiAhdGhpcy5pc0Zyb21BdXRvKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFdmVudC5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgIHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDFcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICBpZiAoIXRoaXMuaW5maW5pdGUgJiYgdGhpcy5yZWFsSW5kZXggPiB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLmVsbXMubGVuZ3RoO1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wgPFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bSA8IDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IDwgMCAmJiAhdGhpcy5pbmZpbml0ZSA/IDAgOiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5pbml0aWFsSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bSAqIDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogMiAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5kYXRhLmxlbmd0aCArIHRoaXMuX3Nob3dOdW0gKiA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyKHRoaXMuYW5pVGltZSArIDEwMClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlmICh0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9ICh0aGlzLnJlYWxJbmRleCAtIHRoaXMuZWxtcy5sZW5ndGgpICUgdGhpcy5fc2hvd051bTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggLT0gY291bnQ7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAwIDw9IHRoaXMuY3VycmVudEluZGV4ICYmXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4IDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluZGV4Q2hhbmdlZC5lbWl0KHtcbiAgICAgIHJlYWxJbmRleDogdGhpcy5yZWFsSW5kZXgsXG4gICAgICBjdXJyZW50SW5kZXg6IHRoaXMuY3VycmVudEluZGV4LFxuICAgICAgdmlld1NpemU6IHRoaXMuX3Nob3dOdW0sXG4gICAgfSk7XG4gICAgdGhpcy5pc0Zyb21BdXRvID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2dyZXNzV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcmdyZXNzV2lkdGg7XG4gIH1cbiAgcHVibGljIHNldCBwcm9ncmVzc1dpZHRoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NFbG0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLl9wb3JncmVzc1dpZHRoID0gdmFsdWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgKHRoaXMucHJvZ3Jlc3NDb250YWluZXJFbG0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW5bMF0sXG4gICAgICAgIFwid2lkdGhcIixcbiAgICAgICAgYCR7dGhpcy5wcm9ncmVzc1dpZHRofSVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ3JhYmJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYWJiaW5nO1xuICB9XG4gIHB1YmxpYyBzZXQgZ3JhYmJpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZ3JhYmJpbmcgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2dyYWJiaW5nID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFuQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldCBsZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgICBgdHJhbnNsYXRlWCgke1xuICAgICAgICAgICAgdmFsdWUgKyAodGhpcy5jdXJyZW50SW5kZXggIT09IDAgPyB0aGlzLnBhZGRpbmcgOiAwKVxuICAgICAgICAgIH1weClgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWV9JSlgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgICAgYHRyYW5zbGF0ZVkoJHtcbiAgICAgICAgICAgIHZhbHVlICsgKHRoaXMuY3VycmVudEluZGV4ICE9PSAwID8gdGhpcy5wYWRkaW5nIDogMClcbiAgICAgICAgICB9cHgpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgICBgdHJhbnNsYXRlWSgke3ZhbHVlfSUpYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1heFJpZ2h0SW5kZXgoKSB7XG4gICAgbGV0IGFkZEluZGV4ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMuYWxpZ24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAodGhpcy5zaG93TnVtIGFzIG51bWJlcikgLSAxO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSAtIHRoaXMuX3Nob3dOdW0gKyAxICsgYWRkSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGdldCBydW5Mb29wKCkge1xuICAgIHJldHVybiB0aGlzLmF1dG9wbGF5IHx8IHRoaXMuaW5maW5pdGU7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgbGVuZ3RoT25lKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCA9PT0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJvb3RFbG1XaWR0aCgpIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKVxuICAgICAgPyB0aGlzLnJvb3RFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgIDogMTAwO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcm9vdEVsbUhlaWdodCgpIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKVxuICAgICAgPyB0aGlzLnJvb3RFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICA6IDEwMDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lckVsbVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJ3aWR0aFwiLCB2YWx1ZSk7XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5jb250YWluZXJFbG1IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldCBjb250YWluZXJFbG1IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwiaGVpZ2h0XCIsIHZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBwdWJsaWMgaW5kZXhDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9zdGFydEluZGV4ID0gMDtcblxuICBASW5wdXQoKVxuICBwcml2YXRlIGdldCBzdGFydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFydEluZGV4O1xuICB9XG4gIHByaXZhdGUgc2V0IHN0YXJ0SW5kZXgodmFsKSB7XG4gICAgdGhpcy5fc3RhcnRJbmRleCA9IHZhbDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuX3N0YXJ0SW5kZXg7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuICBAVmlld0NoaWxkKFwiY29udGFpbmVyRWxtXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKFwidmlld0FyZWFcIikgcHVibGljIHZpZXdBcmVhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoXCJwcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuUHJldjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5OZXh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0NvbnRhaW5lckVsbTogRWxlbWVudFJlZjtcblxuICAvLyBnZXQgYWxsIGl0ZW0gZWxtc1xuICBAQ29udGVudENoaWxkcmVuKE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlLCB7XG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gICAgcmVhZDogRWxlbWVudFJlZixcbiAgfSlcbiAgcHVibGljIGl0ZW1FbG1zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnRQcmV2OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxOZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudE5leHQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbERvdFwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGRvdEVsbTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsSXRlbVRlbXBsYXRlXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY2Fyb3VzZWxJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NFbG06IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIF9kYXRhOiBhbnlbXTtcblxuICBAT3V0cHV0KCkgcHVibGljIG1hcHBlZERhdGE6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiB3aGVuIGluZmluaXRlIGlzIHRydWUsIHRoZSBhbmltYXRpb24gdGltZSB3aXRoIGl0ZW0sIGRlZmF1bHQgaXMgNDAwLiAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pVGltZSA9IDQwMDtcbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgaW4gI2NvbnRhaW5lckVsbSB3aGVuIG1vZGVsIGNoYW5nZSAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3MgPSBcInRyYW5zaXRpb25cIjtcblxuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCB3aGVuIGNhcm91c2VsIGF1dG8gcGxheSxcbiAgICogdGhpcyBkZWZhdWx0IGF1dG9wbGF5IGFuaW1hdGlvbiBpcyBzYW1lIGFzIGFuaUNsYXNzXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3NBdXRvID0gdGhpcy5hbmlDbGFzcztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoXCJzaG93LW5leHQtcHJldi1idXR0b25zXCIpIHB1YmxpYyBzaG93QnV0dG9uc01ldGhvZDpcbiAgICB8IFwiYWx3YXlzXCJcbiAgICB8IFwiYXV0by1oaWRlXCJcbiAgICB8IFwiYXV0by1kaXNhYmxlXCIgPSBcImFsd2F5c1wiO1xuXG4gIC8qKlxuICAgKiB1c2VyIG1vdmUgcGljdHVyZSB3aXRoIHRoZSBjb250YWluZXIgd2lkdGggcmF0ZSxcbiAgICogd2hlbiBtb3JlIHRoYW4gdGhhdCByYXRlLCBpdCB3aWxsIGdvIHRvIG5leHQgb3IgcHJldixcbiAgICogc2V0IGZhbHNlIHdpbGwgbmV2ZXIgbW92ZSB3aXRoIGRpc3RhbmNlIHJhdGUsXG4gICAqIGRlZmF1bHQgaXMgYDAuMTVgXG4gICAqL1xuICBASW5wdXQoXCJwYW4tYm91bmRhcnlcIikgcHVibGljIHBhbkJvdW5kYXJ5OiBudW1iZXIgfCBmYWxzZSA9IDAuMTU7XG5cbiAgLyoqIHdoZW4gc2hvdy1udW0gaXMgYmlnZ2VyIHRoYW4gMSwgdGhlIGZpcnN0IGl0ZW0gYWxpZ24sIGRlZmF1bHRlIGlzIGBjZW50ZXJgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGlnbjogXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiIHwgXCJ0b3BcIiB8IFwiYm90dG9tXCIgPVxuICAgIFwiY2VudGVyXCI7XG5cbiAgLyoqXG4gICAqIGRpc2FibGUgd2hlbiBkcmFnIG9jY3VyIHRoZSBjaGlsZCBlbGVtZW50IHdpbGwgZm9sbG93IHRvdWNoIHBvaW50LlxuICAgKiBkZWZhdWx0IGlzIGBmYWxzZWBcbiAgICovXG4gIEBJbnB1dChcIm5vdC1mb2xsb3ctcGFuXCIpIHB1YmxpYyBub3REcmFnID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHVibGljIHRyYWNrQnlLZXkgPSBcImNvZGVcIjtcbiAgLyoqXG4gICAqIHRoZSBldmVudCBiaW5kaW5nIHN0YXRlIGZvciBzdG9wIGF1dG8gcGxheSB3aGVuIG1vdXJzZSBtb3Zlb3ZlclxuICAgKi9cbiAgQElucHV0KFwibW91cnNlLWVuYWJsZVwiKSBwdWJsaWMgbW91cnNlRW5hYmxlID0gZmFsc2U7XG4gIC8qKiBlYWNoIGF1dG8gcGxheSBiZXR3ZWVuIHRpbWUgKi9cbiAgQElucHV0KFwiYmV0d2Vlbi1kZWxheVwiKSBwdWJsaWMgZGVsYXkgPSA4MDAwO1xuICAvKiogYXV0byBwbGF5IGRpcmVjdGlvbiwgZGVmYXVsdCBpcyBgcmlnaHRgLiAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1kaXJlY3Rpb25cIikgcHVibGljIGRpcmVjdGlvbjogXCJsZWZ0XCIgfCBcInJpZ2h0XCIgPSBcInJpZ2h0XCI7XG4gIC8qKiBob3cgbWFueSBudW1iZXIgd2l0aCBlYWNoIHNjcm9sbCwgZGVmYXVsdCBpcyBgMWAuICovXG4gIEBJbnB1dChcInNjcm9sbC1udW1cIikgcHVibGljIHNjcm9sbE51bSA9IDE7XG4gIC8qKiBDb3VsZCB1c2VyIHNjcm9sbCBtYW55IGl0ZW0gb25jZSwgc2ltdWxhdGUgd2l0aCBzY3JvbGxiYXIsIGRlZmF1bHQgaXMgYGZhbHNlYCAqL1xuICBASW5wdXQoXCJkcmFnLW1hbnlcIikgcHVibGljIGlzRHJhZ01hbnkgPSBmYWxzZTtcbiAgLyoqIE1pbmltYWwgdmVsb2NpdHkgcmVxdWlyZWQgYmVmb3JlIHJlY29nbml6aW5nLCB1bml0IGlzIGluIHB4IHBlciBtcywgZGVmYXVsdCBgMC4zYCAqL1xuICBASW5wdXQoXCJzd2lwZS12ZWxvY2l0eVwiKSBwdWJsaWMgc3dpcGVWZWxvY2l0eSA9IDAuMztcblxuICAvKipcbiAgICogc3dpdGNoIHNob3cgbnVtYmVyIHdpdGggY3VzdG9tIGxvZ2ljIGxpa2UgY3NzIEBtZWRpYSAobWluLXdpZHRoOiBgbnVtYmVyYHB4KVxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGJyZWFrcG9pbnQ6IEFycmF5PHtcbiAgICBncmlkQnk/O1xuICAgIHNjcmVlblNpemU6IFwieHhsXCIgfCBcInhsXCIgfCBcImxnXCIgfCBcIm1kXCIgfCBcInNtXCIgfCBcInhzXCI7XG4gICAgbnVtYmVyO1xuICAgIHNjcm9sbE51bT87XG4gICAgcGFkZGluZz87XG4gIH0+ID0gW107XG5cbiAgQElucHV0KCkgcHVibGljIHNjcmVlblNpemVNYXAgPSB7XG4gICAgeHhsOiAxNDQwLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgeGw6IDEyMDAsXG4gICAgbGc6IDk5MixcbiAgICBtZDogNzY4LFxuICAgIHNtOiA1NzYsXG4gICAgeHM6IDAsXG4gIH07XG5cbiAgQElucHV0KCkgcGFkZGluZzogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgbGVhdmVPYnMkID0gbWVyZ2UoXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcIm1vdXNldXBcIiksXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcInRvdWNoZW5kXCIpXG4gICkucGlwZShcbiAgICB0YXAoKGU6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdyYWJiaW5nID0gZmFsc2U7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG5cbiAgcHJpdmF0ZSBpc0Zyb21BdXRvID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc0F1dG9OdW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZU9uQ29udGFpbmVyID0gZmFsc2U7XG4gIHByaXZhdGUgYWxpZ25EaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgZWxtV2lkdGggPSAwO1xuICBwcml2YXRlIGVsbUhlaWdodCA9IDA7XG5cbiAgcHJpdmF0ZSByb290RWxtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJFbG06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgZWxtczogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgaGFtbWVyO1xuXG4gIHByaXZhdGUgZG9OZXh0U3ViJDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRvTmV4dDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIHByaXZhdGUgcmVzdGFydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBzcGVlZENoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoNTAwMCk7XG4gIHByaXZhdGUgc3RvcEV2ZW50ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX3BvcmdyZXNzV2lkdGggPSAwO1xuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuICBwdWJsaWMgX3Nob3dOdW0gPSAxO1xuICBwcml2YXRlIF9hdXRvcGxheSA9IGZhbHNlO1xuICBwcml2YXRlIF9pbmZpbml0ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9ncmFiYmluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlRHJhZyA9IGZhbHNlO1xuICBwdWJsaWMgZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuXG4gIHByaXZhdGUgcGFuQ291bnQgPSAwO1xuXG4gIC8vIHRoaXMgdmFyaWFibGUgdXNlIGZvciBjaGVjayB0aGUgaW5pdCB2YWx1ZSBpcyB3cml0ZSB3aXRoIG5nTW9kZWwsXG4gIC8vIHdoZW4gaW5pdCBmaXJzdCwgbm90IHNldCB3aXRoIGFuaW1hdGlvblxuXG4gIHB1YmxpYyByZWFsSW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cbiAgcHVibGljIHdyYXBwZXJXaWR0aDtcblxuICBwdWJsaWMgc2luZ2xlVGltZVJ1biA9IHRydWU7XG4gIHByaXZhdGUgaW5pdGlhbEluZGV4ID0gMDtcbiAgcHVibGljIG9yaWdpbmFsRGF0YSA9IFtdO1xuXG4gIHByaXZhdGUgX2luZmluZURhdGFDb3VudCA9IDA7XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yb290RWxtID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsbSA9IHRoaXMucm9vdEVsbS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9ya0pvaW4oW1xuICAgICAgLi4udGhpcy5iaW5kQ2xpY2soKSxcbiAgICAgIC8vIHdoZW4gaXRlbSBjaGFuZ2VkLCByZW1vdmUgb2xkIGhhbW1lciBiaW5kaW5nLCBhbmQgcmVzZXQgd2lkdGhcbiAgICAgIHRoaXMuaXRlbUVsbXMuY2hhbmdlcy5waXBlKFxuICAgICAgICAvLyBkZXRlY3RDaGFuZ2VzIHRvIGNoYW5nZSB2aWV3IGRvdHNcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGkgY2FuJ3QgcGFzcyB0aGUgY2hhbmdlZGV0ZWN0aW9uIGNoZWNrLCBvbmx5IHRoZSB3YXkgdG8gdXNpbmcgdGltZW91dC4gOihcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKSlcbiAgICAgICksXG4gICAgICByZXNpemVPYnNlcnZhYmxlKHRoaXMucm9vdEVsbSwgKCkgPT4gdGhpcy5jb250YWluZXJSZXNpemUoKSksXG4gICAgXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZhcmlhYmxlKCk7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgodHJ1ZSk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgfVxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAvKiBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnJ1bkxvb3ApIHtcbiAgICAgIHRoaXMuYWRkSW5maW5pdGVFbG0oKTtcbiAgICB9ICovXG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG5cbiAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0b3J5SGFtbWVyKCkge1xuICAgIGlmICh0aGlzLmhhbW1lcikge1xuICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udGFpbmVyUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4IHx8IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gdGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9IHRoaXMucm9vdEVsbUhlaWdodCAtIHRoaXMuZWxtSGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld1dpZHRoKGlzSW5pdD86IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMudmVydGljYWxNb2RlRW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICAgIHRoaXMuX3Nob3dOdW0gPSB0aGlzLmdldEF1dG9OdW0oKTtcbiAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICAgIGlmIChpc0luaXQpIHtcbiAgICAgICAgLy8gcmVtYWluIG9uZSBlbG0gaGVpZ2h0XG4gICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhpcy5lbG1XaWR0aCA9XG4gICAgICAgIHRoaXMucm9vdEVsbVdpZHRoIC8gKHRoaXMuX3Nob3dOdW0gLyB0aGlzLmdyaWRCeS5yb3cpIC1cbiAgICAgICAgKHRoaXMucGFkZGluZyAqIDIpIC9cbiAgICAgICAgICAodGhpcy5ncmlkQnkuY29sID4gMVxuICAgICAgICAgICAgPyB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgIDogdGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdyk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcblxuICAgICAgdGhpcy5jb250YWluZXJFbG1XaWR0aCA9XG4gICAgICAgICh0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMucGFkZGluZyAqIDIpICpcbiAgICAgICAgKHRoaXMuZWxtcy5sZW5ndGggLyB0aGlzLl9zaG93TnVtKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcbiAgICAgIHRoaXMudmlld0FyZWEuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwic3R5bGVcIixcbiAgICAgICAgICBgd2lkdGg6JHt0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMucGFkZGluZyAqIDJ9cHhgXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5lbG1zLmZvckVhY2goKGVsbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShlbG0sIFwid2lkdGhcIiwgdGhpcy5lbG1XaWR0aCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRWaWV3SGVpZ2h0KGlzSW5pdCk7XG4gICAgfVxuICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld0hlaWdodChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gdGhpcy5nZXRBdXRvTnVtKCk7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICB9XG4gICAgdGhpcy5faW5maW5lRGF0YUNvdW50ID0gdGhpcy5fc2hvd051bSAqIDI7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5lbG1XaWR0aCA9XG4gICAgICB0aGlzLnJvb3RFbG1IZWlnaHQgLyAodGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdykgLVxuICAgICAgKHRoaXMucGFkZGluZyAqIDIpIC9cbiAgICAgICAgKHRoaXMuZ3JpZEJ5LmNvbCA+IDFcbiAgICAgICAgICA/IHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgIDogdGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdyk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICk7XG5cbiAgICB0aGlzLmNvbnRhaW5lckVsbVdpZHRoID1cbiAgICAgICh0aGlzLnJvb3RFbG1IZWlnaHQgLSB0aGlzLnBhZGRpbmcgKiAyKSAqXG4gICAgICAodGhpcy5lbG1zLmxlbmd0aCAvIHRoaXMuX3Nob3dOdW0pO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcbiAgICB0aGlzLnZpZXdBcmVhLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwic3R5bGVcIixcbiAgICAgICAgYGhlaWdodDoke3RoaXMucm9vdEVsbUhlaWdodCAtIHRoaXMucGFkZGluZyAqIDJ9cHhgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbG1zLmZvckVhY2goKGVsbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoZWxtLCBcImhlaWdodFwiLCB0aGlzLmVsbVdpZHRoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEhhbW1lcigpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBobSA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLmNvbnRhaW5lckVsbSk7XG5cbiAgICAgIGNvbnN0IHBhbiA9IG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBobS5hZGQocGFuKTtcblxuICAgICAgaG0ub24oXCJwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWxcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoT25lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09IFwiY2VudGVyXCIgJiYgdGhpcy5zaG93TnVtID49IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgdGhpcy5vdXRPZkJvdW5kKGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbE1vZGVFbmFibGVkID8gZS5kZWx0YVkgOiAoZS5kZWx0YVggKj0gMC4yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm5vdERyYWcpIHtcbiAgICAgICAgICAgICAgdGhpcy5sZWZ0ID1cbiAgICAgICAgICAgICAgICAtdGhpcy5jdXJyZW50SW5kZXggKiB0aGlzLmVsbVdpZHRoICtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgK1xuICAgICAgICAgICAgICAgICh0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQgPyBlLmRlbHRhWSA6IGUuZGVsdGFYKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ01hbnkpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKHRoaXMudmVydGljYWxNb2RlRW5hYmxlZCA/IGUuZGVsdGFZIDogZS5kZWx0YVgpID5cbiAgICAgICAgICAgICAgICB0aGlzLmVsbVdpZHRoICogMC41XG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICgodGhpcy52ZXJ0aWNhbE1vZGVFbmFibGVkID8gZS5kZWx0YVkgOiBlLmRlbHRhWCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGFuY2FuY2VsXCI6XG4gICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBcInBhbmVuZFwiOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLnBhbkJvdW5kYXJ5ICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLnZlcnRpY2FsTW9kZUVuYWJsZWQgPyBlLmRlbHRhWSA6IGUuZGVsdGFYKSA+XG4gICAgICAgICAgICAgICAgdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHRoaXMudmVydGljYWxNb2RlRW5hYmxlZCA/IGUuZGVsdGFZIDogZS5kZWx0YVgpIC9cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVdpZHRoXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNjcm9sbE51bTtcblxuICAgICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCAtIG1vdmVOdW07XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4ICsgbW92ZU51bTtcblxuICAgICAgICAgICAgICBpZiAoKHRoaXMudmVydGljYWxNb2RlRW5hYmxlZCA/IGUuZGVsdGFZIDogZS5kZWx0YVgpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHByZXZJbmRleCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb05leHQobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPCAtdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvTmV4dCh0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPiB0aGlzLnN3aXBlVmVsb2NpdHkgJiYgZS5kaXN0YW5jZSA+IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBobTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29QcmV2KHByZXZJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgcHJldkluZGV4IDwgMCkge1xuICAgICAgcHJldkluZGV4ID0gMDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcoMCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gcHJldkluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnb05leHQobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiBuZXh0SW5kZXggPiB0aGlzLm1heFJpZ2h0SW5kZXgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcobmV4dEluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGJpbmRDbGljaygpIHtcbiAgICBpZiAodGhpcy5idG5OZXh0ICYmIHRoaXMuYnRuUHJldikge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuYnRuTmV4dC5uYXRpdmVFbGVtZW50LCBcImNsaWNrXCIpLnBpcGUoXG4gICAgICAgICAgbWFwKCgpID0+ICh0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bSkpXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0blByZXYubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFJlc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMubW91c2VPbkNvbnRhaW5lciAmJiAhdGhpcy5ncmFiYmluZykge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzdGFydC5uZXh0KG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3VmlldyhcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGlzQW5pbWF0aW9uID0gdHJ1ZSxcbiAgICBpc0Zyb21BdXRvID0gdGhpcy5pc0Zyb21BdXRvXG4gICkge1xuICAgIGlmICh0aGlzLmVsbXMubGVuZ3RoID4gMSAmJiB0aGlzLmVsbXMubGVuZ3RoID4gdGhpcy5fc2hvd051bSkge1xuICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG4gICAgICB0aGlzLmxlZnQgPSAtKGluZGV4ICogdGhpcy5lbG1XaWR0aCAtIHRoaXMuYWxpZ25EaXN0YW5jZSk7XG5cbiAgICAgIGlmIChpc0FuaW1hdGlvbikge1xuICAgICAgICBpZiAoaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVmdCA9IHRoaXMuYWxpZ25EaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gIH1cblxuICBwcml2YXRlIG91dE9mQm91bmQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPD0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1blByb2dyZXNzKGJldHdlZW5UaW1lKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBob3dUaW1lcyA9IHRoaXMuc3BlZWQgLyBiZXR3ZWVuVGltZTtcbiAgICAgIGNvbnN0IGV2ZXJ5SW5jcmVhc2UgPSAoMTAwIC8gdGhpcy5zcGVlZCkgKiBiZXR3ZWVuVGltZTtcbiAgICAgIHJldHVybiBpbnRlcnZhbChiZXR3ZWVuVGltZSkucGlwZShcbiAgICAgICAgdGFwKCh0KSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gKHQgJSBob3dUaW1lcykgKiBldmVyeUluY3JlYXNlO1xuICAgICAgICB9KSxcbiAgICAgICAgYnVmZmVyQ291bnQoTWF0aC5yb3VuZChob3dUaW1lcyksIDApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdERhdGEoc2hvd051bSkge1xuICAgIGlmICghdGhpcy5vcmlnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IFsuLi50aGlzLmRhdGFdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICB0aGlzLnNpbmdsZVRpbWVSdW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXlDcmVhdG9yKHRoaXMub3JpZ2luYWxEYXRhLCBzaG93TnVtKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHNob3dOdW07XG4gICAgICB0aGlzLmluaXRpYWxJbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0b051bSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aDtcbiAgICBpZiAodGhpcy5icmVha3BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMuYnJlYWtwb2ludC5maW5kKChiKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVNYXBbYi5zY3JlZW5TaXplXSA8PSBjdXJyV2lkdGg7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3cpIHtcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gbm93LnBhZGRpbmcgfHwgdGhpcy5wYWRkaW5nO1xuICAgICAgICBpZiAobm93LmdyaWRCeSkge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtID0gbm93LmdyaWRCeS5jb2wgfHwgbm93LnNjcm9sbE51bSB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHRoaXMuZ3JpZEJ5ID0gbm93LmdyaWRCeTtcbiAgICAgICAgICBjb25zdCBzaG93TnVtID0gbm93LmdyaWRCeS5jb2wgKiBub3cuZ3JpZEJ5LnJvdyB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtID0gbm93LnNjcm9sbE51bSB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICAgIHJldHVybiBub3cubnVtYmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnBhZGRpbmcgPVxuICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnBhZGRpbmcgfHwgdGhpcy5wYWRkaW5nO1xuICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5O1xuICAgICAgICBjb25zdCBzaG93TnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgKlxuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkucm93IHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdE51bSA9IDM7XG4gICAgaWYgKGN1cnJXaWR0aCA+IDIwMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaW5pdE51bSArIGN1cnJXaWR0aCAvIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXROdW07XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9JWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5RmNuKGluZGV4LCBpdGVtKSB7XG4gICAgaWYgKCFpdGVtIHx8IGl0ZW1bdGhpcy50cmFja0J5S2V5XSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtW3RoaXMudHJhY2tCeUtleV07XG4gIH1cblxuICBwdWJsaWMgYXJyYXlDcmVhdG9yKGFyciwgY291bnQpIHtcbiAgICBjb25zdCBkYXRhID0gWy4uLmFycl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBkYXRhLnVuc2hpZnQoYXJyW2Fyci5sZW5ndGggLSAxIC0gKGkgJSBhcnIubGVuZ3RoKV0pO1xuICAgICAgZGF0YS5wdXNoKGFycltpICUgYXJyLmxlbmd0aF0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19