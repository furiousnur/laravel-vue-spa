<template>
    <div class="container">
        <div class="py-3">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Register
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="createUser()">
                                <div class="form-group">
                                    <label for="name">Name</label>
                                    <input id="name" v-model="registerForm.name" class="form-control" name="name" :class="{'is-invalid':registerForm.errors.has('name')}"
                                           placeholder="Email" type="text">
                                    <div v-if="registerForm.errors.has('name')" v-html="registerForm.errors.get('name')"/>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input id="email" v-model="registerForm.email" class="form-control" name="email" :class="{'is-invalid':registerForm.errors.has('email')}"
                                           placeholder="Email" type="email">
                                    <div v-if="registerForm.errors.has('email')" v-html="registerForm.errors.get('email')"/>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" v-model="registerForm.password" :class="{'is-invalid':registerForm.errors.has('password')}"
                                           class="form-control" name="password" placeholder="Password" type="password">
                                    <div v-if="registerForm.errors.has('password')" v-html="registerForm.errors.get('password')"/>
                                </div>
                                <div class="form-group">
                                    <label for="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" v-model="registerForm.password_confirmation" :class="{'is-invalid':registerForm.errors.has('password_confirmation')}"
                                           class="form-control" name="password" placeholder="Confirm Password" type="password">
                                    <div v-if="registerForm.errors.has('password_confirmation')" v-html="registerForm.errors.get('password_confirmation')"/>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-success px-4" type="submit">Crate an account</button>
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
            registerForm: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }),
        }
    },
    methods: {
        async createUser() {
            await axios.get('/sanctum/csrf-cookie');
            await this.registerForm.post('/register');
            await this.getUserData();
            this.$toast.success({
                title:'Success',
                message:'Your account has been created successfully! Login now.'
            })
            this.$router.push({name:'dashboard'});
        },

        async getUserData() {
            await axios.get('/api/user').then(response => {
                let user = response.data;
                this.$store.commit('SET_USER', user);
                this.$store.commit('SET_AUTHENTICATED', true);

                localStorage.setItem("auth", true);
            })
        }
    }
}
</script>
