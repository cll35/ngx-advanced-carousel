import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  BehaviorSubject,
  forkJoin,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
  timer,
} from "rxjs";
import {
  bufferCount,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs/operators";
import { NgxAdvancedCarouselItemDirective } from "./ngx-advanced-carousel-item.directive";
import { resizeObservable } from "./rxjs.observable.resize";
declare var Hammer;
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "ngx-advanced-carousel",
  styleUrls: ["./ngx-advanced-carousel.component.scss"],
  templateUrl: "./ngx-advanced-carousel.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxAdvancedCarouselComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxAdvancedCarouselComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input()
  public get data() {
    return this._data;
  }
  public set data(value) {
    this._data = value;
  }
  /** disable drag event with touch and mouse pan moving, default is `false` */
  @Input("disable-drag")
  public get disableDrag() {
    return this._disableDrag;
  }
  public set disableDrag(value) {
    if (this.rootElm) {
      if (this._disableDrag !== value) {
        if (value) {
          this.destoryHammer();
        } else {
          this.hammer = this.bindHammer();
        }
      }
    }
    this._disableDrag = value;
  }

  /** is the carousel can move infinite */
  @Input("infinite")
  public get infinite() {
    return this._infinite;
  }
  public set infinite(value) {
    this._infinite = value;

    /* this.infiniteElmRefs.forEach((ref) => {
      this.addStyle(ref.rootNodes[0], {
        visibility: this.runLoop ? 'visible' : 'hidden',
      });
    }); */
  }

  /** auto play speed */
  @Input("autoplay-speed")
  public get speed() {
    return this.speedChange.value;
  }
  public set speed(value) {
    this._zone.runOutsideAngular(() => {
      this.speedChange.next(value);
    });
  }

  /**
   * how many number items to show once, default is `1`
   * set `auto` to using `[breakpoint]` set value.
   */
  @Input("show-num")
  public get showNum(): number | "auto" {
    return this._showNum;
  }
  public set showNum(value: number | "auto") {
    if (value === "auto") {
      this.isAutoNum = true;
    } else {
      this._showNum = +value;
      this.realIndex = this._showNum;
      if (this.rootElm) {
        if (!this.verticalModeEnabled) {
          this.setViewWidth();
        } else {
          this.setViewHeight();
        }
        this.reSetAlignDistance();
      }
      this.currentIndex = this.startIndex;
    }
  }

  /** carousel auto play confing */
  @Input("autoplay")
  public get autoplay() {
    return this._autoplay;
  }
  public set autoplay(value) {
    this._autoplay =
      this.data && this.data.length > this.showNum ? value : false;
    if (isPlatformBrowser(this.platformId)) {
      if (this.elms) {
        this.progressWidth = 0;
        if (value) {
          this._zone.runOutsideAngular(() => {
            this.doNextSub$ = this.doNext.subscribe();
          });
        } else {
          if (this.doNextSub$) {
            this.doNextSub$.unsubscribe();
          }
        }
      }
    }
    // if set autoplay, then the infinite is true
    if (value) {
      this.infinite =
        this.data && this.data.length > this.showNum ? value : false;
    }
  }

  @Input() public verticalModeEnabled = false;

  public get currentIndex() {
    return this._currentIndex;
  }
  public set currentIndex(value) {
    // if now index if not equale to save index, do someting
    if (this.currentIndex !== value) {
      // if the value is not contain with the boundary not handlerw
      if (value < 0) {
        value = 0;
      }
      if (
        !this.itemElms ||
        (!this.runLoop && !(0 <= value && value <= this.itemElms.length - 1) ||
        (this.data && this.data.length < this._showNum ))
      ) {
        this.drawView(this.currentIndex);
        return;
      }
      const dir = this._currentIndex > value ? -1 : 1;
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
          } else {
            this._currentIndex =
              this.elms.length - this._showNum < 0
                ? 0
                : this.elms.length - this._showNum;
          }
          this.realIndex =
            dir > 0
              ? Math.ceil(
                  this.currentIndex / this._showNum +
                    (this.currentIndex % this._showNum ? 0 : 1)
                ) >= Math.ceil(this.elms.length / this._showNum)
                ? this.elms.length
                : this.currentIndex
              : this.currentIndex;
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
          this._zone.runOutsideAngular(() => {
            timer(this.aniTime + 100)
              .pipe(
                switchMap(() => {
                  this.drawView(this.currentIndex, false);
                  return of(null);
                }),
                take(1)
              )
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
      if (
        0 <= this.currentIndex &&
        this.currentIndex <= this.itemElms.length - 1
      ) {
        this._zone.run(() => {
          this.onChange(this.currentIndex);
          this._cd.detectChanges();
        });
      }
    }
    this.indexChanged.emit({
      realIndex: this.realIndex,
      currentIndex: this.currentIndex,
      viewSize: this._showNum,
    });
    this.isFromAuto = false;
  }

  public get progressWidth() {
    return this._porgressWidth;
  }
  public set progressWidth(value) {
    if (this.progressElm !== undefined && this.autoplay) {
      this._porgressWidth = value;
      this._renderer.setStyle(
        (this.progressContainerElm.nativeElement as HTMLElement).children[0],
        "width",
        `${this.progressWidth}%`
      );
    }
  }

  public get grabbing() {
    return this._grabbing;
  }
  public set grabbing(value: boolean) {
    if (this._grabbing !== value) {
      this._zone.run(() => {
        this._grabbing = value;
        if (value) {
          this._renderer.addClass(this.containerElm, "grabbing");
        } else {
          this.panCount = 0;
          this.callRestart();
          this._renderer.removeClass(this.containerElm, "grabbing");
        }
        this._cd.detectChanges();
      });
    }
  }

  private set left(value: number) {
    if (!this.verticalModeEnabled) {
      if (isPlatformBrowser(this.platformId)) {
        this._renderer.setStyle(
          this.containerElm,
          "transform",
          `translateX(${
            (value + (this.currentIndex !== 0 ? this.padding : 0)) *
            (this.align === "right" ? -1 : 1)
          }px)`
        );
      } else {
        this._renderer.setStyle(
          this.containerElm,
          "transform",
          `translateX(${value}%)`
        );
      }
    } else {
      if (isPlatformBrowser(this.platformId)) {
        this._renderer.setStyle(
          this.containerElm,
          "transform",
          `translateY(${
            value + (this.currentIndex !== 0 ? this.padding : 0)
          }px)`
        );
      } else {
        this._renderer.setStyle(
          this.containerElm,
          "transform",
          `translateY(${value}%)`
        );
      }
    }
  }

  private get maxRightIndex() {
    let addIndex = 0;
    switch (this.align) {
      case "left":
        addIndex = 0;
        break;
      case "center":
        addIndex = (this.showNum as number) - 1;
        break;
      case "right":
        addIndex = 0;
        break;
      default:
        addIndex = 0;
        break;
    }
    return this.itemElms.length - 1 - this._showNum + 1 + addIndex;
  }

  private get runLoop() {
    return this.autoplay || this.infinite;
  }
  private get lengthOne() {
    return this.itemElms.length === 1;
  }

  private get rootElmWidth() {
    return isPlatformBrowser(this.platformId)
      ? this.rootElm.getBoundingClientRect().width
      : 100;
  }

  private get rootElmHeight() {
    return isPlatformBrowser(this.platformId)
      ? this.rootElm.getBoundingClientRect().height
      : 100;
  }

  private set containerElmWidth(value: number) {
    if (!this.verticalModeEnabled) {
      this.setStyle(this.containerElm, "width", value);
    } else {
      this.containerElmHeight = value;
    }
  }

  private set containerElmHeight(value: number) {
    this.setStyle(this.containerElm, "height", value);
  }

  @Output() public indexChanged: EventEmitter<any> = new EventEmitter();

  private _startIndex = 0;

  @Input()
  private get startIndex() {
    return this._startIndex;
  }
  private set startIndex(val) {
    this._startIndex = val;
    this.currentIndex = this._startIndex;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private _document,
    private _renderer: Renderer2,
    private _zone: NgZone,
    private _cd: ChangeDetectorRef
  ) {}
  @ViewChild("containerElm", { static: false }) public container: ElementRef;
  @ViewChildren("viewArea") public viewArea: QueryList<ElementRef>;
  @ViewChild("prev", { static: false }) public btnPrev: ElementRef;
  @ViewChild("next", { static: false }) public btnNext: ElementRef;
  @ViewChild("progress", { static: false })
  public progressContainerElm: ElementRef;

  // get all item elms
  @ContentChildren(NgxAdvancedCarouselItemDirective, {
    descendants: true,
    read: ElementRef,
  })
  public itemElms: QueryList<ElementRef>;

  @ContentChild("carouselPrev", { static: false })
  public contentPrev: TemplateRef<any>;
  @ContentChild("carouselNext", { static: false })
  public contentNext: TemplateRef<any>;
  @ContentChild("carouselDot", { static: false })
  public dotElm: TemplateRef<any>;
  @ContentChild("carouselItemTemplate", { static: false })
  public carouselItemTemplate: TemplateRef<any>;
  @ContentChild("carouselProgress", { static: false })
  public progressElm: TemplateRef<any>;

  public _data: any[];

  @Output() public mappedData: EventEmitter<any[]> = new EventEmitter();
  /** when infinite is true, the animation time with item, default is 400. */
  @Input() public aniTime = 400;
  /** this class will add in #containerElm when model change */
  @Input() public aniClass = "transition";

  /** this class will add when carousel auto play,
   * this default autoplay animation is same as aniClass
   */
  @Input() public aniClassAuto = this.aniClass;

  // tslint:disable-next-line: no-input-rename
  @Input("show-next-prev-buttons") public showButtonsMethod:
    | "always"
    | "auto-hide"
    | "auto-disable" = "always";

  /**
   * user move picture with the container width rate,
   * when more than that rate, it will go to next or prev,
   * set false will never move with distance rate,
   * default is `0.15`
   */
  @Input("pan-boundary") public panBoundary: number | false = 0.15;

  /** when show-num is bigger than 1, the first item align, defaulte is `center` */
  @Input() public align: "left" | "center" | "right" | "top" | "bottom" =
    "center";

  /**
   * disable when drag occur the child element will follow touch point.
   * default is `false`
   */
  @Input("not-follow-pan") public notDrag = false;

  @Input() public trackByKey = "code";
  /**
   * the event binding state for stop auto play when mourse moveover
   */
  @Input("mourse-enable") public mourseEnable = false;
  /** each auto play between time */
  @Input("between-delay") public delay = 8000;
  /** auto play direction, default is `right`. */
  @Input("autoplay-direction") public direction: "left" | "right" = "right";
  /** how many number with each scroll, default is `1`. */
  @Input("scroll-num") public scrollNum = 1;
  /** Could user scroll many item once, simulate with scrollbar, default is `false` */
  @Input("drag-many") public isDragMany = false;
  /** Minimal velocity required before recognizing, unit is in px per ms, default `0.3` */
  @Input("swipe-velocity") public swipeVelocity = 0.3;

  @Input() public isRtl = false;
  /**
   * switch show number with custom logic like css @media (min-width: `number`px)
   */
  @Input() public breakpoint: Array<{
    gridBy?;
    screenSize: "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
    number;
    scrollNum?;
    padding?;
  }> = [];

  @Input() public screenSizeMap = {
    xxl: 1440,
    // tslint:disable-next-line: object-literal-sort-keys
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 0,
  };

  @Input() padding: number = 0;

  public leaveObs$ = merge(
    fromEvent(this._document, "mouseup"),
    fromEvent(this._document, "touchend")
  ).pipe(
    tap((e: Event) => {
      this.grabbing = false;
      e.stopPropagation();
      e.preventDefault();
    })
  );

  private isFromAuto = true;
  private isAutoNum = false;
  private mouseOnContainer = false;
  private alignDistance = 0;
  private elmWidth = 0;
  private elmHeight = 0;

  private rootElm: HTMLElement;
  private containerElm: HTMLElement;

  private elms: Array<HTMLElement>;

  private hammer;

  private doNextSub$: Subscription;
  private doNext: Observable<any>;

  private restart = new BehaviorSubject<any>(null);
  private speedChange = new BehaviorSubject(5000);
  private stopEvent = new Subject<any>();
  private destroy$ = new Subject<any>();

  private _porgressWidth = 0;
  private _currentIndex = 0;
  public _showNum = 1;
  private _autoplay = false;
  private _infinite = false;
  private _grabbing = false;
  private _disableDrag = false;
  public gridBy = { col: 1, row: 1 };

  private panCount = 0;

  // this variable use for check the init value is write with ngModel,
  // when init first, not set with animation

  public realIndex = this._currentIndex;

  public wrapperWidth;

  public singleTimeRun = true;
  private initialIndex = 0;
  public originalData = [];

  private _infineDataCount = 0;
  public ngAfterViewInit() {
    this.rootElm = this.container.nativeElement;
    this.containerElm = this.rootElm.children[0] as HTMLElement;

    this.init();

    forkJoin([
      ...this.bindClick(),
      // when item changed, remove old hammer binding, and reset width
      this.itemElms.changes.pipe(
        // detectChanges to change view dots
        tap(() => {
          this.destroy();
          this.init();
          this.progressWidth = 0;
        }),
        tap(() => this._cd.detectChanges())
      ),
      resizeObservable(this.rootElm, () => this.containerResize()),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy();
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public writeValue(value: any) {
    if (value || value === 0) {
      this.currentIndex = value;
    }
  }

  public registerOnChange(fn: (value: any) => any) {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }
  private onChange = (_: any) => {};
  private onTouched = () => {};

  private init() {
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

  private destroy() {
    this.destoryHammer();

    if (this.autoplay) {
      this.doNextSub$.unsubscribe();
    }
  }

  private destoryHammer() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  private containerResize() {
    this.setViewWidth();
    this.reSetAlignDistance();

    this.currentIndex = this.startIndex || this.initialIndex;

    this.drawView(this.currentIndex, false);
  }

  private initVariable() {
    this._zone.runOutsideAngular(() => {
      this.elms = this.itemElms.toArray().map((x) => x.nativeElement);

      let startEvent = this.restart.asObservable();
      let stopEvent = this.stopEvent.asObservable();
      if (this.mourseEnable) {
        startEvent = merge(
          startEvent,
          fromEvent(this.containerElm, "mouseleave").pipe(
            filter(() => !this.grabbing),
            tap(() => (this.mouseOnContainer = false))
          )
        );
        stopEvent = merge(
          stopEvent,
          fromEvent(this.containerElm, "mouseover").pipe(
            tap(() => (this.mouseOnContainer = true))
          )
        );
      }

      this.doNext = startEvent.pipe(
        switchMap(() => this.speedChange),
        switchMap(() =>
          timer(this.delay).pipe(
            switchMap(() => this.runProgress(20)),
            tap(() => {
              this.isFromAuto = true;
              if (this.direction === "left") {
                this.currentIndex -= this.scrollNum;
              } else {
                this.currentIndex += this.scrollNum;
              }
            }),
            takeUntil(stopEvent.pipe(tap(() => (this.progressWidth = 0))))
          )
        )
      );

      if (this.autoplay) {
        this.doNextSub$ = this.doNext.subscribe();
      }
    });
  }

  private reSetAlignDistance() {
    switch (this.align) {
      case "center":
        this.alignDistance = (this.rootElmWidth - this.elmWidth) / 2;
        break;
      case "left":
        this.alignDistance = 0;
        break;
      case "right":
        this.alignDistance = 0;
        break;
      case "top":
        this.alignDistance = 0;
        break;
      case "bottom":
        this.alignDistance = 0;
    }
  }

  private setViewWidth(isInit?: boolean) {
    if (!this.verticalModeEnabled) {
      if (this.isAutoNum) {
        this._showNum = this.getAutoNum();
        this.realIndex = this._showNum;
        this.currentIndex = this.startIndex;
      }
      this._infineDataCount = this._showNum * 2;
      this.infinite =
        this.data && this.data.length > this._showNum ? this.infinite : false;
      this._renderer.addClass(this.containerElm, "grab");
      if (isInit) {
        // remain one elm height
        this.initData(this._infineDataCount);
        this._renderer.addClass(
          this.containerElm,
          "ngx-advanced-carousel-display-nowrap"
        );
      }
      this.elmWidth =
        this.rootElmWidth / (this._showNum / this.gridBy.row) -
        (this.padding * 2) /
          (this.gridBy.col > 1
            ? this.gridBy.col
            : this._showNum / this.gridBy.row);

      this._renderer.removeClass(
        this.containerElm,
        "ngx-advanced-carousel-display-nowrap"
      );

      this.containerElmWidth =
        (this.rootElmWidth - this.padding * 2) *
        (this.elms.length / this._showNum);

      this._renderer.setStyle(this.containerElm, "position", "relative");
      this.viewArea.forEach((element) => {
        element.nativeElement.setAttribute(
          "style",
          `width:${this.rootElmWidth - this.padding * 2}px`
        );
      });

      this.elms.forEach((elm: HTMLElement) => {
        this.setStyle(elm, "width", this.elmWidth);
      });
    } else {
      this.setViewHeight(isInit);
    }
    this._cd.detectChanges();
  }

  private setViewHeight(isInit?: boolean) {
    if (this.isAutoNum) {
      this._showNum = this.getAutoNum();
      this.realIndex = this._showNum;
      this.currentIndex = this.startIndex;
    }
    this._infineDataCount = this._showNum * 2;
    this.infinite =
      this.data && this.data.length > this._showNum ? this.infinite : false;
    this._renderer.addClass(this.containerElm, "grab");
    if (isInit) {
      // remain one elm height
      this.initData(this._infineDataCount);
      this._renderer.addClass(
        this.containerElm,
        "ngx-advanced-carousel-display-nowrap"
      );
    }
    this.elmWidth =
      this.rootElmHeight / (this._showNum / this.gridBy.row) -
      (this.padding * 2) /
        (this.gridBy.col > 1
          ? this.gridBy.col
          : this._showNum / this.gridBy.row);

    this._renderer.removeClass(
      this.containerElm,
      "ngx-advanced-carousel-display-nowrap"
    );

    this.containerElmWidth =
      (this.rootElmHeight - this.padding * 2) *
      (this.elms.length / this._showNum);

    this._renderer.setStyle(this.containerElm, "position", "relative");
    this.viewArea.forEach((element) => {
      element.nativeElement.setAttribute(
        "style",
        `height:${this.rootElmHeight - this.padding * 2}px`
      );
    });

    this.elms.forEach((elm: HTMLElement) => {
      this.setStyle(elm, "height", this.elmWidth);
    });
  }

  private bindHammer() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return this._zone.runOutsideAngular(() => {
      const hm = new Hammer.Manager(this.containerElm);

      const pan = new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 0,
      });

      hm.add(pan);

      hm.on("panleft panright panend pancancel", (e) => {
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
                (this.verticalModeEnabled
                  ? e.deltaY
                  : this.align === "right"
                  ? -e.deltaX
                  : e.deltaX);
            }

            if (!this.isDragMany) {
              if (
                Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                this.elmWidth * 0.5
              ) {
                if ((this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                  if (this.align === "right") {
                    this.currentIndex += this.scrollNum;
                  } else {
                    this.currentIndex -= this.scrollNum;
                  }
                } else {
                  if (this.align === "right") {
                    this.currentIndex -= this.scrollNum;
                  } else {
                    this.currentIndex += this.scrollNum;
                  }
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
            if (
              this.panBoundary !== false &&
              Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) >
                this.elmWidth * this.panBoundary
            ) {
              const moveNum = this.isDragMany
                ? Math.ceil(
                    Math.abs(this.verticalModeEnabled ? e.deltaY : e.deltaX) /
                      this.elmWidth
                  )
                : this.scrollNum;

              const prevIndex = this.currentIndex - moveNum;
              const nextIndex = this.currentIndex + moveNum;

              if ((this.verticalModeEnabled ? e.deltaY : e.deltaX) > 0) {
                this.align === "right"
                  ? this.goNext(nextIndex)
                  : this.goPrev(prevIndex);
              } else {
                this.align === "right"
                  ? this.goPrev(prevIndex)
                  : this.goNext(nextIndex);
              }
              break;
            } else if (e.velocityX < -this.swipeVelocity && e.distance > 10) {
              this.align === "right"
                ? this.goPrev(this.currentIndex - this.scrollNum)
                : this.goNext(this.currentIndex + this.scrollNum);
            } else if (e.velocityX > this.swipeVelocity && e.distance > 10) {
              this.align === "right"
                ? this.goNext(this.currentIndex + this.scrollNum)
                : this.goPrev(this.currentIndex - this.scrollNum);
            } else {
              this.drawView(this.currentIndex);
            }
            break;
        }
      });

      return hm;
    });
  }

  private goPrev(prevIndex: number) {
    if (!this.runLoop && prevIndex < 0) {
      prevIndex = 0;
      this.drawView(0);
    }
    this.currentIndex = prevIndex;
  }

  private goNext(nextIndex: number) {
    if (!this.runLoop && nextIndex > this.maxRightIndex) {
      nextIndex = this.maxRightIndex;
      this.drawView(nextIndex);
    }
    this.currentIndex = nextIndex;
  }

  private bindClick() {
    if (this.btnNext && this.btnPrev) {
      return [
        fromEvent(this.btnNext.nativeElement, "click").pipe(
          map(() => (this.currentIndex += this.scrollNum))
        ),
        fromEvent(this.btnPrev.nativeElement, "click").pipe(
          map(() => {
            return (this.currentIndex = this.currentIndex - this.scrollNum);
          })
        ),
      ];
    }
    return [];
  }

  private callRestart() {
    if (this.autoplay && !this.mouseOnContainer && !this.grabbing) {
      this._zone.runOutsideAngular(() => {
        this.restart.next(null);
      });
    }
  }

  private drawView(
    index: number,
    isAnimation = true,
    isFromAuto = this.isFromAuto
  ) {
    if (this.elms.length > 1 && this.elms.length > this._showNum) {
      this.removeContainerTransition();
      this.left = -index * this.elmWidth + this.alignDistance;

      if (isAnimation) {
        if (isFromAuto) {
          this._renderer.addClass(this.containerElm, this.aniClassAuto);
        } else {
          this._renderer.addClass(this.containerElm, this.aniClass);
        }
      }
    } else {
      this.left = this.alignDistance;
    }
  }

  private removeContainerTransition() {
    this._renderer.removeClass(this.containerElm, this.aniClass);
    this._renderer.removeClass(this.containerElm, this.aniClassAuto);
  }

  private outOfBound(type) {
    switch (type) {
      case "panleft":
        return this.currentIndex >= this.maxRightIndex;
      case "panright":
        return this.currentIndex <= 0;
    }
  }

  private runProgress(betweenTime): Observable<any> {
    return this._zone.runOutsideAngular(() => {
      const howTimes = this.speed / betweenTime;
      const everyIncrease = (100 / this.speed) * betweenTime;
      return interval(betweenTime).pipe(
        tap((t) => {
          this.progressWidth = (t % howTimes) * everyIncrease;
        }),
        bufferCount(Math.round(howTimes), 0)
      );
    });
  }
  private initData(showNum) {
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

  private getAutoNum() {
    const currWidth = this.rootElmWidth;
    if (this.breakpoint.length > 0) {
      const now = this.breakpoint.find((b) => {
        return this.screenSizeMap[b.screenSize] <= currWidth;
      });
      if (now) {
        this.padding = now.padding || this.padding;
        if (now.gridBy) {
          this.scrollNum = now.gridBy.col || now.scrollNum || now.number;
          this.gridBy = now.gridBy;
          const showNum = now.gridBy.col * now.gridBy.row || now.number;
          return showNum;
        } else {
          this.scrollNum = now.scrollNum || now.number;
          this.gridBy = { col: now.number, row: 1 };
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
        const showNum =
          this.breakpoint[this.breakpoint.length - 1].gridBy.col *
            this.breakpoint[this.breakpoint.length - 1].gridBy.row ||
          this.breakpoint[this.breakpoint.length - 1].number;
        return showNum;
      } else {
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

  private setStyle(elm: HTMLElement, style: string, value: number) {
    if (isPlatformBrowser(this.platformId)) {
      this._renderer.setStyle(elm, style, `${value}px`);
    } else {
      this._renderer.setStyle(elm, style, `${value}%`);
    }
  }

  public trackByFcn(index, item) {
    if (!item || item[this.trackByKey]) {
      return null;
    }
    return item[this.trackByKey];
  }

  public arrayCreator(arr, count) {
    const data = [...arr];
    for (let i = 0; i < count; i++) {
      data.unshift(arr[arr.length - 1 - (i % arr.length)]);
      data.push(arr[i % arr.length]);
    }
    return data;
  }
}
