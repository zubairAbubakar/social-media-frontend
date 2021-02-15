import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];


  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {

    this.getPosts()
  }



  getPosts() {
    this.postService.getPostList().subscribe(
      data => {
        this.posts = data;

      }
    );
  }

  deletePost(id: Number){

    this.postService.deletePost(id).subscribe(
      {
        next: response => {
          alert(`Your post was successfully deleted`);
          this.backHome();
          
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }  
      );
  }

  backHome(){
    this.router.navigateByUrl("/posts");
  }

}
