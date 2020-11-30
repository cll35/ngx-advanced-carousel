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
            if (!this.runLoop &&
                !(0 <= value && value <= this.itemElms.length - 1) &&
                !this.itemElms.length) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQThTdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFD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O0lBQ2pELG1EQUFnRDs7Ozs7SUFDaEQsaURBQXVDOzs7OztJQUN2QyxnREFBc0M7Ozs7O0lBRXRDLHNEQUEyQjs7Ozs7SUFDM0IscURBQTBCOztJQUMxQixnREFBb0I7Ozs7O0lBQ3BCLGlEQUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQixpREFBMEI7Ozs7O0lBQzFCLG9EQUE2Qjs7SUFDN0IsOENBQW1DOzs7OztJQUVuQyxnREFBcUI7O0lBS3JCLGlEQUFzQzs7SUFFdEMsb0RBQW9COztJQUVwQixxREFBNEI7Ozs7O0lBQzVCLG9EQUF5Qjs7SUFDekIsbURBQXdCOzs7OztJQUV4Qix3REFBNkI7Ozs7O0lBaUQ3QixnREFBa0M7Ozs7O0lBQ2xDLGlEQUE2Qjs7Ozs7SUFqTjNCLGtEQUE0Qzs7Ozs7SUFDNUMsaURBQW1DOzs7OztJQUNuQyxpREFBNEI7Ozs7O0lBQzVCLDZDQUFxQjs7Ozs7SUFDckIsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZm9ya0pvaW4sXG4gIGZyb21FdmVudCxcbiAgaW50ZXJ2YWwsXG4gIG1lcmdlLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIGJ1ZmZlckNvdW50LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YWtlVW50aWwsXG4gIHRhcCxcbn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSB9IGZyb20gXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC1pdGVtLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgcmVzaXplT2JzZXJ2YWJsZSB9IGZyb20gXCIuL3J4anMub2JzZXJ2YWJsZS5yZXNpemVcIjtcbmRlY2xhcmUgdmFyIEhhbW1lcjtcbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuc2Nzc1wiXSxcbiAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWUpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gIH1cbiAgLyoqIGRpc2FibGUgZHJhZyBldmVudCB3aXRoIHRvdWNoIGFuZCBtb3VzZSBwYW4gbW92aW5nLCBkZWZhdWx0IGlzIGBmYWxzZWAgKi9cbiAgQElucHV0KFwiZGlzYWJsZS1kcmFnXCIpXG4gIHB1YmxpYyBnZXQgZGlzYWJsZURyYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVEcmFnO1xuICB9XG4gIHB1YmxpYyBzZXQgZGlzYWJsZURyYWcodmFsdWUpIHtcbiAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZURyYWcgIT09IHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGlzYWJsZURyYWcgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBpcyB0aGUgY2Fyb3VzZWwgY2FuIG1vdmUgaW5maW5pdGUgKi9cbiAgQElucHV0KFwiaW5maW5pdGVcIilcbiAgcHVibGljIGdldCBpbmZpbml0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5maW5pdGU7XG4gIH1cbiAgcHVibGljIHNldCBpbmZpbml0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2luZmluaXRlID0gdmFsdWU7XG5cbiAgICAvKiB0aGlzLmluZmluaXRlRWxtUmVmcy5mb3JFYWNoKChyZWYpID0+IHtcbiAgICAgIHRoaXMuYWRkU3R5bGUocmVmLnJvb3ROb2Rlc1swXSwge1xuICAgICAgICB2aXNpYmlsaXR5OiB0aGlzLnJ1bkxvb3AgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIH0pO1xuICAgIH0pOyAqL1xuICB9XG5cbiAgLyoqIGF1dG8gcGxheSBzcGVlZCAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1zcGVlZFwiKVxuICBwdWJsaWMgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLnNwZWVkQ2hhbmdlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3BlZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaG93IG1hbnkgbnVtYmVyIGl0ZW1zIHRvIHNob3cgb25jZSwgZGVmYXVsdCBpcyBgMWBcbiAgICogc2V0IGBhdXRvYCB0byB1c2luZyBgW2JyZWFrcG9pbnRdYCBzZXQgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoXCJzaG93LW51bVwiKVxuICBwdWJsaWMgZ2V0IHNob3dOdW0oKTogbnVtYmVyIHwgXCJhdXRvXCIge1xuICAgIHJldHVybiB0aGlzLl9zaG93TnVtO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd051bSh2YWx1ZTogbnVtYmVyIHwgXCJhdXRvXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmlzQXV0b051bSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSArdmFsdWU7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIGNhcm91c2VsIGF1dG8gcGxheSBjb25maW5nICovXG4gIEBJbnB1dChcImF1dG9wbGF5XCIpXG4gIHB1YmxpYyBnZXQgYXV0b3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9wbGF5O1xuICB9XG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWUpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRvTmV4dFN1YiQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICAgIC8vIGlmIHNldCBhdXRvcGxheSwgdGhlbiB0aGUgaW5maW5pdGUgaXMgdHJ1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbmZpbml0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRJbmRleCh2YWx1ZSkge1xuICAgIC8vIGlmIG5vdyBpbmRleCBpZiBub3QgZXF1YWxlIHRvIHNhdmUgaW5kZXgsIGRvIHNvbWV0aW5nXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5vdCBjb250YWluIHdpdGggdGhlIGJvdW5kYXJ5IG5vdCBoYW5kbGVyd1xuICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLnJ1bkxvb3AgJiZcbiAgICAgICAgISgwIDw9IHZhbHVlICYmIHZhbHVlIDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSkgJiZcbiAgICAgICAgIXRoaXMuaXRlbUVsbXMubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLmlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIGlmICghdGhpcy5pbmZpbml0ZSAmJiB0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZWxtcy5sZW5ndGg7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbCA8XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gLVxuICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2w7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtIDwgMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogdGhpcy5lbG1zLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPCAwICYmICF0aGlzLmluZmluaXRlID8gMCA6IHRoaXMuY3VycmVudEluZGV4O1xuICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmluaXRpYWxJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gKiA0ICsgdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogMikge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLmRhdGEubGVuZ3RoICsgdGhpcy5fc2hvd051bSAqIDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGltZXIodGhpcy5hbmlUaW1lICsgMTAwKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgKHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGNvdW50ID0gKHRoaXMucmVhbEluZGV4IC0gdGhpcy5lbG1zLmxlbmd0aCkgJSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCAtPSBjb3VudDtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIDAgPD0gdGhpcy5jdXJyZW50SW5kZXggJiZcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5kZXhDaGFuZ2VkLmVtaXQoe1xuICAgICAgcmVhbEluZGV4OiB0aGlzLnJlYWxJbmRleCxcbiAgICAgIGN1cnJlbnRJbmRleDogdGhpcy5jdXJyZW50SW5kZXgsXG4gICAgICB2aWV3U2l6ZTogdGhpcy5fc2hvd051bSxcbiAgICB9KTtcbiAgICB0aGlzLmlzRnJvbUF1dG8gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvZ3Jlc3NXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9yZ3Jlc3NXaWR0aDtcbiAgfVxuICBwdWJsaWMgc2V0IHByb2dyZXNzV2lkdGgodmFsdWUpIHtcbiAgICBpZiAodGhpcy5wcm9ncmVzc0VsbSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuX3BvcmdyZXNzV2lkdGggPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAodGhpcy5wcm9ncmVzc0NvbnRhaW5lckVsbS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jaGlsZHJlblswXSxcbiAgICAgICAgXCJ3aWR0aFwiLFxuICAgICAgICBgJHt0aGlzLnByb2dyZXNzV2lkdGh9JWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBncmFiYmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JhYmJpbmc7XG4gIH1cbiAgcHVibGljIHNldCBncmFiYmluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9ncmFiYmluZyAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZ3JhYmJpbmcgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYmJpbmdcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYW5Db3VudCA9IDA7XG4gICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWUgKyB0aGlzLmN1cnJlbnRJbmRleCAhPT0gMCA/IHRoaXMucGFkZGluZyA6IDB9cHgpYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfSUpYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBtYXhSaWdodEluZGV4KCkge1xuICAgIGxldCBhZGRJbmRleCA9IDA7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBhZGRJbmRleCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDEgLSB0aGlzLl9zaG93TnVtICsgMSArIGFkZEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcnVuTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRvcGxheSB8fCB0aGlzLmluZmluaXRlO1xuICB9XG4gIHByaXZhdGUgZ2V0IGxlbmd0aE9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggPT09IDE7XG4gIH1cblxuICBwcml2YXRlIGdldCByb290RWxtV2lkdGgoKSB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZClcbiAgICAgID8gdGhpcy5yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICA6IDEwMDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGNvbnRhaW5lckVsbVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcIndpZHRoXCIsIHZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBwdWJsaWMgaW5kZXhDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9zdGFydEluZGV4ID0gMDtcblxuICBASW5wdXQoKVxuICBwcml2YXRlIGdldCBzdGFydEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFydEluZGV4O1xuICB9XG4gIHByaXZhdGUgc2V0IHN0YXJ0SW5kZXgodmFsKSB7XG4gICAgdGhpcy5fc3RhcnRJbmRleCA9IHZhbDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuX3N0YXJ0SW5kZXg7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuICBAVmlld0NoaWxkKFwiY29udGFpbmVyRWxtXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKFwidmlld0FyZWFcIikgcHVibGljIHZpZXdBcmVhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoXCJwcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuUHJldjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5OZXh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0NvbnRhaW5lckVsbTogRWxlbWVudFJlZjtcblxuICAvLyBnZXQgYWxsIGl0ZW0gZWxtc1xuICBAQ29udGVudENoaWxkcmVuKE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlLCB7XG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gICAgcmVhZDogRWxlbWVudFJlZixcbiAgfSlcbiAgcHVibGljIGl0ZW1FbG1zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnRQcmV2OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxOZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudE5leHQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbERvdFwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGRvdEVsbTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsSXRlbVRlbXBsYXRlXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY2Fyb3VzZWxJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NFbG06IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIF9kYXRhOiBhbnlbXTtcblxuICBAT3V0cHV0KCkgcHVibGljIG1hcHBlZERhdGE6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiB3aGVuIGluZmluaXRlIGlzIHRydWUsIHRoZSBhbmltYXRpb24gdGltZSB3aXRoIGl0ZW0sIGRlZmF1bHQgaXMgNDAwLiAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pVGltZSA9IDQwMDtcbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgaW4gI2NvbnRhaW5lckVsbSB3aGVuIG1vZGVsIGNoYW5nZSAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3MgPSBcInRyYW5zaXRpb25cIjtcblxuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCB3aGVuIGNhcm91c2VsIGF1dG8gcGxheSxcbiAgICogdGhpcyBkZWZhdWx0IGF1dG9wbGF5IGFuaW1hdGlvbiBpcyBzYW1lIGFzIGFuaUNsYXNzXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYW5pQ2xhc3NBdXRvID0gdGhpcy5hbmlDbGFzcztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoXCJzaG93LW5leHQtcHJldi1idXR0b25zXCIpIHB1YmxpYyBzaG93QnV0dG9uc01ldGhvZDpcbiAgICB8IFwiYWx3YXlzXCJcbiAgICB8IFwiYXV0by1oaWRlXCJcbiAgICB8IFwiYXV0by1kaXNhYmxlXCIgPSBcImFsd2F5c1wiO1xuXG4gIC8qKlxuICAgKiB1c2VyIG1vdmUgcGljdHVyZSB3aXRoIHRoZSBjb250YWluZXIgd2lkdGggcmF0ZSxcbiAgICogd2hlbiBtb3JlIHRoYW4gdGhhdCByYXRlLCBpdCB3aWxsIGdvIHRvIG5leHQgb3IgcHJldixcbiAgICogc2V0IGZhbHNlIHdpbGwgbmV2ZXIgbW92ZSB3aXRoIGRpc3RhbmNlIHJhdGUsXG4gICAqIGRlZmF1bHQgaXMgYDAuMTVgXG4gICAqL1xuICBASW5wdXQoXCJwYW4tYm91bmRhcnlcIikgcHVibGljIHBhbkJvdW5kYXJ5OiBudW1iZXIgfCBmYWxzZSA9IDAuMTU7XG5cbiAgLyoqIHdoZW4gc2hvdy1udW0gaXMgYmlnZ2VyIHRoYW4gMSwgdGhlIGZpcnN0IGl0ZW0gYWxpZ24sIGRlZmF1bHRlIGlzIGBjZW50ZXJgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbGlnbjogXCJsZWZ0XCIgfCBcImNlbnRlclwiIHwgXCJyaWdodFwiID0gXCJjZW50ZXJcIjtcblxuICAvKipcbiAgICogZGlzYWJsZSB3aGVuIGRyYWcgb2NjdXIgdGhlIGNoaWxkIGVsZW1lbnQgd2lsbCBmb2xsb3cgdG91Y2ggcG9pbnQuXG4gICAqIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KFwibm90LWZvbGxvdy1wYW5cIikgcHVibGljIG5vdERyYWcgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwdWJsaWMgdHJhY2tCeUtleSA9IFwiY29kZVwiO1xuICAvKipcbiAgICogdGhlIGV2ZW50IGJpbmRpbmcgc3RhdGUgZm9yIHN0b3AgYXV0byBwbGF5IHdoZW4gbW91cnNlIG1vdmVvdmVyXG4gICAqL1xuICBASW5wdXQoXCJtb3Vyc2UtZW5hYmxlXCIpIHB1YmxpYyBtb3Vyc2VFbmFibGUgPSBmYWxzZTtcbiAgLyoqIGVhY2ggYXV0byBwbGF5IGJldHdlZW4gdGltZSAqL1xuICBASW5wdXQoXCJiZXR3ZWVuLWRlbGF5XCIpIHB1YmxpYyBkZWxheSA9IDgwMDA7XG4gIC8qKiBhdXRvIHBsYXkgZGlyZWN0aW9uLCBkZWZhdWx0IGlzIGByaWdodGAuICovXG4gIEBJbnB1dChcImF1dG9wbGF5LWRpcmVjdGlvblwiKSBwdWJsaWMgZGlyZWN0aW9uOiBcImxlZnRcIiB8IFwicmlnaHRcIiA9IFwicmlnaHRcIjtcbiAgLyoqIGhvdyBtYW55IG51bWJlciB3aXRoIGVhY2ggc2Nyb2xsLCBkZWZhdWx0IGlzIGAxYC4gKi9cbiAgQElucHV0KFwic2Nyb2xsLW51bVwiKSBwdWJsaWMgc2Nyb2xsTnVtID0gMTtcbiAgLyoqIENvdWxkIHVzZXIgc2Nyb2xsIG1hbnkgaXRlbSBvbmNlLCBzaW11bGF0ZSB3aXRoIHNjcm9sbGJhciwgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRyYWctbWFueVwiKSBwdWJsaWMgaXNEcmFnTWFueSA9IGZhbHNlO1xuICAvKiogTWluaW1hbCB2ZWxvY2l0eSByZXF1aXJlZCBiZWZvcmUgcmVjb2duaXppbmcsIHVuaXQgaXMgaW4gcHggcGVyIG1zLCBkZWZhdWx0IGAwLjNgICovXG4gIEBJbnB1dChcInN3aXBlLXZlbG9jaXR5XCIpIHB1YmxpYyBzd2lwZVZlbG9jaXR5ID0gMC4zO1xuXG4gIC8qKlxuICAgKiBzd2l0Y2ggc2hvdyBudW1iZXIgd2l0aCBjdXN0b20gbG9naWMgbGlrZSBjc3MgQG1lZGlhIChtaW4td2lkdGg6IGBudW1iZXJgcHgpXG4gICAqL1xuICBASW5wdXQoKSBwdWJsaWMgYnJlYWtwb2ludDogQXJyYXk8e1xuICAgIGdyaWRCeT87XG4gICAgc2NyZWVuU2l6ZTogXCJ4eGxcIiB8IFwieGxcIiB8IFwibGdcIiB8IFwibWRcIiB8IFwic21cIiB8IFwieHNcIjtcbiAgICBudW1iZXI7XG4gICAgc2Nyb2xsTnVtPztcbiAgfT4gPSBbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2NyZWVuU2l6ZU1hcCA9IHtcbiAgICB4eGw6IDE0NDAsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcbiAgICB4bDogMTIwMCxcbiAgICBsZzogOTkyLFxuICAgIG1kOiA3NjgsXG4gICAgc206IDU3NixcbiAgICB4czogMCxcbiAgfTtcblxuICBASW5wdXQoKSBwYWRkaW5nOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBsZWF2ZU9icyQgPSBtZXJnZShcbiAgICBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIFwibW91c2V1cFwiKSxcbiAgICBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsIFwidG91Y2hlbmRcIilcbiAgKS5waXBlKFxuICAgIHRhcCgoZTogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ3JhYmJpbmcgPSBmYWxzZTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcblxuICBwcml2YXRlIGlzRnJvbUF1dG8gPSB0cnVlO1xuICBwcml2YXRlIGlzQXV0b051bSA9IGZhbHNlO1xuICBwcml2YXRlIG1vdXNlT25Db250YWluZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBhbGlnbkRpc3RhbmNlID0gMDtcbiAgcHJpdmF0ZSBlbG1XaWR0aCA9IDA7XG5cbiAgcHJpdmF0ZSByb290RWxtOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJFbG06IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgZWxtczogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgaGFtbWVyO1xuXG4gIHByaXZhdGUgZG9OZXh0U3ViJDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRvTmV4dDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIHByaXZhdGUgcmVzdGFydCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgcHJpdmF0ZSBzcGVlZENoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoNTAwMCk7XG4gIHByaXZhdGUgc3RvcEV2ZW50ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX3BvcmdyZXNzV2lkdGggPSAwO1xuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuICBwdWJsaWMgX3Nob3dOdW0gPSAxO1xuICBwcml2YXRlIF9hdXRvcGxheSA9IGZhbHNlO1xuICBwcml2YXRlIF9pbmZpbml0ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9ncmFiYmluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlRHJhZyA9IGZhbHNlO1xuICBwdWJsaWMgZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuXG4gIHByaXZhdGUgcGFuQ291bnQgPSAwO1xuXG4gIC8vIHRoaXMgdmFyaWFibGUgdXNlIGZvciBjaGVjayB0aGUgaW5pdCB2YWx1ZSBpcyB3cml0ZSB3aXRoIG5nTW9kZWwsXG4gIC8vIHdoZW4gaW5pdCBmaXJzdCwgbm90IHNldCB3aXRoIGFuaW1hdGlvblxuXG4gIHB1YmxpYyByZWFsSW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cbiAgcHVibGljIHdyYXBwZXJXaWR0aDtcblxuICBwdWJsaWMgc2luZ2xlVGltZVJ1biA9IHRydWU7XG4gIHByaXZhdGUgaW5pdGlhbEluZGV4ID0gMDtcbiAgcHVibGljIG9yZ2luYWxEYXRhID0gW107XG5cbiAgcHJpdmF0ZSBfaW5maW5lRGF0YUNvdW50ID0gMDtcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJvb3RFbG0gPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGFpbmVyRWxtID0gdGhpcy5yb290RWxtLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICBmb3JrSm9pbihbXG4gICAgICAuLi50aGlzLmJpbmRDbGljaygpLFxuICAgICAgLy8gd2hlbiBpdGVtIGNoYW5nZWQsIHJlbW92ZSBvbGQgaGFtbWVyIGJpbmRpbmcsIGFuZCByZXNldCB3aWR0aFxuICAgICAgdGhpcy5pdGVtRWxtcy5jaGFuZ2VzLnBpcGUoXG4gICAgICAgIC8vIGRldGVjdENoYW5nZXMgdG8gY2hhbmdlIHZpZXcgZG90c1xuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgLy8gaSBjYW4ndCBwYXNzIHRoZSBjaGFuZ2VkZXRlY3Rpb24gY2hlY2ssIG9ubHkgdGhlIHdheSB0byB1c2luZyB0aW1lb3V0LiA6KFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDA7XG4gICAgICAgIH0pLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpKVxuICAgICAgKSxcbiAgICAgIHJlc2l6ZU9ic2VydmFibGUodGhpcy5yb290RWxtLCAoKSA9PiB0aGlzLmNvbnRhaW5lclJlc2l6ZSgpKSxcbiAgICBdKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG4gIHByaXZhdGUgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5pbml0VmFyaWFibGUoKTtcbiAgICB0aGlzLnNldFZpZXdXaWR0aCh0cnVlKTtcbiAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlRHJhZykge1xuICAgICAgdGhpcy5oYW1tZXIgPSB0aGlzLmJpbmRIYW1tZXIoKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGFydEluZGV4O1xuICAgIC8qIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMucnVuTG9vcCkge1xuICAgICAgdGhpcy5hZGRJbmZpbml0ZUVsbSgpO1xuICAgIH0gKi9cbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcblxuICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLmRvTmV4dFN1YiQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3RvcnlIYW1tZXIoKSB7XG4gICAgaWYgKHRoaXMuaGFtbWVyKSB7XG4gICAgICB0aGlzLmhhbW1lci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb250YWluZXJSZXNpemUoKSB7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgoKTtcbiAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLnN0YXJ0SW5kZXggfHwgdGhpcy5pbml0aWFsSW5kZXg7XG5cbiAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRWYXJpYWJsZSgpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuZWxtcyA9IHRoaXMuaXRlbUVsbXMudG9BcnJheSgpLm1hcCgoeCkgPT4geC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgbGV0IHN0YXJ0RXZlbnQgPSB0aGlzLnJlc3RhcnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICBsZXQgc3RvcEV2ZW50ID0gdGhpcy5zdG9wRXZlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgICBpZiAodGhpcy5tb3Vyc2VFbmFibGUpIHtcbiAgICAgICAgc3RhcnRFdmVudCA9IG1lcmdlKFxuICAgICAgICAgIHN0YXJ0RXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlbGVhdmVcIikucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5ncmFiYmluZyksXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IGZhbHNlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHN0b3BFdmVudCA9IG1lcmdlKFxuICAgICAgICAgIHN0b3BFdmVudCxcbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5jb250YWluZXJFbG0sIFwibW91c2VvdmVyXCIpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IHRydWUpKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kb05leHQgPSBzdGFydEV2ZW50LnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnNwZWVkQ2hhbmdlKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgdGltZXIodGhpcy5kZWxheSkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnJ1blByb2dyZXNzKDIwKSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzRnJvbUF1dG8gPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFrZVVudGlsKHN0b3BFdmVudC5waXBlKHRhcCgoKSA9PiAodGhpcy5wcm9ncmVzc1dpZHRoID0gMCkpKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZVNldEFsaWduRGlzdGFuY2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9ICh0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMuZWxtV2lkdGgpIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSB0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMuZWxtV2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld1dpZHRoKGlzSW5pdD86IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5pc0F1dG9OdW0pIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSB0aGlzLmdldEF1dG9OdW0oKTtcbiAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5fc2hvd051bTtcbiAgICB9XG4gICAgdGhpcy5faW5maW5lRGF0YUNvdW50ID0gdGhpcy5fc2hvd051bSAqIDI7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYlwiKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5lbG1XaWR0aCA9XG4gICAgICB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkuY29sKSAtXG4gICAgICAodGhpcy5wYWRkaW5nICogMikgL1xuICAgICAgICAodGhpcy5ncmlkQnkuY29sID4gMVxuICAgICAgICAgID8gdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgOiB0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkucm93KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbC1kaXNwbGF5LW5vd3JhcFwiXG4gICAgKTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxtV2lkdGggPVxuICAgICAgKHRoaXMuZWxtV2lkdGggLyB0aGlzLmdyaWRCeS5jb2wpICogdGhpcy5lbG1zLmxlbmd0aDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgdGhpcy52aWV3QXJlYS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIGB3aWR0aDoke1xuICAgICAgICAgICh0aGlzLnJvb3RFbG1XaWR0aCAqIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sKSAvXG4gICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICB0aGlzLnBhZGRpbmcgKiAyXG4gICAgICAgIH1weGBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmVsbXMuZm9yRWFjaCgoZWxtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdHlsZShlbG0sIFwid2lkdGhcIiwgdGhpcy5lbG1XaWR0aCk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kSGFtbWVyKCkge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGhtID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuY29udGFpbmVyRWxtKTtcblxuICAgICAgY29uc3QgcGFuID0gbmV3IEhhbW1lci5QYW4oe1xuICAgICAgICBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgfSk7XG5cbiAgICAgIGhtLmFkZChwYW4pO1xuXG4gICAgICBobS5vbihcInBhbmxlZnQgcGFucmlnaHQgcGFuZW5kIHBhbmNhbmNlbFwiLCAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhPbmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwicGFubGVmdFwiOlxuICAgICAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICAgICAgdGhpcy5wYW5Db3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucGFuQ291bnQgPCAyKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5ncmFiYmluZyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGlnbiAhPT0gXCJjZW50ZXJcIiAmJiB0aGlzLnNob3dOdW0gPj0gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiB0aGlzLm91dE9mQm91bmQoZS50eXBlKSkge1xuICAgICAgICAgICAgICBlLmRlbHRhWCAqPSAwLjI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ub3REcmFnKSB7XG4gICAgICAgICAgICAgIHRoaXMubGVmdCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuY3VycmVudEluZGV4ICogdGhpcy5lbG1XaWR0aCArXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlICtcbiAgICAgICAgICAgICAgICBlLmRlbHRhWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ01hbnkpIHtcbiAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGUuZGVsdGFYKSA+IHRoaXMuZWxtV2lkdGggKiAwLjUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kZWx0YVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGFuY2FuY2VsXCI6XG4gICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBcInBhbmVuZFwiOlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLnBhbkJvdW5kYXJ5ICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICBNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogdGhpcy5wYW5Cb3VuZGFyeVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdmVOdW0gPSB0aGlzLmlzRHJhZ01hbnlcbiAgICAgICAgICAgICAgICA/IE1hdGguY2VpbChNYXRoLmFicyhlLmRlbHRhWCkgLyB0aGlzLmVsbVdpZHRoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxOdW07XG5cbiAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSBtb3ZlTnVtO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleCArIG1vdmVOdW07XG5cbiAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHByZXZJbmRleCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb05leHQobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPCAtdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvTmV4dCh0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPiB0aGlzLnN3aXBlVmVsb2NpdHkgJiYgZS5kaXN0YW5jZSA+IDEwKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ29QcmV2KHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBobTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ29QcmV2KHByZXZJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgcHJldkluZGV4IDwgMCkge1xuICAgICAgcHJldkluZGV4ID0gMDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcoMCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gcHJldkluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnb05leHQobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiBuZXh0SW5kZXggPiB0aGlzLm1heFJpZ2h0SW5kZXgpIHtcbiAgICAgIG5leHRJbmRleCA9IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIHRoaXMuZHJhd1ZpZXcobmV4dEluZGV4KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXh0SW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGJpbmRDbGljaygpIHtcbiAgICBpZiAodGhpcy5idG5OZXh0ICYmIHRoaXMuYnRuUHJldikge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuYnRuTmV4dC5uYXRpdmVFbGVtZW50LCBcImNsaWNrXCIpLnBpcGUoXG4gICAgICAgICAgbWFwKCgpID0+ICh0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bSkpXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0blByZXYubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFJlc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMubW91c2VPbkNvbnRhaW5lciAmJiAhdGhpcy5ncmFiYmluZykge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzdGFydC5uZXh0KG51bGwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3VmlldyhcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGlzQW5pbWF0aW9uID0gdHJ1ZSxcbiAgICBpc0Zyb21BdXRvID0gdGhpcy5pc0Zyb21BdXRvXG4gICkge1xuICAgIGlmICh0aGlzLmVsbXMubGVuZ3RoID4gMSAmJiB0aGlzLmVsbXMubGVuZ3RoID4gdGhpcy5fc2hvd051bSkge1xuICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG4gICAgICB0aGlzLmxlZnQgPSAtKGluZGV4ICogdGhpcy5lbG1XaWR0aCAtIHRoaXMuYWxpZ25EaXN0YW5jZSk7XG5cbiAgICAgIGlmIChpc0FuaW1hdGlvbikge1xuICAgICAgICBpZiAoaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVmdCA9IHRoaXMuYWxpZ25EaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gIH1cblxuICBwcml2YXRlIG91dE9mQm91bmQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubWF4UmlnaHRJbmRleDtcbiAgICAgIGNhc2UgXCJwYW5yaWdodFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXggPD0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1blByb2dyZXNzKGJldHdlZW5UaW1lKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBob3dUaW1lcyA9IHRoaXMuc3BlZWQgLyBiZXR3ZWVuVGltZTtcbiAgICAgIGNvbnN0IGV2ZXJ5SW5jcmVhc2UgPSAoMTAwIC8gdGhpcy5zcGVlZCkgKiBiZXR3ZWVuVGltZTtcbiAgICAgIHJldHVybiBpbnRlcnZhbChiZXR3ZWVuVGltZSkucGlwZShcbiAgICAgICAgdGFwKCh0KSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gKHQgJSBob3dUaW1lcykgKiBldmVyeUluY3JlYXNlO1xuICAgICAgICB9KSxcbiAgICAgICAgYnVmZmVyQ291bnQoTWF0aC5yb3VuZChob3dUaW1lcyksIDApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdERhdGEoc2hvd051bSkge1xuICAgIGlmICghdGhpcy5vcmdpbmFsRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub3JnaW5hbERhdGEgPSBbLi4udGhpcy5kYXRhXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgdGhpcy5zaW5nbGVUaW1lUnVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5Q3JlYXRvcih0aGlzLm9yZ2luYWxEYXRhLCBzaG93TnVtKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHNob3dOdW07XG4gICAgICB0aGlzLmluaXRpYWxJbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0b051bSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aDtcbiAgICBpZiAodGhpcy5icmVha3BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMuYnJlYWtwb2ludC5maW5kKChiKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVNYXBbYi5zY3JlZW5TaXplXSA8PSBjdXJyV2lkdGg7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3cpIHtcbiAgICAgICAgaWYgKG5vdy5ncmlkQnkpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5ncmlkQnkuY29sIHx8IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IG5vdy5ncmlkQnk7XG4gICAgICAgICAgY29uc3Qgc2hvd051bSA9IG5vdy5ncmlkQnkuY29sICogbm93LmdyaWRCeS5yb3cgfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgICByZXR1cm4gbm93Lm51bWJlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5O1xuICAgICAgICBjb25zdCBzaG93TnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgKlxuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkucm93IHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdE51bSA9IDM7XG4gICAgaWYgKGN1cnJXaWR0aCA+IDIwMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaW5pdE51bSArIGN1cnJXaWR0aCAvIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXROdW07XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9JWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5RmNuKGluZGV4LCBpdGVtKSB7XG4gICAgaWYgKCFpdGVtIHx8IGl0ZW1bdGhpcy50cmFja0J5S2V5XSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtW3RoaXMudHJhY2tCeUtleV07XG4gIH1cblxuICBwdWJsaWMgYXJyYXlDcmVhdG9yKGFyciwgY291bnQpIHtcbiAgICBjb25zdCBkYXRhID0gWy4uLmFycl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBkYXRhLnVuc2hpZnQoYXJyW2Fyci5sZW5ndGggLSAxIC0gKGkgJSBhcnIubGVuZ3RoKV0pO1xuICAgICAgZGF0YS5wdXNoKGFycltpICUgYXJyLmxlbmd0aF0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19