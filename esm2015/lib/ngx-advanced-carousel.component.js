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
        this.orginalData = [];
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
                (!this.runLoop &&
                    !(0 <= value && value <= this.itemElms.length - 1))) {
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
            this._renderer.setStyle(this.containerElm, "transform", `translateX(${value + this.currentIndex !== 0 ? this.padding : 0}px)`);
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
            this.rootElmWidth / (this._showNum / this.gridBy.col) -
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
        (element) => {
            element.nativeElement.setAttribute("style", `width:${(this.rootElmWidth * this.scrollNum * this.gridBy.col) /
                this._showNum -
                this.padding * 2}px`);
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
        if (!this.orginalData.length) {
            this.orginalData = [...this.data];
        }
        if (this.infinite) {
            this.singleTimeRun = false;
            this.data = this.arrayCreator(this.orginalData, showNum);
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
                template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length) ||\n      infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) ||\n      infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li\n        *ngIf=\"\n          (i + gridBy.col * gridBy.row) % (scrollNum * gridBy.row) === 0 &&\n          i + gridBy.col * gridBy.row < itemElms.length + scrollNum\n        \"\n        (click)=\"currentIndex = i\"\n      >\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQStTdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFD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QUFrQzs7Ozs7SUFFbEMsNENBQWlDOzs7OztJQUVqQyw4Q0FBZTs7Ozs7SUFFZixrREFBaUM7Ozs7O0lBQ2pDLDhDQUFnQzs7Ozs7SUFFaEMsK0NBQWlEOzs7OztJQUNqRCxtREFBZ0Q7Ozs7O0lBQ2hELGlEQUF1Qzs7Ozs7SUFDdkMsZ0RBQXNDOzs7OztJQUV0QyxzREFBMkI7Ozs7O0lBQzNCLHFEQUEwQjs7SUFDMUIsZ0RBQW9COzs7OztJQUNwQixpREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQixvREFBNkI7O0lBQzdCLDhDQUFtQzs7Ozs7SUFFbkMsZ0RBQXFCOztJQUtyQixpREFBc0M7O0lBRXRDLG9EQUFvQjs7SUFFcEIscURBQTRCOzs7OztJQUM1QixvREFBeUI7O0lBQ3pCLG1EQUF3Qjs7Ozs7SUFFeEIsd0RBQTZCOzs7OztJQWlEN0IsZ0RBQWtDOzs7OztJQUNsQyxpREFBNkI7Ozs7O0lBak4zQixrREFBNEM7Ozs7O0lBQzVDLGlEQUFtQzs7Ozs7SUFDbkMsaURBQTRCOzs7OztJQUM1Qiw2Q0FBcUI7Ozs7O0lBQ3JCLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBmcm9tRXZlbnQsXG4gIGludGVydmFsLFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBidWZmZXJDb3VudCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUgfSBmcm9tIFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtaXRlbS5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IHJlc2l6ZU9ic2VydmFibGUgfSBmcm9tIFwiLi9yeGpzLm9ic2VydmFibGUucmVzaXplXCI7XG5kZWNsYXJlIHZhciBIYW1tZXI7XG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6IFwibmd4LWFkdmFuY2VkLWNhcm91c2VsXCIsXG4gIHN0eWxlVXJsczogW1wiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG4gIC8qKiBkaXNhYmxlIGRyYWcgZXZlbnQgd2l0aCB0b3VjaCBhbmQgbW91c2UgcGFuIG1vdmluZywgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRpc2FibGUtZHJhZ1wiKVxuICBwdWJsaWMgZ2V0IGRpc2FibGVEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlRHJhZztcbiAgfVxuICBwdWJsaWMgc2V0IGRpc2FibGVEcmFnKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVEcmFnICE9PSB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVEcmFnID0gdmFsdWU7XG4gIH1cblxuICAvKiogaXMgdGhlIGNhcm91c2VsIGNhbiBtb3ZlIGluZmluaXRlICovXG4gIEBJbnB1dChcImluZmluaXRlXCIpXG4gIHB1YmxpYyBnZXQgaW5maW5pdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZmluaXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgaW5maW5pdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbmZpbml0ZSA9IHZhbHVlO1xuXG4gICAgLyogdGhpcy5pbmZpbml0ZUVsbVJlZnMuZm9yRWFjaCgocmVmKSA9PiB7XG4gICAgICB0aGlzLmFkZFN0eWxlKHJlZi5yb290Tm9kZXNbMF0sIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5ydW5Mb29wID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG4gICAgICB9KTtcbiAgICB9KTsgKi9cbiAgfVxuXG4gIC8qKiBhdXRvIHBsYXkgc3BlZWQgKi9cbiAgQElucHV0KFwiYXV0b3BsYXktc3BlZWRcIilcbiAgcHVibGljIGdldCBzcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGVlZENoYW5nZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhvdyBtYW55IG51bWJlciBpdGVtcyB0byBzaG93IG9uY2UsIGRlZmF1bHQgaXMgYDFgXG4gICAqIHNldCBgYXV0b2AgdG8gdXNpbmcgYFticmVha3BvaW50XWAgc2V0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KFwic2hvdy1udW1cIilcbiAgcHVibGljIGdldCBzaG93TnVtKCk6IG51bWJlciB8IFwiYXV0b1wiIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd051bTtcbiAgfVxuICBwdWJsaWMgc2V0IHNob3dOdW0odmFsdWU6IG51bWJlciB8IFwiYXV0b1wiKSB7XG4gICAgaWYgKHZhbHVlID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5pc0F1dG9OdW0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gK3ZhbHVlO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgICB0aGlzLnNldFZpZXdXaWR0aCgpO1xuICAgICAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLnN0YXJ0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgLyoqIGNhcm91c2VsIGF1dG8gcGxheSBjb25maW5nICovXG4gIEBJbnB1dChcImF1dG9wbGF5XCIpXG4gIHB1YmxpYyBnZXQgYXV0b3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9wbGF5O1xuICB9XG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWUpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRvTmV4dFN1YiQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICAgIC8vIGlmIHNldCBhdXRvcGxheSwgdGhlbiB0aGUgaW5maW5pdGUgaXMgdHJ1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbmZpbml0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRJbmRleCh2YWx1ZSkge1xuICAgIC8vIGlmIG5vdyBpbmRleCBpZiBub3QgZXF1YWxlIHRvIHNhdmUgaW5kZXgsIGRvIHNvbWV0aW5nXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5vdCBjb250YWluIHdpdGggdGhlIGJvdW5kYXJ5IG5vdCBoYW5kbGVyd1xuICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLml0ZW1FbG1zIHx8XG4gICAgICAgICghdGhpcy5ydW5Mb29wICYmXG4gICAgICAgICEoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSAmJiAhdGhpcy5pc0Zyb21BdXRvKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFdmVudC5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgIHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDFcbiAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICBpZiAoIXRoaXMuaW5maW5pdGUgJiYgdGhpcy5yZWFsSW5kZXggPiB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLmVsbXMubGVuZ3RoO1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wgPFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bSA8IDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IDwgMCAmJiAhdGhpcy5pbmZpbml0ZSA/IDAgOiB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluZmluaXRlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5pbml0aWFsSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogNCArIHRoaXMuY3VycmVudEluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5kYXRhLmxlbmd0aCArIHRoaXMuX3Nob3dOdW0gKiA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyKHRoaXMuYW5pVGltZSArIDEwMClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlmICh0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9ICh0aGlzLnJlYWxJbmRleCAtIHRoaXMuZWxtcy5sZW5ndGgpICUgdGhpcy5fc2hvd051bTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggLT0gY291bnQ7XG4gICAgICAgICAgdGhpcy5yZWFsSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtICtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAwIDw9IHRoaXMuY3VycmVudEluZGV4ICYmXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4IDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmluZGV4Q2hhbmdlZC5lbWl0KHtcbiAgICAgIHJlYWxJbmRleDogdGhpcy5yZWFsSW5kZXgsXG4gICAgICBjdXJyZW50SW5kZXg6IHRoaXMuY3VycmVudEluZGV4LFxuICAgICAgdmlld1NpemU6IHRoaXMuX3Nob3dOdW0sXG4gICAgfSk7XG4gICAgdGhpcy5pc0Zyb21BdXRvID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2dyZXNzV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcmdyZXNzV2lkdGg7XG4gIH1cbiAgcHVibGljIHNldCBwcm9ncmVzc1dpZHRoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NFbG0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLl9wb3JncmVzc1dpZHRoID0gdmFsdWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgKHRoaXMucHJvZ3Jlc3NDb250YWluZXJFbG0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW5bMF0sXG4gICAgICAgIFwid2lkdGhcIixcbiAgICAgICAgYCR7dGhpcy5wcm9ncmVzc1dpZHRofSVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ3JhYmJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYWJiaW5nO1xuICB9XG4gIHB1YmxpYyBzZXQgZ3JhYmJpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZ3JhYmJpbmcgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2dyYWJiaW5nID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFuQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldCBsZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlICsgdGhpcy5jdXJyZW50SW5kZXggIT09IDAgPyB0aGlzLnBhZGRpbmcgOiAwfXB4KWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZVgoJHt2YWx1ZX0lKWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbWF4UmlnaHRJbmRleCgpIHtcbiAgICBsZXQgYWRkSW5kZXggPSAwO1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgYWRkSW5kZXggPSAodGhpcy5zaG93TnVtIGFzIG51bWJlcikgLSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxIC0gdGhpcy5fc2hvd051bSArIDEgKyBhZGRJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJ1bkxvb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0b3BsYXkgfHwgdGhpcy5pbmZpbml0ZTtcbiAgfVxuICBwcml2YXRlIGdldCBsZW5ndGhPbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoID09PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcm9vdEVsbVdpZHRoKCkge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpXG4gICAgICA/IHRoaXMucm9vdEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgOiAxMDA7XG4gIH1cblxuICBwcml2YXRlIHNldCBjb250YWluZXJFbG1XaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJ3aWR0aFwiLCB2YWx1ZSk7XG4gIH1cblxuICBAT3V0cHV0KCkgcHVibGljIGluZGV4Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfc3RhcnRJbmRleCA9IDA7XG5cbiAgQElucHV0KClcbiAgcHJpdmF0ZSBnZXQgc3RhcnRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRJbmRleDtcbiAgfVxuICBwcml2YXRlIHNldCBzdGFydEluZGV4KHZhbCkge1xuICAgIHRoaXMuX3N0YXJ0SW5kZXggPSB2YWw7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLl9zdGFydEluZGV4O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lckVsbVwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbihcInZpZXdBcmVhXCIpIHB1YmxpYyB2aWV3QXJlYTogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKFwicHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGJ0blByZXY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJuZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuTmV4dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NDb250YWluZXJFbG06IEVsZW1lbnRSZWY7XG5cbiAgLy8gZ2V0IGFsbCBpdGVtIGVsbXNcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSwge1xuICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICAgIHJlYWQ6IEVsZW1lbnRSZWYsXG4gIH0pXG4gIHB1YmxpYyBpdGVtRWxtczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByZXZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjb250ZW50UHJldjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsTmV4dFwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnROZXh0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxEb3RcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBkb3RFbG06IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbEl0ZW1UZW1wbGF0ZVwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNhcm91c2VsSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxQcm9ncmVzc1wiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzRWxtOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHB1YmxpYyBfZGF0YTogYW55W107XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBtYXBwZWREYXRhOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogd2hlbiBpbmZpbml0ZSBpcyB0cnVlLCB0aGUgYW5pbWF0aW9uIHRpbWUgd2l0aCBpdGVtLCBkZWZhdWx0IGlzIDQwMC4gKi9cbiAgQElucHV0KCkgcHVibGljIGFuaVRpbWUgPSA0MDA7XG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIGluICNjb250YWluZXJFbG0gd2hlbiBtb2RlbCBjaGFuZ2UgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaUNsYXNzID0gXCJ0cmFuc2l0aW9uXCI7XG5cbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgd2hlbiBjYXJvdXNlbCBhdXRvIHBsYXksXG4gICAqIHRoaXMgZGVmYXVsdCBhdXRvcGxheSBhbmltYXRpb24gaXMgc2FtZSBhcyBhbmlDbGFzc1xuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaUNsYXNzQXV0byA9IHRoaXMuYW5pQ2xhc3M7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KFwic2hvdy1uZXh0LXByZXYtYnV0dG9uc1wiKSBwdWJsaWMgc2hvd0J1dHRvbnNNZXRob2Q6XG4gICAgfCBcImFsd2F5c1wiXG4gICAgfCBcImF1dG8taGlkZVwiXG4gICAgfCBcImF1dG8tZGlzYWJsZVwiID0gXCJhbHdheXNcIjtcblxuICAvKipcbiAgICogdXNlciBtb3ZlIHBpY3R1cmUgd2l0aCB0aGUgY29udGFpbmVyIHdpZHRoIHJhdGUsXG4gICAqIHdoZW4gbW9yZSB0aGFuIHRoYXQgcmF0ZSwgaXQgd2lsbCBnbyB0byBuZXh0IG9yIHByZXYsXG4gICAqIHNldCBmYWxzZSB3aWxsIG5ldmVyIG1vdmUgd2l0aCBkaXN0YW5jZSByYXRlLFxuICAgKiBkZWZhdWx0IGlzIGAwLjE1YFxuICAgKi9cbiAgQElucHV0KFwicGFuLWJvdW5kYXJ5XCIpIHB1YmxpYyBwYW5Cb3VuZGFyeTogbnVtYmVyIHwgZmFsc2UgPSAwLjE1O1xuXG4gIC8qKiB3aGVuIHNob3ctbnVtIGlzIGJpZ2dlciB0aGFuIDEsIHRoZSBmaXJzdCBpdGVtIGFsaWduLCBkZWZhdWx0ZSBpcyBgY2VudGVyYCAqL1xuICBASW5wdXQoKSBwdWJsaWMgYWxpZ246IFwibGVmdFwiIHwgXCJjZW50ZXJcIiB8IFwicmlnaHRcIiA9IFwiY2VudGVyXCI7XG5cbiAgLyoqXG4gICAqIGRpc2FibGUgd2hlbiBkcmFnIG9jY3VyIHRoZSBjaGlsZCBlbGVtZW50IHdpbGwgZm9sbG93IHRvdWNoIHBvaW50LlxuICAgKiBkZWZhdWx0IGlzIGBmYWxzZWBcbiAgICovXG4gIEBJbnB1dChcIm5vdC1mb2xsb3ctcGFuXCIpIHB1YmxpYyBub3REcmFnID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHVibGljIHRyYWNrQnlLZXkgPSBcImNvZGVcIjtcbiAgLyoqXG4gICAqIHRoZSBldmVudCBiaW5kaW5nIHN0YXRlIGZvciBzdG9wIGF1dG8gcGxheSB3aGVuIG1vdXJzZSBtb3Zlb3ZlclxuICAgKi9cbiAgQElucHV0KFwibW91cnNlLWVuYWJsZVwiKSBwdWJsaWMgbW91cnNlRW5hYmxlID0gZmFsc2U7XG4gIC8qKiBlYWNoIGF1dG8gcGxheSBiZXR3ZWVuIHRpbWUgKi9cbiAgQElucHV0KFwiYmV0d2Vlbi1kZWxheVwiKSBwdWJsaWMgZGVsYXkgPSA4MDAwO1xuICAvKiogYXV0byBwbGF5IGRpcmVjdGlvbiwgZGVmYXVsdCBpcyBgcmlnaHRgLiAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1kaXJlY3Rpb25cIikgcHVibGljIGRpcmVjdGlvbjogXCJsZWZ0XCIgfCBcInJpZ2h0XCIgPSBcInJpZ2h0XCI7XG4gIC8qKiBob3cgbWFueSBudW1iZXIgd2l0aCBlYWNoIHNjcm9sbCwgZGVmYXVsdCBpcyBgMWAuICovXG4gIEBJbnB1dChcInNjcm9sbC1udW1cIikgcHVibGljIHNjcm9sbE51bSA9IDE7XG4gIC8qKiBDb3VsZCB1c2VyIHNjcm9sbCBtYW55IGl0ZW0gb25jZSwgc2ltdWxhdGUgd2l0aCBzY3JvbGxiYXIsIGRlZmF1bHQgaXMgYGZhbHNlYCAqL1xuICBASW5wdXQoXCJkcmFnLW1hbnlcIikgcHVibGljIGlzRHJhZ01hbnkgPSBmYWxzZTtcbiAgLyoqIE1pbmltYWwgdmVsb2NpdHkgcmVxdWlyZWQgYmVmb3JlIHJlY29nbml6aW5nLCB1bml0IGlzIGluIHB4IHBlciBtcywgZGVmYXVsdCBgMC4zYCAqL1xuICBASW5wdXQoXCJzd2lwZS12ZWxvY2l0eVwiKSBwdWJsaWMgc3dpcGVWZWxvY2l0eSA9IDAuMztcblxuICAvKipcbiAgICogc3dpdGNoIHNob3cgbnVtYmVyIHdpdGggY3VzdG9tIGxvZ2ljIGxpa2UgY3NzIEBtZWRpYSAobWluLXdpZHRoOiBgbnVtYmVyYHB4KVxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGJyZWFrcG9pbnQ6IEFycmF5PHtcbiAgICBncmlkQnk/O1xuICAgIHNjcmVlblNpemU6IFwieHhsXCIgfCBcInhsXCIgfCBcImxnXCIgfCBcIm1kXCIgfCBcInNtXCIgfCBcInhzXCI7XG4gICAgbnVtYmVyO1xuICAgIHNjcm9sbE51bT87XG4gIH0+ID0gW107XG5cbiAgQElucHV0KCkgcHVibGljIHNjcmVlblNpemVNYXAgPSB7XG4gICAgeHhsOiAxNDQwLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgeGw6IDEyMDAsXG4gICAgbGc6IDk5MixcbiAgICBtZDogNzY4LFxuICAgIHNtOiA1NzYsXG4gICAgeHM6IDAsXG4gIH07XG5cbiAgQElucHV0KCkgcGFkZGluZzogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgbGVhdmVPYnMkID0gbWVyZ2UoXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcIm1vdXNldXBcIiksXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCBcInRvdWNoZW5kXCIpXG4gICkucGlwZShcbiAgICB0YXAoKGU6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdyYWJiaW5nID0gZmFsc2U7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG5cbiAgcHJpdmF0ZSBpc0Zyb21BdXRvID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc0F1dG9OdW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZU9uQ29udGFpbmVyID0gZmFsc2U7XG4gIHByaXZhdGUgYWxpZ25EaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgZWxtV2lkdGggPSAwO1xuXG4gIHByaXZhdGUgcm9vdEVsbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyRWxtOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGVsbXM6IEFycmF5PEhUTUxFbGVtZW50PjtcblxuICBwcml2YXRlIGhhbW1lcjtcblxuICBwcml2YXRlIGRvTmV4dFN1YiQ6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkb05leHQ6IE9ic2VydmFibGU8YW55PjtcblxuICBwcml2YXRlIHJlc3RhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIHByaXZhdGUgc3BlZWRDaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDUwMDApO1xuICBwcml2YXRlIHN0b3BFdmVudCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBwcml2YXRlIF9wb3JncmVzc1dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudEluZGV4ID0gMDtcbiAgcHVibGljIF9zaG93TnVtID0gMTtcbiAgcHJpdmF0ZSBfYXV0b3BsYXkgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaW5maW5pdGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZ3JhYmJpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZURyYWcgPSBmYWxzZTtcbiAgcHVibGljIGdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcblxuICBwcml2YXRlIHBhbkNvdW50ID0gMDtcblxuICAvLyB0aGlzIHZhcmlhYmxlIHVzZSBmb3IgY2hlY2sgdGhlIGluaXQgdmFsdWUgaXMgd3JpdGUgd2l0aCBuZ01vZGVsLFxuICAvLyB3aGVuIGluaXQgZmlyc3QsIG5vdCBzZXQgd2l0aCBhbmltYXRpb25cblxuICBwdWJsaWMgcmVhbEluZGV4ID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG4gIHB1YmxpYyB3cmFwcGVyV2lkdGg7XG5cbiAgcHVibGljIHNpbmdsZVRpbWVSdW4gPSB0cnVlO1xuICBwcml2YXRlIGluaXRpYWxJbmRleCA9IDA7XG4gIHB1YmxpYyBvcmdpbmFsRGF0YSA9IFtdO1xuXG4gIHByaXZhdGUgX2luZmluZURhdGFDb3VudCA9IDA7XG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yb290RWxtID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsbSA9IHRoaXMucm9vdEVsbS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZm9ya0pvaW4oW1xuICAgICAgLi4udGhpcy5iaW5kQ2xpY2soKSxcbiAgICAgIC8vIHdoZW4gaXRlbSBjaGFuZ2VkLCByZW1vdmUgb2xkIGhhbW1lciBiaW5kaW5nLCBhbmQgcmVzZXQgd2lkdGhcbiAgICAgIHRoaXMuaXRlbUVsbXMuY2hhbmdlcy5waXBlKFxuICAgICAgICAvLyBkZXRlY3RDaGFuZ2VzIHRvIGNoYW5nZSB2aWV3IGRvdHNcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGkgY2FuJ3QgcGFzcyB0aGUgY2hhbmdlZGV0ZWN0aW9uIGNoZWNrLCBvbmx5IHRoZSB3YXkgdG8gdXNpbmcgdGltZW91dC4gOihcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKSlcbiAgICAgICksXG4gICAgICByZXNpemVPYnNlcnZhYmxlKHRoaXMucm9vdEVsbSwgKCkgPT4gdGhpcy5jb250YWluZXJSZXNpemUoKSksXG4gICAgXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuICBwcml2YXRlIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZhcmlhYmxlKCk7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgodHJ1ZSk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZURyYWcpIHtcbiAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgfVxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICAvKiBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiB0aGlzLnJ1bkxvb3ApIHtcbiAgICAgIHRoaXMuYWRkSW5maW5pdGVFbG0oKTtcbiAgICB9ICovXG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG5cbiAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5kb05leHRTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXN0b3J5SGFtbWVyKCkge1xuICAgIGlmICh0aGlzLmhhbW1lcikge1xuICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udGFpbmVyUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcblxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4IHx8IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gdGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZpZXdXaWR0aChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gdGhpcy5nZXRBdXRvTnVtKCk7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhcnRJbmRleDtcbiAgICB9XG4gICAgdGhpcy5faW5maW5lRGF0YUNvdW50ID0gdGhpcy5fc2hvd051bSAqIDI7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5lbG1XaWR0aCA9XG4gICAgICB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkuY29sKSAtXG4gICAgICAodGhpcy5wYWRkaW5nICogMikgL1xuICAgICAgICAodGhpcy5ncmlkQnkuY29sID4gMVxuICAgICAgICAgID8gdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgOiB0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkucm93KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbC1kaXNwbGF5LW5vd3JhcFwiXG4gICAgKTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxtV2lkdGggPVxuICAgICAgKHRoaXMuZWxtV2lkdGggLyB0aGlzLmdyaWRCeS5jb2wpICogdGhpcy5lbG1zLmxlbmd0aDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgdGhpcy52aWV3QXJlYS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIGB3aWR0aDoke1xuICAgICAgICAgICh0aGlzLnJvb3RFbG1XaWR0aCAqIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sKSAvXG4gICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICB0aGlzLnBhZGRpbmcgKiAyXG4gICAgICAgIH1weGBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsbXMuZm9yRWFjaCgoZWxtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdHlsZShlbG0sIFwid2lkdGhcIiwgdGhpcy5lbG1XaWR0aCk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kSGFtbWVyKCkge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGhtID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuY29udGFpbmVyRWxtKTtcblxuICAgICAgY29uc3QgcGFuID0gbmV3IEhhbW1lci5QYW4oe1xuICAgICAgICBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGhtLmFkZChwYW4pO1xuXG4gICAgICBobS5vbihcInBhbmxlZnQgcGFucmlnaHQgcGFuZW5kIHBhbmNhbmNlbFwiLCAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhPbmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwicGFubGVmdFwiOlxuICAgICAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICAgICAgdGhpcy5wYW5Db3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuQ291bnQgPCAyKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ncmFiYmluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbiAhPT0gXCJjZW50ZXJcIiAmJiB0aGlzLnNob3dOdW0gPj0gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiB0aGlzLm91dE9mQm91bmQoZS50eXBlKSkge1xuICAgICAgICAgICAgICBlLmRlbHRhWCAqPSAwLjI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ub3REcmFnKSB7XG4gICAgICAgICAgICAgIHRoaXMubGVmdCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuY3VycmVudEluZGV4ICogdGhpcy5lbG1XaWR0aCArXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlICtcbiAgICAgICAgICAgICAgICBlLmRlbHRhWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ01hbnkpIHtcbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGUuZGVsdGFYKSA+IHRoaXMuZWxtV2lkdGggKiAwLjUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZWx0YVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGFuY2FuY2VsXCI6XG4gICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBcInBhbmVuZFwiOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLnBhbkJvdW5kYXJ5ICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogdGhpcy5wYW5Cb3VuZGFyeVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdmVOdW0gPSB0aGlzLmlzRHJhZ01hbnlcbiAgICAgICAgICAgICAgICA/IE1hdGguY2VpbChNYXRoLmFicyhlLmRlbHRhWCkgLyB0aGlzLmVsbVdpZHRoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxOdW07XG5cbiAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSBtb3ZlTnVtO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIG1vdmVOdW07XG5cbiAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHByZXZJbmRleCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb05leHQobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPCAtdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvTmV4dCh0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPiB0aGlzLnN3aXBlVmVsb2NpdHkgJiYgZS5kaXN0YW5jZSA+IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBobTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29QcmV2KHByZXZJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgcHJldkluZGV4IDwgMCkge1xuICAgICAgcHJldkluZGV4ID0gMDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcoMCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gcHJldkluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnb05leHQobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiBuZXh0SW5kZXggPiB0aGlzLm1heFJpZ2h0SW5kZXgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcobmV4dEluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGJpbmRDbGljaygpIHtcbiAgICBpZiAodGhpcy5idG5OZXh0ICYmIHRoaXMuYnRuUHJldikge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuYnRuTmV4dC5uYXRpdmVFbGVtZW50LCBcImNsaWNrXCIpLnBpcGUoXG4gICAgICAgICAgbWFwKCgpID0+ICh0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bSkpXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0blByZXYubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFJlc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMubW91c2VPbkNvbnRhaW5lciAmJiAhdGhpcy5ncmFiYmluZykge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzdGFydC5uZXh0KG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3VmlldyhcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGlzQW5pbWF0aW9uID0gdHJ1ZSxcbiAgICBpc0Zyb21BdXRvID0gdGhpcy5pc0Zyb21BdXRvXG4gICkge1xuICAgIGlmICh0aGlzLmVsbXMubGVuZ3RoID4gMSAmJiB0aGlzLmVsbXMubGVuZ3RoID4gdGhpcy5fc2hvd051bSkge1xuICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG4gICAgICB0aGlzLmxlZnQgPSAtKGluZGV4ICogdGhpcy5lbG1XaWR0aCAtIHRoaXMuYWxpZ25EaXN0YW5jZSk7XG5cbiAgICAgIGlmIChpc0FuaW1hdGlvbikge1xuICAgICAgICBpZiAoaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVmdCA9IHRoaXMuYWxpZ25EaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gIH1cblxuICBwcml2YXRlIG91dE9mQm91bmQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPD0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1blByb2dyZXNzKGJldHdlZW5UaW1lKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBob3dUaW1lcyA9IHRoaXMuc3BlZWQgLyBiZXR3ZWVuVGltZTtcbiAgICAgIGNvbnN0IGV2ZXJ5SW5jcmVhc2UgPSAoMTAwIC8gdGhpcy5zcGVlZCkgKiBiZXR3ZWVuVGltZTtcbiAgICAgIHJldHVybiBpbnRlcnZhbChiZXR3ZWVuVGltZSkucGlwZShcbiAgICAgICAgdGFwKCh0KSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gKHQgJSBob3dUaW1lcykgKiBldmVyeUluY3JlYXNlO1xuICAgICAgICB9KSxcbiAgICAgICAgYnVmZmVyQ291bnQoTWF0aC5yb3VuZChob3dUaW1lcyksIDApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdERhdGEoc2hvd051bSkge1xuICAgIGlmICghdGhpcy5vcmdpbmFsRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub3JnaW5hbERhdGEgPSBbLi4udGhpcy5kYXRhXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgdGhpcy5zaW5nbGVUaW1lUnVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5Q3JlYXRvcih0aGlzLm9yZ2luYWxEYXRhLCBzaG93TnVtKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHNob3dOdW07XG4gICAgICB0aGlzLmluaXRpYWxJbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0b051bSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aDtcbiAgICBpZiAodGhpcy5icmVha3BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMuYnJlYWtwb2ludC5maW5kKChiKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVNYXBbYi5zY3JlZW5TaXplXSA8PSBjdXJyV2lkdGg7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3cpIHtcbiAgICAgICAgaWYgKG5vdy5ncmlkQnkpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5ncmlkQnkuY29sIHx8IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IG5vdy5ncmlkQnk7XG4gICAgICAgICAgY29uc3Qgc2hvd051bSA9IG5vdy5ncmlkQnkuY29sICogbm93LmdyaWRCeS5yb3cgfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgICByZXR1cm4gbm93Lm51bWJlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5O1xuICAgICAgICBjb25zdCBzaG93TnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgKlxuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkucm93IHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdE51bSA9IDM7XG4gICAgaWYgKGN1cnJXaWR0aCA+IDIwMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaW5pdE51bSArIGN1cnJXaWR0aCAvIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXROdW07XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9JWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5RmNuKGluZGV4LCBpdGVtKSB7XG4gICAgaWYgKCFpdGVtIHx8IGl0ZW1bdGhpcy50cmFja0J5S2V5XSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtW3RoaXMudHJhY2tCeUtleV07XG4gIH1cblxuICBwdWJsaWMgYXJyYXlDcmVhdG9yKGFyciwgY291bnQpIHtcbiAgICBjb25zdCBkYXRhID0gWy4uLmFycl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBkYXRhLnVuc2hpZnQoYXJyW2Fyci5sZW5ndGggLSAxIC0gKGkgJSBhcnIubGVuZ3RoKV0pO1xuICAgICAgZGF0YS5wdXNoKGFycltpICUgYXJyLmxlbmd0aF0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19