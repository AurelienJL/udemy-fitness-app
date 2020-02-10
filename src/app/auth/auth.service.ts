import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import * as fromRoot from '../app.reducer';
import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.auth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
