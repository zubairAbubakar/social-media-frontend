import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostFormGroup: FormGroup;
  postFile: any;
  progress = 0;
  message = '';
  currentFile: File;
  selectedFiles: FileList;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.addPostFormGroup = this.formBuilder.group({

      post: this.formBuilder.group({
        description: [''],
        contentType: [''],
        content: [''],
      })
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  

  upload(){
    this.progress = 0; 

    this.currentFile = this.selectedFiles.item(0);
    //this.postService.postFile = this.fileUploaded;
    this.postService.uploadPostFile(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.postService.postFile = this.currentFile;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

      this.selectedFiles = undefined;
}


  onSubmit(){

    let post = new Post()

    //this.postFile.na
    //get form details
    post = this.addPostFormGroup.controls['post'].value;
    post.fileName = this.postService.postFile.name;
    // this.postService.formData.append('description', this.addPostFormGroup.controls['post'].value.description);
    // this.postService.formData.append('contentType', this.addPostFormGroup.controls['post'].value.contentType);
    // this.postService.formData.append('file', this.postFile, this.postFile.name);

       //call REST API via sellerService to add the service
       this.postService.addPost(post).subscribe(
        {
          next: response => {
            alert(`Your post was successfully added`);
            console.log(response);
          //   if (this.postService.postFile){
          //     this.postService.uploadPostFile().subscribe(
          //         successImage => {
          //         },
          //         error => {
          //             console.log(error);
          //         }
          //     );
          // }else{
            
          // }
            //reset form
            this.resetForm();
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
        }
      );

  }

  resetForm() {
    this.addPostFormGroup.reset();
    this.router.navigateByUrl("/posts");
  }

}
