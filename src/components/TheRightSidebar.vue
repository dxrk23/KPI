<script>
export default {
  name: 'TheRightSidebar',
};
</script>

<template>
  <aside class="--right-block-main">
    <div class="--logo">
      <img src="../assets/logos/sign_in_logo.svg" alt="logo" />
    </div>
  </aside>
</template>

<style scoped>
.--right-block-main {
  width: 22.2%;
  min-height: 450px;

  background: white;
  margin-left: 25px;
}

.--logo {
  width: 91%;
  height: auto;

  margin: 23px auto 0;
}

.--logo > img {
  width: inherit;
  height: inherit;
}
</style>
