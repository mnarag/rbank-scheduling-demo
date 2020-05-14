import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IntegralUIModule } from '@lidorsystems/integralui-web/bin/integralui/integralui.module';
import { ScheduleService } from './service/schedule.service';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    IntegralUIModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalModule,
    IntegralUIModule
  ],
  providers: [
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
