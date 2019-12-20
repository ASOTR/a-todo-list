<template>
    <div class="main">
        <div class="main-container">
            <Header></Header>
            <Todo></Todo>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from "components/header";
    import Todo from "components/todo/todo";
    import Footer from "components/footer";

    export default {
        name : "App",
        data:function(){
            return {
                hello : "hello world!"
            }
        },
        components:{
            Header,
            Todo,
            Footer
        }
    }
</script>


<style scoped>
    .main{
        width:1024px;
        min-height: 800px;
        margin: 0 auto;
        color: #888;
    }
    .main-container{
        margin:0 auto;
    }
</style>