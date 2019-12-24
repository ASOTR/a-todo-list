<template>
  <div class="row">
    <div class="row col-md-9 col-md-offset-1 form-inline">
      <div class="col-md-3"><span class="badge">{{ listLength }}</span> items</div>
      <ul
        class="col-md-6  btn-container"
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
        class="col-md-3 btn-clear  btn btn-info"
        value="Clear Complete"
        @click="$emit('clearCompleted')"
      >
    </div>
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
  .row {
    padding: 5px 10px 0 0;
    margin: 0 auto;
  }
  .filter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px 0 100px;
  }
  .filter-container > span {
    /*display: block;*/
    /*text-align: center;*/
  }
  .badge {
    background-color: rgba(180, 200, 180, 0.4);
  }
  .btn-container {
    margin: 0 auto;
  }
  .btn-container li {
    display: inline-block;
    padding: 5px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 10%;
  }
  .btn-container li.active {
    background-color: rgba(180, 200, 180, 0.4);
  }
  /*.btn-clear {}*/
</style>
