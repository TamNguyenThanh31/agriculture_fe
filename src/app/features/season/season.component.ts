import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {AgricultureService, CropSeason} from '../../shared/service/agriculture.service';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTableComponent, NzThMeasureDirective} from 'ng-zorro-antd/table';
import {DatePipe, NgForOf} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {CropFormComponent} from './crop-form/crop-form.component';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-season',
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
    NzTagComponent
  ],
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  cropSeasons: CropSeason[] = [];
  isLoading = false;

  constructor(
    private agricultureService: AgricultureService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router, // Thêm Router vào đây
  ) {}

  ngOnInit(): void {
    this.loadCropSeasons();
  }

  loadCropSeasons(): void {
    this.isLoading = true;
    this.agricultureService.getAllCropSeasons().subscribe(
      (data) => {
        this.cropSeasons = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Có lỗi xảy ra khi tải mùa vụ:', error);
        this.message.error('Tải dữ liệu mùa vụ cây trồng thất bại.');
        this.isLoading = false;
      }
    );
  }

  deleteSeason(seasonId: number): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa mùa vụ?',
      nzOnOk: () => {
        this.agricultureService.deleteCropSeason(seasonId).subscribe(
          () => {
            this.cropSeasons = this.cropSeasons.filter((s) => s.id !== seasonId);
            this.message.success('Xóa mùa vụ thành công.');
          },
          (error) => {
            console.error('Có lỗi xảy ra khi xóa mùa vụ:', error);
            this.message.error('Xóa mùa vụ thất bại.');
          }
        );
      },
    });
  }

  createSeason(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm mùa vụ mới',
      nzContent: CropFormComponent,
      nzFooter: null,
    });

    const instance = modal.getContentComponent();
    if (instance) {
      instance.isEditMode = false;

      instance.onSave.subscribe((newSeason: CropSeason) => {
        this.agricultureService.createCropSeason(newSeason).subscribe((createdSeason) => {
          this.cropSeasons.push(createdSeason);
          this.message.success('Tạo mùa vụ mới thành công.');
          modal.close();
        });
      });

      instance.onCancel.subscribe(() => {
        modal.close();
      });
    }
  }

  editSeason(season: CropSeason): void {
    const modal = this.modal.create({
      nzTitle: `Sửa mùa vụ: ${season.seasonName}`,
      nzContent: CropFormComponent,
      nzFooter: null,
    });

    const instance = modal.getContentComponent();
    if (instance) {
      instance.isEditMode = true;
      instance.season = { ...season }; // Truyền đầy đủ thông tin, bao gồm id

      instance.onSave.subscribe((updatedSeason: CropSeason) => {
        if (updatedSeason.id) {
          this.agricultureService.updateCropSeason(updatedSeason.id, updatedSeason).subscribe((result) => {
            const index = this.cropSeasons.findIndex((s) => s.id === result.id);
            if (index !== -1) {
              this.cropSeasons[index] = result;
            }
            this.message.success('Sửa mùa vụ thành công.');
            modal.close();
          });
        } else {
          this.message.error('Sửa mùa vụ thất bại. Missing ID.');
        }
      });

      instance.onCancel.subscribe(() => {
        modal.close();
      });
    }
  }


  viewTasks(seasonId: number): void {
    console.log(`Xem các công việc theo mã mùa vụ: ${seasonId}`);
    // Chuyển hướng đến màn hình danh sách công việc
  }

  // deleteSeason(id: number): void {
  //   this.agricultureService.deleteCropSeason(id).subscribe(() => {
  //     this.cropSeasons = this.cropSeasons.filter((season) => season.id !== id);
  //     this.message.success('Season deleted successfully.');
  //   });
  // }

  manageTasks(seasonId: number): void {
    this.router.navigate([`/season/${seasonId}/tasks`]);
  }
}
