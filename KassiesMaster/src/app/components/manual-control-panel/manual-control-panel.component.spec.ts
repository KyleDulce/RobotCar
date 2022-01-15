import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualControlPanelComponent } from './manual-control-panel.component';

describe('ManualControlPanelComponent', () => {
  let component: ManualControlPanelComponent;
  let fixture: ComponentFixture<ManualControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
