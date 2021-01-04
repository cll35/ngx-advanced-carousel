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
                this.setViewWidth();
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
                    if (this.currentIndex > this.data.length - this._showNum * 2) {
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
        if (isPlatformBrowser(this.platformId)) {
            this._renderer.setStyle(this.containerElm, "transform", `translateX(${value + (this.currentIndex !== 0 ? this.padding : 0)}px)`);
        }
        else {
            this._renderer.setStyle(this.containerElm, "transform", `translateX(${value}%)`);
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
     * @param {?} value
     * @return {?}
     */
    set containerElmWidth(value) {
        this.setStyle(this.containerElm, "width", value);
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
        }
    }
    /**
     * @private
     * @param {?=} isInit
     * @return {?}
     */
    setViewWidth(isInit) {
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
        this._cd.detectChanges();
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
                            e.deltaX *= 0.2;
                        }
                        if (!this.notDrag) {
                            this.left =
                                -this.currentIndex * this.elmWidth +
                                    this.alignDistance +
                                    e.deltaX;
                        }
                        if (!this.isDragMany) {
                            if (Math.abs(e.deltaX) > this.elmWidth * 0.5) {
                                if (e.deltaX > 0) {
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
                            Math.abs(e.deltaX) > this.elmWidth * this.panBoundary) {
                            /** @type {?} */
                            const moveNum = this.isDragMany
                                ? Math.ceil(Math.abs(e.deltaX) / this.elmWidth)
                                : this.scrollNum;
                            /** @type {?} */
                            const prevIndex = this.currentIndex - moveNum;
                            /** @type {?} */
                            const nextIndex = this.currentIndex + moveNum;
                            if (e.deltaX > 0) {
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
                template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li\n        *ngIf=\"\n          (i + gridBy.col * gridBy.row) % (scrollNum * gridBy.row) === 0 &&\n          i >= originalData.length &&\n          i + _showNum * 2 < itemElms.length\n        \"\n        (click)=\"currentIndex = i\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQTZTdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFDYixHQUFzQjtRQUpELGVBQVUsR0FBVixVQUFVLENBQUs7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUMzQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWxCZixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlELGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBNkNQLGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7OztRQUV0RCxZQUFPLEdBQUcsR0FBRyxDQUFDOzs7O1FBRWQsYUFBUSxHQUFHLFlBQVksQ0FBQzs7Ozs7UUFLeEIsaUJBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDOztRQUdMLHNCQUFpQixHQUdwQyxRQUFRLENBQUM7Ozs7Ozs7UUFRQSxnQkFBVyxHQUFtQixJQUFJLENBQUM7Ozs7UUFHakQsVUFBSyxHQUFnQyxRQUFRLENBQUM7Ozs7O1FBTTlCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEMsZUFBVSxHQUFHLE1BQU0sQ0FBQzs7OztRQUlMLGlCQUFZLEdBQUcsS0FBSyxDQUFDOzs7O1FBRXJCLFVBQUssR0FBRyxJQUFJLENBQUM7Ozs7UUFFUixjQUFTLEdBQXFCLE9BQU8sQ0FBQzs7OztRQUU5QyxjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBRWYsZUFBVSxHQUFHLEtBQUssQ0FBQzs7OztRQUVkLGtCQUFhLEdBQUcsR0FBRyxDQUFDOzs7O1FBS3BDLGVBQVUsR0FNckIsRUFBRSxDQUFDO1FBRVEsa0JBQWEsR0FBRztZQUM5QixHQUFHLEVBQUUsSUFBSTs7WUFFVCxFQUFFLEVBQUUsSUFBSTtZQUNSLEVBQUUsRUFBRSxHQUFHO1lBQ1AsRUFBRSxFQUFFLEdBQUc7WUFDUCxFQUFFLEVBQUUsR0FBRztZQUNQLEVBQUUsRUFBRSxDQUFDO1NBQ04sQ0FBQztRQUVPLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFFdEIsY0FBUyxHQUFHLEtBQUssQ0FDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUN0QyxDQUFDLElBQUksQ0FDSixHQUFHOzs7O1FBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUVNLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQVliLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztRQUN6QyxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQy9CLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRTlCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDWixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUN0QixXQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUUzQixhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7UUFLZCxjQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUkvQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNsQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVqQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFpRHJCLGFBQVE7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBQzFCLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQTdNMUIsQ0FBQzs7OztJQWpUSixJQUNXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFDRCxJQUFXLElBQUksQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsSUFDVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQVcsV0FBVyxDQUFDLEtBQUs7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksS0FBSyxFQUFFO29CQUNULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDdEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBR0QsSUFDVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQVcsUUFBUSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkI7Ozs7Y0FJTTtJQUNSLENBQUM7Ozs7O0lBR0QsSUFDVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDOzs7OztJQUNELElBQVcsS0FBSyxDQUFDLEtBQUs7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQU1ELElBQ1csT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFXLE9BQU8sQ0FBQyxLQUFzQjtRQUN2QyxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7O0lBR0QsSUFDVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQVcsUUFBUSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLEtBQUssRUFBRTtvQkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O29CQUFDLEdBQUcsRUFBRTt3QkFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM1QyxDQUFDLEVBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQy9CO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLDZDQUE2QztRQUM3QyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7OztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFDRCxJQUFXLFlBQVksQ0FBQyxLQUFLO1FBQzNCLHdEQUF3RDtRQUN4RCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQy9CLDZEQUE2RDtZQUM3RCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNYO1lBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNyRTtnQkFDQSxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztvQkFBQyxHQUFHLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDckIsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxDQUFDLFNBQVM7b0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZOzRCQUNqQixJQUFJLENBQUMsUUFBUTs0QkFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzt3QkFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7d0JBQ3pDLElBQUksQ0FBQyxhQUFhOzRCQUNoQixJQUFJLENBQUMsU0FBUztnQ0FDWixJQUFJLENBQUMsUUFBUTtnQ0FDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztnQ0FDbEMsQ0FBQztnQ0FDQyxDQUFDLENBQUMsQ0FBQztnQ0FDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7b0NBQ2QsSUFBSSxDQUFDLFFBQVE7b0NBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDeEM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLGFBQWE7NEJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQztnQ0FDbEMsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7cUJBQ3hDO2lCQUNGO2dCQUNELElBQUksQ0FBQyxhQUFhO29CQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7cUJBQzVEO29CQUNELElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTt3QkFDNUQsSUFBSSxDQUFDLGFBQWE7NEJBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7cUJBQzVEO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7NkJBQ3RCLElBQUksQ0FDSCxTQUFTOzs7d0JBQUMsR0FBRyxFQUFFOzRCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDeEMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLENBQUMsRUFBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjs2QkFDQSxTQUFTLEVBQUUsQ0FBQztvQkFDakIsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7Z0JBQ0Q7Ozs7Ozs7Ozs7OztvQkFZSTthQUNMO1lBQ0QsSUFDRSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUM3QztnQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsSUFBVyxhQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUNELElBQVcsYUFBYSxDQUFDLEtBQUs7UUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixDQUFDLG1CQUFBLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDcEUsT0FBTyxFQUNQLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUN6QixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQVcsUUFBUSxDQUFDLEtBQWM7UUFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7OztZQUFDLEdBQUcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxFQUFFO29CQUNULElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3hEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzNEO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7OztJQUVELElBQVksSUFBSSxDQUFDLEtBQWE7UUFDNUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLFdBQVcsRUFDWCxjQUFjLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUN4RSxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsWUFBWSxFQUNqQixXQUFXLEVBQ1gsY0FBYyxLQUFLLElBQUksQ0FDeEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFZLGFBQWE7O1lBQ25CLFFBQVEsR0FBRyxDQUFDO1FBQ2hCLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNsQixLQUFLLE1BQU07Z0JBQ1QsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDYixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLFFBQVEsR0FBRyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixRQUFRLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07U0FDVDtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNqRSxDQUFDOzs7OztJQUVELElBQVksT0FBTztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUNELElBQVksU0FBUztRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELElBQVksWUFBWTtRQUN0QixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLO1lBQzVDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDVixDQUFDOzs7Ozs7SUFFRCxJQUFZLGlCQUFpQixDQUFDLEtBQWE7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQU1ELElBQ1ksVUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBQ0QsSUFBWSxVQUFVLENBQUMsR0FBRztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDdkMsQ0FBQzs7OztJQW9LTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO1FBRTVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLFFBQVEsQ0FBQztZQUNQLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixnRUFBZ0U7WUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN4QixvQ0FBb0M7WUFDcEMsR0FBRzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNQLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2hELDRFQUE0RTtvQkFDNUUsVUFBVTs7O29CQUFDLEdBQUcsRUFBRTt3QkFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0MsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNQO2dCQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUNwQztZQUNELGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUM7U0FDN0QsQ0FBQzthQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLFVBQVUsQ0FBQyxLQUFVO1FBQzFCLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQUVNLGdCQUFnQixDQUFDLEVBQXVCO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ00saUJBQWlCLENBQUMsRUFBYTtRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUlPLElBQUk7UUFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEM7O1lBRUk7SUFDTixDQUFDOzs7OztJQUVPLE9BQU87UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7OztJQUVPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUMsQ0FBQzs7Z0JBRTVELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTs7Z0JBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLFVBQVUsR0FBRyxLQUFLLENBQ2hCLFVBQVUsRUFDVixTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQzdDLE1BQU07OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsRUFDNUIsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFDLENBQzNDLENBQ0YsQ0FBQztnQkFDRixTQUFTLEdBQUcsS0FBSyxDQUNmLFNBQVMsRUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQzVDLEdBQUc7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBQyxDQUMxQyxDQUNGLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDM0IsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxFQUNqQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FDYixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDcEIsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUNyQyxHQUFHOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDckM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUNyQztZQUNILENBQUMsRUFBQyxFQUNGLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7OztZQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FDL0QsRUFDRixDQUNGLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxrQkFBa0I7UUFDeEIsUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2xCLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN2RCxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7Ozs7SUFFTyxZQUFZLENBQUMsTUFBZ0I7UUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRCxJQUFJLE1BQU0sRUFBRTtZQUNWLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsWUFBWSxFQUNqQixzQ0FBc0MsQ0FDdkMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFFBQVE7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDckQsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3dCQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUN4QixJQUFJLENBQUMsWUFBWSxFQUNqQixzQ0FBc0MsQ0FDdkMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUI7WUFDcEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUNoQyxPQUFPLEVBQ1AsU0FBUyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ2xELENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztRQUFDLENBQUMsR0FBZ0IsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7O2tCQUNqQyxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7O2tCQUUxQyxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN6QixTQUFTLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjtnQkFDdEMsU0FBUyxFQUFFLENBQUM7YUFDYixDQUFDO1lBRUYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVaLEVBQUUsQ0FBQyxFQUFFLENBQUMsbUNBQW1DOzs7O1lBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2dCQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN4QixDQUFDLEVBQUMsQ0FBQztpQkFDSjtnQkFFRCxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ2QsS0FBSyxTQUFTLENBQUM7b0JBQ2YsS0FBSyxVQUFVO3dCQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTs0QkFDckIsT0FBTzt5QkFDUjt3QkFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzt3QkFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkIsT0FBTzt5QkFDUjt3QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDNUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7eUJBQ2pCO3dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNqQixJQUFJLENBQUMsSUFBSTtnQ0FDUCxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVE7b0NBQ2xDLElBQUksQ0FBQyxhQUFhO29DQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDO3lCQUNaO3dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOzRCQUNwQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO2dDQUM1QyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29DQUNoQixJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7aUNBQ3JDO3FDQUFNO29DQUNMLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztpQ0FDckM7Z0NBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3ZCLE9BQU87NkJBQ1I7eUJBQ0Y7d0JBQ0QsTUFBTTtvQkFDUixLQUFLLFdBQVc7d0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ2pDLE1BQU07b0JBRVIsS0FBSyxRQUFRO3dCQUNYLElBQ0UsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLOzRCQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQ3JEOztrQ0FDTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVU7Z0NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0NBQy9DLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzs7a0NBRVosU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTzs7a0NBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU87NEJBRTdDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQ3hCO2lDQUFNO2dDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NkJBQ3hCOzRCQUNELE1BQU07eUJBQ1A7NkJBQU0sSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsRUFBRTs0QkFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDakQ7NkJBQU0sSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUU7NEJBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ2pEOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUNsQzt3QkFDRCxNQUFNO2lCQUNUO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sTUFBTSxDQUFDLFNBQWlCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsU0FBaUI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkQsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE9BQU87Z0JBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDakQsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FDakQ7Z0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDakQsR0FBRzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEUsQ0FBQyxFQUFDLENBQ0g7YUFDRixDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7OztJQUVPLFFBQVEsQ0FDZCxLQUFhLEVBQ2IsV0FBVyxHQUFHLElBQUksRUFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVO1FBRTVCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDNUQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksVUFBVSxFQUFFO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7OztJQUVPLHlCQUF5QjtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsSUFBSTtRQUNyQixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssU0FBUztnQkFDWixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNqRCxLQUFLLFVBQVU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxXQUFXO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ2pDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVc7O2tCQUNuQyxhQUFhLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVc7WUFDdEQsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUMvQixHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDUixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUN0RCxDQUFDLEVBQUMsRUFDRixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDckMsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBQ08sUUFBUSxDQUFDLE9BQU87UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7OztJQUVPLFVBQVU7O2NBQ1YsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZO1FBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztrQkFDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDO1lBQ3ZELENBQUMsRUFBQztZQUNGLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMzQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7b0JBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7MEJBQ25CLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTTtvQkFDN0QsT0FBTyxPQUFPLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO29CQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ2pDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztpQkFDbkI7YUFDRjtZQUNELElBQUksQ0FBQyxPQUFPO2dCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsSUFBSSxDQUFDLFNBQVM7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRzt3QkFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTO3dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7c0JBQzNELE9BQU8sR0FDWCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3BELE9BQU8sT0FBTyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTO29CQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUzt3QkFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUMzRDtTQUNGOztjQUVLLE9BQU8sR0FBRyxDQUFDO1FBQ2pCLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7O0lBRU8sUUFBUSxDQUFDLEdBQWdCLEVBQUUsS0FBYSxFQUFFLEtBQWE7UUFDN0QsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Ozs7O0lBRU0sVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQzNCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVNLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSzs7Y0FDdEIsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O1lBOTZCRixTQUFTLFNBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSx1QkFBdUI7Z0JBRWpDLHN5R0FBcUQ7Z0JBQ3JELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixFQUFDO3dCQUMzRCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7NENBK1NJLE1BQU0sU0FBQyxXQUFXOzRDQUNsQixNQUFNLFNBQUMsUUFBUTtZQTdWbEIsU0FBUztZQU5ULE1BQU07WUFWTixpQkFBaUI7OzttQkFnRWhCLEtBQUs7MEJBUUwsS0FBSyxTQUFDLGNBQWM7dUJBa0JwQixLQUFLLFNBQUMsVUFBVTtvQkFlaEIsS0FBSyxTQUFDLGdCQUFnQjtzQkFjdEIsS0FBSyxTQUFDLFVBQVU7dUJBbUJoQixLQUFLLFNBQUMsVUFBVTsyQkFvTmhCLE1BQU07eUJBSU4sS0FBSzt3QkFnQkwsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7dUJBQzNDLFlBQVksU0FBQyxVQUFVO3NCQUN2QixTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtzQkFDbkMsU0FBUyxTQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7bUNBQ25DLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQUl2QyxlQUFlLFNBQUMsZ0NBQWdDLEVBQUU7b0JBQ2pELFdBQVcsRUFBRSxJQUFJO29CQUNqQixJQUFJLEVBQUUsVUFBVTtpQkFDakI7MEJBR0EsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7MEJBRTlDLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3FCQUU5QyxZQUFZLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTttQ0FFN0MsWUFBWSxTQUFDLHNCQUFzQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFFdEQsWUFBWSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt5QkFLbEQsTUFBTTtzQkFFTixLQUFLO3VCQUVMLEtBQUs7MkJBS0wsS0FBSztnQ0FHTCxLQUFLLFNBQUMsd0JBQXdCOzBCQVc5QixLQUFLLFNBQUMsY0FBYztvQkFHcEIsS0FBSztzQkFNTCxLQUFLLFNBQUMsZ0JBQWdCO3lCQUV0QixLQUFLOzJCQUlMLEtBQUssU0FBQyxlQUFlO29CQUVyQixLQUFLLFNBQUMsZUFBZTt3QkFFckIsS0FBSyxTQUFDLG9CQUFvQjt3QkFFMUIsS0FBSyxTQUFDLFlBQVk7eUJBRWxCLEtBQUssU0FBQyxXQUFXOzRCQUVqQixLQUFLLFNBQUMsZ0JBQWdCO3lCQUt0QixLQUFLOzRCQVFMLEtBQUs7c0JBVUwsS0FBSzs7OztJQXRITixvREFBc0U7Ozs7O0lBRXRFLG1EQUF3Qjs7SUFrQnhCLGlEQUEyRTs7SUFDM0UsZ0RBQWlFOztJQUNqRSwrQ0FBaUU7O0lBQ2pFLCtDQUFpRTs7SUFDakUsNERBQ3dDOztJQUd4QyxnREFJdUM7O0lBRXZDLG1EQUNxQzs7SUFDckMsbURBQ3FDOztJQUNyQyw4Q0FDZ0M7O0lBQ2hDLDREQUM4Qzs7SUFDOUMsbURBQ3FDOztJQUVyQyw2Q0FBb0I7O0lBRXBCLGtEQUFzRTs7Ozs7SUFFdEUsK0NBQThCOzs7OztJQUU5QixnREFBd0M7Ozs7OztJQUt4QyxvREFBNkM7O0lBRzdDLHlEQUc4Qjs7Ozs7Ozs7SUFROUIsbURBQWlFOzs7OztJQUdqRSw2Q0FBOEQ7Ozs7OztJQU05RCwrQ0FBZ0Q7O0lBRWhELGtEQUFvQzs7Ozs7SUFJcEMsb0RBQW9EOzs7OztJQUVwRCw2Q0FBNEM7Ozs7O0lBRTVDLGlEQUEwRTs7Ozs7SUFFMUUsaURBQTBDOzs7OztJQUUxQyxrREFBOEM7Ozs7O0lBRTlDLHFEQUFvRDs7Ozs7SUFLcEQsa0RBTVE7O0lBRVIscURBUUU7O0lBRUYsK0NBQTZCOztJQUU3QixpREFTRTs7Ozs7SUFFRixrREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsd0RBQWlDOzs7OztJQUNqQyxxREFBMEI7Ozs7O0lBQzFCLGdEQUFxQjs7Ozs7SUFFckIsK0NBQTZCOzs7OztJQUM3QixvREFBa0M7Ozs7O0lBRWxDLDRDQUFpQzs7Ozs7SUFFakMsOENBQWU7Ozs7O0lBRWYsa0RBQWlDOzs7OztJQUNqQyw4Q0FBZ0M7Ozs7O0lBRWhDLCtDQUFpRDs7Ozs7SUFDakQsbURBQWdEOzs7OztJQUNoRCxpREFBdUM7Ozs7O0lBQ3ZDLGdEQUFzQzs7Ozs7SUFFdEMsc0RBQTJCOzs7OztJQUMzQixxREFBMEI7O0lBQzFCLGdEQUFvQjs7Ozs7SUFDcEIsaURBQTBCOzs7OztJQUMxQixpREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsb0RBQTZCOztJQUM3Qiw4Q0FBbUM7Ozs7O0lBRW5DLGdEQUFxQjs7SUFLckIsaURBQXNDOztJQUV0QyxvREFBb0I7O0lBRXBCLHFEQUE0Qjs7Ozs7SUFDNUIsb0RBQXlCOztJQUN6QixvREFBeUI7Ozs7O0lBRXpCLHdEQUE2Qjs7Ozs7SUFpRDdCLGdEQUFrQzs7Ozs7SUFDbEMsaURBQTZCOzs7OztJQWxOM0Isa0RBQTRDOzs7OztJQUM1QyxpREFBbUM7Ozs7O0lBQ25DLGlEQUE0Qjs7Ozs7SUFDNUIsNkNBQXFCOzs7OztJQUNyQiwyQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmb3JrSm9pbixcbiAgZnJvbUV2ZW50LFxuICBpbnRlcnZhbCxcbiAgbWVyZ2UsXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyLFxufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtcbiAgYnVmZmVyQ291bnQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbiAgdGFwLFxufSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlIH0gZnJvbSBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLWl0ZW0uZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyByZXNpemVPYnNlcnZhYmxlIH0gZnJvbSBcIi4vcnhqcy5vYnNlcnZhYmxlLnJlc2l6ZVwiO1xuZGVjbGFyZSB2YXIgSGFtbWVyO1xuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5zY3NzXCJdLFxuICB0ZW1wbGF0ZVVybDogXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcHVibGljIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuICAvKiogZGlzYWJsZSBkcmFnIGV2ZW50IHdpdGggdG91Y2ggYW5kIG1vdXNlIHBhbiBtb3ZpbmcsIGRlZmF1bHQgaXMgYGZhbHNlYCAqL1xuICBASW5wdXQoXCJkaXNhYmxlLWRyYWdcIilcbiAgcHVibGljIGdldCBkaXNhYmxlRHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZURyYWc7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlRHJhZyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlRHJhZyAhPT0gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW1tZXIgPSB0aGlzLmJpbmRIYW1tZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9kaXNhYmxlRHJhZyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIGlzIHRoZSBjYXJvdXNlbCBjYW4gbW92ZSBpbmZpbml0ZSAqL1xuICBASW5wdXQoXCJpbmZpbml0ZVwiKVxuICBwdWJsaWMgZ2V0IGluZmluaXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmZpbml0ZTtcbiAgfVxuICBwdWJsaWMgc2V0IGluZmluaXRlKHZhbHVlKSB7XG4gICAgdGhpcy5faW5maW5pdGUgPSB2YWx1ZTtcblxuICAgIC8qIHRoaXMuaW5maW5pdGVFbG1SZWZzLmZvckVhY2goKHJlZikgPT4ge1xuICAgICAgdGhpcy5hZGRTdHlsZShyZWYucm9vdE5vZGVzWzBdLCB7XG4gICAgICAgIHZpc2liaWxpdHk6IHRoaXMucnVuTG9vcCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nLFxuICAgICAgfSk7XG4gICAgfSk7ICovXG4gIH1cblxuICAvKiogYXV0byBwbGF5IHNwZWVkICovXG4gIEBJbnB1dChcImF1dG9wbGF5LXNwZWVkXCIpXG4gIHB1YmxpYyBnZXQgc3BlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BlZWRDaGFuZ2UudmFsdWU7XG4gIH1cbiAgcHVibGljIHNldCBzcGVlZCh2YWx1ZSkge1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zcGVlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBob3cgbWFueSBudW1iZXIgaXRlbXMgdG8gc2hvdyBvbmNlLCBkZWZhdWx0IGlzIGAxYFxuICAgKiBzZXQgYGF1dG9gIHRvIHVzaW5nIGBbYnJlYWtwb2ludF1gIHNldCB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dChcInNob3ctbnVtXCIpXG4gIHB1YmxpYyBnZXQgc2hvd051bSgpOiBudW1iZXIgfCBcImF1dG9cIiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dOdW07XG4gIH1cbiAgcHVibGljIHNldCBzaG93TnVtKHZhbHVlOiBudW1iZXIgfCBcImF1dG9cIikge1xuICAgIGlmICh2YWx1ZSA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuaXNBdXRvTnVtID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2hvd051bSA9ICt2YWx1ZTtcbiAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5fc2hvd051bTtcbiAgICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgICAgdGhpcy5zZXRWaWV3V2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBjYXJvdXNlbCBhdXRvIHBsYXkgY29uZmluZyAqL1xuICBASW5wdXQoXCJhdXRvcGxheVwiKVxuICBwdWJsaWMgZ2V0IGF1dG9wbGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdXRvcGxheTtcbiAgfVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5kb05leHRTdWIkKSB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgICAvLyBpZiBzZXQgYXV0b3BsYXksIHRoZW4gdGhlIGluZmluaXRlIGlzIHRydWVcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW5maW5pdGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgY3VycmVudEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50SW5kZXgodmFsdWUpIHtcbiAgICAvLyBpZiBub3cgaW5kZXggaWYgbm90IGVxdWFsZSB0byBzYXZlIGluZGV4LCBkbyBzb21ldGluZ1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBub3QgY29udGFpbiB3aXRoIHRoZSBib3VuZGFyeSBub3QgaGFuZGxlcndcbiAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5pdGVtRWxtcyB8fFxuICAgICAgICAoIXRoaXMucnVuTG9vcCAmJiAhKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMuaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhbEluZGV4ID1cbiAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgaWYgKCF0aGlzLmluZmluaXRlICYmIHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5lbG1zLmxlbmd0aDtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5yZWFsSW5kZXggLVxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gLVxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sIDxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogdGhpcy5yZWFsSW5kZXggLVxuICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5lbG1zLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gPCAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8IDAgJiYgIXRoaXMuaW5maW5pdGUgPyAwIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaW5pdGlhbEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5kYXRhLmxlbmd0aCArIHRoaXMuX3Nob3dOdW0gKiA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyKHRoaXMuYW5pVGltZSArIDEwMClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlmICh0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9ICh0aGlzLnJlYWxJbmRleCAtIHRoaXMuZWxtcy5sZW5ndGgpICUgdGhpcy5fc2hvd051bTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggLT0gY291bnQ7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAwIDw9IHRoaXMuY3VycmVudEluZGV4ICYmXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4IDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluZGV4Q2hhbmdlZC5lbWl0KHtcbiAgICAgIHJlYWxJbmRleDogdGhpcy5yZWFsSW5kZXgsXG4gICAgICBjdXJyZW50SW5kZXg6IHRoaXMuY3VycmVudEluZGV4LFxuICAgICAgdmlld1NpemU6IHRoaXMuX3Nob3dOdW0sXG4gICAgfSk7XG4gICAgdGhpcy5pc0Zyb21BdXRvID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2dyZXNzV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcmdyZXNzV2lkdGg7XG4gIH1cbiAgcHVibGljIHNldCBwcm9ncmVzc1dpZHRoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NFbG0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLl9wb3JncmVzc1dpZHRoID0gdmFsdWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgKHRoaXMucHJvZ3Jlc3NDb250YWluZXJFbG0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW5bMF0sXG4gICAgICAgIFwid2lkdGhcIixcbiAgICAgICAgYCR7dGhpcy5wcm9ncmVzc1dpZHRofSVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ3JhYmJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYWJiaW5nO1xuICB9XG4gIHB1YmxpYyBzZXQgZ3JhYmJpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZ3JhYmJpbmcgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2dyYWJiaW5nID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFuQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldCBsZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlICsgKHRoaXMuY3VycmVudEluZGV4ICE9PSAwID8gdGhpcy5wYWRkaW5nIDogMCl9cHgpYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfSUpYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBtYXhSaWdodEluZGV4KCkge1xuICAgIGxldCBhZGRJbmRleCA9IDA7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBhZGRJbmRleCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEgLSB0aGlzLl9zaG93TnVtICsgMSArIGFkZEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcnVuTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRvcGxheSB8fCB0aGlzLmluZmluaXRlO1xuICB9XG4gIHByaXZhdGUgZ2V0IGxlbmd0aE9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggPT09IDE7XG4gIH1cblxuICBwcml2YXRlIGdldCByb290RWxtV2lkdGgoKSB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICAgID8gdGhpcy5yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICA6IDEwMDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lckVsbVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcIndpZHRoXCIsIHZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBwdWJsaWMgaW5kZXhDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9zdGFydEluZGV4ID0gMDtcblxuICBASW5wdXQoKVxuICBwcml2YXRlIGdldCBzdGFydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFydEluZGV4O1xuICB9XG4gIHByaXZhdGUgc2V0IHN0YXJ0SW5kZXgodmFsKSB7XG4gICAgdGhpcy5fc3RhcnRJbmRleCA9IHZhbDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuX3N0YXJ0SW5kZXg7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuICBAVmlld0NoaWxkKFwiY29udGFpbmVyRWxtXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKFwidmlld0FyZWFcIikgcHVibGljIHZpZXdBcmVhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoXCJwcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuUHJldjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5OZXh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0NvbnRhaW5lckVsbTogRWxlbWVudFJlZjtcblxuICAvLyBnZXQgYWxsIGl0ZW0gZWxtc1xuICBAQ29udGVudENoaWxkcmVuKE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlLCB7XG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gICAgcmVhZDogRWxlbWVudFJlZixcbiAgfSlcbiAgcHVibGljIGl0ZW1FbG1zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnRQcmV2OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxOZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudE5leHQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbERvdFwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGRvdEVsbTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsSXRlbVRlbXBsYXRlXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY2Fyb3VzZWxJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NFbG06IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIF9kYXRhOiBhbnlbXTtcblxuICBAT3V0cHV0KCkgcHVibGljIG1hcHBlZERhdGE6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiB3aGVuIGluZmluaXRlIGlzIHRydWUsIHRoZSBhbmltYXRpb24gdGltZSB3aXRoIGl0ZW0sIGRlZmF1bHQgaXMgNDAwLiAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pVGltZSA9IDQwMDtcbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgaW4gI2NvbnRhaW5lckVsbSB3aGVuIG1vZGVsIGNoYW5nZSAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3MgPSBcInRyYW5zaXRpb25cIjtcblxuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCB3aGVuIGNhcm91c2VsIGF1dG8gcGxheSxcbiAgICogdGhpcyBkZWZhdWx0IGF1dG9wbGF5IGFuaW1hdGlvbiBpcyBzYW1lIGFzIGFuaUNsYXNzXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3NBdXRvID0gdGhpcy5hbmlDbGFzcztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoXCJzaG93LW5leHQtcHJldi1idXR0b25zXCIpIHB1YmxpYyBzaG93QnV0dG9uc01ldGhvZDpcbiAgICB8IFwiYWx3YXlzXCJcbiAgICB8IFwiYXV0by1oaWRlXCJcbiAgICB8IFwiYXV0by1kaXNhYmxlXCIgPSBcImFsd2F5c1wiO1xuXG4gIC8qKlxuICAgKiB1c2VyIG1vdmUgcGljdHVyZSB3aXRoIHRoZSBjb250YWluZXIgd2lkdGggcmF0ZSxcbiAgICogd2hlbiBtb3JlIHRoYW4gdGhhdCByYXRlLCBpdCB3aWxsIGdvIHRvIG5leHQgb3IgcHJldixcbiAgICogc2V0IGZhbHNlIHdpbGwgbmV2ZXIgbW92ZSB3aXRoIGRpc3RhbmNlIHJhdGUsXG4gICAqIGRlZmF1bHQgaXMgYDAuMTVgXG4gICAqL1xuICBASW5wdXQoXCJwYW4tYm91bmRhcnlcIikgcHVibGljIHBhbkJvdW5kYXJ5OiBudW1iZXIgfCBmYWxzZSA9IDAuMTU7XG5cbiAgLyoqIHdoZW4gc2hvdy1udW0gaXMgYmlnZ2VyIHRoYW4gMSwgdGhlIGZpcnN0IGl0ZW0gYWxpZ24sIGRlZmF1bHRlIGlzIGBjZW50ZXJgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGlnbjogXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiID0gXCJjZW50ZXJcIjtcblxuICAvKipcbiAgICogZGlzYWJsZSB3aGVuIGRyYWcgb2NjdXIgdGhlIGNoaWxkIGVsZW1lbnQgd2lsbCBmb2xsb3cgdG91Y2ggcG9pbnQuXG4gICAqIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KFwibm90LWZvbGxvdy1wYW5cIikgcHVibGljIG5vdERyYWcgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwdWJsaWMgdHJhY2tCeUtleSA9IFwiY29kZVwiO1xuICAvKipcbiAgICogdGhlIGV2ZW50IGJpbmRpbmcgc3RhdGUgZm9yIHN0b3AgYXV0byBwbGF5IHdoZW4gbW91cnNlIG1vdmVvdmVyXG4gICAqL1xuICBASW5wdXQoXCJtb3Vyc2UtZW5hYmxlXCIpIHB1YmxpYyBtb3Vyc2VFbmFibGUgPSBmYWxzZTtcbiAgLyoqIGVhY2ggYXV0byBwbGF5IGJldHdlZW4gdGltZSAqL1xuICBASW5wdXQoXCJiZXR3ZWVuLWRlbGF5XCIpIHB1YmxpYyBkZWxheSA9IDgwMDA7XG4gIC8qKiBhdXRvIHBsYXkgZGlyZWN0aW9uLCBkZWZhdWx0IGlzIGByaWdodGAuICovXG4gIEBJbnB1dChcImF1dG9wbGF5LWRpcmVjdGlvblwiKSBwdWJsaWMgZGlyZWN0aW9uOiBcImxlZnRcIiB8IFwicmlnaHRcIiA9IFwicmlnaHRcIjtcbiAgLyoqIGhvdyBtYW55IG51bWJlciB3aXRoIGVhY2ggc2Nyb2xsLCBkZWZhdWx0IGlzIGAxYC4gKi9cbiAgQElucHV0KFwic2Nyb2xsLW51bVwiKSBwdWJsaWMgc2Nyb2xsTnVtID0gMTtcbiAgLyoqIENvdWxkIHVzZXIgc2Nyb2xsIG1hbnkgaXRlbSBvbmNlLCBzaW11bGF0ZSB3aXRoIHNjcm9sbGJhciwgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRyYWctbWFueVwiKSBwdWJsaWMgaXNEcmFnTWFueSA9IGZhbHNlO1xuICAvKiogTWluaW1hbCB2ZWxvY2l0eSByZXF1aXJlZCBiZWZvcmUgcmVjb2duaXppbmcsIHVuaXQgaXMgaW4gcHggcGVyIG1zLCBkZWZhdWx0IGAwLjNgICovXG4gIEBJbnB1dChcInN3aXBlLXZlbG9jaXR5XCIpIHB1YmxpYyBzd2lwZVZlbG9jaXR5ID0gMC4zO1xuXG4gIC8qKlxuICAgKiBzd2l0Y2ggc2hvdyBudW1iZXIgd2l0aCBjdXN0b20gbG9naWMgbGlrZSBjc3MgQG1lZGlhIChtaW4td2lkdGg6IGBudW1iZXJgcHgpXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYnJlYWtwb2ludDogQXJyYXk8e1xuICAgIGdyaWRCeT87XG4gICAgc2NyZWVuU2l6ZTogXCJ4eGxcIiB8IFwieGxcIiB8IFwibGdcIiB8IFwibWRcIiB8IFwic21cIiB8IFwieHNcIjtcbiAgICBudW1iZXI7XG4gICAgc2Nyb2xsTnVtPztcbiAgICBwYWRkaW5nPztcbiAgfT4gPSBbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2NyZWVuU2l6ZU1hcCA9IHtcbiAgICB4eGw6IDE0NDAsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICB4bDogMTIwMCxcbiAgICBsZzogOTkyLFxuICAgIG1kOiA3NjgsXG4gICAgc206IDU3NixcbiAgICB4czogMCxcbiAgfTtcblxuICBASW5wdXQoKSBwYWRkaW5nOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBsZWF2ZU9icyQgPSBtZXJnZShcbiAgICBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIFwibW91c2V1cFwiKSxcbiAgICBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIFwidG91Y2hlbmRcIilcbiAgKS5waXBlKFxuICAgIHRhcCgoZTogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ3JhYmJpbmcgPSBmYWxzZTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcblxuICBwcml2YXRlIGlzRnJvbUF1dG8gPSB0cnVlO1xuICBwcml2YXRlIGlzQXV0b051bSA9IGZhbHNlO1xuICBwcml2YXRlIG1vdXNlT25Db250YWluZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBhbGlnbkRpc3RhbmNlID0gMDtcbiAgcHJpdmF0ZSBlbG1XaWR0aCA9IDA7XG5cbiAgcHJpdmF0ZSByb290RWxtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJFbG06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgZWxtczogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgaGFtbWVyO1xuXG4gIHByaXZhdGUgZG9OZXh0U3ViJDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRvTmV4dDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIHByaXZhdGUgcmVzdGFydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBzcGVlZENoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoNTAwMCk7XG4gIHByaXZhdGUgc3RvcEV2ZW50ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX3BvcmdyZXNzV2lkdGggPSAwO1xuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuICBwdWJsaWMgX3Nob3dOdW0gPSAxO1xuICBwcml2YXRlIF9hdXRvcGxheSA9IGZhbHNlO1xuICBwcml2YXRlIF9pbmZpbml0ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9ncmFiYmluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlRHJhZyA9IGZhbHNlO1xuICBwdWJsaWMgZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuXG4gIHByaXZhdGUgcGFuQ291bnQgPSAwO1xuXG4gIC8vIHRoaXMgdmFyaWFibGUgdXNlIGZvciBjaGVjayB0aGUgaW5pdCB2YWx1ZSBpcyB3cml0ZSB3aXRoIG5nTW9kZWwsXG4gIC8vIHdoZW4gaW5pdCBmaXJzdCwgbm90IHNldCB3aXRoIGFuaW1hdGlvblxuXG4gIHB1YmxpYyByZWFsSW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cbiAgcHVibGljIHdyYXBwZXJXaWR0aDtcblxuICBwdWJsaWMgc2luZ2xlVGltZVJ1biA9IHRydWU7XG4gIHByaXZhdGUgaW5pdGlhbEluZGV4ID0gMDtcbiAgcHVibGljIG9yaWdpbmFsRGF0YSA9IFtdO1xuXG4gIHByaXZhdGUgX2luZmluZURhdGFDb3VudCA9IDA7XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yb290RWxtID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsbSA9IHRoaXMucm9vdEVsbS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9ya0pvaW4oW1xuICAgICAgLi4udGhpcy5iaW5kQ2xpY2soKSxcbiAgICAgIC8vIHdoZW4gaXRlbSBjaGFuZ2VkLCByZW1vdmUgb2xkIGhhbW1lciBiaW5kaW5nLCBhbmQgcmVzZXQgd2lkdGhcbiAgICAgIHRoaXMuaXRlbUVsbXMuY2hhbmdlcy5waXBlKFxuICAgICAgICAvLyBkZXRlY3RDaGFuZ2VzIHRvIGNoYW5nZSB2aWV3IGRvdHNcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGkgY2FuJ3QgcGFzcyB0aGUgY2hhbmdlZGV0ZWN0aW9uIGNoZWNrLCBvbmx5IHRoZSB3YXkgdG8gdXNpbmcgdGltZW91dC4gOihcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKSlcbiAgICAgICksXG4gICAgICByZXNpemVPYnNlcnZhYmxlKHRoaXMucm9vdEVsbSwgKCkgPT4gdGhpcy5jb250YWluZXJSZXNpemUoKSksXG4gICAgXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZhcmlhYmxlKCk7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgodHJ1ZSk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgfVxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAvKiBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnJ1bkxvb3ApIHtcbiAgICAgIHRoaXMuYWRkSW5maW5pdGVFbG0oKTtcbiAgICB9ICovXG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG5cbiAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0b3J5SGFtbWVyKCkge1xuICAgIGlmICh0aGlzLmhhbW1lcikge1xuICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udGFpbmVyUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4IHx8IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gdGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZpZXdXaWR0aChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gdGhpcy5nZXRBdXRvTnVtKCk7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICB9XG4gICAgdGhpcy5faW5maW5lRGF0YUNvdW50ID0gdGhpcy5fc2hvd051bSAqIDI7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5lbG1XaWR0aCA9XG4gICAgICB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkucm93KSAtXG4gICAgICAodGhpcy5wYWRkaW5nICogMikgL1xuICAgICAgICAodGhpcy5ncmlkQnkuY29sID4gMVxuICAgICAgICAgID8gdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgOiB0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkucm93KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbC1kaXNwbGF5LW5vd3JhcFwiXG4gICAgKTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxtV2lkdGggPVxuICAgICAgKHRoaXMucm9vdEVsbVdpZHRoIC0gdGhpcy5wYWRkaW5nICogMikgKlxuICAgICAgKHRoaXMuZWxtcy5sZW5ndGggLyB0aGlzLl9zaG93TnVtKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgdGhpcy52aWV3QXJlYS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIGB3aWR0aDoke3RoaXMucm9vdEVsbVdpZHRoIC0gdGhpcy5wYWRkaW5nICogMn1weGBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsbXMuZm9yRWFjaCgoZWxtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdHlsZShlbG0sIFwid2lkdGhcIiwgdGhpcy5lbG1XaWR0aCk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kSGFtbWVyKCkge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGhtID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuY29udGFpbmVyRWxtKTtcblxuICAgICAgY29uc3QgcGFuID0gbmV3IEhhbW1lci5QYW4oe1xuICAgICAgICBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGhtLmFkZChwYW4pO1xuXG4gICAgICBobS5vbihcInBhbmxlZnQgcGFucmlnaHQgcGFuZW5kIHBhbmNhbmNlbFwiLCAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhPbmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwicGFubGVmdFwiOlxuICAgICAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICAgICAgdGhpcy5wYW5Db3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuQ291bnQgPCAyKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ncmFiYmluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbiAhPT0gXCJjZW50ZXJcIiAmJiB0aGlzLnNob3dOdW0gPj0gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiB0aGlzLm91dE9mQm91bmQoZS50eXBlKSkge1xuICAgICAgICAgICAgICBlLmRlbHRhWCAqPSAwLjI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ub3REcmFnKSB7XG4gICAgICAgICAgICAgIHRoaXMubGVmdCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuY3VycmVudEluZGV4ICogdGhpcy5lbG1XaWR0aCArXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlICtcbiAgICAgICAgICAgICAgICBlLmRlbHRhWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ01hbnkpIHtcbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGUuZGVsdGFYKSA+IHRoaXMuZWxtV2lkdGggKiAwLjUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZWx0YVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGFuY2FuY2VsXCI6XG4gICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBcInBhbmVuZFwiOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLnBhbkJvdW5kYXJ5ICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogdGhpcy5wYW5Cb3VuZGFyeVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdmVOdW0gPSB0aGlzLmlzRHJhZ01hbnlcbiAgICAgICAgICAgICAgICA/IE1hdGguY2VpbChNYXRoLmFicyhlLmRlbHRhWCkgLyB0aGlzLmVsbVdpZHRoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxOdW07XG5cbiAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSBtb3ZlTnVtO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIG1vdmVOdW07XG5cbiAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHByZXZJbmRleCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb05leHQobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPCAtdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvTmV4dCh0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPiB0aGlzLnN3aXBlVmVsb2NpdHkgJiYgZS5kaXN0YW5jZSA+IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBobTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29QcmV2KHByZXZJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgcHJldkluZGV4IDwgMCkge1xuICAgICAgcHJldkluZGV4ID0gMDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcoMCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gcHJldkluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnb05leHQobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiBuZXh0SW5kZXggPiB0aGlzLm1heFJpZ2h0SW5kZXgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcobmV4dEluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGJpbmRDbGljaygpIHtcbiAgICBpZiAodGhpcy5idG5OZXh0ICYmIHRoaXMuYnRuUHJldikge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuYnRuTmV4dC5uYXRpdmVFbGVtZW50LCBcImNsaWNrXCIpLnBpcGUoXG4gICAgICAgICAgbWFwKCgpID0+ICh0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bSkpXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0blByZXYubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFJlc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMubW91c2VPbkNvbnRhaW5lciAmJiAhdGhpcy5ncmFiYmluZykge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzdGFydC5uZXh0KG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3VmlldyhcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGlzQW5pbWF0aW9uID0gdHJ1ZSxcbiAgICBpc0Zyb21BdXRvID0gdGhpcy5pc0Zyb21BdXRvXG4gICkge1xuICAgIGlmICh0aGlzLmVsbXMubGVuZ3RoID4gMSAmJiB0aGlzLmVsbXMubGVuZ3RoID4gdGhpcy5fc2hvd051bSkge1xuICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG4gICAgICB0aGlzLmxlZnQgPSAtKGluZGV4ICogdGhpcy5lbG1XaWR0aCAtIHRoaXMuYWxpZ25EaXN0YW5jZSk7XG5cbiAgICAgIGlmIChpc0FuaW1hdGlvbikge1xuICAgICAgICBpZiAoaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVmdCA9IHRoaXMuYWxpZ25EaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gIH1cblxuICBwcml2YXRlIG91dE9mQm91bmQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPD0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1blByb2dyZXNzKGJldHdlZW5UaW1lKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBob3dUaW1lcyA9IHRoaXMuc3BlZWQgLyBiZXR3ZWVuVGltZTtcbiAgICAgIGNvbnN0IGV2ZXJ5SW5jcmVhc2UgPSAoMTAwIC8gdGhpcy5zcGVlZCkgKiBiZXR3ZWVuVGltZTtcbiAgICAgIHJldHVybiBpbnRlcnZhbChiZXR3ZWVuVGltZSkucGlwZShcbiAgICAgICAgdGFwKCh0KSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gKHQgJSBob3dUaW1lcykgKiBldmVyeUluY3JlYXNlO1xuICAgICAgICB9KSxcbiAgICAgICAgYnVmZmVyQ291bnQoTWF0aC5yb3VuZChob3dUaW1lcyksIDApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdERhdGEoc2hvd051bSkge1xuICAgIGlmICghdGhpcy5vcmlnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsRGF0YSA9IFsuLi50aGlzLmRhdGFdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICB0aGlzLnNpbmdsZVRpbWVSdW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXlDcmVhdG9yKHRoaXMub3JpZ2luYWxEYXRhLCBzaG93TnVtKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHNob3dOdW07XG4gICAgICB0aGlzLmluaXRpYWxJbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0b051bSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aDtcbiAgICBpZiAodGhpcy5icmVha3BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMuYnJlYWtwb2ludC5maW5kKChiKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVNYXBbYi5zY3JlZW5TaXplXSA8PSBjdXJyV2lkdGg7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3cpIHtcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gbm93LnBhZGRpbmcgfHwgdGhpcy5wYWRkaW5nO1xuICAgICAgICBpZiAobm93LmdyaWRCeSkge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtID0gbm93LmdyaWRCeS5jb2wgfHwgbm93LnNjcm9sbE51bSB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHRoaXMuZ3JpZEJ5ID0gbm93LmdyaWRCeTtcbiAgICAgICAgICBjb25zdCBzaG93TnVtID0gbm93LmdyaWRCeS5jb2wgKiBub3cuZ3JpZEJ5LnJvdyB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtID0gbm93LnNjcm9sbE51bSB8fCBub3cubnVtYmVyO1xuICAgICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICAgIHJldHVybiBub3cubnVtYmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnBhZGRpbmcgPVxuICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnBhZGRpbmcgfHwgdGhpcy5wYWRkaW5nO1xuICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5O1xuICAgICAgICBjb25zdCBzaG93TnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgKlxuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkucm93IHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdE51bSA9IDM7XG4gICAgaWYgKGN1cnJXaWR0aCA+IDIwMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaW5pdE51bSArIGN1cnJXaWR0aCAvIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXROdW07XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9JWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5RmNuKGluZGV4LCBpdGVtKSB7XG4gICAgaWYgKCFpdGVtIHx8IGl0ZW1bdGhpcy50cmFja0J5S2V5XSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtW3RoaXMudHJhY2tCeUtleV07XG4gIH1cblxuICBwdWJsaWMgYXJyYXlDcmVhdG9yKGFyciwgY291bnQpIHtcbiAgICBjb25zdCBkYXRhID0gWy4uLmFycl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBkYXRhLnVuc2hpZnQoYXJyW2Fyci5sZW5ndGggLSAxIC0gKGkgJSBhcnIubGVuZ3RoKV0pO1xuICAgICAgZGF0YS5wdXNoKGFycltpICUgYXJyLmxlbmd0aF0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19