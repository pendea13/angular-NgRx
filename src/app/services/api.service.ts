import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserInterface} from '../models/user';
import {CommentCreateInterface, CommentInterface} from '../models/comment';
import {PostDTO, PostInterface} from '../models/post';

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

  getUser(username: string): Observable<UserInterface> {
    return this.request('GET', `users/${username}`);
  }

  getPosts(page?: string): Observable<PostInterface[]> {
    const endpoint = page ? `posts?page=${page}` : 'posts';

    return this.request('GET', endpoint);
  }

  getPost(id: string): Observable<PostInterface> {
    return this.request('GET', `post/${id}`);
  }

  createPost(data: PostDTO): Observable<PostInterface> {
    return this.request('POST', 'post', data);
  }

  updatePost(id: string, data: Partial<PostDTO>): Observable<PostInterface> {
    return this.request('PUT', `post/${id}`, data);
  }

  getComments(page?: string): Observable<CommentInterface[]> {
    const endpoint = page ? `comment?page=${page}` : 'comment';

    return this.request('GET', endpoint);
  }


  createComment(postId: string, data: CommentCreateInterface): Observable<CommentInterface> {
    return this.request('POST', `comment/${postId}`, data);
  }

  updateComment(id: string, data: CommentCreateInterface): Observable<CommentInterface> {
    return this.request('PUT', `comment/${id}`, data);
  }

  private request(method: string, endpoint: string, body?: any): Observable<any> {
    const url = `${this.api}/${endpoint}`;

    return this.http.request(method, url, {body, headers: {authorization: `Bearer ${this.auth.token}`}});
  }
}
