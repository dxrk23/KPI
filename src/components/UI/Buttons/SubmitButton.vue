<template>
  <button class="--button"><slot></slot></button>
</template>

<script>
export default {
  name: "SubmitButton"
}
</script>

<style scoped>
.--button {
  width: 180px;
  height: 52px;

  background: #33A8D5;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 9px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  border: none;

  color: #FFFFFF;

  cursor: pointer;
}

.--button:active {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}

.--button:hover {
  background: #33A8D5;
  opacity: 0.7;
}
</style>