<template>
  <div class="filter-container">
    <span>{{ listLength }} item left</span>
    <ul
      class="btn-container"
      @click="doFilter"
    >
      <li :class="filter=='ALL'?'active':''">
        ALL
      </li>
      <li :class="filter=='TODO'?'active':''">
        TODO
      </li>
      <li :class="filter=='Completed'?'active':''">
        Completed
      </li>
    </ul>
    <input
      type="button"
      class="btn-clear"
      value="Clear Complete"
      @click="$emit('clearCompleted')"
    >
  </div>
</template>

<script>
export default {
  name: 'TodoFilter',
  props: {
    listLength: {
      type: Number,
      require: true,
    },
    filter: {
      type: String,
      default: 'ALL',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    doFilter(e) {
      // console.log(e);
      // console.log(e.target.innerHTML);
      // e.target.className = 'active';
      this.$emit('changeFilter', e.target.innerHTML);
    },
  },
};
</script>

<style scoped>
  .filter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px 0 100px;
  }
  .filter-container > span {
    display: block;
    text-align: center;
  }
  .btn-container li {
    display: inline-block;
    padding: 8px;
    border: 1px solid #666;
  }
  .btn-container li.active {
    background-color: #ff8c99;
  }
  /*.btn-clear {}*/
</style>
