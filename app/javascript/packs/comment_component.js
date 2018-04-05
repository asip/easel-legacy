import Vue from 'vue'
import Axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  const comment_vm = new Vue({
      el: '#commentComponent',
      data: {
        comment: {
          userId: '',
          frameId: '',
          body: '',
        },
        comments: []
      },
      methods: {
        getComments: function(frameId) {
          Axios.get('http://localhost:3000/api/v1/frames/' + frameId + '/comments')
            .then(response => { 
              this.comments = response.data.data;
              //console.log(this.comments);
            });
        },
        setComment: function(){
          this.comment.frameId= this.$el.getAttribute('data-frame-id');
          this.comment.userId = this.$el.getAttribute('data-user-id');
          //console.log(this.comment.userId);
          //console.log(this.comment.frameId);
          //console.log(this.comment.body);
        }
      },
      mounted: function(){
        this.getComments(this.$el.getAttribute('data-frame-id'));
        //this.$forceUpdate();
      }
    });

  //console.log(comment_vm.$data);
});