<template>
    <h3>Redirecting...</h3>
</template>
<script setup>

//Redirect to dashboard
const router = useRouter()
const { $auth0 } = useNuxtApp()

onMounted(() => {
   
        router.push('/dashboard')
    
})




</script>