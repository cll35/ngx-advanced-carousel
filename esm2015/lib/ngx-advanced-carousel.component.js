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
            this._renderer.setStyle(this.containerElm, "transform", `translateX(${value}px)`);
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
        (element) => {
            element.nativeElement.setAttribute("style", `width:${(this.rootElmWidth * this.scrollNum * this.gridBy.col) / this._showNum}px`);
        }));
        this.elms.forEach((/**
         * @param {?} elm
         * @return {?}
         */
        (elm) => {
            this.setStyle(elm, "width", this.elmWidth);
        }));
        this._cd.markForCheck();
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
                template: "<div #containerElm class=\"carousel-container\">\n  <!-- main content -->\n  <div class=\"carousel\">\n    <div ngx-advanced-carousel-container class=\"content\">\n      <div\n        class=\"item cursor-pointer visible_important\"\n        ngx-advanced-carousel-item\n        *ngFor=\"let _x of data; let i = index; trackBy: trackByFcn\"\n      >\n        <div\n          class=\"slide\"\n          [ngClass]=\"gridBy.col != 1 || gridBy.row != 1 ? 'flex-wrap' : ''\"\n          #viewArea\n          *ngIf=\"i % (scrollNum * gridBy.row) === 0\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of data | slice: i:i + scrollNum * gridBy.row;\n              let j = index\n            \"\n          >\n            <ng-container\n              *ngTemplateOutlet=\"\n                carouselItemTemplate;\n                context: {\n                  $implicit: item\n                }\n              \"\n            >\n            </ng-container>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- left -->\n  <div\n    #prev\n    *ngIf=\"contentPrev\"\n    class=\"direction left\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' && currentIndex > 0)\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' && currentIndex > 0)\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentPrev\"></ng-container>\n  </div>\n  <!--  right -->\n  <div\n    #next\n    *ngIf=\"contentNext\"\n    class=\"direction right\"\n    [ngClass]=\"[\n      showButtonsMethod !== 'auto-hide' ||\n      (showButtonsMethod === 'auto-hide' &&\n        realIndex < data.length - 1 &&\n        scrollNum * gridBy.row < data.length - 1)\n        ? 'visible'\n        : 'invisible',\n      showButtonsMethod !== 'auto-disable' ||\n      (showButtonsMethod === 'auto-disable' &&\n        realIndex < data.length - 1 &&\n        scrollNum * gridBy.row < data.length - 1)\n        ? ''\n        : 'disabled'\n    ]\"\n  >\n    <ng-container *ngTemplateOutlet=\"contentNext\"></ng-container>\n  </div>\n  <!-- indicators -->\n  <ul class=\"indicators\" *ngIf=\"dotElm\">\n    <ng-container *ngFor=\"let dot of itemElms; let i = index\">\n      <li *ngIf=\"i % (scrollNum * gridBy.row) === 0\" (click)=\"currentIndex = i\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            dotElm;\n            context: {\n              $implicit: {\n                index: i,\n                currentIndex: currentIndex\n              }\n            }\n          \"\n        >\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n  <!-- progress -->\n  <div *ngIf=\"progressElm && autoplay\" #progress>\n    <ng-container *ngTemplateOutlet=\"progressElm\"> </ng-container>\n  </div>\n\n  <div class=\"mask\" *ngIf=\"grabbing\">\n    <ng-container *ngIf=\"leaveObs$ | async\"></ng-container>\n  </div>\n</div>\n",
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
                styles: [":host{display:block;height:100%}.invisible{visibility:hidden}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel-conntainer .carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel-conntainer .carousel .slide{display:flex;flex-direction:row}.carousel-conntainer .carousel .transition{transition:.5s ease-in-out}.carousel-conntainer .carousel .content{display:flex}.carousel-conntainer .carousel .content .item{display:block;opacity:0;width:100%}.carousel-conntainer .carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel-conntainer .carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel-conntainer .carousel .content .item.visible{opacity:1}.carousel-conntainer .carousel .content .item:first-child,.carousel-conntainer .carousel .content .item:last-child{opacity:0}.carousel-conntainer .carousel .content .item.visible_important{opacity:1}.carousel-conntainer ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel-conntainer ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel-conntainer .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel-conntainer .direction.left{left:0}.carousel-conntainer .direction.right{position:absolute;right:0}.carousel-conntainer .direction.disabled{opacity:.6;pointer-events:none}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"]
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
    screenSizeMap: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFFVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUVMLEVBQUUsRUFDRixPQUFPLEVBRVAsS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBZ0I1RCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7OztJQXVSdkMsWUFDK0IsVUFBZSxFQUNsQixTQUFTLEVBQzNCLFNBQW9CLEVBQ3BCLEtBQWEsRUFD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QUEwQjs7Ozs7SUFDMUIsaURBQTBCOzs7OztJQUMxQixpREFBMEI7Ozs7O0lBQzFCLG9EQUE2Qjs7SUFDN0IsOENBQW1DOzs7OztJQUVuQyxnREFBcUI7O0lBS3JCLGlEQUFzQzs7SUFFdEMsb0RBQW9COztJQUVwQixxREFBNEI7Ozs7O0lBQzVCLG9EQUF5Qjs7SUFDekIsbURBQXdCOzs7OztJQUV4Qix3REFBNkI7Ozs7O0lBaUQ3QixnREFBa0M7Ozs7O0lBQ2xDLGlEQUE2Qjs7Ozs7SUFoTjNCLGtEQUE0Qzs7Ozs7SUFDNUMsaURBQW1DOzs7OztJQUNuQyxpREFBNEI7Ozs7O0lBQzVCLDZDQUFxQjs7Ozs7SUFDckIsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZm9ya0pvaW4sXG4gIGZyb21FdmVudCxcbiAgaW50ZXJ2YWwsXG4gIG1lcmdlLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIGJ1ZmZlckNvdW50LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YWtlVW50aWwsXG4gIHRhcCxcbn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSB9IGZyb20gXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC1pdGVtLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgcmVzaXplT2JzZXJ2YWJsZSB9IGZyb20gXCIuL3J4anMub2JzZXJ2YWJsZS5yZXNpemVcIjtcbmRlY2xhcmUgdmFyIEhhbW1lcjtcbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogXCJuZ3gtYWR2YW5jZWQtY2Fyb3VzZWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuc2Nzc1wiXSxcbiAgdGVtcGxhdGVVcmw6IFwiLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBZHZhbmNlZENhcm91c2VsQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWUpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gIH1cbiAgLyoqIGRpc2FibGUgZHJhZyBldmVudCB3aXRoIHRvdWNoIGFuZCBtb3VzZSBwYW4gbW92aW5nLCBkZWZhdWx0IGlzIGBmYWxzZWAgKi9cbiAgQElucHV0KFwiZGlzYWJsZS1kcmFnXCIpXG4gIHB1YmxpYyBnZXQgZGlzYWJsZURyYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVEcmFnO1xuICB9XG4gIHB1YmxpYyBzZXQgZGlzYWJsZURyYWcodmFsdWUpIHtcbiAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZURyYWcgIT09IHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFtbWVyID0gdGhpcy5iaW5kSGFtbWVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZGlzYWJsZURyYWcgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKiBpcyB0aGUgY2Fyb3VzZWwgY2FuIG1vdmUgaW5maW5pdGUgKi9cbiAgQElucHV0KFwiaW5maW5pdGVcIilcbiAgcHVibGljIGdldCBpbmZpbml0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5maW5pdGU7XG4gIH1cbiAgcHVibGljIHNldCBpbmZpbml0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2luZmluaXRlID0gdmFsdWU7XG5cbiAgICAvKiB0aGlzLmluZmluaXRlRWxtUmVmcy5mb3JFYWNoKChyZWYpID0+IHtcbiAgICAgIHRoaXMuYWRkU3R5bGUocmVmLnJvb3ROb2Rlc1swXSwge1xuICAgICAgICB2aXNpYmlsaXR5OiB0aGlzLnJ1bkxvb3AgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIH0pO1xuICAgIH0pOyAqL1xuICB9XG5cbiAgLyoqIGF1dG8gcGxheSBzcGVlZCAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1zcGVlZFwiKVxuICBwdWJsaWMgZ2V0IHNwZWVkKCkge1xuICAgIHJldHVybiB0aGlzLnNwZWVkQ2hhbmdlLnZhbHVlO1xuICB9XG4gIHB1YmxpYyBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3BlZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaG93IG1hbnkgbnVtYmVyIGl0ZW1zIHRvIHNob3cgb25jZSwgZGVmYXVsdCBpcyBgMWBcbiAgICogc2V0IGBhdXRvYCB0byB1c2luZyBgW2JyZWFrcG9pbnRdYCBzZXQgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoXCJzaG93LW51bVwiKVxuICBwdWJsaWMgZ2V0IHNob3dOdW0oKTogbnVtYmVyIHwgXCJhdXRvXCIge1xuICAgIHJldHVybiB0aGlzLl9zaG93TnVtO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd051bSh2YWx1ZTogbnVtYmVyIHwgXCJhdXRvXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IFwiYXV0b1wiKSB7XG4gICAgICB0aGlzLmlzQXV0b051bSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSArdmFsdWU7XG4gICAgICBpZiAodGhpcy5yb290RWxtKSB7XG4gICAgICAgIHRoaXMuc2V0Vmlld1dpZHRoKCk7XG4gICAgICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIGNhcm91c2VsIGF1dG8gcGxheSBjb25maW5nICovXG4gIEBJbnB1dChcImF1dG9wbGF5XCIpXG4gIHB1YmxpYyBnZXQgYXV0b3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9wbGF5O1xuICB9XG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWUpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRvTmV4dFN1YiQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICAgIC8vIGlmIHNldCBhdXRvcGxheSwgdGhlbiB0aGUgaW5maW5pdGUgaXMgdHJ1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbmZpbml0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRJbmRleCh2YWx1ZSkge1xuICAgIC8vIGlmIG5vdyBpbmRleCBpZiBub3QgZXF1YWxlIHRvIHNhdmUgaW5kZXgsIGRvIHNvbWV0aW5nXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5vdCBjb250YWluIHdpdGggdGhlIGJvdW5kYXJ5IG5vdCBoYW5kbGVyd1xuICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiAhKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMuaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhbEluZGV4ID1cbiAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgaWYgKCF0aGlzLmluZmluaXRlICYmIHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wgPFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bSA8IDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZWxtcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8IDAgJiYgIXRoaXMuaW5maW5pdGUgPyAwIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaW5pdGlhbEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDQgKyB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gKiAyKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuZGF0YS5sZW5ndGggKyB0aGlzLl9zaG93TnVtICogNDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aW1lcih0aGlzLmFuaVRpbWUgKyAxMDApXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpZiAodGhpcy5yZWFsSW5kZXggPiB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgY291bnQgPSAodGhpcy5yZWFsSW5kZXggLSB0aGlzLmVsbXMubGVuZ3RoKSAlIHRoaXMuX3Nob3dOdW07XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4IC09IGNvdW50O1xuICAgICAgICAgIHRoaXMucmVhbEluZGV4ID1cbiAgICAgICAgICAgIHRoaXMuZ3JpZEJ5LmNvbCAqIHRoaXMuZ3JpZEJ5LnJvdyA+IDFcbiAgICAgICAgICAgICAgPyB0aGlzLmN1cnJlbnRJbmRleCArXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2xcbiAgICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMuX3Nob3dOdW07XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgMCA8PSB0aGlzLmN1cnJlbnRJbmRleCAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8PSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDFcbiAgICAgICkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0Zyb21BdXRvID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2dyZXNzV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcmdyZXNzV2lkdGg7XG4gIH1cbiAgcHVibGljIHNldCBwcm9ncmVzc1dpZHRoKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NFbG0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLl9wb3JncmVzc1dpZHRoID0gdmFsdWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgKHRoaXMucHJvZ3Jlc3NDb250YWluZXJFbG0ubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW5bMF0sXG4gICAgICAgIFwid2lkdGhcIixcbiAgICAgICAgYCR7dGhpcy5wcm9ncmVzc1dpZHRofSVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ3JhYmJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYWJiaW5nO1xuICB9XG4gIHB1YmxpYyBzZXQgZ3JhYmJpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZ3JhYmJpbmcgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2dyYWJiaW5nID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJiaW5nXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFuQ291bnQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FsbFJlc3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgXCJncmFiYmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldCBsZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxtLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfXB4KWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsbSxcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZVgoJHt2YWx1ZX0lKWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbWF4UmlnaHRJbmRleCgpIHtcbiAgICBsZXQgYWRkSW5kZXggPSAwO1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgYWRkSW5kZXggPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgICAgYWRkSW5kZXggPSAodGhpcy5zaG93TnVtIGFzIG51bWJlcikgLSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxIC0gdGhpcy5fc2hvd051bSArIDEgKyBhZGRJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJ1bkxvb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0b3BsYXkgfHwgdGhpcy5pbmZpbml0ZTtcbiAgfVxuICBwcml2YXRlIGdldCBsZW5ndGhPbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoID09PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcm9vdEVsbVdpZHRoKCkge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpXG4gICAgICA/IHRoaXMucm9vdEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgOiAxMDA7XG4gIH1cblxuICBwcml2YXRlIHNldCBjb250YWluZXJFbG1XaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgXCJ3aWR0aFwiLCB2YWx1ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuICBAVmlld0NoaWxkKFwiY29udGFpbmVyRWxtXCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKFwidmlld0FyZWFcIikgcHVibGljIHZpZXdBcmVhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoXCJwcmV2XCIsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgYnRuUHJldjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm5leHRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5OZXh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwicHJvZ3Jlc3NcIiwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHB1YmxpYyBwcm9ncmVzc0NvbnRhaW5lckVsbTogRWxlbWVudFJlZjtcblxuICAvLyBnZXQgYWxsIGl0ZW0gZWxtc1xuICBAQ29udGVudENoaWxkcmVuKE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlLCB7XG4gICAgZGVzY2VuZGFudHM6IHRydWUsXG4gICAgcmVhZDogRWxlbWVudFJlZixcbiAgfSlcbiAgcHVibGljIGl0ZW1FbG1zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQENvbnRlbnRDaGlsZChcImNhcm91c2VsUHJldlwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNvbnRlbnRQcmV2OiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxOZXh0XCIsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudE5leHQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbERvdFwiLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGRvdEVsbTogVGVtcGxhdGVSZWY8XG4gICAgYW55XG4gID47XG4gIEBDb250ZW50Q2hpbGQoXCJjYXJvdXNlbEl0ZW1UZW1wbGF0ZVwiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIGNhcm91c2VsSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKFwiY2Fyb3VzZWxQcm9ncmVzc1wiLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzRWxtOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHB1YmxpYyBfZGF0YTogYW55W107XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBtYXBwZWREYXRhOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogd2hlbiBpbmZpbml0ZSBpcyB0cnVlLCB0aGUgYW5pbWF0aW9uIHRpbWUgd2l0aCBpdGVtLCBkZWZhdWx0IGlzIDQwMC4gKi9cbiAgQElucHV0KCkgcHVibGljIGFuaVRpbWUgPSA0MDA7XG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIGluICNjb250YWluZXJFbG0gd2hlbiBtb2RlbCBjaGFuZ2UgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaUNsYXNzID0gXCJ0cmFuc2l0aW9uXCI7XG5cbiAgLyoqIHRoaXMgY2xhc3Mgd2lsbCBhZGQgd2hlbiBjYXJvdXNlbCBhdXRvIHBsYXksXG4gICAqIHRoaXMgZGVmYXVsdCBhdXRvcGxheSBhbmltYXRpb24gaXMgc2FtZSBhcyBhbmlDbGFzc1xuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaUNsYXNzQXV0byA9IHRoaXMuYW5pQ2xhc3M7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KFwic2hvdy1uZXh0LXByZXYtYnV0dG9uc1wiKSBwdWJsaWMgc2hvd0J1dHRvbnNNZXRob2Q6XG4gICAgfCBcImFsd2F5c1wiXG4gICAgfCBcImF1dG8taGlkZVwiXG4gICAgfCBcImF1dG8tZGlzYWJsZVwiID0gXCJhbHdheXNcIjtcblxuICAvKipcbiAgICogdXNlciBtb3ZlIHBpY3R1cmUgd2l0aCB0aGUgY29udGFpbmVyIHdpZHRoIHJhdGUsXG4gICAqIHdoZW4gbW9yZSB0aGFuIHRoYXQgcmF0ZSwgaXQgd2lsbCBnbyB0byBuZXh0IG9yIHByZXYsXG4gICAqIHNldCBmYWxzZSB3aWxsIG5ldmVyIG1vdmUgd2l0aCBkaXN0YW5jZSByYXRlLFxuICAgKiBkZWZhdWx0IGlzIGAwLjE1YFxuICAgKi9cbiAgQElucHV0KFwicGFuLWJvdW5kYXJ5XCIpIHB1YmxpYyBwYW5Cb3VuZGFyeTogbnVtYmVyIHwgZmFsc2UgPSAwLjE1O1xuXG4gIC8qKiB3aGVuIHNob3ctbnVtIGlzIGJpZ2dlciB0aGFuIDEsIHRoZSBmaXJzdCBpdGVtIGFsaWduLCBkZWZhdWx0ZSBpcyBgY2VudGVyYCAqL1xuICBASW5wdXQoKSBwdWJsaWMgYWxpZ246IFwibGVmdFwiIHwgXCJjZW50ZXJcIiB8IFwicmlnaHRcIiA9IFwiY2VudGVyXCI7XG5cbiAgLyoqXG4gICAqIGRpc2FibGUgd2hlbiBkcmFnIG9jY3VyIHRoZSBjaGlsZCBlbGVtZW50IHdpbGwgZm9sbG93IHRvdWNoIHBvaW50LlxuICAgKiBkZWZhdWx0IGlzIGBmYWxzZWBcbiAgICovXG4gIEBJbnB1dChcIm5vdC1mb2xsb3ctcGFuXCIpIHB1YmxpYyBub3REcmFnID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHVibGljIHRyYWNrQnlLZXkgPSBcImNvZGVcIjtcbiAgLyoqXG4gICAqIHRoZSBldmVudCBiaW5kaW5nIHN0YXRlIGZvciBzdG9wIGF1dG8gcGxheSB3aGVuIG1vdXJzZSBtb3Zlb3ZlclxuICAgKi9cbiAgQElucHV0KFwibW91cnNlLWVuYWJsZVwiKSBwdWJsaWMgbW91cnNlRW5hYmxlID0gZmFsc2U7XG4gIC8qKiBlYWNoIGF1dG8gcGxheSBiZXR3ZWVuIHRpbWUgKi9cbiAgQElucHV0KFwiYmV0d2Vlbi1kZWxheVwiKSBwdWJsaWMgZGVsYXkgPSA4MDAwO1xuICAvKiogYXV0byBwbGF5IGRpcmVjdGlvbiwgZGVmYXVsdCBpcyBgcmlnaHRgLiAqL1xuICBASW5wdXQoXCJhdXRvcGxheS1kaXJlY3Rpb25cIikgcHVibGljIGRpcmVjdGlvbjogXCJsZWZ0XCIgfCBcInJpZ2h0XCIgPSBcInJpZ2h0XCI7XG4gIC8qKiBob3cgbWFueSBudW1iZXIgd2l0aCBlYWNoIHNjcm9sbCwgZGVmYXVsdCBpcyBgMWAuICovXG4gIEBJbnB1dChcInNjcm9sbC1udW1cIikgcHVibGljIHNjcm9sbE51bSA9IDE7XG4gIC8qKiBDb3VsZCB1c2VyIHNjcm9sbCBtYW55IGl0ZW0gb25jZSwgc2ltdWxhdGUgd2l0aCBzY3JvbGxiYXIsIGRlZmF1bHQgaXMgYGZhbHNlYCAqL1xuICBASW5wdXQoXCJkcmFnLW1hbnlcIikgcHVibGljIGlzRHJhZ01hbnkgPSBmYWxzZTtcbiAgLyoqIE1pbmltYWwgdmVsb2NpdHkgcmVxdWlyZWQgYmVmb3JlIHJlY29nbml6aW5nLCB1bml0IGlzIGluIHB4IHBlciBtcywgZGVmYXVsdCBgMC4zYCAqL1xuICBASW5wdXQoXCJzd2lwZS12ZWxvY2l0eVwiKSBwdWJsaWMgc3dpcGVWZWxvY2l0eSA9IDAuMztcblxuICAvKipcbiAgICogc3dpdGNoIHNob3cgbnVtYmVyIHdpdGggY3VzdG9tIGxvZ2ljIGxpa2UgY3NzIEBtZWRpYSAobWluLXdpZHRoOiBgbnVtYmVyYHB4KVxuICAgKi9cbiAgQElucHV0KCkgcHVibGljIGJyZWFrcG9pbnQ6IEFycmF5PHtcbiAgICBncmlkQnk/O1xuICAgIHNjcmVlblNpemU6IFwieHhsXCIgfCBcInhsXCIgfCBcImxnXCIgfCBcIm1kXCIgfCBcInNtXCIgfCBcInhzXCI7XG4gICAgbnVtYmVyO1xuICAgIHNjcm9sbE51bT87XG4gIH0+ID0gW107XG5cbiAgQElucHV0KCkgcHVibGljIHNjcmVlblNpemVNYXAgPSB7XG4gICAgeHhsOiAxNDQwLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG4gICAgeGw6IDEyMDAsXG4gICAgbGc6IDk5MixcbiAgICBtZDogNzY4LFxuICAgIHNtOiA1NzYsXG4gICAgeHM6IDAsXG4gIH07XG5cbiAgcHVibGljIGxlYXZlT2JzJCA9IG1lcmdlKFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJtb3VzZXVwXCIpLFxuICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgXCJ0b3VjaGVuZFwiKVxuICApLnBpcGUoXG4gICAgdGFwKChlOiBFdmVudCkgPT4ge1xuICAgICAgdGhpcy5ncmFiYmluZyA9IGZhbHNlO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICApO1xuXG4gIHByaXZhdGUgaXNGcm9tQXV0byA9IHRydWU7XG4gIHByaXZhdGUgaXNBdXRvTnVtID0gZmFsc2U7XG4gIHByaXZhdGUgbW91c2VPbkNvbnRhaW5lciA9IGZhbHNlO1xuICBwcml2YXRlIGFsaWduRGlzdGFuY2UgPSAwO1xuICBwcml2YXRlIGVsbVdpZHRoID0gMDtcblxuICBwcml2YXRlIHJvb3RFbG06IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGNvbnRhaW5lckVsbTogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBlbG1zOiBBcnJheTxIVE1MRWxlbWVudD47XG5cbiAgcHJpdmF0ZSBoYW1tZXI7XG5cbiAgcHJpdmF0ZSBkb05leHRTdWIkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZG9OZXh0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSByZXN0YXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIHNwZWVkQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdCg1MDAwKTtcbiAgcHJpdmF0ZSBzdG9wRXZlbnQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcG9yZ3Jlc3NXaWR0aCA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRJbmRleCA9IDA7XG4gIHB1YmxpYyBfc2hvd051bSA9IDE7XG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgX2luZmluaXRlID0gZmFsc2U7XG4gIHByaXZhdGUgX2dyYWJiaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVEcmFnID0gZmFsc2U7XG4gIHB1YmxpYyBncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG5cbiAgcHJpdmF0ZSBwYW5Db3VudCA9IDA7XG5cbiAgLy8gdGhpcyB2YXJpYWJsZSB1c2UgZm9yIGNoZWNrIHRoZSBpbml0IHZhbHVlIGlzIHdyaXRlIHdpdGggbmdNb2RlbCxcbiAgLy8gd2hlbiBpbml0IGZpcnN0LCBub3Qgc2V0IHdpdGggYW5pbWF0aW9uXG5cbiAgcHVibGljIHJlYWxJbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuICBwdWJsaWMgd3JhcHBlcldpZHRoO1xuXG4gIHB1YmxpYyBzaW5nbGVUaW1lUnVuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpbml0aWFsSW5kZXggPSAwO1xuICBwdWJsaWMgb3JnaW5hbERhdGEgPSBbXTtcblxuICBwcml2YXRlIF9pbmZpbmVEYXRhQ291bnQgPSAwO1xuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucm9vdEVsbSA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbG0gPSB0aGlzLnJvb3RFbG0uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIGZvcmtKb2luKFtcbiAgICAgIC4uLnRoaXMuYmluZENsaWNrKCksXG4gICAgICAvLyB3aGVuIGl0ZW0gY2hhbmdlZCwgcmVtb3ZlIG9sZCBoYW1tZXIgYmluZGluZywgYW5kIHJlc2V0IHdpZHRoXG4gICAgICB0aGlzLml0ZW1FbG1zLmNoYW5nZXMucGlwZShcbiAgICAgICAgLy8gZGV0ZWN0Q2hhbmdlcyB0byBjaGFuZ2UgdmlldyBkb3RzXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyBpIGNhbid0IHBhc3MgdGhlIGNoYW5nZWRldGVjdGlvbiBjaGVjaywgb25seSB0aGUgd2F5IHRvIHVzaW5nIHRpbWVvdXQuIDooXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgfSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCkpXG4gICAgICApLFxuICAgICAgcmVzaXplT2JzZXJ2YWJsZSh0aGlzLnJvb3RFbG0sICgpID0+IHRoaXMuY29udGFpbmVyUmVzaXplKCkpLFxuICAgIF0pXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLmluaXRWYXJpYWJsZSgpO1xuICAgIHRoaXMuc2V0Vmlld1dpZHRoKHRydWUpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVEcmFnKSB7XG4gICAgICB0aGlzLmhhbW1lciA9IHRoaXMuYmluZEhhbW1lcigpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgLyogaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy5ydW5Mb29wKSB7XG4gICAgICB0aGlzLmFkZEluZmluaXRlRWxtKCk7XG4gICAgfSAqL1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdG9yeUhhbW1lcigpO1xuXG4gICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVzdG9yeUhhbW1lcigpIHtcbiAgICBpZiAodGhpcy5oYW1tZXIpIHtcbiAgICAgIHRoaXMuaGFtbWVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnRhaW5lclJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldFZpZXdXaWR0aCgpO1xuICAgIHRoaXMucmVTZXRBbGlnbkRpc3RhbmNlKCk7XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaW5pdGlhbEluZGV4O1xuXG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0VmFyaWFibGUoKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVsbXMgPSB0aGlzLml0ZW1FbG1zLnRvQXJyYXkoKS5tYXAoKHgpID0+IHgubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIGxldCBzdGFydEV2ZW50ID0gdGhpcy5yZXN0YXJ0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgbGV0IHN0b3BFdmVudCA9IHRoaXMuc3RvcEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgaWYgKHRoaXMubW91cnNlRW5hYmxlKSB7XG4gICAgICAgIHN0YXJ0RXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdGFydEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgXCJtb3VzZWxlYXZlXCIpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZ3JhYmJpbmcpLFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSBmYWxzZSkpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBzdG9wRXZlbnQgPSBtZXJnZShcbiAgICAgICAgICBzdG9wRXZlbnQsXG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGFpbmVyRWxtLCBcIm1vdXNlb3ZlclwiKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+ICh0aGlzLm1vdXNlT25Db250YWluZXIgPSB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZG9OZXh0ID0gc3RhcnRFdmVudC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5zcGVlZENoYW5nZSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRpbWVyKHRoaXMuZGVsYXkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ydW5Qcm9ncmVzcygyMCkpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0Zyb21BdXRvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRXZlbnQucGlwZSh0YXAoKCkgPT4gKHRoaXMucHJvZ3Jlc3NXaWR0aCA9IDApKSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICB0aGlzLmRvTmV4dFN1YiQgPSB0aGlzLmRvTmV4dC5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVTZXRBbGlnbkRpc3RhbmNlKCkge1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgdGhpcy5hbGlnbkRpc3RhbmNlID0gdGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZpZXdXaWR0aChpc0luaXQ/OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuaXNBdXRvTnVtKSB7XG4gICAgICB0aGlzLl9zaG93TnVtID0gdGhpcy5nZXRBdXRvTnVtKCk7XG4gICAgfVxuICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCBcImdyYWJcIik7XG4gICAgaWYgKGlzSW5pdCkge1xuICAgICAgLy8gcmVtYWluIG9uZSBlbG0gaGVpZ2h0XG4gICAgICB0aGlzLmluaXREYXRhKHRoaXMuX2luZmluZURhdGFDb3VudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgIFwibmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuZWxtV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkuY29sKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICBcIm5neC1hZHZhbmNlZC1jYXJvdXNlbC1kaXNwbGF5LW5vd3JhcFwiXG4gICAgKTtcblxuICAgIHRoaXMuY29udGFpbmVyRWxtV2lkdGggPVxuICAgICAgKHRoaXMuZWxtV2lkdGggLyB0aGlzLmdyaWRCeS5jb2wpICogdGhpcy5lbG1zLmxlbmd0aDtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyRWxtLCBcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgdGhpcy52aWV3QXJlYS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIGB3aWR0aDoke1xuICAgICAgICAgICh0aGlzLnJvb3RFbG1XaWR0aCAqIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sKSAvIHRoaXMuX3Nob3dOdW1cbiAgICAgICAgfXB4YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxtcy5mb3JFYWNoKChlbG06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFN0eWxlKGVsbSwgXCJ3aWR0aFwiLCB0aGlzLmVsbVdpZHRoKTtcbiAgICB9KTtcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZEhhbW1lcigpIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBobSA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLmNvbnRhaW5lckVsbSk7XG5cbiAgICAgIGNvbnN0IHBhbiA9IG5ldyBIYW1tZXIuUGFuKHtcbiAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBobS5hZGQocGFuKTtcblxuICAgICAgaG0ub24oXCJwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWxcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoT25lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBcInBhbmxlZnRcIjpcbiAgICAgICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09IFwiY2VudGVyXCIgJiYgdGhpcy5zaG93TnVtID49IHRoaXMuZWxtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgdGhpcy5vdXRPZkJvdW5kKGUudHlwZSkpIHtcbiAgICAgICAgICAgICAgZS5kZWx0YVggKj0gMC4yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubm90RHJhZykge1xuICAgICAgICAgICAgICB0aGlzLmxlZnQgPVxuICAgICAgICAgICAgICAgIC10aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMuZWxtV2lkdGggK1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgZS5kZWx0YVg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RyYWdNYW55KSB7XG4gICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmRlbHRhWCkgPiB0aGlzLmVsbVdpZHRoICogMC41KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFYID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhhbW1lci5zdG9wKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhbmNhbmNlbFwiOlxuICAgICAgICAgICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJwYW5lbmRcIjpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoTWF0aC5hYnMoZS5kZWx0YVgpIC8gdGhpcy5lbG1XaWR0aClcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTnVtO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gbW92ZU51bTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggKyBtb3ZlTnVtO1xuXG4gICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgXCJjbGlja1wiKS5waXBlKFxuICAgICAgICAgIG1hcCgoKSA9PiAodGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW0pKVxuICAgICAgICApLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5idG5QcmV2Lm5hdGl2ZUVsZW1lbnQsIFwiY2xpY2tcIikucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGNhbGxSZXN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmF1dG9wbGF5ICYmICF0aGlzLm1vdXNlT25Db250YWluZXIgJiYgIXRoaXMuZ3JhYmJpbmcpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3RhcnQubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd1ZpZXcoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBpc0FuaW1hdGlvbiA9IHRydWUsXG4gICAgaXNGcm9tQXV0byA9IHRoaXMuaXNGcm9tQXV0b1xuICApIHtcbiAgICBpZiAodGhpcy5lbG1zLmxlbmd0aCA+IDEgJiYgdGhpcy5lbG1zLmxlbmd0aCA+IHRoaXMuX3Nob3dOdW0pIHtcbiAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5sZWZ0ID0gLShpbmRleCAqIHRoaXMuZWxtV2lkdGggLSB0aGlzLmFsaWduRGlzdGFuY2UpO1xuXG4gICAgICBpZiAoaXNBbmltYXRpb24pIHtcbiAgICAgICAgaWYgKGlzRnJvbUF1dG8pIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlZnQgPSB0aGlzLmFsaWduRGlzdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgdGhpcy5hbmlDbGFzc0F1dG8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvdXRPZkJvdW5kKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJwYW5sZWZ0XCI6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICBjYXNlIFwicGFucmlnaHRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEluZGV4IDw9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBydW5Qcm9ncmVzcyhiZXR3ZWVuVGltZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG93VGltZXMgPSB0aGlzLnNwZWVkIC8gYmV0d2VlblRpbWU7XG4gICAgICBjb25zdCBldmVyeUluY3JlYXNlID0gKDEwMCAvIHRoaXMuc3BlZWQpICogYmV0d2VlblRpbWU7XG4gICAgICByZXR1cm4gaW50ZXJ2YWwoYmV0d2VlblRpbWUpLnBpcGUoXG4gICAgICAgIHRhcCgodCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NXaWR0aCA9ICh0ICUgaG93VGltZXMpICogZXZlcnlJbmNyZWFzZTtcbiAgICAgICAgfSksXG4gICAgICAgIGJ1ZmZlckNvdW50KE1hdGgucm91bmQoaG93VGltZXMpLCAwKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGluaXREYXRhKHNob3dOdW0pIHtcbiAgICBpZiAoIXRoaXMub3JnaW5hbERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9yZ2luYWxEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5maW5pdGUpIHtcbiAgICAgIHRoaXMuc2luZ2xlVGltZVJ1biA9IGZhbHNlO1xuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheUNyZWF0b3IodGhpcy5vcmdpbmFsRGF0YSwgc2hvd051bSk7XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBzaG93TnVtO1xuICAgICAgdGhpcy5pbml0aWFsSW5kZXggPSB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEF1dG9OdW0oKSB7XG4gICAgY29uc3QgY3VycldpZHRoID0gdGhpcy5yb290RWxtV2lkdGg7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3cgPSB0aGlzLmJyZWFrcG9pbnQuZmluZCgoYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JlZW5TaXplTWFwW2Iuc2NyZWVuU2l6ZV0gPD0gY3VycldpZHRoO1xuICAgICAgfSk7XG4gICAgICBpZiAobm93KSB7XG4gICAgICAgIGlmIChub3cuZ3JpZEJ5KSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuZ3JpZEJ5LmNvbCB8fCBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSBub3cuZ3JpZEJ5O1xuICAgICAgICAgIGNvbnN0IHNob3dOdW0gPSBub3cuZ3JpZEJ5LmNvbCAqIG5vdy5ncmlkQnkucm93IHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHNob3dOdW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxOdW0gPSBub3cuc2Nyb2xsTnVtIHx8IG5vdy5udW1iZXI7XG4gICAgICAgICAgdGhpcy5ncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG4gICAgICAgICAgcmV0dXJuIG5vdy5udW1iZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeSkge1xuICAgICAgICB0aGlzLnNjcm9sbE51bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5zY3JvbGxOdW0gfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLm51bWJlcjtcbiAgICAgICAgdGhpcy5ncmlkQnkgPSB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeTtcbiAgICAgICAgY29uc3Qgc2hvd051bSA9XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkuY29sICpcbiAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5LnJvdyB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGluaXROdW0gPSAzO1xuICAgIGlmIChjdXJyV2lkdGggPiAyMDApIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGluaXROdW0gKyBjdXJyV2lkdGggLyAxMDApO1xuICAgIH1cblxuICAgIHJldHVybiBpbml0TnVtO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShlbG06IEhUTUxFbGVtZW50LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsbSwgc3R5bGUsIGAke3ZhbHVlfSVgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJhY2tCeUZjbihpbmRleCwgaXRlbSkge1xuICAgIGlmICghaXRlbSB8fCBpdGVtW3RoaXMudHJhY2tCeUtleV0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVt0aGlzLnRyYWNrQnlLZXldO1xuICB9XG5cbiAgcHVibGljIGFycmF5Q3JlYXRvcihhcnIsIGNvdW50KSB7XG4gICAgY29uc3QgZGF0YSA9IFsuLi5hcnJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgZGF0YS51bnNoaWZ0KGFyclthcnIubGVuZ3RoIC0gMSAtIChpICUgYXJyLmxlbmd0aCldKTtcbiAgICAgIGRhdGEucHVzaChhcnJbaSAlIGFyci5sZW5ndGhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==