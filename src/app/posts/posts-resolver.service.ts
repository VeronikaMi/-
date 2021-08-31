import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { Post } from "./posts.model";
import { PostsService } from "./posts.service";

@Injectable({providedIn:'root'})
export class PostsResolverService implements Resolve<any>{
    posts:Post[] = this.postsService.getPosts();
    constructor(private dataStorageService: DataStorageService,
                private postsService: PostsService){}

    resolve(route: ActivatedRouteSnapshot){
        if(this.posts.length === 0){
            console.log("resolver retruns request")
            return this.dataStorageService.fetchPosts()
            .pipe(tap(posts=>{
                this.postsService.setPosts(posts);
            }));
        }
        else{
            console.log("resolver retruns posts from service")
            console.log(this.posts)
            this.postsService.setPosts(this.posts);
        }
        
    }

}