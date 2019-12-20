<template>
    <div class="filter-container">
        <span>{{listLength}} item left</span>
        <ul class="btn-container" v-on:click="doFilter">
            <li v-bind:class="filter=='ALL'?'active':''">ALL</li>
            <li v-bind:class="filter=='TODO'?'active':''">TODO</li>
            <li v-bind:class="filter=='Completed'?'active':''">Completed</li>
        </ul>
        <input type="button" class="btn-clear" value="Clear Complete" v-on:click="$emit('clearCompleted')"/>
    </div>
</template>

<script>
    export default {
        name: "todoFilter",
        props: {
            listLength:{
                type: Number,
                require: true
            },
            filter:{
                type:String,
                default:'ALL'
            }
        },
        data: function () {
            return {
            }
        },
        methods:{
            doFilter: function (e) {
                // console.log(e);
                // console.log(e.target.innerHTML);
                // e.target.className = 'active';
                this.$emit('changeFilter',e.target.innerHTML);
            }
        }
    }
</script>

<style scoped>
    .filter-container{
        padding:0px 100px 0px 100px;
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .filter-container > span{
        display: block;
        text-align: center;
    }
    .btn-container li{
        display: inline-block;
        border: 1px solid #666;
        padding:8px;
    }
    .btn-container li.active{
        background-color: #ff8c99;
    }
    .btn-clear{

    }
</style>