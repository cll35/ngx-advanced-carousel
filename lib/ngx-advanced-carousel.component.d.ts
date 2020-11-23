import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList, Renderer2, TemplateRef } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { Observable } from "rxjs";
export declare class NgxAdvancedCarouselComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private platformId;
    private _document;
    private _renderer;
    private _zone;
    private _cd;
    data: any[];
    /** disable drag event with touch and mouse pan moving, default is `false` */
    disableDrag: boolean;
    /** is the carousel can move infinite */
    infinite: boolean;
    /** auto play speed */
    speed: number;
    /**
     * how many number items to show once, default is `1`
     * set `auto` to using `[breakpoint]` set value.
     */
    showNum: number | "auto";
    /** carousel auto play confing */
    autoplay: boolean;
    currentIndex: number;
    progressWidth: number;
    grabbing: boolean;
    private left;
    private readonly maxRightIndex;
    private readonly runLoop;
    private readonly lengthOne;
    private readonly rootElmWidth;
    private containerElmWidth;
    indexChanged: EventEmitter<any>;
    startIndex: number;
    constructor(platformId: any, _document: any, _renderer: Renderer2, _zone: NgZone, _cd: ChangeDetectorRef);
    container: ElementRef;
    viewArea: QueryList<ElementRef>;
    btnPrev: ElementRef;
    btnNext: ElementRef;
    progressContainerElm: ElementRef;
    itemElms: QueryList<ElementRef>;
    contentPrev: TemplateRef<any>;
    contentNext: TemplateRef<any>;
    dotElm: TemplateRef<any>;
    carouselItemTemplate: TemplateRef<any>;
    progressElm: TemplateRef<any>;
    _data: any[];
    mappedData: EventEmitter<any[]>;
    /** when infinite is true, the animation time with item, default is 400. */
    aniTime: number;
    /** this class will add in #containerElm when model change */
    aniClass: string;
    /** this class will add when carousel auto play,
     * this default autoplay animation is same as aniClass
     */
    aniClassAuto: string;
    showButtonsMethod: "always" | "auto-hide" | "auto-disable";
    /**
     * user move picture with the container width rate,
     * when more than that rate, it will go to next or prev,
     * set false will never move with distance rate,
     * default is `0.15`
     */
    panBoundary: number | false;
    /** when show-num is bigger than 1, the first item align, defaulte is `center` */
    align: "left" | "center" | "right";
    /**
     * disable when drag occur the child element will follow touch point.
     * default is `false`
     */
    notDrag: boolean;
    trackByKey: string;
    /**
     * the event binding state for stop auto play when mourse moveover
     */
    mourseEnable: boolean;
    /** each auto play between time */
    delay: number;
    /** auto play direction, default is `right`. */
    direction: "left" | "right";
    /** how many number with each scroll, default is `1`. */
    scrollNum: number;
    /** Could user scroll many item once, simulate with scrollbar, default is `false` */
    isDragMany: boolean;
    /** Minimal velocity required before recognizing, unit is in px per ms, default `0.3` */
    swipeVelocity: number;
    /**
     * switch show number with custom logic like css @media (min-width: `number`px)
     */
    breakpoint: Array<{
        gridBy?: any;
        screenSize: "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
        number: any;
        scrollNum?: any;
    }>;
    screenSizeMap: {
        xxl: number;
        xl: number;
        lg: number;
        md: number;
        sm: number;
        xs: number;
    };
    padding: number;
    leaveObs$: Observable<Event>;
    private isFromAuto;
    private isAutoNum;
    private mouseOnContainer;
    private alignDistance;
    private elmWidth;
    private rootElm;
    private containerElm;
    private elms;
    private hammer;
    private doNextSub$;
    private doNext;
    private restart;
    private speedChange;
    private stopEvent;
    private destroy$;
    private _porgressWidth;
    private _currentIndex;
    _showNum: number;
    private _autoplay;
    private _infinite;
    private _grabbing;
    private _disableDrag;
    gridBy: {
        col: number;
        row: number;
    };
    private panCount;
    realIndex: number;
    wrapperWidth: any;
    singleTimeRun: boolean;
    private initialIndex;
    orginalData: any[];
    private _infineDataCount;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    private onChange;
    private onTouched;
    private init;
    private destroy;
    private destoryHammer;
    private containerResize;
    private initVariable;
    private reSetAlignDistance;
    private setViewWidth;
    private bindHammer;
    private goPrev;
    private goNext;
    private bindClick;
    private callRestart;
    private drawView;
    private removeContainerTransition;
    private outOfBound;
    private runProgress;
    private initData;
    private getAutoNum;
    private setStyle;
    trackByFcn(index: any, item: any): any;
    arrayCreator(arr: any, count: any): any[];
}
