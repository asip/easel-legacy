import Vue from 'vue'
import Axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  const comment_vm = new Vue({
      el: '#commentComponent',
      data: {
        comment: {
          user_id: '',
          frame_id: '',
          body: '',
        },
        comments: []
      },
      methods: {
        getComments: function() {
          Axios.get('http://localhost:3000/api/v1/frames/' + this.comment.frame_id + '/comments')
            .then(response => { 
              this.comments = response.data.data;
              //console.log(this.comments);
            });
        },
        postComment: function(){
          Axios.post('http://localhost:3000/api/v1/frames/' + this.comment.frame_id + '/comments',
            {
              comment: this.comment
            })
            .then(response => {
              this.comment.body = '';
              this.getComments();
            });
        },
        setComment: function(){
          this.comment.frame_id= this.$el.getAttribute('data-frame-id');
          this.comment.user_id = this.$el.getAttribute('data-user-id');
          //console.log(this.comment.userId);
          //console.log(this.comment.frameId);
          //console.log(this.comment.body);
          this.postComment();
        }
      },
      mounted: function(){
        this.comment.frame_id = this.$el.getAttribute('data-frame-id')
        this.getComments();
        //this.$forceUpdate();
      }
    });

  //console.log(comment_vm.$data);
});