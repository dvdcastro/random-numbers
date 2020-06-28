import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomNumbersViewComponent } from './random-numbers-view.component';

describe('RandomNumbersViewComponent', () => {
  let component: RandomNumbersViewComponent;
  let fixture: ComponentFixture<RandomNumbersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomNumbersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomNumbersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
