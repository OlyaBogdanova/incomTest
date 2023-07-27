<template>
  <div class="modal_container" @click="closeModal($event)">
    <div class="modal">
      <div class="modal_dialog">
        <div class="modal_content">
          <div class="myAddUserModal_topBlock">Edit user {{ openUserCard.name }}</div>
          <div class="myAddUserModal_bottomBlock">
            <MyInputWithLabel
              v-for="field in formFields"
              :key="field.label"
              :field="field"
              v-model="field.value"
              @update:modelValue="onCheckingFields(value)"
            />
            <div class="myAddUserModal_btnContainer">
              <button
                class="myAddUserModal_btn"
                @click="($event) => replaceUser($event)"
                :disabled="!isFormFieldsValid"
              >
                Ok
              </button>
              <button class="myAddUserModal_btn" @click="closeModal($event)">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyInputWithLabel from '../../UI/MyInputWithLabel.vue'
import { useAppStore } from '../../store/store'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    MyInputWithLabel
  },
  props: {},
  setup() {
    const store = useAppStore()
    const { closeModal, addNewUser, changeUser } = store
    const { openUserCard } = storeToRefs(store)
    const birthdayDate = `${openUserCard.value.birthday.split('.')[2]}-${
      openUserCard.value.birthday.split('.')[1]
    }-${openUserCard.value.birthday.split('.')[0]}`

    const formFields = ref([
      { label: 'Lastname', inputType: 'text', value: openUserCard.value.name.split(' ')[1] },
      { label: 'Firstname', inputType: 'text', value: openUserCard.value.name.split(' ')[0] },
      { label: 'Email', inputType: 'email', value: openUserCard.value.email },
      { label: 'Site', inputType: 'text', value: openUserCard.value.site },
      { label: 'Avatar', inputType: 'text', value: openUserCard.value.avatar },
      {
        label: 'Birthday',
        inputType: 'date',
        value: birthdayDate
      }
    ])
    let newUser = {
      id: openUserCard.value.id,
      name: openUserCard.value.name,
      email: openUserCard.value.email,
      site: openUserCard.value.site,
      birthday: openUserCard.value.birthday,
      avatar: openUserCard.value.avatar
    }
    const isFormFieldsValid = ref(true)

    function changeBirthdayData(data) {
      if (data) {
        let years = data.split('-')[0]
        let month = data.split('-')[1]
        let days = data.split('-')[2]
        const dateFormat = `${days}.${month}.${years}`

        return dateFormat
      }
      return ''
    }

    function onCheckingFields() {
      const emailPattern = new RegExp(/^\S+@\S+\.\S+$/)
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // validate fragment locator

      if (
        (urlPattern.test(formFields.value[3].value.trim()) ||
          formFields.value[3].value.trim().length === 0) &&
        (emailPattern.test(formFields.value[2].value.trim()) ||
          formFields.value[2].value.trim().length === 0) &&
        formFields.value[0].value.trim().length > 0 &&
        formFields.value[1].value.trim().length > 0
      ) {
        isFormFieldsValid.value = true
        newUser['name'] = formFields.value[1].value + ' ' + formFields.value[0].value
        newUser['email'] = formFields.value[2].value
        newUser['site'] = formFields.value[3].value
        newUser['birthday'] = changeBirthdayData(formFields.value[5].value)
        newUser['avatar'] = formFields.value[4].value
      } else {
        isFormFieldsValid.value = false
      }
    }

    function replaceUser(event) {
      changeUser({ id: openUserCard.value.id, newUser })
      closeModal(event)
    }

    return {
      formFields,
      closeModal,
      addNewUser,
      onCheckingFields,
      changeBirthdayData,
      isFormFieldsValid,
      replaceUser,
      openUserCard
    }
  }
}
</script>

<style scoped lang="scss">
@import url(../../scss/modalStyles.scss);
</style>
