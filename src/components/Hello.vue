<template>
  <div class="hello">
      <form class="container">
        <div class="input-field">
          <input id="search" type="search" v-model="search" v-on:keyup="searchTags" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
<div class="flexIt" v-show="!searchResults[0]">
      <div class="row" v-for="keep in keeps">
        <div class="col s12 m7">
          <div class="card grey lighten-4">
            <div class="card-image">
              <router-link :to="'keeps/'+keep._id"><img :src="keep.imageUrl"></router-link>
              <span class="card-title">{{keep.title}}</span>
            </div>
            <div class="card-content">
              <p>{{keep.description}}</p>
            
            </div>
            <div class="card-action">
                
                  <p> <i class="fa fa-lock fa-2x" aria-hidden="true"></i> {{keep.timesVaulted}}</p>
              <p><i class="fa fa-eye fa-2x" aria-hidden="true"></i> {{keep.views}}</p>
                
              <router-link :to="'keeps/'+keep._id"><i class="fa fa-arrow-circle-right fa-2x arrow" aria-hidden="true"></i></router-link>
            </div>
          </div>
        </div>

</div>
       </div>
       <div class="flexIt">
      <div class="row" v-for="keep in searchResults" v-show="searchResults[0] ">
        <div class="col s12 m7">
          <div class="card grey lighten-4">
            <div class="card-image">
              <img :src="keep.imageUrl">
              <span class="card-title">{{keep.title}}</span>
            </div>
            <div class="card-content">
              <p>{{keep.description}}</p>
            
            </div>
            <div class="card-action">
                
                  <p> <i class="fa fa-lock fa-2x" aria-hidden="true"></i> {{keep.timesVaulted}}</p>
              <p><i class="fa fa-eye fa-2x" aria-hidden="true"></i> {{keep.views}}</p>
                
              <router-link :to="'keeps/'+keep._id"><i class="fa fa-arrow-circle-right fa-2x arrow" aria-hidden="true"></i></router-link>
            </div>
          </div>
        </div>

</div>
       </div>
  </div>
</template>

<script>
    import navbar from './navbar'
    export default {
        name: 'hello',
        components: {
            navbar
        },
        mounted() {
            this.$root.$data.store.actions.getPublicKeeps()
            this.$nextTick(() => {
                console.log('initialize select..... hopefully');
                setTimeout(function() {
                    $('select').material_select();
                }, 500);
            })
        },
        computed: {
            user() {
                return this.$root.$data.store.state.activeUser
            },
            keeps() {
                return this.$root.$data.store.state.keeps
            },
            vaults() {
                return this.$root.$data.store.state.myVaults
            },
            userId() {
                return this.user._id
            }

        },
        data() {
            return {
                title: '',
                description: '',
                imageUrl: '',
                public: '',
                name: '',
                search: '',
                searchResults: []
            }
        },
        methods: {
            addKeep() {
                var selectedName = document.getElementById("selected").value
                var newKeep = {
                    title: this.title,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    public: this.public,
                    name: selectedName
                }
                console.log(selectedName)
                this.$root.$data.store.actions.addKeep(newKeep)
                Materialize.toast('keep created', 5000)
            },
            searchTags() {
                let search = this.search
                let regex = new RegExp(search, 'i')
                let filtered = []
                for (var i = 0; i < this.keeps.length; i++) {
                    var keep = this.keeps[i];
                    if (regex.test(keep.tags)) {
                        filtered.push(keep)
                    }
                }

                this.searchResults = filtered
            },
            clearResults() {
                this.searchResults = []
            }

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .flexIt {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 5vh
    }
    
    .arrow {
        color: #ffe082
    }
    
    .material-icons {
        color: #ffe082;
        font-size: 40px;
    }
    
    .card-content {
        color: #004d40;
    }
    
    .card {
        width: 25vw;
    }
    
    .card .card-action {
        position: relative;
        background-color: inherit;
        border-top: 1px solid rgba(160, 160, 160, 0.2);
        padding: 0px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #004d40;
    }
    
    .material-icons {
        color: #00bfa5;
        font-size: 40px;
    }
    
    .btn {
        background-color: #004d40;
    }
    
    .btn:hover {
        background-color: #004d40;
    }
    
    .btn:focus {
        background-color: #004d40;
    }
</style>