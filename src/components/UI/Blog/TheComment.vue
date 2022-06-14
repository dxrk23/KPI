<script>
import CommentService from '../../../services/comment.service';

const commentService = new CommentService();

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteComment() {
      commentService.deleteComment(this.comment.id).then(() => {
        this.$emit('onCommentDelete');
      });
    },
  },

  computed: {
    isMyPost() {
      let userId = JSON.parse(localStorage.getItem('user')).sub;
      return userId === this.comment.author.id;
    },
  },
};
</script>

<template>
  <div class="--comment-main">
    <div class="--profile-picture"></div>
    <div class="--content">
      <div class="--header">
        <div class="--author-name">{{ comment.author.fullName }}</div>
        <div class="--date">{{ `${new Date(comment.writtenDate).toLocaleDateString()}` }}</div>
      </div>
      <div class="--text" v-html="comment.content"></div>
    </div>
    <div v-if="isMyPost" class="--delete">
      <i class="fas fa-trash-alt" @click.prevent="deleteComment()">Удалить</i>
    </div>
  </div>
</template>

<style scoped>
.--comment-main {
  width: 100%;

  background: rgba(136, 191, 241, 0.32);
  border-radius: 5px;
  padding: 15px 19px 15px 19px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  margin-top: 11px;
}

.--profile-picture {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 1px solid black;
}

.--header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.--date {
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.54);
}

.--text {
  margin-top: 10px;
}

.--content {
  margin-left: 17px;
  margin-top: -7px;
}

.--delete {
  margin-left: auto;
  margin-right: 20px;
  color: blue;
  cursor: pointer;
}

.--delete:active {
  color: darkblue;
}
</style>
