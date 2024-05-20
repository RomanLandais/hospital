import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComServerService } from './services/com-server.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './services/auth/token.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule],
  providers: [ComServerService, TokenService],
})
export class SharedModule {}
