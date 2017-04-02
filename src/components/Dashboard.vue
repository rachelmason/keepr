<template>
<div class="container">
<div class="form">
 <div class="row" v-show="keep">
    <div class="dash">
<h4>creation station: keep</h4>
<div>
<a class="waves-effect waves-light btn" :style="{background: keepbtn}" @click="toggleKeep">K</a>
<a class="waves-effect waves-light btn" :style="{background: vaultbtn}"  @click="toggleVault">V</a>
</div>
    </div>

        <form class="col s8 offset-s2" @submit.prevent="addKeep">
            <div class="input-field col s6">
                <input required="true" type="text" placeholder="title" v-model="title">
                
            </div>
              <div class="input-field col s6">
                <input required="true" type="text" placeholder="description" v-model="description">
            </div>
             <div class="input-field col s12">
                <input required="true" type="text" placeholder="tags" v-model="tags">
            </div>
              <div class="input-field col s12">
                <input required="true" type="text" placeholder="image link" v-model="imageUrl">
            </div>
             <div class="input-field col s10">
                <select  id="selected">
                    <option   v-for="vault in vaults" :value="vault.name">{{vault.name}}</option>
                </select>
                    <label>Vault</label>
            </div>
             <p>
                <input type="checkbox" id="public" checked="checked" v-model="public" :true-value="true" :false-value="false"/>
                <label for="public">public</label>
            </p>
                <button class="waves-effect waves-light btn" alt="add keep"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </form>
</div>
 <div class="row" v-show="!keep">
    <div class="dash">
<h4>creation station: vault</h4>
<div>
<a class="waves-effect waves-light btn" :style="{background: keepbtn}" @click="toggleKeep">K</a>
<a class="waves-effect waves-light btn" :style="{background: vaultbtn}"  @click="toggleVault">V</a>
</div>
    </div>
        <form class="col s8 offset-s2" @submit.prevent="addVault">

                <div class="input-field col s6">
                    <input required="true" type="text" placeholder="name" v-model="newVault.name">
                </div>
                 <div class="input-field col s6">
                    <input required="true" type="text" placeholder="description" v-model="newVault.description">
                </div>
                
                <button class="waves-effect waves-light btn" alt="add vault"><i class="fa fa-plus" aria-hidden="true"></i></button>
                
            </form>
</div>
</div>
   

</div>
</template>
<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                title: '',
                description: '',
                imageUrl: '',
                public: true,
                tags: '',
                name: '',
                keep: true,
                newVault: {
                    name: '',
                    description: '',
                    imageUrl: ''
                },
                keepbtn: '',
                vaultbtn: ''

            }
        },
        mounted() {
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
        methods: {
            addKeep() {
                var selectedName = document.getElementById("selected").value
                var newKeep = {
                    title: this.title,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    public: this.public,
                    tags: this.tags,
                    name: selectedName
                }

                this.title = '',
                    this.description = '',
                    this.imageUrl = '',
                    this.tags = ''
                this.$root.$data.store.actions.addKeep(newKeep)
                Materialize.toast('keep created', 5000)
            },
            toggleKeep() {
                this.keep = true
                if (this.keep == true) {
                    this.keepbtn = '#ffe082'
                    this.vaultbtn = ''
                }
            },
            toggleVault() {
                this.keep = false
                if (this.keep == false) {
                    this.vaultbtn = '#ffe082'
                    this.keepbtn = ''
                }
            },
            addVault() {
                this.$root.$data.store.actions.addVault(this.newVault)
                Materialize.toast('vault created', 5000)
            },
        }
    }
</script>
<style>
    .form {
        margin-top: 10vh
    }
    
    .dash {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: #eeeeee solid 3px;
        color: #004d40
    }
    
    .keepbtn {
        background-color: #ffe082;
    }
</style>