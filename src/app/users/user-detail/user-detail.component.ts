import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id:number;
  user:User;

  constructor(private route: ActivatedRoute, 
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
    })
    this.user = this.usersService.getUser(this.id);
    console.log(this.user);
  }

}
