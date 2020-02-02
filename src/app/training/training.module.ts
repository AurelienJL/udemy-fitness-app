import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { DialogStopTrainingComponent } from './current-training/dialog-stop-training/dialog-stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    DialogStopTrainingComponent
  ],
  imports: [SharedModule, TrainingRoutingModule],
  entryComponents: [DialogStopTrainingComponent]
})
export class TrainingModule {}
