import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthService} from '../../services/auth.service';
import {AppState} from '../../store';
import {SetCurrentUser} from '../../store/actions/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['/'],
      icon: 'fa fa-home'
    },
    {
      label: 'Posts',
      routerLink: ['/posts']
    },
    {
      label: 'Users',
      routerLink: ['/users']
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  get token() {
    return this.authService.token;
  }

  onClick() {
    if (this.authService.token) {
      this.authService.token = null;
      this.store.dispatch(new SetCurrentUser(null));
    }
    this.router.navigate(['/auth']);
  }
}
