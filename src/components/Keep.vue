<template>
<div>
    <div class="keep">
    <img :src="keep.imageUrl" alt="">
<h2 class="dash">
    {{keep.title}}
    </h2>
    <p>{{keep.description}}</p>
    
       <p>tags: {{keep.tags}}</p> 
   
</div>
    <div class="container">
<form class="col s12" @submit.prevent="addToVault">
        <div class="input-field col s8">
                <select  id="selected">
                    <option   v-for="vault in vaults" :value="vault.name">{{vault.name}}</option>
                </select>
                    <label>Vault</label>
            </div>
            <button class="waves-effect waves-light btn" alt="add keep to vault"><i class="fa fa-plus" aria-hidden="true"></i></button>
            </form>

    </div>

    </div>

</template>
<script>
    export default {
        name: 'keep',
        data() {
            return {
                name: ''
            }
        },
        mounted() {
            this.$root.$data.store.actions.getKeep(this.$route.params.id)
            $(document).ready(function() {
                $('select').material_select();
            });
        },
        computed: {
            vaults() {
                return this.$root.$data.store.state.myVaults
            },
            user() {
                return this.$root.$data.store.state.activeUser
            },
            keep() {
                return this.$root.$data.store.state.activeKeep
            }
        },
        methods: {
            addToVault() {
                var selectedName = document.getElementById("selected").value
                var vault = {
                    name: selectedName,
                }
                this.$root.$data.store.actions.addKeepToVault(this.keep._id, vault)
                Materialize.toast('keep added to vault', 5000)
            }
        }
    }
</script>
<style>
    .keep {
        margin-top: 6vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>