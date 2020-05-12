import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAdvancedCarouselComponent } from './ngx-advanced-carousel.component';

describe('NgxAdvancedCarouselComponent', () => {
  let component: NgxAdvancedCarouselComponent;
  let fixture: ComponentFixture<NgxAdvancedCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxAdvancedCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAdvancedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
