import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheticDataComponent } from './synthetic-data.component';

describe('SyntheticDataComponent', () => {
  let component: SyntheticDataComponent;
  let fixture: ComponentFixture<SyntheticDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyntheticDataComponent]
    });
    fixture = TestBed.createComponent(SyntheticDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
