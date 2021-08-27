import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postAuthor?: string;
  @Input() postDate?: string;
  @Input() postTitle?: string;
  @Input() postContent?: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
