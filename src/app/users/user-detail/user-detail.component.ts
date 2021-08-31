import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { exhaustMap, take } from 'rxjs/operators';
import { Post } from 'src/app/posts/posts.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id:number;
  user:User;
  isLoading: boolean = true;
  showPosts:boolean = false;
  postsOfUser:Post[] = [];

  constructor(private route: ActivatedRoute, 
              private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
    })
    this.dataStorageService.getUser(this.id).subscribe(user=>{
      this.user = user;
      console.log(user);
      this.isLoading = false;
    })

    this.dataStorageService.getPostsForSingleUser(this.id).pipe(take(1),exhaustMap(data=>{
      console.log("exhaustMAp");
      console.log(data);
      return data;
    })).subscribe(data=>{
      console.log("subscribe after exhaust map");
      console.log(data);
      this.postsOfUser = data;
    })
  }

}
