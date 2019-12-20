<template>
    <div class="item-container">
        <ul>
            <li v-for="(item) in items" v-bind:key="item.id">
                <input v-bind:id="item.id" type="checkbox" v-model="item.completed" v-on:change="changeLabel(item)"/>
                <label class="item.completed==true?item-label:''" v-bind:for="item.id">{{ item.id }} --- {{ item.content }}</label>
                <input v-on:click="$emit('del',item.id)" type="button" value="删除"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: ['items'],
        data: function () {
            return {
                //itemList:this.itemList,
            }
        },
        methods:{
            changeLabel : function (item) {
               // document.getElementById(item.id).className = (item.completed==true?'item-label':'');
            }
        }
    }
</script>

<style scoped>
    .item-container{
        padding:0px 100px 0px 100px;
    }
    /*.item-label{*/
        /*text-decoration: line-through;*/
    /*}*/
    input[type=checkbox]:checked + label{
        text-decoration: line-through;
        color: red;
    }
</style>