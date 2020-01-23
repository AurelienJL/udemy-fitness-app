import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private angularFirestore: AngularFirestore) { }

  ngOnInit() {
   this.availableExercises =
   this.angularFirestore.collection('availableExercises')
   .snapshotChanges()
   .pipe(map(docArray => {
     return docArray.map(doc => {
       return {
         id: doc.payload.doc.id,
         ...doc.payload.doc.data()
       } as Exercise;
     });
   }));
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
