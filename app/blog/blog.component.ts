import { Component, OnInit } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styles: []
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost> = blogData;
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
