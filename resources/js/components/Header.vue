<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div class="container">
            <div class="container-fluid">
                <router-link class="navbar-brand" :to="{name:'home'}">SPA</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link active" aria-current="page" :to="{name:'home'}">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'category-list'}">Product Category</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'product-list'}">Product List</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'login'}">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        methods:{
            logout(){
                axios.post('/logout').then(resposne => {
                    this.$router.push({name:'login'});
                    this.$toast.success({
                        title:'Success',
                        message:'Logout successfully.'
                    })
                })
            }
        }
    }
</script>
<style>

</style>
