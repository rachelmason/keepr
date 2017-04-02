<template>
  <div id="app">
   <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
    import Navbar from './components/Navbar'
    export default {
        name: 'app',
        components: {
            Navbar
        },
        mounted() {
            this.$root.$data.store.actions.authenticate()
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #004d40
    }
</style>