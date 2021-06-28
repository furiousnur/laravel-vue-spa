<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Edit Category {{categoryForm.name}}</h5>
                        <router-link :to="{name:'category-list'}" class="btn btn-primary">Category List</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 offset-3">
                                <form @submit.prevent="updateCategory">
                                    <div class="form-group">
                                        <label for="categoryName">Category Name</label>

                                        <input v-model="categoryForm.name" type="text" name="name" id="categoryName" placeholder="Category Name"
                                                :class="{'is-invalid':categoryForm.errors.has('name')}" class="form-control">
                                        <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Update Category</button>
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
        updateCategory() {
            let slug = this.$route.params.slug;

            this.categoryForm.put(`/api/category/${slug}`).then(() => {
                this.$toast.success({
                    title:'Success',
                    message:'Category updated successfully.'
                })
            })
        },
        loadCategory(){
            let slug = this.$route.params.slug;
            axios.get(`/api/category/${slug}/edit`, {name: this.name}).then(response => {
                this.categoryForm.name = response.data.name;
            })
        },
    },
    mounted(){
        this.loadCategory();
    }
}
</script>
