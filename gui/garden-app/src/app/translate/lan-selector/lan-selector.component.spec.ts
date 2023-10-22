import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanSelectorComponent } from './lan-selector.component';

describe('LanSelectorComponent', () => {
  let component: LanSelectorComponent;
  let fixture: ComponentFixture<LanSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanSelectorComponent]
    });
    fixture = TestBed.createComponent(LanSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
