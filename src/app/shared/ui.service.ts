import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) {}

  showSnackbar(message: string, action: any, duration: number) {
    this.matSnackBar.open(message, action, { duration: duration });
  }
}
