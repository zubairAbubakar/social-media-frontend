import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  post: Post;
  postId: number;
  postFile: any;
  isVideo: boolean;
  fileType: string;
  fileName: string;
  videoUrl: string;

  @ViewChild('video')

  public video: ElementRef;

  constructor(private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getPost();
    });

  }


  getPost() {
    this.postId = +this.route.snapshot.paramMap.get('id');
    console.log("postId:" +this.postId);
    this.postService.getPost(this.postId).subscribe(
      data => {
        this.post = data;
        if(this.post.contentType === 'video'){
          this.isVideo = true;
        }

        this.videoUrl = "http://localhost:7071/stream/"+this.post.fileName;
        console.log(this.videoUrl);

        // this.video.nativeElement.src = this.videoUrl;
        // this.video.nativeElement.load();
        // this.video.nativeElement.play();
        
        this.getPostFile();

      }
    );
  }


  getPostFile() {
    this.postService.getPostFile(this.post.fileName).subscribe(
      success => {
          const objectURL = URL.createObjectURL(success);
          this.postFile = this.domSanitizer.bypassSecurityTrustUrl(objectURL);

          console.log('post '+this.postFile)
      },
      error => {
          console.log(error);
      }
  );
  }


}
