import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { User } from "../users/user.model";
import { UsersService } from "../users/users.service";
import { Post } from "../posts/posts.model"
import { PostsService } from "../posts/posts.service";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    page:number;
    pageChanged = new Subject<number>();
    constructor(private http: HttpClient, 
                private usersService: UsersService,
                private postsService:PostsService){}

    fetchUsers(){
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(tap(users=>{
            this.usersService.setUsers(users);
        }));
    }

    fetchPosts(){
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(tap(posts=>{
            this.postsService.setPosts(posts);
        }))
    }
    
}