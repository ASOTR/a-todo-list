<template>
  <div class="container">
    <input
      class="addTodo"
      @keydown.enter="addItem"
    >
    <TodoItems
      :items="filterItemList"
      @del="del"
    />
    <TodoFilter
      :list-length="itemsLeft"
      :filter="filter"
      @changeFilter="changeFilter"
      @clearCompleted="clearCompleted"
    />
  </div>
</template>

<script>
import TodoItems from './TodoItem';
import TodoFilter from './TodoFilter';

let itemId = 0;
export default {
  name: 'Todo',
  components: {
    TodoItems,
    TodoFilter,
  },
  data() {
    return {
      itemList: [],
      filter: 'ALL',
    };
  },
  computed: {
    itemsLeft() {
      return this.itemList.filter((item) => item.completed === false).length;
    },
    filterItemList() {
      if (this.filter === 'ALL') {
        return this.itemList;
      }
      if (this.filter === 'TODO') {
        return this.itemList.filter((item) => item.completed === false);
      }
      return this.itemList.filter((item) => item.completed === true);
    },
  },
  methods: {
    del(index) {
      const list = this.itemList.findIndex((item) => item.id === index);
      this.itemList.splice(list, 1);
    },
    addItem(e) {
      itemId += 1;
      this.itemList.push({
        id: itemId,
        content: e.target.value.trim(),
        completed: false,
      });
      e.target.value = '';
    },
    changeFilter(e) {
      this.filter = e;
    },
    clearCompleted() {
      this.itemList = this.itemList.filter((item) => item.completed === false);
    },
  },
};
</script>

<style scoped>
  .container {
    width: 80%;
    min-height: 200px;
    margin: 0 auto;
  }
  .addTodo {
    display: block;
    margin: 0 auto;
  }
</style>
