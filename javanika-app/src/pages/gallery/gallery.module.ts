import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxMasonryModule } from 'ngx-masonry';
import { ComponentsModule } from '../../components/components.module';
import { ViewImageComponent } from '../../components/view-image/view-image';
import { ViewImagePageModule } from '../view-image/view-image.module';
import { GalleryPage } from './gallery';

@NgModule({
  entryComponents: [ViewImageComponent],
  declarations: [
    GalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(GalleryPage),
    NgxMasonryModule,
    ComponentsModule
  ],
})
export class GalleryPageModule { }
