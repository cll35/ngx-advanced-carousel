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
            if (!this.runLoop && !(0 <= value && value <= this.itemElms.length - 1)) {
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
        this.currentIndex = this.initialIndex;
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
                template: "<div class=\"carousel-container\">\n  <!-- main content -->\n  <div #containerElm class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        [ngStyle]=\"{\n          display: i % (scrollNum * gridBy.row) === 0 ? '' : 'none'\n        }\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0) || infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0) || infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length &&\n        _showNum < data.length) || infinite\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        _showNum < data.length - 1) || infinite\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li *ngIf=\"i % (scrollNum * gridBy.row) === 0\" (click)=\"currentIndex = i\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQXdSdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFD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b0Q7Ozs7O0lBRXBELDZDQUE0Qzs7Ozs7SUFFNUMsaURBQTBFOzs7OztJQUUxRSxpREFBMEM7Ozs7O0lBRTFDLGtEQUE4Qzs7Ozs7SUFFOUMscURBQW9EOzs7OztJQUtwRCxrREFLUTs7SUFFUixxREFRRTs7SUFFRiwrQ0FBNkI7O0lBRTdCLGlEQVNFOzs7OztJQUVGLGtEQUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQix3REFBaUM7Ozs7O0lBQ2pDLHFEQUEwQjs7Ozs7SUFDMUIsZ0RBQXFCOzs7OztJQUVyQiwrQ0FBNkI7Ozs7O0lBQzdCLG9EQUFrQzs7Ozs7SUFFbEMsNENBQWlDOzs7OztJQUVqQyw4Q0FBZTs7Ozs7SUFFZixrREFBaUM7Ozs7O0lBQ2pDLDhDQUFnQzs7Ozs7SUFFaEMsK0NBQWlEOzs7OztJQUNqRCxtREFBZ0Q7Ozs7O0lBQ2hELGlEQUF1Qzs7Ozs7SUFDdkMsZ0RBQXNDOzs7OztJQUV0QyxzREFBMkI7Ozs7O0lBQzNCLHFEQUEwQjs7SUFDMUIsZ0RBQW9COzs7OztJQUNwQixpREFBMEI7Ozs7O0lBQzFCLGlEQUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQixvREFBNkI7O0lBQzdCLDhDQUFtQzs7Ozs7SUFFbkMsZ0RBQXFCOztJQUtyQixpREFBc0M7O0lBRXRDLG9EQUFvQjs7SUFFcEIscURBQTRCOzs7OztJQUM1QixvREFBeUI7O0lBQ3pCLG1EQUF3Qjs7Ozs7SUFFeEIsd0RBQTZCOzs7OztJQWlEN0IsZ0RBQWtDOzs7OztJQUNsQyxpREFBNkI7Ozs7O0lBbE4zQixrREFBNEM7Ozs7O0lBQzVDLGlEQUFtQzs7Ozs7SUFDbkMsaURBQTRCOzs7OztJQUM1Qiw2Q0FBcUI7Ozs7O0lBQ3JCLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBmcm9tRXZlbnQsXG4gIGludGVydmFsLFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBidWZmZXJDb3VudCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgTmd4QWR2YW5jZWRDYXJvdXNlbEl0ZW1EaXJlY3RpdmUgfSBmcm9tIFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtaXRlbS5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IHJlc2l6ZU9ic2VydmFibGUgfSBmcm9tIFwiLi9yeGpzLm9ic2VydmFibGUucmVzaXplXCI7XG5kZWNsYXJlIHZhciBIYW1tZXI7XG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6IFwibmd4LWFkdmFuY2VkLWNhcm91c2VsXCIsXG4gIHN0eWxlVXJsczogW1wiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG4gIC8qKiBkaXNhYmxlIGRyYWcgZXZlbnQgd2l0aCB0b3VjaCBhbmQgbW91c2UgcGFuIG1vdmluZywgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dChcImRpc2FibGUtZHJhZ1wiKVxuICBwdWJsaWMgZ2V0IGRpc2FibGVEcmFnKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlRHJhZztcbiAgfVxuICBwdWJsaWMgc2V0IGRpc2FibGVEcmFnKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVEcmFnICE9PSB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVEcmFnID0gdmFsdWU7XG4gIH1cblxuICAvKiogaXMgdGhlIGNhcm91c2VsIGNhbiBtb3ZlIGluZmluaXRlICovXG4gIEBJbnB1dChcImluZmluaXRlXCIpXG4gIHB1YmxpYyBnZXQgaW5maW5pdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZmluaXRlO1xuICB9XG4gIHB1YmxpYyBzZXQgaW5maW5pdGUodmFsdWUpIHtcbiAgICB0aGlzLl9pbmZpbml0ZSA9IHZhbHVlO1xuXG4gICAgLyogdGhpcy5pbmZpbml0ZUVsbVJlZnMuZm9yRWFjaCgocmVmKSA9PiB7XG4gICAgICB0aGlzLmFkZFN0eWxlKHJlZi5yb290Tm9kZXNbMF0sIHtcbiAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5ydW5Mb29wID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG4gICAgICB9KTtcbiAgICB9KTsgKi9cbiAgfVxuXG4gIC8qKiBhdXRvIHBsYXkgc3BlZWQgKi9cbiAgQElucHV0KFwiYXV0b3BsYXktc3BlZWRcIilcbiAgcHVibGljIGdldCBzcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGVlZENoYW5nZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhvdyBtYW55IG51bWJlciBpdGVtcyB0byBzaG93IG9uY2UsIGRlZmF1bHQgaXMgYDFgXG4gICAqIHNldCBgYXV0b2AgdG8gdXNpbmcgYFticmVha3BvaW50XWAgc2V0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KFwic2hvdy1udW1cIilcbiAgcHVibGljIGdldCBzaG93TnVtKCk6IG51bWJlciB8IFwiYXV0b1wiIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd051bTtcbiAgfVxuICBwdWJsaWMgc2V0IHNob3dOdW0odmFsdWU6IG51bWJlciB8IFwiYXV0b1wiKSB7XG4gICAgaWYgKHZhbHVlID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5pc0F1dG9OdW0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gK3ZhbHVlO1xuICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLl9zaG93TnVtO1xuICAgICAgaWYgKHRoaXMucm9vdEVsbSkge1xuICAgICAgICB0aGlzLnNldFZpZXdXaWR0aCgpO1xuICAgICAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBjYXJvdXNlbCBhdXRvIHBsYXkgY29uZmluZyAqL1xuICBASW5wdXQoXCJhdXRvcGxheVwiKVxuICBwdWJsaWMgZ2V0IGF1dG9wbGF5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdXRvcGxheTtcbiAgfVxuICBwdWJsaWMgc2V0IGF1dG9wbGF5KHZhbHVlKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5kb05leHRTdWIkKSB7XG4gICAgICAgICAgICB0aGlzLmRvTmV4dFN1YiQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYXV0b3BsYXkgPSB2YWx1ZTtcbiAgICAvLyBpZiBzZXQgYXV0b3BsYXksIHRoZW4gdGhlIGluZmluaXRlIGlzIHRydWVcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW5maW5pdGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgY3VycmVudEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XG4gIH1cbiAgcHVibGljIHNldCBjdXJyZW50SW5kZXgodmFsdWUpIHtcbiAgICAvLyBpZiBub3cgaW5kZXggaWYgbm90IGVxdWFsZSB0byBzYXZlIGluZGV4LCBkbyBzb21ldGluZ1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBub3QgY29udGFpbiB3aXRoIHRoZSBib3VuZGFyeSBub3QgaGFuZGxlcndcbiAgICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgISgwIDw9IHZhbHVlICYmIHZhbHVlIDw9IHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5lbG1zKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLmlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgdGhpcy5ncmlkQnkuY29sICogdGhpcy5ncmlkQnkucm93ID4gMVxuICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIGlmICghdGhpcy5pbmZpbml0ZSAmJiB0aGlzLnJlYWxJbmRleCA+IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZWxtcy5sZW5ndGg7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbCA8XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMucmVhbEluZGV4IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gLVxuICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2w7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgICAgIHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtIDwgMFxuICAgICAgICAgICAgICAgID8gMFxuICAgICAgICAgICAgICAgIDogdGhpcy5lbG1zLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9XG4gICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPCAwICYmICF0aGlzLmluZmluaXRlID8gMCA6IHRoaXMuY3VycmVudEluZGV4O1xuICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmluaXRpYWxJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gKiA0ICsgdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IHRoaXMuZGF0YS5sZW5ndGggLSB0aGlzLl9zaG93TnVtICogMikge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLSB0aGlzLmRhdGEubGVuZ3RoICsgdGhpcy5fc2hvd051bSAqIDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGltZXIodGhpcy5hbmlUaW1lICsgMTAwKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgKHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGNvdW50ID0gKHRoaXMucmVhbEluZGV4IC0gdGhpcy5lbG1zLmxlbmd0aCkgJSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCAtPSBjb3VudDtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIDAgPD0gdGhpcy5jdXJyZW50SW5kZXggJiZcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNGcm9tQXV0byA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9ncmVzc1dpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3JncmVzc1dpZHRoO1xuICB9XG4gIHB1YmxpYyBzZXQgcHJvZ3Jlc3NXaWR0aCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnByb2dyZXNzRWxtICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5fcG9yZ3Jlc3NXaWR0aCA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICh0aGlzLnByb2dyZXNzQ29udGFpbmVyRWxtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkcmVuWzBdLFxuICAgICAgICBcIndpZHRoXCIsXG4gICAgICAgIGAke3RoaXMucHJvZ3Jlc3NXaWR0aH0lYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdyYWJiaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9ncmFiYmluZztcbiAgfVxuICBwdWJsaWMgc2V0IGdyYWJiaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2dyYWJiaW5nICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9ncmFiYmluZyA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhbkNvdW50ID0gMDtcbiAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIFwiZ3JhYmJpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZVgoJHt2YWx1ZSArIHRoaXMuY3VycmVudEluZGV4ICE9PSAwID8gdGhpcy5wYWRkaW5nIDogMH1weClgXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGVYKCR7dmFsdWV9JSlgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1heFJpZ2h0SW5kZXgoKSB7XG4gICAgbGV0IGFkZEluZGV4ID0gMDtcbiAgICBzd2l0Y2ggKHRoaXMuYWxpZ24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY2VudGVyXCI6XG4gICAgICAgIGFkZEluZGV4ID0gKHRoaXMuc2hvd051bSBhcyBudW1iZXIpIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAodGhpcy5zaG93TnVtIGFzIG51bWJlcikgLSAxO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoIC0gMSAtIHRoaXMuX3Nob3dOdW0gKyAxICsgYWRkSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIGdldCBydW5Mb29wKCkge1xuICAgIHJldHVybiB0aGlzLmF1dG9wbGF5IHx8IHRoaXMuaW5maW5pdGU7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgbGVuZ3RoT25lKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1FbG1zLmxlbmd0aCA9PT0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJvb3RFbG1XaWR0aCgpIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKVxuICAgICAgPyB0aGlzLnJvb3RFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgIDogMTAwO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQgY29udGFpbmVyRWxtV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sIFwid2lkdGhcIiwgdmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lckVsbVwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbihcInZpZXdBcmVhXCIpIHB1YmxpYyB2aWV3QXJlYTogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKFwicHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGJ0blByZXY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJuZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuTmV4dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcInByb2dyZXNzXCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NDb250YWluZXJFbG06IEVsZW1lbnRSZWY7XG5cbiAgLy8gZ2V0IGFsbCBpdGVtIGVsbXNcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSwge1xuICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICAgIHJlYWQ6IEVsZW1lbnRSZWYsXG4gIH0pXG4gIHB1YmxpYyBpdGVtRWxtczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbFByZXZcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjb250ZW50UHJldjogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsTmV4dFwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnROZXh0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxEb3RcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBkb3RFbG06IFRlbXBsYXRlUmVmPFxuICAgIGFueVxuICA+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxJdGVtVGVtcGxhdGVcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBjYXJvdXNlbEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0VsbTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwdWJsaWMgX2RhdGE6IGFueVtdO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgbWFwcGVkRGF0YTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIHdoZW4gaW5maW5pdGUgaXMgdHJ1ZSwgdGhlIGFuaW1hdGlvbiB0aW1lIHdpdGggaXRlbSwgZGVmYXVsdCBpcyA0MDAuICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlUaW1lID0gNDAwO1xuICAvKiogdGhpcyBjbGFzcyB3aWxsIGFkZCBpbiAjY29udGFpbmVyRWxtIHdoZW4gbW9kZWwgY2hhbmdlICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzcyA9IFwidHJhbnNpdGlvblwiO1xuXG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIHdoZW4gY2Fyb3VzZWwgYXV0byBwbGF5LFxuICAgKiB0aGlzIGRlZmF1bHQgYXV0b3BsYXkgYW5pbWF0aW9uIGlzIHNhbWUgYXMgYW5pQ2xhc3NcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzc0F1dG8gPSB0aGlzLmFuaUNsYXNzO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dChcInNob3ctbmV4dC1wcmV2LWJ1dHRvbnNcIikgcHVibGljIHNob3dCdXR0b25zTWV0aG9kOlxuICAgIHwgXCJhbHdheXNcIlxuICAgIHwgXCJhdXRvLWhpZGVcIlxuICAgIHwgXCJhdXRvLWRpc2FibGVcIiA9IFwiYWx3YXlzXCI7XG5cbiAgLyoqXG4gICAqIHVzZXIgbW92ZSBwaWN0dXJlIHdpdGggdGhlIGNvbnRhaW5lciB3aWR0aCByYXRlLFxuICAgKiB3aGVuIG1vcmUgdGhhbiB0aGF0IHJhdGUsIGl0IHdpbGwgZ28gdG8gbmV4dCBvciBwcmV2LFxuICAgKiBzZXQgZmFsc2Ugd2lsbCBuZXZlciBtb3ZlIHdpdGggZGlzdGFuY2UgcmF0ZSxcbiAgICogZGVmYXVsdCBpcyBgMC4xNWBcbiAgICovXG4gIEBJbnB1dChcInBhbi1ib3VuZGFyeVwiKSBwdWJsaWMgcGFuQm91bmRhcnk6IG51bWJlciB8IGZhbHNlID0gMC4xNTtcblxuICAvKiogd2hlbiBzaG93LW51bSBpcyBiaWdnZXIgdGhhbiAxLCB0aGUgZmlyc3QgaXRlbSBhbGlnbiwgZGVmYXVsdGUgaXMgYGNlbnRlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIGFsaWduOiBcImxlZnRcIiB8IFwiY2VudGVyXCIgfCBcInJpZ2h0XCIgPSBcImNlbnRlclwiO1xuXG4gIC8qKlxuICAgKiBkaXNhYmxlIHdoZW4gZHJhZyBvY2N1ciB0aGUgY2hpbGQgZWxlbWVudCB3aWxsIGZvbGxvdyB0b3VjaCBwb2ludC5cbiAgICogZGVmYXVsdCBpcyBgZmFsc2VgXG4gICAqL1xuICBASW5wdXQoXCJub3QtZm9sbG93LXBhblwiKSBwdWJsaWMgbm90RHJhZyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB0cmFja0J5S2V5ID0gXCJjb2RlXCI7XG4gIC8qKlxuICAgKiB0aGUgZXZlbnQgYmluZGluZyBzdGF0ZSBmb3Igc3RvcCBhdXRvIHBsYXkgd2hlbiBtb3Vyc2UgbW92ZW92ZXJcbiAgICovXG4gIEBJbnB1dChcIm1vdXJzZS1lbmFibGVcIikgcHVibGljIG1vdXJzZUVuYWJsZSA9IGZhbHNlO1xuICAvKiogZWFjaCBhdXRvIHBsYXkgYmV0d2VlbiB0aW1lICovXG4gIEBJbnB1dChcImJldHdlZW4tZGVsYXlcIikgcHVibGljIGRlbGF5ID0gODAwMDtcbiAgLyoqIGF1dG8gcGxheSBkaXJlY3Rpb24sIGRlZmF1bHQgaXMgYHJpZ2h0YC4gKi9cbiAgQElucHV0KFwiYXV0b3BsYXktZGlyZWN0aW9uXCIpIHB1YmxpYyBkaXJlY3Rpb246IFwibGVmdFwiIHwgXCJyaWdodFwiID0gXCJyaWdodFwiO1xuICAvKiogaG93IG1hbnkgbnVtYmVyIHdpdGggZWFjaCBzY3JvbGwsIGRlZmF1bHQgaXMgYDFgLiAqL1xuICBASW5wdXQoXCJzY3JvbGwtbnVtXCIpIHB1YmxpYyBzY3JvbGxOdW0gPSAxO1xuICAvKiogQ291bGQgdXNlciBzY3JvbGwgbWFueSBpdGVtIG9uY2UsIHNpbXVsYXRlIHdpdGggc2Nyb2xsYmFyLCBkZWZhdWx0IGlzIGBmYWxzZWAgKi9cbiAgQElucHV0KFwiZHJhZy1tYW55XCIpIHB1YmxpYyBpc0RyYWdNYW55ID0gZmFsc2U7XG4gIC8qKiBNaW5pbWFsIHZlbG9jaXR5IHJlcXVpcmVkIGJlZm9yZSByZWNvZ25pemluZywgdW5pdCBpcyBpbiBweCBwZXIgbXMsIGRlZmF1bHQgYDAuM2AgKi9cbiAgQElucHV0KFwic3dpcGUtdmVsb2NpdHlcIikgcHVibGljIHN3aXBlVmVsb2NpdHkgPSAwLjM7XG5cbiAgLyoqXG4gICAqIHN3aXRjaCBzaG93IG51bWJlciB3aXRoIGN1c3RvbSBsb2dpYyBsaWtlIGNzcyBAbWVkaWEgKG1pbi13aWR0aDogYG51bWJlcmBweClcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBicmVha3BvaW50OiBBcnJheTx7XG4gICAgZ3JpZEJ5PztcbiAgICBzY3JlZW5TaXplOiBcInh4bFwiIHwgXCJ4bFwiIHwgXCJsZ1wiIHwgXCJtZFwiIHwgXCJzbVwiIHwgXCJ4c1wiO1xuICAgIG51bWJlcjtcbiAgICBzY3JvbGxOdW0/O1xuICB9PiA9IFtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBzY3JlZW5TaXplTWFwID0ge1xuICAgIHh4bDogMTQ0MCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgIHhsOiAxMjAwLFxuICAgIGxnOiA5OTIsXG4gICAgbWQ6IDc2OCxcbiAgICBzbTogNTc2LFxuICAgIHhzOiAwLFxuICB9O1xuXG4gIEBJbnB1dCgpIHBhZGRpbmc6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGxlYXZlT2JzJCA9IG1lcmdlKFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJtb3VzZXVwXCIpLFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJ0b3VjaGVuZFwiKVxuICApLnBpcGUoXG4gICAgdGFwKChlOiBFdmVudCkgPT4ge1xuICAgICAgdGhpcy5ncmFiYmluZyA9IGZhbHNlO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICApO1xuXG4gIHByaXZhdGUgaXNGcm9tQXV0byA9IHRydWU7XG4gIHByaXZhdGUgaXNBdXRvTnVtID0gZmFsc2U7XG4gIHByaXZhdGUgbW91c2VPbkNvbnRhaW5lciA9IGZhbHNlO1xuICBwcml2YXRlIGFsaWduRGlzdGFuY2UgPSAwO1xuICBwcml2YXRlIGVsbVdpZHRoID0gMDtcblxuICBwcml2YXRlIHJvb3RFbG06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGNvbnRhaW5lckVsbTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBlbG1zOiBBcnJheTxIVE1MRWxlbWVudD47XG5cbiAgcHJpdmF0ZSBoYW1tZXI7XG5cbiAgcHJpdmF0ZSBkb05leHRTdWIkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZG9OZXh0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSByZXN0YXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIHNwZWVkQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdCg1MDAwKTtcbiAgcHJpdmF0ZSBzdG9wRXZlbnQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcG9yZ3Jlc3NXaWR0aCA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRJbmRleCA9IDA7XG4gIHB1YmxpYyBfc2hvd051bSA9IDE7XG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgX2luZmluaXRlID0gZmFsc2U7XG4gIHByaXZhdGUgX2dyYWJiaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVEcmFnID0gZmFsc2U7XG4gIHB1YmxpYyBncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG5cbiAgcHJpdmF0ZSBwYW5Db3VudCA9IDA7XG5cbiAgLy8gdGhpcyB2YXJpYWJsZSB1c2UgZm9yIGNoZWNrIHRoZSBpbml0IHZhbHVlIGlzIHdyaXRlIHdpdGggbmdNb2RlbCxcbiAgLy8gd2hlbiBpbml0IGZpcnN0LCBub3Qgc2V0IHdpdGggYW5pbWF0aW9uXG5cbiAgcHVibGljIHJlYWxJbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuICBwdWJsaWMgd3JhcHBlcldpZHRoO1xuXG4gIHB1YmxpYyBzaW5nbGVUaW1lUnVuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpbml0aWFsSW5kZXggPSAwO1xuICBwdWJsaWMgb3JnaW5hbERhdGEgPSBbXTtcblxuICBwcml2YXRlIF9pbmZpbmVEYXRhQ291bnQgPSAwO1xuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucm9vdEVsbSA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbG0gPSB0aGlzLnJvb3RFbG0uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIGZvcmtKb2luKFtcbiAgICAgIC4uLnRoaXMuYmluZENsaWNrKCksXG4gICAgICAvLyB3aGVuIGl0ZW0gY2hhbmdlZCwgcmVtb3ZlIG9sZCBoYW1tZXIgYmluZGluZywgYW5kIHJlc2V0IHdpZHRoXG4gICAgICB0aGlzLml0ZW1FbG1zLmNoYW5nZXMucGlwZShcbiAgICAgICAgLy8gZGV0ZWN0Q2hhbmdlcyB0byBjaGFuZ2UgdmlldyBkb3RzXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyBpIGNhbid0IHBhc3MgdGhlIGNoYW5nZWRldGVjdGlvbiBjaGVjaywgb25seSB0aGUgd2F5IHRvIHVzaW5nIHRpbWVvdXQuIDooXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgfSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCkpXG4gICAgICApLFxuICAgICAgcmVzaXplT2JzZXJ2YWJsZSh0aGlzLnJvb3RFbG0sICgpID0+IHRoaXMuY29udGFpbmVyUmVzaXplKCkpLFxuICAgIF0pXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLmluaXRWYXJpYWJsZSgpO1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKHRydWUpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVEcmFnKSB7XG4gICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgLyogaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5ydW5Mb29wKSB7XG4gICAgICB0aGlzLmFkZEluZmluaXRlRWxtKCk7XG4gICAgfSAqL1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuXG4gICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVzdG9yeUhhbW1lcigpIHtcbiAgICBpZiAodGhpcy5oYW1tZXIpIHtcbiAgICAgIHRoaXMuaGFtbWVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnRhaW5lclJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldFZpZXdXaWR0aCgpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gdGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZpZXdXaWR0aChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gdGhpcy5nZXRBdXRvTnVtKCk7XG4gICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuX3Nob3dOdW07XG4gICAgfVxuICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJcIik7XG4gICAgaWYgKGlzSW5pdCkge1xuICAgICAgLy8gcmVtYWluIG9uZSBlbG0gaGVpZ2h0XG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMuX2luZmluZURhdGFDb3VudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZWxtV2lkdGggPVxuICAgICAgdGhpcy5yb290RWxtV2lkdGggLyAodGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LmNvbCkgLVxuICAgICAgKHRoaXMucGFkZGluZyAqIDIpIC9cbiAgICAgICAgKHRoaXMuZ3JpZEJ5LmNvbCA+IDFcbiAgICAgICAgICA/IHRoaXMuZ3JpZEJ5LmNvbFxuICAgICAgICAgIDogdGhpcy5fc2hvd051bSAvIHRoaXMuZ3JpZEJ5LnJvdyk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtZGlzcGxheS1ub3dyYXBcIlxuICAgICk7XG5cbiAgICB0aGlzLmNvbnRhaW5lckVsbVdpZHRoID1cbiAgICAgICh0aGlzLmVsbVdpZHRoIC8gdGhpcy5ncmlkQnkuY29sKSAqIHRoaXMuZWxtcy5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpO1xuICAgIHRoaXMudmlld0FyZWEuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJzdHlsZVwiLFxuICAgICAgICBgd2lkdGg6JHtcbiAgICAgICAgICAodGhpcy5yb290RWxtV2lkdGggKiB0aGlzLnNjcm9sbE51bSAqIHRoaXMuZ3JpZEJ5LmNvbCkgL1xuICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgdGhpcy5wYWRkaW5nICogMlxuICAgICAgICB9cHhgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbG1zLmZvckVhY2goKGVsbTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoZWxtLCBcIndpZHRoXCIsIHRoaXMuZWxtV2lkdGgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEhhbW1lcigpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBobSA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLmNvbnRhaW5lckVsbSk7XG5cbiAgICAgIGNvbnN0IHBhbiA9IG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBobS5hZGQocGFuKTtcblxuICAgICAgaG0ub24oXCJwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWxcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoT25lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09IFwiY2VudGVyXCIgJiYgdGhpcy5zaG93TnVtID49IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgdGhpcy5vdXRPZkJvdW5kKGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgZS5kZWx0YVggKj0gMC4yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubm90RHJhZykge1xuICAgICAgICAgICAgICB0aGlzLmxlZnQgPVxuICAgICAgICAgICAgICAgIC10aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMuZWxtV2lkdGggK1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgZS5kZWx0YVg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RyYWdNYW55KSB7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogMC41KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhbmNhbmNlbFwiOlxuICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJwYW5lbmRcIjpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoTWF0aC5hYnMoZS5kZWx0YVgpIC8gdGhpcy5lbG1XaWR0aClcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTnVtO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gbW92ZU51bTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggKyBtb3ZlTnVtO1xuXG4gICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAodGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW0pKVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5idG5QcmV2Lm5hdGl2ZUVsZW1lbnQsIFwiY2xpY2tcIikucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGNhbGxSZXN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLm1vdXNlT25Db250YWluZXIgJiYgIXRoaXMuZ3JhYmJpbmcpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3RhcnQubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd1ZpZXcoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBpc0FuaW1hdGlvbiA9IHRydWUsXG4gICAgaXNGcm9tQXV0byA9IHRoaXMuaXNGcm9tQXV0b1xuICApIHtcbiAgICBpZiAodGhpcy5lbG1zLmxlbmd0aCA+IDEgJiYgdGhpcy5lbG1zLmxlbmd0aCA+IHRoaXMuX3Nob3dOdW0pIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5sZWZ0ID0gLShpbmRleCAqIHRoaXMuZWxtV2lkdGggLSB0aGlzLmFsaWduRGlzdGFuY2UpO1xuXG4gICAgICBpZiAoaXNBbmltYXRpb24pIHtcbiAgICAgICAgaWYgKGlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlZnQgPSB0aGlzLmFsaWduRGlzdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvdXRPZkJvdW5kKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJwYW5sZWZ0XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4IDw9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBydW5Qcm9ncmVzcyhiZXR3ZWVuVGltZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG93VGltZXMgPSB0aGlzLnNwZWVkIC8gYmV0d2VlblRpbWU7XG4gICAgICBjb25zdCBldmVyeUluY3JlYXNlID0gKDEwMCAvIHRoaXMuc3BlZWQpICogYmV0d2VlblRpbWU7XG4gICAgICByZXR1cm4gaW50ZXJ2YWwoYmV0d2VlblRpbWUpLnBpcGUoXG4gICAgICAgIHRhcCgodCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9ICh0ICUgaG93VGltZXMpICogZXZlcnlJbmNyZWFzZTtcbiAgICAgICAgfSksXG4gICAgICAgIGJ1ZmZlckNvdW50KE1hdGgucm91bmQoaG93VGltZXMpLCAwKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGluaXREYXRhKHNob3dOdW0pIHtcbiAgICBpZiAoIXRoaXMub3JnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yZ2luYWxEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgIHRoaXMuc2luZ2xlVGltZVJ1biA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheUNyZWF0b3IodGhpcy5vcmdpbmFsRGF0YSwgc2hvd051bSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBzaG93TnVtO1xuICAgICAgdGhpcy5pbml0aWFsSW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEF1dG9OdW0oKSB7XG4gICAgY29uc3QgY3VycldpZHRoID0gdGhpcy5yb290RWxtV2lkdGg7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3cgPSB0aGlzLmJyZWFrcG9pbnQuZmluZCgoYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplTWFwW2Iuc2NyZWVuU2l6ZV0gPD0gY3VycldpZHRoO1xuICAgICAgfSk7XG4gICAgICBpZiAobm93KSB7XG4gICAgICAgIGlmIChub3cuZ3JpZEJ5KSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuZ3JpZEJ5LmNvbCB8fCBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSBub3cuZ3JpZEJ5O1xuICAgICAgICAgIGNvbnN0IHNob3dOdW0gPSBub3cuZ3JpZEJ5LmNvbCAqIG5vdy5ncmlkQnkucm93IHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHNob3dOdW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG4gICAgICAgICAgcmV0dXJuIG5vdy5udW1iZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeSkge1xuICAgICAgICB0aGlzLnNjcm9sbE51bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5zY3JvbGxOdW0gfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgdGhpcy5ncmlkQnkgPSB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeTtcbiAgICAgICAgY29uc3Qgc2hvd051bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sICpcbiAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LnJvdyB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXROdW0gPSAzO1xuICAgIGlmIChjdXJyV2lkdGggPiAyMDApIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGluaXROdW0gKyBjdXJyV2lkdGggLyAxMDApO1xuICAgIH1cblxuICAgIHJldHVybiBpbml0TnVtO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShlbG06IEhUTUxFbGVtZW50LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfSVgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJhY2tCeUZjbihpbmRleCwgaXRlbSkge1xuICAgIGlmICghaXRlbSB8fCBpdGVtW3RoaXMudHJhY2tCeUtleV0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVt0aGlzLnRyYWNrQnlLZXldO1xuICB9XG5cbiAgcHVibGljIGFycmF5Q3JlYXRvcihhcnIsIGNvdW50KSB7XG4gICAgY29uc3QgZGF0YSA9IFsuLi5hcnJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgZGF0YS51bnNoaWZ0KGFyclthcnIubGVuZ3RoIC0gMSAtIChpICUgYXJyLmxlbmd0aCldKTtcbiAgICAgIGRhdGEucHVzaChhcnJbaSAlIGFyci5sZW5ndGhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==