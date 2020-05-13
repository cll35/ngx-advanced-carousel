import ResizeObserver from 'resize-observer-polyfill';
import { Observable, merge, fromEvent, BehaviorSubject, Subject, timer, of, forkJoin, interval } from 'rxjs';
import { debounceTime, tap, finalize, switchMap, take, takeUntil, filter, map, bufferCount } from 'rxjs/operators';
import { ɵɵdefineDirective, ɵsetClassMetadata, Directive, ɵɵelementContainer, ɵɵelementContainerStart, ɵɵtemplate, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵpureFunction1, ɵɵelementStart, ɵɵpipe, ɵɵelementEnd, ɵɵpipeBind3, ɵɵpureFunction2, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵpipeBind1, EventEmitter, ɵɵdirectiveInject, PLATFORM_ID, Renderer2, NgZone, ChangeDetectorRef, ɵɵdefineComponent, ɵɵcontentQuery, ElementRef, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵviewQuery, ɵɵProvidersFeature, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, Input, ViewChild, ViewChildren, ContentChildren, ContentChild, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, NgForOf, NgIf, NgClass, NgTemplateOutlet, SlicePipe, AsyncPipe, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Manager, Pan, DIRECTION_HORIZONTAL } from 'hammerjs';

/**
 * An observable creator for element resize.
 * @param elm the watch element.
 * @param cb when resize complete, call back function.
 * @param time resize emit time, default is 200
 */
function resizeObservable(elm, cb, time = 200) {
    let elmObserve$;
    return new Observable((observer) => {
        elmObserve$ = new ResizeObserver((entries, obs) => {
            observer.next(elmObserve$);
        });
        elmObserve$.observe(elm);
    }).pipe(debounceTime(time), tap(() => {
        cb();
    }), finalize(() => {
        elmObserve$.unobserve(elm);
        elmObserve$.disconnect();
    }));
}

class NgxAdvancedCarouselItemDirective {
    constructor() { }
}
/** @nocollapse */ NgxAdvancedCarouselItemDirective.ɵfac = function NgxAdvancedCarouselItemDirective_Factory(t) { return new (t || NgxAdvancedCarouselItemDirective)(); };
/** @nocollapse */ NgxAdvancedCarouselItemDirective.ɵdir = ɵɵdefineDirective({ type: NgxAdvancedCarouselItemDirective, selectors: [["", "ngx-advanced-carousel-item", ""]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAdvancedCarouselItemDirective, [{
        type: Directive,
        args: [{
                selector: '[ngx-advanced-carousel-item]',
            }]
    }], function () { return []; }, null); })();

