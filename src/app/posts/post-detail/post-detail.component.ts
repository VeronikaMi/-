import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit,OnDestroy {
  post; // error on :Post , doesn't have value when assigned
  postChanged = new EventEmitter();
  id:number;
  isLoading = true;
  editMode: boolean = false;
  subscription:Subscription;

  constructor(private dataStorageService: DataStorageService,
              private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit(): void {
    this.postChanged.subscribe(()=>{
      this.post = this.postsService.getPost(this.id);
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if(this.postsService.deleted || this.postsService.useLocal){
        this.post = this.postsService.getPost(this.id);
        this.isLoading = false;
      }
      else{
        this.subscription=this.dataStorageService.getPost(this.id).subscribe({
          next: post => {
            console.log(post);
            this.isLoading = false;
            this.post = post;
          },
          error: error => {
            // console.log("Error : " + error);
            this.post = this.postsService.getPost(this.id);
            this.isLoading = false;
            // console.log(this.post);
          }
        });
      }
      
    })
  }

  onDeletePost(id:number){
    this.postsService.deletePost(id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onEditPost(id:number){
    this.editMode = true;
    this.postsService.editMode = true;
    this.postChanged.emit();
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
