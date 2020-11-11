import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { IonicStorageModule } from '@ionic/storage';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    CodeEditorModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
