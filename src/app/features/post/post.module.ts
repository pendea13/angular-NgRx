import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import {AuthService} from '../../services/auth.service';
import {UUIDGuard} from '../../services/uuid.guard';
import {PostResolver} from './post.resolver';
import {FormsModule} from '@angular/forms';
import {UIModule} from '../../ui.module';
import {PostEffects, postReducer} from './state';

const routes: Routes = [
  {
    path: 'new',
    component: NewPostComponent,
    canActivate: [AuthService]
  },
  {
    path: ':id',
    component: PostComponent,
    canActivate: [UUIDGuard],
    resolve: { data: PostResolver }
  },
  {
    path: ':id/edit',
    component: EditPostComponent,
    canActivate: [UUIDGuard, AuthService],
    resolve: { data: PostResolver }
  },
  { path: '', component: PostsComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  providers: [PostResolver]
})
export class PostModule { }
