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
                            {{auth.name}}'s Profile
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="updateUserProfile()">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="name">Your Name</label>
                                            <input id="name" v-model="profileForm.name" class="form-control" name="name" :class="{'is-invalid':profileForm.errors.has('name')}"
                                                   placeholder="Your Name" type="text">
                                            <div v-if="profileForm.errors.has('name')" v-html="profileForm.errors.get('name')"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input id="email" v-model="profileForm.email" class="form-control" name="email" :class="{'is-invalid':profileForm.errors.has('email')}"
                                                   placeholder="Email" type="email">
                                            <div v-if="profileForm.errors.has('email')" v-html="profileForm.errors.get('email')"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="password">Password</label>
                                            <input id="password" v-model="profileForm.password" :class="{'is-invalid':profileForm.errors.has('password')}"
                                                   class="form-control" name="password" placeholder="Password" type="password">
                                            <div v-if="profileForm.errors.has('password')" v-html="profileForm.errors.get('password')"/>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="confirmPassword">Confirm Password</label>
                                            <input id="confirmPassword" v-model="profileForm.password_confirmation" :class="{'is-invalid':profileForm.errors.has('password_confirmation')}"
                                                   class="form-control" name="password" placeholder="Confirm Password" type="password">
                                            <div v-if="profileForm.errors.has('password_confirmation')" v-html="profileForm.errors.get('password_confirmation')"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-success px-4" type="submit">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Form from "vform";
export default {
    data() {
        return {
            profileForm: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }),
        }
    },
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
        },
        user(){
            let user = this.$store.getters.getUser;
            this.profileForm.name = user.name;
            this.profileForm.email = user.email;
        },
        updateUserProfile(){
            this.profileForm.post('/api/user').then(response => {
                //user update on vuex store
                this.$store.commit('SET_USER',response.data);

                this.$toast.success({
                    title:'Success',
                    message:'profile updated successfully.'
                })
            })
        }
    },
    created(){
        this.user();
    },
    computed:{
        auth(){
            return this.$store.getters.getUser;
        }
    }
}
</script>
