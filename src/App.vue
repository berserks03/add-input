<template>
  <div class="container">
    <button
      class="plus"
      data-test="plus"
      @click="addNumber(); setDisabledFalse()"
    >
      +
    </button>
    <div class="form">
      <div v-for="number in numbers" :key="number.id" class="element">
        <label :for="number.id">
          <input
            :id="number.id"
            type="number"
            v-model="number.num"
            placeholder="Enter number"
            @change="isDisabled.value = false"
          >
        </label>
        <IncreaseAndDecrease
          @increase="increaseNumber(number.id)"
          @decrease="decreaseNumber(number.id)"
        />
      </div>
    </div>
    <button class="save" @click="saveNumbers">Save</button>
    <button
      class="restore"
      @click="restoreNumbers(); setDisabledTrue()"
      :disabled="isDisabled"
    >
      Restore
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Numb } from '@/types/Numb';
import IncreaseAndDecrease from '@/components/IncreaseAndDecrease.vue';

const STORAGE_KEY = 'vue-numbers';

export default defineComponent({
  name: 'App',
  components: { IncreaseAndDecrease },
  setup() {
    const numbers = ref<Numb[]>([]);
    const isDisabled = ref<boolean>(false);

    const addNumber = () => {
      numbers.value.push({
        id: numbers.value.length ? numbers.value.slice(-1)[0].id + 1 : 0,
        num: '',
      });
    };

    const increaseNumber = (id: number) => {
      numbers.value[id].num = (Number(numbers.value[id].num) + 1).toString();
      isDisabled.value = false;
    };

    const decreaseNumber = (id: number) => {
      numbers.value[id].num = (Number(numbers.value[id].num) - 1).toString();
      isDisabled.value = false;
    };

    const saveNumbers = () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers.value));
    };

    const restoreNumbers = () => {
      const localStorageNumber = localStorage.getItem(STORAGE_KEY);
      let parsedLocalStorageNumber: Numb[] = [];
      if (localStorageNumber) {
        parsedLocalStorageNumber = JSON.parse(localStorageNumber);
      }
      if (numbers.value.length > parsedLocalStorageNumber.length) {
        numbers.value = numbers.value.map((obj) => parsedLocalStorageNumber
          .find((o) => o.id === obj.id) || { ...obj, num: '0' });
      } else {
        numbers.value = parsedLocalStorageNumber;
      }
    };

    const setDisabledFalse = () => {
      isDisabled.value = false;
    };

    const setDisabledTrue = () => {
      isDisabled.value = true;
    };

    return {
      numbers,
      addNumber,
      increaseNumber,
      decreaseNumber,
      saveNumbers,
      restoreNumbers,
      isDisabled,
      setDisabledFalse,
      setDisabledTrue,
    };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: lightblue;
  height: 100vh;
}

button {
  border-radius: 50px;
  cursor: pointer;
  margin-right: 10px;
}

.container {
  margin-top: 60px;
  width: 30vw;
  display: inline-block;

  .plus {
    float: left;
    border: 1px solid deepskyblue;
    color: deepskyblue;
    background-color: transparent;
    width: 24px;
    height: 24px;
    margin-bottom: 10px;
  }

  .form {
    overflow: hidden;
    clear: both;

    .element {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }

    input {
      border: none;
      background-color: lightcyan;
      border-radius: 50px;
      padding: 10px;
    }
  }

  .save {
    background-color: blue;
    color: white;
    padding: 10px;
  }

  .restore {
    background-color: lightgray;
    border: none;
    padding: 10px;

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