const _c0 = ["carouselPrev"];
const _c1 = ["carouselNext"];
const _c2 = ["carouselDot"];
const _c3 = ["carouselItemTemplate"];
const _c4 = ["carouselProgress"];
const _c5 = ["containerElm"];
const _c6 = ["prev"];
const _c7 = ["next"];
const _c8 = ["progress"];
const _c9 = ["viewArea"];
function NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c10 = function (a0) { return { $implicit: a0 }; };
function NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 14);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r11 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r11.carouselItemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c10, item_r12));
} }
function NgxAdvancedCarouselComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 11, 12);
    ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_Template, 2, 4, "ng-container", 13);
    ɵɵpipe(3, "slice");
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r8 = ɵɵnextContext().index;
    const ctx_r9 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r9.gridBy.col != 1 || ctx_r9.gridBy.row != 1 ? "flex-wrap" : "");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind3(3, 2, ctx_r9.data, i_r8, i_r8 + ctx_r9.scrollNum * ctx_r9.gridBy.row));
} }
function NgxAdvancedCarouselComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_3_div_1_Template, 4, 6, "div", 10);
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r8 = ctx.index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", i_r8 % (ctx_r1.scrollNum * ctx_r1.gridBy.row) === 0);
} }
function NgxAdvancedCarouselComponent_div_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c11 = function (a0, a1) { return [a0, a1]; };
function NgxAdvancedCarouselComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 15, 16);
    ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_4_ng_container_2_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(2, _c11, ctx_r2.showButtonsMethod !== "auto-hide" || ctx_r2.showButtonsMethod === "auto-hide" && ctx_r2.currentIndex > 0 ? "visible" : "invisible", ctx_r2.showButtonsMethod !== "auto-disable" || ctx_r2.showButtonsMethod === "auto-disable" && ctx_r2.currentIndex > 0 ? "" : "disabled"));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.contentPrev);
} }
function NgxAdvancedCarouselComponent_div_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 18, 19);
    ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_5_ng_container_2_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(2, _c11, ctx_r3.showButtonsMethod !== "auto-hide" || ctx_r3.showButtonsMethod === "auto-hide" && ctx_r3.realIndex < ctx_r3.data.length ? "visible" : "invisible", ctx_r3.showButtonsMethod !== "auto-disable" || ctx_r3.showButtonsMethod === "auto-disable" && ctx_r3.realIndex < ctx_r3.data.length ? "" : "disabled"));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r3.contentNext);
} }
function NgxAdvancedCarouselComponent_ul_6_li_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c12 = function (a0, a1) { return { index: a0, currentIndex: a1 }; };
function NgxAdvancedCarouselComponent_ul_6_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 22);
    ɵɵlistener("click", function NgxAdvancedCarouselComponent_ul_6_li_1_Template_li_click_0_listener() { ɵɵrestoreView(_r25); const i_r22 = ctx.index; const ctx_r24 = ɵɵnextContext(2); return ctx_r24.currentIndex = i_r22; });
    ɵɵtemplate(1, NgxAdvancedCarouselComponent_ul_6_li_1_ng_container_1_Template, 1, 0, "ng-container", 14);
    ɵɵelementEnd();
} if (rf & 2) {
    const i_r22 = ctx.index;
    const ctx_r20 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r20.dotElm)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c10, ɵɵpureFunction2(2, _c12, i_r22, ctx_r20.currentIndex)));
} }
function NgxAdvancedCarouselComponent_ul_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 20);
    ɵɵtemplate(1, NgxAdvancedCarouselComponent_ul_6_li_1_Template, 2, 7, "li", 21);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r4.itemElms);
} }
function NgxAdvancedCarouselComponent_div_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", null, 23);
    ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_7_ng_container_2_Template, 1, 0, "ng-container", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r5.progressElm);
} }
function NgxAdvancedCarouselComponent_div_8_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 24);
    ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_8_ng_container_1_Template, 1, 0, "ng-container", 7);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ɵɵpipeBind1(2, 1, ctx_r6.leaveObs$));
} }
class NgxAdvancedCarouselComponent {
    constructor(platformId, _document, _renderer, _zone, _cd) {
        this.platformId = platformId;
        this._document = _document;
        this._renderer = _renderer;
        this._zone = _zone;
        this._cd = _cd;
        this.mappedData = new EventEmitter();
        /** when infinite is true, the animation time with item, default is 400. */
        this.aniTime = 400;
        /** this class will add in #containerElm when model change */
        this.aniClass = 'transition';
        /** this class will add when carousel auto play,
         * this default autoplay animation is same as aniClass
         */
        this.aniClassAuto = this.aniClass;
        // tslint:disable-next-line: no-input-rename
        this.showButtonsMethod = 'always';
        /**
         * user move picture with the container width rate,
         * when more than that rate, it will go to next or prev,
         * set false will never move with distance rate,
         * default is `0.15`
         */
        this.panBoundary = 0.15;
        /** when show-num is bigger than 1, the first item align, defaulte is `center` */
        this.align = 'center';
        /**
         * disable when drag occur the child element will follow touch point.
         * default is `false`
         */
        this.notDrag = false;
        this.trackByKey = 'code';
        /**
         * the event binding state for stop auto play when mourse moveover
         */
        this.mourseEnable = false;
        /** each auto play between time */
        this.delay = 8000;
        /** auto play direction, default is `right`. */
        this.direction = 'right';
        /** how many number with each scroll, default is `1`. */
        this.scrollNum = 1;
        /** Could user scroll many item once, simulate with scrollbar, default is `false` */
        this.isDragMany = false;
        /** Minimal velocity required before recognizing, unit is in px per ms, default `0.3` */
        this.swipeVelocity = 0.3;
        /**
         * switch show number with custom logic like css @media (min-width: `number`px)
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
        this.leaveObs$ = merge(fromEvent(this._document, 'mouseup'), fromEvent(this._document, 'touchend')).pipe(tap((e) => {
            this.grabbing = false;
            e.stopPropagation();
            e.preventDefault();
        }));
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
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    /** disable drag event with touch and mouse pan moving, default is `false` */
    get disableDrag() {
        return this._disableDrag;
    }
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
    /** is the carousel can move infinite */
    get infinite() {
        return this._infinite;
    }
    set infinite(value) {
        this._infinite = value;
        /* this.infiniteElmRefs.forEach((ref) => {
          this.addStyle(ref.rootNodes[0], {
            visibility: this.runLoop ? 'visible' : 'hidden',
          });
        }); */
    }
    /** auto play speed */
    get speed() {
        return this.speedChange.value;
    }
    set speed(value) {
        this._zone.runOutsideAngular(() => {
            this.speedChange.next(value);
        });
    }
    /**
     * how many number items to show once, default is `1`
     * set `auto` to using `[breakpoint]` set value.
     */
    get showNum() {
        return this._showNum;
    }
    set showNum(value) {
        if (value === 'auto') {
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
    /** carousel auto play confing */
    get autoplay() {
        return this._autoplay;
    }
    set autoplay(value) {
        if (isPlatformBrowser(this.platformId)) {
            if (this.elms) {
                this.progressWidth = 0;
                if (value) {
                    this._zone.runOutsideAngular(() => {
                        this.doNextSub$ = this.doNext.subscribe();
                    });
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
    get currentIndex() {
        return this._currentIndex;
    }
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
                    this._zone.runOutsideAngular(() => {
                        this.stopEvent.next();
                        this.callRestart();
                    });
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
                    this._zone.runOutsideAngular(() => {
                        timer(this.aniTime + 100)
                            .pipe(switchMap(() => {
                            this.drawView(this.currentIndex, false);
                            return of(null);
                        }), take(1))
                            .subscribe();
                    });
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
                this._zone.run(() => {
                    this.onChange(this.currentIndex);
                    this._cd.detectChanges();
                });
            }
        }
        this.isFromAuto = false;
    }
    get progressWidth() {
        return this._porgressWidth;
    }
    set progressWidth(value) {
        if (this.progressElm !== undefined && this.autoplay) {
            this._porgressWidth = value;
            this._renderer.setStyle(this.progressContainerElm.nativeElement.children[0], 'width', `${this.progressWidth}%`);
        }
    }
    get grabbing() {
        return this._grabbing;
    }
    set grabbing(value) {
        if (this._grabbing !== value) {
            this._zone.run(() => {
                this._grabbing = value;
                if (value) {
                    this._renderer.addClass(this.containerElm, 'grabbing');
                }
                else {
                    this.panCount = 0;
                    this.callRestart();
                    this._renderer.removeClass(this.containerElm, 'grabbing');
                }
                this._cd.detectChanges();
            });
        }
    }
    set left(value) {
        if (isPlatformBrowser(this.platformId)) {
            this._renderer.setStyle(this.containerElm, 'transform', `translateX(${value}px)`);
        }
        else {
            this._renderer.setStyle(this.containerElm, 'transform', `translateX(${value}%)`);
        }
    }
    get maxRightIndex() {
        let addIndex = 0;
        switch (this.align) {
            case 'left':
                addIndex = 0;
                break;
            case 'center':
                addIndex = this.showNum - 1;
                break;
            case 'right':
                addIndex = this.showNum - 1;
                break;
        }
        return this.itemElms.length - 1 - this._showNum + 1 + addIndex;
    }
    get runLoop() {
        return this.autoplay || this.infinite;
    }
    get lengthOne() {
        return this.itemElms.length === 1;
    }
    get rootElmWidth() {
        return isPlatformBrowser(this.platformId)
            ? this.rootElm.getBoundingClientRect().width
            : 100;
    }
    set containerElmWidth(value) {
        this.setStyle(this.containerElm, 'width', value);
    }
    ngAfterViewInit() {
        this.rootElm = this.container.nativeElement;
        this.containerElm = this.rootElm.children[0];
        this.init();
        forkJoin([
            ...this.bindClick(),
            // when item changed, remove old hammer binding, and reset width
            this.itemElms.changes.pipe(
            // detectChanges to change view dots
            tap(() => {
                if (this.currentIndex > this.itemElms.length - 1) {
                    // i can't pass the changedetection check, only the way to using timeout. :(
                    setTimeout(() => {
                        this.currentIndex = this.itemElms.length - 1;
                    }, 0);
                }
                this.destroy();
                this.init();
                this.progressWidth = 0;
            }), tap(() => this._cd.detectChanges())),
            resizeObservable(this.rootElm, () => this.containerResize()),
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }
    ngOnDestroy() {
        this.destroy();
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
    writeValue(value) {
        if (value || value === 0) {
            this.currentIndex = value;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
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
    destroy() {
        this.destoryHammer();
        if (this.autoplay) {
            this.doNextSub$.unsubscribe();
        }
    }
    destoryHammer() {
        if (this.hammer) {
            this.hammer.destroy();
        }
    }
    containerResize() {
        this.setViewWidth();
        this.reSetAlignDistance();
        this.currentIndex = this.initialIndex;
        this.drawView(this.currentIndex, false);
    }
    initVariable() {
        this._zone.runOutsideAngular(() => {
            this.elms = this.itemElms.toArray().map((x) => x.nativeElement);
            let startEvent = this.restart.asObservable();
            let stopEvent = this.stopEvent.asObservable();
            if (this.mourseEnable) {
                startEvent = merge(startEvent, fromEvent(this.containerElm, 'mouseleave').pipe(filter(() => !this.grabbing), tap(() => (this.mouseOnContainer = false))));
                stopEvent = merge(stopEvent, fromEvent(this.containerElm, 'mouseover').pipe(tap(() => (this.mouseOnContainer = true))));
            }
            this.doNext = startEvent.pipe(switchMap(() => this.speedChange), switchMap(() => timer(this.delay).pipe(switchMap(() => this.runProgress(20)), tap(() => {
                this.isFromAuto = true;
                if (this.direction === 'left') {
                    this.currentIndex -= this.scrollNum;
                }
                else {
                    this.currentIndex += this.scrollNum;
                }
            }), takeUntil(stopEvent.pipe(tap(() => (this.progressWidth = 0)))))));
            if (this.autoplay) {
                this.doNextSub$ = this.doNext.subscribe();
            }
        });
    }
    reSetAlignDistance() {
        switch (this.align) {
            case 'center':
                this.alignDistance = (this.rootElmWidth - this.elmWidth) / 2;
                break;
            case 'left':
                this.alignDistance = 0;
                break;
            case 'right':
                this.alignDistance = this.rootElmWidth - this.elmWidth;
                break;
        }
    }
    setViewWidth(isInit) {
        if (this.isAutoNum) {
            this._showNum = this.getAutoNum();
            this._infineDataCount = this._showNum * 2;
        }
        this._renderer.addClass(this.containerElm, 'grab');
        if (isInit) {
            // remain one elm height
            this.initData(this._infineDataCount);
            this._renderer.addClass(this.containerElm, 'ngx-advanced-carousel-display-nowrap');
        }
        this.elmWidth = this.rootElmWidth / (this._showNum / this.gridBy.col);
        this._renderer.removeClass(this.containerElm, 'ngx-advanced-carousel-display-nowrap');
        this.containerElmWidth =
            (this.elmWidth / this.gridBy.col) * this.elms.length;
        this._renderer.setStyle(this.containerElm, 'position', 'relative');
        this.viewArea.forEach((element) => {
            element.nativeElement.setAttribute('style', `width:${(this.rootElmWidth * this.scrollNum * this.gridBy.col) / this._showNum}px`);
        });
        this.elms.forEach((elm) => {
            this.setStyle(elm, 'width', this.elmWidth);
        });
        this._cd.markForCheck();
    }
    bindHammer() {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        return this._zone.runOutsideAngular(() => {
            const hm = new Manager(this.containerElm);
            const pan = new Pan({
                direction: DIRECTION_HORIZONTAL,
                threshold: 0,
            });
            hm.add(pan);
            hm.on('panleft panright panend pancancel', (e) => {
                if (this.lengthOne) {
                    return;
                }
                this.removeContainerTransition();
                if (this.autoplay) {
                    this._zone.runOutsideAngular(() => {
                        this.stopEvent.next();
                    });
                }
                switch (e.type) {
                    case 'panleft':
                    case 'panright':
                        this.panCount++;
                        if (this.panCount < 2) {
                            return;
                        }
                        this.grabbing = true;
                        if (this.align !== 'center' && this.showNum >= this.elms.length) {
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
                    case 'pancancel':
                        this.drawView(this.currentIndex);
                        break;
                    case 'panend':
                        if (this.panBoundary !== false &&
                            Math.abs(e.deltaX) > this.elmWidth * this.panBoundary) {
                            const moveNum = this.isDragMany
                                ? Math.ceil(Math.abs(e.deltaX) / this.elmWidth)
                                : this.scrollNum;
                            const prevIndex = this.currentIndex - moveNum;
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
            });
            return hm;
        });
    }
    goPrev(prevIndex) {
        if (!this.runLoop && prevIndex < 0) {
            prevIndex = 0;
            this.drawView(0);
        }
        this.currentIndex = prevIndex;
    }
    goNext(nextIndex) {
        if (!this.runLoop && nextIndex > this.maxRightIndex) {
            nextIndex = this.maxRightIndex;
            this.drawView(nextIndex);
        }
        this.currentIndex = nextIndex;
    }
    bindClick() {
        if (this.btnNext && this.btnPrev) {
            return [
                fromEvent(this.btnNext.nativeElement, 'click').pipe(map(() => (this.currentIndex += this.scrollNum))),
                fromEvent(this.btnPrev.nativeElement, 'click').pipe(map(() => {
                    return (this.currentIndex = this.currentIndex - this.scrollNum);
                })),
            ];
        }
        return [];
    }
    callRestart() {
        if (this.autoplay && !this.mouseOnContainer && !this.grabbing) {
            this._zone.runOutsideAngular(() => {
                this.restart.next(null);
            });
        }
    }
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
    removeContainerTransition() {
        this._renderer.removeClass(this.containerElm, this.aniClass);
        this._renderer.removeClass(this.containerElm, this.aniClassAuto);
    }
    outOfBound(type) {
        switch (type) {
            case 'panleft':
                return this.currentIndex >= this.maxRightIndex;
            case 'panright':
                return this.currentIndex <= 0;
        }
    }
    runProgress(betweenTime) {
        return this._zone.runOutsideAngular(() => {
            const howTimes = this.speed / betweenTime;
            const everyIncrease = (100 / this.speed) * betweenTime;
            return interval(betweenTime).pipe(tap((t) => {
                this.progressWidth = (t % howTimes) * everyIncrease;
            }), bufferCount(Math.round(howTimes), 0));
        });
    }
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
    getAutoNum() {
        const currWidth = this.rootElmWidth;
        if (this.breakpoint.length > 0) {
            const now = this.breakpoint.find((b) => {
                return this.screenSizeMap[b.screenSize] <= currWidth;
            });
            if (now) {
                if (now.gridBy) {
                    this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
                    this.gridBy = now.gridBy;
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
        const initNum = 3;
        if (currWidth > 200) {
            return Math.floor(initNum + currWidth / 100);
        }
        return initNum;
    }
    setStyle(elm, style, value) {
        if (isPlatformBrowser(this.platformId)) {
            this._renderer.setStyle(elm, style, `${value}px`);
        }
        else {
            this._renderer.setStyle(elm, style, `${value}%`);
        }
    }
    trackByFcn(index, item) {
        if (!item || item[this.trackByKey]) {
            return null;
        }
        return item[this.trackByKey];
    }
    arrayCreator(arr, count) {
        const data = [...arr];
        for (let i = 0; i < count; i++) {
            data.unshift(arr[arr.length - 1 - (i % arr.length)]);
            data.push(arr[i % arr.length]);
        }
        return data;
    }
}
/** @nocollapse */ NgxAdvancedCarouselComponent.ɵfac = function NgxAdvancedCarouselComponent_Factory(t) { return new (t || NgxAdvancedCarouselComponent)(ɵɵdirectiveInject(PLATFORM_ID), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ChangeDetectorRef)); };
/** @nocollapse */ NgxAdvancedCarouselComponent.ɵcmp = ɵɵdefineComponent({ type: NgxAdvancedCarouselComponent, selectors: [["ngx-advanced-carousel"]], contentQueries: function NgxAdvancedCarouselComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, true);
        ɵɵcontentQuery(dirIndex, _c1, true);
        ɵɵcontentQuery(dirIndex, _c2, true);
        ɵɵcontentQuery(dirIndex, _c3, true);
        ɵɵcontentQuery(dirIndex, _c4, true);
        ɵɵcontentQuery(dirIndex, NgxAdvancedCarouselItemDirective, true, ElementRef);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentPrev = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentNext = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dotElm = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.carouselItemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.progressElm = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemElms = _t);
    } }, viewQuery: function NgxAdvancedCarouselComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c5, true);
        ɵɵviewQuery(_c6, true);
        ɵɵviewQuery(_c7, true);
        ɵɵviewQuery(_c8, true);
        ɵɵviewQuery(_c9, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.container = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.btnPrev = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.btnNext = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.progressContainerElm = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.viewArea = _t);
    } }, inputs: { data: "data", disableDrag: ["disable-drag", "disableDrag"], infinite: "infinite", speed: ["autoplay-speed", "speed"], showNum: ["show-num", "showNum"], autoplay: "autoplay", aniTime: "aniTime", aniClass: "aniClass", aniClassAuto: "aniClassAuto", showButtonsMethod: ["show-next-prev-buttons", "showButtonsMethod"], panBoundary: ["pan-boundary", "panBoundary"], align: "align", notDrag: ["not-follow-pan", "notDrag"], trackByKey: "trackByKey", mourseEnable: ["mourse-enable", "mourseEnable"], delay: ["between-delay", "delay"], direction: ["autoplay-direction", "direction"], scrollNum: ["scroll-num", "scrollNum"], isDragMany: ["drag-many", "isDragMany"], swipeVelocity: ["swipe-velocity", "swipeVelocity"], breakpoint: "breakpoint", screenSizeMap: "screenSizeMap" }, outputs: { mappedData: "mappedData" }, features: [ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef((() => NgxAdvancedCarouselComponent)),
                multi: true,
            },
        ])], decls: 9, vars: 7, consts: [[1, "carousel"], ["containerElm", ""], ["ngx-advanced-carousel-container", "", 1, "content"], ["class", "item cursor-pointer visible_important", "ngx-advanced-carousel-item", "", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "direction left", 3, "ngClass", 4, "ngIf"], ["class", "direction right", 3, "ngClass", 4, "ngIf"], ["class", "indicators", 4, "ngIf"], [4, "ngIf"], ["class", "mask", 4, "ngIf"], ["ngx-advanced-carousel-item", "", 1, "item", "cursor-pointer", "visible_important"], ["class", "slide", 3, "ngClass", 4, "ngIf"], [1, "slide", 3, "ngClass"], ["viewArea", ""], [4, "ngFor", "ngForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "direction", "left", 3, "ngClass"], ["prev", ""], [4, "ngTemplateOutlet"], [1, "direction", "right", 3, "ngClass"], ["next", ""], [1, "indicators"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["progress", ""], [1, "mask"]], template: function NgxAdvancedCarouselComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0, 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, NgxAdvancedCarouselComponent_div_3_Template, 2, 1, "div", 3);
        ɵɵelementEnd();
        ɵɵtemplate(4, NgxAdvancedCarouselComponent_div_4_Template, 3, 5, "div", 4);
        ɵɵtemplate(5, NgxAdvancedCarouselComponent_div_5_Template, 3, 5, "div", 5);
        ɵɵtemplate(6, NgxAdvancedCarouselComponent_ul_6_Template, 2, 1, "ul", 6);
        ɵɵtemplate(7, NgxAdvancedCarouselComponent_div_7_Template, 3, 1, "div", 7);
        ɵɵtemplate(8, NgxAdvancedCarouselComponent_div_8_Template, 3, 3, "div", 8);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.data)("ngForTrackBy", ctx.trackByFcn);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.contentPrev);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.contentNext);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.dotElm);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.progressElm && ctx.autoplay);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.grabbing);
    } }, directives: [NgForOf, NgIf, NgxAdvancedCarouselItemDirective, NgClass, NgTemplateOutlet], pipes: [SlicePipe, AsyncPipe], styles: [":host{display:block;height:100%}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel .slide{display:flex;flex-direction:row}.carousel .transition{transition:.5s ease-in-out}.carousel ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel .direction.left{left:0}.carousel .direction.right{position:absolute;right:0}.carousel .direction.disabled{opacity:.6;pointer-events:none}.carousel .content{display:flex}.carousel .content .item{display:block;opacity:0;width:100%}.carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel .content .item.visible{opacity:1}.carousel .content .item:first-child,.carousel .content .item:last-child{opacity:0}.carousel .content .item.visible_important{opacity:1}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAdvancedCarouselComponent, [{
        type: Component,
        args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'ngx-advanced-carousel',
                styleUrls: ['./ngx-advanced-carousel.component.scss'],
                templateUrl: './ngx-advanced-carousel.component.html',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((() => NgxAdvancedCarouselComponent)),
                        multi: true,
                    },
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: Renderer2 }, { type: NgZone }, { type: ChangeDetectorRef }]; }, { data: [{
            type: Input
        }], disableDrag: [{
            type: Input,
            args: ['disable-drag']
        }], infinite: [{
            type: Input,
            args: ['infinite']
        }], speed: [{
            type: Input,
            args: ['autoplay-speed']
        }], showNum: [{
            type: Input,
            args: ['show-num']
        }], autoplay: [{
            type: Input,
            args: ['autoplay']
        }], container: [{
            type: ViewChild,
            args: ['containerElm', { static: false }]
        }], viewArea: [{
            type: ViewChildren,
            args: ['viewArea']
        }], btnPrev: [{
            type: ViewChild,
            args: ['prev', { static: false }]
        }], btnNext: [{
            type: ViewChild,
            args: ['next', { static: false }]
        }], progressContainerElm: [{
            type: ViewChild,
            args: ['progress', { static: false }]
        }], itemElms: [{
            type: ContentChildren,
            args: [NgxAdvancedCarouselItemDirective, {
                    descendants: true,
                    read: ElementRef,
                }]
        }], contentPrev: [{
            type: ContentChild,
            args: ['carouselPrev', { static: false }]
        }], contentNext: [{
            type: ContentChild,
            args: ['carouselNext', { static: false }]
        }], dotElm: [{
            type: ContentChild,
            args: ['carouselDot', { static: false }]
        }], carouselItemTemplate: [{
            type: ContentChild,
            args: ['carouselItemTemplate', { static: false }]
        }], progressElm: [{
            type: ContentChild,
            args: ['carouselProgress', { static: false }]
        }], mappedData: [{
            type: Output
        }], aniTime: [{
            type: Input
        }], aniClass: [{
            type: Input
        }], aniClassAuto: [{
            type: Input
        }], showButtonsMethod: [{
            type: Input,
            args: ['show-next-prev-buttons']
        }], panBoundary: [{
            type: Input,
            args: ['pan-boundary']
        }], align: [{
            type: Input
        }], notDrag: [{
            type: Input,
            args: ['not-follow-pan']
        }], trackByKey: [{
            type: Input
        }], mourseEnable: [{
            type: Input,
            args: ['mourse-enable']
        }], delay: [{
            type: Input,
            args: ['between-delay']
        }], direction: [{
            type: Input,
            args: ['autoplay-direction']
        }], scrollNum: [{
            type: Input,
            args: ['scroll-num']
        }], isDragMany: [{
            type: Input,
            args: ['drag-many']
        }], swipeVelocity: [{
            type: Input,
            args: ['swipe-velocity']
        }], breakpoint: [{
            type: Input
        }], screenSizeMap: [{
            type: Input
        }] }); })();

class NgxAdvancedCarouselModule {
}
/** @nocollapse */ NgxAdvancedCarouselModule.ɵmod = ɵɵdefineNgModule({ type: NgxAdvancedCarouselModule });
/** @nocollapse */ NgxAdvancedCarouselModule.ɵinj = ɵɵdefineInjector({ factory: function NgxAdvancedCarouselModule_Factory(t) { return new (t || NgxAdvancedCarouselModule)(); }, imports: [[CommonModule, FormsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxAdvancedCarouselModule, { declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective], imports: [CommonModule, FormsModule], exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAdvancedCarouselModule, [{
        type: NgModule,
        args: [{
                declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                imports: [CommonModule, FormsModule],
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-advanced-carousel
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective, NgxAdvancedCarouselModule, resizeObservable };
//# sourceMappingURL=ngx-advanced-carousel.js.map
