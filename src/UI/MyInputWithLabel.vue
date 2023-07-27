<template>
  <div class="myInput">
    <div class="myInput_label">{{ field.label }}</div>
    <input
      :type="field.inputType"
      class="myInput_input"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="field.value"
    />
  </div>
</template>
<script>
export default {
  props: {
    field: Object
  },
  emits: ['update:modelValue'],
  setup() {
    return {}
  }
}
</script>
<style scoped>
.myInput {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
}
.myInput_label,
.myInput_input {
  padding: 5px 10px;
  flex: 1 1 auto;
  border: none;
  outline: none;
}
.myInput_label {
  background-color: rgb(143, 175, 222);
  flex: 0 0 30%;
}

@media (max-width: 400px) {
  .myInput {
    font-size: 14px;
  }
}
</style>
