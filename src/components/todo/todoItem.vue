<template>
  <div class="item-container">
    <ul>
      <li
        v-for="(item) in items"
        :key="item.id"
      >
        <input
          :id="item.id"
          v-model="item.completed"
          type="checkbox"
          @change="changeLabel(item)"
        >
        <label
          class="item.completed==true?item-label:''"
          :for="item.id"
        >
          {{ item.id }} --- {{ item.content }}
        </label>
        <input
          type="button"
          value="删除"
          @click="$emit('del',item.id)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['items'],
  data() {
    return {
      // itemList:this.itemList,
    };
  },
  methods: {
    // changeLabel(item) {
    //   // document.getElementById(item.id).className = (item.completed==true?'item-label':'');
    // },
  },
};
</script>

<style scoped>
  .item-container {
    padding: 0 100px 0 100px;
  }
  /*.item-label {
    text-decoration: line-through;
  }*/
  input[type=checkbox]:checked + label {
    color: red;
    text-decoration: line-through;
  }
</style>
