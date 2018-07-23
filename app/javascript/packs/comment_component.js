import Vue from 'vue'
import Axios from 'axios'
import sanitizeHtml from 'sanitize-html'

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

document.addEventListener('DOMContentLoaded', () => {
  const comment_vm = new Vue({
      el: '#commentComponent',
      data: {
        comment: {
          user_id: '',
          frame_id: '',
          body: '',
        },
        comments: [],
        current_user_id: ''
      },
      methods: {
        getComments: function() {
          Axios.get('http://localhost:3000/api/v1/frames/' + this.comment.frame_id + '/comments')
            .then(response => {
              if(response.data){ 
                this.comments = response.data.data;
                //console.log(this.comments);
              }
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
          if(this.comment.body != ''){
            this.comment.frame_id= this.$el.getAttribute('data-frame-id');
            this.comment.user_id = this.$el.getAttribute('data-user-id');
            //console.log(this.comment.userId);
            //console.log(this.comment.frameId);
            //console.log(this.comment.body);
            this.postComment();
          }
        },
        deleteComment: function(comment){
          this.current_user_id = this.$el.getAttribute('data-user-id');
          Axios.delete('http://localhost:3000/api/v1/comments/' + comment.id)
            .then(response => {
              this.getComments();
            })
        }
      },
      mounted: function(){
        this.comment.frame_id = this.$el.getAttribute('data-frame-id')
        this.comment.user_id = this.$el.getAttribute('data-user-id');
        this.current_user_id = this.$el.getAttribute('data-user-id');
        this.getComments();
        //this.$forceUpdate();
      }
    });

  Vue.filter('nl2br', value => value.replace(/\n/g, '<br>'));
  Vue.prototype.$sanitize = sanitizeHtml;

  //console.log(comment_vm.$data);
});