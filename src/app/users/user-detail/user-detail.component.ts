import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    console.log(this.user);
  }

}
