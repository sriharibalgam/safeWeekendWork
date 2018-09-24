import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestPage } from './request';
import { HttpModule } from '@angular/http';
import { MapsService } from '../../services/maps.service';

@NgModule({
  declarations: [
    RequestPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(RequestPage),
  ],
  providers:[MapsService]
})
export class RequestPageModule {}
