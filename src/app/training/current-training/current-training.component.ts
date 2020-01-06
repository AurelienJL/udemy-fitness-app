import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogStopTrainingComponent } from './dialog-stop-training/dialog-stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
 this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    this.dialog.open(DialogStopTrainingComponent, {data: this.progress}).afterClosed().subscribe(
      (isValid: boolean) => {
        if (isValid) {
          this.trainingExit.emit();
        } else {
          this.startOrResumeTimer();
        }
      }
      );
    }

  }
