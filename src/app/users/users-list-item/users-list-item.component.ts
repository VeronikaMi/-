import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {
  @Input() user:User;

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
