import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';

const modules: any = [BrowserModule, BrowserAnimationsModule, RouterModule];
const components: any = [MainComponent];

@NgModule({
  declarations: [...components, HeaderComponent],
  imports: [...modules],
  exports: [...components],
})
export class CoreModule {}
