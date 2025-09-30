import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallinfoComponent } from './userallinfo.component';

describe('UserallinfoComponent', () => {
  let component: UserallinfoComponent;
  let fixture: ComponentFixture<UserallinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserallinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserallinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
