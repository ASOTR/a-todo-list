<template>
    <div class="container">
        <input class="addTodo" v-on:keydown.enter="addItem"/>
        <TodoItems
                v-bind:items="filterItemList"
                v-on:del="del">
        </TodoItems>
        <TodoFilter
            v-bind:list-length="itemsLeft"
            v-bind:filter="filter"
            v-on:changeFilter="changeFilter"
            v-on:clearCompleted="clearCompleted">
        </TodoFilter>
    </div>
</template>

<script>
    import TodoItems from "./todoItem";
    import TodoFilter from "./todoFilter";
    let id = 0;
    export default {
        name: "Todo",
        data: function(){
            return {
                itemList:[],
                filter: 'ALL',
            }
        },
        computed:{
          itemsLeft:function () {
              return this.itemList.filter((item) => { return item.completed==false }).length;
          },
          filterItemList: function () {
              if(this.filter == 'ALL'){
                  return this.itemList;
              }
              else if(this.filter == 'TODO'){
                  return this.itemList.filter((item) => { return item.completed==false });
              }else {
                  return this.itemList.filter((item) => { return item.completed==true });
              }
          }
        },
        components: {
            TodoItems,
            TodoFilter,
        },
        methods:{
            del:function (index) {
                index = this.itemList.findIndex((item)=>{return item.id==index})
                this.itemList.splice(index,1);
            },
            addItem:function (event) {
                this.itemList.push({
                    id : id++,
                    content : event.target.value.trim(),
                    completed : false,
                });
                event.target.value = '';
            },
            changeFilter:function (e) {
                this.filter = e;
            },
            clearCompleted:function () {
                this.itemList = this.itemList.filter(item=>{return item.completed==false;});
            }
        }
    }
</script>

<style scoped>
    .container{
        width:80%;
        min-height: 200px;
        margin: 0 auto;
    }
    .addTodo{
        display: block;
        margin: 0 auto;
    }
</style>