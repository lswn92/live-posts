import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})

export class PostListComponent implements OnInit {

  listOfPosts: Post[] = [];
  /*listOfPosts: Post[] = [
    new Post(
      'Cat Gallery',
      'She is so beautiful~~(1)',
      'https://i.imgur.com/XAmE9GO.jpeg',
      'LSWN',
      new Date()
    ),
    new Post(
      'Cat Gallery2',
      'She is so beautiful~~(2)',
      'https://i.imgur.com/XAmE9GO.jpeg',
      'LSWN',
      new Date()
    ),
    new Post(
      'Cat Gallery3',
      'She is so beautiful~~(3)',
      'https://i.imgur.com/XAmE9GO.jpeg',
      'LSWN',
      new Date()
    ),
    new Post(
      'Cat Gallery4',
      'She is so beautiful~~(4)',
      'https://i.imgur.com/XAmE9GO.jpeg',
      'LSWN',
      new Date()
    ),
  ];*/

  constructor(private postService: PostService) {}
  // 포스트 리스트 컴포넌트가 생성될 때마다, 포스트 서비스와 연결되도록 한다
  // 근데 왜 접근지정자가 private이지?
  // PostService 에서 listOfPosts 를 private 로 선언해야하지 않나?

  // private 로 선언했기 때문에 그냥 접근해서는 속성을 바꿀 수 없다는 걸까?
  // 그래서 setter, getter 처럼 함수를 만들어낸 것일까?

  ngOnInit(): void {

    // 어째서 생성자에서 private를 붙이는지 알기 위해서 질문함

    // impport 했다고 this로 postService가 호출되네...
    this.listOfPosts = this.postService.getPosts();


    console.log('접근지정자 test1');
    //this.postService.deletePost(1); // 왜 안되지?
    console.log(this.postService.getPosts()); // 왜 안되지?


    console.log('접근지정자 test2');
    //this.listOfPosts.splice(1, 1);
    console.log(this.listOfPosts);

  }

  ngTest(): void  { // 나중에 시험해봅시다
    const testPrivate = new PostListComponent(this.postService);

    console.log('접근지정자 3');
    console.log(testPrivate.listOfPosts);
    
  }

}
