import axios from 'axios'

let api = axios.create({
    baseURL: 'http://keepr-rachel.herokuapp.com:3000/api/',
    timeout: 5000,
    withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
    activeUser: {},
    activeVault: {},
    activeKeep: {},
    myVaults: {},
    myKeeps: {},
    searched: [],
    //Dummy Data
    keeps: [],
    error: {}
}

let handleError = (err) => {
    state.error = err
}

export default {
    // ALL DATA LIVES IN THE STATE
    state,
    // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
    actions: {
        login(e, p) {
            api.post('login', {
                    email: e,
                    password: p
                })
                .then(res => {
                    state.activeUser = res.data.data
                    console.log(state.activeUser)
                        // this.getVaults()
                }).catch(handleError)
        },
        register(n, e, p) {
            api.post('register', {
                    name: n,
                    email: e,
                    password: p
                })
                .then(res => {
                    this.login(e, p)
                }).catch(handleError)
        },
        authenticate() {
            api.get('authenticate')
                .then(res => {
                    if (res.data.data) {
                        state.activeUser = res.data.data
                        this.getVaults()
                    }
                }).catch(handleError)

        },
        logout() {
            api.delete('logout').then(res => {
                state.activeUser = {}
            })
        },
        getVault(id) {
            console.log('getting vault')
            api.get('vault/' + id + '/keeps')
                .then(res => {
                    state.activeVault = res.data.data
                    console.log(state.activeVault.keeps)
                })
                .catch(handleError)
        },
        getKeep(id) {
            console.log('getting keep')
            api.get('keep/' + id + '/current')
                .then(res => {
                    state.activeKeep = res.data.data
                    console.log(activeKeep)
                })
                .catch(handleError)
        },
        getVaults() {
            api.get('uservaults').then(res => {
                state.myVaults = res.data.data
            }).catch(handleError)
        },
        addVault(vault) {
            api.post('vaults/', vault)
                .then(res => {
                    this.getVaults()
                })
                .catch(handleError)
        },


        removeVault(vault) {
            api.delete('vaults/' + vault._id)
                .then(res => {
                    this.getVaults()
                })
                .catch(handleError)
        },
        getPublicKeeps() {
            api.get('publickeeps')
                .then(res => {
                    state.keeps = res.data.data
                })
                .catch(handleError)
        },
        removeKeep(keep, vaultId) {
            api.put('vault/' + vaultId + '/removeKeep')
                .then(res => {
                    this.getVault(vaultId)
                })
                .catch(handleError)
        },
        addKeep(newKeep) {
            let newestKeep = {
                description: newKeep.description,
                title: newKeep.title,
                imageUrl: newKeep.imageUrl,
                name: newKeep.name,
                tags: newKeep.tags,
                public: newKeep.public,
                userId: state.activeUser._id
            }
            console.log('new keep in the store', newestKeep)
            api.post('newkeep', newestKeep)
                .then(res => {
                    console.log('res in store ', res)
                    this.getVault(vault._id)
                })
                .catch(handleError)
        },
        addKeepToVault(id, vault) {
            api.put('keeptonewvault/' + id, vault).then(res => {
                this.getKeep(id)
            })
        },
        // addPublicKeep(newKeep) {
        //     api.post('keeps')
        //         .then(res => {
        //             this.getAllKeeps()
        //         })
        //         .catch(handleError)
        // }
    }

}