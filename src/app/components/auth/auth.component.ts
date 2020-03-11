import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {AppState} from '../../store';
import {AuthType} from '../../models/auth';
import {LoginUser, RegisterUser} from '../../store/actions/auth.action';
import {validateWhitespace} from '../../utilities/validators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  loading = false;
  subscription$;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control('', [Validators.required, validateWhitespace]),
      password: this.fb.control('', [Validators.required, validateWhitespace])
    });
  }

  auth(authType: AuthType = 'login') {
    const action = {
      login: LoginUser,
      register: RegisterUser
    };
    const val = this.authForm.getRawValue();
    this.store.dispatch(new action[authType](val));
    this.subscription$ = this.store
      .select(state => state.auth)
      .subscribe(value => {
        this.loading = value.loading;
        if (value.user && value.loaded) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription$ && this.subscription$.unsubscribe();
  }
}
