import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropTaskFormComponent } from './crop-task-form.component';

describe('CropTaskFormComponent', () => {
  let component: CropTaskFormComponent;
  let fixture: ComponentFixture<CropTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
