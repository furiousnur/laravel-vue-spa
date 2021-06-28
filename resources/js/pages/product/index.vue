<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Product List</h5>
                        <router-link :to="{name:'create-product'}" class="btn btn-primary">Create Product</router-link>
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
                            <tbody v-if="products.length">
                                <tr v-for="product in products" :key="product.id">
                                    <td>{{ product.id }}</td>
                                    <td width="30%">{{ product.name }}</td>
                                    <td width="40%">{{ product.slug }}</td>
                                    <td width="20%">
                                        <router-link :to="{name:'edit-product',params:{slug:product.slug}}"
                                                     class="btn btn-primary btn-sm">Edit
                                        </router-link>
                                        <a @click.prevent="deleteProduct(product)"
                                           onclick="return confirm('Do you want to delete this?')"
                                           class="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4 mb-4">No Products Found!</h5>
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
            products: [],
        }
    },
    methods: {
        loadProducts() {
            axios.get('/api/product').then(response => {
                this.products = response.data;
            })
        },
        deleteProduct(product) {
            axios.delete(`/api/product/${product.slug}`).then(() => {
                this.$toast.success({
                    title: 'Success',
                    message: 'Product deleted successfully.'
                })
            });

            let index = this.products.indexOf(product);
            this.products.splice(index,1);
        },

    },
    mounted() {
        this.loadProducts();
    }
}
</script>
