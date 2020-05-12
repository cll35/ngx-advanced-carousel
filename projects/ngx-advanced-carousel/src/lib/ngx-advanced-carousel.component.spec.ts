import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeoCarouselComponent } from './carousel.component';

describe('LeoCarouselComponent', () => {
  let component: LeoCarouselComponent;
  let fixture: ComponentFixture<LeoCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeoCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
