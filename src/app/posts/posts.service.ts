import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Post } from "./posts.model";

@Injectable({providedIn:'root'})
export class PostsService{
    private posts: Post[] = [];
    post:Post;
    postsChanged = new Subject<Post[]>();
    deleted:boolean = false;
    editMode:boolean = false;
    useLocal:boolean = false;
    sourceChange = new Subject<boolean>();

    constructor(private dataStorageService: DataStorageService){}

    setPosts(posts){
        this.posts = posts;
        console.log("posts");
        console.log(this.posts);
    }

    setPost(post:Post){
        this.post = post;
    }

    
    getPosts(){
        return this.posts;
    }

    getPost(id:number){
        let index = this.findIndex(id);
        return this.posts[index];
    }

    addPost(newPost:Post){
        this.posts.push(newPost);
        this.postsChanged.next(this.posts);
    }

    deletePost(id:number){
        this.deleted = true;
        this.posts.splice(this.findIndex(id),1);
        this.postsChanged.next(this.posts);
        this.dataStorageService.deletePost(id);
    }

    editPost(id:number, title:string, body:string){
        let updatedIndex = this.findIndex(id);
        this.posts[updatedIndex].title = title;
        this.posts[updatedIndex].body = body;
        this.dataStorageService.updatePost(this.posts[updatedIndex]);
        this.postsChanged.next(this.posts);
        this.editMode = false;
        this.useLocal = true;
        this.sourceChange.next(this.useLocal);
    }

    private findIndex(id:number){
        return this.posts.findIndex(post=> post.id === id);
    }

}