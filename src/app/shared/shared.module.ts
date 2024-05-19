import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComServerService } from './services/com-server.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule, CommonModule],
  providers: [ComServerService],
})
export class SharedModule {}
