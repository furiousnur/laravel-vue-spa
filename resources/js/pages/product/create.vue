<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Create Product</h5>
                        <router-link :to="{name:'product-list'}" class="btn btn-primary">Product List</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 offset-3">
                                <form @submit.prevent="createProduct">
                                    <div class="form-group">
                                        <label for="productName">Product Name</label>
                                        <input v-model="productForm.name" type="text" name="name" id="productName" placeholder="Product Name"
                                                :class="{'is-invalid':productForm.errors.has('name')}" class="form-control">
                                        <div v-if="productForm.errors.has('name')" v-html="productForm.errors.get('name')" />
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
            productForm: new Form({
                name: '',
            }),
        }
    },
    methods: {
        createProduct() {
            /*axios.post('/api/category', {name: this.name}).then(response => {
                console.log(response);
            })*/
            this.productForm.post('/api/product').then(({data}) => {
                this.productForm.name = '';
                this.$toast.success({
                    title:'Success',
                    message:'Product created successfully.'
                })
            })
        }
    }
}
</script>
