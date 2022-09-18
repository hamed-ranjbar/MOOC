import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../interfaces/comment';
import { AuthenticationService } from '../_services/authentication.service';
import { MoocDataService } from '../_services/mooc-data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {

  private _comment_on: string = '';
  @Input()
  get comment_on() {
    return this._comment_on;
  }
  set comment_on(value) {
    this._comment_on = value;
  }

  textController = new FormControl('', Validators.required)

  comments: Comment[] = [];
  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.comment_on)
      await this.readComments();
  }

  readComments() {
    this.moocDataService.getCommentsList(this.comment_on)
      .then(result => {
        this.comments = result;
      });
  }
  submitComment() {
    if (this.textController.errors)
      return;
    const newComment = {
      comment_on: this.comment_on,
      text: this.textController.value,
      student_id: this.auth.getCurrentUser().id
    };
    this.moocDataService.createComment(newComment as Comment)
      .then(createdComment => { this.comments.push(createdComment) });
  }
}
