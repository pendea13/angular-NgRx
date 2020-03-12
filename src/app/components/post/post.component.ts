import {Component, Input, OnInit} from '@angular/core';
import {PostInterface} from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input()
  post: PostInterface;
  @Input()
  displayOptions: boolean = false;

}
