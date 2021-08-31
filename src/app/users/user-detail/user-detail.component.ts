import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Post } from 'src/app/posts/posts.model';
import { PostsService } from 'src/app/posts/posts.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: number;
  user: User;
  isLoading: boolean = true;
  showPosts: boolean = false;
  postsOfUser: Post[] = [];

  constructor(private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private postsService: PostsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    })
    this.dataStorageService.getUser(this.id).subscribe(user => {
      this.user = user;
      console.log(user);
      this.isLoading = false;
    })

    if (this.postsService.getPosts().length === 0){
      this.dataStorageService.fetchPosts()
      .subscribe(posts => {
        this.postsService.setPosts(posts);
        this.postsOfUser = posts.filter(post => post.userId === this.id);
      })
    }else{
      this.postsOfUser = this.postsService.getPosts().filter(post => post.userId === this.id);
    }
    


  }



}
