<template>
    <div class="container">
        <div class="py-3">
            <div class="row">
                <div class="col-4">
                    <div class="list-group">
                        <router-link :to="{name:'dashboard'}" class="list-group-item list-group-item-action">Dashboard</router-link>
                        <router-link :to="{name:'profile'}" class="list-group-item list-group-item-action">Profile</router-link>
                        <a class="list-group-item list-group-item-action" href="#" @click.prevent="logout">Logout</a>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card">
                        <div class="card-header">
                            Dashboard
                        </div>
                        <div class="card-body">
                            Welcome, {{user.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            axios.post('/logout').then(response => {
                this.$toast.success({
                    title:'Success',
                    message:'Logout successfully.'
                })
                localStorage.removeItem('auth');
                this.$store.commit('SET_AUTHENTICATED',false)
                this.$router.push({name:'login'});
            })
        }
    },
     computed:{
         message(){
             return this.$store.getters.getMessage;
         },
         user(){
             return this.$store.getters.getUser;
         }
     }
}
</script>
