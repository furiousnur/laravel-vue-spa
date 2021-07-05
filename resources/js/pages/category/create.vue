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

                                        <input v-model="categoryForm.name" type="text" name="name" id="categoryName" placeholder="Category Name"
                                                :class="{'is-invalid':categoryForm.errors.has('name')}" class="form-control">
                                        <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" />
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
import Form from 'vform'
export default {
    data() {
        return {
            categoryForm: new Form({
                name: '',
            }),
        }
    },
    methods: {
        createCategory() {
            /*axios.post('/api/category', {name: this.name}).then(response => {
                console.log(response);
            })*/
            this.categoryForm.post('/api/category').then(({data}) => {
                this.categoryForm.name = '';
                this.$toast.success({
                    title:'Success',
                    message:'Category created successfully.'
                })
            })
        }
    }
}
</script>
