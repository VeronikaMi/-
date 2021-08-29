import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn:'root'})
export class UsersResolverService implements Resolve<any>{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot) :Observable<any>{
        return this.dataStorageService.fetchUsers().pipe(
            catchError(error=>{
                console.log(error);
                return of(error);
            })
        )
    }
}