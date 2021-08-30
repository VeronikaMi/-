import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ViewportScroller } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  subscription:Subscription;

  postsPerPage:number = 10;
  currentPage:number;
  newPostCreate:boolean = false;

  posts: Post[] = [];
  pages: number[] = [];
  pagesNumber: number;
  visiblePosts:Post[] = [];
  visiblePostsChanged = new Subject<Post[]>();

  post:Post;

  arrowLeft = faChevronLeft;
  arrowRight = faChevronRight;

  constructor(private postsService: PostsService,
              private dataStorageService: DataStorageService,
              private scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();

    this.subscription = this.postsService.postsChanged.subscribe(
      posts=>{
        this.posts = posts;
        console.log("Length: " + this.posts.length);
        this.pagesNumber = this.posts.length % this.postsPerPage === 0 ? this.posts.length / this.postsPerPage : Math.floor( this.posts.length / this.postsPerPage) + 1;
        if(this.pagesNumber > this.pages.length){
          this.pages.push(this.pagesNumber);
        }
        this.navigate();
      }
    );

    this.pagesNumber = this.posts.length % this.postsPerPage === 0 ? this.posts.length / this.postsPerPage : Math.floor( this.posts.length / this.postsPerPage) + 1;
    for(let i = 1; i<=this.pagesNumber; i++){
      this.pages.push(i);
    }

    this.visiblePosts = this.posts.slice(0,10);
    this.currentPage = 1;

  }

  onNewPost(){
    this.newPostCreate = true;
  }

  onNavigate(event){
    this.currentPage = +event.target.innerText;
    this.navigate();
  }

  onBackArrow(){
    this.currentPage--;
    this.navigate();
  }

  onNextArrow(){
    this.currentPage++;
    this.navigate();

  }

  private navigate(){
    this.scroller.scrollToPosition([0,0]);

    let startIndex = (this.currentPage - 1)*10;
    let endIndex = startIndex+9 > this.posts.length ? this.posts.length -1 : startIndex + 9;

    this.visiblePosts = this.posts.filter((post,index) =>{
      if(index>= startIndex && index<= endIndex){
        return 1;
      }
    } )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
