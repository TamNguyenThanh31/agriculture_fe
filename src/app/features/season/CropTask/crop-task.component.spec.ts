import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropTaskComponent } from './crop-task.component';

describe('CropTaskComponent', () => {
  let component: CropTaskComponent;
  let fixture: ComponentFixture<CropTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
