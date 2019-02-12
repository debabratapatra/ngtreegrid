import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgtreegridComponent } from './ngtreegrid.component';

describe('NgtreegridComponent', () => {
  let component: NgtreegridComponent;
  let fixture: ComponentFixture<NgtreegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgtreegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgtreegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
