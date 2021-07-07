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
                                        <label for="productName">Product Title</label>
                                        <input v-model="productForm.title" type="text" name="title" id="productName"
                                               placeholder="Product Title"
                                               :class="{'is-invalid':productForm.errors.has('title')}"
                                               class="form-control">
                                        <div v-if="productForm.errors.has('title')"
                                             v-html="productForm.errors.get('title')"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="productCategory">Select Product Category</label>
                                        <select name="category_id" id="productCategory" class="form-control" v-model="productForm.category_id"
                                                :class="{'is-invalid':productForm.errors.has('category_id')}">
                                            <option value="" selected disabled hidden>Select Category</option>
                                            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.name}}</option>
                                        </select>
                                        <div v-if="productForm.errors.has('category_id')" v-html="productForm.errors.get('category_id')"/>
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
                                        <input type="file" id="productImage" @change="onImageChange"
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
import { objectToFormData } from 'object-to-formdata'
export default {
    data() {
        return {
            productForm: new Form({
                title: '',
                image: '',
                price: '',
                description: '',
                category_id:'',
            }),
            categories:[]
        }
    },
    methods: {
        loadCategories() {
            axios.get('/api/category').then(response => {
                this.categories = response.data;
            })
        },
        createProduct() {
            this.productForm.post('/api/product',{
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
                this.productForm.category_id = '';
                this.$toast.success({
                    title: 'Success',
                    message: 'Product created successfully.'
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
        this.loadCategories();
    }
}
</script>
