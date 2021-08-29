import { Injectable } from "@angular/core";
import { Post } from "./posts.model";

@Injectable({providedIn:'root'})
export class PostsService{
    private posts: Post[] = [];

    setPosts(posts){
        this.posts = posts;
        console.log("posts");
        console.log(this.posts);
    }

    getPosts(){
        return this. posts;
    }

}