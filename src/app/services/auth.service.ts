import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthType, LoginInterface, RegisterInterface} from '../models/auth';
import {Observable} from 'rxjs';
import {UserInterface} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';

  constructor(private http: HttpClient) {
  }

  private auth(authType: AuthType, data: LoginInterface | RegisterInterface): Observable<UserInterface> {

    return this.http.post<UserInterface>(`${this.api}/${authType}`, data);
  }

  login(data: LoginInterface): Observable<UserInterface> {

    return this.auth('login', data);
  }

  register(data: RegisterInterface): Observable<UserInterface> {

    return this.auth('register', data);
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
}
