<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">{{title}}</h5>
                        <router-link :to="{name:'home'}" class="btn btn-primary">Back to Home</router-link>
                    </div>
                    <div class="card-body">
                        <div class="text-center">
                            <img  :src="image" alt="image" class="img-fluid">
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h2 class="font-weight-bold mt-5">{{title}}</h2>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4><span class="font-weight-bold">Price:</span> <span class="badge badge-primary">{{price}}</span></h4>
                                    <h5><span class="font-weight-bold">Category:</span> <span class="badge badge-success">{{category}}</span></h5>
                                </div>
                                <p>{{description}}</p>
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
        return {
            title: '',
            image: '',
            price: '',
            category: '',
            description: '',
            created_at: '',
            id: ''
        }
    },
    methods: {
        loadProductData(){
            let slug = this.$route.params.slug;
            axios.get(`/api/product/${slug}`).then(response => {
                let product = response.data;
                this.id = product.id;
                this.title = product.title;
                this.price = product.price;
                this.image = product.image;
                this.description = product.description;
                this.category = product.category.name;
                this.created_at = product.created_at;
            })
        },
    },
    mounted() {
        this.loadProductData();
    }
}
</script>
