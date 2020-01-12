import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TrainingService } from '../training.service';
import { DialogStopTrainingComponent } from './dialog-stop-training/dialog-stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService) { }

  ngOnInit() {
 this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise()
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(DialogStopTrainingComponent, {data: this.progress}).afterClosed().subscribe(
      (isValid: boolean) => {
        if (isValid) {
          this.trainingService.cancelExercise(this.progress)
        } else {
          this.startOrResumeTimer();
        }
      }
      );
    }

  }
