import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { PostsService } from "./posts.service";

@Injectable({providedIn:'root'})
export class PostsResolverService implements Resolve<any>{
    constructor(private dataStorageService: DataStorageService,
                private postsService: PostsService){}

    resolve(route: ActivatedRouteSnapshot){
        return this.dataStorageService.fetchPosts()
        .pipe(tap(posts=>{
            this.postsService.setPosts(posts);
        }));
    }

}