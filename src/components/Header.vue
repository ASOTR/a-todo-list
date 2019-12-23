<template>
  <div class="v-header">
    <img
      src="../assets/header.jpg"
      alt="header.jpg"
    >
  </div>
</template>

<script>
// import logo from "../assets/header.jpg";
export default {
  name: 'Header',
  data() {
    return {
      // logo,
    };
  },
};
</script>

<style scoped>
  .v-header {
    width: 200px;
    height: 150px;
    padding-top: 50px;
    margin: 0 auto;
  }
  .v-header img {
    display: block;
    margin: 0 auto;
  }
</style>
