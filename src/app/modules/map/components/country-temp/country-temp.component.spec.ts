import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTempComponent } from './country-temp.component';

describe('CountryTempComponent', () => {
  let component: CountryTempComponent;
  let fixture: ComponentFixture<CountryTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
