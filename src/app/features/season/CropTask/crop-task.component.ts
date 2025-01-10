import { Component, OnInit } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AgricultureService, CropTask } from '../../../shared/service/agriculture.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableComponent, NzThMeasureDirective } from 'ng-zorro-antd/table';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { CropTaskFormComponent } from './crop-task-form/crop-task-form.component';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-crop-task',
  standalone: true,
  imports: [
    NzCardComponent,
    NzButtonComponent,
    NzTableComponent,
    NzThMeasureDirective,
    NgForOf,
    DatePipe,
    NzModalModule,
    NzTooltipDirective,
    NzIconDirective,
    NzTagComponent,
    CurrencyPipe
  ],
  templateUrl: './crop-task.component.html',
  styleUrls: ['./crop-task.component.scss']
})
export class CropTaskComponent implements OnInit {
  cropTasks: CropTask[] = [];
  isLoading = false;
  seasonId!: number;

  constructor(
    private agricultureService: AgricultureService,
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.seasonId = +this.route.snapshot.paramMap.get('seasonId')!;
    this.loadCropTasks();
  }

  loadCropTasks(): void {
    this.isLoading = true;
    this.agricultureService.getTasksBySeason(this.seasonId).subscribe(
      (data) => {
        this.cropTasks = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Lỗi khi tải dữ liệu công việc:', error);
        this.message.error('Tải dữ liệu công việc thất bại.');
        this.isLoading = false;
      }
    );
  }

  deleteTask(taskId: number): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa công việc này?',
      nzOnOk: () => {
        this.agricultureService.deleteCropTask(taskId).subscribe(
          () => {
            this.cropTasks = this.cropTasks.filter((t) => t.id !== taskId);
            this.message.success('Xóa công việc thành công.');
          },
          (error) => {
            console.error('Lỗi khi xóa công viêc:', error);
            this.message.error('Xóa công việc thất bại.');
          }
        );
      },
    });
  }

  createTask(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm công việc mới',
      nzContent: CropTaskFormComponent,
      nzFooter: null,
    });

    const instance = modal.getContentComponent();
    if (instance) {
      instance.isEditMode = false;

      // Truyền seasonId vào instance trực tiếp
      instance.task = { seasonId: this.seasonId } as Partial<CropTask>;

      instance.onSave.subscribe((newTask: CropTask) => {
        // Gọi hàm createCropTask với cả seasonId và task
        this.agricultureService.createCropTask(this.seasonId, newTask).subscribe({
          next: (createdTask) => {
            this.cropTasks.push(createdTask);
            this.message.success('Thêm công việc mới thành công.');
            modal.close();
          },
          error: (error) => {
            console.error('Lỗi khi thêm công việc mới:', error);
            this.message.error('Thêm công việc mới thất bại.');
          },
        });
      });

      instance.onCancel.subscribe(() => {
        modal.close();
      });
    }
  }



  editTask(task: CropTask): void {
    const modal = this.modal.create({
      nzTitle: `Sửa công việc: ${task.taskName}`,
      nzContent: CropTaskFormComponent,
      nzFooter: null,
    });

    const instance = modal.getContentComponent();
    if (instance) {
      instance.isEditMode = true;

      // Truyền task vào instance trực tiếp
      instance.task = { ...task };

      instance.onSave.subscribe((updatedTask: CropTask) => {
        if (updatedTask.id) {
          this.agricultureService.updateCropTask(updatedTask.id, updatedTask).subscribe((result) => {
            const index = this.cropTasks.findIndex((t) => t.id === result.id);
            if (index !== -1) {
              this.cropTasks[index] = result;
            }
            this.message.success('Sửa công việc thành công.');
            modal.close();
          });
        } else {
          this.message.error('Sửa công việc thất bại.');
        }
      });

      instance.onCancel.subscribe(() => {
        modal.close();
      });
    }
  }

  backToSeason():void{
    this.router.navigate([`/season`]);
  }
}
