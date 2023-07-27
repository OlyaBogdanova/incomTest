import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAppStore = defineStore('appUsers', () => {
  const users = ref([
    {
      id: 1,
      name: 'John Smith',
      email: 'jsmith@test.com',
      site: 'http://test.com',
      birthday: '13.09.1999',
      avatar:
        'https://sun9-40.userapi.com/impg/8tvJ80r8K352JRYJ_WN0ZQgEMDQsXxG3EV7vLw/dD3VL6PnPYM.jpg?size=640x640&quality=95&sign=a0895805ce11faecece76e7ca912be31&c_uniq_tag=0QcJzRGGSxZCWN9H3o-HvVQey7qRU7G6AyG_9I8EIb8&type=album'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'jsmith@test.com',
      site: 'http://test.com',
      birthday: '13.09.1999',
      avatar:
        'https://gas-kvas.com/uploads/posts/2023-01/1673540317_gas-kvas-com-p-detskii-risunok-muzhchini-2.jpg'
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'jsmith@test.com',
      site: 'http://test.com',
      birthday: '13.09.1999',
      avatar: ''
    }
  ])

  const isOpenAddUser = ref(false)
  const isOpenEditUser = ref(false)
  const openUserCard = ref(null)
  const localStorageUsersList = localStorage.getItem('USERS_LIST')
  if (localStorageUsersList) {
    users.value = JSON.parse(localStorageUsersList)._value
  }

  function deleteUser(user) {
    if (confirm(`Вы уверены что хотите удалить пользователя ${user.name}`)) {
      const removeIndex = users.value.findIndex((elem) => elem.id === user.id)
      users.value.splice(removeIndex, 1)
    }
  }
  function changeOpenUserCard(user) {
    openUserCard.value = user
  }

  function changeUser({ id, newUser }) {
    const indexOfReplaceItem = users.value.findIndex((elem) => elem.id === id)
    users.value.splice(indexOfReplaceItem, 1, newUser)
  }

  const openModal = (modalName) => {
    if (modalName === 'add') {
      isOpenAddUser.value = true
    }
    if (modalName === 'edit') {
      isOpenEditUser.value = true
    }
    document.body.classList.toggle('lock')
  }

  const closeModal = (event) => {
    if (
      event.target.classList.contains('modal') ||
      event.target.classList.contains('myAddUserModal_btn')
    ) {
      isOpenAddUser.value = false
      isOpenEditUser.value = false
      document.body.classList.toggle('lock')
    }
  }

  const addNewUser = (user) => {
    users.value.push(user)
    isOpenAddUser.value = false
    document.body.classList.toggle('lock')
  }

  watch(
    () => users,
    (state) => {
      localStorage.setItem('USERS_LIST', JSON.stringify(state))
    },
    { deep: true }
  )
  return {
    users,
    deleteUser,
    openModal,
    isOpenAddUser,
    closeModal,
    addNewUser,
    isOpenEditUser,
    changeOpenUserCard,
    openUserCard,
    changeUser
  }
})
