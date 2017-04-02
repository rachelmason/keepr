<template>
<div>
<nav>
    <div class="nav-wrapper" v-if ="!user.name">
      <a href="#" class="brand-logo">keepr</i></a>
      <ul id="nav-mobile" class="right ">
        <li><router-link to="login">Login</router-link></li>
        <li><router-link to="register">Register</router-link></li>
      </ul>
    </div>
      <div v-else> 
      <a href="#" class="brand-logo">keepr</i></a>
      <ul id="nav-mobile" class="right ">
        <li>Welcome, {{user.name}}!</li>
        <li><router-link to="/dashboard"><i class="fa fa-plus-square fa-lg" aria-hidden="true"></i></router-link></li>
        <li><router-link to="/myVaults"><i class="fa fa-lock fa-lg" aria-hidden="true"></i> </router-link></li>
      <li><a href="#" @click="logout"> Logout</a></li>
      </ul>
    </div>
  </nav>
</div>
</template>
<script>
import Register from './Register'

export default {
    name: 'navbar',
    components: {Register},
    mounted(){
      this.$root.$data.store.actions.authenticate()
    },
  
   computed:{
     user(){
       return this.$root.$data.store.state.activeUser
     }
       
    },
    methods:{
      logout(){
            this.$root.$data.store.actions.logout()
           
        }
    }
    

}


</script>
<style>
nav{
  background-color: #eeeeee;
  color: #004d40;

}
nav  ul a {
  color: #004d40
}
nav  ul a:hover {
 background-color: rgba(0,0,0,0);
 color: #ffe082
}
nav .brand-logo{
  font-family: 'Abril Fatface', cursive;
   color: #004d40;
   margin-left: 10px;
}
</style>