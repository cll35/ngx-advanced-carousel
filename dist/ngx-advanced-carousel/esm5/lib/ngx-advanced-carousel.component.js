import { __read, __spread } from "tslib";
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, PLATFORM_ID, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { BehaviorSubject, forkJoin, fromEvent, interval, merge, of, Subject, timer, } from 'rxjs';
import { bufferCount, filter, map, switchMap, take, takeUntil, tap, } from 'rxjs/operators';
import { NgxAdvancedCarouselItemDirective } from './ngx-advanced-carousel-item.directive';
import { resizeObservable } from './rxjs.observable.resize';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./ngx-advanced-carousel-item.directive";
var _c0 = ["carouselPrev"];
var _c1 = ["carouselNext"];
var _c2 = ["carouselDot"];
var _c3 = ["carouselItemTemplate"];
var _c4 = ["carouselProgress"];
var _c5 = ["containerElm"];
var _c6 = ["prev"];
var _c7 = ["next"];
var _c8 = ["progress"];
var _c9 = ["viewArea"];
function NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
var _c10 = function (a0) { return { $implicit: a0 }; };
function NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    var item_r12 = ctx.$implicit;
    var ctx_r11 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r11.carouselItemTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c10, item_r12));
} }
function NgxAdvancedCarouselComponent_div_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11, 12);
    i0.ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_3_div_1_ng_container_2_Template, 2, 4, "ng-container", 13);
    i0.ɵɵpipe(3, "slice");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r8 = i0.ɵɵnextContext().index;
    var ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r9.gridBy.col != 1 || ctx_r9.gridBy.row != 1 ? "flex-wrap" : "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(3, 2, ctx_r9.data, i_r8, i_r8 + ctx_r9.scrollNum * ctx_r9.gridBy.row));
} }
function NgxAdvancedCarouselComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_3_div_1_Template, 4, 6, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r8 = ctx.index;
    var ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i_r8 % (ctx_r1.scrollNum * ctx_r1.gridBy.row) === 0);
} }
function NgxAdvancedCarouselComponent_div_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
var _c11 = function (a0, a1) { return [a0, a1]; };
function NgxAdvancedCarouselComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15, 16);
    i0.ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_4_ng_container_2_Template, 1, 0, "ng-container", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c11, ctx_r2.showButtonsMethod !== "auto-hide" || ctx_r2.showButtonsMethod === "auto-hide" && ctx_r2.currentIndex > 0 ? "visible" : "invisible", ctx_r2.showButtonsMethod !== "auto-disable" || ctx_r2.showButtonsMethod === "auto-disable" && ctx_r2.currentIndex > 0 ? "" : "disabled"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.contentPrev);
} }
function NgxAdvancedCarouselComponent_div_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18, 19);
    i0.ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_5_ng_container_2_Template, 1, 0, "ng-container", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c11, ctx_r3.showButtonsMethod !== "auto-hide" || ctx_r3.showButtonsMethod === "auto-hide" && ctx_r3.realIndex < ctx_r3.data.length ? "visible" : "invisible", ctx_r3.showButtonsMethod !== "auto-disable" || ctx_r3.showButtonsMethod === "auto-disable" && ctx_r3.realIndex < ctx_r3.data.length ? "" : "disabled"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r3.contentNext);
} }
function NgxAdvancedCarouselComponent_ul_6_li_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
var _c12 = function (a0, a1) { return { index: a0, currentIndex: a1 }; };
function NgxAdvancedCarouselComponent_ul_6_li_1_Template(rf, ctx) { if (rf & 1) {
    var _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 22);
    i0.ɵɵlistener("click", function NgxAdvancedCarouselComponent_ul_6_li_1_Template_li_click_0_listener() { i0.ɵɵrestoreView(_r25); var i_r22 = ctx.index; var ctx_r24 = i0.ɵɵnextContext(2); return ctx_r24.currentIndex = i_r22; });
    i0.ɵɵtemplate(1, NgxAdvancedCarouselComponent_ul_6_li_1_ng_container_1_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var i_r22 = ctx.index;
    var ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r20.dotElm)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c10, i0.ɵɵpureFunction2(2, _c12, i_r22, ctx_r20.currentIndex)));
} }
function NgxAdvancedCarouselComponent_ul_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 20);
    i0.ɵɵtemplate(1, NgxAdvancedCarouselComponent_ul_6_li_1_Template, 2, 7, "li", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r4.itemElms);
} }
function NgxAdvancedCarouselComponent_div_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", null, 23);
    i0.ɵɵtemplate(2, NgxAdvancedCarouselComponent_div_7_ng_container_2_Template, 1, 0, "ng-container", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r5.progressElm);
} }
function NgxAdvancedCarouselComponent_div_8_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function NgxAdvancedCarouselComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtemplate(1, NgxAdvancedCarouselComponent_div_8_ng_container_1_Template, 1, 0, "ng-container", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 1, ctx_r6.leaveObs$));
} }
var NgxAdvancedCarouselComponent = /** @class */ (function () {
    function NgxAdvancedCarouselComponent(platformId, _document, _renderer, _zone, _cd) {
        var _this = this;
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
        this.leaveObs$ = merge(fromEvent(this._document, 'mouseup'), fromEvent(this._document, 'touchend')).pipe(tap(function (e) {
            _this.grabbing = false;
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
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "disableDrag", {
        /** disable drag event with touch and mouse pan moving, default is `false` */
        get: function () {
            return this._disableDrag;
        },
        set: function (value) {
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
        get: function () {
            return this._infinite;
        },
        set: function (value) {
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
        get: function () {
            return this.speedChange.value;
        },
        set: function (value) {
            var _this = this;
            this._zone.runOutsideAngular(function () {
                _this.speedChange.next(value);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "showNum", {
        /**
         * how many number items to show once, default is `1`
         * set `auto` to using `[breakpoint]` set value.
         */
        get: function () {
            return this._showNum;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "autoplay", {
        /** carousel auto play confing */
        get: function () {
            return this._autoplay;
        },
        set: function (value) {
            var _this = this;
            if (isPlatformBrowser(this.platformId)) {
                if (this.elms) {
                    this.progressWidth = 0;
                    if (value) {
                        this._zone.runOutsideAngular(function () {
                            _this.doNextSub$ = _this.doNext.subscribe();
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex;
        },
        set: function (value) {
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
                        this._zone.runOutsideAngular(function () {
                            _this.stopEvent.next();
                            _this.callRestart();
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
                        this._zone.runOutsideAngular(function () {
                            timer(_this.aniTime + 100)
                                .pipe(switchMap(function () {
                                _this.drawView(_this.currentIndex, false);
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
                    this._zone.run(function () {
                        _this.onChange(_this.currentIndex);
                        _this._cd.detectChanges();
                    });
                }
            }
            this.isFromAuto = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "progressWidth", {
        get: function () {
            return this._porgressWidth;
        },
        set: function (value) {
            if (this.progressElm !== undefined && this.autoplay) {
                this._porgressWidth = value;
                this._renderer.setStyle(this.progressContainerElm.nativeElement.children[0], 'width', this.progressWidth + "%");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "grabbing", {
        get: function () {
            return this._grabbing;
        },
        set: function (value) {
            var _this = this;
            if (this._grabbing !== value) {
                this._zone.run(function () {
                    _this._grabbing = value;
                    if (value) {
                        _this._renderer.addClass(_this.containerElm, 'grabbing');
                    }
                    else {
                        _this.panCount = 0;
                        _this.callRestart();
                        _this._renderer.removeClass(_this.containerElm, 'grabbing');
                    }
                    _this._cd.detectChanges();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "left", {
        set: function (value) {
            if (isPlatformBrowser(this.platformId)) {
                this._renderer.setStyle(this.containerElm, 'transform', "translateX(" + value + "px)");
            }
            else {
                this._renderer.setStyle(this.containerElm, 'transform', "translateX(" + value + "%)");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "maxRightIndex", {
        get: function () {
            var addIndex = 0;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "runLoop", {
        get: function () {
            return this.autoplay || this.infinite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "lengthOne", {
        get: function () {
            return this.itemElms.length === 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "rootElmWidth", {
        get: function () {
            return isPlatformBrowser(this.platformId)
                ? this.rootElm.getBoundingClientRect().width
                : 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxAdvancedCarouselComponent.prototype, "containerElmWidth", {
        set: function (value) {
            this.setStyle(this.containerElm, 'width', value);
        },
        enumerable: true,
        configurable: true
    });
    NgxAdvancedCarouselComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rootElm = this.container.nativeElement;
        this.containerElm = this.rootElm.children[0];
        this.init();
        forkJoin(__spread(this.bindClick(), [
            // when item changed, remove old hammer binding, and reset width
            this.itemElms.changes.pipe(
            // detectChanges to change view dots
            tap(function () {
                if (_this.currentIndex > _this.itemElms.length - 1) {
                    // i can't pass the changedetection check, only the way to using timeout. :(
                    setTimeout(function () {
                        _this.currentIndex = _this.itemElms.length - 1;
                    }, 0);
                }
                _this.destroy();
                _this.init();
                _this.progressWidth = 0;
            }), tap(function () { return _this._cd.detectChanges(); })),
            resizeObservable(this.rootElm, function () { return _this.containerResize(); }),
        ]))
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    };
    NgxAdvancedCarouselComponent.prototype.ngOnDestroy = function () {
        this.destroy();
        this.destroy$.next();
        this.destroy$.unsubscribe();
    };
    NgxAdvancedCarouselComponent.prototype.writeValue = function (value) {
        if (value || value === 0) {
            this.currentIndex = value;
        }
    };
    NgxAdvancedCarouselComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NgxAdvancedCarouselComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NgxAdvancedCarouselComponent.prototype.init = function () {
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
    NgxAdvancedCarouselComponent.prototype.destroy = function () {
        this.destoryHammer();
        if (this.autoplay) {
            this.doNextSub$.unsubscribe();
        }
    };
    NgxAdvancedCarouselComponent.prototype.destoryHammer = function () {
        if (this.hammer) {
            this.hammer.destroy();
        }
    };
    NgxAdvancedCarouselComponent.prototype.containerResize = function () {
        this.setViewWidth();
        this.reSetAlignDistance();
        this.currentIndex = this.initialIndex;
        this.drawView(this.currentIndex, false);
    };
    NgxAdvancedCarouselComponent.prototype.initVariable = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this.elms = _this.itemElms.toArray().map(function (x) { return x.nativeElement; });
            var startEvent = _this.restart.asObservable();
            var stopEvent = _this.stopEvent.asObservable();
            if (_this.mourseEnable) {
                startEvent = merge(startEvent, fromEvent(_this.containerElm, 'mouseleave').pipe(filter(function () { return !_this.grabbing; }), tap(function () { return (_this.mouseOnContainer = false); })));
                stopEvent = merge(stopEvent, fromEvent(_this.containerElm, 'mouseover').pipe(tap(function () { return (_this.mouseOnContainer = true); })));
            }
            _this.doNext = startEvent.pipe(switchMap(function () { return _this.speedChange; }), switchMap(function () {
                return timer(_this.delay).pipe(switchMap(function () { return _this.runProgress(20); }), tap(function () {
                    _this.isFromAuto = true;
                    if (_this.direction === 'left') {
                        _this.currentIndex -= _this.scrollNum;
                    }
                    else {
                        _this.currentIndex += _this.scrollNum;
                    }
                }), takeUntil(stopEvent.pipe(tap(function () { return (_this.progressWidth = 0); }))));
            }));
            if (_this.autoplay) {
                _this.doNextSub$ = _this.doNext.subscribe();
            }
        });
    };
    NgxAdvancedCarouselComponent.prototype.reSetAlignDistance = function () {
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
    };
    NgxAdvancedCarouselComponent.prototype.setViewWidth = function (isInit) {
        var _this = this;
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
        this.viewArea.forEach(function (element) {
            element.nativeElement.setAttribute('style', "width:" + (_this.rootElmWidth * _this.scrollNum * _this.gridBy.col) / _this._showNum + "px");
        });
        this.elms.forEach(function (elm) {
            _this.setStyle(elm, 'width', _this.elmWidth);
        });
        this._cd.markForCheck();
    };
    NgxAdvancedCarouselComponent.prototype.bindHammer = function () {
        var _this = this;
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        return this._zone.runOutsideAngular(function () {
            var hm = new Hammer.Manager(_this.containerElm);
            var pan = new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 0,
            });
            hm.add(pan);
            hm.on('panleft panright panend pancancel', function (e) {
                if (_this.lengthOne) {
                    return;
                }
                _this.removeContainerTransition();
                if (_this.autoplay) {
                    _this._zone.runOutsideAngular(function () {
                        _this.stopEvent.next();
                    });
                }
                switch (e.type) {
                    case 'panleft':
                    case 'panright':
                        _this.panCount++;
                        if (_this.panCount < 2) {
                            return;
                        }
                        _this.grabbing = true;
                        if (_this.align !== 'center' && _this.showNum >= _this.elms.length) {
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
                    case 'pancancel':
                        _this.drawView(_this.currentIndex);
                        break;
                    case 'panend':
                        if (_this.panBoundary !== false &&
                            Math.abs(e.deltaX) > _this.elmWidth * _this.panBoundary) {
                            var moveNum = _this.isDragMany
                                ? Math.ceil(Math.abs(e.deltaX) / _this.elmWidth)
                                : _this.scrollNum;
                            var prevIndex = _this.currentIndex - moveNum;
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
            });
            return hm;
        });
    };
    NgxAdvancedCarouselComponent.prototype.goPrev = function (prevIndex) {
        if (!this.runLoop && prevIndex < 0) {
            prevIndex = 0;
            this.drawView(0);
        }
        this.currentIndex = prevIndex;
    };
    NgxAdvancedCarouselComponent.prototype.goNext = function (nextIndex) {
        if (!this.runLoop && nextIndex > this.maxRightIndex) {
            nextIndex = this.maxRightIndex;
            this.drawView(nextIndex);
        }
        this.currentIndex = nextIndex;
    };
    NgxAdvancedCarouselComponent.prototype.bindClick = function () {
        var _this = this;
        if (this.btnNext && this.btnPrev) {
            return [
                fromEvent(this.btnNext.nativeElement, 'click').pipe(map(function () { return (_this.currentIndex += _this.scrollNum); })),
                fromEvent(this.btnPrev.nativeElement, 'click').pipe(map(function () {
                    return (_this.currentIndex = _this.currentIndex - _this.scrollNum);
                })),
            ];
        }
        return [];
    };
    NgxAdvancedCarouselComponent.prototype.callRestart = function () {
        var _this = this;
        if (this.autoplay && !this.mouseOnContainer && !this.grabbing) {
            this._zone.runOutsideAngular(function () {
                _this.restart.next(null);
            });
        }
    };
    NgxAdvancedCarouselComponent.prototype.drawView = function (index, isAnimation, isFromAuto) {
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
    NgxAdvancedCarouselComponent.prototype.removeContainerTransition = function () {
        this._renderer.removeClass(this.containerElm, this.aniClass);
        this._renderer.removeClass(this.containerElm, this.aniClassAuto);
    };
    NgxAdvancedCarouselComponent.prototype.outOfBound = function (type) {
        switch (type) {
            case 'panleft':
                return this.currentIndex >= this.maxRightIndex;
            case 'panright':
                return this.currentIndex <= 0;
        }
    };
    NgxAdvancedCarouselComponent.prototype.runProgress = function (betweenTime) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            var howTimes = _this.speed / betweenTime;
            var everyIncrease = (100 / _this.speed) * betweenTime;
            return interval(betweenTime).pipe(tap(function (t) {
                _this.progressWidth = (t % howTimes) * everyIncrease;
            }), bufferCount(Math.round(howTimes), 0));
        });
    };
    NgxAdvancedCarouselComponent.prototype.initData = function (showNum) {
        if (!this.orginalData.length) {
            this.orginalData = __spread(this.data);
        }
        if (this.infinite) {
            this.singleTimeRun = false;
            this.data = this.arrayCreator(this.orginalData, showNum);
            this._currentIndex = showNum;
            this.initialIndex = this.currentIndex;
        }
    };
    NgxAdvancedCarouselComponent.prototype.getAutoNum = function () {
        var _this = this;
        var currWidth = this.rootElmWidth;
        if (this.breakpoint.length > 0) {
            var now = this.breakpoint.find(function (b) {
                return _this.screenSizeMap[b.screenSize] <= currWidth;
            });
            if (now) {
                if (now.gridBy) {
                    this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
                    this.gridBy = now.gridBy;
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
        var initNum = 3;
        if (currWidth > 200) {
            return Math.floor(initNum + currWidth / 100);
        }
        return initNum;
    };
    NgxAdvancedCarouselComponent.prototype.setStyle = function (elm, style, value) {
        if (isPlatformBrowser(this.platformId)) {
            this._renderer.setStyle(elm, style, value + "px");
        }
        else {
            this._renderer.setStyle(elm, style, value + "%");
        }
    };
    NgxAdvancedCarouselComponent.prototype.trackByFcn = function (index, item) {
        if (!item || item[this.trackByKey]) {
            return null;
        }
        return item[this.trackByKey];
    };
    NgxAdvancedCarouselComponent.prototype.arrayCreator = function (arr, count) {
        var data = __spread(arr);
        for (var i = 0; i < count; i++) {
            data.unshift(arr[arr.length - 1 - (i % arr.length)]);
            data.push(arr[i % arr.length]);
        }
        return data;
    };
    /** @nocollapse */ NgxAdvancedCarouselComponent.ɵfac = function NgxAdvancedCarouselComponent_Factory(t) { return new (t || NgxAdvancedCarouselComponent)(i0.ɵɵdirectiveInject(PLATFORM_ID), i0.ɵɵdirectiveInject(DOCUMENT), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    /** @nocollapse */ NgxAdvancedCarouselComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxAdvancedCarouselComponent, selectors: [["ngx-advanced-carousel"]], contentQueries: function NgxAdvancedCarouselComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, _c0, true);
            i0.ɵɵcontentQuery(dirIndex, _c1, true);
            i0.ɵɵcontentQuery(dirIndex, _c2, true);
            i0.ɵɵcontentQuery(dirIndex, _c3, true);
            i0.ɵɵcontentQuery(dirIndex, _c4, true);
            i0.ɵɵcontentQuery(dirIndex, NgxAdvancedCarouselItemDirective, true, ElementRef);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.contentPrev = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.contentNext = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dotElm = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.carouselItemTemplate = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.progressElm = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemElms = _t);
        } }, viewQuery: function NgxAdvancedCarouselComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c5, true);
            i0.ɵɵviewQuery(_c6, true);
            i0.ɵɵviewQuery(_c7, true);
            i0.ɵɵviewQuery(_c8, true);
            i0.ɵɵviewQuery(_c9, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.btnPrev = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.btnNext = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.progressContainerElm = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.viewArea = _t);
        } }, inputs: { data: "data", disableDrag: ["disable-drag", "disableDrag"], infinite: "infinite", speed: ["autoplay-speed", "speed"], showNum: ["show-num", "showNum"], autoplay: "autoplay", aniTime: "aniTime", aniClass: "aniClass", aniClassAuto: "aniClassAuto", showButtonsMethod: ["show-next-prev-buttons", "showButtonsMethod"], panBoundary: ["pan-boundary", "panBoundary"], align: "align", notDrag: ["not-follow-pan", "notDrag"], trackByKey: "trackByKey", mourseEnable: ["mourse-enable", "mourseEnable"], delay: ["between-delay", "delay"], direction: ["autoplay-direction", "direction"], scrollNum: ["scroll-num", "scrollNum"], isDragMany: ["drag-many", "isDragMany"], swipeVelocity: ["swipe-velocity", "swipeVelocity"], breakpoint: "breakpoint", screenSizeMap: "screenSizeMap" }, outputs: { mappedData: "mappedData" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef((function () { return NgxAdvancedCarouselComponent; })),
                    multi: true,
                },
            ])], decls: 9, vars: 7, consts: [[1, "carousel"], ["containerElm", ""], ["ngx-advanced-carousel-container", "", 1, "content"], ["class", "item cursor-pointer visible_important", "ngx-advanced-carousel-item", "", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "direction left", 3, "ngClass", 4, "ngIf"], ["class", "direction right", 3, "ngClass", 4, "ngIf"], ["class", "indicators", 4, "ngIf"], [4, "ngIf"], ["class", "mask", 4, "ngIf"], ["ngx-advanced-carousel-item", "", 1, "item", "cursor-pointer", "visible_important"], ["class", "slide", 3, "ngClass", 4, "ngIf"], [1, "slide", 3, "ngClass"], ["viewArea", ""], [4, "ngFor", "ngForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "direction", "left", 3, "ngClass"], ["prev", ""], [4, "ngTemplateOutlet"], [1, "direction", "right", 3, "ngClass"], ["next", ""], [1, "indicators"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["progress", ""], [1, "mask"]], template: function NgxAdvancedCarouselComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵtemplate(3, NgxAdvancedCarouselComponent_div_3_Template, 2, 1, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, NgxAdvancedCarouselComponent_div_4_Template, 3, 5, "div", 4);
            i0.ɵɵtemplate(5, NgxAdvancedCarouselComponent_div_5_Template, 3, 5, "div", 5);
            i0.ɵɵtemplate(6, NgxAdvancedCarouselComponent_ul_6_Template, 2, 1, "ul", 6);
            i0.ɵɵtemplate(7, NgxAdvancedCarouselComponent_div_7_Template, 3, 1, "div", 7);
            i0.ɵɵtemplate(8, NgxAdvancedCarouselComponent_div_8_Template, 3, 3, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.data)("ngForTrackBy", ctx.trackByFcn);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.contentPrev);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.contentNext);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dotElm);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.progressElm && ctx.autoplay);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.grabbing);
        } }, directives: [i1.NgForOf, i1.NgIf, i2.NgxAdvancedCarouselItemDirective, i1.NgClass, i1.NgTemplateOutlet], pipes: [i1.SlicePipe, i1.AsyncPipe], styles: [":host{display:block;height:100%}.leo-carousel-display-nowrap{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow:hidden!important}.carousel{height:100%;overflow:hidden;position:relative;width:100%}.carousel .slide{display:flex;flex-direction:row}.carousel .transition{transition:.5s ease-in-out}.carousel ul.indicators{bottom:1rem;left:0;list-style:none;margin:0;padding:0;position:absolute;text-align:center;width:100%}.carousel ul.indicators li{cursor:pointer;display:inline-block;padding:.5rem;position:relative}.carousel .direction{align-items:center;cursor:pointer;display:flex;height:100%;justify-content:center;position:absolute;top:0}.carousel .direction.left{left:0}.carousel .direction.right{position:absolute;right:0}.carousel .direction.disabled{opacity:.6;pointer-events:none}.carousel .content{display:flex}.carousel .content .item{display:block;opacity:0;width:100%}.carousel .content .item.fade_animation{transition:opacity 295ms linear .5s}.carousel .content .item.fade_animation_0{transition:opacity 295ms linear}.carousel .content .item.visible{opacity:1}.carousel .content .item:first-child,.carousel .content .item:last-child{opacity:0}.carousel .content .item.visible_important{opacity:1}.grab{cursor:-webkit-grab;cursor:grab}.grabbing{cursor:-webkit-grabbing;cursor:grabbing}.mask{bottom:0;left:0;position:absolute;right:0;top:0}"], encapsulation: 2, changeDetection: 0 });
    return NgxAdvancedCarouselComponent;
}());
export { NgxAdvancedCarouselComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxAdvancedCarouselComponent, [{
        type: Component,
        args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'ngx-advanced-carousel',
                styleUrls: ['./ngx-advanced-carousel.component.scss'],
                templateUrl: './ngx-advanced-carousel.component.html',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((function () { return NgxAdvancedCarouselComponent; })),
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
            }] }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, { data: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibGliL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUVWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBQ04sV0FBVyxFQUlYLFNBQVMsRUFDVCxZQUFZLEVBRVosaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLEtBQUssRUFFTCxFQUFFLEVBQ0YsT0FBTyxFQUVQLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsSUFBSSxFQUNKLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lDL0JsRCx3QkFRZTs7OztJQWRqQiw2QkFNRTtJQUFBLDJIQVFBO0lBQ0YsMEJBQWU7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QixLQUFLOztrQkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tICdoYW1tZXJqcyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZvcmtKb2luLFxuICBmcm9tRXZlbnQsXG4gIGludGVydmFsLFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgYnVmZmVyQ291bnQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IHJlc2l6ZU9ic2VydmFibGUgfSBmcm9tICcuL3J4anMub2JzZXJ2YWJsZS5yZXNpemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduZ3gtYWR2YW5jZWQtY2Fyb3VzZWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1hZHZhbmNlZC1jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudFxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG4gIC8qKiBkaXNhYmxlIGRyYWcgZXZlbnQgd2l0aCB0b3VjaCBhbmQgbW91c2UgcGFuIG1vdmluZywgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dCgnZGlzYWJsZS1kcmFnJylcbiAgcHVibGljIGdldCBkaXNhYmxlRHJhZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZURyYWc7XG4gIH1cbiAgcHVibGljIHNldCBkaXNhYmxlRHJhZyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlRHJhZyAhPT0gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5kZXN0b3J5SGFtbWVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW1tZXIgPSB0aGlzLmJpbmRIYW1tZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9kaXNhYmxlRHJhZyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIGlzIHRoZSBjYXJvdXNlbCBjYW4gbW92ZSBpbmZpbml0ZSAqL1xuICBASW5wdXQoJ2luZmluaXRlJylcbiAgcHVibGljIGdldCBpbmZpbml0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5maW5pdGU7XG4gIH1cbiAgcHVibGljIHNldCBpbmZpbml0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2luZmluaXRlID0gdmFsdWU7XG5cbiAgICAvKiB0aGlzLmluZmluaXRlRWxtUmVmcy5mb3JFYWNoKChyZWYpID0+IHtcbiAgICAgIHRoaXMuYWRkU3R5bGUocmVmLnJvb3ROb2Rlc1swXSwge1xuICAgICAgICB2aXNpYmlsaXR5OiB0aGlzLnJ1bkxvb3AgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIH0pO1xuICAgIH0pOyAqL1xuICB9XG5cbiAgLyoqIGF1dG8gcGxheSBzcGVlZCAqL1xuICBASW5wdXQoJ2F1dG9wbGF5LXNwZWVkJylcbiAgcHVibGljIGdldCBzcGVlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGVlZENoYW5nZS52YWx1ZTtcbiAgfVxuICBwdWJsaWMgc2V0IHNwZWVkKHZhbHVlKSB7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnNwZWVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGhvdyBtYW55IG51bWJlciBpdGVtcyB0byBzaG93IG9uY2UsIGRlZmF1bHQgaXMgYDFgXG4gICAqIHNldCBgYXV0b2AgdG8gdXNpbmcgYFticmVha3BvaW50XWAgc2V0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KCdzaG93LW51bScpXG4gIHB1YmxpYyBnZXQgc2hvd051bSgpOiBudW1iZXIgfCAnYXV0bycge1xuICAgIHJldHVybiB0aGlzLl9zaG93TnVtO1xuICB9XG4gIHB1YmxpYyBzZXQgc2hvd051bSh2YWx1ZTogbnVtYmVyIHwgJ2F1dG8nKSB7XG4gICAgaWYgKHZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuaXNBdXRvTnVtID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2hvd051bSA9ICt2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnJvb3RFbG0pIHtcbiAgICAgICAgdGhpcy5zZXRWaWV3V2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZVNldEFsaWduRGlzdGFuY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogY2Fyb3VzZWwgYXV0byBwbGF5IGNvbmZpbmcgKi9cbiAgQElucHV0KCdhdXRvcGxheScpXG4gIHB1YmxpYyBnZXQgYXV0b3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9wbGF5O1xuICB9XG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWUpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgaWYgKHRoaXMuZWxtcykge1xuICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAwO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRvTmV4dFN1YiQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9OZXh0U3ViJC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICAgIC8vIGlmIHNldCBhdXRvcGxheSwgdGhlbiB0aGUgaW5maW5pdGUgaXMgdHJ1ZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbmZpbml0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcbiAgfVxuICBwdWJsaWMgc2V0IGN1cnJlbnRJbmRleCh2YWx1ZSkge1xuICAgIC8vIGlmIG5vdyBpbmRleCBpZiBub3QgZXF1YWxlIHRvIHNhdmUgaW5kZXgsIGRvIHNvbWV0aW5nXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5vdCBjb250YWluIHdpdGggdGhlIGJvdW5kYXJ5IG5vdCBoYW5kbGVyd1xuICAgICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucnVuTG9vcCAmJiAhKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmVsbXMpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkgJiYgIXRoaXMuaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wRXZlbnQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jYWxsUmVzdGFydCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhbEluZGV4ID1cbiAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICA/IHRoaXMuY3VycmVudEluZGV4ICtcbiAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSArXG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICA6IHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5fc2hvd051bTtcbiAgICAgICAgaWYgKCF0aGlzLmluZmluaXRlICYmIHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd051bSAtXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wgPFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICAgICAgOiB0aGlzLnJlYWxJbmRleCAtXG4gICAgICAgICAgICAgICAgICB0aGlzLl9zaG93TnVtIC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmVsbXMubGVuZ3RoIC0gdGhpcy5fc2hvd051bSA8IDBcbiAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICA6IHRoaXMuZWxtcy5sZW5ndGggLSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZWxtcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID1cbiAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA8IDAgJiYgIXRoaXMuaW5maW5pdGUgPyAwIDogdGhpcy5jdXJyZW50SW5kZXg7XG4gICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaW5pdGlhbEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmRhdGEubGVuZ3RoIC0gdGhpcy5fc2hvd051bSAqIDQgKyB0aGlzLmN1cnJlbnRJbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMuX3Nob3dOdW0gKiAyKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPVxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuZGF0YS5sZW5ndGggKyB0aGlzLl9zaG93TnVtICogNDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aW1lcih0aGlzLmFuaVRpbWUgKyAxMDApXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgKHRoaXMucmVhbEluZGV4ID4gdGhpcy5lbG1zLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGNvdW50ID0gKHRoaXMucmVhbEluZGV4IC0gdGhpcy5lbG1zLmxlbmd0aCkgJSB0aGlzLl9zaG93TnVtO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCAtPSBjb3VudDtcbiAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmdyaWRCeS5jb2wgKiB0aGlzLmdyaWRCeS5yb3cgPiAxXG4gICAgICAgICAgICAgID8gdGhpcy5jdXJyZW50SW5kZXggK1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dOdW0gK1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTnVtICogdGhpcy5ncmlkQnkuY29sXG4gICAgICAgICAgICAgIDogdGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLl9zaG93TnVtO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIDAgPD0gdGhpcy5jdXJyZW50SW5kZXggJiZcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPD0gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaXNGcm9tQXV0byA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9ncmVzc1dpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3JncmVzc1dpZHRoO1xuICB9XG4gIHB1YmxpYyBzZXQgcHJvZ3Jlc3NXaWR0aCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnByb2dyZXNzRWxtICE9PSB1bmRlZmluZWQgJiYgdGhpcy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5fcG9yZ3Jlc3NXaWR0aCA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICh0aGlzLnByb2dyZXNzQ29udGFpbmVyRWxtLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNoaWxkcmVuWzBdLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICBgJHt0aGlzLnByb2dyZXNzV2lkdGh9JWAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgZ3JhYmJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyYWJiaW5nO1xuICB9XG4gIHB1YmxpYyBzZXQgZ3JhYmJpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZ3JhYmJpbmcgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2dyYWJiaW5nID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCAnZ3JhYmJpbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhbkNvdW50ID0gMDtcbiAgICAgICAgICB0aGlzLmNhbGxSZXN0YXJ0KCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sICdncmFiYmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfXB4KWAsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICBgdHJhbnNsYXRlWCgke3ZhbHVlfSUpYCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbWF4UmlnaHRJbmRleCgpIHtcbiAgICBsZXQgYWRkSW5kZXggPSAwO1xuICAgIHN3aXRjaCAodGhpcy5hbGlnbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGFkZEluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBhZGRJbmRleCA9ICh0aGlzLnNob3dOdW0gYXMgbnVtYmVyKSAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxIC0gdGhpcy5fc2hvd051bSArIDEgKyBhZGRJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJ1bkxvb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0b3BsYXkgfHwgdGhpcy5pbmZpbml0ZTtcbiAgfVxuICBwcml2YXRlIGdldCBsZW5ndGhPbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUVsbXMubGVuZ3RoID09PSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcm9vdEVsbVdpZHRoKCkge1xuICAgIHJldHVybiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpXG4gICAgICA/IHRoaXMucm9vdEVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgOiAxMDA7XG4gIH1cblxuICBwcml2YXRlIHNldCBjb250YWluZXJFbG1XaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXRTdHlsZSh0aGlzLmNvbnRhaW5lckVsbSwgJ3dpZHRoJywgdmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lckVsbScsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKCd2aWV3QXJlYScpIHB1YmxpYyB2aWV3QXJlYTogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkKCdwcmV2JywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5QcmV2OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduZXh0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBidG5OZXh0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdwcm9ncmVzcycsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgcHJvZ3Jlc3NDb250YWluZXJFbG06IEVsZW1lbnRSZWY7XG5cbiAgLy8gZ2V0IGFsbCBpdGVtIGVsbXNcbiAgQENvbnRlbnRDaGlsZHJlbihOZ3hBZHZhbmNlZENhcm91c2VsSXRlbURpcmVjdGl2ZSwge1xuICAgIGRlc2NlbmRhbnRzOiB0cnVlLFxuICAgIHJlYWQ6IEVsZW1lbnRSZWYsXG4gIH0pXG4gIHB1YmxpYyBpdGVtRWxtczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBDb250ZW50Q2hpbGQoJ2Nhcm91c2VsUHJldicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudFByZXY6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ2Nhcm91c2VsTmV4dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY29udGVudE5leHQ6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ2Nhcm91c2VsRG90JywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBkb3RFbG06IFRlbXBsYXRlUmVmPFxuICAgIGFueVxuICA+O1xuICBAQ29udGVudENoaWxkKCdjYXJvdXNlbEl0ZW1UZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwdWJsaWMgY2Fyb3VzZWxJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoJ2Nhcm91c2VsUHJvZ3Jlc3MnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHVibGljIHByb2dyZXNzRWxtOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHB1YmxpYyBfZGF0YTogYW55W107XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBtYXBwZWREYXRhOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogd2hlbiBpbmZpbml0ZSBpcyB0cnVlLCB0aGUgYW5pbWF0aW9uIHRpbWUgd2l0aCBpdGVtLCBkZWZhdWx0IGlzIDQwMC4gKi9cbiAgQElucHV0KCkgcHVibGljIGFuaVRpbWUgPSA0MDA7XG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIGluICNjb250YWluZXJFbG0gd2hlbiBtb2RlbCBjaGFuZ2UgKi9cbiAgQElucHV0KCkgcHVibGljIGFuaUNsYXNzID0gJ3RyYW5zaXRpb24nO1xuXG4gIC8qKiB0aGlzIGNsYXNzIHdpbGwgYWRkIHdoZW4gY2Fyb3VzZWwgYXV0byBwbGF5LFxuICAgKiB0aGlzIGRlZmF1bHQgYXV0b3BsYXkgYW5pbWF0aW9uIGlzIHNhbWUgYXMgYW5pQ2xhc3NcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmlDbGFzc0F1dG8gPSB0aGlzLmFuaUNsYXNzO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnc2hvdy1uZXh0LXByZXYtYnV0dG9ucycpIHB1YmxpYyBzaG93QnV0dG9uc01ldGhvZDpcbiAgICB8ICdhbHdheXMnXG4gICAgfCAnYXV0by1oaWRlJ1xuICAgIHwgJ2F1dG8tZGlzYWJsZScgPSAnYWx3YXlzJztcblxuICAvKipcbiAgICogdXNlciBtb3ZlIHBpY3R1cmUgd2l0aCB0aGUgY29udGFpbmVyIHdpZHRoIHJhdGUsXG4gICAqIHdoZW4gbW9yZSB0aGFuIHRoYXQgcmF0ZSwgaXQgd2lsbCBnbyB0byBuZXh0IG9yIHByZXYsXG4gICAqIHNldCBmYWxzZSB3aWxsIG5ldmVyIG1vdmUgd2l0aCBkaXN0YW5jZSByYXRlLFxuICAgKiBkZWZhdWx0IGlzIGAwLjE1YFxuICAgKi9cbiAgQElucHV0KCdwYW4tYm91bmRhcnknKSBwdWJsaWMgcGFuQm91bmRhcnk6IG51bWJlciB8IGZhbHNlID0gMC4xNTtcblxuICAvKiogd2hlbiBzaG93LW51bSBpcyBiaWdnZXIgdGhhbiAxLCB0aGUgZmlyc3QgaXRlbSBhbGlnbiwgZGVmYXVsdGUgaXMgYGNlbnRlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIGFsaWduOiAnbGVmdCcgfCAnY2VudGVyJyB8ICdyaWdodCcgPSAnY2VudGVyJztcblxuICAvKipcbiAgICogZGlzYWJsZSB3aGVuIGRyYWcgb2NjdXIgdGhlIGNoaWxkIGVsZW1lbnQgd2lsbCBmb2xsb3cgdG91Y2ggcG9pbnQuXG4gICAqIGRlZmF1bHQgaXMgYGZhbHNlYFxuICAgKi9cbiAgQElucHV0KCdub3QtZm9sbG93LXBhbicpIHB1YmxpYyBub3REcmFnID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHVibGljIHRyYWNrQnlLZXkgPSAnY29kZSc7XG4gIC8qKlxuICAgKiB0aGUgZXZlbnQgYmluZGluZyBzdGF0ZSBmb3Igc3RvcCBhdXRvIHBsYXkgd2hlbiBtb3Vyc2UgbW92ZW92ZXJcbiAgICovXG4gIEBJbnB1dCgnbW91cnNlLWVuYWJsZScpIHB1YmxpYyBtb3Vyc2VFbmFibGUgPSBmYWxzZTtcbiAgLyoqIGVhY2ggYXV0byBwbGF5IGJldHdlZW4gdGltZSAqL1xuICBASW5wdXQoJ2JldHdlZW4tZGVsYXknKSBwdWJsaWMgZGVsYXkgPSA4MDAwO1xuICAvKiogYXV0byBwbGF5IGRpcmVjdGlvbiwgZGVmYXVsdCBpcyBgcmlnaHRgLiAqL1xuICBASW5wdXQoJ2F1dG9wbGF5LWRpcmVjdGlvbicpIHB1YmxpYyBkaXJlY3Rpb246ICdsZWZ0JyB8ICdyaWdodCcgPSAncmlnaHQnO1xuICAvKiogaG93IG1hbnkgbnVtYmVyIHdpdGggZWFjaCBzY3JvbGwsIGRlZmF1bHQgaXMgYDFgLiAqL1xuICBASW5wdXQoJ3Njcm9sbC1udW0nKSBwdWJsaWMgc2Nyb2xsTnVtID0gMTtcbiAgLyoqIENvdWxkIHVzZXIgc2Nyb2xsIG1hbnkgaXRlbSBvbmNlLCBzaW11bGF0ZSB3aXRoIHNjcm9sbGJhciwgZGVmYXVsdCBpcyBgZmFsc2VgICovXG4gIEBJbnB1dCgnZHJhZy1tYW55JykgcHVibGljIGlzRHJhZ01hbnkgPSBmYWxzZTtcbiAgLyoqIE1pbmltYWwgdmVsb2NpdHkgcmVxdWlyZWQgYmVmb3JlIHJlY29nbml6aW5nLCB1bml0IGlzIGluIHB4IHBlciBtcywgZGVmYXVsdCBgMC4zYCAqL1xuICBASW5wdXQoJ3N3aXBlLXZlbG9jaXR5JykgcHVibGljIHN3aXBlVmVsb2NpdHkgPSAwLjM7XG5cbiAgLyoqXG4gICAqIHN3aXRjaCBzaG93IG51bWJlciB3aXRoIGN1c3RvbSBsb2dpYyBsaWtlIGNzcyBAbWVkaWEgKG1pbi13aWR0aDogYG51bWJlcmBweClcbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBicmVha3BvaW50OiBBcnJheTx7XG4gICAgZ3JpZEJ5PztcbiAgICBzY3JlZW5TaXplOiAneHhsJyB8ICd4bCcgfCAnbGcnIHwgJ21kJyB8ICdzbScgfCAneHMnO1xuICAgIG51bWJlcjtcbiAgICBzY3JvbGxOdW0/O1xuICB9PiA9IFtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBzY3JlZW5TaXplTWFwID0ge1xuICAgIHh4bDogMTQ0MCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuICAgIHhsOiAxMjAwLFxuICAgIGxnOiA5OTIsXG4gICAgbWQ6IDc2OCxcbiAgICBzbTogNTc2LFxuICAgIHhzOiAwLFxuICB9O1xuXG4gIHB1YmxpYyBsZWF2ZU9icyQgPSBtZXJnZShcbiAgICBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsICdtb3VzZXVwJyksXG4gICAgZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCAndG91Y2hlbmQnKSxcbiAgKS5waXBlKFxuICAgIHRhcCgoZTogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ3JhYmJpbmcgPSBmYWxzZTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSksXG4gICk7XG5cbiAgcHJpdmF0ZSBpc0Zyb21BdXRvID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc0F1dG9OdW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZU9uQ29udGFpbmVyID0gZmFsc2U7XG4gIHByaXZhdGUgYWxpZ25EaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgZWxtV2lkdGggPSAwO1xuXG4gIHByaXZhdGUgcm9vdEVsbTogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY29udGFpbmVyRWxtOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGVsbXM6IEFycmF5PEhUTUxFbGVtZW50PjtcblxuICBwcml2YXRlIGhhbW1lcjogSGFtbWVyLkhhbW1lck1hbmFnZXI7XG5cbiAgcHJpdmF0ZSBkb05leHRTdWIkOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZG9OZXh0OiBPYnNlcnZhYmxlPGFueT47XG5cbiAgcHJpdmF0ZSByZXN0YXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuICBwcml2YXRlIHNwZWVkQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdCg1MDAwKTtcbiAgcHJpdmF0ZSBzdG9wRXZlbnQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfcG9yZ3Jlc3NXaWR0aCA9IDA7XG4gIHByaXZhdGUgX2N1cnJlbnRJbmRleCA9IDA7XG4gIHB1YmxpYyBfc2hvd051bSA9IDE7XG4gIHByaXZhdGUgX2F1dG9wbGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgX2luZmluaXRlID0gZmFsc2U7XG4gIHByaXZhdGUgX2dyYWJiaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVEcmFnID0gZmFsc2U7XG4gIHB1YmxpYyBncmlkQnkgPSB7IGNvbDogMSwgcm93OiAxIH07XG5cbiAgcHJpdmF0ZSBwYW5Db3VudCA9IDA7XG5cbiAgLy8gdGhpcyB2YXJpYWJsZSB1c2UgZm9yIGNoZWNrIHRoZSBpbml0IHZhbHVlIGlzIHdyaXRlIHdpdGggbmdNb2RlbCxcbiAgLy8gd2hlbiBpbml0IGZpcnN0LCBub3Qgc2V0IHdpdGggYW5pbWF0aW9uXG5cbiAgcHVibGljIHJlYWxJbmRleCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuICBwdWJsaWMgd3JhcHBlcldpZHRoO1xuXG4gIHB1YmxpYyBzaW5nbGVUaW1lUnVuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpbml0aWFsSW5kZXggPSAwO1xuICBwdWJsaWMgb3JnaW5hbERhdGEgPSBbXTtcblxuICBwcml2YXRlIF9pbmZpbmVEYXRhQ291bnQgPSAwO1xuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucm9vdEVsbSA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbG0gPSB0aGlzLnJvb3RFbG0uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIGZvcmtKb2luKFtcbiAgICAgIC4uLnRoaXMuYmluZENsaWNrKCksXG4gICAgICAvLyB3aGVuIGl0ZW0gY2hhbmdlZCwgcmVtb3ZlIG9sZCBoYW1tZXIgYmluZGluZywgYW5kIHJlc2V0IHdpZHRoXG4gICAgICB0aGlzLml0ZW1FbG1zLmNoYW5nZXMucGlwZShcbiAgICAgICAgLy8gZGV0ZWN0Q2hhbmdlcyB0byBjaGFuZ2UgdmlldyBkb3RzXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gdGhpcy5pdGVtRWxtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyBpIGNhbid0IHBhc3MgdGhlIGNoYW5nZWRldGVjdGlvbiBjaGVjaywgb25seSB0aGUgd2F5IHRvIHVzaW5nIHRpbWVvdXQuIDooXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLml0ZW1FbG1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc1dpZHRoID0gMDtcbiAgICAgICAgfSksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLl9jZC5kZXRlY3RDaGFuZ2VzKCkpLFxuICAgICAgKSxcbiAgICAgIHJlc2l6ZU9ic2VydmFibGUodGhpcy5yb290RWxtLCAoKSA9PiB0aGlzLmNvbnRhaW5lclJlc2l6ZSgpKSxcbiAgICBdKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG4gIHByaXZhdGUgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5pbml0VmFyaWFibGUoKTtcbiAgICB0aGlzLnNldFZpZXdXaWR0aCh0cnVlKTtcbiAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlRHJhZykge1xuICAgICAgdGhpcy5oYW1tZXIgPSB0aGlzLmJpbmRIYW1tZXIoKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3Vmlldyh0aGlzLmN1cnJlbnRJbmRleCwgZmFsc2UpO1xuICAgIC8qIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMucnVuTG9vcCkge1xuICAgICAgdGhpcy5hZGRJbmZpbml0ZUVsbSgpO1xuICAgIH0gKi9cbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3RvcnlIYW1tZXIoKTtcblxuICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICB0aGlzLmRvTmV4dFN1YiQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3RvcnlIYW1tZXIoKSB7XG4gICAgaWYgKHRoaXMuaGFtbWVyKSB7XG4gICAgICB0aGlzLmhhbW1lci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb250YWluZXJSZXNpemUoKSB7XG4gICAgdGhpcy5zZXRWaWV3V2lkdGgoKTtcbiAgICB0aGlzLnJlU2V0QWxpZ25EaXN0YW5jZSgpO1xuXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmluaXRpYWxJbmRleDtcblxuICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFZhcmlhYmxlKCkge1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5lbG1zID0gdGhpcy5pdGVtRWxtcy50b0FycmF5KCkubWFwKCh4KSA9PiB4Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICBsZXQgc3RhcnRFdmVudCA9IHRoaXMucmVzdGFydC5hc09ic2VydmFibGUoKTtcbiAgICAgIGxldCBzdG9wRXZlbnQgPSB0aGlzLnN0b3BFdmVudC5hc09ic2VydmFibGUoKTtcbiAgICAgIGlmICh0aGlzLm1vdXJzZUVuYWJsZSkge1xuICAgICAgICBzdGFydEV2ZW50ID0gbWVyZ2UoXG4gICAgICAgICAgc3RhcnRFdmVudCxcbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5jb250YWluZXJFbG0sICdtb3VzZWxlYXZlJykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5ncmFiYmluZyksXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IGZhbHNlKSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgICAgc3RvcEV2ZW50ID0gbWVyZ2UoXG4gICAgICAgICAgc3RvcEV2ZW50LFxuICAgICAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRhaW5lckVsbSwgJ21vdXNlb3ZlcicpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKCkgPT4gKHRoaXMubW91c2VPbkNvbnRhaW5lciA9IHRydWUpKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRvTmV4dCA9IHN0YXJ0RXZlbnQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuc3BlZWRDaGFuZ2UpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICB0aW1lcih0aGlzLmRlbGF5KS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMucnVuUHJvZ3Jlc3MoMjApKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNGcm9tQXV0byA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggLT0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggKz0gdGhpcy5zY3JvbGxOdW07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGFrZVVudGlsKHN0b3BFdmVudC5waXBlKHRhcCgoKSA9PiAodGhpcy5wcm9ncmVzc1dpZHRoID0gMCkpKSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuZG9OZXh0U3ViJCA9IHRoaXMuZG9OZXh0LnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZVNldEFsaWduRGlzdGFuY2UoKSB7XG4gICAgc3dpdGNoICh0aGlzLmFsaWduKSB7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSAodGhpcy5yb290RWxtV2lkdGggLSB0aGlzLmVsbVdpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMuYWxpZ25EaXN0YW5jZSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgPSB0aGlzLnJvb3RFbG1XaWR0aCAtIHRoaXMuZWxtV2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Vmlld1dpZHRoKGlzSW5pdD86IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5pc0F1dG9OdW0pIHtcbiAgICAgIHRoaXMuX3Nob3dOdW0gPSB0aGlzLmdldEF1dG9OdW0oKTtcbiAgICAgIHRoaXMuX2luZmluZURhdGFDb3VudCA9IHRoaXMuX3Nob3dOdW0gKiAyO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lckVsbSwgJ2dyYWInKTtcbiAgICBpZiAoaXNJbml0KSB7XG4gICAgICAvLyByZW1haW4gb25lIGVsbSBoZWlnaHRcbiAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5faW5maW5lRGF0YUNvdW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCAnbmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwJyk7XG4gICAgfVxuICAgIHRoaXMuZWxtV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aCAvICh0aGlzLl9zaG93TnVtIC8gdGhpcy5ncmlkQnkuY29sKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgdGhpcy5jb250YWluZXJFbG0sXG4gICAgICAnbmd4LWFkdmFuY2VkLWNhcm91c2VsLWRpc3BsYXktbm93cmFwJyxcbiAgICApO1xuXG4gICAgdGhpcy5jb250YWluZXJFbG1XaWR0aCA9XG4gICAgICAodGhpcy5lbG1XaWR0aCAvIHRoaXMuZ3JpZEJ5LmNvbCkgKiB0aGlzLmVsbXMubGVuZ3RoO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXJFbG0sICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgIHRoaXMudmlld0FyZWEuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgYHdpZHRoOiR7XG4gICAgICAgICAgKHRoaXMucm9vdEVsbVdpZHRoICogdGhpcy5zY3JvbGxOdW0gKiB0aGlzLmdyaWRCeS5jb2wpIC8gdGhpcy5fc2hvd051bVxuICAgICAgICB9cHhgLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxtcy5mb3JFYWNoKChlbG06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFN0eWxlKGVsbSwgJ3dpZHRoJywgdGhpcy5lbG1XaWR0aCk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGJpbmRIYW1tZXIoKSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgaG0gPSBuZXcgSGFtbWVyLk1hbmFnZXIodGhpcy5jb250YWluZXJFbG0pO1xuXG4gICAgICBjb25zdCBwYW4gPSBuZXcgSGFtbWVyLlBhbih7XG4gICAgICAgIGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICB9KTtcblxuICAgICAgaG0uYWRkKHBhbik7XG5cbiAgICAgIGhtLm9uKCdwYW5sZWZ0IHBhbnJpZ2h0IHBhbmVuZCBwYW5jYW5jZWwnLCAoZTogSGFtbWVyLkhhbW1lcklucHV0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aE9uZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyVHJhbnNpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFdmVudC5uZXh0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3BhbmxlZnQnOlxuICAgICAgICAgIGNhc2UgJ3BhbnJpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucGFuQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBhbkNvdW50IDwgMikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhYmJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gIT09ICdjZW50ZXInICYmIHRoaXMuc2hvd051bSA+PSB0aGlzLmVsbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRoaXMuaGFtbWVyLnN0b3AodHJ1ZSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHRoaXMub3V0T2ZCb3VuZChlLnR5cGUpKSB7XG4gICAgICAgICAgICAgIGUuZGVsdGFYICo9IDAuMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm5vdERyYWcpIHtcbiAgICAgICAgICAgICAgdGhpcy5sZWZ0ID1cbiAgICAgICAgICAgICAgICAtdGhpcy5jdXJyZW50SW5kZXggKiB0aGlzLmVsbVdpZHRoICtcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduRGlzdGFuY2UgK1xuICAgICAgICAgICAgICAgIGUuZGVsdGFYO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNEcmFnTWFueSkge1xuICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIDAuNSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4IC09IHRoaXMuc2Nyb2xsTnVtO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnNjcm9sbE51bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oYW1tZXIuc3RvcCh0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhbmNhbmNlbCc6XG4gICAgICAgICAgICB0aGlzLmRyYXdWaWV3KHRoaXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAncGFuZW5kJzpcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5wYW5Cb3VuZGFyeSAhPT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgTWF0aC5hYnMoZS5kZWx0YVgpID4gdGhpcy5lbG1XaWR0aCAqIHRoaXMucGFuQm91bmRhcnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBtb3ZlTnVtID0gdGhpcy5pc0RyYWdNYW55XG4gICAgICAgICAgICAgICAgPyBNYXRoLmNlaWwoTWF0aC5hYnMoZS5kZWx0YVgpIC8gdGhpcy5lbG1XaWR0aClcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTnVtO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gbW92ZU51bTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5jdXJyZW50SW5kZXggKyBtb3ZlTnVtO1xuXG4gICAgICAgICAgICAgIGlmIChlLmRlbHRhWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvUHJldihwcmV2SW5kZXgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29OZXh0KG5leHRJbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLXRoaXMuc3dpcGVWZWxvY2l0eSAmJiBlLmRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgdGhpcy5nb05leHQodGhpcy5jdXJyZW50SW5kZXggKyB0aGlzLnNjcm9sbE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYID4gdGhpcy5zd2lwZVZlbG9jaXR5ICYmIGUuZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICB0aGlzLmdvUHJldih0aGlzLmN1cnJlbnRJbmRleCAtIHRoaXMuc2Nyb2xsTnVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhd1ZpZXcodGhpcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaG07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdvUHJldihwcmV2SW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5ydW5Mb29wICYmIHByZXZJbmRleCA8IDApIHtcbiAgICAgIHByZXZJbmRleCA9IDA7XG4gICAgICB0aGlzLmRyYXdWaWV3KDApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHByZXZJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgZ29OZXh0KG5leHRJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnJ1bkxvb3AgJiYgbmV4dEluZGV4ID4gdGhpcy5tYXhSaWdodEluZGV4KSB7XG4gICAgICBuZXh0SW5kZXggPSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICB0aGlzLmRyYXdWaWV3KG5leHRJbmRleCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gbmV4dEluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuYnRuTmV4dCAmJiB0aGlzLmJ0blByZXYpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0bk5leHQubmF0aXZlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4gKHRoaXMuY3VycmVudEluZGV4ICs9IHRoaXMuc2Nyb2xsTnVtKSksXG4gICAgICAgICksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLmJ0blByZXYubmF0aXZlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuY3VycmVudEluZGV4IC0gdGhpcy5zY3JvbGxOdW0pO1xuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxsUmVzdGFydCgpIHtcbiAgICBpZiAodGhpcy5hdXRvcGxheSAmJiAhdGhpcy5tb3VzZU9uQ29udGFpbmVyICYmICF0aGlzLmdyYWJiaW5nKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXN0YXJ0Lm5leHQobnVsbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYXdWaWV3KFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgaXNBbmltYXRpb24gPSB0cnVlLFxuICAgIGlzRnJvbUF1dG8gPSB0aGlzLmlzRnJvbUF1dG8sXG4gICkge1xuICAgIGlmICh0aGlzLmVsbXMubGVuZ3RoID4gMSAmJiB0aGlzLmVsbXMubGVuZ3RoID4gdGhpcy5fc2hvd051bSkge1xuICAgICAgdGhpcy5yZW1vdmVDb250YWluZXJUcmFuc2l0aW9uKCk7XG4gICAgICB0aGlzLmxlZnQgPSAtKGluZGV4ICogdGhpcy5lbG1XaWR0aCAtIHRoaXMuYWxpZ25EaXN0YW5jZSk7XG5cbiAgICAgIGlmIChpc0FuaW1hdGlvbikge1xuICAgICAgICBpZiAoaXNGcm9tQXV0bykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVmdCA9IHRoaXMuYWxpZ25EaXN0YW5jZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNvbnRhaW5lclRyYW5zaXRpb24oKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJFbG0sIHRoaXMuYW5pQ2xhc3MpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyRWxtLCB0aGlzLmFuaUNsYXNzQXV0byk7XG4gIH1cblxuICBwcml2YXRlIG91dE9mQm91bmQodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAncGFubGVmdCc6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLm1heFJpZ2h0SW5kZXg7XG4gICAgICBjYXNlICdwYW5yaWdodCc6XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCA8PSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuUHJvZ3Jlc3MoYmV0d2VlblRpbWUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGhvd1RpbWVzID0gdGhpcy5zcGVlZCAvIGJldHdlZW5UaW1lO1xuICAgICAgY29uc3QgZXZlcnlJbmNyZWFzZSA9ICgxMDAgLyB0aGlzLnNwZWVkKSAqIGJldHdlZW5UaW1lO1xuICAgICAgcmV0dXJuIGludGVydmFsKGJldHdlZW5UaW1lKS5waXBlKFxuICAgICAgICB0YXAoKHQpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSAodCAlIGhvd1RpbWVzKSAqIGV2ZXJ5SW5jcmVhc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBidWZmZXJDb3VudChNYXRoLnJvdW5kKGhvd1RpbWVzKSwgMCksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdERhdGEoc2hvd051bSkge1xuICAgIGlmICghdGhpcy5vcmdpbmFsRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMub3JnaW5hbERhdGEgPSBbLi4udGhpcy5kYXRhXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbmZpbml0ZSkge1xuICAgICAgdGhpcy5zaW5nbGVUaW1lUnVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5Q3JlYXRvcih0aGlzLm9yZ2luYWxEYXRhLCBzaG93TnVtKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IHNob3dOdW07XG4gICAgICB0aGlzLmluaXRpYWxJbmRleCA9IHRoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXV0b051bSgpIHtcbiAgICBjb25zdCBjdXJyV2lkdGggPSB0aGlzLnJvb3RFbG1XaWR0aDtcbiAgICBpZiAodGhpcy5icmVha3BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMuYnJlYWtwb2ludC5maW5kKChiKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlblNpemVNYXBbYi5zY3JlZW5TaXplXSA8PSBjdXJyV2lkdGg7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3cpIHtcbiAgICAgICAgaWYgKG5vdy5ncmlkQnkpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5ncmlkQnkuY29sIHx8IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IG5vdy5ncmlkQnk7XG4gICAgICAgICAgY29uc3Qgc2hvd051bSA9IG5vdy5ncmlkQnkuY29sICogbm93LmdyaWRCeS5yb3cgfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICByZXR1cm4gc2hvd051bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbE51bSA9IG5vdy5zY3JvbGxOdW0gfHwgbm93Lm51bWJlcjtcbiAgICAgICAgICB0aGlzLmdyaWRCeSA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICAgICAgICByZXR1cm4gbm93Lm51bWJlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgfHxcbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLnNjcm9sbE51bSB8fFxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0ubnVtYmVyO1xuICAgICAgICB0aGlzLmdyaWRCeSA9IHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uZ3JpZEJ5O1xuICAgICAgICBjb25zdCBzaG93TnVtID1cbiAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRbdGhpcy5icmVha3BvaW50Lmxlbmd0aCAtIDFdLmdyaWRCeS5jb2wgKlxuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5ncmlkQnkucm93IHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHJldHVybiBzaG93TnVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxOdW0gPVxuICAgICAgICAgIHRoaXMuYnJlYWtwb2ludFt0aGlzLmJyZWFrcG9pbnQubGVuZ3RoIC0gMV0uc2Nyb2xsTnVtIHx8XG4gICAgICAgICAgdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICAgIHRoaXMuZ3JpZEJ5ID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5icmVha3BvaW50W3RoaXMuYnJlYWtwb2ludC5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaW5pdE51bSA9IDM7XG4gICAgaWYgKGN1cnJXaWR0aCA+IDIwMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoaW5pdE51bSArIGN1cnJXaWR0aCAvIDEwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluaXROdW07XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxtLCBzdHlsZSwgYCR7dmFsdWV9JWApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmFja0J5RmNuKGluZGV4LCBpdGVtKSB7XG4gICAgaWYgKCFpdGVtIHx8IGl0ZW1bdGhpcy50cmFja0J5S2V5XSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpdGVtW3RoaXMudHJhY2tCeUtleV07XG4gIH1cblxuICBwdWJsaWMgYXJyYXlDcmVhdG9yKGFyciwgY291bnQpIHtcbiAgICBjb25zdCBkYXRhID0gWy4uLmFycl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBkYXRhLnVuc2hpZnQoYXJyW2Fyci5sZW5ndGggLSAxIC0gKGkgJSBhcnIubGVuZ3RoKV0pO1xuICAgICAgZGF0YS5wdXNoKGFycltpICUgYXJyLmxlbmd0aF0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIiwiPGRpdiAjY29udGFpbmVyRWxtIGNsYXNzPVwiY2Fyb3VzZWxcIj5cbiAgPCEtLSBtYWluIGNvbnRlbnQgLS0+XG4gIDxkaXYgbmd4LWFkdmFuY2VkLWNhcm91c2VsLWNvbnRhaW5lciBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIml0ZW0gY3Vyc29yLXBvaW50ZXIgdmlzaWJsZV9pbXBvcnRhbnRcIlxuICAgICAgbmd4LWFkdmFuY2VkLWNhcm91c2VsLWl0ZW1cbiAgICAgICpuZ0Zvcj1cImxldCBfeCBvZiBkYXRhOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5RmNuXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwic2xpZGVcIlxuICAgICAgICBbbmdDbGFzc109XCJncmlkQnkuY29sICE9IDEgfHwgZ3JpZEJ5LnJvdyAhPSAxID8gJ2ZsZXgtd3JhcCcgOiAnJ1wiXG4gICAgICAgICN2aWV3QXJlYVxuICAgICAgICAqbmdJZj1cImkgJSAoc2Nyb2xsTnVtICogZ3JpZEJ5LnJvdykgPT09IDBcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgKm5nRm9yPVwiXG4gICAgICAgICAgICBsZXQgaXRlbSBvZiBkYXRhIHwgc2xpY2U6IGk6aSArIHNjcm9sbE51bSAqIGdyaWRCeS5yb3c7XG4gICAgICAgICAgICBsZXQgaiA9IGluZGV4XG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICAgICAgICAgIGNhcm91c2VsSXRlbVRlbXBsYXRlO1xuICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgJGltcGxpY2l0OiBpdGVtXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8IS0tIGxlZnQgLS0+XG4gIDxkaXZcbiAgICAjcHJldlxuICAgICpuZ0lmPVwiY29udGVudFByZXZcIlxuICAgIGNsYXNzPVwiZGlyZWN0aW9uIGxlZnRcIlxuICAgIFtuZ0NsYXNzXT1cIltcbiAgICAgIHNob3dCdXR0b25zTWV0aG9kICE9PSAnYXV0by1oaWRlJyB8fFxuICAgICAgKHNob3dCdXR0b25zTWV0aG9kID09PSAnYXV0by1oaWRlJyAmJiBjdXJyZW50SW5kZXggPiAwKVxuICAgICAgICA/ICd2aXNpYmxlJ1xuICAgICAgICA6ICdpbnZpc2libGUnLFxuICAgICAgc2hvd0J1dHRvbnNNZXRob2QgIT09ICdhdXRvLWRpc2FibGUnIHx8XG4gICAgICAoc2hvd0J1dHRvbnNNZXRob2QgPT09ICdhdXRvLWRpc2FibGUnICYmIGN1cnJlbnRJbmRleCA+IDApXG4gICAgICAgID8gJydcbiAgICAgICAgOiAnZGlzYWJsZWQnXG4gICAgXVwiXG4gID5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFByZXZcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG4gIDwhLS0gIHJpZ2h0IC0tPlxuICA8ZGl2XG4gICAgI25leHRcbiAgICAqbmdJZj1cImNvbnRlbnROZXh0XCJcbiAgICBjbGFzcz1cImRpcmVjdGlvbiByaWdodFwiXG4gICAgW25nQ2xhc3NdPVwiW1xuICAgICAgc2hvd0J1dHRvbnNNZXRob2QgIT09ICdhdXRvLWhpZGUnIHx8XG4gICAgICAoc2hvd0J1dHRvbnNNZXRob2QgPT09ICdhdXRvLWhpZGUnICYmIHJlYWxJbmRleCA8IGRhdGEubGVuZ3RoKVxuICAgICAgICA/ICd2aXNpYmxlJ1xuICAgICAgICA6ICdpbnZpc2libGUnLFxuICAgICAgc2hvd0J1dHRvbnNNZXRob2QgIT09ICdhdXRvLWRpc2FibGUnIHx8XG4gICAgICAoc2hvd0J1dHRvbnNNZXRob2QgPT09ICdhdXRvLWRpc2FibGUnICYmIHJlYWxJbmRleCA8IGRhdGEubGVuZ3RoKVxuICAgICAgICA/ICcnXG4gICAgICAgIDogJ2Rpc2FibGVkJ1xuICAgIF1cIlxuICA+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnROZXh0XCI+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuICA8IS0tIGluZGljYXRvcnMgLS0+XG4gIDx1bCBjbGFzcz1cImluZGljYXRvcnNcIiAqbmdJZj1cImRvdEVsbVwiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgZG90IG9mIGl0ZW1FbG1zOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cImN1cnJlbnRJbmRleCA9IGlcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICBkb3RFbG07XG4gICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgJGltcGxpY2l0OiB7XG4gICAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgICBjdXJyZW50SW5kZXg6IGN1cnJlbnRJbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXCJcbiAgICAgID5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbGk+XG4gIDwvdWw+XG4gIDwhLS0gcHJvZ3Jlc3MgLS0+XG4gIDxkaXYgKm5nSWY9XCJwcm9ncmVzc0VsbSAmJiBhdXRvcGxheVwiICNwcm9ncmVzcz5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicHJvZ3Jlc3NFbG1cIj4gPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJtYXNrXCIgKm5nSWY9XCJncmFiYmluZ1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsZWF2ZU9icyQgfCBhc3luY1wiPjwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19