import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePostComponent } from './editable-post.component';

describe('EditablePostComponent', () => {
  let component: EditablePostComponent;
  let fixture: ComponentFixture<EditablePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditablePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
