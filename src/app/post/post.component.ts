import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  @Input() post?: Post;
  // 포스트 리스트 컴포넌트로부터 empty vlaue가 올 수도 있기 떄문에 ? 를 붙인다
  // post-list 컴포넌트에서 리액트의 props 와 비슷하게 건네준 값을 @Input 으로 받아낸다
  // @Input & @Output 개념은 정확히 알아두도록 하세요
  // @Input 부모  => 자식, 따라서, postList 컴포넌트에서 post 컴포넌트로 온 Post 를 사용함
  // 그럼 @Output 은 반대의 경우에 사용하겠죠?

  @Input() index: number = 0;


  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.post);
    console.log(this.index);

  }

  onDelete = () => {
    console.log("delete");
    this.postService.deletePost(this.index);
  }

  onEdit = () => {
    console.log("Edit");
    this.router.navigate(['/post-edit', this.index]);
    // this.index 어떻게 가져온 거야? ㅋㅋㅋㅋㅋㅋ
  }
}
