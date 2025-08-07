import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragilityComponent } from './fragility.component';

describe('FragilityComponent', () => {
  let component: FragilityComponent;
  let fixture: ComponentFixture<FragilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
