import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxAdvancedCarouselItemDirective } from './ngx-advanced-carousel-item.directive';
import { NgxAdvancedCarouselComponent } from './ngx-advanced-carousel.component';
import * as i0 from "@angular/core";
var NgxAdvancedCarouselModule = /** @class */ (function () {
    function NgxAdvancedCarouselModule() {
    }
    /** @nocollapse */ NgxAdvancedCarouselModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxAdvancedCarouselModule });
    /** @nocollapse */ NgxAdvancedCarouselModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxAdvancedCarouselModule_Factory(t) { return new (t || NgxAdvancedCarouselModule)(); }, imports: [[CommonModule, FormsModule]] });
    return NgxAdvancedCarouselModule;
}());
export { NgxAdvancedCarouselModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxAdvancedCarouselModule, { declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective], imports: [CommonModule, FormsModule], exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxAdvancedCarouselModule, [{
        type: NgModule,
        args: [{
                declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
                imports: [CommonModule, FormsModule],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLWNhcm91c2VsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZHZhbmNlZC1jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFFakY7SUFBQTtLQUt5QztvRkFBNUIseUJBQXlCO3dKQUF6Qix5QkFBeUIsa0JBRjNCLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztvQ0FUdEM7Q0FXeUMsQUFMekMsSUFLeUM7U0FBNUIseUJBQXlCO3dGQUF6Qix5QkFBeUIsbUJBSnJCLDRCQUE0QixFQUFFLGdDQUFnQyxhQUVuRSxZQUFZLEVBQUUsV0FBVyxhQUR6Qiw0QkFBNEIsRUFBRSxnQ0FBZ0M7a0RBRzdELHlCQUF5QjtjQUxyQyxRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsZ0NBQWdDLENBQUM7Z0JBQzlFLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixFQUFFLGdDQUFnQyxDQUFDO2dCQUN6RSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtYWR2YW5jZWQtY2Fyb3VzZWwtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4QWR2YW5jZWRDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWFkdmFuY2VkLWNhcm91c2VsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnQsIE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05neEFkdmFuY2VkQ2Fyb3VzZWxDb21wb25lbnQsIE5neEFkdmFuY2VkQ2Fyb3VzZWxJdGVtRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBZHZhbmNlZENhcm91c2VsTW9kdWxlIHt9XG4iXX0=