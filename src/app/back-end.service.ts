import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { tap } from 'rxjs/operators';



//  DB 경로
//  https://live-posts-f37a0-default-rtdb.firebaseio.com/


@Injectable({  providedIn: 'root' })
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) {};

  // Fun 1 - save
  saveData() {
    // step 1 - post.service 로부터 리스트를 가져오시오
    const listOfPosts: Post[] = this.postService.getPosts();

    // step 2 - 백앤드로 리스트를 보내시오
  this.http
  .put(
    'https://live-posts-d144b-default-rtdb.firebaseio.com/posts.json',
    listOfPosts
    )
    .subscribe((res) => {
      console.log(res);
    });

    // 첫번쨰 파라미터 : url    => psts.json  => json 파일로 저장시키겠다
    // 두번째 파라미터 : 데이터
  
  }

  // Fun 2 - fetch  
  fetchData() {
    this.http
      .get<Post[]>(
        'https://live-posts-d144b-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        tap((listOfPosts: Post[]) => {
          console.log(listOfPosts);

          // Step 2 - Send to post.service
          this.postService.setPosts(listOfPosts);
        })
      )
      .subscribe();
  }
  //

}