import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map} from 'rxjs/operators'

import { User } from "./user.model";
import { UsersService } from "./users.service";

@Injectable({ providedIn: 'root' })
export class UsersHttpService {
  users:User[] = [];

  constructor(private http: HttpClient,
                private usersService: UsersService) { }

  fetchUsers() {
    console.log("fetch");
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
    .subscribe(users => {
      console.log("in subscribe");
      this.usersService.setUsers(users);
      console.log(this.users)
    });;;   
  }

//   getUsers(){
//     this.fetchUsers();
//     console.log("get")
//     console.log(this.users)

//   }


}