import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  id: number;
  comments: Comment[] = [];
  isLoading:boolean = true;

  constructor(private dataStorageService: DataStorageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })

    this.dataStorageService.getComments(this.id).subscribe({
      next: comments => {
        this.comments = comments;
        this.isLoading = false;
      },
      error:error=>{
      }
    })
  }

}
