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
                                <form @submit.prevent="saveProduct">
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
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="form-group">
                                                <label for="productImage">Product Image</label>
                                                <input type="file" id="productImage" :class="{'is-invalid':productForm.errors.has('image')}"
                                                       class="form-control-file">
                                                <div v-if="productForm.errors.has('image')" v-html="productForm.errors.get('image')"/>
                                            </div>
                                        </div>
                                        <div class="col-4" v-if="productForm.image">
                                            <img  :src="productForm.image" alt="image" class="img-fluid" style="max-height: 150px; width: 100%; overflow: hidden">
                                        </div>
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
import { objectToFormData } from 'object-to-formdata'
export default {
    data() {
        return {
            productForm: new Form({
                title: '',
                image: '',
                price: '',
                description: '',
                _method: 'put',
            }),
        }
    },
    methods: {
        loadProductData(){
            let slug = this.$route.params.slug;
            axios.get(`/api/product/${slug}/edit`).then(response => {
                let product = response.data;
                this.productForm.title = product.title;
                this.productForm.price = product.price;
                this.productForm.image = product.image;
                this.productForm.description = product.description;
            })
        },
        saveProduct() {
            let id = this.$route.params.id;
            this.productForm.post('/api/product/'+id,{
                transformRequest: [function (data, headers) {
                    return objectToFormData(data)
                }],
                onUploadProgress: e => {
                    // Do whatever you want with the progress event
                    console.log(e)
                }
            }).then(({data}) => {
                this.productForm.title = '';
                this.productForm.price = '';
                this.productForm.image = '';
                this.productForm.description = '';
                this.$toast.success({
                    title: 'Success',
                    message: 'Product updated successfully.'
                })
            })
        },
        onImageChange(e){
            const file = e.target.files[0]
            // Do some client side validation...
            //image upload npm command = "npm install object-to-formdata"
            this.productForm.image = file
        },
    },
    mounted() {
        this.loadProductData();
    }
}
</script>
