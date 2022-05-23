<script>
export default {
  name: 'Comment',
};
</script>

<template>
  <div class="--comment-main">
    <div class="--profile-picture"></div>
    <div class="--content">
      <div class="--header">
        <div class="--author-name">user 1</div>
        <div class="--date">Yesterday, 15:00 AM</div>
      </div>
      <div class="--text">Comment from user 1</div>
    </div>
    <div class="--delete">
      <i class="fas fa-trash-alt">Delete</i>
    </div>
  </div>
</template>

<style scoped>
.--comment-main {
  width: 85%;

  background: rgba(136, 191, 241, 0.32);
  border-radius: 5px;
  padding: 15px 0 15px 19px;

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
