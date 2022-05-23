<script>
export default {
  name: 'MenuItem',
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="--menu-item">
    <div class="--icon">
      <span class="material-icons"> {{ icon }} </span>
    </div>
    <div class="--label">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.--menu-item {
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: left;

  border: 1px solid black;
  border-radius: 5px;

  margin-top: 3px;
}

.--menu-item:hover {
  background: #0f6cbf;
  color: white;
  cursor: pointer;
}

.--label {
  font-size: 1em;
  font-weight: 700;
  margin-left: 10px;
}

.--icon {
  margin-left: 5px;
}

.--label,
.--icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
