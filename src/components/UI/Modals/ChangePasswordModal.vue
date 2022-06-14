<script>
import SubmitButton from "../Buttons/SubmitButton.vue";
import { mapActions } from 'vuex';
import ProfileService from "../../../services/profile.service";

const profileService = new ProfileService();

export default {
    name: 'ChangePasswordModal',
    components: { SubmitButton },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
        };
    },
    methods: {
        ...mapActions({
            closeModal: 'modals/closeModal',
        }),

        changePassword() {
            profileService
                .changePassword(this.oldPassword, this.newPassword)
                .then(() => {
                    this.$swal({
                        title: "Успешно",
                        text: "Пароль изменен",
                        icon: "success"
                    });
                })
                .catch(e => {
                    this.$swal({
                        title: "Ошибка",
                        text: e.message,
                        icon: "error"
                    });
                }).finally(() => {
                    this.closeModal();
                });
        },
    },
};
</script>

<template>
    <div class="--modal-main">
        <div class="--close" @click="closeModal()">X</div>

        <form>
            <div class="--old-password-block">
                <span class="--label">Старый пароль:</span>
                <input v-model="oldPassword" class="--input" placeholder="Старый пароль" type="password" />
            </div>

            <div class="--new-password-block">
                <span class="--label">Новый пароль:</span>
                <input v-model="newPassword" class="--input" placeholder="Новый пароль" type="password" />
            </div>

            <div class="--button-block">
                <submit-button class="--button" @click.prevent="changePassword">Сменить пароль</submit-button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.--modal-main {
    width: 110%;

    background-color: #fff;
    display: block;
    position: relative;
    border: 1px solid black;
}

.--input {
    width: 359px;
    height: 51px;

    background: rgba(0, 0, 0, 0.0001);
    border: 1px solid #000000;
    padding-left: 24px;
    border-radius: 10px;

    font-family: 'Tahoma', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    display: flex;
    align-items: flex-end;

    color: black;
}

.--button {
    width: 200px;
    height: 51px;
    margin: auto;
}

.--old-password-block, .--new-password-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 31px;
    margin-bottom: 30px;
}

.--label {
    font-family: 'Tahoma', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 27px;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    color: #4f4f56;
}

.--close {
    position: absolute;
    top: 20px;
    right: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 24px;
    cursor: pointer;
}
</style>
