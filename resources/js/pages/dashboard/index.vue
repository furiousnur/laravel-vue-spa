<template>
    <div class="container">
        <div class="py-3">
            <div class="card">
                <div class="card-header">
                    Dashboard
                </div>
                <div class="card-body">
                     Welcome, {{user.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     computed:{
         message(){
             return this.$store.getters.getMessage;
         },
         user(){
             return this.$store.getters.getUser;
         }
     }
}
</script>
