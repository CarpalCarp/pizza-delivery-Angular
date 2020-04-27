import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTextComponent } from './change-text.component';

describe('ChangeTextComponent', () => {
  let component: ChangeTextComponent;
  let fixture: ComponentFixture<ChangeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
