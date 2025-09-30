import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinsMapObvComponent } from './joins-map-obv.component';

describe('JoinsMapObvComponent', () => {
  let component: JoinsMapObvComponent;
  let fixture: ComponentFixture<JoinsMapObvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinsMapObvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinsMapObvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
