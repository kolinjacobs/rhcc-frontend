import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionInfoComponent } from './mission-info.component';

describe('MissionInfoComponent', () => {
  let component: MissionInfoComponent;
  let fixture: ComponentFixture<MissionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
