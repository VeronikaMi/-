import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/users/user.model';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post; // error on :Post , doesn't have value when assigned
  postChanged = new EventEmitter();
  id: number;
  isLoading = true;
  editMode: boolean = false;
  subscription: Subscription;
  userName: string ;

  constructor(private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router) { }

  ngOnInit(): void {
    this.postChanged.subscribe(() => {
      this.post = this.postsService.getPost(this.id);
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (this.postsService.deleted || this.postsService.useLocal) {
        this.post = this.postsService.getPost(this.id);
        this.isLoading = false;
      }
      else {
        this.subscription = this.dataStorageService.getPost(this.id).subscribe({
          next: post => {
            console.log(post);
            this.isLoading = false;
            this.post = post;
          },
          error: error => {
            this.post = this.postsService.getPost(this.id);
            this.isLoading = false;
          }
        });

        
      }

    })
    this.dataStorageService.getPostAuthor(this.id).subscribe({

      next: (post: Post) => {
        this.dataStorageService.getUser(post.userId).subscribe(user => {
          this.userName = user.username;
          console.log("from post-detail get author")
          console.log(user);
        })

      },

      error: error=>{
        console.log("from post-detail get author")
        console.log(error)
        this.userName = "New user";
      }
    })

  }

  onDeletePost(id: number) {
    this.postsService.deletePost(id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onEditPost(id: number) {
    this.editMode = true;
    this.postsService.editMode = true;
    this.postChanged.emit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
