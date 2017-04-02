<template>
    <div class="container">
<h2 class="vaulttitle" >
{{vault.name}} 
</h2>
<p>
{{vault.description}}
</p>
<div class="row ">
        <form class="col s12" @submit.prevent="addKeep">
            <div class="input-field col s4">
                <input required="true" type="text" placeholder="title" v-model="title">
            </div>
              <div class="input-field col s4">
                <input required="true" type="text" placeholder="description" v-model="description">
            </div>
              <div class="input-field col s8">
                <input required="true" type="text" placeholder="image link" v-model="imageUrl">
            </div>
             <p>
                <input type="checkbox" id="public" checked="checked" v-model="public" :true-value="true" :false-value="false"/>
                <label for="public">public</label>
            </p>
            <div class="input-field col s8">
            <button class="waves-effect waves-light btn" alt="add keep"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
        </form>
</div>
<div class="flexIt">
      <div class="row" v-for="keep in keeps">
        <div class="col s12 m7">
          <div class="card grey lighten-4">
            <div class="card-image">
             <router-link :to="'/keeps/'+keep._id"> <img :src="keep.imageUrl"></router-link>
              <span class="card-title">{{keep.title}}</span>
            </div>
            <div class="card-content">
              <p>{{keep.description}}</p>
            
            </div>
            <div class="card-action">
<p>
    <i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="removeKeep(keep)"></i>
    </p>
                  <p> <i class="fa fa-lock fa-2x" aria-hidden="true"></i> {{keep.timesVaulted}}</p>
              <p><i class="fa fa-eye fa-2x" aria-hidden="true"></i> {{keep.views}}</p>
                
              <router-link :to="'/keeps/'+keep._id"><i class="fa fa-arrow-circle-right fa-2x arrow" aria-hidden="true"></i></router-link>
            </div>
          </div>
        </div>

</div>
       </div>

        
    </div>
</template>
<script>
    import Keep from './Keep'
    export default {
        name: 'vault',
        components: {
            Keep
        },
        data() {
            return {
                title: '',
                description: '',
                imageUrl: '',
                public: true

            }
        },
        mounted() {
            this.$root.$data.store.actions.getVault(this.$route.params.id)

        },
        computed: {
            vault() {
                return this.$root.$data.store.state.activeVault
            },
            keeps() {
                return this.$root.$data.store.state.activeVault.keeps
            }
        },
        methods: {
            addKeep() {
                var newKeep = {
                    title: this.title,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    public: this.public,
                    name: this.vault.name
                }
                console.log('in component ', newKeep)
                this.$root.$data.store.actions.addKeep(newKeep)
                Materialize.toast('keep created', 5000)
                this.getVault()
            },
            getVault() {
                this.$root.$data.store.actions.getVault(this.$route.params.id)
            },
            removeKeep(keep) {
                this.$root.$data.store.actions.removeKeep(keep, this.$route.params.id)
                this.getVault()
            }
        }

    }
</script>

<style>
    .vaulttitle {
        border-bottom: #eeeeee solid 3px;
    }
</style>