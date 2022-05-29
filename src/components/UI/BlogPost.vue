<script>
import Comment from './Comment.vue';
import CommentService from "../../services/comment.service";

const commentService = new CommentService();

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
    };
  },
  computed: {
    getUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
  },
  methods: {
    addComment() {
      if (this.commentInput.length <= 0) return;
      commentService.createComment({
        content: this.commentInput,
        groupId: this.post.commentsId,
      }).then(() => {
        this.commentInput = '';
        this.refreshComments();
      });
    },

    refreshComments() {
      this.page = 1;
      commentService.getComments(this.post.commentsId).then(response => {
        this.comments = response;
        this.commentItems = response.items;
      });
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
        <div class="--theme">{{ post.theme }}</div>
        <div class="--post-metadata">
          {{ `by ${post.author.fullName}, ${new Date(post.writtenDate).toLocaleDateString()}` }}
        </div>
      </div>
    </div>
    <div class="--post-text">
      {{ post.content }}
    </div>
    <div class="--comments">
      <div class="--comments-title">Comment ({{ `${comments.totalItems}` }})</div>

      <form class="--comment-form">
        <input v-model="commentInput" class="--comment-input" type="text"/>
        <button @click.prevent="addComment" class="--comment-button">Comment</button>
      </form>

      <hr/>

      <div v-show="comments.totalItems > 0" class="--user-comments">
        <comment v-for="comment in commentItems" :comment="comment"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.--blog-post-main {
  width: 96%;
  margin-top: 25px;

  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.32);
  padding: 10px 37px 20px 21px;
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
  height: 30px;

  margin-top: 20px;
  margin-left: 62px;
  margin-bottom: 20px;
}

.--comment-input {
  width: 285px;
  height: 30px;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  font-size: 16px;
  padding-left: 10px;
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
