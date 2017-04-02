<template>
 <div class="container">
        <div v-if="user.name">
 <div class="dash">
<h4>my vaults</h4>
    </div>
        <div class="row">
            <form class="col s12" @submit.prevent="addVault">

                <div class="input-field col s4">
                    <input required="true" type="text" placeholder="name" v-model="newVault.name">
                </div>
                 <div class="input-field col s4">
                    <input required="true" type="text" placeholder="description" v-model="newVault.description">
                </div>
                <div class="input-field col s8">
                <button class="waves-effect waves-light btn" alt="add vault"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </form>
        </div>
<div class="flexVault">

        <div class="row vault" v-for="vault in vaults">
        <div class="col s12 m4">
          <div class="card grey lighten-3">
          
           <div class="card-content">
             <router-link :to="'vaults/'+vault._id"> <span class="card-title">{{vault.name}}</span></router-link>
              <p>{{vault.description}}</p>
            </div>
            <div class="card-action">
            <i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="removeVault(vault)"></i>
              <router-link :to="'vaults/'+vault._id"><i class="fa fa-arrow-circle-right fa-2x arrow" aria-hidden="true"></i></router-link>
            
            </div>
          </div>
        </div>
      </div>
</div>

        </div>
        <div v-else>
            <h2>Please Login or register</h2>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vault',
        data() {
            return {
                newVault: {
                    name: '',
                    description: '',
                    imageUrl: ''
                }

            }
        },
        mounted() {
            this.$root.$data.store.actions.getVaults()
        },
        computed: {
            vaults() {
                return this.$root.$data.store.state.myVaults
            },
            user() {
                return this.$root.$data.store.state.activeUser
            }
        },
        methods: {
            addVault() {
                this.$root.$data.store.actions.addVault(this.newVault)
                Materialize.toast('vault created', 5000)
            },
            removeVault(vault) {
                this.$root.$data.store.actions.removeVault(vault)
            }

        }
    }
</script>
<style>
    .flexVault {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between
    }
</style>