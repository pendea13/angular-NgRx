import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PostDTO, PostInterface} from '../../models/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateWhitespace} from '../../utilities/validators';

@Component({
  selector: 'app-editable-post',
  templateUrl: './editable-post.component.html',
  styleUrls: ['./editable-post.component.scss']
})
export class EditablePostComponent implements OnInit, OnChanges {
  @Input()
  post: PostInterface;

  @Output()
  onSubmit: EventEmitter<PostDTO> = new EventEmitter<PostDTO>();

  postForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    this.buildForm();
  }

  buildForm() {
    this.postForm = this.fb.group({
      title: this.fb.control((this.post && this.post.title) || '', [
        Validators.required,
        validateWhitespace
      ]),
      description: this.fb.control((this.post && this.post.description) || '', [
        Validators.required,
        validateWhitespace
      ])
    });
  }

  submit() {
    const submission: PostDTO = this.postForm.getRawValue();
    this.onSubmit.emit(submission);
  }
}
