import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule]
})
export class SharedModule {}
