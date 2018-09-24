import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Confirmation } from './confirmation';

@NgModule({
  declarations: [
    Confirmation
  ],
  imports: [
    IonicPageModule.forChild(Confirmation),
  ],
  entryComponents: [
    Confirmation
  ]
  // exports:[IonicModule]
})
export class ConfirmationModule { }
