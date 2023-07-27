<script>
import MyTableLineTag from './components/MyTableLineTag.vue'
import MyEditUserModal from './components/Modal/MyEditUserModal.vue'
import MyAddUserModal from './components/Modal/MyAddUserModal.vue'
import { useAppStore } from './store/store'
import { storeToRefs } from 'pinia'

export default {
  components: { MyTableLineTag, MyAddUserModal, MyEditUserModal },
  setup() {
    const store = useAppStore()
    const { users, isOpenAddUser, isOpenEditUser } = storeToRefs(store)
    const { openModal, closeAddModal } = store

    return {
      users,
      isOpenAddUser,
      openModal,
      closeAddModal,
      isOpenEditUser
    }
  }
}
</script>

<template>
  <div class="table">
    <table class="myTable">
      <colgroup span="6"></colgroup>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Site</th>
        <th>Avatar</th>
        <th>Birthday</th>
        <th>
          <div class="myTableLine_buttonsContainer hidden">
            <button class="myTableLine_button edit" @click="openEditModal(user)">Edit</button>
            <button class="myTableLine_button delete" @click="deleteUser(user)">Delete</button>
          </div>
        </th>
      </tr>
      <MyTableLineTag v-for="user in users" :key="user.id" :user="user"></MyTableLineTag>
    </table>
    <div v-if="!users.length" class="tableMessageEmptyList">
      К сожалению, список пользователей пуст
    </div>
    <button class="button_add" @click="openModal('add')">+</button>
    <teleport to="body">
      <MyAddUserModal v-if="isOpenAddUser" />
    </teleport>
    <teleport to="body">
      <MyEditUserModal v-if="isOpenEditUser" />
    </teleport>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto;
}

.myTableLine_buttonsContainer {
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 1 110.08px;
}
.hidden {
  visibility: hidden;
}
.myTableLine_button {
  padding: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  word-break: normal;
}
.edit {
  background-color: rgb(140, 193, 255);
  margin-right: 10px;
}
.delete {
  background-color: rgb(255, 188, 140);
}
.table {
  background-color: rgb(197, 197, 197);
  padding: 15px 5px;
  position: relative;
}
.myTable {
  width: 100%;
  font-weight: normal;
  font-size: 16px;
}
th {
  background-color: #fff;
  border: 2px solid rgb(197, 197, 197);
  padding: 10px;
  font-weight: normal;
  word-break: break-all;
}
.button_add {
  background-color: rgb(125, 224, 123);
  position: absolute;
  top: -15px;
  left: 10px;
  color: #fff;
  font-size: 24px;
  border: none;
  padding: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tableMessageEmptyList {
  padding: 10px;
  font-size: 16px;
}
@media (max-width: 750px) {
  .myTable {
    font-size: 14px;
  }
  th {
    padding: 7px;
  }
  .myTableLine_button {
    font-size: 14px;
  }
}
@media (max-width: 620px) {
  .myTable {
    font-size: 14px;
  }
  th {
    padding: 5px;
  }
  .edit {
    margin-right: 7px;
  }
}
@media (max-width: 580px) {
  .myTable {
    font-size: 12px;
  }
  .myTableLine_button {
    font-size: 12px;
  }
}

@media (max-width: 490px) {
  .table {
    padding: 5px 0px;
  }
  th {
    border: 1px solid rgb(197, 197, 197);
    padding: 3px;
  }
  .button_add {
    top: auto;
    left: auto;
    bottom: -35px;
    right: 5px;
  }
}

@media (max-width: 450px) {
  .myTableLine_buttonsContainer {
    flex-direction: column;
  }
  .edit {
    margin-bottom: 3px;
    margin-right: 0px;
    width: 100%;
  }
  .delete{
    width: 100%;
  }
  .hidden button{
    height: 0px;
  }
}

@media (max-width: 350px) {
  .tableMessageEmptyList {
    font-size: 14px;
  }
}
</style>
