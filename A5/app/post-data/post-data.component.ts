import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styles: []
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub : any;
  postSub: any;
  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.postSub = this.data.getPostbyId(params['id']).subscribe(data => {this.post = data});
    })
  }

  ngOnDestroy(): void{
    if(this.querySub) this.querySub.unsubscribe();this.postSub.unsubscribe();
  }

}
