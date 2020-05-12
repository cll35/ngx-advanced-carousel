import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxAdvancedCarouselItemDirective } from './ngx-advanced-carousel-item.directive';
import { NgxAdvancedCarouselComponent } from './ngx-advanced-carousel.component';

@NgModule({
  declarations: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
  exports: [NgxAdvancedCarouselComponent, NgxAdvancedCarouselItemDirective],
  imports: [CommonModule, FormsModule],
})
export class NgxAdvancedCarouselModule {}
