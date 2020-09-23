import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [ThemeService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
