<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Product Categories</h5>
                        <router-link :to="{name:'create-category'}" class="btn btn-primary">Create Category
                        </router-link>
                    </div>

                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th width="30%">Name</th>
                                    <th width="40%">Slug</th>
                                    <th width="20%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="category in categories" :key="category.id">
                                    <td>{{ category.id }}</td>
                                    <td width="30%">{{ category.name }}</td>
                                    <td width="40%">{{ category.slug }}</td>
                                    <td width="20%">
                                        <router-link :to="{name:'edit-category',params:{slug:category.slug}}"
                                                     class="btn btn-primary btn-sm">Edit
                                        </router-link>
                                        <a @click.prevent="deleteCategory(category)"
                                           onclick="return confirm('Do you want to delete this?')"
                                           class="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            categories: [],
        }
    },
    methods: {
        loadCategories() {
            axios.get('/api/category').then(response => {
                this.categories = response.data;
            })
        },
        deleteCategory(category) {
            axios.delete(`/api/category/${category.slug}`).then(() => {
                this.$toast.success({
                    title: 'Success',
                    message: 'Category deleted successfully.'
                })
            });

            let index = this.categories.indexOf(category);
            this.categories.splice(index,1);
        },

    },
    mounted() {
        this.loadCategories();
        this.loadCategories();
    }
}
</script>
