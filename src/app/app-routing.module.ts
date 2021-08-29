import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersResolverService } from './users/users-resolver.service';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'users', component:UsersListComponent, resolve:[UsersResolverService]},
  {path: 'users/:id' , component:UserDetailComponent, resolve:[UsersResolverService]},
  {path:'posts', component:PostsComponent, resolve: [PostsResolverService]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
