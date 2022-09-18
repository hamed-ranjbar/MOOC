import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/interfaces/comment';
import { Student } from 'src/app/interfaces/student';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MoocDataService } from 'src/app/_services/mooc-data.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit, OnChanges {

  formControl = new FormControl('', [Validators.required]);
  formError = '';
  private _comment = {
    comments: [] as Comment[],
    student: { first_name: '', last_name: '' } as Student
  } as Comment;

  @Input()
  get comment() {
    return this._comment
  }
  set comment(input) {
    this._comment = input;
  }

  constructor(
    private auth: AuthenticationService,
    private moocDataService: MoocDataService
  ) {
  }

  async ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.getSubComments();
    if (changes[this.formError] && changes[this.formError].currentValue == changes[this.formError].previousValue)
      this.formError = '';
  }

  submitComment() {
    if (this.formControl.errors) {
      this.formError = 'you can\'t leave comment box empty!';
      return;
    }
    const newComment = {
      text: this.formControl.value,
      student_id: this.auth.getCurrentUser().id,
      reply_to: this.comment.id
    } as Comment;
    this.moocDataService.createComment(newComment).then(createdComment => {
      this.comment.comments.push(createdComment);
    });
  }

  getSubComments() {
    this.moocDataService.getCommentsReply(this.comment.id)
      .then(foundComments => {
        this.comment.comments = foundComments;
      });
  }
}
