import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingComponent } from '../training/training.component';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService
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
    this.auth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then()
      .catch();
  }

  login(authData: AuthData) {
    this.auth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then()
      .catch();
  }

  logout() {
    this.auth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
