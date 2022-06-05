<script>
export default {
  name: 'Button',
};
</script>

<template>
  <button class="--button">
    <slot></slot>
  </button>
</template>

<style scoped>
.--button {
  width: 107px;
  height: 30px;

  background: #33a8d5;
  border-radius: 6px;
  border: none;

  color: #fff;

  font-size: 20px;
  font-weight: 700;
}

.--button:hover {
  background: #2f9ec4;
  cursor: pointer;
}

.--button:active {
  background: #2f9ec4;
  opacity: 0.8;
}
</style>
