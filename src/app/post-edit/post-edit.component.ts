import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

//  form: FormGroup;
// 어째서 오류가 뜨는가?
// 기본적으로 form = null 이 된데
// 따라서, 값이 있든 없든 상관없다는 '!'를 붙인다

  form!: FormGroup;
  // <form [formGroup]="form"> 와 바인딩 된 객체
  
  index: number = 0;
  // uel 파라미터로 index 가져와서 포스트를 구분짓기 위함

  editMode = false;
  // 컴포넌트를 Add 모드로 띄울지, Edit 모드로 띄울지 구분해주는 boolean


  // connect poserService
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let title = '';
    let description = '';
    let imagePath = '';

    this.route.params.subscribe((params: Params) => {
      // 파라미터가 변경할 때마다 읽고 싶다 = subscribe
      // 이 함수가 작동하는 시기는 ?? irl에 파라미터가 들어오거나 변경될 때 뿐인가?

    // this.route.pataMap.subscribe() => 파라미터가 맵 형태로 넘어올 때이다
    // params paraMap 언제 언제 사용해야 하지?

      console.log(params);
      // params 내부는 module.ts 에서 설정한 파라미터명이 key 가 되어 value 값을 가져올 수 있습니다.
      if(params['index']) {
        console.log(params['index'])
        
        this.index = params['index'];

        const post = this.postService.getPost(this.index);

        // 양방향 가능
        title = post.title;
        description = post.description;
        imagePath = post.imagePath;

        this.editMode = true;
      }
    });

    // html form 그룹에서 보내주는 값을 받기 위해서 FormGroup를 사용
    // FormConroel 로 받아온다
    this.form = new FormGroup({
      title: new FormControl(title, [ // 양방향 가능
        Validators.required,
        Validators.maxLength(10),
      ]),
      description: new FormControl(description, [
        Validators.required,
      ]),
      imagePath: new FormControl(imagePath, [
        Validators.required,
      ]),
    });

  }

  onSubmit = () => {
    console.log('submit~~');
    console.log(this.form);
    const title = this.form.value.title;
    const description = this.form.value.description;
    const imagePath = this.form.value.imagePath;

    const post: Post = new Post(title, description, imagePath, 'test@test.com', new Date(), 0);
    
    // Calling poserService
    !this.editMode ? this.postService.addPost(post) : this.postService.updatePost(this.index, post);

    // location.href 쓰지 마라
    this.router.navigate(["/post-list"]);
    
  }

}
