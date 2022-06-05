<script>
import PositionService from "../../services/position.service";

const positionService = new PositionService();

export default {
  name: "RoleContainer",
  props: {
    role: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteRole() {
      positionService.deletePosition(this.role.id).then(() => {
        this.$emit("onRoleDelete");
      });
    }
  }
}
</script>

<template>
  <div class="--role-container">
    <div class="--role-icon">
      <span class="material-icons">person</span>
    </div>
    <div class="--role-name">
      {{ role.name }}
    </div>
    <div class="--delete-mark" @click.prevent="deleteRole()">X</div>
  </div>
</template>


<style scoped>
.--role-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 30%;
  max-width: 30%;
  min-height: 10%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;

  margin: 10px;

  justify-content: space-between;
}

.--role-icon {
  width: 12%;
  height: auto;
}

.--role-name {
  width: 75%;
  font-size: 18px;
  font-weight: bold;
}

.--delete-mark {
  width: 5%;
  font-size: 1.5em;
  font-weight: bold;
  color: #ff0000;
  cursor: pointer;
}
</style>