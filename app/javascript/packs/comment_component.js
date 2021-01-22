import Vue from 'vue'
import TurbolinksAdapter from 'vue-turbolinks';
import Axios from 'axios'
import sanitizeHtml from 'sanitize-html'
import * as constants from '../constants.js.erb'

//console.log(constants.api_origin);

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

Vue.use(TurbolinksAdapter);
Vue.prototype.$sanitize = sanitizeHtml;
Vue.filter('nl2br', value => value.replace(/\n/g, '<br>'));

document.addEventListener('turbolinks:load', () => {
  const template = document.querySelector('#commentComponent')
  if (template) {

    const comment_vm = new Vue({
      el: '#commentComponent',
      data: {
        comment: {
          user_id: '',
          frame_id: '',
          body: '',
        },
        error_messages: [],
        comments: [],
        account: null,
        current_user: {
          id: '',
          token: ''
        },
        logged_in: null
      },
      methods: {
        getAccount: function () {
          Axios.get(`${constants.api_origin}/api/v1/account`,
            {
              headers: {
                Authorization: `Bearer ${this.current_user.token}`
              }
            })
            .then(response => {
              if (response.data) {
                this.account = response.data.data;
                //console.log(this.account);
                this.current_user.id = this.account.attributes.id;
                this.comment.user_id = this.current_user.id
              }
            });
        },
        getComments: function () {
          Axios.get(`${constants.api_origin}/api/v1/frames/${this.comment.frame_id}/comments`)
            .then(response => {
              if (response.data) {
                this.comments = response.data.data;
                //console.log(this.comments);
              }
            });
        },
        postComment: function () {
          Axios.post(`${constants.api_origin}/api/v1/frames/${this.comment.frame_id}/comments`,
            {
              comment: this.comment
            }, {
            headers: {
              Authorization: `Bearer ${this.current_user.token}`
            }
          })
            .then(response => {
              if (response.data.data.attributes.error_messages && response.data.data.attributes.error_messages.length > 0) {
                this.error_messages = response.data.data.attributes.error_messages;
              } else {
                this.comment.body = '';
                this.error_messages.splice(0, this.error_messages.length);
                this.getComments();
              }
            })
            .catch(error => {
              this.error_messages = ['ログインしてください。'];
            });
        },
        setComment: function () {
          if (this.comment.body != '') {
            //console.log(this.comment.userId);
            //console.log(this.comment.frameId);
            //console.log(this.comment.body);
            this.postComment();
          } else {
            this.error_messages = ['コメントを入力してください。'];
          }
        },
        deleteComment: function (comment) {
          Axios.delete(constants.api_origin + '/api/v1/comments/' + comment.id, {
            headers: {
              Authorization: `Bearer ${this.current_user.token}`
            }
          })
            .then(response => {
              this.getComments();
            })
            .catch(error => {
              this.error_messages = ['ログインしてください。'];
            });
        }
      },
      mounted: function () {
        this.current_user.token = this.$el.getAttribute('data-token');
        if(this.$el.getAttribute('data-login') == 'true'){
          this.logged_in = true;
        } else {
          this.logged_in = false;
        }
        if (this.current_user.token != null && this.current_user.token != '') {
          this.getAccount();
        }
        this.comment.frame_id = this.$el.getAttribute('data-frame-id')
        this.getComments();
        //this.$forceUpdate();
      }
    });

  }
  //console.log(comment_vm.$data);
});