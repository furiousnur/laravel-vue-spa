<template>
    <div class="container">
        <div class="text-center">
            <h2>All Products</h2>
            <hr>
        </div>
        <div class="row justify-content-center" v-if="apiCallLoaded">
            <div class="col-md-3 mb-3 ml-2" v-for="product in products" :key="product.id">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" :src="product.image" alt="Card image cap"  style="height: 150px; object-fit: cover; overflow: hidden">
                    <div class="card-body" style="height: 170px;">
                        <h5 class="card-title">{{product.title}}</h5>
                        <p class="card-text">{{product.description}}</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-success mt-3 mb-3" :disabled="!next_page_url" @click.prevent="loadMoreProducts(next_page_url)">Load More Products</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                products: [],
                next_page_url: null,
                apiCallLoaded: false
            }
        },
        methods:{
            async loadProducts(){
                let {data} = await axios.get('/api/products');
                this.products = data.data;
                this.next_page_url = data.next_page_url;
                this.apiCallLoaded = true;
            },
            async loadMoreProducts(url){
                let {data} = await axios.get(url);
                let products = data.data;
                products.forEach(element => {
                    this.products.push(element);
                })
                // this.products.concat( data.data);
                this.next_page_url = data.next_page_url;
            }
        },
        mounted() {
            this.loadProducts();
        }
    }
</script>
