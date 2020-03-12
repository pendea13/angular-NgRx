import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import {PostComponent} from './components/post/post.component';
import { EditablePostComponent } from './components/editable-post/editable-post.component';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    PostComponent,
    EditablePostComponent,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: [PostComponent, EditablePostComponent]
})
export class UIModule {}
