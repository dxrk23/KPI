<script>
import Comment from './Comment.vue';
import CommentService from "../../services/comment.service";
import PostService from "../../services/post.service";

const commentService = new CommentService();
const postService = new PostService();

export default {
  name: 'BlogPost',
  components: {Comment},
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentInput: '',
      comments: {},
      commentItems: [],
      page: 1,
      isEditing: false,
      inputHeight: 35,
    };
  },
  computed: {
    getUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
    getComments() {
      return this.commentItems;
    },
  },
  methods: {
    // TODO - work with title's adaptivity (when it's too long)

    handleKeyPress(event) {
      if (event.keyCode === 27) {
        this.isEditing = false;
      }

      if (event.keyCode === 13 && event.shiftKey) {
        this.inputHeight += 35;
      }
    },

    addComment() {
      if (this.commentInput.length <= 0) return;
      commentService.createComment({
        content: this.commentInput,
        groupId: this.post.commentsId,
      }).then(() => {
        this.refreshComments();
        this.clearInput();
      });
    },

    clearInput() {
      document.getElementsByClassName('--comment-input')[0].innerHTML = '';
    },

    deletePost() {
      postService.deletePost(this.post.id).then((res) => {
        this.$emit('onPostDelete', res);
      });
    },

    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },

    updatePost() {
      if (!this.isNotEmpty(this.post.content) && !this.isNotEmpty(this.post.title)) {
        this.toggleEditMode();
        return;
      }
      postService.updatePost({
        title: this.post.title,
        content: this.post.content,
        id: this.post.id,
      }).then(() => {
        this.isEditing = false;
      });
    },

    updateEditInput(str) {
      this.post.content = str;
    },

    refreshComments() {
      this.page = 1;
      commentService.getComments(this.post.commentsId).then(response => {
        this.comments = response;
        this.commentItems = response.items;
      });
    },

    onCommentDelete() {
      this.refreshComments();
    },

    updateTitleInput(str) {
      this.post.title = str;
    },

    isNotEmpty(str) {
      return str.replace(/<br>/g, '').replace(/&nbsp;/g, '').replace(/\s/g, '').length > 0;
    },

    onCommentInput(str) {
      this.commentInput = str;
    },

    loadComments() {
      this.page++;
      commentService.getComments(this.post.commentsId, this.page).then(response => {
        this.comments = response;
        this.commentItems = [...this.commentItems, ...response.items];
      });
    },
  },
  mounted() {
    this.refreshComments();
    let loadComments = this.loadComments;

    document.querySelector('.--user-comments').addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop === this.clientHeight) {
        loadComments();
      }
    });
  }
};
</script>

<template>
  <div class="--blog-post-main">
    <div class="--blog-post-header">
      <div class="--profile-picture"></div>
      <div class="--post-header">
        <div :contenteditable="isEditing" class="--theme" @input="updateTitleInput($event.target.innerHTML)"
             v-html="post.title"></div>
        <div class="--post-metadata">
          {{ `by ${post.author.fullName}, ${new Date(post.writtenDate).toLocaleDateString()}` }}
        </div>
      </div>
    </div>
    <div v-if="!isEditing" class="--post-text" v-html="post.content"></div>
    <div v-if="isEditing" class="--post-edit">
      <div class="--edit-area" contenteditable="true" @input="updateEditInput($event.target.innerHTML)"
           @keypress="handleKeyPress"></div>
      <button class="--edit-button" @click="updatePost()">Edit</button>
    </div>
    <div class="--comments">
      <div class="--comments-title">Comment ({{ `${comments.totalItems}` }})</div>
      <form class="--comment-form">
        <div class="--comment-input" contenteditable="true" @input="onCommentInput($event.target.innerHTML)"></div>
        <button class="--comment-button" @click.prevent="addComment">Comment</button>
      </form>
      <hr/>
      <div v-show="comments.totalItems > 0" class="--user-comments">
        <comment v-for="comment in getComments" :comment="comment" @onCommentDelete="onCommentDelete()"/>
      </div>
    </div>
    <div class="--delete-mark" @click="deletePost()">x</div>
    <div class="--edit-mark">
      <span class="material-icons" @click="toggleEditMode()">edit</span>
    </div>
  </div>
</template>

<style scoped>
.--blog-post-main {
  width: 96%;
  margin-top: 25px;

  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.32);
  padding: 10px 37px 20px 21px;

  position: relative;
}

.--delete-mark {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.32);
}

.--edit-button {
  margin-top: 20px;
  width: 70px;
  height: 30px;
  background: #33a8d5;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
}

.--edit-button:hover {
  background: #2f9ec4;
}

.--edit-mark:active {
  background: #2f9ec4;
  opacity: 0.8;
}

.--edit-mark {
  position: absolute;
  top: 5px;
  right: 25px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  line-height: 20px;
  cursor: pointer;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.32);

  display: flex;
  align-items: center;
  justify-content: center;
}

textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;

  transition: height 0.3s ease-in-out;
}

.--post-edit {
  max-width: 825px;
  margin-top: 14px;
  margin-left: 68px;
  margin-bottom: 30px;

  font-size: 20px;
  line-height: 23px;
}

.--edit-area {
  width: 100%;
  min-height: 35px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 15px;
  font-size: 20px;
  line-height: 23px;
  outline: none;

  transition: height 0.3s ease-in-out;
}

.--edit-mark:hover, .--delete-mark:hover {
  background-color: #f5f5f5;
}

.--edit-mark:active, .--delete-mark:active {
  background-color: #e0e0e0;
}

.--post-header {
  display: inline-block;
  margin-left: 22px;
  margin-top: -23px;
}

.--profile-picture {
  width: 48px;
  height: 48px;

  border: solid 1px #ccc;
  margin-top: 23px;

  border-radius: 50%;
}

.--theme {
  margin-left: 10px;

  font-size: 24px;
  font-weight: bold;
}

.--blog-post-header {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.--post-metadata {
  display: block;
  margin-left: 10px;

  font-size: 14px;
  font-weight: bold;
}

.--post-text {
  max-width: 825px;
  margin-top: 14px;
  margin-left: 68px;
  margin-bottom: 30px;

  font-size: 20px;
  line-height: 23px;
}

.--comments-title {
  margin-left: 62px;
  font-size: 16px;
  font-weight: bold;
}

.--comment-form {
  width: 404px;
  height: auto;

  margin-top: 20px;
  margin-left: 62px;
  margin-bottom: 20px;

  display: flex;
}

.--comment-input {
  width: 285px;
  height: auto;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  font-size: 20px;
  padding-left: 10px;

  display: flex;
  align-items: center;
}

.--comment-button {
  margin-left: 12px;
  width: 107px;
  height: 30px;

  background: #33a8d5;
  border-radius: 6px;
  border: none;

  color: #fff;

  font-size: 16px;
  font-weight: 700;
}

.--comment-button:hover {
  background: #2f9ec4;
  cursor: pointer;
}

.--comment-button:active {
  background: #2f9ec4;
  opacity: 0.8;
}

hr {
  border: 1px solid gray;
  opacity: 0.7;
}

.--user-comments {
  margin-left: 62px;
  margin-top: 15px;

  width: 93%;
  height: 240px;
  padding: 0 0 10px 10px;

  border: 1px solid #ccc;

  overflow-y: auto;
}
</style>
