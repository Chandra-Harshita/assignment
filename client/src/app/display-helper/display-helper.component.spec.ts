import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHelperComponent } from './display-helper.component';

describe('DisplayHelperComponent', () => {
  let component: DisplayHelperComponent;
  let fixture: ComponentFixture<DisplayHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
