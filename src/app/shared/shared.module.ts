import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../HF/header/header.component';
import { FooterComponent } from '../HF/footer/footer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule { }