import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { UsersService } from "./users.service";

@Injectable({providedIn:'root'})
export class UsersResolverService implements Resolve<any>{
    constructor(private dataStorageService: DataStorageService,
                private usersService: UsersService){}

    resolve(route: ActivatedRouteSnapshot) :Observable<any>{
        return this.dataStorageService.fetchUsers().pipe(
            tap(users => this.usersService.setUsers(users) 
            ),
            catchError(error=>{
                console.log(error);
                return of(error);
            })
        )
    }
}