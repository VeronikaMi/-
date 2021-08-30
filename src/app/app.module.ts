import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersListItemComponent } from './users/users-list-item/users-list-item.component';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostsListItemComponent } from './posts/posts-list/posts-list-item/posts-list-item.component';
import { NewPostComponent } from './posts/posts-list/new-post/new-post.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { CommentsListComponent } from './posts/comments-list/comments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    UsersComponent,
    UsersListComponent,
    UsersListItemComponent,
    UserDetailComponent,
    PageNotFoundComponent,
    LoadSpinnerComponent,
    PostsListComponent,
    PostsListItemComponent,
    NewPostComponent,
    PostDetailComponent,
    CommentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
