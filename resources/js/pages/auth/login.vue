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
                            <form action="" method="post" @click.prevent="login()">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" placeholder="Email" id="email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" placeholder="Password" id="password" class="form-control">
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success px-4">Login</button>
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
export default {
    data() {
        return {

        }
    },
    methods: {
        login(){
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login',{
                    email:'nuralam@gmail.com',
                    'password':'12345678'
                }).then(response => {
                    console.log(response);
                    this.getUserData();
                })
            });
        },
        getUserData(){
            axios.get('/api/user').then(response => {
                console.log(response.data);
            })
        }
    },
    mounted() {
        this.getUserData();
    }
}
</script>
