import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CropSeason} from '../../../shared/service/agriculture.service';

@Component({
  selector: 'app-crop-form',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzButtonComponent
  ],
  templateUrl: './crop-form.component.html',
  styleUrl: './crop-form.component.scss'
})
export class CropFormComponent implements OnInit{
  @Input() season: Partial<CropSeason> = {}; // Dữ liệu hiện tại (nếu có)
  @Input() isEditMode = false; // Chế độ chỉnh sửa hoặc thêm mới
  @Output() onSave = new EventEmitter<Partial<CropSeason>>(); // Sự kiện lưu
  @Output() onCancel = new EventEmitter<void>(); // Sự kiện hủy

  cropForm!: FormGroup;
  statusOptions = [
    { label: 'Đang gieo trồng', value: 'GROWING' },
    { label: 'Sắp thu hoạch', value: 'NEAR_HARVEST' },
    { label: 'Đã hoàn thành', value: 'COMPLETED' },
  ];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.cropForm = this.fb.group({
      seasonName: [this.season?.seasonName || '', [Validators.required]],
      cropType: [this.season?.cropType || '', [Validators.required]],
      area: [this.season?.area || '', [Validators.required, Validators.min(0)]],
      plantingDate: [this.season?.plantingDate || '', [Validators.required]],
      expectedHarvestDate: [
        this.season?.expectedHarvestDate || '',
        [Validators.required],
      ],
      status: [this.season?.status || '', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.cropForm.valid) {
      const formData = {
        ...this.season, // Giữ nguyên các trường hiện tại, bao gồm id
        ...this.cropForm.value, // Ghi đè bằng giá trị từ form
      };
      this.onSave.emit(formData);
    } else {
      Object.values(this.cropForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }


  cancel(): void {
    this.onCancel.emit();
  }
}
