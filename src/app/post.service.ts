import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostService {
    // export 하는 시점에서 public 으로 인지되는 것 같다

    // 얘를 접근지정자로 private로 해야 하는게 아닐까?
    // 이대로면 그냥 바로 변경되지 않나?
    listChangedEvent: EventEmitter<Post[]> = new EventEmitter();
    listOfPosts: Post[] = [
        new Post(
          'Cat Gallery',
          'She is so beautiful~~(1)',
          'https://i.imgur.com/XAmE9GO.jpeg',
          'LSWN',
          new Date(),
          10
        ),
        new Post(
          'Cat Gallery2',
          'She is so beautiful~~(2)',
          'https://i.imgur.com/XAmE9GO.jpeg',
          'LSWN',
          new Date(),
          1
        ),
        new Post(
          'Cat Gallery3',
          'She is so beautiful~~(3)',
          'https://i.imgur.com/XAmE9GO.jpeg',
          'LSWN',
          new Date(),
          14
        ),
        new Post(
          'Cat Gallery4',
          'She is so beautiful~~(4)',
          'https://i.imgur.com/XAmE9GO.jpeg',
          'LSWN',
          new Date(),
          6
        ),
      ];
      
    // facility 1
    getPosts() {
        return this.listOfPosts;
    }

    // facility2
    deletePost(index: number) {
        this.listOfPosts.splice(index, 1);
    }

    // Facility3
    addPost(post: Post) {
        this.listOfPosts.push(post);
    }

    // facility 4
    updatePost(index: number, post: Post) {
        this.listOfPosts[index] = post;
    }

    // facility 5
    getPost(index: number) {
      return this.listOfPosts[index];
    }
  
    // facility 6 : 좋아요!
    likePost(index: number) {
      this.listOfPosts[index].numberOfLikes += 1;
    } 
  // facility 7
  setPosts(listOfPosts: Post[]) {
    this.listOfPosts = listOfPosts;
    this.listChangedEvent.emit(listOfPosts);
  }
}

