import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  runningExerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private angularFirestore: AngularFirestore,
    private uiService: UIService
  ) {}

  fecthAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.angularFirestore
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map((doc: DocumentChangeAction<Exercise>) => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              } as Exercise;
            });
          })
        )
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
          this.uiService.loadingStateChanged.next(false);
        })
    );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  startExercise(selectedId: string) {
    // this.angularFirestore.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.runningExerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      name: this.runningExercise.name,
      duration: this.runningExercise.duration,
      calories: this.runningExercise.calories,
      date: new Date(),
      state: 'completed'
    } as Exercise);
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      name: this.runningExercise.name,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    } as Exercise);
    this.runningExercise = null;
    this.runningExerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.angularFirestore
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.angularFirestore.collection('finishedExercises').add(exercise);
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
