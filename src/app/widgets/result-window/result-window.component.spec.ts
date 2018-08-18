import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWindowComponent } from './result-window.component';

describe('ResultWindowComponent', () => {
  let component: ResultWindowComponent;
  let fixture: ComponentFixture<ResultWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
