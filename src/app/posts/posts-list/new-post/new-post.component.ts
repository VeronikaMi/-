import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../../posts.model';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit{
  @Output() cancel = new EventEmitter();
  @Input()post:Post;
  editMode:boolean;
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.editMode = this.postsService.editMode;
  }
  
  onSubmit(form:NgForm){
    if(this.editMode){
      let updatedTitle = form.value.title;
      let updatedBody = form.value.body;
      this.postsService.editPost(this.post.id,updatedTitle,updatedBody);
    }
    else{
      let lastPostId:number = this.postsService.getPosts()[this.postsService.getPosts().length-1].id;
      let newPost = {userId: 11,id:lastPostId +1, title: form.value.title,body : form.value.body} ;
      console.log(newPost)
      this.postsService.addPost(newPost);
    }
    form.reset();
    this.cancel.emit();
  }

  onCancel(){
    this.cancel.emit();
  }

}
