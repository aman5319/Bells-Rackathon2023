import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSyntheticDataComponent } from './create-synthetic-data.component';

describe('CreateSyntheticDataComponent', () => {
  let component: CreateSyntheticDataComponent;
  let fixture: ComponentFixture<CreateSyntheticDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSyntheticDataComponent]
    });
    fixture = TestBed.createComponent(CreateSyntheticDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
