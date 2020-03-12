import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthType, LoginInterface, RegisterInterface} from '../models/auth';
import {Observable, of} from 'rxjs';
import {UserInterface} from '../models/user';
import {mergeMap} from 'rxjs/operators';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private api: string = environment.api_server + '/auth';

  constructor(private http: HttpClient) {
  }

  auth(authType: AuthType, data: LoginInterface | RegisterInterface): Observable<UserInterface> {

    return this.http.post<UserInterface>(`${this.api}/${authType}`, data).pipe(
      mergeMap((user: UserInterface) => {
        this.token = user.token;
        return of(user);
      })
    );
  }

  whoami() {

    return this.http.get(`${this.api}/whoami`,
      {headers: {authorization: `Bearer ${this.token}`}}
    );
  }

  get token(): string {

    return localStorage.getItem('access_token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('access_token', val);
    } else {
      localStorage.clear();
    }
  }
  canActivate() {
    if (this.token) {
      return true;
    }
    return false;
  }
}
