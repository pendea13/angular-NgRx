import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {UserModule} from './features/user/user.module';
import {PostModule} from './features/post/post.module';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'posts', loadChildren: () => PostModule},
  { path: 'users', loadChildren: () => UserModule },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
