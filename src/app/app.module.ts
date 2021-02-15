import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { RouterModule, Routes } from '@angular/router';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [

  {path: 'post/add-post', component: AddPostComponent},  
  {path: 'post/:id', component: ViewPostComponent},
  {path: 'posts', component: PostListComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    AddPostComponent,
    UploadFilesComponent,
    ViewPostComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
