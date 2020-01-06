import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-stop-training',
  templateUrl: './dialog-stop-training.component.html',
  styleUrls: ['./dialog-stop-training.component.scss']
})
export class DialogStopTrainingComponent implements OnInit {

  progress: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.progress = this.data;
  }


}
