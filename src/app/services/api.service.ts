import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserInterface} from '../models/user';
import {CommentCreateInterface, CommentInterface} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.api_server + '/api';

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getUsers(page?: string): Observable<UserInterface[]> {
    const endpoint = page ? `users?page=${page}` : 'users';

    return this.request('GET', endpoint);
  }

  getComments(page?: string): Observable<CommentInterface[]> {
    const endpoint = page ? `comment?page=${page}` : 'users';

    return this.request('GET', endpoint);
  }

  createComment(data: CommentCreateInterface): Observable<CommentInterface> {
    return this.request('POST', 'comment', data);
  }

  updateComment(data: CommentCreateInterface): Observable<CommentInterface> {
    return this.request('PUT', 'comment', data);
  }

  private request(method: string, endpoint: string, body?: any): Observable<any> {
    const url = `${this.api}/${endpoint}`;

    return this.http.request(method, url, {body, headers: {authorization: `Bearer ${this.auth.token}`}});
  }
}
