import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { User } from "./user.model";

@Injectable({providedIn:'root'})
export class UsersService {
  private users:User[] = [];

  sortingOptions = [
    { optionId: ["username"], optionName: "Username" },
    { optionId: ["name"], optionName: "Name" },
    { optionId: ["email"], optionName: "Email" },
    { optionId: ["phone"], optionName: "Phone" },
    { optionId: ["company","name"], optionName: "Company Name" }
  ];

  constructor(private http: HttpClient) { }

  setUsers(users){
    this.users = users;
    console.log("from users service")
    console.log(this.users);
  }

  getUsers(){
    return this.users;
  }

  getUser(id:number){
    let index = this.users.findIndex(user => user.id === id);
    return this.users[index];
  }

  sortUsersAsc(users, sortOption) {
    let sortA,sortB;

    this.users = users.sort((a, b) => {
      if(sortOption.length === 1){
        sortA = a[sortOption[0]].toLowerCase(),
        sortB = b[sortOption[0]].toLowerCase();
      }
      else{
        sortA = a[sortOption[0]][sortOption[1]].toLowerCase(),
        sortB = b[sortOption[0]][sortOption[1]].toLowerCase();
      }
     

      if (sortA < sortB) {
        return -1;
      }
      if (sortA > sortB) {
        return 1;
      }
      return 0;
    });
  }

}