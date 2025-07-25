import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocDialogComponent } from './kyc-doc-dialog.component';

describe('KycDocDialogComponent', () => {
  let component: KycDocDialogComponent;
  let fixture: ComponentFixture<KycDocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycDocDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycDocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
