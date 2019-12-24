<template>
  <div class="row item-container">
    <transition-group name="list" tag="ul" class="col-md-8 col-md-offset-2">
      <li
        class="row container-fluid form-inline shadow-sm p-3 mb-1 rounded"
        v-for="(item) in items"
        :key="item.id"
      >
        <input
          class="col-md-1 col-xs-1 col-sm-1"
          :id="item.id"
          v-model="item.completed"
          type="checkbox"
          @change="/*changeLabel(item)*/"
        >
        <label
          class="col-md-9 col-xs-9 col-sm-9 item.completed==true?item-label:''"
          :for="item.id"
        >
          {{ item.content }}
        </label>
        <input
          class="col-md-2 col-xs-2 col-sm-2 btn btn-info"
          type="button"
          value="删除"
          @click="$emit('del',item.id)"
        >
      </li>
      <p name="todo" :key="-1"  v-if="!items.length>0">nothing todo</p>
    </transition-group>
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
  /*.item-container {
    padding: 0 100px 0 100px;
  }*/
  .item-container ul {
    display: block;
    min-height: 300px;
    padding: 10px 0 0 0;
    margin: 0 auto;
  }
  .item-container ul > li {
    /*display: block;*/
    height: 50px;
    margin: 2px 0 2px -1px;
    background-color: rgba(180, 200, 180, 0.4);
  }
  .item-container ul > li label {
    display: inline-block;
    padding: 0;
    line-height: 50px;
  }
  .item-container ul > li input {
    display: inline-block;
  }
  /*.item-label {
    text-decoration: line-through;
  }*/
  input[type=checkbox]:checked + label {
    color: red;
    text-decoration: line-through;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter,
  .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-300px);
  }
</style>
