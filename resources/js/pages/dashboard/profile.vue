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
                            <span class="font-weight-bold">{{profileForm.name}}'s Profile</span>
                        </div>
                        <div class="card-body">
                            <form action="" method="post">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold" for="name">Your Name</label>
                                            <input id="name" v-model="profileForm.name" class="form-control" name="name" placeholder="Your Name" type="text">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold" for="email">Email</label>
                                            <input id="email" v-model="profileForm.email" class="form-control" name="email" placeholder="Email" type="email">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold" for="password">Password</label>
                                            <input id="password" v-model="profileForm.password"
                                                   class="form-control" name="password" placeholder="Password" type="password">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold" for="confirmPassword">Confirm Password</label>
                                            <input id="confirmPassword" v-model="profileForm.password" class="form-control" name="password" placeholder="Password" type="password">
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
                confirm_password: '',
            }),
        }
    },
    methods:{
        user(){
            let user = this.$store.getters.getUser;
            this.profileForm.name = user.name;
            this.profileForm.email = user.email;
        }
    },
    created(){
        this.user();
    }
}
</script>
