<template>
  <tr>
    <th>{{ user.name.length > 15 ? user.name.substring(0, 15) + '...' : user.name }}</th>
    <th>
      {{ user.email.length > 15 ? user.email.substring(0, 15) + '...' : user.email }}
    </th>
    <th>{{ user.site.length > 15 ? user.site.substring(0, 15) + '...' : user.site }}</th>
    <th><img class="myTableLine_avatar" :src="srcAvatar" alt="фото пользователя" /></th>
    <th>{{ user.birthday }}</th>
    <th>
      <div class="myTableLine_buttonsContainer">
        <button class="myTableLine_button edit" @click="openEditModal(user)">Edit</button>
        <button class="myTableLine_button delete" @click="deleteUser(user)">Delete</button>
      </div>
    </th>
  </tr>
</template>
<script>
import { ref } from 'vue'
import defaultAvatar from '../assets/images/defaultAvatar.jpg'
import { useAppStore } from '../store/store'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const srcAvatar = ref('')
    srcAvatar.value = props.user.avatar.length ? props.user.avatar : defaultAvatar
    const store = useAppStore()
    const { openModal, changeOpenUserCard, deleteUser } = store

    function openEditModal(user) {
      openModal('edit')
      changeOpenUserCard(user)
    }

    return {
      srcAvatar,
      openEditModal,
      deleteUser
    }
  }
}
</script>
<style scoped lang="scss">

.myTableLine_avatar {
  object-fit: contain;
  height: 30px;
  width: 30px;
}


</style>
