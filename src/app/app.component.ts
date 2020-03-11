import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import {AppState} from './store';
import {AuthService} from './services/auth.service';
import {SetInitialUser} from './store/actions/auth.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.authService.token) {
      this.store.dispatch(new SetInitialUser());
    }
    this.store
      .select(state => state.error)
      .subscribe(val => {
        this.showError(val.error);
      });
  }

  showError(err) {
    if (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: err.message || 'Internal server error'
      });
    }
  }
}
