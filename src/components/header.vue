<template>
    <div class="v-header">
        <img :src="logo" alt="header.jpg"/>
    </div>
</template>

<script>
    import logo from "../assets/header.jpg";
    export default {
        name : "Header",
        data : function () {
            return {
                logo,
            }
        }
    }
</script>

<style scoped>
    .v-header {
        width:200px;
        height: 150px;
        margin: 0 auto;
        padding-top:50px;
    }
    .v-header img{
        margin: 0 auto;
        display: block;
    }
</style>