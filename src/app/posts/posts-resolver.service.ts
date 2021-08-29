import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn:'root'})
export class PostsResolverService implements Resolve<any>{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot){
        return this.dataStorageService.fetchPosts();
    }

}