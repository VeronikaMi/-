import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  postsPerPage:number = 10;
  currentPage:number;

  posts: Post[];
  pages: number[] = [];
  pagesNumber: number;
  visiblePosts:Post[] = [];

  arrowLeft = faChevronLeft;
  arrowRight = faChevronRight;

  constructor(private postsService: PostsService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();

    this.pagesNumber = this.posts.length % this.postsPerPage === 0 ? this.posts.length / this.postsPerPage : this.posts.length / this.postsPerPage + 1;
    for(let i = 1; i<=this.pagesNumber; i++){
      this.pages.push(i);
    }

    this.visiblePosts = this.posts.slice(0,10);
    this.currentPage = 1;
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
    let startIndex = (this.currentPage - 1)*10;
    let endIndex = startIndex+9 > this.posts.length ? this.posts.length -1 : startIndex + 9;

    this.visiblePosts = this.posts.filter((post,index) =>{
      if(index>= startIndex && index<= endIndex){
        return 1;
      }
    } )
  }
}
