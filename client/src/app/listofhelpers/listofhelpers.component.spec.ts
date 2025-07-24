import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofhelpersComponent } from './listofhelpers.component';

describe('ListofhelpersComponent', () => {
  let component: ListofhelpersComponent;
  let fixture: ComponentFixture<ListofhelpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListofhelpersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListofhelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
