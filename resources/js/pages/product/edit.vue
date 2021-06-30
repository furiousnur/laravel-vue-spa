<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Edit Product - {{productForm.title}}</h5>
                        <router-link :to="{name:'product-list'}" class="btn btn-primary">Product List</router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-6 offset-3">
                                <form @submit.prevent="updateProduct">
                                    <div class="form-group">
                                        <label for="productName">Product Title</label>
                                        <input v-model="productForm.title" type="text" name="title" id="productName" placeholder="Product Title"
                                               :class="{'is-invalid':productForm.errors.has('title')}" class="form-control">
                                        <div v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="productPrice">Product Price</label>
                                        <input v-model="productForm.price" type="text" name="price" id="productPrice"
                                               placeholder="Product Price"
                                               :class="{'is-invalid':productForm.errors.has('price')}"
                                               class="form-control">
                                        <div v-if="productForm.errors.has('price')"
                                             v-html="productForm.errors.get('price')"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="productImage">Product Image</label>
                                        <input type="file" id="productImage"
                                               :class="{'is-invalid':productForm.errors.has('image')}"
                                               class="form-control-file">
                                        <div v-if="productForm.errors.has('image')"
                                             v-html="productForm.errors.get('image')"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="productDescription">Product Description</label>
                                        <textarea v-model="productForm.description" type="text" name="description"
                                                  id="productDescription" placeholder="Product Description"
                                                  :class="{'is-invalid':productForm.errors.has('description')}"
                                                  class="form-control"></textarea>
                                        <div v-if="productForm.errors.has('description')"
                                             v-html="productForm.errors.get('description')"/>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Update Product</button>
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
                title: '',
                image: '',
                price: '',
                description: '',
                status: '',
            }),
        }
    },
    methods: {
        loadProduct(){
            let slug = this.$route.params.slug;
            axios.get(`/api/product/${slug}/edit`).then(response => {
                this.productForm.title = response.data.title;
                this.productForm.price = response.data.price;
                this.productForm.image = response.data.image;
                this.productForm.description = response.data.description;
                this.productForm.status = response.data.status;
            })
        },
        updateProduct() {
            let slug = this.$route.params.slug;

            this.productForm.put(`/api/product/${slug}`).then(() => {
                this.$toast.success({
                    title:'Success',
                    message:'Product updated successfully.'
                })
            })
        },
    },
    mounted(){
        this.loadProduct();
    }
}
</script>
