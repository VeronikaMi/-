import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { User } from "../users/user.model";
import { UsersService } from "../users/users.service";
import { Post } from "../posts/posts.model"
import { Subject } from "rxjs";
import { Comment } from "../posts/comments-list/comments-list.component";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    page:number;
    pageChanged = new Subject<number>();
    constructor(private http: HttpClient, 
                private usersService: UsersService){}

    fetchUsers(){
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(tap(users=>{
            this.usersService.setUsers(users);
        }));
    }

    getUser(id:number){
        return this.http.get<User>('https://jsonplaceholder.typicode.com/users/'+id);
    }

    fetchPosts(){
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    }

    postPost(post:Post){
        this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
        .subscribe({
            next: response=>{
                console.log(response);
            },
            error: error=>{
                console.log("Error : "+error);
            }
        })
    }

    getPost(id:number){
        return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id)
        .pipe(
            catchError(error=>{
                console.log("error");
                return error;
            })
        )
    }

    deletePost(id:number){
        this.http.delete<Post>('https://jsonplaceholder.typicode.com/posts/'+id)
        .subscribe(()=>{
            console.log("Post deleted");
        })
    }

    updatePost(updatedPost:Post){
        this.http.put<Post>('https://jsonplaceholder.typicode.com/posts/'+updatedPost.id,updatedPost)
        .subscribe({
            next: response=>{
                console.log(response);
            },
            error: error=>{
                console.log("Error : "+error);
            }
        })

    }

    getComments(id:number){
        return this.http.get<Comment[]>('https://jsonplaceholder.typicode.com/posts/'+id+'/comments');
    }
    
}