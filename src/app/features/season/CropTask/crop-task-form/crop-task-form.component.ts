import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CropTask } from '../../../../shared/service/agriculture.service';

@Component({
  selector: 'app-crop-task-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzButtonComponent
  ],
  templateUrl: './crop-task-form.component.html',
  styleUrls: ['./crop-task-form.component.scss']
})
export class CropTaskFormComponent implements OnInit {
  @Input() task: Partial<CropTask> = {}; // Dữ liệu hiện tại (nếu có)
  @Input() isEditMode = false; // Chế độ chỉnh sửa hoặc thêm mới
  @Output() onSave = new EventEmitter<Partial<CropTask>>(); // Sự kiện lưu
  @Output() onCancel = new EventEmitter<void>(); // Sự kiện hủy

  taskForm!: FormGroup;
  statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [this.task?.taskName || '', [Validators.required]],
      dueDate: [this.task?.dueDate || '', [Validators.required]],
      status: [this.task?.status || '', [Validators.required]],
      notes: [this.task?.notes || ''],
      cost: [this.task?.cost || '', [Validators.required, Validators.min(0)]]
    });
  }

  submitForm(): void {
    if (this.taskForm.valid) {
      const formData = {
        ...this.task, // Giữ nguyên các trường hiện tại, bao gồm id
        ...this.taskForm.value // Ghi đè bằng giá trị từ form
      };
      this.onSave.emit(formData);
    } else {
      Object.values(this.taskForm.controls).forEach((control) => {
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
