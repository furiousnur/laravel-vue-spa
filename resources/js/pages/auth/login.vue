<template>
    <div class="container">
        <div class="py-3">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="login()">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input id="email" v-model="loginForm.email" class="form-control" name="email" :class="{'is-invalid':loginForm.errors.has('email')}"
                                           placeholder="Email" type="email">
                                    <div v-if="loginForm.errors.has('email')" v-html="loginForm.errors.get('email')"/>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" v-model="loginForm.password" :class="{'is-invalid':loginForm.errors.has('password')}"
                                           class="form-control" name="password" placeholder="Password"
                                           type="password">
                                    <div v-if="loginForm.errors.has('password')"
                                         v-html="loginForm.errors.get('password')"/>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-success px-4" type="submit">Login</button>
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
import Form from 'vform'

export default {
    data() {
        return {
            loginForm: new Form({
                email: '',
                password: '',
            }),
        }
    },
    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                this.loginForm.post('/login', {
                }).then(response => {
                    this.getUserData();

                    this.$toast.success({
                        title:'Success',
                        message:'Login successfully.'
                    })

                    this.$router.push({name:'dashboard'});
                })
            });
        },
        getUserData() {
            axios.get('/api/user').then(response => {
                let user = response.data;
                this.$store.commit('SET_USER', user);
            })
        }
    },
    mounted() {

    }
}
</script>
