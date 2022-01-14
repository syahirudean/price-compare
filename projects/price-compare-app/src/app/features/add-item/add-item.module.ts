import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddItemRoutingModule } from './add-item-routing.module';
import { AddItemComponent } from './add-item.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AddItemComponent],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    ImageCropperModule,
    SharedModule,
  ],
})
export class AddItemModule {}
