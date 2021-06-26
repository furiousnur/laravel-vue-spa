<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Create Category</h5>
                        <router-link :to="{name:'category-list'}" class="btn btn-primary">Category List</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 offset-3">
                                <form @submit.prevent="createCategory">
                                    <div class="form-group">
                                        <label for="categoryName">Category Name</label>
                                        <input type="text" v-model="name" class="form-control" id="categoryName" placeholder="Category Name">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
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
        return{
            name: ''
        }
    },
    methods: {
        createCategory(){
            axios.post('/api/category',{name: this.name}).then(response =>{
                console.log(response);
            })
        }
    }
}
</script>
