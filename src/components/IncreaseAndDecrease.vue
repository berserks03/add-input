<template>
  <button @click="$emit('increase')">Increase</button>
  <button @click="$emit('decrease')">Decrease</button>
</template>

<script lang="ts">
export default {
  name: 'IncreaseAndDecrease',
  emits: ['increase', 'decrease'],
};
</script>

<style lang="scss" scoped>
button {
  border: 1px solid cornflowerblue;
  background-color: transparent;
  padding: 10px;
  color: cornflowerblue;
}
</style>
