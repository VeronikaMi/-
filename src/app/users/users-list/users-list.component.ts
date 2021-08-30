import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  sortingOp = this.usersService.sortingOptions;

  selectedOptionName: string;
  searchString:string;

  previousSelectedOption: string = null;
  previousSelectedOptionIndex: number = null;

  constructor(private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.selectedOptionName = this.usersService.selectedSortingOption;
  }

  onSortClick(event) {
    this.selectedOptionName = event.target.innerText;
    this.usersService.selectedSortingOption = this.selectedOptionName;
    console.log("class " +event.target.className);

    let indexOfSelected: number = this.usersService.sortingOptions
      .findIndex(option => option.optionName === this.selectedOptionName);

    let selectedOption: string[] = this.usersService.sortingOptions[indexOfSelected].optionId;

    if (this.previousSelectedOption !== this.selectedOptionName) {
      this.usersService.sortUsersAsc(this.users, selectedOption);
      this.previousSelectedOption = this.selectedOptionName;
    }
    else {
      this.users.reverse();
    }
  }

  onUserClick(id) {
    this.router.navigate(['/users', id], { relativeTo: this.route });
  }

  onFilter(){
    this.users = this.usersService.getUsers();
    let preparedString = this.searchString.toLowerCase().trim();
    let words: string[] = preparedString.split(' ');
    console.log(words);

    words.forEach(word =>{
      this.users = this.users.filter(user => {
        if(user.name.toLowerCase().includes(word) || user.email.toLowerCase().includes(word) || user.phone.toLowerCase().includes(word)){
          console.log(user.username.toLowerCase());
          return true;
        }
        else{
          return false;
        }
      })
    })
  }

}
