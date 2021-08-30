import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommentsListComponent } from './posts/comments-list/comments-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersResolverService } from './users/users-resolver.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},

  {path:'users', component:UsersComponent, resolve:[UsersResolverService],
    children:[
      {path:'',component:UsersListComponent},
      {path: ':id' , component:UserDetailComponent},
    ]
  },

  {path:'posts', component:PostsComponent, resolve: [PostsResolverService],
    children:[
      {path:'', component:PostsListComponent},
      {path:':id', component:PostDetailComponent},
      {path:':id/comments', component:CommentsListComponent},

    ]
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
